// Checks the course data: every lesson is complete, every question has exactly one right answer with feedback on the
// wrong ones, every grade and subject has at least five lessons, and every lesson has its own verified video.
// Run with: npm run check:curriculum
import { cleanup, compileData } from "./lib/compile-data.mjs";

const load = compileData();
const { CASES } = load("data/cases.js");
const { getLesson } = load("data/lessons/index.js");
const { getVerdict } = load("data/verdicts.js");
const { CURATED_VIDEOS } = load("data/videos-curated.js");
const { SPECS, NEW_CASES, TOP_UP_CLUES } = load("data/curriculum/specs.js");
const meta = load("data/curriculum/meta.generated.js");

const problems = [];
const bad = (msg) => problems.push(msg);

/* ---- The small browser-side file must match the chapter files */
if (JSON.stringify(meta.NEW_CASES) !== JSON.stringify(NEW_CASES) || JSON.stringify(meta.TOP_UP_CLUES) !== JSON.stringify(TOP_UP_CLUES)) {
  bad("src/data/curriculum/meta.generated.ts is out of date. Run: npm run gen:curriculum");
}

/* ---- Every question: one right answer, unique options, feedback on wrong answers */
function checkQuestion(where, q, { needWhy }) {
  const ids = q.options.map((o) => o.id);
  if (new Set(ids).size !== ids.length) bad(`${where}: duplicate option ids`);
  const texts = q.options.map((o) => o.text.trim());
  if (new Set(texts).size !== texts.length) bad(`${where}: two options have the same text`);
  if (q.options.length < 2 || q.options.length > 4) bad(`${where}: ${q.options.length} options`);
  if (!ids.includes(q.correctId)) bad(`${where}: correctId ${q.correctId} is not an option`);
  if (!q.prompt?.trim() || !q.explanation?.trim()) bad(`${where}: missing prompt or explanation`);
  for (const o of q.options) {
    if (!o.text?.trim()) bad(`${where}: empty option`);
    if (needWhy && o.id !== q.correctId && !o.why?.trim()) bad(`${where}: wrong option "${o.text.slice(0, 30)}" has no feedback`);
    if (o.id === q.correctId && o.why) bad(`${where}: correct option has wrong-answer feedback`);
  }
}

const MAIN = ["science", "maths", "history", "geography"];
const matrix = {};
const chapterMatrix = {};
const seenQ = new Set();
let lessons = 0;
let questions = 0;
let emDash = 0;

for (const c of CASES) {
  const verdict = getVerdict(c.id) ?? [];
  for (const clue of c.clues) {
    const where = `${c.id}/${clue.id}`;
    const content = getLesson(c.id, clue.id);
    if (!content) { bad(`${where}: no lesson content`); continue; }
    lessons++;
    if (c.practice) continue;
    // evidence list and content agree
    for (const e of clue.evidence) if (!content.evidence[e.id]) bad(`${where}: evidence ${e.id} has no content`);
    for (const id of Object.keys(content.evidence)) if (!clue.evidence.some((e) => e.id === id)) bad(`${where}: content ${id} is not in the evidence list`);
    if (!clue.goals || clue.goals.length < 3) bad(`${where}: needs at least 3 learning goals`);
    if (content.quiz.length < 3) bad(`${where}: fewer than 3 quiz questions`);
    content.quiz.forEach((q, i) => { checkQuestion(`${where} quiz ${i + 1}`, q, { needWhy: false }); questions++; if (seenQ.has(q.id)) bad(`${where}: duplicate question id ${q.id}`); seenQ.add(q.id); });
    for (const [eid, ev] of Object.entries(content.evidence)) {
      if (ev.kind === "reading" && ev.blocks.length < 3) bad(`${where}/${eid}: reading is very short`);
      if (ev.kind === "practice") (ev.questions ?? []).forEach((q, i) => { checkQuestion(`${where}/${eid} practice ${i + 1}`, q, { needWhy: false }); questions++; });
    }
    if (!verdict.some((v) => v.clueId === clue.id)) bad(`${where}: no final-test question`);
    // em dashes are not used in CaseFile writing
    if (JSON.stringify([clue, content]).includes("—")) emDash++;
    if (c.grade && MAIN.includes(c.subject)) {
      const k = `${c.grade}|${c.subject}`;
      matrix[k] = (matrix[k] ?? 0) + 1;
    }
  }
  for (const v of verdict) { checkQuestion(`${c.id} final ${v.id}`, v, { needWhy: false }); if (!c.clues.some((k) => k.id === v.clueId)) bad(`${c.id}: final-test question ${v.id} points at missing lesson ${v.clueId}`); }
  if (!c.practice && (!c.grade || c.grade < 6 || c.grade > 10)) bad(`${c.id}: needs a grade from 6 to 10`);
  if (!c.practice && verdict.length < c.clues.length) bad(`${c.id}: final test has fewer questions than lessons`);
  if (!c.practice && c.clues.length < 1) bad(`${c.id}: a chapter needs at least one lesson`);
  if (c.grade && MAIN.includes(c.subject)) chapterMatrix[`${c.grade}|${c.subject}`] = (chapterMatrix[`${c.grade}|${c.subject}`] ?? 0) + 1;
}
const ids = CASES.map((c) => c.id);
for (const id of ids.filter((x, i) => ids.indexOf(x) !== i)) bad(`duplicate chapter id ${id}`);
const numbers = CASES.map((c) => c.number);
for (const n of numbers.filter((x, i) => numbers.indexOf(x) !== i)) bad(`duplicate case number ${n}`);

