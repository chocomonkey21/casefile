"use client";

import Link from "next/link";
import { FolderCard } from "@/components/case/FolderCard";
import { StatusStamp } from "@/components/case/StatusStamp";
import { Button } from "@/components/ui/Button";
import { ClockIcon } from "@/components/ui/Icons";
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

/** The Desk: where the student lands. Shows what to do next, topics to revise, and cases in progress. */
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
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <p className="label text-evidence-dark">{t.label}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{profile ? t.welcomeBack(profile.name) : t.welcomeGuest}</h1>
        <p className="mt-2 max-w-prose text-lg text-ink-soft">{profile ? t.subtitle : t.guestSubtitle}</p>
        {!profile && (
          <div className="mt-4">
            <Button href="/join" variant="highlight">
              {t.setUpProfile}
            </Button>
          </div>
        )}
      </header>

      {/* Progress: plain facts, no scores */}
      <section aria-labelledby="progress-heading" className="rounded-2xl bg-espresso p-5 text-paper shadow-folder sm:p-6">
        <h2 id="progress-heading" className="sr-only">
          {t.progress.heading}
        </h2>
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-lg font-semibold">{copy.level.label(level.rank.name)}</p>
            <div
              className="mt-3 h-3 overflow-hidden rounded-full bg-coffee"
              role="progressbar"
              aria-label={level.next ? level.next.name : level.rank.name}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(level.fraction * 100)}
            >
              <div className="h-full rounded-full bg-postit transition-[width] duration-500" style={{ width: `${Math.round(level.fraction * 100)}%` }} />
            </div>
            <p className="mt-2 text-beige">
              {level.next ? copy.level.nextLevel(level.remaining, level.next.name) : copy.level.topLevel}
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 text-center md:text-left">
            <Stat label={t.progress.streak} value={t.progress.streakValue(streak)} />
            <Stat label={t.progress.lessons} value={String(level.lessonsCompleted)} />
            <Stat label={t.progress.closed} value={String(level.casesClosed)} />
          </dl>
        </div>
      </section>

      {/* Up next: the single recommended step */}
      <section aria-labelledby="lead-heading">
        <h2 id="lead-heading" className="sr-only">
          {t.lead.label}
        </h2>
        {lead ? (
          <div className="relative rounded-md bg-postit p-6 shadow-card sm:p-8">
            {/* Folded corner, like a sticky note */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-8 w-8 bg-gradient-to-tl from-postit-dark/70 to-postit"
              style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
            />
            <p className="label text-ink">{t.lead.label}</p>
            {lead.kind === "clue" ? (
              <>
                <p className="mt-2 font-display text-sm uppercase tracking-widest text-ink-soft">{lead.caseDef.title}</p>
                <h3 className="mt-1 text-3xl sm:text-4xl">{t.lead.clueHeading(lead.index + 1, lead.clue.title)}</h3>
                <p className="mt-2 max-w-prose text-lg text-ink">{lead.clue.teaser}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Button href={`/cases/${lead.caseDef.id}/clues/${lead.clue.id}`} size="lg">
                    {lead.fresh ? copy.common.start : copy.common.continue}
                  </Button>
                  <span className="flex items-center gap-1.5 font-medium">
                    <ClockIcon width={18} height={18} />
                    {copy.common.aboutMin(lead.clue.minutes)}
                  </span>
                </div>
              </>
            ) : (
              <>
                <h3 className="mt-2 text-3xl sm:text-4xl">{t.lead.verdictHeading}</h3>
                <p className="mt-2 max-w-prose text-lg">{t.lead.verdictText(lead.caseDef.title)}</p>
                <div className="mt-5">
                  <Button href={`/cases/${lead.caseDef.id}/verdict`} size="lg">
                    {t.lead.startVerdict}
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-desk/50 bg-desk-light p-6">
            <h3 className="text-2xl">{t.lead.allClosedHeading}</h3>
            <p className="mt-1 text-ink-soft">{t.lead.allClosedText}</p>
          </div>
        )}
      </section>

      {/* Revision reminders (cold cases) */}
      {cold.length > 0 && (
        <section aria-labelledby="revise-heading">
          <h2 id="revise-heading" className="text-2xl sm:text-3xl">
            {t.revise.heading}
          </h2>
          <p className="mt-1 text-ink-soft">{t.revise.intro}</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {cold.map(({ c, solved }) => {
              const days = daysSinceActivity(c, state) ?? 0;
              return (
                <li
                  key={c.id}
                  className="dusty relative flex flex-col gap-3 rounded-xl border-2 border-dashed border-coffee/60 bg-manila-100 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl leading-snug">{t.revise.line(c.topic, days)}</h3>
                    <StatusStamp status="cold" />
                  </div>
                  <p className="text-ink-soft">{t.revise.detail(solved, c.clues.length)}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button href={`/cases/${c.id}/interrogation/refresh`} variant="primary">
                      {t.revise.start}
                    </Button>
                    <Button href={`/cases/${c.id}`} variant="ghost">
                      {t.revise.openCase}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Cases in progress */}
      <section aria-labelledby="active-heading">
        <h2 id="active-heading" className="text-2xl sm:text-3xl">
          {t.inProgress.heading}
        </h2>
        {active.length > 0 ? (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Not started yet */}
      {fresh.length > 0 && (
        <section aria-labelledby="fresh-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="fresh-heading" className="text-2xl sm:text-3xl">
              {t.notStarted.heading}
            </h2>
            <Link href="/cases" className="inline-flex min-h-11 items-center font-semibold text-coffee underline underline-offset-4">
              {t.notStarted.seeAll}
            </Link>
          </div>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    <div>
      <dd className="font-display text-2xl sm:text-3xl">{value}</dd>
      <dt className="text-sm text-beige">{label}</dt>
    </div>
  );
}

function DeskSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6" aria-busy="true" aria-label={copy.desk.loading}>
      <div className="h-12 w-2/3 animate-pulse rounded-lg bg-manila/70" />
      <div className="h-36 animate-pulse rounded-2xl bg-espresso/80" />
      <div className="h-48 animate-pulse rounded-md bg-postit/60" />
    </div>
  );
}
