"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { HintSheet } from "@/components/hints/HintSheet";
import { Button } from "@/components/ui/Button";
import { CheckIcon, CrossIcon } from "@/components/ui/Icons";
import { Stamp } from "@/components/ui/Stamp";
import { copy } from "@/lib/copy";
import type { Question } from "@/lib/types";

type QuestionCardProps = {
  question: Question;
  /** e.g. "Question 2 of 3". Leave out for practice sets. */
  position?: { index: number; total: number };
  /** Hint 2 sends the student here */
  evidence?: { title: string; href: string } | null;
  /** Called when the student moves on after a right answer. `firstTry` is true if they never missed. */
  onDone: (firstTry: boolean) => void;
  doneLabel: string;
  /** True when the card sits on the dark Interrogation Room, so text outside the paper needs to be light */
  onDark?: boolean;
  /** Test mode: one answer per question, then on to the next. Used by the Verdict. */
  singleTry?: boolean;
  /** Hides the hint button (the Verdict has no hints) */
  noHints?: boolean;
};

const LETTERS = ["A", "B", "C", "D", "E"];

/**
 * One question at a time. Pick an answer, press Submit, get feedback straight away.
 * A wrong answer never blocks anyone: they can try again, use hints, or read the full explanation.
 */
export function QuestionCard({ question, position, evidence, onDone, doneLabel, onDark = false, singleTry = false, noHints = false }: QuestionCardProps) {
  const groupName = useId();
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tried, setTried] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "wrong" | "correct" | "missed">("idle");
  const [hintsShown, setHintsShown] = useState(0);
  const [explained, setExplained] = useState(false);

  const lineup = question.type === "lineup";
  const correct = question.options.find((o) => o.id === question.correctId)!;
  const picked = question.options.find((o) => o.id === selected);

  const submit = () => {
    if (!selected) return;
    if (selected === question.correctId) {
      setStatus("correct");
    } else {
      setTried((t) => [...t, selected]);
      // In test mode a wrong answer ends the question and shows the right one
      setStatus(singleTry ? "missed" : "wrong");
    }
  };

  const tryAgain = () => {
    setSelected(null);
    setStatus("idle");
    // Put keyboard focus back on the first choice that is still available
    setTimeout(() => fieldsetRef.current?.querySelector<HTMLInputElement>("input:not(:disabled)")?.focus(), 0);
  };

  const onPrimary = () => {
    if (status === "idle") submit();
    else if (status === "wrong") tryAgain();
    else if (status === "missed") onDone(false);
    else onDone(tried.length === 0);
  };

  const primaryLabel = status === "idle" ? copy.common.submit : status === "wrong" ? copy.common.tryAgain : doneLabel;
  const locked = status === "correct" || status === "missed";

  return (
    <div>
      {/* text-ink is set here because the Interrogation Room passes light text down from its dark panel */}
      <div className="tex-paper relative z-10 rounded-[3px] p-6 text-ink shadow-folder sm:p-8">
        {position && (
          <p className="label text-ink-soft">
            {copy.question.position(position.index + 1, position.total)}
            {lineup && (
              <span className="ml-2 rounded-[4px] bg-evidence-light px-2 py-0.5 text-evidence-dark">{copy.question.lineupTag}</span>
            )}
          </p>
        )}
        <h2 className="mt-2 text-2xl leading-snug sm:text-3xl">{question.prompt}</h2>

        <fieldset ref={fieldsetRef} className="mt-6" disabled={locked}>
          <legend className="sr-only">{lineup ? copy.question.legendLineup : copy.question.legendChoice}</legend>
          <div className={lineup ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
            {question.options.map((option, i) => {
              const isTried = tried.includes(option.id);
              const isRight = locked && option.id === question.correctId;
              const isSelected = selected === option.id;
              const disabled = isTried || locked;
              return (
                <label
                  key={option.id}
                  className={`relative block rounded-[3px]  transition-colors has-[:focus-visible]:[box-shadow:0_4px_0_-1px_var(--focus),0_6px_16px_0_color-mix(in_srgb,var(--focus)_40%,transparent)] ${
                    lineup ? "min-h-40 p-4 pt-4" : "flex items-start gap-4 p-4"
                  } ${
                    isRight
                      ? " bg-desk-light"
                      : isTried
                        ? " bg-evidence-light/60"
                        : isSelected
                          ? " bg-postit-light"
                          : " bg-manila-50  hover:bg-postit-light/50"
                  } ${disabled && !isRight ? "cursor-default" : "cursor-pointer"}`}
                  style={
                    lineup
                      ? {
                          // Height-chart lines behind each suspect, like a lineup wall
                          backgroundImage:
                            "repeating-linear-gradient(transparent 0 23px, rgb(122 98 56 / 0.18) 23px 24px)",
                        }
                      : undefined
                  }
                >
                  <input
                    type="radio"
                    name={groupName}
                    value={option.id}
                    checked={isSelected}
                    disabled={disabled}
                    onChange={() => setSelected(option.id)}
                    className="sr-only"
                  />
                  {lineup ? (
                    <>
                      <span className="label block text-ink-soft">{copy.question.idea(LETTERS[i])}</span>
                      <span className="mt-2 block text-lg font-medium leading-snug">{option.text}</span>
                      {(isTried || isRight) && (
                        <span className="absolute bottom-3 right-3">
                          {isRight ? (
                            <Stamp tone="desk" size="sm" rotate={-6} slam>
                              {copy.question.stampRight}
                            </Stamp>
                          ) : (
                            <Stamp tone="red" size="sm" rotate={-8} slam>
                              {copy.question.stampWrong}
                            </Stamp>
                          )}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full  font-display text-sm ${
                          isRight
                            ? " bg-desk text-paper"
                            : isTried
                              ? " bg-evidence-dark text-paper"
                              : isSelected
                                ? " bg-espresso text-paper"
                                : " bg-paper"
                        }`}
                      >
                        {isRight ? <CheckIcon width={16} height={16} /> : isTried ? <CrossIcon width={14} height={14} /> : LETTERS[i]}
                      </span>
                      <span className="pt-0.5 text-lg leading-snug">{option.text}</span>
                      {isTried && <span className="sr-only">{copy.question.notThisOne}</span>}
                      {isRight && <span className="sr-only">{copy.question.correctAnswer}</span>}
                    </>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Feedback. aria-live so screen readers hear it straight away. */}
        <div role="status" aria-live="polite">
          {(status === "wrong" || status === "missed") && picked && (
            <motion.div
              initial={{ opacity: 0, transform: "translateY(6px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 flex gap-4 rounded-[3px] bg-evidence-light p-4"
            >
              <CrossIcon width={22} height={22} className="mt-0.5 shrink-0 text-evidence-dark" />
              <div>
                <p className="font-semibold">{copy.question.wrongTitle}</p>
                <p>{picked.why ?? (status === "missed" ? copy.question.missedDefault : copy.question.wrongDefault)}</p>
                {status === "missed" && (
                  <p className="mt-2">
                    <strong>{copy.question.rightAnswer}</strong> {correct.text}. {question.explanation}
                  </p>
                )}
              </div>
            </motion.div>
          )}
          {status === "correct" && (
            <motion.div
              initial={{ opacity: 0, transform: "translateY(6px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 flex gap-4 rounded-[3px] bg-desk-light p-4"
            >
              <CheckIcon width={22} height={22} className="mt-0.5 shrink-0 text-desk-dark" />
              <div>
                <p className="font-semibold">{tried.length === 0 ? copy.question.rightFirst : copy.question.rightLater}</p>
                <p>{question.explanation}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-6">
          <Button size="lg" onClick={onPrimary} disabled={status === "idle" && !selected}>
            {primaryLabel}
          </Button>
        </div>
      </div>

      {/* Hints slide out from under the question sheet */}
      {!locked && !noHints && (
        <HintSheet
          levels={[
            { title: copy.hints.levelNames[0], body: <p>{question.hint}</p> },
            {
              title: copy.hints.levelNames[1],
              body: evidence ? (
                <p>
                  {copy.hints.lookHere(evidence.title)}{" "}
                  <Link href={evidence.href} className="font-semibold underline underline-offset-4">
                    {copy.hints.openEvidence}
                  </Link>
                </p>
              ) : (
                <p>{copy.hints.lookBackGeneric}</p>
              ),
            },
            { title: copy.hints.levelNames[2], body: <p>{question.walkthrough}</p> },
          ]}
          revealed={hintsShown}
          onReveal={(level) => setHintsShown(level)}
          explained={explained}
          onExplain={() => setExplained(true)}
          explanation={
            <>
              <p>
                <strong>{copy.hints.theAnswer}</strong> {correct.text}
              </p>
              <p>{question.explanation}</p>
            </>
          }
          onDark={onDark}
        />
      )}
    </div>
  );
}
