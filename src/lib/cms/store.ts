import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StoreKind, VideoEntry } from "./types";

/*
  Where video entries are saved. Server only.

  1. Upstash Redis (set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, or the KV_REST_API_URL and
     KV_REST_API_TOKEN pair that Vercel adds when a Redis store is connected). Works on Vercel.
  2. A JSON file at .data/videos.json. For local development and self-hosting. Vercel's file system is
     read-only and resets between deployments, so this is never used there.
  3. Nothing. Learners see an empty video list and the editor desk says that saving is not set up.

  All entries live under a single key, which is plenty for a school's worth of videos.
*/

const KEY = "casefile:videos";
const FILE = path.join(process.cwd(), ".data", "videos.json");

function upstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function storeKind(): StoreKind {
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

function parseList(raw: unknown): VideoEntry[] {
  if (typeof raw !== "string" || raw === "") return [];
  const data: unknown = JSON.parse(raw);
  return Array.isArray(data) ? (data as VideoEntry[]) : [];
}

export async function readAll(): Promise<VideoEntry[]> {
  switch (storeKind()) {
    case "upstash":
      return parseList(await upstash(["GET", KEY]));
    case "file":
      try {
        return parseList(await readFile(FILE, "utf8"));
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
        throw e;
      }
    case "none":
      return [];
  }
}

async function writeRaw(list: VideoEntry[]): Promise<void> {
  const json = JSON.stringify(list);
  switch (storeKind()) {
    case "upstash":
      await upstash(["SET", KEY, json]);
      return;
    case "file": {
      await mkdir(path.dirname(FILE), { recursive: true });
      const tmp = `${FILE}.${process.pid}.tmp`;
      await writeFile(tmp, json, "utf8");
      await rename(tmp, FILE);
      return;
    }
    case "none":
      throw new Error("Saving is not set up. Connect a Redis store to enable it.");
  }
}

// One change at a time inside this server process, so two quick clicks cannot overwrite each other
let queue: Promise<unknown> = Promise.resolve();

/** Runs an edit as read, change, write, one at a time. Everything that changes videos goes through here. */
export function update<T>(edit: (list: VideoEntry[]) => { list: VideoEntry[]; result: T }): Promise<T> {
  const run = async () => {
    const { list, result } = edit(await readAll());
    await writeRaw(list);
    return result;
  };
  const next = queue.then(run, run);
  queue = next.catch(() => undefined);
  return next;
}
