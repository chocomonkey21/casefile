import type { CaseDef } from "@/lib/types";
import { EXISTING_GOALS } from "./goals";
import { NEW_CASES, TOP_UP_CLUES } from "./meta.generated";

/*
  What browser code needs from the new curriculum: the list of new chapters, and a helper that adds learning goals
  and each chapter's fifth (top-up) lesson to the older chapters. No lesson text is imported here.
  The lesson text lives in specs.ts (server only).
*/
export { NEW_CASES };

export function extendChapter(c: CaseDef): CaseDef {
  const goals = EXISTING_GOALS[c.id] ?? {};
  return {
    ...c,
    clues: [...c.clues.map((k) => (goals[k.id] ? { ...k, goals: goals[k.id] } : k)), ...(TOP_UP_CLUES[c.id] ?? [])],
  };
}
