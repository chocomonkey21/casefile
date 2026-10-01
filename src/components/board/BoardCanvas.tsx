"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent as ReactMouseEvent, type PointerEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  BOARD_MIN_H,
  CARD_H,
  cardWidth,
  clampCenter,
  defaultCenter,
  pairId,
  pinPoint,
  stringPath,
  tilt,
  type ResolvedEvidence,
} from "@/lib/board";
import { copy } from "@/lib/copy";
import { actions } from "@/lib/store";
import type { BoardState } from "@/lib/types";
import { PinCard } from "./PinCard";
import { StringConnector } from "./StringConnector";

type BoardCanvasProps = {
  /** Cards in the order they were collected */
  cards: ResolvedEvidence[];
  board: BoardState;
  /** Two cards to make glow (the "you haven't connected" nudge) */
  highlight: [string, string] | null;
  /** Called when the student ties a string. The page decides what to say about it. */
  onConnect: (a: string, b: string) => void;
};

type Point = { x: number; y: number };

const NUDGE = 16;
const NUDGE_BIG = 56;

/**
 * The pinboard. Handles three kinds of input:
 *  1. dragging a card (pointer) or nudging it (arrow keys)
 *  2. dragging from a pin to another card to tie a string
 *  3. pressing a pin, then another card, to tie a string without dragging
 * Positions are saved as: x = fraction of board width, y = pixels. That keeps the layout when the window resizes.
 */
