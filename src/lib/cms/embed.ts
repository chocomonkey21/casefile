/*
  Turns a video link an editor pastes into something safe to play on the page.

  Only three sources are accepted, and nothing else is ever put in an iframe:
    - YouTube (watch, youtu.be, shorts, embed links) -> youtube-nocookie.com player
    - Vimeo (public and unlisted links)              -> player.vimeo.com player
    - A direct https link to an .mp4, .webm or .ogv file -> the browser's own <video> player

  This file has no imports so it can be tested on its own (see scripts/test-cms.mjs).
*/

export type VideoProvider = "youtube" | "vimeo" | "file";

export type ParsedVideo = {
  provider: VideoProvider;
  /** What the player loads: an iframe address, or the video file itself */
  embedUrl: string;
  /** The page a viewer can open if embedding fails */
  openUrl: string;
};

export type ParseResult = { ok: true; video: ParsedVideo } | { ok: false; error: string };

export const SUPPORTED_SOURCES = "YouTube, Vimeo, or a direct https link to an .mp4, .webm or .ogv file";

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "youtu.be",
]);
const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com"]);
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID = /^\d{5,12}$/;
const VIMEO_HASH = /^[A-Za-z0-9]{6,20}$/;
const FILE_EXT = /\.(mp4|webm|ogv)$/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|svg)$/i;

const fail = (error: string): ParseResult => ({ ok: false, error });

function toUrl(raw: string): URL | null {
  try {
    return new URL(raw.trim());
  } catch {
    return null;
  }
}

/** Shared checks for every address: https only, no embedded passwords, no odd ports */
export function checkHttps(url: URL | null): string | null {
  if (!url) return "That does not look like a web address.";
  if (url.protocol !== "https:") return "The address must start with https://.";
  if (url.username || url.password) return "The address must not contain a username or password.";
  if (url.port) return "The address must not include a port number.";
  return null;
}

function youtubeId(url: URL): string | null {
  const parts = url.pathname.split("/").filter(Boolean);
  let id: string | undefined;
  if (url.hostname === "youtu.be") id = parts[0];
  else if (parts[0] === "watch") id = url.searchParams.get("v") ?? undefined;
  else if (["embed", "shorts", "live", "v"].includes(parts[0])) id = parts[1];
  return id && YOUTUBE_ID.test(id) ? id : null;
}

function vimeoParts(url: URL): { id: string; hash: string | null } | null {
  const parts = url.pathname.split("/").filter(Boolean);
  const rest = url.hostname === "player.vimeo.com" ? (parts[0] === "video" ? parts.slice(1) : []) : parts;
  const id = rest[0];
  if (!id || !VIMEO_ID.test(id)) return null;
  // Unlisted videos carry a hash, either in the path (vimeo.com/ID/HASH) or as ?h=HASH
  const hash = rest[1] ?? url.searchParams.get("h");
  return { id, hash: hash && VIMEO_HASH.test(hash) ? hash : null };
}

export function parseVideoUrl(raw: string): ParseResult {
  const url = toUrl(raw);
  const problem = checkHttps(url);
  if (problem || !url) return fail(`${problem} Use ${SUPPORTED_SOURCES}.`);

  const host = url.hostname.toLowerCase();

  if (YOUTUBE_HOSTS.has(host)) {
    const id = youtubeId(url);
    if (!id) return fail("That YouTube link has no valid video in it. Copy the link from the video page.");
    return {
      ok: true,
      video: {
        provider: "youtube",
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`,
        openUrl: `https://www.youtube.com/watch?v=${id}`,
      },
    };
  }

  if (VIMEO_HOSTS.has(host)) {
    const v = vimeoParts(url);
    if (!v) return fail("That Vimeo link has no valid video in it. Copy the link from the video page.");
    const h = v.hash ? `&h=${v.hash}` : "";
    return {
      ok: true,
      video: {
        provider: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${v.id}?dnt=1${h}`,
        openUrl: `https://vimeo.com/${v.id}${v.hash ? `/${v.hash}` : ""}`,
      },
    };
  }

  if (FILE_EXT.test(url.pathname)) {
    return { ok: true, video: { provider: "file", embedUrl: url.toString(), openUrl: url.toString() } };
  }

  return fail(`That source is not supported. Use ${SUPPORTED_SOURCES}.`);
}

type UrlResult = { ok: true; url: string } | { ok: false; error: string };

/** An https address for a captions file (WebVTT) */
export function parseCaptionsUrl(raw: string): UrlResult {
  const url = toUrl(raw);
  const problem = checkHttps(url);
  if (problem || !url) return { ok: false, error: problem ?? "That does not look like a web address." };
  if (!/\.vtt$/i.test(url.pathname)) return { ok: false, error: "Captions must be a WebVTT file ending in .vtt." };
  return { ok: true, url: url.toString() };
}

/**
 * A thumbnail is either an https image address, or a path to an image served by this site (for example
 * /video-thumbnails/puddle.jpg from the public folder). A path on this site keeps a learner's browser
 * from contacting any other site just to show the video list.
 */
export function parseThumbnail(raw: string): UrlResult {
  const value = raw.trim();
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") && !value.includes("..")) {
    return IMAGE_EXT.test(value)
      ? { ok: true, url: value }
      : { ok: false, error: "The thumbnail must be a .jpg, .png, .webp, .avif or .svg image." };
  }
  const url = toUrl(value);
  const problem = checkHttps(url);
  if (problem || !url) {
    return { ok: false, error: `${problem ?? "That does not look like a web address."} Or use a path such as /video-thumbnails/name.jpg.` };
  }
  if (!IMAGE_EXT.test(url.pathname)) return { ok: false, error: "The thumbnail must be a .jpg, .png, .webp, .avif or .svg image." };
  return { ok: true, url: url.toString() };
}
