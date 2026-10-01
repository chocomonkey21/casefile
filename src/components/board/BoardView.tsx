"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HelpTip } from "@/components/ui/HelpTip";
import { copy } from "@/lib/copy";
import { findSuggestion, pairId, relationWhy, resolveEvidence, type ResolvedEvidence } from "@/lib/board";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import { BoardCanvas } from "./BoardCanvas";

const t = copy.board;

/** The Evidence Board page: collected evidence as pinned cards, with red string and a gentle suggestion to connect ideas. */
export function BoardView() {
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
        <div className="h-12 w-1/2 animate-pulse rounded bg-manila/70" />
        <div className="mt-6 h-96 animate-pulse rounded-xl bg-manila-500/40" />
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
          <div className="mt-1 flex items-center gap-1">
            <h1 className="text-4xl sm:text-5xl">{t.title}</h1>
            <HelpTip label={t.helpLabel} text={t.help} />
          </div>
          <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>
        </div>
        {cards.length > 0 && (
          <Button variant="secondary" onClick={() => actions.tidyBoard()}>
            {t.tidy}
          </Button>
        )}
      </header>

      {cards.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-manila-600/60 bg-manila-100/70 p-8 text-center">
          <p className="font-display text-3xl">{t.emptyTitle}</p>
          <p className="mx-auto mt-2 max-w-md text-lg text-ink-soft">{t.emptyText}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="/desk">{t.toDesk}</Button>
            <Button href="/cases" variant="secondary">
              {t.browse}
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* The suggestion sits right above the board. The instructions fold away to keep the board high on phones. */}
          <section aria-label={t.suggestionLabel} aria-live="polite" className="mt-6 lg:min-h-36">
            {linkNote ? (
              <div className="rounded-xl border-2 border-desk bg-desk-light p-4">
                <p className="label text-desk-dark">{t.connectedLabel}</p>
                <p className="mt-1">{linkNote}</p>
              </div>
            ) : suggestion ? (
              <div className="rounded-sm bg-postit p-4 shadow-card">
                <p className="label text-ink">{t.suggestionLabel}</p>
                <p className="mt-1 text-lg font-medium">{t.suggestion(titleOf(suggestion.a), titleOf(suggestion.b))}</p>
                <p className="mt-1">{suggestion.why}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="primary" onClick={showMe}>
                    {t.showMe}
                  </Button>
                  <Button variant="secondary" onClick={() => setDismissed((d) => [...d, pairId(suggestion.a, suggestion.b)])}>
                    {t.later}
                  </Button>
                </div>
              </div>
            ) : cards.length < 2 ? (
              <div className="rounded-xl border-2 border-dashed border-manila-600/50 p-4">
                <p className="label text-ink-soft">{t.suggestionLabel}</p>
                <p className="mt-1">{t.needMore}</p>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-desk bg-desk-light p-4">
                <p className="label text-desk-dark">{t.allConnectedLabel}</p>
                <p className="mt-1">{t.allConnected}</p>
              </div>
            )}
          </section>

          <details className="group mt-4 rounded-xl bg-manila-100/70">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 font-semibold">
              {t.howHeading}
              <span className="text-sm font-normal text-ink-soft group-open:hidden">{copy.common.show}</span>
              <span className="hidden text-sm font-normal text-ink-soft group-open:inline">{copy.common.hide}</span>
            </summary>
            <ul className="space-y-1.5 px-4 pb-4 text-ink-soft">
              {t.howItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>

          <div className="mt-4">
            <BoardCanvas cards={cards} board={state.board} highlight={highlight} onConnect={onConnect} />
          </div>

          <p className="mt-3 text-sm text-ink-soft">{t.counts(cards.length, liveStrings.length)}</p>

          {liveStrings.length > 0 && (
            <section aria-labelledby="strings-heading" className="mt-6">
              <h2 id="strings-heading" className="text-2xl">
                {t.listHeading}
              </h2>
              <ul className="mt-3 grid gap-2 md:grid-cols-2">
                {liveStrings.map(([a, b]) => (
                  <li
                    key={pairId(a, b)}
                    className="flex items-center justify-between gap-3 rounded-lg border-2 border-manila-600/40 bg-paper p-3"
                  >
                    <span className="min-w-0">
                      {titleOf(a)} <span aria-label={t.connectedTo}>&harr;</span> {titleOf(b)}
                    </span>
                    <button
                      type="button"
                      onClick={() => actions.removeString(a, b)}
                      aria-label={t.removeLabel(titleOf(a), titleOf(b))}
                      className="min-h-11 shrink-0 rounded-md px-3 font-semibold text-evidence-dark hover:underline"
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
