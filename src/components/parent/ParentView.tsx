"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RedThread } from "@/components/ui/RedThread";
import { copy } from "@/lib/copy";
import { buildParentSummary, exampleState, hasProgress, summaryText } from "@/lib/parent";
import { actions, useCaseFile, useHydrated } from "@/lib/store";

const t = copy.parent;

/**
 * The parent or guardian view. Everything comes from the progress already saved in this browser.
 * With nothing saved, it shows an example summary under a clear banner. No accounts, tracking, alerts or streaks.
 */
export function ParentView() {
  const hydrated = useHydrated();
  const state = useCaseFile();
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const [shareText, setShareText] = useState<string | null>(null);

  if (!hydrated) {
    return <div className="mx-auto mt-10 h-72 max-w-4xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={t.loading} />;
  }

  const example = !hasProgress(state);
  const summary = buildParentSummary(example ? exampleState() : state);

  const share = async () => {
    const text = summaryText(summary, example);
    try {
      await navigator.clipboard.writeText(text);
      setShareMsg(t.shared);
      setShareText(null);
    } catch {
      setShareMsg(t.shareFailed);
      setShareText(text);
    }
  };

  const remove = () => {
    actions.logOut();
    // The grade and board cookies are cleared by logOut too
    setConfirm(false);
    setDeleted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <p className="label text-evidence-dark">{t.label}</p>
      <h1 className="mt-1 text-4xl sm:text-5xl">{summary.name && !example ? t.titleFor(summary.name) : t.title}</h1>
      <RedThread className="mt-4" />
      <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>

      {example && (
        <div role="note" className="mt-6 rounded-[3px] bg-postit p-4 shadow-card">
          <p className="font-semibold">{t.exampleBanner}</p>
          <div className="mt-3">
            <Button href="/join?role=student" variant="secondary">
              {t.startStudent}
            </Button>
          </div>
        </div>
      )}

      {deleted && (
        <p role="status" className="mt-6 rounded-[3px] bg-desk-light p-4 font-semibold">
          {t.privacy.deleted}
        </p>
      )}

      <section aria-labelledby="week-heading" className="mt-8">
        <h2 id="week-heading" className="text-2xl sm:text-3xl">
          {t.week.heading}
        </h2>
        <dl className="mt-4 grid grid-cols-3 gap-4">
          {[
            [t.week.days, summary.week.daysStudied],
            [t.week.lessons, summary.week.lessonsCompleted],
            [t.week.quizzes, summary.week.quizzesTaken],
          ].map(([label, value]) => (
            <div key={label} className="tex-paper flex flex-col-reverse rounded-[3px] p-4 shadow-card">
              <dt className="text-sm text-ink-soft">{label}</dt>
              <dd className="font-display text-3xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="subjects-heading" className="mt-10">
        <h2 id="subjects-heading" className="text-2xl sm:text-3xl">
          {t.subjects.heading}
        </h2>
        {summary.subjects.length === 0 ? (
          <p className="mt-2 text-ink-soft">{t.subjects.empty}</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {summary.subjects.map((s) => (
              <div key={s.id} className="tex-paper rounded-[3px] p-4 shadow-card">
                <h3 className="text-xl">{s.label}</h3>
                <ul className="mt-2 space-y-2">
                  {s.cases.map((c) => (
                    <li key={c.title}>
                      <p className="font-semibold">{c.title}</p>
                      <p className="text-sm text-ink-soft">
                        {t.subjects.lessons(c.done, c.total)} · {copy.status[c.status]}
                      </p>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-manila-600/25" aria-hidden="true">
                        <div className="h-full w-full origin-left bg-desk" style={{ transform: `scaleX(${c.total ? c.done / c.total : 0})` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section aria-label={`${t.topics.strong} and ${t.topics.practice}`} className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="tex-paper rounded-[3px] p-4 shadow-card">
          <h2 className="text-xl">{t.topics.strong}</h2>
          {summary.strong.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5">{summary.strong.map((x) => <li key={x}>{x}</li>)}</ul>
          ) : (
            <p className="mt-2 text-ink-soft">{t.topics.strongEmpty}</p>
          )}
        </div>
        <div className="tex-paper rounded-[3px] p-4 shadow-card">
          <h2 className="text-xl">{t.topics.practice}</h2>
          {summary.practice.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5">{summary.practice.map((x) => <li key={x}>{x}</li>)}</ul>
          ) : (
            <p className="mt-2 text-ink-soft">{t.topics.practiceEmpty}</p>
          )}
        </div>
      </section>

      <section aria-labelledby="questions-heading" className="mt-10">
        <h2 id="questions-heading" className="text-2xl sm:text-3xl">
          {t.questions.heading}
        </h2>
        <p className="mt-1 max-w-prose text-ink-soft">{t.questions.intro}</p>
        {summary.questions.length ? (
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg">{summary.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        ) : (
          <p className="mt-3 text-ink-soft">{t.questions.empty}</p>
        )}
      </section>

      <div className="mt-8">
        <Button onClick={() => void share()}>{t.share}</Button>
        <p role="status" className="mt-2 font-semibold">
          {shareMsg ?? ""}
        </p>
        {shareText && (
          <textarea readOnly value={shareText} rows={10} className="field mt-2 block w-full p-3 font-mono text-sm" aria-label={t.share} />
        )}
      </div>

      <section aria-labelledby="privacy-heading" className="mt-10 rounded-[3px] bg-manila-100/70 p-5">
        <h2 id="privacy-heading" className="text-2xl">
          {t.privacy.heading}
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {t.privacy.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button variant="danger" onClick={() => setConfirm(true)} disabled={example}>
            {t.privacy.delete}
          </Button>
          <Link href="/privacy" className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline">
            {t.privacy.policy}
          </Link>
        </div>
      </section>

      <p className="mt-8">
        <Link href="/families" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:no-underline">
          {t.familiesLink}
        </Link>
      </p>

      <ConfirmDialog
        open={confirm}
        title={t.privacy.confirmTitle}
        text={t.privacy.confirmText}
        cancelLabel={t.privacy.cancel}
        confirmLabel={t.privacy.confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={remove}
      />
    </div>
  );
}
