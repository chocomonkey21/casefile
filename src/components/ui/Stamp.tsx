"use client";

import { motion } from "motion/react";

type Tone = "red" | "coffee" | "desk" | "cold" | "gold";
type Size = "sm" | "md" | "lg" | "xl";

const TONES: Record<Tone, string> = {
  red: "border-evidence-dark text-evidence-dark",
  coffee: "border-coffee text-coffee",
  desk: "border-desk text-desk-dark",
  // For dark backgrounds, where the red stamp would be too dark to read
  gold: "border-postit text-postit",
  // Cold uses a dashed border so it is not colour alone that says "faded"
  cold: "border-dashed border-coffee text-coffee",
};

const SIZES: Record<Size, string> = {
  sm: "border-2 px-2 py-0.5 text-xs tracking-[0.16em]",
  md: "border-[3px] px-3 py-1 text-base tracking-[0.18em]",
  lg: "border-4 px-5 py-2 text-3xl tracking-[0.2em]",
  xl: "border-[6px] px-5 py-2 text-4xl tracking-[0.18em] sm:px-8 sm:py-3 sm:text-6xl",
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

/** An ink stamp. Used for case status, solved clues and Case Closed. */
export function Stamp({ children, tone = "red", size = "md", rotate = -6, slam = false, className = "" }: StampProps) {
  return (
    <motion.span
      className={`inline-block max-w-full select-none rounded-md text-center font-display uppercase leading-[1.05] ${TONES[tone]} ${SIZES[size]} ${className}`}
      style={{ rotate }}
      initial={slam ? { scale: 2.6, opacity: 0 } : false}
      // Comes in big, hits the paper and squashes slightly, then settles. Under reduced motion only the fade remains.
      animate={slam ? { scale: [2.6, 0.93, 1], opacity: [0, 0.96, 0.92] } : { scale: 1, opacity: 0.92 }}
      transition={slam ? { duration: 0.34, times: [0, 0.62, 1], ease: ["easeIn", "easeOut"] } : { duration: 0 }}
    >
      {children}
    </motion.span>
  );
}
