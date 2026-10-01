import { Button } from "@/components/ui/Button";
import { LockIcon } from "@/components/ui/Icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { copy } from "@/lib/copy";
import type { WarrantState } from "@/lib/progress";

type WarrantBannerProps = {
  caseId: string;
  state: WarrantState;
  solved: number;
  total: number;
};

const t = copy.caseFile.finalTest;

/**
 * Shows whether the final test (the Verdict) is available.
 * Not available until every lesson is completed, then ready, then done once the case is closed.
 * (The code calls this a "warrant", the detective name for the same idea.)
 */
export function WarrantBanner({ caseId, state, solved, total }: WarrantBannerProps) {
  const remaining = total - solved;

  if (state === "locked") {
    return (
      <section
        aria-labelledby="final-test-heading"
        className="rounded-xl border-2 border-dashed border-navy/50 bg-navy-50 p-5"
      >
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-1 text-navy">
            <LockIcon width={24} height={24} />
          </span>
          <div className="flex-1">
            <h3 id="final-test-heading" className="text-xl">
              {t.lockedTitle}
            </h3>
            <p className="mt-1 text-ink-soft">{t.lockedText(remaining)}</p>
            <div className="mt-3 max-w-md">
              <ProgressBar value={solved} max={total} label={t.lockedProgress} tone="navy" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state === "ready") {
    return (
      <section
        aria-labelledby="final-test-heading"
        className="rounded-xl border-2 border-navy bg-navy p-5 text-paper shadow-folder"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <h3 id="final-test-heading" className="text-xl">
              {t.readyTitle}
            </h3>
            <p className="mt-1 text-navy-100">{t.readyText}</p>
          </div>
          <Button href={`/cases/${caseId}/verdict`} variant="highlight" size="lg">
            {t.start}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="final-test-heading" className="rounded-xl border-2 border-sage/60 bg-sage-light p-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="min-w-0 flex-1">
          <h3 id="final-test-heading" className="text-xl">
            {t.closedTitle}
          </h3>
          <p className="mt-1 text-ink-soft">{t.closedText}</p>
        </div>
        <Button href={`/cases/${caseId}/verdict`} variant="secondary">
          {t.viewResults}
        </Button>
      </div>
    </section>
  );
}
