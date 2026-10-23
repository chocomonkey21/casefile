import { CASES } from "@/data/cases";
import { SUBJECTS } from "@/data/subjects";
import { splitTopics, topicStats } from "./lab";
import { caseStatus, clueKey, dayKey, daysStudiedThisWeek, solvedCount } from "./progress";
import type { CaseFileState, CaseStatus, SubjectId } from "./types";

/*
  The parent view's summary. Built only from the progress already saved in this browser: nothing is sent anywhere,
  there are no accounts, no tracking and no alerts. When nothing is saved yet, exampleState() gives a clearly
  labelled example so a parent can see what the page will show.
*/

export type ParentSummary = {
  name: string | null;
  week: { daysStudied: number; lessonsCompleted: number; quizzesTaken: number };
  subjects: { id: SubjectId; label: string; cases: { title: string; done: number; total: number; status: CaseStatus }[] }[];
  strong: string[];
  practice: string[];
  questions: string[];
};

function startOfWeek(now: Date): string {
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return dayKey(monday);
}

const inWeek = (iso: string | null | undefined, start: string, end: string) => {
  if (!iso) return false;
  const d = dayKey(new Date(iso));
  return d >= start && d <= end;
};

/** "Say what a ratio compares" → "Can you say what a ratio compares?" */
function askFromGoal(goal: string): string {
  const g = goal.trim().replace(/[.?!]+$/, "");
  return `Can you ${g.charAt(0).toLowerCase()}${g.slice(1)}?`;
}

export function buildParentSummary(state: CaseFileState, now: Date = new Date()): ParentSummary {
  const start = startOfWeek(now);
  const end = dayKey(now);
  const chapters = CASES.filter((c) => !c.practice);

  let lessonsCompleted = 0;
  let quizzesTaken = 0;
  const solved: { title: string; goal: string | undefined; at: string }[] = [];
  for (const c of chapters) {
    for (const clue of c.clues) {
      const p = state.clues[clueKey(c.id, clue.id)];
      if (!p?.solved) continue;
      if (inWeek(p.solvedAt, start, end)) {
        lessonsCompleted++;
        if (p.quiz) quizzesTaken++;
      }
      if (p.solvedAt) solved.push({ title: clue.title, goal: clue.goals?.[0], at: p.solvedAt });
    }
    // A final test attempt this week also counts as a quiz taken
    if (inWeek(state.verdicts[c.id]?.at, start, end)) quizzesTaken++;
  }

  const subjects = (Object.keys(SUBJECTS) as SubjectId[])
    .filter((s) => s !== "practice")
    .map((id) => ({
      id,
      label: SUBJECTS[id].label,
      cases: chapters
        .filter((c) => c.subject === id && (state.caseActivity[c.id] || solvedCount(c, state) > 0 || state.closedCases[c.id]))
        .map((c) => ({ title: c.title, done: solvedCount(c, state), total: c.clues.length, status: caseStatus(c, state, now) })),
    }))
    .filter((s) => s.cases.length > 0);

  const { strong, weak } = splitTopics(topicStats(state));
  const latest = solved.sort((a, b) => b.at.localeCompare(a.at)).slice(0, 3);
  const questions = latest.map((l) => (l.goal ? askFromGoal(l.goal) : `Can you tell me what you learned in “${l.title}”?`));

  return {
    name: state.profile?.name ?? null,
    week: { daysStudied: daysStudiedThisWeek(state, now), lessonsCompleted, quizzesTaken },
    subjects,
    strong: strong.slice(0, 3).map((t) => t.clueTitle),
    practice: weak.slice(0, 3).map((t) => t.clueTitle),
    questions,
  };
}

/** True when there is saved learning to summarise */
export function hasProgress(state: CaseFileState): boolean {
  return Object.values(state.clues).some((c) => c.solved) || Object.keys(state.verdicts).length > 0;
}

/** A clearly labelled example, used when nothing is saved on this device yet */
export function exampleState(now: Date = new Date()): CaseFileState {
  const at = (daysAgo: number) => new Date(now.getTime() - daysAgo * 86_400_000).toISOString();
  const today = dayKey(now);
  return {
    profile: { name: "Sam", avatarId: "kenji", interests: [], grade: 7, board: "cbse", subjects: ["science", "maths"] },
    teacher: null,
    joinedAt: at(10),
    explainerSeen: true,
    streak: { count: 0, lastDay: today },
    studyDays: [dayKey(new Date(at(2))), dayKey(new Date(at(1))), today],
    clues: {
      [clueKey("puddle", "evaporation")]: { solved: true, solvedAt: at(2), quiz: { firstTry: 3, total: 3 } },
      [clueKey("puddle", "condensation")]: { solved: true, solvedAt: at(1), quiz: { firstTry: 1, total: 3 } },
      [clueKey("fractions", "what-is")]: { solved: true, solvedAt: at(0), quiz: { firstTry: 3, total: 3 } },
    },
    caseActivity: { puddle: at(1), fractions: at(0) },
    closedCases: {},
    notes: [],
    collected: {},
    board: { positions: {}, strings: [] },
    verdicts: {},
    reduceMotion: false,
  };
}

/** The summary as plain text, for "Share summary" */
export function summaryText(s: ParentSummary, example: boolean): string {
  const lines: string[] = [];
  lines.push(`CaseFile summary${s.name ? ` for ${s.name}` : ""}${example ? " (example)" : ""}`);
  lines.push("");
  lines.push("This week");
  lines.push(`- Days studied: ${s.week.daysStudied}`);
  lines.push(`- Lessons completed: ${s.week.lessonsCompleted}`);
  lines.push(`- Quizzes taken: ${s.week.quizzesTaken}`);
  if (s.subjects.length) {
    lines.push("");
    lines.push("Progress by subject");
    for (const sub of s.subjects) {
      lines.push(`${sub.label}:`);
      for (const c of sub.cases) lines.push(`- ${c.title}: ${c.done} of ${c.total} lessons`);
    }
  }
  if (s.strong.length) lines.push("", `Strong topics: ${s.strong.join(", ")}`);
  if (s.practice.length) lines.push(`Needs practice: ${s.practice.join(", ")}`);
  if (s.questions.length) {
    lines.push("", "Questions to ask at home");
    s.questions.forEach((q) => lines.push(`- ${q}`));
  }
  return lines.join("\n");
}
