"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Diagram } from "@/components/lesson/Diagrams";
import { PaperClip, Pushpin } from "@/components/ui/DeskObjects";
import { Stamp } from "@/components/ui/Stamp";
import { copy } from "@/lib/copy";

/** Each object is set down on the desk a moment after the one before. Reduced motion only fades. */
function Drop({ delay, className, children }: { delay: number; className: string; children: ReactNode }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A case in progress, laid out on the desk: the manila folder, a pinned print of the water cycle,
 * a sticky note with the next lesson, and red thread between them. Built from the same paper,
 * ink and brass as the app itself, so the first thing a visitor sees is the real material.
 *
 * Layout rule: the folder sits on the left, the print on the upper right, the sticky note on the lower right.
 * Each has its own area, so nothing covers another object's text. Pins and clips sit on edges, never on words.
 */
export function DeskIllustration() {
  return (
    <div role="img" aria-label={copy.landing.illustrationLabel} className="relative mx-auto aspect-[6/5] w-full max-w-xl">
      {/* The folder */}
      <Drop delay={0.05} className="left-0 top-[14%] w-[53%]">
        <div className="-rotate-[3deg]">
          <div className="tex-manila ml-[10%] inline-block rounded-t-[5px] bg-manila-400 px-4 pb-1 pt-2 font-display text-xs tracking-[0.2em]">
            NO. 017
          </div>
          <div className="tex-manila tex-worn tex-crease p-5 pb-7 shadow-folder sm:p-6 sm:pb-8" style={{ ["--crease-at" as string]: "84%" }}>
            <p className="label text-ink-soft">Science</p>
            <p className="mt-2 font-display text-xl leading-snug sm:text-2xl">The Case of the Vanishing Puddle</p>
            <div className="mt-5">
              <Stamp tone="red" size="md" rotate={-8}>
                In progress
              </Stamp>
            </div>
          </div>
        </div>
      </Drop>

      {/* A print of the water cycle, pinned at the top edge */}
      <Drop delay={0.2} className="right-0 top-[1%] w-[44%]">
        <div className="tex-paper rotate-[4deg] p-2 pb-8 shadow-card">
          <Diagram id="cycle-map" alt="" />
          <p className="absolute bottom-2 left-3 font-display text-xs text-ink-soft">Fig. 5: the water cycle</p>
          <Pushpin className="absolute -top-3 left-1/2 -translate-x-1/2" />
        </div>
      </Drop>

      {/* Sticky note with the next lesson. The clip holds the top edge, above the text. */}
      <Drop delay={0.35} className="bottom-[2%] right-[3%] w-[41%]">
        <div className="tex-postit -rotate-[4deg] px-4 pb-4 pt-7 shadow-card">
          <p className="font-display text-base leading-snug">Clue 3 of 5</p>
          <p className="mt-1 text-sm leading-snug text-ink-soft">How water falls from the sky</p>
          <PaperClip className="absolute -top-5 left-4 h-9 w-3.5 rotate-[-6deg]" />
        </div>
      </Drop>

      {/* Red thread from the print's pin down the gap beside it to the sticky note */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 600 500"
        className="pointer-events-none absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <path d="M468 14 C 330 40, 316 300, 410 372" fill="none" stroke="var(--color-evidence)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M468 14 C 332 42, 318 302, 410 372" fill="none" stroke="var(--color-evidence-dark)" strokeWidth="0.8" opacity="0.7" />
        <circle cx="410" cy="372" r="6" fill="var(--color-evidence)" />
      </motion.svg>
    </div>
  );
}

/**
 * Phone version: a short strip with the folder and the sticky note side by side, shown above the headline.
 * It is about 150px tall, so the headline and the sign-up button stay on the first screen.
 */
export function DeskIllustrationCompact() {
  return (
    <motion.div
      role="img"
      aria-label={copy.landing.illustrationLabel}
      className="flex items-end gap-3"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 20 }}
    >
      <div className="-rotate-[2deg] flex-[1.5]">
        <div className="tex-manila ml-[8%] inline-block rounded-t-[4px] bg-manila-400 px-3 pb-0.5 pt-1.5 font-display text-xs tracking-[0.2em]">
          NO. 017
        </div>
        <div className="tex-manila tex-worn p-3 shadow-folder">
          <p className="label text-ink-soft">Science</p>
          <p className="mt-1 font-display text-base leading-snug">The Case of the Vanishing Puddle</p>
        </div>
      </div>
      <div className="tex-postit relative mb-2 flex-1 rotate-[3deg] px-3 pb-3 pt-6 shadow-card">
        <p className="font-display text-sm leading-snug">Clue 3 of 5</p>
        <p className="mt-0.5 text-sm leading-snug text-ink-soft">How water falls from the sky</p>
        <PaperClip className="absolute -top-5 left-3 h-9 w-3.5 rotate-[-6deg]" />
      </div>
    </motion.div>
  );
}
