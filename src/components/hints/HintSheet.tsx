"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";

export type HintLevel = { title: string; body: ReactNode };

type HintSheetProps = {
  /** Exactly three levels: nudge, points to the evidence, walks through the thinking */
  levels: [HintLevel, HintLevel, HintLevel];
  /** How many hints are showing (0 to 3) */
  revealed: number;
  onReveal: (level: 1 | 2 | 3) => void;
  /** The full explanation, offered after hint 3 */
  explanation?: ReactNode;
  explained: boolean;
  onExplain: () => void;
  /** Small supporting line. Defaults to the standard "hints are here to help" text. */
  footnote?: string;
  /** Set when the sheet sits on a dark background, so the footnote stays readable */
  onDark?: boolean;
};

const NOTE_TILT = [-1.2, 0.8, -0.6];

/**
 * Tiered help. Each hint is a sticky note that slides out from under the sheet above it,
 * so put this directly below a `relative z-10` element.
 */
export function HintSheet({ levels, revealed, onReveal, explanation, explained, onExplain, footnote, onDark = false }: HintSheetProps) {
  const nextLevel = (revealed + 1) as 1 | 2 | 3;
  const newest = useRef<HTMLLIElement>(null);

  // Make sure a new hint is in view, which matters on a phone where the sheet can sit below the fold
  useEffect(() => {
    if (revealed === 0) return;
    const id = setTimeout(() => newest.current?.scrollIntoView({ block: "nearest" }), 150);
    return () => clearTimeout(id);
  }, [revealed]);

  return (
    <div className="relative z-0 -mt-3 px-3 pt-3" aria-live="polite">
      <ol className="space-y-2">
        <AnimatePresence initial={false}>
          {levels.slice(0, revealed).map((level, i) => (
            <motion.li
              key={level.title}
              ref={i === revealed - 1 ? newest : undefined}
              initial={{ y: -36, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: NOTE_TILT[i] }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="rounded-sm bg-postit p-4 shadow-card"
              style={{ transformOrigin: "top center" }}
            >
              <p className="label text-ink">
                <span className="normal-case tracking-normal">{copy.hints.noteLabel(i + 1, level.title)}</span>
              </p>
              <div className="mt-1 text-base text-ink">{level.body}</div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      {explained && explanation && (
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-3 rounded-md border-2 border-coffee bg-paper p-4 text-ink"
        >
          <p className="label text-coffee">{copy.hints.fullExplanation}</p>
          <div className="mt-1 space-y-2">{explanation}</div>
        </motion.div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {revealed < 3 ? (
          <Button variant="highlight" onClick={() => onReveal(nextLevel)}>
            {revealed === 0 ? copy.hints.get : copy.hints.getNumbered(nextLevel)}
          </Button>
        ) : !explained && explanation ? (
          <Button variant="secondary" onClick={onExplain}>
            {copy.hints.showExplanation}
          </Button>
        ) : null}
        <p className={`text-sm ${onDark ? "text-beige" : "text-ink-soft"}`}>{footnote ?? copy.hints.footnote}</p>
      </div>
    </div>
  );
}
