"use client";

import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { actions, NOTE_DRAFT_PREFIX } from "@/lib/store";
import type { CaseDef } from "@/lib/types";

type NoteFormProps = {
  caseDef: CaseDef;
  /** When set, the note is tied to this clue and the picker is hidden */
  fixedClueId?: string;
};

function readDraft(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeDraft(key: string, text: string) {
  try {
    if (text.trim()) localStorage.setItem(key, text);
    else localStorage.removeItem(key);
  } catch {
    // Storage blocked: the draft just lives in the field
  }
}

/**
 * Add a note to Notes. Used on the case file (with a clue picker), on each lesson page and on Notes.
 * - The text is kept on the device as the student types (one draft per form), so leaving the page loses nothing.
 * - Closing or reloading the tab with unsaved text asks first.
 * - Saving shows "Saved to your Notes" with a link there.
 */
export function NoteForm({ caseDef, fixedClueId }: NoteFormProps) {
  const draftKey = `${NOTE_DRAFT_PREFIX}${caseDef.id}:${fixedClueId ?? "case"}`;
  const [text, setText] = useState("");
  const [clueId, setClueId] = useState("");
  const [saved, setSaved] = useState(false);
  const fieldId = useId();

  // Bring back a draft after the page loads (localStorage only exists in the browser)
  useEffect(() => {
    const draft = readDraft(draftKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one read of browser storage after mount
    if (draft) setText(draft);
  }, [draftKey]);

  // Ask before the tab closes or reloads with text that has not been saved as a note
  useEffect(() => {
    if (!text.trim()) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = copy.notes.leaveWarning;
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [text]);

  const onChange = (value: string) => {
    setText(value);
    setSaved(false);
    writeDraft(draftKey, value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    actions.addNote(caseDef.id, text, fixedClueId ?? (clueId || null));
    setText("");
    writeDraft(draftKey, "");
    setSaved(true);
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
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          aria-describedby={`${fieldId}-draft`}
          className="field mt-1 w-full p-4 text-base"
          placeholder={copy.notes.placeholder}
        />
        <p id={`${fieldId}-draft`} className="mt-1 text-sm text-ink-soft">
          {copy.notes.draftKept}
        </p>
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
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={!text.trim()}>
          {copy.notes.save}
        </Button>
        <p role="status" className="font-semibold text-desk-dark">
          {saved && (
            <>
              {copy.notes.savedTo}{" "}
              <Link href="/notes" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline">
                {copy.notes.openNotes}
              </Link>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
