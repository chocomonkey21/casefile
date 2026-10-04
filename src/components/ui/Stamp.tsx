"use client";

import { motion } from "motion/react";

type Tone = "red" | "coffee" | "desk" | "cold" | "gold";
type Size = "sm" | "md" | "lg" | "xl";

const TONES: Record<Tone, string> = {
  red: "border-evidence-dark text-evidence-dark",
  coffee: "border-coffee text-coffee",
  desk: "border-desk-dark text-desk-dark",
  // For dark backgrounds, where the red stamp would be too dark to read
  gold: "border-postit text-postit",
  // Cold uses a dashed border so it is not colour alone that says "faded"
  cold: "border-dashed border-coffee text-coffee",
};

// The stamp frame is part of the rubber, so it gets the same rough ink as the letters
const SIZES: Record<Size, string> = {
  sm: "stamp-sm border-2 px-2 py-0.5 text-xs tracking-[0.16em]",
  md: "stamp border-[3px] px-3 py-1 text-base tracking-[0.18em]",
  lg: "stamp border-4 px-5 py-2 text-3xl tracking-[0.2em]",
  xl: "stamp border-[6px] px-5 py-2 text-4xl tracking-[0.18em] sm:px-8 sm:py-3 sm:text-6xl",
};

type StampProps = {
  children: string;
  tone?: Tone;
  size?: Size;
  /** Degrees. A slight tilt makes it look hand stamped. */
  rotate?: number;
  /** Slams down on mount. Motion skips the movement when the student prefers reduced motion. */
  slam?: boolean;
  className?: string;
};

/**
 * A rubber stamp pressed into the paper. Used for case status, solved clues and Case Closed.
 * The ink is multiplied into the paper underneath (so the grain shows through) and roughened by
 * the ink-stamp filter: patchy density, ragged edges, a few gaps.
 */
export function Stamp({ children, tone = "red", size = "md", rotate = -6, slam = false, className = "" }: StampProps) {
  // Multiply lets the paper show through the ink. Light ink on the dark desk would vanish, so it stays normal.
  const blend = tone === "gold" ? "" : "mix-blend-multiply";
  // Small stamps carry 12px text, so they print at full strength (see INK_DENSITY in theme.ts)
  const ink = size === "sm" ? 1 : 0.95;
  return (
    <motion.span
      className={`inline-block max-w-full select-none rounded-[3px] text-center font-display uppercase leading-[1.05] ${blend} ${TONES[tone]} ${SIZES[size]} ${className}`}
      style={{ rotate }}
      initial={slam ? { scale: 1.25, opacity: 0 } : false}
      // Comes in a little big, hits the paper and squashes slightly, then settles. Under reduced motion only the fade remains.
      animate={slam ? { scale: [1.25, 0.97, 1], opacity: [0, 1, ink] } : { scale: 1, opacity: ink }}
      transition={
        slam
          ? { duration: 0.26, times: [0, 0.55, 1], ease: [[0.23, 1, 0.32, 1], [0.23, 1, 0.32, 1]] }
          : { duration: 0 }
      }
    >
      {children}
    </motion.span>
  );
}
