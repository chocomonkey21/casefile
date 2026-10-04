import type { CaseDef, Grade } from "./types";

/*
  Who can open what. Safe to import anywhere: browser code, server pages and proxy.ts.

  The rule: a student sees content for their own grade and every grade below it, down to Grade 6.
  Grade 6 sees Grade 6 only; Grade 8 sees 6, 7 and 8; Grade 10 sees everything. Nothing above their grade.
  The practice case has no grade, so every student who finished sign-up can open it.

  The student's grade comes from their profile (saved on this device) and is copied into a cookie so the
  server and proxy can apply the same rule to pages, video routes and the video API.
  ASSUMPTION: there is no server-side account, so the cookie is set by the browser. It stops casual browsing and
  direct links, but a student who edits their cookies or re-runs sign-up with another grade can change it.
*/

export const GRADE_COOKIE = "casefile_grade";
export const GRADES: Grade[] = [6, 7, 8, 9, 10];

/** The cookie lasts a year; sign-up and log out replace or clear it */
const MAX_AGE = 60 * 60 * 24 * 365;

export function parseGrade(value: string | null | undefined): Grade | null {
  const n = Number(value);
  return (GRADES as number[]).includes(n) ? (n as Grade) : null;
}

/** True when content of `contentGrade` is open to a student in `studentGrade`. Gradeless content is open to all. */
export function canAccessGrade(studentGrade: Grade | null, contentGrade: Grade | undefined | null): boolean {
  if (studentGrade === null) return false;
  if (contentGrade === undefined || contentGrade === null) return true;
  return contentGrade <= studentGrade;
}

export function canOpenCase(studentGrade: Grade | null, caseDef: Pick<CaseDef, "grade">): boolean {
  return canAccessGrade(studentGrade, caseDef.grade);
}

/** Grades a student can browse, lowest first. Grade 8 gives [6, 7, 8]. */
export function allowedGrades(studentGrade: Grade | null): Grade[] {
  return studentGrade === null ? [] : GRADES.filter((g) => g <= studentGrade);
}

/** Browser only: copy the profile's grade into the cookie, or clear it */
export function writeGradeCookie(grade: Grade | null) {
  if (typeof document === "undefined") return;
  document.cookie =
    grade === null
      ? `${GRADE_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
      : `${GRADE_COOKIE}=${grade}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

export function readGradeCookie(): Grade | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${GRADE_COOKIE}=(\\d+)`));
  return parseGrade(match?.[1]);
}

/** Where to send someone who has not finished sign-up */
export function joinHref(next?: string): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? `/join?next=${encodeURIComponent(next)}` : "/join";
}
