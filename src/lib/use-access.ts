"use client";

import { useMemo } from "react";
import { CASES } from "@/data/cases";
import { canOpenCase, parseGrade } from "./access";
import { useCaseFile } from "./store";
import type { CaseDef, Grade } from "./types";

/** The grade on the student's saved profile, or null before sign-up */
export function useStudentGrade(): Grade | null {
  const { profile } = useCaseFile();
  return parseGrade(String(profile?.grade ?? ""));
}

/**
 * Every case the student can open: their grade and below, plus the practice case.
 * Browser lists use this so they match what the proxy and server pages allow.
 */
export function useAllowedCases(): CaseDef[] {
  const grade = useStudentGrade();
  return useMemo(() => CASES.filter((c) => canOpenCase(grade, c)), [grade]);
}
