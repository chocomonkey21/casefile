"use client";

import { useSyncExternalStore } from "react";
import { writeGradeCookie } from "./access";
import { clueKey, dayKey, yesterdayKey } from "./progress";
import type { CaseFileState, Note, Profile, VerdictRecord } from "./types";

/*
  A tiny external store backed by localStorage.

  Why not useState + useEffect? With useSyncExternalStore, the server (and the
  first client render) use DEFAULT_STATE, then React swaps in the saved state
  right after hydration. That avoids hydration mismatch warnings and needs no
  effect that calls setState.
*/

const STORAGE_KEY = "casefile:v1";

const DEFAULT_STATE: CaseFileState = {
  profile: null,
  joinedAt: null,
  explainerSeen: false,
  streak: { count: 0, lastDay: null },
  clues: {},
  caseActivity: {},
  closedCases: {},
  notes: [],
  collected: {},
  board: { positions: {}, strings: [] },
  verdicts: {},
  reduceMotion: false,
};

let cache: CaseFileState = DEFAULT_STATE;
let loaded = false;
const listeners = new Set<() => void>();

function read(): CaseFileState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    // Merge over defaults so older saves keep working when we add new fields.
    // Points were removed from the app, so an old saved "points" value is dropped here.
    const { points: _legacyPoints, ...saved } = JSON.parse(raw);
    void _legacyPoints;
    return { ...DEFAULT_STATE, ...saved };
  } catch {
    return DEFAULT_STATE;
  }
}

function getSnapshot(): CaseFileState {
  if (!loaded) {
    cache = read();
    loaded = true;
  }
  return cache;
}

function getServerSnapshot(): CaseFileState {
  return DEFAULT_STATE;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other open tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = read();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function update(fn: (state: CaseFileState) => CaseFileState) {
  cache = fn(getSnapshot());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Private mode or full storage: the app still works for this visit
  }
  listeners.forEach((l) => l());
}

/** Read the saved progress. Re-renders the component when it changes. */
export function useCaseFile(): CaseFileState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true afterwards. Use it to avoid flashing wrong content. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Grows the streak once per day. Pure, so other actions can reuse it. */
function withStudyDay(s: CaseFileState, now: Date): CaseFileState {
  const today = dayKey(now);
  if (s.streak.lastDay === today) return s;
  const continued = s.streak.lastDay === yesterdayKey(now);
  return { ...s, streak: { count: continued ? s.streak.count + 1 : 1, lastDay: today } };
}

