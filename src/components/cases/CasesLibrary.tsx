"use client";

import { useState } from "react";
import { FolderCard } from "@/components/case/FolderCard";
import { CASES } from "@/data/cases";
import { SUBJECTS, SUBJECT_IDS } from "@/data/subjects";
import { copy } from "@/lib/copy";
import { caseStatus, solvedCount } from "@/lib/progress";
import { useCaseFile, useHydrated } from "@/lib/store";
import type { CaseStatus, SubjectId } from "@/lib/types";

const STATUSES: { id: CaseStatus; label: string }[] = (["open", "active", "cold", "closed"] as const).map((id) => ({
  id,
  label: copy.status[id],
}));

/** Browse every case as a folder. Filter by subject and by status. */
export function CasesLibrary() {
  const state = useCaseFile();
  const hydrated = useHydrated();
  const [subject, setSubject] = useState<SubjectId | "all">("all");
  const [status, setStatus] = useState<CaseStatus | "all">("all");

  const rows = CASES.map((c) => ({ c, status: caseStatus(c, state), solved: solvedCount(c, state) })).filter(
    (r) => (subject === "all" || r.c.subject === subject) && (status === "all" || r.status === status),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <p className="label text-evidence-dark">{copy.library.label}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{copy.library.title}</h1>
        <p className="mt-2 max-w-prose text-lg text-ink-soft">
          {copy.library.intro}
        </p>
      </header>

      <div className="mt-6 space-y-4 rounded-xl border-2 border-manila-600/30 bg-manila-100/60 p-4">
        <FilterGroup
          label={copy.library.subject}
          value={subject}
          onChange={setSubject}
          options={[{ id: "all", label: copy.library.all }, ...SUBJECT_IDS.map((id) => ({ id, label: SUBJECTS[id].label }))]}
        />
        <FilterGroup
          label={copy.library.status}
          value={status}
          onChange={setStatus}
          options={[{ id: "all", label: copy.library.all }, ...STATUSES]}
        />
      </div>

      {/* Polite live region so screen reader users hear the result count change */}
      <p className="mt-5 text-ink-soft" role="status">
        {hydrated ? copy.library.showing(rows.length) : copy.library.loading}
      </p>

      {rows.length > 0 ? (
        <>
        <h2 className="sr-only">{copy.library.allCases}</h2>
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(({ c, status: s, solved }) => (
            <li key={c.id}>
              <FolderCard caseDef={c} status={s} solved={solved} />
            </li>
          ))}
        </ul>
        </>
      ) : (
        <div className="mt-6 rounded-xl border-2 border-dashed border-manila-600/50 p-8 text-center">
          <p className="font-display text-2xl">{copy.library.emptyTitle}</p>
          <p className="mt-1 text-ink-soft">{copy.library.emptyText}</p>
          <button
            type="button"
            className="mt-4 min-h-11 rounded-lg bg-navy px-5 font-semibold text-paper hover:bg-navy-light"
            onClick={() => {
              setSubject("all");
              setStatus("all");
            }}
          >
            {copy.library.clear}
          </button>
        </div>
      )}
    </div>
  );
}

type FilterGroupProps<T extends string> = {
  label: string;
  value: T | "all";
  onChange: (id: T | "all") => void;
  options: { id: T | "all"; label: string }[];
};

/** A row of toggle buttons. aria-pressed tells screen readers which one is on. */
function FilterGroup<T extends string>({ label, value, onChange, options }: FilterGroupProps<T>) {
  return (
    <div role="group" aria-label={copy.library.filterGroup(label.toLowerCase())} className="flex flex-wrap items-center gap-2">
      <span className="label mr-2 w-16 text-ink-soft">{label}</span>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={`min-h-11 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${
              on
                ? "border-navy bg-navy text-paper"
                : "border-manila-600/50 bg-paper text-ink hover:bg-highlighter-light/60"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
