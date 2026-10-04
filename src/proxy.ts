import { NextResponse, type NextRequest } from "next/server";
import { getCase } from "@/data/cases";
import { BOARD_COOKIE, canOpenCase, DEFAULT_BOARD, GRADE_COOKIE, joinHref, parseBoard, parseGrade } from "@/lib/access";

/*
  The library is for signed-up students (and signed-in teachers) only. Each student sees their own board, their
  grade and the grades below it (rules in lib/access.ts).

  - No grade cookie (a visitor, or sign-up not finished): pages go to /join, and the student APIs answer 401.
  - A chapter for another board, or above the student's grade, opened by a direct link: goes to /locked,
    which explains and links back.

  Video watch pages and the video lists check access themselves, because a video's chapter is only known after a
  CMS lookup, and proxy should stay fast. Subject pages filter their chapter lists the same way.
*/

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const grade = parseGrade(request.cookies.get(GRADE_COOKIE)?.value);
  const board = parseBoard(request.cookies.get(BOARD_COOKIE)?.value) ?? DEFAULT_BOARD;

  if (grade === null) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "profile-required" }, { status: 401, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.redirect(new URL(joinHref(pathname + search), request.url));
  }

  const caseMatch = pathname.match(/^\/cases\/([^/]+)/);
  if (caseMatch) {
    const caseDef = getCase(decodeURIComponent(caseMatch[1]));
    if (caseDef && !canOpenCase(grade, board, caseDef)) {
      return NextResponse.redirect(new URL(`/locked?case=${encodeURIComponent(caseDef.id)}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cases",
    "/cases/:path*",
    "/subjects",
    "/subjects/:path*",
    "/videos",
    "/videos/:path*",
    "/board",
    "/desk",
    "/lab",
    "/notebook",
    "/api/videos",
    "/api/videos/:path*",
    "/api/drawer",
    "/api/drawer/:path*",
  ],
};
