"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { CrossIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";
import { actions, useCaseFile, useHydrated } from "@/lib/store";

export type TipId = keyof typeof copy.tips.items;

/**
 * A one-time tip for a page, plus the small "?" button that reopens it.
 * - Shows by itself the first time the student reaches the page (which tips were seen is saved on the device,
 *   and cleared by Log out or by "Take the tour again" in My profile).
 * - Two sentences or fewer. Closes with its button or the Esc key. Not a modal: the page stays usable.
 * - Motion is a short fade and lift; with reduced motion, Motion keeps only the fade (MotionConfig in Providers).
 */
export function PageTip({ id }: { id: TipId }) {
  const hydrated = useHydrated();
  const { tipsSeen, profile } = useCaseFile();
  const seen = (tipsSeen ?? []).includes(id);
  // Reopened with the "?" button after it was seen
  const [reopened, setReopened] = useState(false);
  const open = hydrated && !!profile && (!seen || reopened);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const tip = copy.tips.items[id];

  const close = () => {
    actions.markTipSeen(id);
    setReopened(false);
    buttonRef.current?.focus();
  };

  // Esc closes the tip from anywhere on the page
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        actions.markTipSeen(id);
        setReopened(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, id]);

  if (!hydrated || !profile) return null;

  return (
    <div className="mt-3">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label={copy.tips.reopen(tip.title)}
        onClick={() => {
          if (open) close();
          else {
            setReopened(true);
            // Move focus into the tip so keyboard and screen reader users land on it
            requestAnimationFrame(() => panelRef.current?.focus());
          }
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-manila-100 font-display text-lg text-ink hover:bg-manila-400"
      >
        ?
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            ref={panelRef}
            role="region"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, transform: "translateY(-4px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="tex-postit relative mt-3 max-w-xl rounded-[3px] p-4 pr-14 shadow-card outline-none"
          >
            <p id={titleId} className="label text-ink">
              {copy.tips.label}: {tip.title}
            </p>
            <p className="mt-1 text-base text-ink">{tip.text}</p>
            <button
              type="button"
              onClick={close}
              aria-label={copy.tips.close}
              className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-full hover:bg-postit-dark/40"
            >
              <CrossIcon width={18} height={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
