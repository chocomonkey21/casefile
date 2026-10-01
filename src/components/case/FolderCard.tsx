"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useMotionOff } from "@/hooks/useMotionOff";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SUBJECTS } from "@/data/subjects";
import { copy } from "@/lib/copy";
import { caseMinutes } from "@/lib/progress";
import type { CaseDef, CaseStatus } from "@/lib/types";
import { StatusStamp } from "./StatusStamp";

type FolderCardProps = {
  caseDef: CaseDef;
  status: CaseStatus;
  solved: number;
};

/** How long the cover takes to swing open before we move to the case page */
const FLIP_MS = 420;


/**
 * A manila case folder. The whole card is one link (the title link is stretched over it).
 * Clicking swings the cover open like a real folder, then navigates. Reduced motion skips straight to the page.
 */
export function FolderCard({ caseDef, status, solved }: FolderCardProps) {
  const router = useRouter();
  const reduceMotion = useMotionOff();
  const [opening, setOpening] = useState(false);
  const href = `/cases/${caseDef.id}`;
  const total = caseDef.clues.length;
  const subject = SUBJECTS[caseDef.subject];

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let "open in new tab" and friends behave normally
    if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (opening) return;
    setOpening(true);
    // A timer (not the animation callback) drives navigation, so it still happens if the tab is in the background
    timer.current = setTimeout(() => {
      router.push(href);
      // If the student comes back with the back button, the folder should be closed again
      setTimeout(() => setOpening(false), 800);
    }, FLIP_MS);
  };

  return (
    <div
      className="relative flex h-full flex-col pt-8 transition-transform duration-200 hover:-translate-y-1"
      style={{ perspective: 1100 }}
    >
      {/* Index tab with the case number */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-10 items-center rounded-t-lg border-2 border-b-0 border-manila-600/50 bg-manila-400 px-4 font-display text-sm tracking-[0.2em] text-ink"
      >
        {copy.folder.caseNo(caseDef.number)}
      </div>

      <div className="relative flex-1">
        {/* The inside of the folder, which you see when the cover swings open */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-b-xl rounded-tr-xl border-2 border-manila-600/40 bg-paper"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent 0 27px, rgb(143 119 57 / 0.25) 27px 28px)",
            backgroundPositionY: "12px",
          }}
        />

        <motion.div
          className={`relative flex h-full flex-col gap-3 rounded-b-xl rounded-tr-xl border-2 border-manila-600/50 bg-manila p-5 shadow-folder ${
            status === "cold" ? "dusty" : ""
          }`}
          style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
          animate={opening ? { rotateY: -112 } : { rotateY: 0 }}
          transition={{ duration: FLIP_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="label flex items-center gap-2 text-ink-soft">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${subject.dot}`} />
              {subject.label}
              {caseDef.stub && <span className="sr-only">{copy.status.preview}</span>}
            </span>
            <StatusStamp status={status} />
          </div>

          <h3 className="text-xl leading-snug">
            <Link
              href={href}
              onClick={onClick}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {caseDef.title}
            </Link>
          </h3>

          <p className="line-clamp-2 text-sm text-ink-soft">{caseDef.tagline}</p>

          <div className="mt-auto space-y-2 pt-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">
                {copy.folder.lessonsDone(solved, total)}
              </span>
              <span className="text-ink-soft">{copy.common.aboutMin(caseMinutes(caseDef))}</span>
            </div>
            <ProgressBar value={solved} max={total} label={copy.folder.progressLabel(caseDef.title)} />
            <p className="flex items-center gap-1.5 pt-1 text-sm font-semibold text-navy">
              {copy.folder.cta[status]}
              <ArrowRightIcon width={16} height={16} />
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
