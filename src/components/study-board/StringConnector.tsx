"use client";

import { motion } from "motion/react";
import { useMotionOff } from "@/hooks/useMotionOff";
import { stringPath } from "@/lib/board";

type Point = { x: number; y: number };

type StringConnectorProps = {
  from: Point;
  to: Point;
  /** Delay before the string starts to draw itself, in seconds */
  delay?: number;
  selected?: boolean;
  onSelect?: () => void;
  label: string;
};

/** A piece of red string between two pins. It draws itself when it first appears. */
export function StringConnector({ from, to, delay = 0, selected = false, onSelect, label }: StringConnectorProps) {
  const reduceMotion = useMotionOff();
  const { d } = stringPath(from, to);

  return (
    <g>
      {/* soft shadow under the string */}
      <path d={d} transform="translate(0 3)" className="fill-none stroke-ink/15" strokeWidth={4} strokeLinecap="round" />
      {/* Wide invisible path so the thin string is easy to click. Only the middle of the string is clickable
          (the dash pattern skips the ends), so it never covers the pins at either end. */}
      <path
        d={d}
        pathLength={1}
        strokeDasharray="0 0.18 0.64 0.18"
        className="fill-none stroke-transparent"
        strokeWidth={16}
        style={{ pointerEvents: "stroke", cursor: "pointer" }}
        onClick={onSelect}
      >
        <title>{label}</title>
      </path>
      <motion.path
        d={d}
        className={`fill-none ${selected ? "stroke-evidence-dark" : "stroke-evidence"}`}
        strokeWidth={selected ? 5 : 3.5}
        strokeLinecap="round"
        style={{ pointerEvents: "none" }}
        // pathLength 0 to 1 is what makes the string draw itself. Skipped for reduced motion.
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay, ease: [0.23, 1, 0.32, 1] }}
      />
    </g>
  );
}
