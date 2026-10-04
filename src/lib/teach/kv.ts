import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

/*
  A small key-value store for teacher accounts, classes and Drawer items. Server only.

  Same places as the video store (lib/cms/store.ts):
    1. Upstash Redis (UPSTASH_REDIS_REST_URL / _TOKEN, or Vercel's KV_REST_API_URL / _TOKEN). Works on Vercel.
    2. Files under .data/kv/ for local development (one file per key). Never used on Vercel.
    3. Nothing: teacher features are switched off, and the pages say so.

  Every key gets a prefix, with a separate one for Vercel preview deployments, so tests on a preview can never
  appear on the live site.
*/

const PREFIX = process.env.VERCEL_ENV === "preview" ? "casefile:preview:teach:" : "casefile:teach:";
const DIR = path.join(process.cwd(), ".data", "kv");

function upstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export type KvKind = "upstash" | "file" | "none";

export function kvKind(): KvKind {
  if (upstashConfig()) return "upstash";
  if (!process.env.VERCEL) return "file";
  return "none";
}

async function upstash(command: string[]): Promise<unknown> {
  const cfg = upstashConfig();
  if (!cfg) throw new Error("Upstash is not configured");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storage request failed (${res.status})`);
  const body = (await res.json()) as { result?: unknown; error?: string };
  if (body.error) throw new Error(`Storage error: ${body.error}`);
  return body.result;
}

const fileFor = (key: string) => path.join(DIR, encodeURIComponent(key) + ".json");

export async function kvGetRaw(key: string): Promise<string | null> {
  const full = PREFIX + key;
  switch (kvKind()) {
    case "upstash": {
      const r = await upstash(["GET", full]);
      return typeof r === "string" ? r : null;
    }
    case "file":
      try {
        return await readFile(fileFor(full), "utf8");
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
        throw e;
      }
    case "none":
      return null;
  }
}

export async function kvSetRaw(key: string, value: string): Promise<void> {
  const full = PREFIX + key;
  switch (kvKind()) {
    case "upstash":
      await upstash(["SET", full, value]);
      return;
    case "file":
      await mkdir(DIR, { recursive: true });
      await writeFile(fileFor(full), value, "utf8");
      return;
    case "none":
      throw new Error("Saving is not set up. Connect a Redis store to enable teacher accounts.");
  }
}

export async function kvDel(key: string): Promise<void> {
  const full = PREFIX + key;
  switch (kvKind()) {
    case "upstash":
      await upstash(["DEL", full]);
      return;
    case "file":
      await rm(fileFor(full), { force: true });
      return;
    case "none":
      return;
  }
}

export async function kvGet<T>(key: string): Promise<T | null> {
  const raw = await kvGetRaw(key);
  return raw === null ? null : (JSON.parse(raw) as T);
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  await kvSetRaw(key, JSON.stringify(value));
}

// One list change at a time inside this server process, so two quick clicks cannot overwrite each other.
// ASSUMPTION: classroom scale. Two server instances editing the same list at the same instant could still race.
let queue: Promise<unknown> = Promise.resolve();

/** Read-change-write a JSON array, one change at a time */
export function kvUpdateList(key: string, edit: (list: string[]) => string[]): Promise<string[]> {
  const run = async () => {
    const next = edit((await kvGet<string[]>(key)) ?? []);
    await kvSet(key, next);
    return next;
  };
  const p = queue.then(run, run);
  queue = p.catch(() => undefined);
  return p;
}
