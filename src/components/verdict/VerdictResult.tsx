"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FolderCard } from "@/components/case/FolderCard";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Stamp } from "@/components/ui/Stamp";
import { CASES } from "@/data/cases";
import { copy } from "@/lib/copy";
import { caseStatus, recommendNextCase, solvedCount } from "@/lib/progress";
import { neededToPass } from "@/lib/scoring";
import { useCaseFile } from "@/lib/store";
import type { CaseDef } from "@/lib/types";

export type VerdictOutcome = {
  correct: number;
  total: number;
  byClue: Record<string, { correct: number; total: number }>;
  passed: boolean;
  /** The case was already closed before this attempt */
  alreadyClosed: boolean;
};

const t = copy.verdict;

/**
 * After the last question: the Case Closed screen if the student passed, a clear "not passed yet" screen if not.
 * The stamp is the visual moment. The text beside it is plain fact.
 */
export function VerdictResult({ caseDef, outcome, onRetry }: { caseDef: CaseDef; outcome: VerdictOutcome; onRetry: () => void }) {
  const state = useCaseFile();
  const { correct, total, byClue, passed, alreadyClosed } = outcome;
  const needed = neededToPass(total);
  const next = passed ? recommendNextCase(CASES, state, caseDef.id) : null;

  const breakdown = (
    <section aria-labelledby="breakdown-heading" className="mt-8">
      <h2 id="breakdown-heading" className="text-2xl">
        {t.breakdown}
      </h2>
      <ul className="mt-3 space-y-2">
        {caseDef.clues.map((clue, i) => {
          const r = byClue[clue.id];
          if (!r) return null;
          const perfect = r.correct === r.total;
          return (
            <li key={clue.id} className="rounded-xl border-2 border-manila-600/40 bg-paper p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                  <span className="label mr-2 text-ink-soft">{t.clueLabel(i + 1)}</span>
                  {clue.title}
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  {perfect && <CheckIcon width={16} height={16} className="text-desk-dark" aria-label={t.allRight} role="img" />}
                  {t.rightOf(r.correct, r.total)}
                </p>
              </div>
              <div className="mt-2">
                <ProgressBar value={r.correct} max={r.total} label={t.scoreLabel(i + 1)} tone={perfect ? "desk" : "postit"} />
              </div>
              {!perfect && (
                <p className="mt-2 text-sm">
                  <Link
                    href={`/cases/${caseDef.id}/clues/${clue.id}`}
                    className="inline-flex min-h-11 items-center font-semibold text-coffee underline underline-offset-4"
                  >
                    {t.reviewClue}
                  </Link>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );

  /* ---------- Not passed yet ---------- */
  if (!passed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-2xl border-2 border-manila-600/50 bg-manila p-6 shadow-folder sm:p-8" role="status">
          <p className="label text-ink-soft">{t.label}</p>
          <h1 className="mt-1 text-4xl">{t.notPassed.title}</h1>
          <p className="mt-2 text-xl">{t.notPassed.score(correct, total, needed)}</p>
          <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.notPassed.text(alreadyClosed)}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button size="lg" onClick={onRetry}>
              {t.notPassed.retry}
            </Button>
            <Button href={`/cases/${caseDef.id}?tab=clues`} variant="secondary">
              {t.notPassed.back}
            </Button>
          </div>
        </div>
        {breakdown}
      </div>
    );
  }

  /* ---------- Case closed ---------- */
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* The panel gives a small shake just after the stamp lands */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border-2 border-manila-600/50 bg-manila p-6 text-center shadow-folder sm:p-10"
        animate={{ x: [0, -5, 5, -3, 0], y: [0, 3, -2, 1, 0] }}
        transition={{ delay: 0.32, duration: 0.35 }}
        role="status"
      >
        <p className="label text-ink-soft">{t.closed.caseNo(caseDef.number)}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl">{caseDef.title}</h1>

        <div className="my-8 flex justify-center">
          <Stamp tone="red" size="xl" rotate={-8} slam>
            {t.closed.stamp}
          </Stamp>
        </div>

        <p className="mx-auto max-w-prose text-xl">
          {alreadyClosed ? t.closed.alreadyClosed : t.closed.summary(caseDef.clues.length, correct, total)}
        </p>
      </motion.div>

      {breakdown}

      <section aria-labelledby="next-heading" className="mt-10">
        <h2 id="next-heading" className="text-2xl sm:text-3xl">
          {next ? t.next.heading : t.next.headingNone}
        </h2>
        {next ? (
          <div className="mt-4 grid items-start gap-6 sm:grid-cols-2">
            <FolderCard caseDef={next} status={caseStatus(next, state)} solved={solvedCount(next, state)} />
            <div className="space-y-3">
              <p className="text-lg text-ink-soft">{next.stub ? t.next.textPreview : t.next.textFull}</p>
              <div className="flex flex-wrap gap-3">
                <Button href={`/cases/${next.id}`} size="lg">
                  {t.next.open}
                </Button>
                <Button href="/desk" variant="secondary">
                  {t.next.toDesk}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap gap-3">
            <p className="w-full max-w-prose text-lg text-ink-soft">{t.next.none}</p>
            <Button href="/desk">{t.next.toDesk}</Button>
          </div>
        )}
        <p className="mt-6">
          <Link href="/lab" className="inline-flex min-h-11 items-center font-semibold text-coffee underline underline-offset-4">
            {t.next.lab}
          </Link>
        </p>
      </section>
    </div>
  );
}
