/*
  Editor sign-in, with no accounts and no database.

  Access is controlled by two values set as environment variables on the server:
    EDITOR_PASSWORD         at least 12 characters. The password editors type in.
    EDITOR_SESSION_SECRET   at least 32 random characters. Signs the session cookie so it cannot be forged.
  If either is missing or too short, editing is switched off completely. There is no default password.

  This file only uses Node's crypto module so it can be tested on its own (see scripts/test-cms.mjs).
*/
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "cf_editor";
export const SESSION_SECONDS = 8 * 60 * 60;

export type EditorConfig =
  | { configured: true; password: string; secret: string }
  | { configured: false; problems: string[] };

export function editorConfig(env: Record<string, string | undefined> = process.env): EditorConfig {
  const password = env.EDITOR_PASSWORD ?? "";
  const secret = env.EDITOR_SESSION_SECRET ?? "";
  const problems: string[] = [];
  if (password.length < 12) problems.push("EDITOR_PASSWORD is missing or shorter than 12 characters.");
  if (secret.length < 32) problems.push("EDITOR_SESSION_SECRET is missing or shorter than 32 characters.");
  return problems.length ? { configured: false, problems } : { configured: true, password, secret };
}

const digest = (value: string) => createHash("sha256").update(value).digest();

/** Compares two secrets in constant time, so the response time does not reveal how much matched */
export function checkPassword(input: string, expected: string): boolean {
  return timingSafeEqual(digest(input), digest(expected));
}

const sign = (secret: string, expires: number) =>
  createHmac("sha256", secret).update(`editor:${expires}`).digest("base64url");

/** A cookie value that says "signed in until this time", and cannot be changed without the secret */
export function signSession(secret: string, now: number = Date.now()): string {
  const expires = Math.floor(now / 1000) + SESSION_SECONDS;
  return `${expires}.${sign(secret, expires)}`;
}

export function verifySession(secret: string, token: string | undefined, now: number = Date.now()): boolean {
  if (!token) return false;
  const [exp, sig, ...extra] = token.split(".");
  if (!exp || !sig || extra.length) return false;
  const expires = Number(exp);
  if (!Number.isInteger(expires) || expires * 1000 < now) return false;
  const expected = Buffer.from(sign(secret, expires));
  const given = Buffer.from(sig);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
