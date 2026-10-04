"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { PaperClip, Pushpin } from "@/components/ui/DeskObjects";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SUBJECTS } from "@/data/subjects";
import { useMotionOff } from "@/hooks/useMotionOff";
import { copy } from "@/lib/copy";
import { caseMinutes, nextClue } from "@/lib/progress";
import { between, seeded } from "@/lib/seeded";
import { useCaseFile } from "@/lib/store";
import type { CaseDef, CaseStatus } from "@/lib/types";
import { StatusStamp } from "./StatusStamp";

type FolderCardProps = {
  caseDef: CaseDef;
  status: CaseStatus;
  solved: number;
};

/** Most the folder tilts towards the cursor, in degrees */
const MAX_TILT = 6;
/** How long the cover swings open before we move to the case page */
const OPEN_MS = 320;
const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/** The fixed look of one folder, seeded by its case id so the grid never looks cloned */
function useFolderLook(id: string) {
  return useMemo(() => {
    const r = seeded(id);
    const restTilt = between(r, -1.2, 1.2);
    const tabLeft = between(r, 6, 46); // % from the left
    const hardware = r() < 0.38 ? "clip" : r() < 0.6 ? "pin" : "none";
    const clipLeft = between(r, 58, 82);
    const clipTilt = between(r, -14, 10);
    const papers = [0, 1, 2].map((i) => ({
      rotate: between(r, -4, 4),
      x: between(r, -10, 10),
      // how far each paper pokes out above the folder at rest
      peek: between(r, 3, 10) + i * 2,
      // where it fans out to when the folder opens
      fanRotate: (i - 1) * between(r, 3, 6),
      fanX: (i - 1) * between(r, 14, 26),
      fanY: -between(r, 74, 96) + i * 12,
      stiffness: 260 - i * 50,
    }));
    return { restTilt, tabLeft, hardware, clipLeft, clipTilt, papers };
  }, [id]);
}

/**
 * Three soft brown shadows for the folder: a tight contact shadow, a mid shadow and a wide one.
 * As the folder lifts they grow and soften, and they slide opposite to the tilt.
 */
function useFolderShadow(lift: MotionValue<number>, rx: MotionValue<number>, ry: MotionValue<number>) {
  return useTransform(() => {
    const l = lift.get();
    const sx = -ry.get() * 1.4;
    const sy = rx.get() * 1.2;
    return [
      `${sx * 0.2}px ${1 + l}px ${2 + l * 2}px rgb(36 25 19 / ${0.38 - l * 0.12})`,
      `${sx * 0.6}px ${4 + l * 8 + sy * 0.4}px ${8 + l * 14}px -2px rgb(36 25 19 / ${0.28 + l * 0.04})`,
      `${sx}px ${12 + l * 26 + sy}px ${26 + l * 34}px -8px rgb(36 25 19 / ${0.32 + l * 0.08})`,
    ].join(", ");
  });
}

/**
 * A manila case folder you can almost pick up.
 *
 * Back to front: two loose papers and a sticky note poking out of the top, the folder's back with
 * its index tab, then the front cover with the case on it. Brass hardware on some folders.
 * On hover or keyboard focus it lifts and tilts toward the cursor, the cover swings open a little,
 * and the papers slide up and fan out to show the brief, the next lesson and a progress note.
 * On touch, the first tap opens the peek and the second tap goes into the case.
 * With reduced motion it only fades the papers in and lifts slightly.
 */
