"use client";

import { FolderCard } from "@/components/case/FolderCard";
import { copy } from "@/lib/copy";
import { caseStatus, solvedCount } from "@/lib/progress";
import { useCaseFile, useHydrated } from "@/lib/store";
import type { CaseDef } from "@/lib/types";

/**
 * The chapters of one subject, in grade order, as the same folders used in the case library, with the learner's own progress.
 * Each folder is labelled with its suggested grade, and the learner's own grade (from their profile) is marked.
 */
export function SubjectChapters({ chapters }: { chapters: CaseDef[] }) {
  const state = useCaseFile();
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <div role="status" aria-label={copy.subjectsPage.loading} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c) => (
          <div key={c.id} className="h-56 animate-pulse rounded-[3px] bg-manila/60" />
        ))}
      </div>
    );
  }

  const ordered = [...chapters].sort((a, b) => (a.grade ?? 0) - (b.grade ?? 0) || a.number.localeCompare(b.number));
  const mine = state.profile?.grade;
  return (
    <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((c) => (
        <li key={c.id}>
          {c.grade ? (
            <h3 className="mb-1 flex flex-wrap items-center gap-3 text-2xl">
              {copy.grades.label(c.grade)}
              {mine === c.grade && <span className="rounded-[3px] bg-postit px-2 py-0.5 text-sm font-semibold text-ink">{copy.grades.yourGrade}</span>}
            </h3>
          ) : null}
          <FolderCard caseDef={c} status={caseStatus(c, state)} solved={solvedCount(c, state)} />
        </li>
      ))}
    </ul>
  );
}
