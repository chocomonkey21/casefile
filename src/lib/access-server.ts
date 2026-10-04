import { cookies } from "next/headers";
import { BOARD_COOKIE, DEFAULT_BOARD, GRADE_COOKIE, parseBoard, parseGrade } from "./access";
import type { Board, Grade } from "./types";

export type StudentAccess = { grade: Grade | null; board: Board };

/** The signed-up student's grade and board, read from the access cookies. Grade is null before sign-up. Server only. */
export async function getStudentAccess(): Promise<StudentAccess> {
  const jar = await cookies();
  return {
    grade: parseGrade(jar.get(GRADE_COOKIE)?.value),
    board: parseBoard(jar.get(BOARD_COOKIE)?.value) ?? DEFAULT_BOARD,
  };
}
