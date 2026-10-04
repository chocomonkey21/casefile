// Writes docs/CURRICULUM.md: every board, grade, subject, chapter and lesson, with its video (title, channel, link,
// why it fits, caveat, captions). It is built from the real project data, so it cannot drift from what is in the app.
// Run with: npm run report:curriculum
import { mkdirSync, writeFileSync } from "node:fs";
import { cleanup, compileData } from "./lib/compile-data.mjs";

const load = compileData();
const { CASES } = load("data/cases.js");
const { CURATED_VIDEOS } = load("data/videos-curated.js");
cleanup();

const SUBJECTS = ["science", "maths", "history", "geography"];
const BOARDS = [["cbse", "CBSE"], ["icse", "ICSE"]];
const label = (s) => s[0].toUpperCase() + s.slice(1);
const boardOf = (c) => c.board ?? "cbse";
const chapters = CASES.filter((c) => !c.practice && c.grade);
const videoOf = (caseId, clueId) => CURATED_VIDEOS.find((v) => v.caseId === caseId && v.clueId === clueId);
const tick = "`";

let md = `# CaseFile curriculum, Grades 6 to 10

Generated from the project data by ${tick}npm run report:curriculum${tick}. Do not edit by hand.

Chapters are listed separately for each board, and students see only their own board's chapters.
The original library was placed under **CBSE** at the client's request, and an **ICSE** library was added.
Neither list has been checked against the official CBSE (NCERT) or CISCE syllabus. The topics are commonly taught at
these levels, but the grade levels and chapter choices are suggestions by the project team.
Every lesson has one YouTube video. Each video was checked with YouTube's embed lookup, and the title and channel below are exactly what YouTube reports.
Videos are embedded, never downloaded or copied, and can be removed by their owners at any time (${tick}npm run check:videos${tick} re-checks them).
`;

for (const [b, name] of BOARDS) {
  const list = chapters.filter((c) => boardOf(c) === b);
  md += `\n## ${name}: chapters / lessons per grade and subject\n\n| Grade | ${SUBJECTS.map(label).join(" | ")} |\n| --- | ${SUBJECTS.map(() => "---").join(" | ")} |\n`;
  for (const g of [6, 7, 8, 9, 10]) {
    const cells = SUBJECTS.map((s) => {
      const cs = list.filter((c) => c.grade === g && c.subject === s);
      return `${cs.length} / ${cs.reduce((n, c) => n + c.clues.length, 0)}`;
    });
    md += `| ${g} | ${cells.join(" | ")} |\n`;
  }
  md += `\n${name} total: ${list.reduce((n, c) => n + c.clues.length, 0)} lessons in ${list.length} chapters.\n`;
}
md += `\nAll boards: ${chapters.reduce((n, c) => n + c.clues.length, 0)} lessons in ${chapters.length} chapters, ${CURATED_VIDEOS.length} videos.\n`;

for (const [b, name] of BOARDS) {
  for (const g of [6, 7, 8, 9, 10]) {
    md += `\n## ${name}, Grade ${g}\n`;
    for (const s of SUBJECTS) {
      for (const c of chapters.filter((x) => boardOf(x) === b && x.grade === g && x.subject === s)) {
        md += `\n### ${label(s)}: ${c.title}\n\n${c.topic}. Case no. ${c.number}. Route: ${tick}/cases/${c.id}${tick}\n\n`;
        c.clues.forEach((k, i) => {
          const v = videoOf(c.id, k.id);
          md += `${i + 1}. **${k.title}**\n`;
          if (v) {
            md += `   - Video: [${v.sourceTitle}](https://www.youtube.com/watch?v=${v.youtubeId}) by ${v.channel} (ID ${tick}${v.youtubeId}${tick})\n`;
            md += `   - Why it fits: ${v.why}\n`;
            if (v.note) md += `   - Caveat: ${v.note}\n`;
            if (v.captions) md += `   - Captions: ${v.captions}\n`;
          } else md += `   - **No video found**\n`;
        });
      }
    }
  }
}
mkdirSync("docs", { recursive: true });
writeFileSync("docs/CURRICULUM.md", md);
console.log(`Wrote docs/CURRICULUM.md (${chapters.length} chapters).`);
