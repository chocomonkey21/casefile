import type { Block, Board, CaseDef, ClueContent, ClueDef, EvidenceDef, Grade, Question, SubjectId, VerdictQuestion } from "@/lib/types";

/*
  A compact way to write a lesson, and the builder that turns it into what the app already uses:
    - a ClueDef (the lesson in its chapter's list, with its evidence)
    - a ClueContent (the question, hints, readings, practice and quiz)
    - VerdictQuestions (two for the chapter's final test)

  One lesson = a question it answers, learning goals, an explanation, a "Try it" activity, two practice
  questions (not scored), three quiz questions (the Interrogation Room) and two final-test questions.
  The video for each lesson lives in data/videos-curated.ts, not here.

  Question shape (Q): p = the question, a = the right answer, w = wrong answers each with feedback shown when picked,
  x = the explanation shown after answering, h = an optional hint, lineup = show it as "which idea is true?".
*/

/* Short helpers for writing readings */
export const p = (text: string): Block => ({ type: "p", text });
export const h = (text: string): Block => ({ type: "h", text });
export const tip = (title: string, text: string): Block => ({ type: "tip", title, text });
export const list = (...items: string[]): Block => ({ type: "list", items });

export type Wrong = [text: string, why: string];

export type Q = {
  p: string;
  a: string;
  w: Wrong[];
  x: string;
  h?: string;
  lineup?: boolean;
};

export type LessonSpec = {
  id: string;
  title: string;
  /** One friendly line on the lesson card */
  teaser: string;
  minutes?: number;
  /** The one question this lesson answers */
  question: string;
  goals: string[];
  /** Hint 1: a nudge */
  hint: string;
  /** Hint 3: the reasoning, step by step */
  walk: string;
  /** The short explanation shown after the third hint */
  summary: string[];
  /** The main reading */
  explain: Block[];
  /** A worked example or activity. Shown as a second reading called "Try it". */
  tryIt: Block[];
  practice: [Q, Q];
  quiz: [Q, Q, Q];
  /** Two questions for the chapter's final test */
  check: [Q, Q];
};

export type ChapterSpec = {
  id: string;
  number: string;
  title: string;
  topic: string;
  subject: SubjectId;
  grade: Grade;
  /** Left out for CBSE chapters (the default board); set to "icse" for ICSE chapters */
  board?: Board;
  tagline: string;
  hook: string;
  goal: string;
  learn: string[];
  lessons: LessonSpec[];
};

/** A small, stable hash so the right answer is not always in the same place, and never changes between builds */
function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

const IDS = ["a", "b", "c", "d"];

function shape(q: Q, id: string) {
  const at = hash(q.p) % (q.w.length + 1);
  const entries = [...q.w.map(([text, why]) => ({ text, why })) ];
  entries.splice(at, 0, { text: q.a, why: "" });
  const options = entries.map((e, i) => (e.why ? { id: IDS[i], text: e.text, why: e.why } : { id: IDS[i], text: e.text }));
  return { id, type: q.lineup ? ("lineup" as const) : ("choice" as const), prompt: q.p, options, correctId: IDS[at] };
}

function question(q: Q, id: string, evidenceId: string): Question {
  return {
    ...shape(q, id),
    hint: q.h ?? "Look back at the reading. The answer is in there.",
    evidenceId,
    walkthrough: q.x,
    explanation: q.x,
  };
}

/** Practice questions have no evidence link and are never scored */
function practiceQuestion(q: Q, id: string): Question {
  return { ...shape(q, id), hint: q.h ?? "Look back at the reading. The answer is in there.", walkthrough: q.x, explanation: q.x };
}

function verdict(q: Q, id: string, clueId: string, evidenceId: string): VerdictQuestion {
  return { ...shape(q, id), clueId, evidenceId, explanation: q.x };
}

const ev = (kind: EvidenceDef["kind"], id: string, title: string, minutes: number, blurb: string): EvidenceDef => ({ id, kind, title, minutes, blurb });

export type BuiltLesson = { clue: ClueDef; content: ClueContent; verdict: VerdictQuestion[] };

/** `ns` (the chapter id) keeps question ids unique across chapters, since two chapters can have lessons with the same id */
export function buildLesson(spec: LessonSpec, ns: string): BuiltLesson {
  const key = `${ns}-${spec.id}`;
  const read = `${spec.id}-read`;
  const tryId = `${spec.id}-try`;
  const prac = `${spec.id}-practice`;
  const clue: ClueDef = {
    id: spec.id,
    title: spec.title,
    goals: spec.goals,
    teaser: spec.teaser,
    minutes: spec.minutes ?? 9,
    evidence: [
      ev("reading", read, spec.title, 4, spec.goals[0] ?? spec.teaser),
      ev("reading", tryId, "Try it", 3, "A worked example or short activity."),
      ev("practice", prac, "Check your understanding", 2, "Two quick practice questions."),
    ],
  };
  const content: ClueContent = {
    question: spec.question,
    hints: {
      nudge: spec.hint,
      evidenceId: read,
      evidenceNote: `Open the reading “${spec.title}”. The key idea is in there.`,
      walkthrough: spec.walk,
    },
    explanation: spec.summary,
    evidence: {
      [read]: { kind: "reading", blocks: spec.explain },
      [tryId]: { kind: "reading", blocks: spec.tryIt },
      [prac]: {
        kind: "practice",
        intro: "Two quick ones to check you have the idea. These are just for practice.",
        questions: spec.practice.map((q, i) => practiceQuestion(q, `${key}-p${i + 1}`)),
      },
    },
    quiz: spec.quiz.map((q, i) => question(q, `${key}-q${i + 1}`, read)),
  };
  return { clue, content, verdict: spec.check.map((q, i) => verdict(q, `v-${key}-${i + 1}`, spec.id, read)) };
}

export type BuiltChapter = { caseDef: CaseDef; lessons: Record<string, ClueContent>; verdict: VerdictQuestion[] };

export function buildChapter(spec: ChapterSpec): BuiltChapter {
  const built = spec.lessons.map((l) => buildLesson(l, spec.id));
  return {
    caseDef: {
      id: spec.id,
      number: spec.number,
      title: spec.title,
      topic: spec.topic,
      subject: spec.subject,
      grade: spec.grade,
      ...(spec.board ? { board: spec.board } : {}),
      tagline: spec.tagline,
      hook: spec.hook,
      goal: spec.goal,
      learn: spec.learn,
      clues: built.map((b) => b.clue),
    },
    lessons: Object.fromEntries(built.map((b, i) => [spec.lessons[i].id, b.content])),
    verdict: built.flatMap((b) => b.verdict),
  };
}
