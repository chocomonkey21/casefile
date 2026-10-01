"use client";

import Link from "next/link";
import { FolderCard } from "@/components/case/FolderCard";
import { StatusStamp } from "@/components/case/StatusStamp";
import { Button } from "@/components/ui/Button";
import { Pushpin } from "@/components/ui/DeskObjects";
import { ClockIcon } from "@/components/ui/Icons";
import { RedThread } from "@/components/ui/RedThread";
import { CASES } from "@/data/cases";
import { copy } from "@/lib/copy";
import {
  caseStatus,
  currentStreak,
  daysSinceActivity,
  getTodaysLead,
  levelFor,
  solvedCount,
} from "@/lib/progress";
import { useCaseFile, useHydrated } from "@/lib/store";

/**
 * The Desk: where the student lands. Laid out like a real desk rather than a grid of equal cards:
 * a large sheet with the next step on the left, a sticky note overlapping its corner, and a narrow
 * column on the right with progress and revision reminders. Folders for cases sit below.
 */
export function DeskView() {
  const state = useCaseFile();
  const hydrated = useHydrated();

  // Saved progress is only known in the browser. Show a placeholder so the page does not flash "empty".
  if (!hydrated) return <DeskSkeleton />;

  const t = copy.desk;
  const { profile } = state;
  const level = levelFor(state);
  const lead = getTodaysLead(CASES, state);

  const withStatus = CASES.map((c) => ({ c, status: caseStatus(c, state), solved: solvedCount(c, state) }));
  const active = withStatus.filter((x) => x.status === "active");
  const cold = withStatus.filter((x) => x.status === "cold");
  const fresh = withStatus.filter((x) => x.status === "open");
  const streak = currentStreak(state.streak);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <header>
        <p className="label text-evidence-dark">{t.label}</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{profile ? t.welcomeBack(profile.name) : t.welcomeGuest}</h1>
        <RedThread className="mt-4" />
        <p className="mt-4 max-w-prose text-lg text-ink-soft">{profile ? t.subtitle : t.guestSubtitle}</p>
        {!profile && (
          <div className="mt-4">
            <Button href="/join">{t.setUpProfile}</Button>
          </div>
        )}
      </header>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-16">
        {/* ── Up next: the one recommended step, on a large sheet ── */}
        <section aria-labelledby="lead-heading" className="relative">
          <h2 id="lead-heading" className="sr-only">
            {t.lead.label}
          </h2>
          {lead ? (
            <div className="tex-paper tex-worn relative -rotate-[0.6deg] px-6 pb-8 pt-10 shadow-folder sm:px-10 sm:pb-10 sm:pt-12">
              <Pushpin className="absolute left-6 top-3" />
              <p className="label text-evidence-dark">{t.lead.label}</p>
              {lead.kind === "clue" ? (
                <>
                  <p className="mt-4 font-display text-sm uppercase tracking-widest text-ink-soft">{lead.caseDef.title}</p>
                  <h3 className="mt-2 text-3xl leading-tight sm:text-4xl">{t.lead.clueHeading(lead.index + 1, lead.clue.title)}</h3>
                  <p className="mt-4 max-w-prose text-lg">{lead.clue.teaser}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <Button href={`/cases/${lead.caseDef.id}/clues/${lead.clue.id}`} size="lg">
                      {lead.fresh ? copy.common.start : copy.common.continue}
                    </Button>
                    <span className="flex items-center gap-2 font-medium text-ink-soft">
                      <ClockIcon width={18} height={18} />
                      {copy.common.aboutMin(lead.clue.minutes)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="mt-4 text-3xl leading-tight sm:text-4xl">{t.lead.verdictHeading}</h3>
                  <p className="mt-4 max-w-prose text-lg">{t.lead.verdictText(lead.caseDef.title)}</p>
                  <div className="mt-8">
                    <Button href={`/cases/${lead.caseDef.id}/verdict`} size="lg">
                      {t.lead.startVerdict}
                    </Button>
                  </div>
                </>
              )}

              {/* A sticky note stuck over the top corner of the sheet */}
              {lead.kind === "clue" && (
                <div className="tex-postit absolute -right-3 -top-6 w-40 rotate-[3deg] px-4 py-4 shadow-card sm:-right-6 sm:w-44">
                  <p className="font-display text-lg leading-tight">{t.lead.stepOf(lead.index + 1, lead.caseDef.clues.length)}</p>
                  <p className="mt-1 text-sm text-ink-soft">{lead.caseDef.topic}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="tex-paper px-8 py-8 shadow-card">
              <h3 className="text-2xl">{t.lead.allClosedHeading}</h3>
              <p className="mt-2 text-ink-soft">{t.lead.allClosedText}</p>
            </div>
          )}
        </section>

        {/* ── The narrow column: progress, then revision ── */}
        <div className="space-y-12">
          <section aria-labelledby="progress-heading" className="tex-paper rotate-[0.8deg] px-6 py-6 shadow-card">
            <h2 id="progress-heading" className="label text-ink-soft">
              {t.progress.heading}
            </h2>
            <p className="mt-4 font-display text-2xl">{copy.level.label(level.rank.name)}</p>
            <div
              className="mt-4 h-2 overflow-hidden bg-manila-600/25"
              role="progressbar"
              aria-label={level.next ? level.next.name : level.rank.name}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(level.fraction * 100)}
            >
              <div className="h-full bg-evidence transition-[width] duration-500" style={{ width: `${Math.round(level.fraction * 100)}%` }} />
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              {level.next ? copy.level.nextLevel(level.remaining, level.next.name) : copy.level.topLevel}
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-4">
              <Stat label={t.progress.streak} value={t.progress.streakValue(streak)} />
              <Stat label={t.progress.lessons} value={String(level.lessonsCompleted)} />
              <Stat label={t.progress.closed} value={String(level.casesClosed)} />
            </dl>
          </section>

          <section aria-labelledby="revise-heading">
            <h2 id="revise-heading" className="text-2xl">
              {t.revise.heading}
            </h2>
            {cold.length > 0 ? (
              <>
                <p className="mt-2 text-ink-soft">{t.revise.intro}</p>
                <ul className="mt-6 space-y-6">
                  {cold.map(({ c, solved }) => {
                    const days = daysSinceActivity(c, state) ?? 0;
                    return (
                      <li key={c.id} className="dusty tex-manila tex-worn relative flex flex-col gap-4 p-6 shadow-card">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg leading-snug">{t.revise.line(c.topic, days)}</h3>
                          <StatusStamp status="cold" />
                        </div>
                        <p className="text-sm text-ink-soft">{t.revise.detail(solved, c.clues.length)}</p>
                        <div className="flex flex-wrap gap-4">
                          <Button href={`/cases/${c.id}/interrogation/refresh`}>{t.revise.start}</Button>
                          <Button href={`/cases/${c.id}`} variant="ghost">
                            {t.revise.openCase}
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="mt-2 max-w-prose text-ink-soft">{t.revise.empty}</p>
            )}
          </section>
        </div>
      </div>

      {/* ── Folders ── */}
      <section aria-labelledby="active-heading" className="mt-20">
        <h2 id="active-heading" className="text-2xl sm:text-3xl">
          {t.inProgress.heading}
        </h2>
        {active.length > 0 ? (
          <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {active.map(({ c, status, solved }) => (
              <li key={c.id}>
                <FolderCard caseDef={c} status={status} solved={solved} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 max-w-prose text-ink-soft">{t.inProgress.empty}</p>
        )}
      </section>

      {fresh.length > 0 && (
        <section aria-labelledby="fresh-heading" className="mt-20">
          <div className="flex items-end justify-between gap-4">
            <h2 id="fresh-heading" className="text-2xl sm:text-3xl">
              {t.notStarted.heading}
            </h2>
            <Link href="/cases" className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4">
              {t.notStarted.seeAll}
            </Link>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {fresh.slice(0, 3).map(({ c, status, solved }) => (
              <li key={c.id}>
                <FolderCard caseDef={c} status={status} solved={solved} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="text-xs leading-snug text-ink-soft">{label}</dt>
      <dd className="font-display text-2xl">{value}</dd>
    </div>
  );
}

function DeskSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-8" aria-busy="true" aria-label={copy.desk.loading}>
      <div className="h-12 w-2/3 animate-pulse bg-manila/60" />
      <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
        <div className="h-64 animate-pulse bg-paper-dark" />
        <div className="h-48 animate-pulse bg-paper-dark" />
      </div>
    </div>
  );
}
