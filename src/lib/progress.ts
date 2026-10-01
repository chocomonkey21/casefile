import { INTERESTS } from "@/data/interests";
import { RANKS } from "@/data/ranks";
import type {
  CaseDef,
  CaseFileState,
  CaseStatus,
  ClueDef,
  ClueState,
  Rank,
} from "./types";

/* ---------- Dates and streak ---------- */

/** Local calendar day as YYYY-MM-DD (not UTC, so "today" matches the student's day) */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function yesterdayKey(date: Date = new Date()): string {
  const y = new Date(date);
  y.setDate(y.getDate() - 1);
  return dayKey(y);
}

/**
 * The streak the student should see right now.
 * If they studied today or yesterday it is still alive. Anything older has lapsed.
 */
export function currentStreak(streak: CaseFileState["streak"], now: Date = new Date()): number {
  if (!streak.lastDay) return 0;
  if (streak.lastDay === dayKey(now) || streak.lastDay === yesterdayKey(now)) return streak.count;
  return 0;
}

/* ---------- Levels ---------- */

export type LevelProgress = {
  /** Current level */
  rank: Rank;
  rankIndex: number;
  next: Rank | null;
  /** 0 to 1 progress toward the next level. 1 at the top level. */
  fraction: number;
  /** How many more completed lessons would reach the next level (a closed case counts as 2) */
  remaining: number;
  lessonsCompleted: number;
  casesClosed: number;
};

/**
 * The student's level comes from learning progress, not from points:
 * each completed lesson counts 1 and each closed case counts 2.
 */
export function levelFor(state: CaseFileState): LevelProgress {
  const lessonsCompleted = Object.values(state.clues).filter((c) => c.solved).length;
  const casesClosed = Object.keys(state.closedCases).length;
  const score = lessonsCompleted + casesClosed * 2;

  let rankIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (score >= RANKS[i].minScore) rankIndex = i;
  }
  const rank = RANKS[rankIndex];
  const next = RANKS[rankIndex + 1] ?? null;
  if (!next) return { rank, rankIndex, next: null, fraction: 1, remaining: 0, lessonsCompleted, casesClosed };
  return {
    rank,
    rankIndex,
    next,
    fraction: (score - rank.minScore) / (next.minScore - rank.minScore),
    remaining: next.minScore - score,
    lessonsCompleted,
    casesClosed,
  };
}

/* ---------- Cases, clues and status ---------- */

/** A started case with no activity for this many days goes cold */
export const COLD_AFTER_DAYS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;

export function clueKey(caseId: string, clueId: string) {
  return `${caseId}:${clueId}`;
}

export function evidenceKey(caseId: string, clueId: string, evidenceId: string) {
  return `${caseId}:${clueId}:${evidenceId}`;
}

export function isClueSolved(state: CaseFileState, caseId: string, clueId: string) {
  return state.clues[clueKey(caseId, clueId)]?.solved ?? false;
}

export function solvedCount(c: CaseDef, state: CaseFileState) {
  return c.clues.filter((clue) => isClueSolved(state, c.id, clue.id)).length;
}

/**
 * Clues unlock in order: a clue opens once the one before it is solved.
 * The first clue is always open.
 */
export function clueState(c: CaseDef, state: CaseFileState, index: number): ClueState {
  if (isClueSolved(state, c.id, c.clues[index].id)) return "solved";
  if (index === 0 || isClueSolved(state, c.id, c.clues[index - 1].id)) return "open";
  return "locked";
}

/** The first clue that is not solved yet, or null if they are all solved */
export function nextClue(c: CaseDef, state: CaseFileState): { clue: ClueDef; index: number } | null {
  const index = c.clues.findIndex((clue) => !isClueSolved(state, c.id, clue.id));
  return index === -1 ? null : { clue: c.clues[index], index };
}

export function daysSinceActivity(c: CaseDef, state: CaseFileState, now: Date = new Date()) {
  const last = state.caseActivity[c.id];
  if (!last) return null;
  return Math.floor((now.getTime() - new Date(last).getTime()) / DAY_MS);
}

