"use client";

import Link from "next/link";
import { useState } from "react";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, LockIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";
import { clueState, nextClue, solvedCount, warrantState } from "@/lib/progress";
import { neededToPass, passed } from "@/lib/scoring";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import type { CaseDef, Question, VerdictQuestion } from "@/lib/types";
import { VerdictResult, type VerdictOutcome } from "./VerdictResult";

type VerdictViewProps = {
  caseDef: CaseDef;
  questions: VerdictQuestion[];
};

const t = copy.verdict;

/** The Verdict adds the missing fields a normal Question has, so QuestionCard can show it. Hints are switched off. */
const asQuestion = (q: VerdictQuestion): Question => ({ ...q, hint: "", walkthrough: "" });

/**
 * The final test for a case: intro, then one question at a time (no hints, one answer each),
 * then either the Case Closed screen or a clear "not passed yet" with what to review.
 */
export function VerdictView({ caseDef, questions }: VerdictViewProps) {
  const state = useCaseFile();
  const hydrated = useHydrated();
  const [phase, setPhase] = useState<"intro" | "test" | "result">("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [outcome, setOutcome] = useState<VerdictOutcome | null>(null);

  if (!hydrated) {
    return <div className="mx-auto mt-10 h-72 max-w-3xl animate-pulse rounded-3xl bg-espresso/80" aria-busy="true" aria-label={copy.room.loading} />;
  }

  const finalTest = warrantState(caseDef, state);
  const closed = state.closedCases[caseDef.id];
  const total = questions.length;
  const needed = neededToPass(total);

  const backLink = (
    <Link
      href={`/cases/${caseDef.id}?tab=clues`}
      className="mb-4 inline-flex min-h-11 items-center gap-2 font-semibold text-coffee underline-offset-4 hover:underline"
    >
      <ArrowLeftIcon width={18} height={18} />
      {t.back}
    </Link>
  );

  /* Not every lesson is completed yet: the Verdict is not open */
  if (finalTest === "locked" && phase !== "result") {
    const left = caseDef.clues.length - solvedCount(caseDef, state);
    const open = nextClue(caseDef, state);
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {backLink}
        <div className="rounded-2xl border-2 border-dashed border-coffee/50 bg-paper-dark p-6 sm:p-8">
          <LockIcon width={32} height={32} className="text-coffee" />
          <h1 className="mt-3 text-3xl">{t.lockedTitle}</h1>
          <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.lockedText(left)}</p>
          {open && clueState(caseDef, state, open.index) === "open" && (
            <div className="mt-5">
              <Button href={`/cases/${caseDef.id}/clues/${open.clue.id}`}>{copy.lesson.goToClue(open.index + 1)}</Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const begin = () => {
    setIndex(0);
    setAnswers([]);
    setOutcome(null);
    setPhase("test");
  };

  const onAnswered = (wasRight: boolean) => {
    const next = [...answers, wasRight];
    if (index + 1 < total) {
      setAnswers(next);
      setIndex(index + 1);
      return;
    }
    // Last question: work out the result and save it
    const correct = next.filter(Boolean).length;
    const byClue: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      const entry = (byClue[q.clueId] ??= { correct: 0, total: 0 });
      entry.total += 1;
      if (next[i]) entry.correct += 1;
    });
    actions.recordVerdict(caseDef.id, { correct, total, byClue });
    const didPass = passed(correct, total);
    if (didPass) actions.closeCase(caseDef.id, correct, total);
    setAnswers(next);
    setOutcome({ correct, total, byClue, passed: didPass, alreadyClosed: Boolean(closed) });
    setPhase("result");
  };

  if (phase === "result" && outcome) {
    return <VerdictResult caseDef={caseDef} outcome={outcome} onRetry={begin} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      {backLink}

      <div
        className="on-dark relative overflow-hidden rounded-[3px] bg-coffee p-4 shadow-folder sm:p-8"
      >
        <header className="mb-5">
          <p className="label text-postit">{t.label}</p>
          <h1 className="mt-1 text-2xl sm:text-3xl">{caseDef.title}</h1>
          {phase === "test" && (
            <div className="mt-3 flex items-center gap-2" aria-hidden="true">
              {questions.map((q, i) => (
                <span
                  key={q.id}
                  className={`h-2 flex-1 rounded-full ${i < index ? "bg-postit" : i === index ? "bg-paper" : "bg-coffee"}`}
                />
              ))}
            </div>
          )}
        </header>

        {phase === "intro" ? (
          <div className="rounded-2xl bg-paper p-6 text-ink sm:p-8">
            <p className="label text-ink-soft">{t.finalTest}</p>
            <h2 className="mt-1 text-3xl">{t.introTitle}</h2>
            <p className="mt-2 max-w-prose text-lg">{t.introText}</p>
            <ul className="mt-4 space-y-2 text-lg">
              {[t.rules.questions(total), t.rules.noHints, t.rules.needed(needed), t.rules.retry].map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-evidence" />
                  {rule}
                </li>
              ))}
            </ul>
            {closed && <p className="mt-4 rounded-lg bg-desk-light p-3">{t.alreadyClosed(closed.score)}</p>}
            <div className="mt-6">
              <Button size="lg" onClick={begin}>
                {closed ? t.again : t.start}
              </Button>
            </div>
          </div>
        ) : (
          <QuestionCard
            key={questions[index].id}
            question={asQuestion(questions[index])}
            position={{ index, total }}
            evidence={null}
            onDone={onAnswered}
            doneLabel={index + 1 < total ? t.nextQuestion : t.seeResults}
            onDark
            singleTry
            noHints
          />
        )}
      </div>
    </div>
  );
}
