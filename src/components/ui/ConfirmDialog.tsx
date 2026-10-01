"use client";

import { useId } from "react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  text: string;
  confirmLabel: string;
  cancelLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
};

/** A small "are you sure?" box. Cancel comes first, so it gets keyboard focus when the dialog opens. */
export function ConfirmDialog({ open, title, text, confirmLabel, cancelLabel, onCancel, onConfirm }: ConfirmDialogProps) {
  const titleId = useId();
  return (
    <Dialog open={open} onClose={onCancel} labelledBy={titleId}>
      <div className="p-6">
        <h2 id={titleId} className="text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-lg text-ink-soft">{text}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
