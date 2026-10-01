"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EvidenceCard } from "@/components/case/EvidenceCard";
import { HintSheet } from "@/components/hints/HintSheet";
import { NoteCards } from "@/components/notes/NoteCards";
import { NoteForm } from "@/components/notes/NoteForm";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ClockIcon, LockIcon } from "@/components/ui/Icons";
import { Stamp } from "@/components/ui/Stamp";
import { copy } from "@/lib/copy";
import { clueState, nextClue } from "@/lib/progress";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import type { CaseDef, ClueContent, EvidenceDef } from "@/lib/types";
import { DiagramFigure } from "./DiagramFigure";
import { EvidenceSection } from "./EvidenceSection";
import { Explainer } from "./Explainer";
import { PracticeSet } from "./PracticeSet";
import { ReadingBlocks } from "./ReadingBlocks";

type ClueViewProps = {
  caseDef: CaseDef;
  clueIndex: number;
  /** Missing for preview (stub) cases */
  lesson?: ClueContent;
};

const t = copy.lesson;

/** The lesson page: question, hints, evidence to study and collect, notes, then the check at the end. */
export function ClueView({ caseDef, clueIndex, lesson }: ClueViewProps) {
  const state = useCaseFile();
  const hydrated = useHydrated();
  const clue = caseDef.clues[clueIndex];
  const status = clueState(caseDef, state, clueIndex);
  const locked = status === "locked";
  const [hintsShown, setHintsShown] = useState(0);
  const [explained, setExplained] = useState(false);

  // Opening a clue counts as working on the case. Only once saved progress is known.
  useEffect(() => {
    if (hydrated && !locked && lesson) actions.touchCase(caseDef.id);
  }, [hydrated, locked, lesson, caseDef.id]);

  // Jump to evidence from a hint or the case file. The content only exists after hydration, so scroll now.
  useEffect(() => {
    if (!hydrated || locked || !window.location.hash) return;
    // "instant" because this is a jump on page load, not a scroll the student asked for
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, [hydrated, locked]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6" aria-busy="true" aria-label={t.loading}>
        <div className="h-10 w-1/2 animate-pulse rounded-[2px] bg-manila/70" />
        <div className="h-32 animate-pulse rounded-[2px] bg-postit/60" />
        <div className="h-64 animate-pulse rounded-[3px] bg-manila/50" />
      </div>
    );
  }

  const backLink = (
    <Link
      href={`/cases/${caseDef.id}?tab=clues`}
      className="mb-4 inline-flex min-h-11 items-center gap-2 font-semibold text-coffee underline-offset-4 hover:underline"
    >
      <ArrowLeftIcon width={18} height={18} />
      {t.backToCase}
    </Link>
  );

  if (locked) {
    const open = nextClue(caseDef, state);
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {backLink}
        <div className="rounded-[3px] bg-manila-100 p-6 sm:p-8">
          <LockIcon width={32} height={32} className="text-ink-soft" />
          <h1 className="mt-4 text-3xl">{t.lockedTitle}</h1>
          <p className="mt-2 text-lg text-ink-soft">{t.lockedText(clueIndex)}</p>
          {open && (
            <div className="mt-6">
              <Button href={`/cases/${caseDef.id}/clues/${open.clue.id}`}>{t.goToClue(open.index + 1)}</Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const evidenceLookup = (evidenceId?: string) => {
    const item = clue.evidence.find((e) => e.id === evidenceId);
    return item ? { title: item.title, href: `#${item.id}` } : null;
  };

  const clueNotes = state.notes.filter((n) => n.caseId === caseDef.id && n.clueId === clue.id);
  const solved = status === "solved";
  const names = copy.hints.levelNames;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      {backLink}

      <header>
        <p className="label text-ink-soft">{t.position(caseDef.title, clueIndex + 1, caseDef.clues.length)}</p>
        <div className="mt-1 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl leading-tight sm:text-4xl">{clue.title}</h1>
          {solved && (
            <Stamp tone="desk" size="md" rotate={-6}>
              {t.completed}
            </Stamp>
          )}
        </div>
        <p className="mt-2 text-lg text-ink-soft">{clue.teaser}</p>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="flex items-center gap-2">
            <ClockIcon width={16} height={16} />
            {copy.common.aboutMin(clue.minutes)}
          </span>
          <span>{copy.common.studyItems(clue.evidence.length)}</span>
        </p>
      </header>

      {!lesson ? (
        <PreviewNotice caseDef={caseDef} evidence={clue.evidence} />
      ) : (
        <>
          {/* The question for this clue, with the hint button. Hints slide out from under this note. */}
          <section aria-labelledby="question-heading" className="mt-6" id="hint-area">
            <div className="tex-postit relative z-10 rounded-[2px] p-6 shadow-card">
              <h2 id="question-heading" className="label text-ink">
                {t.questionLabel}
              </h2>
              <p className="mt-1 font-display text-2xl leading-snug sm:text-3xl">{lesson.question}</p>
            </div>
            <HintSheet
              levels={[
                { title: names[0], body: <p>{lesson.hints.nudge}</p> },
                {
                  title: names[1],
                  body: (
                    <p>
                      {lesson.hints.evidenceNote}{" "}
                      <a href={`#${lesson.hints.evidenceId}`} className="font-semibold underline underline-offset-4">
                        {copy.hints.jumpToIt}
                      </a>
                    </p>
                  ),
                },
                { title: names[2], body: <p>{lesson.hints.walkthrough}</p> },
              ]}
              revealed={hintsShown}
              onReveal={(level) => setHintsShown(level)}
              explained={explained}
              onExplain={() => setExplained(true)}
              explanation={lesson.explanation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            />
          </section>

          <section aria-labelledby="evidence-heading" className="mt-10">
            <h2 id="evidence-heading" className="text-2xl sm:text-3xl">
              {t.study}
            </h2>
            <nav aria-label={t.jumpTo} className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {clue.evidence.map((e) => (
                  <li key={e.id}>
                    <a
                      href={`#${e.id}`}
                      className="inline-flex min-h-11 items-center rounded-[4px] bg-manila px-4 text-sm font-semibold hover:bg-manila-400"
                    >
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 space-y-6">
              {clue.evidence.map((e, i) => (
                <EvidenceSection
                  key={e.id}
                  caseId={caseDef.id}
                  clueId={clue.id}
                  evidence={e}
                  number={i + 1}
                  total={clue.evidence.length}
                >
                  <EvidenceBody evidence={e} lesson={lesson} evidenceFor={evidenceLookup} />
                </EvidenceSection>
              ))}
            </div>
          </section>

          <section aria-labelledby="notes-heading" className="mt-10">
            <h2 id="notes-heading" className="text-2xl sm:text-3xl">
              {t.notesHeading}
            </h2>
            <p className="mt-1 text-ink-soft">{t.notesIntro}</p>
            <div className="mt-4">
              <NoteForm caseDef={caseDef} fixedClueId={clue.id} />
            </div>
            {clueNotes.length > 0 && (
              <div className="mt-6">
                <NoteCards notes={clueNotes} caseDef={caseDef} />
              </div>
            )}
          </section>

          <section
            aria-labelledby="check-heading"
            className="mt-10 rounded-[3px] bg-espresso p-6 text-paper shadow-folder sm:p-8"
          >
            <p className="label text-postit">{t.checkLabel}</p>
            <h2 id="check-heading" className="mt-1 text-2xl sm:text-3xl">
              {solved ? t.checkHeadingDone : t.checkHeading}
            </h2>
            <p className="mt-2 max-w-prose text-beige">{t.checkText(lesson.quiz.length)}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href={`/cases/${caseDef.id}/interrogation/${clue.id}`} variant="highlight" size="lg">
                {solved ? t.reviewQuestions : t.startQuestions}
              </Button>
              <a href="#hint-area" className="inline-flex min-h-11 items-center font-semibold text-paper underline underline-offset-4">
                {t.needHelp}
              </a>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

/** Picks the right display for each kind of evidence */
function EvidenceBody({
  evidence,
  lesson,
  evidenceFor,
}: {
  evidence: EvidenceDef;
  lesson: ClueContent;
  evidenceFor: (id?: string) => { title: string; href: string } | null;
}) {
  const content = lesson.evidence[evidence.id];
  if (!content) return <p className="text-ink-soft">{t.evidenceSoon}</p>;

  switch (content.kind) {
    case "reading":
      return <ReadingBlocks blocks={content.blocks} />;
    case "diagram":
      return <DiagramFigure {...content} />;
    case "video":
      return <Explainer scene={content.explainer} steps={content.steps} />;
    case "practice":
      return <PracticeSet intro={content.intro} questions={content.questions} order={content.order} evidenceFor={evidenceFor} />;
  }
}

/** Stub cases have no lessons yet. Show what is coming, without pretending. */
function PreviewNotice({ caseDef, evidence }: { caseDef: CaseDef; evidence: EvidenceDef[] }) {
  return (
    <section className="mt-6" aria-labelledby="preview-heading">
      <div className="rounded-[3px] bg-paper-dark p-6">
        <h2 id="preview-heading" className="text-2xl">
          {t.previewTitle}
        </h2>
        <p className="mt-1 max-w-prose text-ink-soft">{t.previewText}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button href="/cases/puddle">{t.previewOpenPuddle}</Button>
          <Button href={`/cases/${caseDef.id}?tab=clues`} variant="secondary">
            {t.backToCase}
          </Button>
        </div>
      </div>
      <ul className="mt-6 space-y-2">
        {evidence.map((e) => (
          <li key={e.id}>
            <EvidenceCard evidence={e} locked lockedNote={t.comingSoon} />
          </li>
        ))}
      </ul>
    </section>
  );
}
