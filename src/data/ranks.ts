import type { Rank } from "@/lib/types";

/*
  Levels. A student moves up by completing lessons and cases (see levelFor in lib/progress.ts):
  each completed lesson counts 1, each completed case counts 2. Levels are numbered, so their names need no theme.
*/
export const RANKS: Rank[] = [
  { id: "level1", name: "Level 1", minScore: 0 },
  { id: "level2", name: "Level 2", minScore: 2 },
  { id: "level3", name: "Level 3", minScore: 6 },
  { id: "level4", name: "Level 4", minScore: 12 },
  { id: "level5", name: "Level 5", minScore: 20 },
];
