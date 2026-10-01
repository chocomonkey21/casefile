"use client";

import { useId } from "react";
import { CrossIcon } from "@/components/ui/Icons";
import { Dialog } from "@/components/ui/Dialog";
import { copy } from "@/lib/copy";
import { HowItWorks } from "./HowItWorks";

/** The walkthrough again, in a dialog. Opened from "How CaseFile works" in the profile menu. */
export function HowItWorksDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId} className="max-w-2xl">
      <div className="p-5 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-3xl">
            {copy.explainer.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.explainer.closeDialog}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-manila-100"
          >
            <CrossIcon width={22} height={22} />
          </button>
        </div>
        <HowItWorks variant="dialog" onFinish={onClose} />
      </div>
    </Dialog>
  );
}
