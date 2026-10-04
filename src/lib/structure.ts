import { CASES } from "@/data/cases";
import type { Crumb } from "@/components/ui/Breadcrumb";
import { SUBJECTS } from "@/data/subjects";
import { canOpenCase } from "@/lib/access";
import { copy } from "@/lib/copy";
import type { CaseDef, ClueDef, Grade, SubjectId } from "@/lib/types";

/*
  The learning hierarchy: Subject → Chapter → Lesson.

  It is read straight from the course data, nothing is regrouped:
    Subject  = the subject field on a case (science, maths, history, geography)
    Chapter  = a case: one topic with its own brief, lessons and final test
    Lesson   = a clue

  The practice case belongs to sign-up, not to any subject, so it is left out of browsing.
*/

export type SubjectEntry = {
  id: SubjectId;
  label: string;
  chapters: CaseDef[];
  lessonCount: number;
};

/**
 * Subjects that have at least one real chapter, in the order they are declared in data/subjects.ts.
 * Pass the student's grade to keep only the chapters they can open (lib/access.ts). Leave it out for the
 * public overview pages, which describe the whole library but link into sign-up.
 */
export function getSubjects(grade?: Grade | null): SubjectEntry[] {
  return (Object.keys(SUBJECTS) as SubjectId[])
    .map((id) => {
      const chapters = CASES.filter((c) => c.subject === id && !c.practice && (grade === undefined || canOpenCase(grade, c)));
      return {
        id,
        label: SUBJECTS[id].label,
        chapters,
        lessonCount: chapters.reduce((n, c) => n + c.clues.length, 0),
      };
    })
    .filter((s) => s.chapters.length > 0);
}

export function getSubject(id: string, grade?: Grade | null): SubjectEntry | undefined {
  return getSubjects(grade).find((s) => s.id === id);
}

export function isSubjectId(id: string): id is SubjectId {
  return getSubjects().some((s) => s.id === id);
}

/** Previous and next chapter inside the same subject, in the order the data lists them */
export function chapterNeighbours(caseDef: CaseDef, grade?: Grade | null): { prev: CaseDef | null; next: CaseDef | null } {
  const siblings = getSubject(caseDef.subject, grade)?.chapters ?? [];
  const i = siblings.findIndex((c) => c.id === caseDef.id);
  return { prev: i > 0 ? siblings[i - 1] : null, next: i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : null };
}

/** Previous and next lesson inside the same chapter */
export function lessonNeighbours(caseDef: CaseDef, clueIndex: number): { prev: ClueDef | null; next: ClueDef | null } {
  return { prev: caseDef.clues[clueIndex - 1] ?? null, next: caseDef.clues[clueIndex + 1] ?? null };
}

/** True when the case is a real chapter that appears in subject browsing */
export function isChapter(c: CaseDef): boolean {
  return !c.practice;
}

/* ---------- Breadcrumb trails ---------- */

const chapterHref = (c: CaseDef) => `/cases/${c.id}?tab=clues`;

/** Subjects / Science / Chapter. The practice case sits outside the subjects, so its trail starts at Cases. */
export function chapterCrumbs(caseDef: CaseDef): Crumb[] {
  if (!isChapter(caseDef)) return [{ label: copy.nav.items.cases.label, href: "/cases" }, { label: caseDef.title }];
  return [
    { label: copy.wayfinding.subjects, href: "/subjects" },
    { label: SUBJECTS[caseDef.subject].label, href: `/subjects/${caseDef.subject}` },
    { label: caseDef.title },
  ];
}

/** The same trail with the chapter as a link, then the lesson as the current page */
export function lessonCrumbs(caseDef: CaseDef, clue: ClueDef): Crumb[] {
  const trail = chapterCrumbs(caseDef);
  trail[trail.length - 1] = { label: caseDef.title, href: chapterHref(caseDef) };
  return [...trail, { label: clue.title }];
}