/* ---- New chapters: authoring rules. The first 15 have 5 lessons each; the extra chapters (extra-g*.ts) may have fewer,
   as long as every grade and subject still has at least 3 chapters and 5 lessons (checked below). */
for (const s of SPECS) {
  if (s.lessons.length < 1) bad(`${s.id}: no lessons`);
  for (const l of s.lessons) {
    if (l.practice.length !== 2 || l.quiz.length !== 3 || l.check.length !== 2) bad(`${s.id}/${l.id}: needs 2 practice, 3 quiz and 2 final-test questions`);
    for (const q of [...l.practice, ...l.quiz, ...l.check]) {
      if (q.w.length < 2 || q.w.length > 3) bad(`${s.id}/${l.id}: "${q.p.slice(0, 40)}" has ${q.w.length} wrong answers`);
      if (q.w.some(([t]) => t.trim() === q.a.trim())) bad(`${s.id}/${l.id}: a wrong answer repeats the right one`);
    }
  }
}

/* ---- Videos: one per lesson, none reused, all point at real lessons */
const lessonKeys = new Set(CASES.filter((c) => !c.practice).flatMap((c) => c.clues.map((k) => `${c.id}/${k.id}`)));
const videoKeys = CURATED_VIDEOS.map((v) => `${v.caseId}/${v.clueId}`);
for (const k of lessonKeys) if (!videoKeys.includes(k)) bad(`${k}: no video`);
for (const k of videoKeys) if (!lessonKeys.has(k)) bad(`${k}: video points at a lesson that does not exist`);
const dupVideo = CURATED_VIDEOS.map((v) => v.youtubeId).filter((v, i, a) => a.indexOf(v) !== i);
if (dupVideo.length) bad(`video reused across lessons: ${dupVideo.join(", ")}`);
for (const v of CURATED_VIDEOS) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(v.youtubeId)) bad(`${v.caseId}/${v.clueId}: malformed video id`);
  const c = CASES.find((x) => x.id === v.caseId);
  if (c && (c.grade !== v.grade || c.subject !== v.subject)) bad(`${v.caseId}/${v.clueId}: video grade or subject does not match the chapter`);
}

/* ---- The grade by subject matrix */
console.log("\nChapters / lessons per grade and subject (each needs at least 3 chapters and 5 lessons):\n");
console.log("Grade".padEnd(8) + MAIN.map((s) => s.padEnd(11)).join(""));
for (const g of [6, 7, 8, 9, 10]) {
  console.log(String(g).padEnd(8) + MAIN.map((s) => `${chapterMatrix[`${g}|${s}`] ?? 0} / ${matrix[`${g}|${s}`] ?? 0}`.padEnd(11)).join(""));
  for (const s of MAIN) if ((chapterMatrix[`${g}|${s}`] ?? 0) < 3) bad(`Grade ${g} ${s}: only ${chapterMatrix[`${g}|${s}`] ?? 0} chapters`);
  for (const s of MAIN) if ((matrix[`${g}|${s}`] ?? 0) < 5) bad(`Grade ${g} ${s}: only ${matrix[`${g}|${s}`] ?? 0} lessons`);
}
if (emDash) bad(`${emDash} lessons contain an em dash`);
console.log(`\n${lessons} lessons checked (including the practice case), ${questions} questions, ${CURATED_VIDEOS.length} videos.`);

cleanup();
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems.slice(0, 60)) console.log("  - " + p);
  process.exit(1);
}
console.log("\nAll checks pass.");