export function FolderCard({ caseDef, status, solved }: FolderCardProps) {
  const router = useRouter();
  const state = useCaseFile();
  const motionOff = useMotionOff();
  const look = useFolderLook(caseDef.id);
  const subject = SUBJECTS[caseDef.subject];
  const href = `/cases/${caseDef.id}`;
  const total = caseDef.clues.length;
  const next = nextClue(caseDef, state);

  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touchOpen, setTouchOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const active = hover || focused || touchOpen || opening;

  const rootRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef<string>("mouse");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Cursor position over the card, from -0.5 to 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, (v) => -v * MAX_TILT * 2), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, (v) => v * MAX_TILT * 2), TILT_SPRING);
  const lift = useSpring(0, { stiffness: 260, damping: 26 });
  useEffect(() => lift.set(active ? 1 : 0), [active, lift]);
  const boxShadow = useFolderShadow(lift, rotateX, rotateY);

  // A tap outside closes a peek that a tap opened
  useEffect(() => {
    if (!touchOpen) return;
    const close = (e: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setTouchOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [touchOpen]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (motionOff || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - box.left) / box.width - 0.5);
    py.set((e.clientY - box.top) / box.height - 0.5);
  };
  const resetTilt = () => {
    px.set(0);
    py.set(0);
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let "open in new tab" and friends behave normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    // First tap on a touch screen opens the peek, the second one goes in
    if (pointerType.current !== "mouse" && pointerType.current !== "keyboard" && !touchOpen) {
      e.preventDefault();
      setTouchOpen(true);
      return;
    }
    if (motionOff) return;
    e.preventDefault();
    if (opening) return;
    setOpening(true);
    // A timer drives navigation, so it still happens if the animation is skipped
    timer.current = setTimeout(() => {
      router.push(href);
      setTimeout(() => setOpening(false), 800);
    }, OPEN_MS);
  };

  const paperSpring = (i: number) =>
    motionOff
      ? { duration: 0.18 }
      : { type: "spring" as const, stiffness: look.papers[i].stiffness, damping: 20, delay: active ? 0.05 + i * 0.05 : 0 };

  return (
    <div
      ref={rootRef}
      className={`group relative pt-14 ${active ? "z-20" : "z-0"}`}
      style={{ perspective: 1200 }}
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        resetTilt();
      }}
      onPointerMove={onPointerMove}
      onKeyDown={() => {
        pointerType.current = "keyboard";
      }}
      onFocus={(e) => e.currentTarget.contains(document.activeElement) && setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setFocused(false)}
    >
      <motion.div
        className="relative"
        style={{ rotateX: motionOff ? 0 : rotateX, rotateY: motionOff ? 0 : rotateY, rotate: look.restTilt, transformStyle: "preserve-3d" }}
        animate={{ y: active ? (motionOff ? -3 : -8) : 0 }}
        transition={motionOff ? { duration: 0.15 } : { type: "spring", stiffness: 300, damping: 24 }}
      >
        {/* ── Back panel, the inside of the folder, with its index tab ── */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-0 rounded-[3px] bg-manila-400 tex-manila">
          <div
            className="tex-manila absolute -top-9 flex h-10 items-start rounded-t-[5px] bg-manila-400 px-4 pt-2 font-display text-sm tracking-[0.2em] text-ink"
            style={{ left: `${look.tabLeft}%` }}
          >
            {copy.folder.caseNo(caseDef.number)}
          </div>
        </div>

        {/* ── Loose papers behind the cover ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[7%] top-0 h-[78%]">
          {/* Brief: a typed sheet */}
          <motion.div
            className="tex-paper absolute inset-0 rounded-[2px] bg-paper-dark px-4 pt-4 shadow-[0_1px_2px_rgb(36_25_19/0.25)]"
            initial={false}
            animate={{
              x: look.papers[0].x + (active && !motionOff ? look.papers[0].fanX : 0),
              y: -look.papers[0].peek + (active && !motionOff ? look.papers[0].fanY : 0),
              rotate: look.papers[0].rotate + (active && !motionOff ? look.papers[0].fanRotate : 0),
            }}
            transition={paperSpring(0)}
          >
            <p className="label text-evidence-dark">{copy.folder.peekBrief}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-snug text-ink-soft">{caseDef.goal}</p>
          </motion.div>

          {/* Next lesson: a second sheet */}
          <motion.div
            className="tex-paper absolute inset-0 rounded-[2px] px-4 pt-4 shadow-[0_1px_2px_rgb(36_25_19/0.25)]"
            initial={false}
            animate={{
              x: look.papers[1].x + (active && !motionOff ? look.papers[1].fanX : 0),
              y: -look.papers[1].peek + (active && !motionOff ? look.papers[1].fanY : 0),
              rotate: look.papers[1].rotate + (active && !motionOff ? look.papers[1].fanRotate : 0),
            }}
            transition={paperSpring(1)}
          >
            <p className="label text-ink-soft">{status === "closed" ? copy.folder.peekClosed : next ? copy.folder.peekNext : copy.folder.peekFinal}</p>
            <p className="mt-1 line-clamp-2 font-display text-sm leading-snug">
              {status === "closed" ? caseDef.topic : next ? next.clue.title : copy.folder.peekFinalText}
            </p>
          </motion.div>

          {/* Progress note on a sticky note, which only comes out on the peek */}
          <motion.div
            className="tex-postit absolute right-[6%] top-0 w-[46%] rounded-[1px] px-4 py-2 shadow-[0_2px_4px_rgb(36_25_19/0.3)]"
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              y: active ? (motionOff ? -24 : -look.papers[2].peek + look.papers[2].fanY - 6) : 0,
              rotate: look.papers[2].rotate + 2,
            }}
            transition={paperSpring(2)}
          >
            <p className="text-xs font-semibold leading-snug text-ink">{copy.folder.peekNote(solved, total)}</p>
          </motion.div>
        </div>

        {/* The edge of the paper stack: many thin sheets, drawn with a gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[5%] top-[14px] h-[6px]"
          style={{
            background:
              "repeating-linear-gradient(to bottom, var(--color-paper) 0 1px, var(--color-paper-dark) 1px 2px), linear-gradient(to bottom, transparent, rgb(36 25 19 / 0.15))",
            backgroundBlendMode: "multiply",
          }}
        />

        {/* ── Front cover ── */}
        <motion.div
          className={`tex-manila tex-worn tex-crease relative mt-6 flex min-h-64 flex-col gap-4 rounded-[3px] p-6 sm:p-6 ${status === "cold" ? "dusty" : ""}`}
          style={{ boxShadow, transformOrigin: "50% 100%", ["--crease-at" as string]: "84%" }}
          initial={false}
          animate={{ rotateX: motionOff ? 0 : opening ? -38 : active ? -9 : 0 }}
          transition={motionOff ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 20 }}
        >
          {look.hardware === "clip" && (
            <PaperClip className="absolute -top-6" style={{ left: `${look.clipLeft}%`, rotate: `${look.clipTilt}deg` }} />
          )}
          {look.hardware === "pin" && <Pushpin className="absolute -top-2" style={{ left: `${look.clipLeft}%` }} />}

          <div className="flex items-start justify-between gap-4">
            <span className="label flex items-center gap-2 text-ink-soft">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${subject.dot}`} />
              {subject.label}
              {caseDef.grade ? ` · ${copy.grades.label(caseDef.grade)}` : ""}
            </span>
            <StatusStamp status={status} />
          </div>

          <h3 className="text-xl leading-snug sm:text-2xl">
            <Link
              href={href}
              onClick={onClick}
              className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:shadow-none"
            >
              {caseDef.title}
            </Link>
          </h3>

          <p className="line-clamp-2 text-sm text-ink-soft">{caseDef.tagline}</p>

          <div className="mt-auto space-y-2 pt-2">
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium">{copy.folder.lessonsDone(solved, total)}</span>
              <span className="shrink-0 text-ink-soft">{copy.common.aboutMin(caseMinutes(caseDef))}</span>
            </div>
            <ProgressBar value={solved} max={total} label={copy.folder.progressLabel(caseDef.title)} />
            <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-evidence-dark">
              {touchOpen ? copy.folder.tapAgain : copy.folder.cta[status]}
              <ArrowRightIcon width={16} height={16} />
            </p>
          </div>

          {/* Keyboard focus: a brass underline along the bottom of the cover, since the link fills the card */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 -bottom-2 h-1 rounded-full bg-brass-dark opacity-0 transition-opacity group-has-[a:focus-visible]:opacity-100"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
