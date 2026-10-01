import { CASES } from "@/data/cases";
import { RELATIONS } from "@/data/relations";
import type { CaseDef, ClueDef, EvidenceDef } from "./types";

/* ---------- Keys ---------- */

export type ResolvedEvidence = {
  key: string;
  caseDef: CaseDef;
  clue: ClueDef;
  clueIndex: number;
  evidence: EvidenceDef;
};

/** Turns a `caseId:clueId:evidenceId` key back into the real data. Null if the content has changed since. */
export function resolveEvidence(key: string): ResolvedEvidence | null {
  const [caseId, clueId, evidenceId] = key.split(":");
  const caseDef = CASES.find((c) => c.id === caseId);
  const clueIndex = caseDef?.clues.findIndex((c) => c.id === clueId) ?? -1;
  if (!caseDef || clueIndex === -1) return null;
  const clue = caseDef.clues[clueIndex];
  const evidence = clue.evidence.find((e) => e.id === evidenceId);
  return evidence ? { key, caseDef, clue, clueIndex, evidence } : null;
}

/** Order-free id for a pair of cards */
export function pairId(a: string, b: string) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

/* ---------- Layout ---------- */

export const CARD_H = 136;
export const BOARD_MIN_H = 520;
const TOP = 36;
const NARROW = 520;

/** Tighter spacing on phones so two cards fit side by side */
const padFor = (boardWidth: number) => (boardWidth < NARROW ? 10 : 20);
const gapFor = (boardWidth: number) => (boardWidth < NARROW ? 12 : 20);

export function cardWidth(boardWidth: number) {
  if (boardWidth >= NARROW) return 188;
  // Two columns on a phone, between 124 and 156 pixels wide
  return Math.min(156, Math.max(124, Math.floor((boardWidth - padFor(boardWidth) * 2 - gapFor(boardWidth)) / 2)));
}

/** Small stable pseudo-random number from a string, so each card keeps its own tilt */
function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** A slight tilt from -3 to +3 degrees */
export function tilt(key: string) {
  return (hash(key) % 61) / 10 - 3;
}

/** The automatic spot for the nth card: a loose grid with a little stagger so it does not look like a table */
export function defaultCenter(index: number, boardWidth: number) {
  const w = cardWidth(boardWidth);
  const PAD = padFor(boardWidth);
  const GAP = gapFor(boardWidth);
  const cols = Math.max(1, Math.floor((boardWidth - PAD * 2 + GAP) / (w + GAP)));
  const used = cols * w + (cols - 1) * GAP;
  const left = Math.max(PAD, (boardWidth - used) / 2);
  const col = index % cols;
  const row = Math.floor(index / cols);
  const stagger = col % 2 === 0 ? 0 : 14;
  return {
    x: left + w / 2 + col * (w + GAP),
    y: TOP + CARD_H / 2 + row * (CARD_H + GAP + 12) + stagger,
  };
}

export function clampCenter(x: number, y: number, boardWidth: number) {
  const half = cardWidth(boardWidth) / 2;
  return {
    x: Math.min(boardWidth - half - 6, Math.max(half + 6, x)),
    y: Math.max(CARD_H / 2 + 14, y),
  };
}

/** Where a string attaches to a card: the pin at the top centre */
export function pinPoint(center: { x: number; y: number }) {
  return { x: center.x, y: center.y - CARD_H / 2 + 6 };
}

/** A drooping curve between two pins, like string that is not pulled tight */
export function stringPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const sag = Math.min(70, Math.hypot(b.x - a.x, b.y - a.y) * 0.18);
  return { d: `M ${a.x} ${a.y} Q ${mx} ${my + sag} ${b.x} ${b.y}`, mid: { x: mx, y: my + sag / 2 } };
}

/* ---------- The "you haven't connected" nudge ---------- */

export type Suggestion = { a: string; b: string; why: string };

/**
 * Finds one pair of collected cards that belong together but have no string yet.
 * Pairs written in data/relations.ts come first. Then any two cards from the same clue.
 */
export function findSuggestion(
  keys: string[],
  strings: [string, string][],
  dismissed: Set<string>,
): Suggestion | null {
  const connected = new Set(strings.map(([a, b]) => pairId(a, b)));
  const open = (a: string, b: string) => !connected.has(pairId(a, b)) && !dismissed.has(pairId(a, b));
  const keyFor = (evidenceId: string) => keys.find((k) => k.endsWith(`:${evidenceId}`));

  for (const r of RELATIONS) {
    const a = keyFor(r.a);
    const b = keyFor(r.b);
    if (a && b && open(a, b)) return { a, b, why: r.why };
  }

  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const sameClue = keys[i].split(":").slice(0, 2).join(":") === keys[j].split(":").slice(0, 2).join(":");
      if (sameClue && open(keys[i], keys[j])) {
        return { a: keys[i], b: keys[j], why: "They come from the same clue, so they are about the same idea." };
      }
    }
  }
  return null;
}

/** The reason two cards belong together, if we wrote one down */
export function relationWhy(aKey: string, bKey: string): string | null {
  const aId = aKey.split(":")[2];
  const bId = bKey.split(":")[2];
  const r = RELATIONS.find((x) => (x.a === aId && x.b === bId) || (x.a === bId && x.b === aId));
  return r?.why ?? null;
}
