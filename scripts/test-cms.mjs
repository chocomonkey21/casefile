// Tests for the parts of the video CMS that guard security: which links may be embedded, and editor sign-in.
// Run with: npm run test:cms   (uses Node's built-in test runner, no extra packages)
import assert from "node:assert/strict";
import { test } from "node:test";
import { parseCaptionsUrl, parseThumbnail, parseVideoUrl } from "../src/lib/cms/embed.ts";
import { checkPassword, editorConfig, signSession, verifySession } from "../src/lib/cms/session.ts";

const ok = (raw) => {
  const r = parseVideoUrl(raw);
  assert.equal(r.ok, true, `expected ${raw} to be accepted: ${r.ok ? "" : r.error}`);
  return r.video;
};
const bad = (raw) => assert.equal(parseVideoUrl(raw).ok, false, `expected ${raw} to be rejected`);

test("YouTube links in every common form map to the privacy-enhanced player", () => {
  const id = "dQw4w9WgXcQ";
  for (const raw of [
    `https://www.youtube.com/watch?v=${id}`,
    `https://youtube.com/watch?v=${id}&t=30s`,
    `https://m.youtube.com/watch?v=${id}`,
    `https://youtu.be/${id}`,
    `https://www.youtube.com/embed/${id}`,
    `https://www.youtube.com/shorts/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
  ]) {
    const v = ok(raw);
    assert.equal(v.provider, "youtube");
    assert.ok(v.embedUrl.startsWith(`https://www.youtube-nocookie.com/embed/${id}`));
    assert.equal(v.openUrl, `https://www.youtube.com/watch?v=${id}`);
  }
});

test("Vimeo links, including unlisted ones, map to the Vimeo player", () => {
  assert.equal(ok("https://vimeo.com/123456789").embedUrl, "https://player.vimeo.com/video/123456789?dnt=1");
  assert.equal(ok("https://vimeo.com/123456789/abcdef1234").embedUrl, "https://player.vimeo.com/video/123456789?dnt=1&h=abcdef1234");
  assert.equal(ok("https://player.vimeo.com/video/123456789?h=abcdef1234").provider, "vimeo");
});

test("direct video files are accepted over https only", () => {
  assert.equal(ok("https://example.org/media/lesson.mp4").provider, "file");
  assert.equal(ok("https://example.org/media/lesson.webm?x=1").provider, "file");
  bad("http://example.org/lesson.mp4");
});

test("anything that could smuggle in other content is rejected", () => {
  for (const raw of [
    "",
    "not a url",
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "https://evil.example/embed?src=https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com.evil.example/watch?v=dQw4w9WgXcQ",
    "https://evil.example/www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://user:pass@www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com:8443/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=short",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ%22onload=alert(1)",
    "https://vimeo.com/notanumber",
    "https://example.org/page.html",
    "https://example.org/video.mp4.exe",
  ]) {
    bad(raw);
  }
});

test("embed addresses never contain quotes or angle brackets", () => {
  const v = ok("https://www.youtube.com/watch?v=dQw4w9WgXcQ&x=%22%3E%3Cscript%3E");
  assert.ok(!/["'<>]/.test(v.embedUrl) && !/["'<>]/.test(v.openUrl));
});

test("captions and thumbnails are checked too", () => {
  assert.equal(parseCaptionsUrl("https://example.org/c.vtt").ok, true);
  assert.equal(parseCaptionsUrl("https://example.org/c.html").ok, false);
  assert.equal(parseCaptionsUrl("http://example.org/c.vtt").ok, false);
  assert.equal(parseThumbnail("/video-thumbnails/a.jpg").ok, true);
  assert.equal(parseThumbnail("https://example.org/a.png").ok, true);
  assert.equal(parseThumbnail("//evil.example/a.png").ok, false);
  assert.equal(parseThumbnail("/../etc/a.png").ok, false);
  assert.equal(parseThumbnail("/a.html").ok, false);
  assert.equal(parseThumbnail("javascript:alert(1)").ok, false);
});

test("editing is switched off unless both secrets are long enough", () => {
  assert.equal(editorConfig({}).configured, false);
  assert.equal(editorConfig({ EDITOR_PASSWORD: "short", EDITOR_SESSION_SECRET: "x".repeat(40) }).configured, false);
  assert.equal(editorConfig({ EDITOR_PASSWORD: "a-long-enough-password", EDITOR_SESSION_SECRET: "short" }).configured, false);
  assert.equal(editorConfig({ EDITOR_PASSWORD: "a-long-enough-password", EDITOR_SESSION_SECRET: "x".repeat(32) }).configured, true);
});

test("password check", () => {
  assert.equal(checkPassword("correct horse battery", "correct horse battery"), true);
  assert.equal(checkPassword("correct horse batterz", "correct horse battery"), false);
  assert.equal(checkPassword("", "correct horse battery"), false);
});

test("session cookies: valid, expired, tampered and wrong-secret tokens", () => {
  const secret = "s".repeat(40);
  const now = Date.UTC(2026, 0, 1, 12, 0, 0);
  const token = signSession(secret, now);
  assert.equal(verifySession(secret, token, now + 1000), true);
  assert.equal(verifySession(secret, token, now + 9 * 60 * 60 * 1000), false, "expires after 8 hours");
  assert.equal(verifySession("t".repeat(40), token, now + 1000), false, "wrong secret");
  const [exp, sig] = token.split(".");
  assert.equal(verifySession(secret, `${Number(exp) + 99999}.${sig}`, now + 1000), false, "extended expiry");
  assert.equal(verifySession(secret, `${exp}.${sig.slice(0, -2)}AA`, now + 1000), false, "edited signature");
  for (const junk of [undefined, "", "abc", "1.2.3", ".", `${exp}.`, `.${sig}`]) {
    assert.equal(verifySession(secret, junk, now), false);
  }
});
