"use client";

import Link from "next/link";
import { StatusStamp } from "@/components/case/StatusStamp";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CASES } from "@/data/cases";
import { RANKS } from "@/data/ranks";
import { coldCases, coolingCases, overallStats, splitTopics, topicStats, type TopicStat } from "@/lib/lab";
import { copy } from "@/lib/copy";
import { COLD_AFTER_DAYS, currentStreak, levelFor, solvedCount } from "@/lib/progress";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import { RedThread } from "@/components/ui/RedThread";

const t = copy.lab;

/** The Lab: how the student is doing. Level, what they are strong in, what needs practice, and what to revise. */
export function LabView() {
  const state = useCaseFile();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6" aria-busy="true" aria-label={t.loading}>
        <div className="h-12 w-1/3 animate-pulse rounded-[2px] bg-manila/70" />
        <div className="h-48 animate-pulse rounded-[3px] bg-espresso/80" />
      </div>
    );
  }

  const level = levelFor(state);
  const stats = overallStats(state);
  const { strong, weak } = splitTopics(topicStats(state));
  const cold = coldCases(state);
  const cooling = coolingCases(state);
  const started = CASES.filter((c) => state.caseActivity[c.id]);
  // Lesson titles are used mid-sentence ("You’re strong in how water evaporates"), so start them in lower case
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
  const strongNames = strong.slice(0, 3).map((s) => lower(s.clueTitle));
  const weakNames = weak.slice(0, 3).map((s) => lower(s.clueTitle));

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <p className="label text-evidence-dark">{t.label}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{t.title}</h1>
<RedThread className="mt-4" />
        <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>
      </header>

      {/* Level */}
      <section aria-labelledby="level-heading" className="tex-paper tex-worn p-6 shadow-card sm:p-8">
        <h2 id="level-heading" className="text-2xl">
          {copy.level.label(level.rank.name)}
        </h2>
        <p className="mt-1 text-ink-soft">{copy.level.howItWorks}</p>
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
        <p className="mt-2 text-ink-soft">
          {level.next ? copy.level.nextLevel(level.remaining, level.next.name) : copy.level.topLevel}
        </p>

        <ol className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-5" aria-label={t.allLevels}>
          {RANKS.map((r, i) => {
            const reached = i <= level.rankIndex;
            return (
              <li
                key={r.id}
                aria-current={i === level.rankIndex ? "step" : undefined}
                className={`rounded-[2px] p-4 ${
                  i === level.rankIndex
                    ? " tex-postit -rotate-1 shadow-card"
                    : reached
                      ? " bg-paper-dark"
                      : " "
                }`}
              >
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-ink-soft">
                  {i === level.rankIndex ? t.levelStatus.here : reached ? t.levelStatus.reached : t.levelStatus.ahead}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Numbers */}
      <section aria-labelledby="numbers-heading">
        <h2 id="numbers-heading" className="text-2xl sm:text-3xl">
          {t.numbers}
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Stat label={t.stats.streak} value={copy.desk.progress.streakValue(currentStreak(state.streak))} />
          <Stat label={t.stats.lessons} value={String(stats.cluesSolved)} />
          <Stat label={t.stats.closed} value={String(stats.casesClosed)} />
          <Stat label={t.stats.firstTime} value={stats.accuracy === null ? t.stats.none : `${stats.accuracy}%`} />
          <Stat label={t.stats.evidence} value={String(stats.evidence)} />
          <Stat label={t.stats.notes} value={String(stats.notes)} />
        </dl>
      </section>

      {/* Strengths and topics to practise */}
      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="text-2xl sm:text-3xl">
          {t.topics.heading}
        </h2>
        {strong.length + weak.length === 0 ? (
          <div className="mt-4 rounded-[3px] p-6">
            <p className="font-display text-2xl">{t.topics.emptyTitle}</p>
            <p className="mt-1 max-w-prose text-ink-soft">{t.topics.emptyText}</p>
            <div className="mt-4">
              <Button href="/desk">{copy.board.toDesk}</Button>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-2 max-w-prose text-lg">{t.topics.summary(strongNames, weakNames)}</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <TopicColumn title={t.topics.strongTitle} empty={t.topics.strongEmpty} topics={strong} tone="desk" />
              <TopicColumn title={t.topics.weakTitle} empty={t.topics.weakEmpty} topics={weak} tone="postit" />
            </div>
          </>
        )}
      </section>

      {/* Revision reminders */}
      <section aria-labelledby="revise-heading">
        <h2 id="revise-heading" className="text-2xl sm:text-3xl">
          {t.revise.heading}
        </h2>
        {cold.length === 0 && cooling.length === 0 ? (
          <p className="mt-2 text-ink-soft">{t.revise.none(COLD_AFTER_DAYS)}</p>
        ) : (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {cold.map(({ caseDef, days }) => (
              <li key={caseDef.id} className="dusty relative rounded-[3px] bg-manila-100 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl leading-snug">{copy.desk.revise.line(caseDef.topic, days)}</h3>
                  <StatusStamp status="cold" />
                </div>
                <p className="mt-2 text-ink-soft">{copy.desk.revise.detail(solvedCount(caseDef, state), caseDef.clues.length)}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Button href={`/cases/${caseDef.id}/interrogation/refresh`}>{copy.desk.revise.start}</Button>
                  <Button href={`/cases/${caseDef.id}`} variant="ghost">
                    {copy.desk.revise.openCase}
                  </Button>
                </div>
              </li>
            ))}
            {cooling.map(({ caseDef, days, daysLeft }) => (
              <li key={caseDef.id} className="rounded-[3px] bg-paper p-6">
                <h3 className="text-xl leading-snug">{t.revise.cooling(caseDef.topic, days, daysLeft)}</h3>
                <div className="mt-4">
                  <Button href={`/cases/${caseDef.id}`} variant="secondary">
                    {copy.desk.revise.openCase}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Demo controls: this is how you check the review flow without waiting a week */}
      <details className="rounded-[3px] p-4">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-coffee">{t.demo.summary}</summary>
        <p className="mt-2 max-w-prose text-sm text-ink-soft">{t.demo.text}</p>
        {started.length === 0 ? (
          <p className="mt-4">{t.demo.none}</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {started.map((c) => (
              <li key={c.id} className="flex flex-col items-start gap-2 rounded-[3px] bg-manila-100/70 p-4">
                <span className="font-medium">{c.title}</span>
                <span className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => actions.setCaseActivity(c.id, new Date(Date.now() - 9 * 86400000).toISOString())}>
                    {t.demo.nine}
                  </Button>
                  <Button variant="secondary" onClick={() => actions.setCaseActivity(c.id, new Date(Date.now() - 5 * 86400000).toISOString())}>
                    {t.demo.five}
                  </Button>
                  <Button variant="ghost" onClick={() => actions.touchCase(c.id)}>
                    {t.demo.reset}
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </details>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[3px] bg-paper p-4">
      <dd className="font-display text-2xl sm:text-3xl">{value}</dd>
      <dt className="text-sm text-ink-soft">{label}</dt>
    </div>
  );
}

function TopicColumn({
  title,
  topics,
  empty,
  tone,
}: {
  title: string;
  topics: TopicStat[];
  empty: string;
  tone: "desk" | "postit";
}) {
  return (
    <div className="rounded-[3px] bg-manila-100/60 p-4 sm:p-6">
      <h3 className="text-xl">{title}</h3>
      {topics.length === 0 ? (
        <p className="mt-2 text-ink-soft">{empty}</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {topics.map((tp) => (
            <li key={`${tp.caseId}:${tp.clueId}`} className="rounded-[3px] bg-paper p-4">
              <p className="font-semibold">{tp.clueTitle}</p>
              <p className="text-sm text-ink-soft">
                {tp.caseTopic} · {t.topics.result(tp.correct, tp.total, Math.round(tp.fraction * 100))}
              </p>
              <div className="mt-2">
                <ProgressBar value={tp.correct} max={tp.total} label={t.topics.accuracyLabel(tp.clueTitle)} tone={tone} />
              </div>
              {tone === "postit" && (
                <p className="mt-2 text-sm">
                  <Link
                    href={`/cases/${tp.caseId}/clues/${tp.clueId}`}
                    className="inline-flex min-h-11 items-center font-semibold text-coffee underline underline-offset-4"
                  >
                    {t.topics.review}
                  </Link>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
