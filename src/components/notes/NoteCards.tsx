"use client";

import { TrashIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";
import { actions } from "@/lib/store";
import type { CaseDef, Note } from "@/lib/types";

/** Sticky-note style cards for saved notes, with a delete button on each. */
export function NoteCards({ notes, caseDef }: { notes: Note[]; caseDef: CaseDef }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {notes.map((n) => {
        const clueIndex = caseDef.clues.findIndex((c) => c.id === n.clueId);
        return (
          <li key={n.id} className="tex-postit flex flex-col rounded-[2px] bg-postit-light p-4 shadow-card">
            <p className="label text-ink-soft">{clueIndex >= 0 ? copy.caseFile.clueCard.label(clueIndex + 1) : copy.notes.wholeCase}</p>
            <p className="mt-1 flex-1 whitespace-pre-wrap">{n.text}</p>
            <button
              type="button"
              onClick={() => actions.deleteNote(n.id)}
              aria-label={copy.notes.deleteLabel(n.text.slice(0, 30))}
              className="mt-4 flex min-h-11 items-center gap-2 self-end px-2 text-sm font-semibold text-evidence-dark hover:underline"
            >
              <TrashIcon width={16} height={16} />
              {copy.common.delete}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
