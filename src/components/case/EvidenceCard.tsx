import Link from "next/link";
import { ClockIcon, DiagramIcon, LockIcon, PencilIcon, PlayIcon, ReadingIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";
import type { EvidenceDef, EvidenceKind } from "@/lib/types";

const ICONS: Record<EvidenceKind, typeof ReadingIcon> = {
  reading: ReadingIcon,
  video: PlayIcon,
  diagram: DiagramIcon,
  practice: PencilIcon,
};

type EvidenceCardProps = {
  evidence: EvidenceDef;
  /** Where it opens. Leave out when locked. */
  href?: string;
  locked?: boolean;
  /** Read out for screen readers when locked */
  lockedNote?: string;
  collected?: boolean;
};

/** One item in the evidence drawer: a small card with the kind of study material it is. */
export function EvidenceCard({
  evidence,
  href,
  locked = false,
  lockedNote = copy.caseFile.evidence.lockedNote,
  collected = false,
}: EvidenceCardProps) {
  const label = copy.evidenceKinds[evidence.kind];
  const Icon = ICONS[evidence.kind];

  const body = (
    <>
      <span
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 ${
          locked ? "border-manila-600/40 bg-manila-100 text-ink-mute" : "border-manila-600/60 bg-manila text-ink"
        }`}
      >
        {locked ? <LockIcon width={20} height={20} /> : <Icon width={22} height={22} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="label block text-ink-soft">{label}</span>
        <span className="block font-semibold">{evidence.title}</span>
        <span className="block text-sm text-ink-soft">{evidence.blurb}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1 text-sm text-ink-soft">
        <span className="flex items-center gap-1">
          <ClockIcon width={14} height={14} />
          {copy.common.min(evidence.minutes)}
        </span>
        {collected && (
          <span className="rounded-full bg-postit px-2 py-0.5 text-xs font-semibold text-ink">
            {copy.caseFile.evidence.onBoard}
          </span>
        )}
      </span>
    </>
  );

  const shell = "flex items-center gap-3 rounded-lg border-2 p-3";

  if (locked || !href) {
    return (
      <div className={`${shell} border-dashed border-manila-600/40 bg-manila-100/50 text-ink-soft`}>
        {body}
        <span className="sr-only">{lockedNote}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`${shell} border-manila-600/40 bg-paper transition-colors hover:border-coffee hover:bg-postit-light/40`}
    >
      {body}
    </Link>
  );
}