export const actions = {
  /** Saves the profile from onboarding. The join date is set once, the first time. */
  setProfile(profile: Profile, now: Date = new Date()) {
    update((s) => ({ ...s, profile, joinedAt: s.joinedAt ?? now.toISOString() }));
    // The server and proxy read the grade from a cookie to decide which chapters and videos are open (see lib/access.ts)
    writeGradeCookie(profile.grade);
  },

  /** The "How CaseFile works" walkthrough was finished or skipped */
  markExplainerSeen() {
    update((s) => (s.explainerSeen ? s : { ...s, explainerSeen: true }));
  },

  /** Call when the student does any real study action. Grows the streak once per day. */
  recordStudy(now: Date = new Date()) {
    update((s) => withStudyDay(s, now));
  },

  /** Marks a case as worked on today. Keeps it Active and resets the cold timer. */
  touchCase(caseId: string, now: Date = new Date()) {
    update((s) => ({ ...withStudyDay(s, now), caseActivity: { ...s.caseActivity, [caseId]: now.toISOString() } }));
  },

  /** Saves a completed clue (once only) together with its quiz result */
  solveClue(caseId: string, clueId: string, quiz?: { firstTry: number; total: number }, now: Date = new Date()) {
    const key = clueKey(caseId, clueId);
    if (getSnapshot().clues[key]?.solved) return;
    update((s) => {
      const next = withStudyDay(s, now);
      return {
        ...next,
        clues: { ...next.clues, [key]: { solved: true, solvedAt: now.toISOString(), quiz } },
        caseActivity: { ...next.caseActivity, [caseId]: now.toISOString() },
      };
    });
  },

  /** Pin or unpin a piece of evidence on the Evidence Board. Unpinning also cuts its strings. */
  toggleEvidence(key: string) {
    update((s) => {
      const collected = { ...s.collected };
      if (collected[key]) {
        delete collected[key];
        const positions = { ...s.board.positions };
        delete positions[key];
        const strings = s.board.strings.filter(([a, b]) => a !== key && b !== key);
        return { ...s, collected, board: { positions, strings } };
      }
      collected[key] = new Date().toISOString();
      return { ...s, collected };
    });
  },

  /** Remember where a card was dropped. x is a fraction of the board width, y is pixels. */
  moveCard(key: string, x: number, y: number) {
    update((s) => ({ ...s, board: { ...s.board, positions: { ...s.board.positions, [key]: { x, y } } } }));
  },

  /** Forget all card positions so cards go back to the tidy grid */
  tidyBoard() {
    update((s) => ({ ...s, board: { ...s.board, positions: {} } }));
  },

  /** Tie a string between two cards. Returns false if it already exists or the cards are the same. */
  addString(a: string, b: string): boolean {
    if (a === b) return false;
    const exists = getSnapshot().board.strings.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
    if (exists) return false;
    update((s) => ({ ...s, board: { ...s.board, strings: [...s.board.strings, [a, b]] } }));
    return true;
  },

  removeString(a: string, b: string) {
    update((s) => ({
      ...s,
      board: { ...s.board, strings: s.board.strings.filter(([x, y]) => !((x === a && y === b) || (x === b && y === a))) },
    }));
  },

  /** Remember the latest Verdict attempt, passed or not. The Lab uses it to show what needs another look. */
  recordVerdict(caseId: string, record: Omit<VerdictRecord, "at">, now: Date = new Date()) {
    update((s) => ({
      ...withStudyDay(s, now),
      verdicts: { ...s.verdicts, [caseId]: { ...record, at: now.toISOString() } },
      caseActivity: { ...s.caseActivity, [caseId]: now.toISOString() },
    }));
  },

  /** Passing the Verdict closes the case. Passing again later keeps the better score. */
  closeCase(caseId: string, correct: number, total: number, now: Date = new Date()) {
    const percent = Math.round((correct / total) * 100);
    const existing = getSnapshot().closedCases[caseId];
    update((s) => ({
      ...withStudyDay(s, now),
      closedCases: {
        ...s.closedCases,
        [caseId]: existing ? { ...existing, score: Math.max(existing.score, percent) } : { closedAt: now.toISOString(), score: percent },
      },
      caseActivity: { ...s.caseActivity, [caseId]: now.toISOString() },
    }));
  },

  /** Demo helper: pretend the case was last touched some days ago (used to test Cold cases) */
  setCaseActivity(caseId: string, iso: string) {
    update((s) => ({ ...s, caseActivity: { ...s.caseActivity, [caseId]: iso } }));
  },

  addNote(caseId: string, text: string, clueId: string | null = null) {
    const clean = text.trim();
    if (!clean) return;
    const note: Note = {
      id: crypto.randomUUID(),
      caseId,
      clueId,
      text: clean,
      createdAt: new Date().toISOString(),
    };
    update((s) => ({ ...s, notes: [note, ...s.notes] }));
  },

  deleteNote(id: string) {
    update((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) }));
  },

  setReduceMotion(on: boolean) {
    update((s) => ({ ...s, reduceMotion: on }));
  },

  /**
   * Log out: clears the profile, progress, notes, evidence board and walkthrough flag from this device,
   * so the next visit starts onboarding as a brand new student.
   * The motion preference is about the student's comfort, so it stays.
   */
  logOut() {
    update((s) => ({ ...DEFAULT_STATE, reduceMotion: s.reduceMotion }));
    writeGradeCookie(null);
  },
};
