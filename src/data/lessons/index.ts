import type { ClueContent } from "@/lib/types";
import { PUDDLE_LESSONS } from "./puddle";
import { SOCK_LESSONS } from "./sock";

/** Lesson content by case. Stub cases have none yet, and the UI shows a preview notice instead. */
const LESSONS: Record<string, Record<string, ClueContent>> = {
  puddle: PUDDLE_LESSONS,
  sock: SOCK_LESSONS,
};

export function getLesson(caseId: string, clueId: string): ClueContent | undefined {
  return LESSONS[caseId]?.[clueId];
}
