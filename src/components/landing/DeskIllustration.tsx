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
 */
export function DeskIllustration() {
  return (
    <div role="img" aria-label={copy.landing.illustrationLabel} className="relative mx-auto aspect-[6/5] w-full max-w-xl">
      {/* The folder */}
      <Drop delay={0.05} className="left-[2%] top-[14%] w-[66%]">
        <div className="-rotate-[4deg]">
          <div className="tex-manila ml-[12%] inline-block rounded-t-[5px] bg-manila-400 px-4 pb-1 pt-2 font-display text-xs tracking-[0.2em]">
            NO. 017
          </div>
          <div className="tex-manila tex-worn tex-crease aspect-[5/4] p-6 shadow-folder" style={{ ["--crease-at" as string]: "82%" }}>
            <p className="label text-[0.7rem] text-ink-soft">Science</p>
            <p className="mt-2 font-display text-xl leading-snug sm:text-2xl">The Case of the Vanishing Puddle</p>
            <div className="mt-6">
              <Stamp tone="red" size="md" rotate={-8}>
                In progress
              </Stamp>
            </div>
          </div>
        </div>
      </Drop>

      {/* A print of the water cycle, pinned on top */}
      <Drop delay={0.2} className="right-[0%] top-[2%] w-[52%]">
        <div className="tex-paper rotate-[5deg] p-2 pb-8 shadow-card">
          <Diagram id="cycle-map" alt="" />
          <p className="absolute bottom-2 left-3 font-display text-xs text-ink-soft">Fig. 5: the water cycle</p>
          <Pushpin className="absolute -top-3 left-1/2 -translate-x-1/2" />
        </div>
      </Drop>

      {/* Sticky note with the next lesson */}
      <Drop delay={0.35} className="bottom-[4%] right-[6%] w-[38%]">
        <div className="tex-postit -rotate-[6deg] p-4 shadow-card">
          <p className="font-display text-base leading-snug">Clue 3 of 5</p>
          <p className="mt-1 text-sm leading-snug text-ink-soft">How water falls from the sky</p>
          <PaperClip className="absolute -top-5 right-5 rotate-[8deg]" />
        </div>
      </Drop>

      {/* Red thread from the print's pin to the sticky note */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 600 500"
        className="pointer-events-none absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <path d="M455 18 C 420 160, 520 250, 470 382" fill="none" stroke="var(--color-evidence)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M455 18 C 422 160, 518 252, 470 382" fill="none" stroke="var(--color-evidence-dark)" strokeWidth="0.8" opacity="0.7" />
        <circle cx="470" cy="382" r="6" fill="var(--color-evidence)" />
      </motion.svg>
    </div>
  );
}
