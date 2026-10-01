"use client";

import Link from "next/link";
import { useState } from "react";
import { StatusStamp } from "@/components/case/StatusStamp";
import { Button } from "@/components/ui/Button";
import { HelpTip } from "@/components/ui/HelpTip";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { Stamp } from "@/components/ui/Stamp";
import { copy } from "@/lib/copy";
import { clueState, isClueSolved, nextClue, solvedCount, warrantState } from "@/lib/progress";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import type { CaseDef, Question } from "@/lib/types";
import { QuestionCard } from "./QuestionCard";

export type RoomQuestion = { clueId: string; question: Question };

type InterrogationRoomProps = {
  caseDef: CaseDef;
  mode: "clue" | "refresh";
  /** Questions in order. In clue mode they all belong to one clue. */
  questions: RoomQuestion[];
  /** Clue mode only */
  clueId?: string;
};

const t = copy.room;

/**
 * The quiz area, one question at a time. Clue mode completes the clue at the end.
 * Review mode (for a cold case) is a short revision round that brings the case back to "in progress".
 */
export function InterrogationRoom(props: InterrogationRoomProps) {
  const state = useCaseFile();
  const hydrated = useHydrated();
  const { caseDef, mode } = props;

  // The review only revisits clues the student has completed. That is saved progress, so wait for it.
  if (mode === "refresh") {
    if (!hydrated) {
      return <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-3xl bg-espresso/80" aria-busy="true" aria-label={t.loading} />;
    }
    const solvedIds = caseDef.clues.filter((c) => isClueSolved(state, caseDef.id, c.id)).map((c) => c.id);
    const picked = props.questions.filter((q) => solvedIds.includes(q.clueId)).slice(0, 4);
    // Nothing completed yet (cold from day one): fall back to the first clue so the room is never empty
    return <Room {...props} questions={picked.length > 0 ? picked : props.questions.slice(0, 2)} />;
  }

  // A clue that is not open yet can't be completed by typing its address
  const clueIdx = caseDef.clues.findIndex((c) => c.id === props.clueId);
  if (hydrated && clueIdx >= 0 && clueState(caseDef, state, clueIdx) === "locked") {
    const open = nextClue(caseDef, state);
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border-2 border-dashed border-manila-600/60 bg-manila-100 p-6">
          <h1 className="text-3xl">{t.lockedTitle}</h1>
          <p className="mt-2 text-lg text-ink-soft">{t.lockedText(clueIdx)}</p>
          {open && (
            <div className="mt-5">
              <Button href={`/cases/${caseDef.id}/clues/${open.clue.id}`}>{copy.lesson.goToClue(open.index + 1)}</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return <Room {...props} />;
}

function Room({ caseDef, mode, questions, clueId }: InterrogationRoomProps) {
  const [index, setIndex] = useState(0);
  const [firstTry, setFirstTry] = useState(0);
  const [finished, setFinished] = useState(false);

  const clue = caseDef.clues.find((c) => c.id === clueId);
  const clueIndex = caseDef.clues.findIndex((c) => c.id === clueId);
  const total = questions.length;
  const current = questions[index];
  const backHref = mode === "clue" ? `/cases/${caseDef.id}/clues/${clueId}` : `/cases/${caseDef.id}`;

  const evidenceFor = (rq: RoomQuestion) => {
    const evidenceClue = caseDef.clues.find((c) => c.id === rq.clueId);
    const item = evidenceClue?.evidence.find((e) => e.id === rq.question.evidenceId);
    return item ? { title: item.title, href: `/cases/${caseDef.id}/clues/${rq.clueId}#${item.id}` } : null;
  };

  const onDone = (wasFirstTry: boolean) => {
    const nextFirstTry = firstTry + (wasFirstTry ? 1 : 0);
    setFirstTry(nextFirstTry);
    if (index + 1 < total) {
      setIndex(index + 1);
      return;
    }
    if (mode === "clue" && clueId) {
      actions.solveClue(caseDef.id, clueId, { firstTry: nextFirstTry, total });
    } else {
      actions.touchCase(caseDef.id);
    }
    setFinished(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={backHref}
        className="mb-4 inline-flex min-h-11 items-center gap-2 font-semibold text-coffee underline-offset-4 hover:underline"
      >
        <ArrowLeftIcon width={18} height={18} />
        {mode === "clue" ? t.backToClue : t.backToCase}
      </Link>

      <div
        className="on-dark relative overflow-hidden rounded-[3px] bg-coffee p-4 shadow-folder sm:p-8"
      >
        <header className="mb-5">
          <p className="label flex items-center text-postit">
            {t.label}
            <HelpTip label={t.helpLabel} text={t.help} />
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl">
            {mode === "clue" && clue ? t.clueTitle(clueIndex + 1, clue.title) : t.reviewTitle(caseDef.topic)}
          </h1>
          {!finished && (
            <div className="mt-3 flex items-center gap-2" aria-hidden="true">
              {questions.map((q, i) => (
                <span
                  key={q.question.id}
                  className={`h-2 flex-1 rounded-full ${i < index ? "bg-postit" : i === index ? "bg-paper" : "bg-coffee"}`}
                />
              ))}
            </div>
          )}
        </header>

        {!finished ? (
          <QuestionCard
            key={current.question.id}
            question={current.question}
            position={{ index, total }}
            evidence={evidenceFor(current)}
            onDone={onDone}
            doneLabel={index + 1 < total ? copy.question.nextQuestion : copy.question.finish}
            onDark
          />
        ) : (
          <Results caseDef={caseDef} mode={mode} clueId={clueId} firstTry={firstTry} total={total} />
        )}
      </div>
    </div>
  );
}

function Results({
  caseDef,
  mode,
  clueId,
  firstTry,
  total,
}: {
  caseDef: CaseDef;
  mode: "clue" | "refresh";
  clueId?: string;
  firstTry: number;
  total: number;
}) {
  const state = useCaseFile();
  const solved = solvedCount(caseDef, state);
  const finalTest = warrantState(caseDef, state);
  const upNext = nextClue(caseDef, state);
  const clueIndex = caseDef.clues.findIndex((c) => c.id === clueId);
  const r = t.result;

  return (
    <div className="rounded-2xl bg-paper p-6 text-ink sm:p-8" role="status">
      <div className="flex flex-wrap items-center gap-5">
        {mode === "clue" ? (
          <Stamp tone="desk" size="lg" rotate={-7} slam>
            {copy.caseFile.clueCard.stamp}
          </Stamp>
        ) : (
          <StatusStamp status="active" size="lg" />
        )}
        <div>
          <h2 className="text-3xl">{mode === "clue" ? r.clueDone(clueIndex + 1) : r.reviewDone}</h2>
          <p className="mt-1 text-lg text-ink-soft">{r.firstTime(firstTry, total)}</p>
        </div>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {mode === "clue" ? (
          <>
            <Fact label={r.factQuestions} value={`${firstTry} of ${total}`} note="" />
            <Fact label={r.factProgress} value={r.lessonsDone(solved, caseDef.clues.length)} note="" />
          </>
        ) : (
          <>
            <Fact label={r.factStatus} value={r.statusValue} note={r.statusNote} />
            <Fact label={r.factProgress} value={r.lessonsDone(solved, caseDef.clues.length)} note="" />
            <Fact label={r.factNext} value={upNext ? r.nextClue(upNext.index + 1) : r.nextVerdict} note={r.nextNote} />
          </>
        )}
      </dl>

      <div className="mt-7 flex flex-wrap gap-3">
        {mode === "clue" && finalTest === "ready" ? (
          <Button href={`/cases/${caseDef.id}/verdict`} size="lg" variant="highlight">
            {r.allDoneVerdict}
          </Button>
        ) : upNext && clueState(caseDef, state, upNext.index) === "open" ? (
          <Button href={`/cases/${caseDef.id}/clues/${upNext.clue.id}`} size="lg">
            {mode === "clue" ? r.nextClueButton : r.continueCase}
          </Button>
        ) : null}
        <Button href={`/cases/${caseDef.id}?tab=clues`} variant="secondary">
          {r.backToCase}
        </Button>
        <Button href="/desk" variant="ghost">
          {r.toDesk}
        </Button>
      </div>
    </div>
  );
}

function Fact({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border-2 border-manila-600/40 bg-manila-50 p-4">
      <dt className="label text-ink-soft">{label}</dt>
      <dd className="mt-1 font-display text-2xl">{value}</dd>
      {note && <dd className="text-sm text-ink-soft">{note}</dd>}
    </div>
  );
}
