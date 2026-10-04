import { getCase } from "@/data/cases";
import { getSubjects, isChapter, isSubjectId } from "@/lib/structure";
import { FIELD_LIMITS, type FormErrors, type VideoFormValues } from "./form";
import { parseCaptionsUrl, parseThumbnail, parseVideoUrl } from "./embed";
import { readAll, update } from "./store";
import type { VideoEntry, VideoStatus } from "./types";

/* ---------- Reading (used by learner pages and the editor desk) ---------- */

export function sortVideos(list: VideoEntry[]): VideoEntry[] {
  return [...list].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export type VideoFilter = { subject?: string; caseId?: string; clueId?: string };

function matches(v: VideoEntry, f: VideoFilter) {
  return (
    (!f.subject || v.subjectId === f.subject) &&
    (!f.caseId || v.caseId === f.caseId) &&
    (!f.clueId || v.clueId === f.clueId)
  );
}

/** Published videos only. This is the single place learner pages get their videos from. */
export async function listPublished(filter: VideoFilter = {}): Promise<VideoEntry[]> {
  return sortVideos((await readAll()).filter((v) => v.status === "published" && matches(v, filter)));
}

export async function getPublished(id: string): Promise<VideoEntry | null> {
  return (await listPublished()).find((v) => v.id === id) ?? null;
}

/** Everything including drafts. Editor desk only. */
export async function listAll(): Promise<VideoEntry[]> {
  return sortVideos(await readAll());
}

export async function getAny(id: string): Promise<VideoEntry | null> {
  return (await readAll()).find((v) => v.id === id) ?? null;
}

/* ---------- Checking what an editor submits ---------- */

const str = (data: FormData, key: string) => {
  const v = data.get(key);
  return typeof v === "string" ? v.trim() : "";
};

export function readForm(data: FormData): VideoFormValues {
  return {
    title: str(data, "title"),
    description: str(data, "description"),
    subjectId: str(data, "subjectId"),
    caseId: str(data, "caseId"),
    clueId: str(data, "clueId"),
    videoUrl: str(data, "videoUrl"),
    thumbnailUrl: str(data, "thumbnailUrl"),
    captionsUrl: str(data, "captionsUrl"),
    // Keep the transcript's line breaks, only trim the ends
    transcript: typeof data.get("transcript") === "string" ? (data.get("transcript") as string).trim() : "",
    order: str(data, "order"),
    status: str(data, "status"),
  };
}

export type Checked =
  | { ok: true; fields: Omit<VideoEntry, "id" | "createdAt" | "updatedAt" | "order"> & { order: number | null } }
  | { ok: false; errors: FormErrors };

/** Server-side checks. The form's own limits are for convenience only; these are the ones that count. */
export function checkForm(v: VideoFormValues): Checked {
  const errors: FormErrors = {};

  if (!v.title) errors.title = "Add a title.";
  else if (v.title.length > FIELD_LIMITS.title) errors.title = `Keep the title under ${FIELD_LIMITS.title} characters.`;

  if (v.description.length > FIELD_LIMITS.description) {
    errors.description = `Keep the description under ${FIELD_LIMITS.description} characters.`;
  }

  if (!isSubjectId(v.subjectId)) errors.subjectId = "Choose a subject.";

  let caseId: string | null = null;
  let clueId: string | null = null;
  if (v.caseId) {
    const c = getCase(v.caseId);
    if (!c || !isChapter(c) || c.subject !== v.subjectId) errors.caseId = "That chapter does not belong to the chosen subject.";
    else caseId = c.id;
    if (v.clueId && caseId) {
      if (!getCase(caseId)?.clues.some((k) => k.id === v.clueId)) errors.clueId = "That lesson is not in the chosen chapter.";
      else clueId = v.clueId;
    }
  } else if (v.clueId) {
    errors.clueId = "Choose a chapter before choosing a lesson.";
  }

  let provider: string | null = null;
  if (!v.videoUrl) errors.videoUrl = "Paste the video address.";
  else {
    const parsed = parseVideoUrl(v.videoUrl);
    if (!parsed.ok) errors.videoUrl = parsed.error;
    else provider = parsed.video.provider;
  }

  let thumbnailUrl: string | null = null;
  if (v.thumbnailUrl) {
    const t = parseThumbnail(v.thumbnailUrl);
    if (!t.ok) errors.thumbnailUrl = t.error;
    else thumbnailUrl = t.url;
  }

  let captionsUrl: string | null = null;
  if (v.captionsUrl) {
    const c = parseCaptionsUrl(v.captionsUrl);
    if (!c.ok) errors.captionsUrl = c.error;
    else if (provider && provider !== "file") {
      errors.captionsUrl = "A captions file only works with a direct video file. For YouTube or Vimeo, add captions on that site.";
    } else captionsUrl = c.url;
  }

  if (v.transcript.length > FIELD_LIMITS.transcript) errors.transcript = `Keep the transcript under ${FIELD_LIMITS.transcript} characters.`;

  let order: number | null = null;
  if (v.order !== "") {
    const n = Number(v.order);
    if (!Number.isInteger(n) || n < 0 || n > 9999) errors.order = "Order must be a whole number from 0 to 9999.";
    else order = n;
  }

  const status: VideoStatus | null = v.status === "published" || v.status === "draft" ? v.status : null;
  if (!status) errors.status = "Choose draft or published.";

  if (Object.keys(errors).length || !status) return { ok: false, errors };

  return {
    ok: true,
    fields: {
      title: v.title,
      description: v.description,
      subjectId: v.subjectId as VideoEntry["subjectId"],
      caseId,
      clueId,
      thumbnailUrl,
      videoUrl: v.videoUrl,
      captionsUrl,
      transcript: v.transcript,
      order,
      status,
    },
  };
}

/* ---------- Changing (editor desk only; callers must check the editor session first) ---------- */

function slug(title: string) {
  const s = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return s || "video";
}

function uniqueId(base: string, list: VideoEntry[]) {
  const taken = new Set(list.map((v) => v.id));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

/** Create (no id) or replace (with id). Returns the saved entry's id, or null when editing something that no longer exists. */
export async function saveVideo(fields: Extract<Checked, { ok: true }>["fields"], id: string | null): Promise<string | null> {
  const now = new Date().toISOString();
  return update((list) => {
    if (id) {
      const i = list.findIndex((v) => v.id === id);
      if (i === -1) return { list, result: null };
      const old = list[i];
      const next: VideoEntry = { ...old, ...fields, order: fields.order ?? old.order, updatedAt: now };
      return { list: list.map((v, j) => (j === i ? next : v)), result: id };
    }
    const newId = uniqueId(slug(fields.title), list);
    const last = list.reduce((m, v) => Math.max(m, v.order), 0);
    const entry: VideoEntry = { ...fields, order: fields.order ?? last + 10, id: newId, createdAt: now, updatedAt: now };
    return { list: [...list, entry], result: newId };
  });
}

export async function deleteVideo(id: string): Promise<void> {
  await update((list) => ({ list: list.filter((v) => v.id !== id), result: undefined }));
}

export async function setVideoStatus(id: string, status: VideoStatus): Promise<void> {
  const now = new Date().toISOString();
  await update((list) => ({
    list: list.map((v) => (v.id === id ? { ...v, status, updatedAt: now } : v)),
    result: undefined,
  }));
}

/** Swap with the neighbour in the current order, then number everything 10, 20, 30... so there are always gaps */
export async function moveVideo(id: string, direction: "up" | "down"): Promise<void> {
  await update((list) => {
    const sorted = sortVideos(list);
    const i = sorted.findIndex((v) => v.id === id);
    const j = direction === "up" ? i - 1 : i + 1;
    if (i === -1 || j < 0 || j >= sorted.length) return { list, result: undefined };
    [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
    return { list: sorted.map((v, k) => ({ ...v, order: (k + 1) * 10 })), result: undefined };
  });
}

/** For the editor pickers: every subject with its chapters and lessons, read from the course data */
export function pickerData() {
  return getSubjects().map((s) => ({
    id: s.id as string,
    label: s.label,
    chapters: s.chapters.map((c) => ({ id: c.id, title: c.title, lessons: c.clues.map((k) => ({ id: k.id, title: k.title })) })),
  }));
}
