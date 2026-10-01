"use client";

import { motion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import {
  CheckIcon,
  ClockIcon,
  DiagramIcon,
  LockIcon,
  MagnifierIcon,
  NotebookIcon,
  PencilIcon,
  PlayIcon,
  ReadingIcon,
} from "@/components/ui/Icons";
import { copy } from "@/lib/copy";

type HowItWorksProps = {
  /** "wizard" is the step in onboarding. "dialog" is the same walkthrough reopened from the profile menu. */
  variant: "wizard" | "dialog";
  /** Called by the last button: "Start my first case" in the wizard, "Done" in the dialog */
  onFinish: () => void;
  /** Wizard only: skip the walkthrough */
  onSkip?: () => void;
};

const M = copy.explainer.mock;

/* ---------- Small illustrations. Decorative, so the whole panel is hidden from screen readers. ---------- */

function Tile({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-manila-600/60 bg-manila text-ink">
        {children}
      </span>
      <span className="text-xs font-medium text-ink-soft">{label}</span>
    </div>
  );
}

function WelcomeArt() {
  return (
    <div className="relative h-28 w-44">
      <div className="absolute left-0 top-2 h-7 w-20 rounded-t-lg border-2 border-b-0 border-manila-600/60 bg-manila-400" />
      <div className="absolute inset-x-0 bottom-0 top-8 rounded-b-lg rounded-tr-lg border-2 border-manila-600/60 bg-manila" />
      <div className="absolute left-4 top-14 h-2 w-24 rounded bg-manila-600/30" />
      <div className="absolute left-4 top-[4.6rem] h-2 w-16 rounded bg-manila-600/30" />
      <MagnifierIcon width={64} height={64} className="absolute -right-4 bottom-0 text-coffee" strokeWidth={2.5} />
    </div>
  );
}

function CasesArt() {
  const rows = [
    { name: M.clueNames[0], state: M.clueDone, icon: <CheckIcon width={16} height={16} />, tone: "bg-desk text-paper" },
    { name: M.clueNames[1], state: M.clueOpen, icon: <span className="font-display text-sm">2</span>, tone: "bg-postit text-ink" },
    { name: M.clueNames[2], state: M.clueLocked, icon: <LockIcon width={14} height={14} />, tone: "bg-manila-100 text-ink-soft" },
  ];
  return (
    <div className="w-[26rem] max-w-full rounded-xl border-2 border-manila-600/60 bg-manila p-3 shadow-card">
      <p className="font-display text-base">{M.caseName}</p>
      <p className="text-xs text-ink-soft">{M.progress}</p>
      <ul className="mt-2 space-y-1.5">
        {rows.map((r, i) => (
          <li key={r.name} className="flex items-center gap-2 rounded-lg bg-paper px-2 py-1.5">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${r.tone}`}>{r.icon}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">
              Clue {i + 1}: {r.name}
            </span>
            <span className="shrink-0 text-xs text-ink-soft">{r.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EvidenceArt() {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 text-center text-xs font-semibold text-ink-soft">{M.evidenceDrawer}</p>
        <div className="flex gap-3">
          <Tile label={copy.evidenceKinds.reading}>
            <ReadingIcon width={24} height={24} />
          </Tile>
          <Tile label={copy.evidenceKinds.video}>
            <PlayIcon width={24} height={24} />
          </Tile>
          <Tile label={copy.evidenceKinds.diagram}>
            <DiagramIcon width={24} height={24} />
          </Tile>
          <Tile label={copy.evidenceKinds.practice}>
            <PencilIcon width={24} height={24} />
          </Tile>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        {[1, 2, 3].map((n) => (
          <span key={n} className="flex h-9 w-9 items-center justify-center rounded-sm bg-postit font-display shadow-card">
            {n}
          </span>
        ))}
        <span className="text-xs font-semibold text-ink-soft">{M.hintsLabel}</span>
      </div>
    </div>
  );
}

function BoardArt() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-32 w-48">
        <div className="absolute left-0 top-2 h-16 w-20 rotate-[-4deg] rounded border-2 border-manila-600/60 bg-paper shadow-card" />
        <div className="absolute right-0 top-6 h-16 w-20 rotate-[5deg] rounded border-2 border-manila-600/60 bg-paper shadow-card" />
        <svg viewBox="0 0 192 128" className="absolute inset-0" aria-hidden="true">
          <path d="M38 10 Q96 62 150 26" className="fill-none stroke-evidence" strokeWidth={3.5} strokeLinecap="round" />
          <circle cx={38} cy={10} r={6} className="fill-evidence stroke-evidence-dark" strokeWidth={2} />
          <circle cx={150} cy={26} r={6} className="fill-evidence stroke-evidence-dark" strokeWidth={2} />
        </svg>
        <p className="absolute inset-x-0 bottom-0 text-center text-xs font-semibold text-ink-soft">{M.boardLabel}</p>
      </div>
      <Tile label={M.notebookLabel}>
        <NotebookIcon width={26} height={26} />
      </Tile>
    </div>
  );
}

function QuizArt() {
  return (
    <div className="flex items-center gap-5">
      <div className="w-40 rounded-lg border-2 border-manila-600/60 bg-paper p-3 shadow-card">
        <p className="text-xs font-semibold text-ink-soft">{M.quizLabel}</p>
        {[1, 2].map((n) => (
          <div key={n} className="mt-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-desk text-paper">
              <CheckIcon width={12} height={12} />
            </span>
            <span className="h-2 flex-1 rounded bg-manila-600/30" />
          </div>
        ))}
        <p className="mt-3 rounded bg-espresso px-2 py-1 text-center text-xs font-semibold text-paper">{M.verdictLabel}</p>
      </div>
      <Tile label={M.reviewLabel}>
        <ClockIcon width={26} height={26} />
      </Tile>
    </div>
  );
}

const ART = [WelcomeArt, CasesArt, EvidenceArt, BoardArt, QuizArt];

/**
 * "How CaseFile works": five short screens that explain the detective theme before the student meets it.
 * Progress dots, Back and Next, and a way to skip. Keyboard friendly: focus moves to the new heading on each screen.
 */
export function HowItWorks({ variant, onFinish, onSkip }: HowItWorksProps) {
  const screens = copy.explainer.screens;
  const [index, setIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const headingId = useId();
  const last = index === screens.length - 1;
  const screen = screens[index];
  const Art = ART[index];
  const Heading = (variant === "dialog" ? "h3" : "h2") as "h2";

  // Move focus to the new heading so a screen reader announces the change
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      // In onboarding the walkthrough is a whole new step, so announce it. In the dialog, the dialog handles focus.
      if (variant === "wizard") headingRef.current?.focus();
      return;
    }
    headingRef.current?.focus();
  }, [index, variant]);

  return (
    <section aria-labelledby={headingId}>
      <motion.div key={index} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }}>
        <div
          aria-hidden="true"
          className="flex h-48 items-center justify-center overflow-hidden rounded-xl border-2 border-manila-600/40 bg-manila-100 p-3"
        >
          <Art />
        </div>

        <Heading id={headingId} ref={headingRef} tabIndex={-1} className="mt-5 text-2xl leading-snug outline-none sm:text-3xl">
          {screen.heading}
        </Heading>
        <div className="mt-3 space-y-2 text-lg text-ink-soft">
          {screen.body.map((sentence) => (
            <p key={sentence}>{sentence}</p>
          ))}
        </div>

        {last && (
          <div className="mt-5 rounded-xl bg-postit-light/70 p-4">
            <p className="label text-ink">{copy.explainer.glossaryHeading}</p>
            <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {copy.explainer.glossary.map((g) => (
                <div key={g.term}>
                  <dt className="inline font-semibold">{g.term}</dt>{" "}
                  <dd className="inline before:mr-1 before:content-['=']">{g.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </motion.div>

      {/* Progress dots. Not interactive, so they are plain list items with text for screen readers. */}
      <p className="sr-only" aria-live="polite">
        {copy.explainer.screen(index + 1, screens.length)}
      </p>
      <ol aria-label={copy.explainer.dotsLabel} className="mt-6 flex justify-center gap-2.5">
        {screens.map((s, i) => (
          <li
            key={s.id}
            aria-current={i === index ? "step" : undefined}
            className={`h-3 rounded-full transition-all ${i === index ? "w-8 bg-espresso" : i < index ? "w-3 bg-espresso/50" : "w-3 bg-manila-600/40"}`}
          >
            <span className="sr-only">{copy.explainer.screen(i + 1, screens.length)}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {variant === "wizard" && !last && onSkip ? (
          <Button variant="ghost" onClick={onSkip}>
            {copy.explainer.skip}
          </Button>
        ) : (
          <span />
        )}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setIndex(index - 1)} disabled={index === 0}>
            {copy.explainer.back}
          </Button>
          {last ? (
            <Button size="lg" variant={variant === "wizard" ? "highlight" : "primary"} onClick={onFinish}>
              {variant === "wizard" ? copy.explainer.startFirstCase : copy.common.done}
            </Button>
          ) : (
            <Button onClick={() => setIndex(index + 1)}>{copy.explainer.next}</Button>
          )}
        </div>
      </div>
    </section>
  );
}
