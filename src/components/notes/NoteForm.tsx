"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { actions } from "@/lib/store";
import type { CaseDef } from "@/lib/types";

type NoteFormProps = {
  caseDef: CaseDef;
  /** When set, the note is tied to this clue and the picker is hidden */
  fixedClueId?: string;
};

/** Add a note to the Notebook. Used on the case file (with a clue picker) and on each clue page. */
export function NoteForm({ caseDef, fixedClueId }: NoteFormProps) {
  const [text, setText] = useState("");
  const [clueId, setClueId] = useState("");
  const fieldId = useId();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    actions.addNote(caseDef.id, text, fixedClueId ?? (clueId || null));
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <div>
        <label htmlFor={`${fieldId}-text`} className="font-semibold">
          {copy.notes.newNote}
        </label>
        <textarea
          id={`${fieldId}-text`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="field mt-1 w-full p-4 text-base"
          placeholder={copy.notes.placeholder}
        />
      </div>
      {!fixedClueId && (
        <div>
          <label htmlFor={`${fieldId}-clue`} className="font-semibold">
            {copy.notes.aboutClue} <span className="font-normal text-ink-soft">{copy.notes.optional}</span>
          </label>
          <select
            id={`${fieldId}-clue`}
            value={clueId}
            onChange={(e) => setClueId(e.target.value)}
            className="field mt-1 block min-h-11 w-full px-4 text-base"
          >
            <option value="">{copy.notes.wholeCase}</option>
            {caseDef.clues.map((c, i) => (
              <option key={c.id} value={c.id}>
                {copy.notes.clueOption(i + 1, c.title)}
              </option>
            ))}
          </select>
        </div>
      )}
      <Button type="submit" disabled={!text.trim()}>
        {copy.notes.save}
      </Button>
    </form>
  );
}
