// Writes docs/CURRICULUM.md: every grade, subject, chapter and lesson, with its video (title, channel, link, why it fits, caveat).
// It is built from the real project data, so it cannot drift from what is in the app. Run with: npm run report:curriculum
import { mkdirSync, writeFileSync } from "node:fs";
import { cleanup, compileData } from "./lib/compile-data.mjs";

const load = compileData();
const { CASES } = load("data/cases.js");
const { CURATED_VIDEOS } = load("data/videos-curated.js");
cleanup();

const SUBJECTS = ["science", "maths", "history", "geography"];
const label = (s) => s[0].toUpperCase() + s.slice(1);
const chapters = CASES.filter((c) => !c.practice && c.grade);
const videoOf = (caseId, clueId) => CURATED_VIDEOS.find((v) => v.caseId === caseId && v.clueId === clueId);

let md = `# CaseFile curriculum, Grades 6 to 10

Generated from the project data by \`npm run report:curriculum\`. Do not edit by hand.

Grades are **suggested levels chosen by the project team**. They are not matched to any official curriculum or exam board.
Every lesson has one YouTube video. Each video was checked with YouTube's embed lookup, and the title and channel below are exactly what YouTube reports.
Videos are embedded, never downloaded or copied, and can be removed by their owners at any time (\`npm run check:videos\` re-checks them).

## Lessons per grade and subject

| Grade | ${SUBJECTS.map(label).join(" | ")} |
| --- | ${SUBJECTS.map(() => "---").join(" | ")} |
`;
for (const g of [6, 7, 8, 9, 10]) {
  md += `| ${g} | ${SUBJECTS.map((s) => chapters.filter((c) => c.grade === g && c.subject === s).reduce((n, c) => n + c.clues.length, 0)).join(" | ")} |\n`;
}
md += `\nTotal: ${chapters.reduce((n, c) => n + c.clues.length, 0)} lessons in ${chapters.length} chapters, ${CURATED_VIDEOS.length} videos.\n`;

for (const g of [6, 7, 8, 9, 10]) {
  md += `\n## Grade ${g}\n`;
  for (const s of SUBJECTS) {
    for (const c of chapters.filter((x) => x.grade === g && x.subject === s)) {
      md += `\n### ${label(s)}: ${c.title}\n\n${c.topic}. Case no. ${c.number}. Route: \`/cases/${c.id}\`\n\n`;
      c.clues.forEach((k, i) => {
        const v = videoOf(c.id, k.id);
        md += `${i + 1}. **${k.title}**\n`;
        if (v) {
          md += `   - Video: [${v.sourceTitle}](https://www.youtube.com/watch?v=${v.youtubeId}) by ${v.channel} (ID \`${v.youtubeId}\`)\n`;
          md += `   - Why it fits: ${v.why}\n`;
          if (v.note) md += `   - Caveat: ${v.note}\n`;
        } else md += `   - **No video found**\n`;
      });
    }
  }
}
mkdirSync("docs", { recursive: true });
writeFileSync("docs/CURRICULUM.md", md);
console.log(`Wrote docs/CURRICULUM.md (${chapters.length} chapters).`);
