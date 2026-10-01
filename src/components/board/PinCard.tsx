"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { KeyboardEventHandler, MouseEventHandler, PointerEventHandler } from "react";
import { DiagramIcon, PencilIcon, PlayIcon, ReadingIcon } from "@/components/ui/Icons";
import { CARD_H, type ResolvedEvidence } from "@/lib/board";
import { copy } from "@/lib/copy";
import type { EvidenceKind } from "@/lib/types";

const ICONS: Record<EvidenceKind, typeof ReadingIcon> = {
  reading: ReadingIcon,
  video: PlayIcon,
  diagram: DiagramIcon,
  practice: PencilIcon,
};

type PinCardProps = {
  info: ResolvedEvidence;
  /** Card centre in board pixels */
  center: { x: number; y: number };
  width: number;
  tilt: number;
  zIndex: number;
  dragging: boolean;
  /** Glows to draw attention (the "you haven't connected" nudge) */
  highlighted: boolean;
  /** The card a string is being drawn from */
  isSource: boolean;
  /** The card a string would land on right now */
  isTarget: boolean;
  /** Arrow key moves, drag handlers and so on, wired up by the board */
  card: {
    onPointerDown: PointerEventHandler<HTMLDivElement>;
    onPointerMove: PointerEventHandler<HTMLDivElement>;
    onPointerUp: PointerEventHandler<HTMLDivElement>;
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
    onClick: MouseEventHandler<HTMLDivElement>;
  };
  pin: {
    onPointerDown: PointerEventHandler<HTMLButtonElement>;
    onPointerMove: PointerEventHandler<HTMLButtonElement>;
    onPointerUp: PointerEventHandler<HTMLButtonElement>;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
};

/**
 * One piece of evidence pinned to the board. Drag the card to move it.
 * Drag from the red pin (or press it, then press another card) to tie a string.
 */
export function PinCard({ info, center, width, tilt, zIndex, dragging, highlighted, isSource, isTarget, card, pin }: PinCardProps) {
  const label = copy.board.kindShort[info.evidence.kind];
  const Icon = ICONS[info.evidence.kind];

  return (
    <motion.div
      data-card-key={info.key}
      role="group"
      tabIndex={0}
      aria-label={copy.board.cardLabel(info.evidence.title, label, info.clueIndex + 1)}
      className={`absolute touch-none select-none rounded-md border-2 bg-paper p-3 pt-4 text-left outline-offset-4 ${
        dragging ? "cursor-grabbing shadow-folder" : "cursor-grab shadow-card"
      } ${
        isTarget
          ? "border-evidence ring-4 ring-evidence/50"
          : highlighted
            ? "border-ink ring-4 ring-highlighter"
            : isSource
              ? "border-navy ring-4 ring-navy/40"
              : "border-manila-600/50"
      }`}
      style={{ left: center.x - width / 2, top: center.y - CARD_H / 2, width, height: CARD_H, rotate: tilt, zIndex }}
      // Pin drop: the card lands on the board
      initial={{ scale: 1.25, opacity: 0, y: -18 }}
      animate={{ scale: dragging ? 1.05 : highlighted ? [1, 1.05, 1] : 1, opacity: 1, y: 0 }}
      transition={highlighted ? { duration: 0.9, repeat: 2 } : { type: "spring", stiffness: 420, damping: 24 }}
      {...card}
    >
      {/* The pin. It is a real button, so it works with a keyboard and a screen reader. */}
      <button
        type="button"
        data-nodrag
        aria-label={copy.board.pinLabel(info.evidence.title)}
        className="absolute left-1/2 top-0 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-crosshair touch-none items-center justify-center rounded-full"
        {...pin}
      >
        <span className="h-4 w-4 rounded-full border-2 border-evidence-dark bg-evidence shadow-[0_2px_0_rgb(0_0_0/0.25)]" />
      </button>

      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-manila-600/60 bg-manila"
        >
          <Icon width={18} height={18} />
        </span>
        <span className="label text-ink-soft">{label}</span>
      </div>
      <p className="mt-1.5 line-clamp-3 text-sm font-semibold leading-snug">{info.evidence.title}</p>
      <p className="absolute inset-x-3 bottom-2 flex items-center justify-between gap-2 text-xs text-ink-soft">
        <span className="truncate">
          {copy.board.cardMeta(info.clueIndex + 1, info.caseDef.number)}
        </span>
        <Link
          data-nodrag
          href={`/cases/${info.caseDef.id}/clues/${info.clue.id}#${info.evidence.id}`}
          className="relative shrink-0 text-sm font-semibold text-navy underline underline-offset-2 after:absolute after:-inset-x-3 after:-inset-y-2 after:content-['']"
        >
          {copy.common.open}<span className="sr-only"> {info.evidence.title}</span>
        </Link>
      </p>
    </motion.div>
  );
}
