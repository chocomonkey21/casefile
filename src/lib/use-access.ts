"use client";

import { useMemo } from "react";
import { CASES } from "@/data/cases";
import { canOpenCase, DEFAULT_BOARD, parseBoard, parseGrade } from "./access";
import { useCaseFile } from "./store";
import type { Board, CaseDef, Grade } from "./types";

/** The grade on the student's saved profile (Grade 10 for a signed-in teacher), or null before sign-up */
export function useStudentGrade(): Grade | null {
  const { profile, teacher } = useCaseFile();
  if (teacher) return 10;
  return parseGrade(String(profile?.grade ?? ""));
}

/** The board on the saved profile, or the teacher's board. Older profiles without one count as CBSE. */
export function useStudentBoard(): Board {
  const { profile, teacher } = useCaseFile();
  return parseBoard(teacher?.board ?? profile?.board) ?? DEFAULT_BOARD;
}

/**
 * Every case the student can open: their board, their grade and below, plus the practice case.
 * Browser lists use this so they match what the proxy and server pages allow.
 */
export function useAllowedCases(): CaseDef[] {
  const grade = useStudentGrade();
  const board = useStudentBoard();
  return useMemo(() => CASES.filter((c) => canOpenCase(grade, board, c)), [grade, board]);
}