/**
 * Status is worked out from progress, never stored.
 * Open = not started. Active = started and recent. Cold = started but untouched for a week. Closed = verdict passed.
 */
export function caseStatus(c: CaseDef, state: CaseFileState, now: Date = new Date()): CaseStatus {
  if (state.closedCases[c.id]) return "closed";
  const days = daysSinceActivity(c, state, now);
  if (days === null) return "open";
  return days >= COLD_AFTER_DAYS ? "cold" : "active";
}

export type WarrantState = "locked" | "ready" | "closed";

/** The warrant unlocks the Verdict once every clue is solved */
export function warrantState(c: CaseDef, state: CaseFileState): WarrantState {
  if (state.closedCases[c.id]) return "closed";
  return solvedCount(c, state) === c.clues.length ? "ready" : "locked";
}

export function caseMinutes(c: CaseDef) {
  return c.clues.reduce((sum, clue) => sum + clue.minutes, 0);
}

/* ---------- Today's lead ---------- */

export type Lead =
  | { kind: "clue"; caseDef: CaseDef; clue: ClueDef; index: number; fresh: boolean }
  | { kind: "verdict"; caseDef: CaseDef };

/**
 * The one recommended next step. Order of preference:
 * 1. The active case worked on most recently
 * 2. The practice case, if it has not been closed
 * 3. The first case nobody has started
 * 4. A cold case (as a last resort, since cold cases get their own alert)
 */
export function getTodaysLead(cases: CaseDef[], state: CaseFileState, now: Date = new Date()): Lead | null {
  const open = cases.filter((c) => caseStatus(c, state, now) !== "closed");

  const byRecency = (a: CaseDef, b: CaseDef) =>
    new Date(state.caseActivity[b.id]).getTime() - new Date(state.caseActivity[a.id]).getTime();

  const active = open.filter((c) => caseStatus(c, state, now) === "active").sort(byRecency);
  const fresh = open.filter((c) => caseStatus(c, state, now) === "open");
  const cold = open.filter((c) => caseStatus(c, state, now) === "cold").sort(byRecency);

  const pick =
    active[0] ?? fresh.find((c) => c.practice) ?? fresh[0] ?? cold[0] ?? null;
  if (!pick) return null;

  const next = nextClue(pick, state);
  if (!next) return { kind: "verdict", caseDef: pick };
  return {
    kind: "clue",
    caseDef: pick,
    clue: next.clue,
    index: next.index,
    fresh: solvedCount(pick, state) === 0,
  };
}

/* ---------- What to do next ---------- */

/**
 * The case to suggest after one is closed. Cases with real lessons come before previews.
 * Among those, a case already in progress comes first, then the lowest case number.
 */
export function recommendNextCase(cases: CaseDef[], state: CaseFileState, excludeId?: string, now: Date = new Date()): CaseDef | null {
  const candidates = cases.filter((c) => c.id !== excludeId && caseStatus(c, state, now) !== "closed");
  // Subjects the student said they like get a small head start
  const liked = new Set(INTERESTS.filter((i) => state.profile?.interests.includes(i.id)).map((i) => i.subject));
  // Once a real case is closed, the tutorial is no longer a good suggestion
  const closedRealCase = cases.some((c) => !c.practice && state.closedCases[c.id]);
  const rank = (c: CaseDef) => {
    const status = caseStatus(c, state, now);
    const progressScore = status === "active" ? 0 : status === "cold" ? 1 : 2;
    return (c.stub ? 10 : 0) + (c.practice && closedRealCase ? 20 : 0) + progressScore - (liked.has(c.subject) ? 0.5 : 0);
  };
  return [...candidates].sort((a, b) => rank(a) - rank(b) || a.number.localeCompare(b.number))[0] ?? null;
}

/** True if an ISO time is within the last few seconds. Used to give a just-earned stamp its slam. */
export function isRecent(iso: string | null | undefined, withinMs = 20000, now: Date = new Date()) {
  return Boolean(iso) && now.getTime() - new Date(iso as string).getTime() < withinMs;
}
