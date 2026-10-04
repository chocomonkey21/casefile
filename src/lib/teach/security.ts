import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

/*
  Passwords, sessions and codes for teacher accounts. Server only, Node crypto only.

  - Passwords are hashed with scrypt and a random salt. The password itself is never stored.
  - The session cookie is "teacherId.expiry.signature", signed with HMAC-SHA256. It cannot be changed without the secret.
    The secret is TEACHER_SESSION_SECRET, or EDITOR_SESSION_SECRET when that is not set (signed for a different purpose,
    so an editor cookie can never pass as a teacher cookie). With neither set, teacher sign-in is switched off.
*/

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export const TEACHER_COOKIE = "cf_teacher";
export const TEACHER_SESSION_SECONDS = 7 * 24 * 60 * 60;

export function teacherSecret(env: Record<string, string | undefined> = process.env): string | null {
  const secret = env.TEACHER_SESSION_SECRET || env.EDITOR_SESSION_SECRET || "";
  return secret.length >= 32 ? secret : null;
}

export async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return { salt: salt.toString("base64"), hash: hash.toString("base64") };
}

export async function verifyPassword(password: string, salt: string, hash: string): Promise<boolean> {
  const expected = Buffer.from(hash, "base64");
  const actual = await scrypt(password, Buffer.from(salt, "base64"), expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

const sign = (secret: string, teacherId: string, expires: number) =>
  createHmac("sha256", secret).update(`teacher:${teacherId}:${expires}`).digest("base64url");

export function signTeacherSession(secret: string, teacherId: string, now: number = Date.now()): string {
  const expires = Math.floor(now / 1000) + TEACHER_SESSION_SECONDS;
  return `${teacherId}.${expires}.${sign(secret, teacherId, expires)}`;
}

/** The teacher id from a valid, unexpired session token, or null */
export function verifyTeacherSession(secret: string, token: string | undefined, now: number = Date.now()): string | null {
  if (!token) return null;
  const [id, exp, sig, ...extra] = token.split(".");
  if (!id || !exp || !sig || extra.length || !/^[a-z0-9]{12,40}$/.test(id)) return null;
  const expires = Number(exp);
  if (!Number.isInteger(expires) || expires * 1000 < now) return null;
  const expected = Buffer.from(sign(secret, id, expires));
  const given = Buffer.from(sig);
  return given.length === expected.length && timingSafeEqual(given, expected) ? id : null;
}

export const newId = () => randomBytes(12).toString("hex");

// No 0/O, 1/I/L, so codes are easy to read aloud and copy from a board
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export function newClassCode(): string {
  const bytes = randomBytes(8);
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

export function normaliseCode(input: string): string | null {
  const code = input.trim().toUpperCase().replace(/[\s-]/g, "");
  return /^[A-HJ-NP-Z2-9]{8}$/.test(code) ? code : null;
}

/* ---------- A simple per-process limit on repeated attempts (sign-in, joining classes) ---------- */

const attempts = new Map<string, { count: number; first: number }>();

/** True when this key has made too many attempts in the window. Counts the attempt. */
export function tooManyAttempts(key: string, max: number, windowMs: number, now: number = Date.now()): boolean {
  const rec = attempts.get(key);
  if (!rec || now - rec.first > windowMs) {
    attempts.set(key, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > max;
}

export function clearAttempts(key: string) {
  attempts.delete(key);
}
