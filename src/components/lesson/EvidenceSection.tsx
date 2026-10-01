"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { CheckIcon, ClockIcon, DiagramIcon, PencilIcon, PinIcon, PlayIcon, ReadingIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";
import { evidenceKey } from "@/lib/progress";
import { actions, useCaseFile } from "@/lib/store";
import type { EvidenceDef, EvidenceKind } from "@/lib/types";

const ICONS: Record<EvidenceKind, typeof ReadingIcon> = {
  reading: ReadingIcon,
  video: PlayIcon,
  diagram: DiagramIcon,
  practice: PencilIcon,
};

type EvidenceSectionProps = {
  caseId: string;
  clueId: string;
  evidence: EvidenceDef;
  number: number;
  total: number;
  children: ReactNode;
};

/** One piece of evidence on a clue page, with its own "Collect evidence" button at the bottom. */
export function EvidenceSection({ caseId, clueId, evidence, number, total, children }: EvidenceSectionProps) {
  const { collected } = useCaseFile();
  const key = evidenceKey(caseId, clueId, evidence.id);
  const isCollected = Boolean(collected[key]);
  const label = copy.evidenceKinds[evidence.kind];
  const Icon = ICONS[evidence.kind];

  return (
    <article
      id={evidence.id}
      aria-labelledby={`${evidence.id}-title`}
      className="scroll-mt-24 rounded-2xl border-2 border-manila-600/40 bg-paper p-4 shadow-card sm:p-6"
    >
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-manila-600/60 bg-manila"
        >
          <Icon width={22} height={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="label text-ink-soft">
            {copy.lesson.evidenceLabel(number, total, label)}
          </p>
          <h3 id={`${evidence.id}-title`} className="text-2xl leading-tight">
            {evidence.title}
          </h3>
        </div>
        <p className="flex shrink-0 items-center gap-1 text-sm text-ink-soft">
          <ClockIcon width={14} height={14} />
          {copy.common.min(evidence.minutes)}
        </p>
      </header>

      <div className="mt-5">{children}</div>

      <footer className="mt-6 flex flex-wrap items-center gap-3 border-t-2 border-dashed border-manila-600/40 pt-4">
        <button
          type="button"
          aria-pressed={isCollected}
          onClick={() => actions.toggleEvidence(key)}
          className={`inline-flex min-h-11 items-center gap-2 rounded-lg border-2 px-4 font-semibold transition-colors ${
            isCollected
              ? "border-sage bg-sage-light text-ink"
              : "border-ink bg-highlighter text-ink hover:bg-highlighter-dark"
          }`}
        >
          {/* The pin pops when it is collected */}
          <motion.span
            key={String(isCollected)}
            initial={isCollected ? { scale: 1.8, rotate: -25 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="flex"
          >
            {isCollected ? <CheckIcon width={18} height={18} /> : <PinIcon width={18} height={18} />}
          </motion.span>
          {isCollected ? copy.lesson.collected : copy.lesson.collect}
        </button>
        <p className="text-sm text-ink-soft">
          {isCollected ? copy.lesson.collectedHelp : copy.lesson.collectHelp}
        </p>
      </footer>
    </article>
  );
}
