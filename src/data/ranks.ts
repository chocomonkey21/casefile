import type { Rank } from "@/lib/types";

/*
  Levels. A student moves up by completing lessons and closing cases (see levelFor in lib/progress.ts):
  each completed lesson counts 1, each closed case counts 2.
*/
export const RANKS: Rank[] = [
  { id: "rookie", name: "Rookie", minScore: 0 },
  { id: "junior", name: "Junior Detective", minScore: 2 },
  { id: "detective", name: "Detective", minScore: 6 },
  { id: "inspector", name: "Inspector", minScore: 12 },
  { id: "chief", name: "Chief", minScore: 20 },
];
