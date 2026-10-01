import { Button } from "@/components/ui/Button";
import { CheckIcon, ClockIcon, LockIcon } from "@/components/ui/Icons";
import { Stamp } from "@/components/ui/Stamp";
import { copy } from "@/lib/copy";
import { isRecent } from "@/lib/progress";
import type { CaseDef, ClueDef, ClueProgress, ClueState } from "@/lib/types";

type ClueCardProps = {
  caseDef: CaseDef;
  clue: ClueDef;
  /** Zero based position in the case */
  index: number;
  state: ClueState;
  progress?: ClueProgress;
  /** Preview cases have no lessons yet, so the button says so */
  preview?: boolean;
};

const t = copy.caseFile.clueCard;

/** One line in the case checklist. Three looks: completed, ready (your next step) and not open yet. */
export function ClueCard({ caseDef, clue, index, state, progress, preview = false }: ClueCardProps) {
  const href = `/cases/${caseDef.id}/clues/${clue.id}`;

  const shell = {
    solved: "border-sage/50 bg-paper",
    open: "border-highlighter-dark bg-highlighter-light/50 shadow-card",
    locked: "border-dashed border-manila-600/50 bg-manila-100/60",
  }[state];

  return (
    <li className={`flex flex-col gap-3 rounded-xl border-2 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5 ${shell}`}>
      {/* Status marker */}
      <div
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${
          state === "solved"
            ? "border-sage bg-sage text-paper"
            : state === "open"
              ? "border-ink bg-highlighter text-ink"
              : "border-manila-600/60 bg-manila-100 text-ink-mute"
        }`}
      >
        {state === "solved" ? (
          <CheckIcon width={22} height={22} />
        ) : state === "locked" ? (
          <LockIcon width={20} height={20} />
        ) : (
          <span className="font-display text-lg">{index + 1}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="label text-ink-soft">
          {t.label(index + 1)}
          <span className="sr-only">
            , {state === "solved" ? t.stateDone : state === "open" ? t.stateReady : t.stateLocked}
          </span>
        </p>
        <h3 className={`mt-0.5 text-xl ${state === "locked" ? "text-ink-soft" : ""}`}>{clue.title}</h3>
        <p className="mt-1 text-ink-soft">{clue.teaser}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <ClockIcon width={16} height={16} />
            {copy.common.min(clue.minutes)}
          </span>
          <span>{copy.common.studyItems(clue.evidence.length)}</span>
          {state === "locked" && <span className="font-medium">{t.completeFirst(index)}</span>}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
        {state === "solved" && (
          <>
            <Stamp tone="sage" size="sm" rotate={-5} slam={isRecent(progress?.solvedAt)}>
              {t.stamp}
            </Stamp>
            <Button href={href} variant="ghost">
              {t.review}
            </Button>
          </>
        )}
        {state === "open" && (
          <Button href={href} variant={preview ? "secondary" : "primary"}>
            {preview ? t.preview : t.start}
          </Button>
        )}
      </div>
    </li>
  );
}
