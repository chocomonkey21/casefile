import { cookies } from "next/headers";
import { BOARD_COOKIE, GRADE_COOKIE, parseBoard } from "@/lib/access";
import type { Board, Grade } from "@/lib/types";
import { kvKind } from "./kv";
import { TEACHER_COOKIE, TEACHER_SESSION_SECONDS, signTeacherSession, teacherSecret, verifyTeacherSession } from "./security";
import { getTeacherById } from "./store";
import type { TeacherPublic, TeacherRecord } from "./types";

/* Shared helpers for the teacher and Drawer API routes. Server only. */

export const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export type TeachAvailability = { ok: true; secret: string } | { ok: false; reason: "no-secret" | "no-storage" };

/** Teacher accounts need a signing secret and somewhere to save data */
export function teachAvailability(): TeachAvailability {
  const secret = teacherSecret();
  if (!secret) return { ok: false, reason: "no-secret" };
  if (kvKind() === "none") return { ok: false, reason: "no-storage" };
  return { ok: true, secret };
}

export const toPublic = (t: TeacherRecord): TeacherPublic => ({ username: t.username, name: t.name, board: t.board });

/** The signed-in teacher, checked against the signed session cookie and the stored account */
export async function getSignedInTeacher(): Promise<TeacherRecord | null> {
  const secret = teacherSecret();
  if (!secret) return null;
  const id = verifyTeacherSession(secret, (await cookies()).get(TEACHER_COOKIE)?.value);
  return id ? getTeacherById(id) : null;
}

/**
 * Changes must come from this site. Browsers send an Origin header on these requests; one from another site is
 * refused, as a second line of defence after SameSite cookies.
 */
export function sameSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

const secure = process.env.NODE_ENV === "production";

/** Signs the teacher in on this browser, and opens the library for their board at Grade 10 so they see everything */
export async function startTeacherSession(secret: string, teacher: TeacherRecord) {
  const jar = await cookies();
  jar.set(TEACHER_COOKIE, signTeacherSession(secret, teacher.id), { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: TEACHER_SESSION_SECONDS });
  jar.set(GRADE_COOKIE, "10" satisfies `${Grade}`, { secure, sameSite: "lax", path: "/", maxAge: TEACHER_SESSION_SECONDS });
  jar.set(BOARD_COOKIE, teacher.board, { secure, sameSite: "lax", path: "/", maxAge: TEACHER_SESSION_SECONDS });
}

export async function endTeacherSession() {
  const jar = await cookies();
  jar.delete(TEACHER_COOKIE);
  jar.delete(GRADE_COOKIE);
  jar.delete(BOARD_COOKIE);
}

/* ---------- Input checks ---------- */

export const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function checkUsername(v: unknown): string | null {
  const u = clean(v, 40).toLowerCase();
  return /^[a-z0-9_.-]{3,30}$/.test(u) ? u : null;
}

export function checkBoard(v: unknown): Board | null {
  return parseBoard(typeof v === "string" ? v : null);
}

export function checkLink(v: unknown): string | null | "bad" {
  const s = clean(v, 500);
  if (!s) return null;
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "bad";
  } catch {
    return "bad";
  }
}

export function checkDate(v: unknown): string | null | "bad" {
  const s = clean(v, 20);
  if (!s) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) ? s : "bad";
}

/* ---------- Uploads ---------- */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

/** Allowed file types, each with the bytes the file must start with, so a renamed file cannot pass */
const TYPES: { ext: string[]; type: string; magic: number[] | null }[] = [
  { ext: ["pdf"], type: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
  { ext: ["png"], type: "image/png", magic: [0x89, 0x50, 0x4e, 0x47] },
  { ext: ["jpg", "jpeg"], type: "image/jpeg", magic: [0xff, 0xd8, 0xff] },
  { ext: ["docx"], type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", magic: [0x50, 0x4b, 0x03, 0x04] },
  { ext: ["pptx"], type: "application/vnd.openxmlformats-officedocument.presentationml.presentation", magic: [0x50, 0x4b, 0x03, 0x04] },
  { ext: ["txt"], type: "text/plain; charset=utf-8", magic: null },
];

export const ALLOWED_EXTENSIONS = TYPES.flatMap((t) => t.ext);

export type CheckedUpload = { ok: true; name: string; type: string; bytes: Buffer } | { ok: false; error: "too-big" | "bad-type" };

export async function checkUpload(file: File): Promise<CheckedUpload> {
  if (file.size > MAX_UPLOAD_BYTES) return { ok: false, error: "too-big" };
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const kind = TYPES.find((t) => t.ext.includes(ext));
  if (!kind) return { ok: false, error: "bad-type" };
  const bytes = Buffer.from(await file.arrayBuffer());
  if (kind.magic && !kind.magic.every((b, i) => bytes[i] === b)) return { ok: false, error: "bad-type" };
  // Keep the name readable but safe to put in a header
  const name = file.name.replace(/[^\w .()-]/g, "_").slice(0, 120) || `file.${ext}`;
  return { ok: true, name, type: kind.type, bytes };
}
