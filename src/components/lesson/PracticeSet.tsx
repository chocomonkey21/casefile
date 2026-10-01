"use client";

import { useState } from "react";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { Button } from "@/components/ui/Button";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, CrossIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";
import type { Question } from "@/lib/types";

type PracticeSetProps = {
  intro: string;
  questions?: Question[];
  order?: { prompt: string; items: string[] };
  /** Finds the evidence a hint should point to */
  evidenceFor: (evidenceId?: string) => { title: string; href: string } | null;
};

/** A practice set inside a clue. It is for warming up: hints are free and nothing is scored. */
export function PracticeSet({ intro, questions, order, evidenceFor }: PracticeSetProps) {
  return (
    <div>
      <p className="max-w-prose text-lg">{intro}</p>
      <div className="mt-4">
        {questions && <PracticeQuestions questions={questions} evidenceFor={evidenceFor} />}
        {order && <OrderTask prompt={order.prompt} items={order.items} />}
      </div>
    </div>
  );
}

function PracticeQuestions({ questions, evidenceFor }: { questions: Question[]; evidenceFor: PracticeSetProps["evidenceFor"] }) {
  const [index, setIndex] = useState(0);
  const [firstTry, setFirstTry] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-xl border-2 border-desk bg-desk-light p-5" role="status">
        <p className="font-display text-2xl">{copy.practice.doneTitle}</p>
        <p className="mt-1">
          {copy.practice.doneText(firstTry, questions.length)}
        </p>
        <div className="mt-3">
          <Button
            variant="secondary"
            onClick={() => {
              setIndex(0);
              setFirstTry(0);
              setDone(false);
            }}
          >
            {copy.common.tryAgain}
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="rounded-2xl bg-manila-100/70 p-3 sm:p-4">
      <p className="label mb-2 text-ink-soft">
        {copy.practice.label(index + 1, questions.length)}
      </p>
      <QuestionCard
        key={q.id}
        question={q}
        evidence={evidenceFor(q.evidenceId)}
        onDone={(first) => {
          setFirstTry((n) => n + (first ? 1 : 0));
          if (index + 1 < questions.length) setIndex(index + 1);
          else setDone(true);
        }}
        doneLabel={index + 1 < questions.length ? copy.common.next : copy.practice.finish}
      />
    </div>
  );
}

/**
 * Put-in-order task. Buttons move items up and down, which works with a keyboard,
 * a screen reader and a touch screen (dragging is not needed).
 */
function OrderTask({ prompt, items }: { prompt: string; items: string[] }) {
  // Start in a fixed mixed-up order so the task is not already solved
  const [list, setList] = useState(() => [2, 0, 3, 1].filter((i) => i < items.length).map((i) => items[i]));
  const [checked, setChecked] = useState(false);
  const [announce, setAnnounce] = useState("");

  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length) return;
    const next = [...list];
    [next[from], next[to]] = [next[to], next[from]];
    setList(next);
    setChecked(false);
    setAnnounce(copy.practice.moved(to + 1, list.length));
  };

  const rightCount = list.filter((item, i) => item === items[i]).length;
  const allRight = rightCount === items.length;

  return (
    <div className="rounded-2xl bg-manila-100/70 p-4">
      <p className="text-xl font-semibold">{prompt}</p>
      <ol className="mt-3 space-y-2">
        {list.map((item, i) => {
          const right = checked && item === items[i];
          const wrong = checked && item !== items[i];
          return (
            <li
              key={item}
              className={`flex items-center gap-3 rounded-lg border-2 p-3 ${
                right ? "border-desk bg-desk-light" : wrong ? "border-evidence-dark/60 bg-evidence-light/60" : "border-manila-600/40 bg-paper"
              }`}
            >
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-espresso font-display text-paper">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-lg leading-snug">{item}</span>
              {right && <CheckIcon width={20} height={20} className="shrink-0 text-desk-dark" aria-label={copy.practice.rightPlace} role="img" />}
              {wrong && <CrossIcon width={20} height={20} className="shrink-0 text-evidence-dark" aria-label={copy.practice.wrongPlace} role="img" />}
              <span className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0}
                  aria-label={copy.practice.moveUp(item.split(":")[0])}
                  className="flex h-11 w-11 items-center justify-center rounded-md border-2 border-manila-600/50 bg-manila hover:bg-manila-400 disabled:opacity-40"
                >
                  <ArrowUpIcon width={18} height={18} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === list.length - 1}
                  aria-label={copy.practice.moveDown(item.split(":")[0])}
                  className="flex h-11 w-11 items-center justify-center rounded-md border-2 border-manila-600/50 bg-manila hover:bg-manila-400 disabled:opacity-40"
                >
                  <ArrowDownIcon width={18} height={18} />
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={() => setChecked(true)}>{copy.practice.checkOrder}</Button>
        {checked && (
          <p role="status" className="font-semibold">
            {allRight ? copy.practice.orderCorrect : copy.practice.orderPartial(rightCount, items.length)}
          </p>
        )}
      </div>
    </div>
  );
}