export function BoardCanvas({ cards, board, highlight, onConnect }: BoardCanvasProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [live, setLive] = useState<({ key: string } & Point) | null>(null);
  const [top, setTop] = useState<string | null>(null);
  const [drawing, setDrawing] = useState<({ from: string } & Point) | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const [selectedString, setSelectedString] = useState<string | null>(null);

  const dragRef = useRef<{ key: string; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const pinRef = useRef<{ key: string; sx: number; sy: number; drawing: boolean } | null>(null);
  const suppressCardClick = useRef(false);
  const suppressPinClick = useRef(false);

  // Track the board width so card positions can scale with it
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Escape backs out of connecting or a selected string
  useEffect(() => {
    if (!connectFrom && !selectedString) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setConnectFrom(null);
        setSelectedString(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [connectFrom, selectedString]);

  const cw = cardWidth(width);

  /** Where each card is right now, in board pixels */
  const centerOf = (key: string, index: number): Point => {
    if (live && live.key === key) return { x: live.x, y: live.y };
    const saved = board.positions[key];
    if (saved) return clampCenter(saved.x * width, saved.y, width);
    return defaultCenter(index, width);
  };

  const centers = new Map(cards.map((c, i) => [c.key, centerOf(c.key, i)]));
  const bottom = Math.max(...[...centers.values()].map((p) => p.y + CARD_H / 2), 0) + 56;
  const height = Math.max(BOARD_MIN_H, bottom);
  const titleOf = (key: string) => cards.find((c) => c.key === key)?.evidence.title ?? "card";

  /* ---------- Moving cards ---------- */

  const onCardDown = (key: string) => (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("[data-nodrag]")) return;
    const c = centers.get(key)!;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { key, sx: e.clientX, sy: e.clientY, ox: c.x, oy: c.y, moved: false };
    setTop(key);
  };

  const dragTo = (d: NonNullable<typeof dragRef.current>, e: PointerEvent<HTMLDivElement>) =>
    clampCenter(d.ox + e.clientX - d.sx, d.oy + e.clientY - d.sy, width);

  const onCardMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 4) return; // a click, not a drag
    d.moved = true;
    setLive({ key: d.key, ...dragTo(d, e) });
  };

  const onCardUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d?.moved) return;
    const p = dragTo(d, e);
    actions.moveCard(d.key, p.x / width, p.y);
    setLive(null);
    suppressCardClick.current = true;
    setTimeout(() => (suppressCardClick.current = false), 0);
  };

  /** Arrow keys move a focused card. Hold Shift for bigger steps. */
  const onCardKey = (key: string) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const step = e.shiftKey ? NUDGE_BIG : NUDGE;
    const delta: Record<string, Point> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const move = delta[e.key];
    if (!move) return;
    e.preventDefault();
    const c = centers.get(key)!;
    const p = clampCenter(c.x + move.x, c.y + move.y, width);
    actions.moveCard(key, p.x / width, p.y);
    setTop(key);
  };

  /** In "connecting" mode a click anywhere on another card finishes the string */
  const onCardClick = (key: string) => () => {
    if (suppressCardClick.current) return;
    if (connectFrom && connectFrom !== key) {
      onConnect(connectFrom, key);
      setConnectFrom(null);
    }
  };

  /* ---------- Tying strings ---------- */

  const toBoard = (e: PointerEvent): Point => {
    const r = boardRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const cardAt = (e: PointerEvent) =>
    document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-card-key]")?.dataset.cardKey ?? null;

  const onPinDown = (key: string) => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.stopPropagation(); // do not start moving the card
    e.currentTarget.setPointerCapture(e.pointerId);
    pinRef.current = { key, sx: e.clientX, sy: e.clientY, drawing: false };
  };

  const onPinMove = (e: PointerEvent<HTMLButtonElement>) => {
    const p = pinRef.current;
    if (!p) return;
    if (!p.drawing && Math.hypot(e.clientX - p.sx, e.clientY - p.sy) > 6) p.drawing = true;
    if (!p.drawing) return;
    setDrawing({ from: p.key, ...toBoard(e) });
    const target = cardAt(e);
    setHover(target && target !== p.key ? target : null);
  };

  const onPinUp = (e: PointerEvent<HTMLButtonElement>) => {
    const p = pinRef.current;
    pinRef.current = null;
    if (!p?.drawing) return; // a plain press is handled by onClick
    const target = cardAt(e);
    if (target && target !== p.key) onConnect(p.key, target);
    setDrawing(null);
    setHover(null);
    suppressPinClick.current = true;
    setTimeout(() => (suppressPinClick.current = false), 0);
  };

  const onPinClick = (key: string) => (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (suppressPinClick.current) return;
    if (connectFrom && connectFrom !== key) {
      onConnect(connectFrom, key);
      setConnectFrom(null);
    } else {
      setConnectFrom(connectFrom === key ? null : key);
    }
  };

  /* ---------- Strings to draw ---------- */

  const strings = board.strings.flatMap(([a, b]) => {
    const ca = centers.get(a);
    const cb = centers.get(b);
    return ca && cb ? [{ id: pairId(a, b), a, b, from: pinPoint(ca), to: pinPoint(cb) }] : [];
  });
  const selected = strings.find((s) => s.id === selectedString);

  return (
    <div>
      <div
        ref={boardRef}
        role="region"
        aria-label={copy.board.region}
        className="relative overflow-hidden rounded-xl border-[10px] border-manila-700 bg-manila-500/60 shadow-folder"
        style={{
          height,
          // Cork board speckle
          backgroundImage:
            "radial-gradient(rgb(90 71 39 / 0.25) 1px, transparent 1.5px), radial-gradient(rgb(243 234 214 / 0.25) 1px, transparent 1.5px)",
          backgroundSize: "18px 18px, 27px 27px",
          backgroundPosition: "0 0, 9px 11px",
        }}
        onPointerDown={(e) => {
          // Clicking empty board clears a selected string
          if (e.target === e.currentTarget) setSelectedString(null);
        }}
      >
        {/* Connecting banner. Fixed to the bottom of the window so it never moves the board or covers the pins. */}
        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-3 bottom-20 z-50 mx-auto max-w-2xl lg:bottom-4">
          {connectFrom && (
            <div className="pointer-events-auto flex flex-wrap items-center gap-3 rounded-lg bg-espresso p-3 text-paper shadow-folder">
              <p className="min-w-0 flex-1">
                {copy.board.connecting(titleOf(connectFrom))}
              </p>
              <Button variant="highlight" onClick={() => setConnectFrom(null)}>
                {copy.board.cancel}
              </Button>
            </div>
          )}
        </div>
        {width > 0 && (
          <>
            {/* Strings run over the cards like real string. Only the thin string itself catches clicks, so cards stay draggable. */}
            <svg className="pointer-events-none absolute inset-0 z-[15] h-full w-full" width={width} height={height} aria-hidden="true">
              {strings.map((s, i) => (
                <StringConnector
                  key={s.id}
                  from={s.from}
                  to={s.to}
                  delay={i * 0.12}
                  selected={selectedString === s.id}
                  onSelect={() => setSelectedString(selectedString === s.id ? null : s.id)}
                  label={copy.board.stringBetween(titleOf(s.a), titleOf(s.b))}
                />
              ))}
            </svg>

            {cards.map((c) => {
              const center = centers.get(c.key)!;
              return (
                <PinCard
                  key={c.key}
                  info={c}
                  center={center}
                  width={cw}
                  tilt={tilt(c.key)}
                  zIndex={top === c.key ? 20 : 10}
                  dragging={live?.key === c.key}
                  highlighted={Boolean(highlight?.includes(c.key))}
                  isSource={connectFrom === c.key || drawing?.from === c.key}
                  isTarget={hover === c.key}
                  card={{
                    onPointerDown: onCardDown(c.key),
                    onPointerMove: onCardMove,
                    onPointerUp: onCardUp,
                    onKeyDown: onCardKey(c.key),
                    onClick: onCardClick(c.key),
                  }}
                  pin={{
                    onPointerDown: onPinDown(c.key),
                    onPointerMove: onPinMove,
                    onPointerUp: onPinUp,
                    onClick: onPinClick(c.key),
                  }}
                />
              );
            })}

            {/* String being drawn right now */}
            {drawing && centers.get(drawing.from) && (
              <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full" width={width} height={height} aria-hidden="true">
                <path
                  d={stringPath(pinPoint(centers.get(drawing.from)!), { x: drawing.x, y: drawing.y }).d}
                  className="fill-none stroke-evidence"
                  strokeWidth={3.5}
                  strokeDasharray="2 7"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* Cut button on a selected string */}
            {selected && (
              <button
                type="button"
                className="absolute z-30 flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border-2 border-evidence-dark bg-paper px-3 text-sm font-semibold text-evidence-dark shadow-card"
                style={{ left: stringPath(selected.from, selected.to).mid.x, top: stringPath(selected.from, selected.to).mid.y }}
                onClick={() => {
                  actions.removeString(selected.a, selected.b);
                  setSelectedString(null);
                }}
              >
                {copy.board.removeThis}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
