"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireEditor } from "@/lib/cms/auth";
import { SESSION_COOKIE, SESSION_SECONDS, checkPassword, editorConfig, signSession } from "@/lib/cms/session";
import {
  checkForm,
  deleteVideo,
  moveVideo,
  readForm,
  saveVideo,
  setVideoStatus,
} from "@/lib/cms/videos";
import type { FormErrors, VideoFormValues } from "@/lib/cms/form";

export type LoginState = { error?: string };
export type SaveState = { errors?: FormErrors; values?: VideoFormValues; message?: string };

const COOKIE_PATH = "/studio";

/* Best-effort brake on password guessing: 5 wrong tries from one address locks sign-in for 15 minutes.
   It lives in this server's memory, so on serverless hosting it slows guessing but does not stop a determined attacker.
   The real protection is a long, random EDITOR_PASSWORD. */
const attempts = new Map<string, { count: number; last: number; until: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const cfg = editorConfig();
  if (!cfg.configured) return { error: "Editing is not set up on this server." };

  const key = await clientKey();
  const now = Date.now();
  const record = attempts.get(key);
  if (record && record.until > now) return { error: "Too many wrong passwords. Wait a few minutes and try again." };

  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password, cfg.password)) {
    // Failures older than the lock window do not count against this try
    const count = (record && now - record.last < LOCK_MS ? record.count : 0) + 1;
    attempts.set(key, { count, last: now, until: count >= MAX_ATTEMPTS ? now + LOCK_MS : 0 });
    await sleep(700);
    return { error: "That password is not right." };
  }

  attempts.delete(key);
  (await cookies()).set(SESSION_COOKIE, signSession(cfg.secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: COOKIE_PATH,
    maxAge: SESSION_SECONDS,
  });
  redirect("/studio");
}

export async function logoutAction() {
  (await cookies()).set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "strict", path: COOKIE_PATH, maxAge: 0 });
  redirect("/studio");
}

const ID = /^[a-z0-9-]{1,80}$/;
const idFrom = (formData: FormData) => {
  const v = formData.get("id");
  return typeof v === "string" && ID.test(v) ? v : null;
};

export async function saveVideoAction(_prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireEditor();
  const values = readForm(formData);
  const checked = checkForm(values);
  if (!checked.ok) return { errors: checked.errors, values };

  let savedId: string | null;
  try {
    savedId = await saveVideo(checked.fields, idFrom(formData));
  } catch (e) {
    return { values, message: e instanceof Error ? e.message : "The video could not be saved." };
  }
  if (!savedId) return { values, message: "That video no longer exists. Go back to the list and refresh." };
  redirect(`/studio?saved=${savedId}`);
}

export async function deleteVideoAction(formData: FormData) {
  await requireEditor();
  const id = idFrom(formData);
  if (id) await deleteVideo(id);
  redirect("/studio?deleted=1");
}

export async function setStatusAction(formData: FormData) {
  await requireEditor();
  const id = idFrom(formData);
  const status = formData.get("status");
  if (id && (status === "published" || status === "draft")) await setVideoStatus(id, status);
  redirect("/studio");
}

export async function moveAction(formData: FormData) {
  await requireEditor();
  const id = idFrom(formData);
  const dir = formData.get("direction");
  if (id && (dir === "up" || dir === "down")) await moveVideo(id, dir);
  redirect("/studio");
}
