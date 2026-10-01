export type AvatarId = "magnifier" | "fedora" | "key" | "compass" | "lantern" | "watch";

export type Grade = 6 | 7 | 8 | 9 | 10;

export type Profile = {
  name: string;
  avatarId: AvatarId;
  interests: string[];
  grade: Grade;
};

export type RankId = "rookie" | "junior" | "detective" | "inspector" | "chief";

export type Rank = {
  id: RankId;
  name: string;
  /** Learning progress needed to reach this level (see levelFor in progress.ts) */
  minScore: number;
};

/* ---------- Course content (mock data lives in src/data) ---------- */

export type SubjectId = "science" | "maths" | "history" | "english" | "practice";

export type EvidenceKind = "reading" | "video" | "diagram" | "practice";

export type EvidenceDef = {
  id: string;
  kind: EvidenceKind;
  title: string;
  minutes: number;
  blurb: string;
};

export type ClueDef = {
  id: string;
  title: string;
  /** One friendly line shown on the clue card */
  teaser: string;
  minutes: number;
  evidence: EvidenceDef[];
};

export type CaseDef = {
  id: string;
  /** Shown like a file number, e.g. "017" */
  number: string;
  title: string;
  /** Plain name of what is being studied, e.g. "Fractions". Used in sentences like "Time to revise: Fractions". */
  topic: string;
  subject: SubjectId;
  tagline: string;
  /** The story that opens the brief */
  hook: string;
  goal: string;
  learn: string[];
  clues: ClueDef[];
  /** Lighter placeholder case. Content gets swapped in later. */
  stub?: boolean;
  /** The short tutorial case from onboarding */
  practice?: boolean;
};

/* ---------- Saved progress ---------- */

export type CaseStatus = "open" | "active" | "cold" | "closed";

export type ClueState = "solved" | "open" | "locked";

export type ClueProgress = {
  solved: boolean;
  solvedAt: string | null;
  /** Interrogation results, used by The Lab */
  quiz?: { firstTry: number; total: number };
};

export type Note = {
  id: string;
  caseId: string;
  clueId: string | null;
  text: string;
  createdAt: string;
};

/** Everything we save in localStorage. */
export type CaseFileState = {
  profile: Profile | null;
  /** When the student set up their profile (ISO time) */
  joinedAt: string | null;
  /** The "How CaseFile works" walkthrough has been seen or skipped */
  explainerSeen: boolean;
  streak: {
    count: number;
    /** Local date of the last study day, as YYYY-MM-DD */
    lastDay: string | null;
  };
  /** Keyed by `${caseId}:${clueId}` */
  clues: Record<string, ClueProgress>;
  /** ISO time the student last worked on each case. Drives Open / Active / Cold. */
  caseActivity: Record<string, string>;
  closedCases: Record<string, { closedAt: string; score: number }>;
  notes: Note[];
  /** Evidence the student collected, keyed by `${caseId}:${clueId}:${evidenceId}` with the ISO time. Shown on the Evidence Board. */
  collected: Record<string, string>;
  board: BoardState;
  /** Latest Verdict attempt per case (passed or not) */
  verdicts: Record<string, VerdictRecord>;
  /** Student chose "Reduce motion" in the profile menu (on top of the device setting) */
  reduceMotion: boolean;
};

/* ---------- Lesson content ---------- */

/** Building blocks for reading evidence */
export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; title: string; text: string };

export type QuestionOption = {
  id: string;
  text: string;
  /** Shown when this option is picked and it is wrong. For a lineup this explains the red herring. */
  why?: string;
};

export type Question = {
  id: string;
  /** "lineup" shows the options as a suspect lineup of ideas (misconceptions) */
  type: "choice" | "lineup";
  prompt: string;
  options: QuestionOption[];
  correctId: string;
  /** Hint level 1: a nudge */
  hint: string;
  /** Hint level 3: walks through the reasoning */
  walkthrough: string;
  /** Hint level 2 points the student to this evidence */
  evidenceId?: string;
  explanation: string;
};

export type DiagramId = "evap-close" | "cold-glass" | "four-types" | "where-rain-goes" | "cycle-map";

export type EvidenceContent =
  | { kind: "reading"; blocks: Block[] }
  | { kind: "diagram"; diagramId: DiagramId; caption: string; alt: string; notice: string[] }
  | { kind: "video"; explainer: "puddle" | "drop"; steps: string[] }
  | {
      kind: "practice";
      intro: string;
      questions?: Question[];
      /** Put these in order. Items are listed in the correct order. */
      order?: { prompt: string; items: string[] };
    };

export type ClueContent = {
  /** The one question this clue answers. Hints are about this. */
  question: string;
  hints: {
    nudge: string;
    evidenceId: string;
    evidenceNote: string;
    walkthrough: string;
  };
  /** Full explanation shown after hint 3 */
  explanation: string[];
  evidence: Record<string, EvidenceContent>;
  /** The Interrogation Room questions for this clue */
  quiz: Question[];
};

/* ---------- Evidence Board ---------- */

export type BoardState = {
  /** Card centre. `x` is a fraction of the board width (0 to 1), `y` is pixels from the top. Cards without an entry get an automatic spot. */
  positions: Record<string, { x: number; y: number }>;
  /** Red strings. Each is a pair of evidence keys. */
  strings: [string, string][];
};

/* ---------- The Verdict ---------- */

/** A Verdict question has no hints (it is the final test) and belongs to a clue, so results can show what to review */
export type VerdictQuestion = Omit<Question, "hint" | "walkthrough"> & { clueId: string };

/** The latest Verdict attempt for a case */
export type VerdictRecord = {
  at: string;
  correct: number;
  total: number;
  byClue: Record<string, { correct: number; total: number }>;
};
