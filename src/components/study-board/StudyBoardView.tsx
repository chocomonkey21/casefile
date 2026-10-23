"use client";

import { useEffect, useRef, useState } from "react";
import { PageTip } from "@/components/tips/PageTip";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { findSuggestion, pairId, relationWhy, resolveEvidence, type ResolvedEvidence } from "@/lib/board";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import { StudyBoardCanvas } from "./StudyBoardCanvas";
import { RedThread } from "@/components/ui/RedThread";

const t = copy.board;

/** The study board page: collected evidence as pinned cards, with red string and a gentle suggestion to connect ideas. */
export function StudyBoardView() {
  const state = useCaseFile();
  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [highlight, setHighlight] = useState<[string, string] | null>(null);
  const [linkNote, setLinkNote] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6" aria-busy="true" aria-label={t.loading}>
        <div className="h-12 w-1/2 animate-pulse rounded-[2px] bg-manila/70" />
        <div className="mt-6 h-96 animate-pulse rounded-[3px] bg-manila-500/40" />
      </div>
    );
  }

  const cards = Object.entries(state.collected)
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([key]) => resolveEvidence(key))
    .filter((c): c is ResolvedEvidence => c !== null);
  const keys = cards.map((c) => c.key);
  const liveStrings = state.board.strings.filter(([a, b]) => keys.includes(a) && keys.includes(b));
  const suggestion = findSuggestion(keys, liveStrings, new Set(dismissed));
  const titleOf = (key: string) => cards.find((c) => c.key === key)?.evidence.title ?? "";

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const onConnect = (a: string, b: string) => {
    if (!actions.addString(a, b)) {
      setLinkNote(t.already);
    } else {
      const why = relationWhy(a, b);
      setLinkNote(why ? t.goodLink(titleOf(a), titleOf(b), why) : t.plainLink(titleOf(a), titleOf(b)));
    }
    setHighlight(null);
    later(() => setLinkNote(null), 8000);
  };

  const showMe = () => {
    if (!suggestion) return;
    setHighlight([suggestion.a, suggestion.b]);
    later(() => setHighlight(null), 4000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-evidence-dark">{t.label}</p>
          <h1 className="mt-1 text-4xl sm:text-5xl">{t.title}</h1>
          <RedThread className="mt-4" />
          <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>
          {/* Opens by itself on the first visit, and the "?" reopens it */}
          <PageTip id="studyBoard" />
        </div>
        {cards.length > 0 && (
          <Button variant="secondary" onClick={() => actions.tidyBoard()}>
            {t.tidy}
          </Button>
        )}
      </header>

      {cards.length === 0 ? (
        <div className="mt-8 rounded-[3px] bg-manila-100/70 p-8 text-center">
          <p className="font-display text-3xl">{t.emptyTitle}</p>
          <p className="mx-auto mt-2 max-w-md text-lg text-ink-soft">{t.emptyText}</p>
          <SampleConnection />
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/home">{t.toDesk}</Button>
            <Button href="/chapters" variant="secondary">
              {t.browse}
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* The suggestion sits right above the board. The instructions fold away to keep the board high on phones. */}
          <section aria-label={t.suggestionLabel} aria-live="polite" className="mt-6 lg:min-h-36">
            {linkNote ? (
              <div className="rounded-[3px] bg-desk-light p-4">
                <p className="label text-desk-dark">{t.connectedLabel}</p>
                <p className="mt-1">{linkNote}</p>
              </div>
            ) : suggestion ? (
              <div className="rounded-[2px] bg-postit p-4 shadow-card">
                <p className="label text-ink">{t.suggestionLabel}</p>
                <p className="mt-1 text-lg font-medium">{t.suggestion(titleOf(suggestion.a), titleOf(suggestion.b))}</p>
                <p className="mt-1">{suggestion.why}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="primary" onClick={showMe}>
                    {t.showMe}
                  </Button>
                  <Button variant="secondary" onClick={() => setDismissed((d) => [...d, pairId(suggestion.a, suggestion.b)])}>
                    {t.later}
                  </Button>
                </div>
              </div>
            ) : cards.length < 2 ? (
              <div className="rounded-[3px] p-4">
                <p className="label text-ink-soft">{t.suggestionLabel}</p>
                <p className="mt-1">{t.needMore}</p>
              </div>
            ) : (
              <div className="rounded-[3px] bg-desk-light p-4">
                <p className="label text-desk-dark">{t.allConnectedLabel}</p>
                <p className="mt-1">{t.allConnected}</p>
              </div>
            )}
          </section>

          <details className="group mt-4 rounded-[3px] bg-manila-100/70">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 font-semibold">
              {t.howHeading}
              <span className="text-sm font-normal text-ink-soft group-open:hidden">{copy.common.show}</span>
              <span className="hidden text-sm font-normal text-ink-soft group-open:inline">{copy.common.hide}</span>
            </summary>
            <ul className="space-y-2 px-4 pb-4 text-ink-soft">
              {t.howItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>

          {/* A key for the red pin, so the way to connect cards is written on the board itself */}
          <p className="mt-4 flex items-center gap-2 text-sm">
            <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full bg-evidence shadow-[0_2px_0_rgb(36_25_19/0.4)]" />
            <span>
              <span className="font-semibold">{t.pinHint}.</span> <span className="text-ink-soft">{t.pinHintText}</span>
            </span>
          </p>
          <div className="mt-2">
            <StudyBoardCanvas cards={cards} board={state.board} highlight={highlight} onConnect={onConnect} />
          </div>

          <p className="mt-4 text-sm text-ink-soft">{t.counts(cards.length, liveStrings.length)}</p>

          {liveStrings.length > 0 && (
            <section aria-labelledby="strings-heading" className="mt-6">
              <h2 id="strings-heading" className="text-2xl">
                {t.listHeading}
              </h2>
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {liveStrings.map(([a, b]) => (
                  <li
                    key={pairId(a, b)}
                    className="flex items-center justify-between gap-4 rounded-[3px] bg-paper p-4"
                  >
                    <span className="min-w-0">
                      {titleOf(a)} <span aria-label={t.connectedTo}>&harr;</span> {titleOf(b)}
                    </span>
                    <button
                      type="button"
                      onClick={() => actions.removeString(a, b)}
                      aria-label={t.removeLabel(titleOf(a), titleOf(b))}
                      className="min-h-11 shrink-0 rounded-[3px] px-4 font-semibold text-evidence-dark hover:underline"
                    >
                      {t.remove}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}

/** One example of two connected cards, so a new student can see what the board is for before saving anything */
function SampleConnection() {
  return (
    <figure className="mx-auto mt-6 max-w-lg" aria-labelledby="sample-caption">
      <div className="relative flex items-center justify-between gap-10" aria-hidden="true">
        {/* The red string between the two pins */}
        <span className="absolute left-[25%] right-[25%] top-0 h-0.5 bg-evidence" />
        {[t.sampleA, t.sampleB].map((s, i) => (
          <span
            key={s}
            className={`tex-paper relative w-40 rounded-[3px] px-3 pb-3 pt-5 text-left text-sm font-semibold shadow-card ${i ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}`}
          >
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-evidence shadow-[0_2px_0_rgb(36_25_19/0.4)]" />
            {s}
          </span>
        ))}
      </div>
      <figcaption id="sample-caption" className="mt-4 text-ink-soft">
        <span className="label text-ink">{t.sampleLabel}: </span>
        {t.sampleA} and {t.sampleB.charAt(0).toLowerCase() + t.sampleB.slice(1)}. {t.sampleWhy}
      </figcaption>
    </figure>
  );
}
