import { cookies } from "next/headers";
import { GRADE_COOKIE, parseGrade } from "./access";
import type { Grade } from "./types";

/** The signed-up student's grade, read from the grade cookie. Null before sign-up. Server only. */
export async function getStudentGrade(): Promise<Grade | null> {
  return parseGrade((await cookies()).get(GRADE_COOKIE)?.value);
}
