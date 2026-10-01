"use client";

import { useEffect, useRef, type ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** id of the heading inside, so screen readers announce the dialog by name */
  labelledBy: string;
  children: ReactNode;
  className?: string;
};

/**
 * A modal dialog built on the native <dialog> element, which gives us a focus trap, the Escape key
 * and a backdrop for free. Content is only rendered while open, so each opening starts fresh.
 */
export function Dialog({ open, onClose, labelledBy, children, className = "max-w-md" }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      // Fires for Escape and for el.close()
      onClose={onClose}
      // A click on the dark backdrop lands on the dialog element itself
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border-2 border-manila-600/60 bg-paper p-0 text-ink shadow-folder backdrop:bg-espresso/75 ${className}`}
    >
      {open && children}
    </dialog>
  );
}
