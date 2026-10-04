// Re-checks every built-in lesson video against YouTube's own embed lookup (oEmbed):
// the video still exists, can still be embedded, and still has the title and channel recorded in the project.
// Run with: npm run check:videos   (needs an internet connection; videos can be removed by their owners at any time)
import { cleanup, compileData } from "./lib/compile-data.mjs";

const load = compileData();
const { CURATED_VIDEOS } = load("data/videos-curated.js");
cleanup();

const problems = [];
let ok = 0;
for (const v of CURATED_VIDEOS) {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent("https://www.youtube.com/watch?v=" + v.youtubeId)}&format=json`;
  let res;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  const label = `${v.caseId}/${v.clueId} (${v.youtubeId})`;
  if (!res) { problems.push(`${label}: could not reach YouTube`); continue; }
  if (res.status === 404) { problems.push(`${label}: video no longer exists`); continue; }
  if (res.status === 401 || res.status === 403) { problems.push(`${label}: embedding is now disabled`); continue; }
  if (!res.ok) { problems.push(`${label}: YouTube answered ${res.status}`); continue; }
  const info = await res.json();
  if (info.title !== v.sourceTitle) problems.push(`${label}: title changed to "${info.title}"`);
  if (info.author_name !== v.channel) problems.push(`${label}: channel changed to "${info.author_name}"`);
  ok++;
  await new Promise((r) => setTimeout(r, 120));
}
console.log(`${ok} of ${CURATED_VIDEOS.length} videos verified.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log("  - " + p);
  process.exit(1);
}
console.log("All videos are still available, embeddable and match their recorded title and channel.");
