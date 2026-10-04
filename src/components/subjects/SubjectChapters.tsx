"use client";

import { FolderCard } from "@/components/case/FolderCard";
import { copy } from "@/lib/copy";
import { caseStatus, solvedCount } from "@/lib/progress";
import { useCaseFile, useHydrated } from "@/lib/store";
import type { CaseDef } from "@/lib/types";

/** The chapters of one subject, as the same folders used in the case library, with the learner's own progress. */
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
  return (
    <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {chapters.map((c) => (
        <li key={c.id}>
          <FolderCard caseDef={c} status={caseStatus(c, state)} solved={solvedCount(c, state)} />
        </li>
      ))}
    </ul>
  );
}
