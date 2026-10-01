import type { ClueContent } from "@/lib/types";
import { EARTH_LESSONS } from "./earth";
import { EGYPT_LESSONS } from "./egypt";
import { FRACTIONS_LESSONS } from "./fractions";
import { PUDDLE_LESSONS } from "./puddle";
import { SOCK_LESSONS } from "./sock";
import { SOLAR_LESSONS } from "./solar";

/** Lesson content by case id, then clue id */
const LESSONS: Record<string, Record<string, ClueContent>> = {
  puddle: PUDDLE_LESSONS,
  sock: SOCK_LESSONS,
  fractions: FRACTIONS_LESSONS,
  "solar-system": SOLAR_LESSONS,
  "ancient-egypt": EGYPT_LESSONS,
  "shaking-ground": EARTH_LESSONS,
};

export function getLesson(caseId: string, clueId: string): ClueContent | undefined {
  return LESSONS[caseId]?.[clueId];
}
