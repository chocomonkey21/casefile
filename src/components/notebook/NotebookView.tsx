"use client";

import Link from "next/link";
import { useState } from "react";
import { NoteForm } from "@/components/notes/NoteForm";
import { Button } from "@/components/ui/Button";
import { TrashIcon } from "@/components/ui/Icons";
import { getCase } from "@/data/cases";
import { copy } from "@/lib/copy";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import { useAllowedCases } from "@/lib/use-access";
import { RedThread } from "@/components/ui/RedThread";

const t = copy.notebook;

/** The Notebook: every note from every case in one place, newest first. Filter by case, or add a new note. */
export function NotebookView() {
  const { notes } = useCaseFile();
  const hydrated = useHydrated();
  // Notes can only be filed against chapters open to the student's grade
  const CASES = useAllowedCases();
  const [filter, setFilter] = useState<string>("all");
  const [formCaseId, setFormCaseId] = useState<string>("puddle");

  if (!hydrated) {
    return <div className="mx-auto mt-10 h-72 max-w-4xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={t.loading} />;
  }

  const sorted = [...notes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const casesWithNotes = CASES.filter((c) => notes.some((n) => n.caseId === c.id));
  const visible = filter === "all" ? sorted : sorted.filter((n) => n.caseId === filter);
  const formCase = getCase(formCaseId) ?? CASES[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <p className="label text-evidence-dark">{t.label}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{t.title}</h1>
<RedThread className="mt-4" />
        <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>
      </header>

      {/* Filter by case */}
      <div role="group" aria-label={t.filter} className="mt-6 flex flex-wrap items-center gap-2">
        <FilterChip label={t.all(notes.length)} on={filter === "all"} onClick={() => setFilter("all")} />
        {casesWithNotes.map((c) => (
          <FilterChip
            key={c.id}
            label={`${c.topic} (${notes.filter((n) => n.caseId === c.id).length})`}
            on={filter === c.id}
            onClick={() => setFilter(c.id)}
          />
        ))}
      </div>

      {/* The notebook page */}
      <div className="relative mt-6 overflow-hidden rounded-[3px] bg-manila-50 shadow-folder">
        {/* Spiral binding */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-8 bg-manila-100"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-manila-600) 0 5px, transparent 6px)", backgroundSize: "100% 44px" }}
        />
        <div
          className="py-6 pl-12 pr-4 sm:pl-14 sm:pr-8"
          style={{ backgroundImage: "repeating-linear-gradient(transparent 0 31px, rgb(122 98 56 / 0.18) 31px 32px)" }}
        >
          {visible.length === 0 ? (
            <div className="py-6">
              <p className="font-display text-2xl">{notes.length === 0 ? t.emptyTitleNone : t.emptyTitleFiltered}</p>
              <p className="mt-1 max-w-prose text-ink-soft">{t.emptyText}</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {visible.map((n) => {
                const caseDef = getCase(n.caseId);
                const clueIndex = caseDef?.clues.findIndex((c) => c.id === n.clueId) ?? -1;
                const when = new Date(n.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
                return (
                  <li key={n.id}>
                    <p className="label text-ink-soft">{t.entryLabel(caseDef?.topic ?? "", clueIndex >= 0 ? clueIndex + 1 : null, when)}</p>
                    <p className="mt-1 whitespace-pre-wrap text-lg leading-8">{n.text}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-6">
                      {caseDef && (
                        <Link
                          href={clueIndex >= 0 ? `/cases/${caseDef.id}/clues/${caseDef.clues[clueIndex].id}` : `/cases/${caseDef.id}`}
                          className="inline-flex min-h-11 items-center font-semibold text-coffee underline underline-offset-4"
                        >
                          {clueIndex >= 0 ? t.openClue : t.openCase}
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => actions.deleteNote(n.id)}
                        aria-label={copy.notes.deleteLabel(n.text.slice(0, 30))}
                        className="inline-flex min-h-11 items-center gap-2 font-semibold text-evidence-dark hover:underline"
                      >
                        <TrashIcon width={16} height={16} />
                        {copy.common.delete}
                      </button>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Add a note */}
      <section aria-labelledby="add-note-heading" className="mt-10 rounded-[3px] bg-manila-100/70 p-6">
        <h2 id="add-note-heading" className="text-2xl">
          {t.addHeading}
        </h2>
        <div className="mt-4 max-w-xl">
          <label htmlFor="note-case" className="font-semibold">
            {t.whichCase}
          </label>
          <select
            id="note-case"
            value={formCaseId}
            onChange={(e) => setFormCaseId(e.target.value)}
            className="field mb-4 mt-1 block min-h-11 w-full px-4 text-base"
          >
            {CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          {/* key makes the form start fresh when the case changes, so a clue from another case is never kept */}
          <NoteForm key={formCase.id} caseDef={formCase} />
        </div>
      </section>

      {notes.length === 0 && (
        <div className="mt-6">
          <Button href="/desk" variant="secondary">
            {t.toDesk}
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-11 rounded-[4px] px-4 text-sm font-semibold transition-colors ${
        on ? " bg-espresso text-paper" : " bg-paper text-ink hover:bg-postit-light/60"
      }`}
    >
      {label}
    </button>
  );
}
