import type { Board, CaseDef, Grade } from "./types";

/*
  Who can open what. Safe to import anywhere: browser code, server pages and proxy.ts.

  The rules:
    - Grade: a student sees content for their own grade and every grade below it, down to Grade 6.
      Grade 6 sees Grade 6 only; Grade 8 sees 6, 7 and 8; Grade 10 sees everything. Nothing above their grade.
    - Board: a student sees only the chapters written for their board (CBSE or ICSE).
    - The practice case has no grade and no board, so every student who finished sign-up can open it.
  Teachers are given Grade 10 for their board when they sign in, so they can see everything their students can.

  The grade and board come from the profile (saved on this device) and are copied into cookies so the server and
  proxy can apply the same rules to pages, video routes and the video API.
  ASSUMPTION: there is no server-side student account, so these cookies are set by the browser. They stop casual
  browsing and direct links, but a student who edits their cookies or signs up again with another grade or board
  can change them.
*/

export const GRADE_COOKIE = "casefile_grade";
export const BOARD_COOKIE = "casefile_board";
export const GRADES: Grade[] = [6, 7, 8, 9, 10];
export const BOARDS: Board[] = ["cbse", "icse"];
/** Profiles saved before boards existed have none. The original library is CBSE, so they are treated as CBSE. */
export const DEFAULT_BOARD: Board = "cbse";

/** The cookies last a year; sign-up and log out replace or clear them */
const MAX_AGE = 60 * 60 * 24 * 365;

export function parseGrade(value: string | null | undefined): Grade | null {
  const n = Number(value);
  return (GRADES as number[]).includes(n) ? (n as Grade) : null;
}

export function parseBoard(value: string | null | undefined): Board | null {
  return value === "cbse" || value === "icse" ? value : null;
}

/** The board a chapter belongs to. Undefined only for the practice case, which is open to every board. */
export function caseBoard(caseDef: Pick<CaseDef, "board" | "practice">): Board | undefined {
  return caseDef.practice ? undefined : (caseDef.board ?? DEFAULT_BOARD);
}

/** True when content of `contentGrade` is open to a student in `studentGrade`. Gradeless content is open to all. */
export function canAccessGrade(studentGrade: Grade | null, contentGrade: Grade | undefined | null): boolean {
  if (studentGrade === null) return false;
  if (contentGrade === undefined || contentGrade === null) return true;
  return contentGrade <= studentGrade;
}

export function canOpenCase(studentGrade: Grade | null, studentBoard: Board, caseDef: Pick<CaseDef, "grade" | "board" | "practice">): boolean {
  if (!canAccessGrade(studentGrade, caseDef.grade)) return false;
  const board = caseBoard(caseDef);
  return board === undefined || board === studentBoard;
}

/** Grades a student can browse, lowest first. Grade 8 gives [6, 7, 8]. */
export function allowedGrades(studentGrade: Grade | null): Grade[] {
  return studentGrade === null ? [] : GRADES.filter((g) => g <= studentGrade);
}

export function boardLabel(board: Board): string {
  return board === "cbse" ? "CBSE" : "ICSE";
}

function writeCookie(name: string, value: string | null) {
  if (typeof document === "undefined") return;
  document.cookie = value === null ? `${name}=; Path=/; Max-Age=0; SameSite=Lax` : `${name}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

/** Browser only: copy the profile's grade and board into the cookies, or clear them */
export function writeAccessCookies(grade: Grade | null, board: Board | null) {
  writeCookie(GRADE_COOKIE, grade === null ? null : String(grade));
  writeCookie(BOARD_COOKIE, board);
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`))?.[1];
}

export function readGradeCookie(): Grade | null {
  return parseGrade(readCookie(GRADE_COOKIE));
}

export function readBoardCookie(): Board | null {
  return parseBoard(readCookie(BOARD_COOKIE));
}

/** Where to send someone who has not finished sign-up */
export function joinHref(next?: string): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? `/join?next=${encodeURIComponent(next)}` : "/join";
}
