"use client";

import { useEffect, useId, useRef, useState } from "react";

type HelpTipProps = {
  /** Names the button for screen readers, e.g. "What is the Evidence Board?" */
  label: string;
  /** One plain sentence (or two) explaining the section */
  text: string;
};

/**
 * A small "?" next to a heading. The explanation shows on hover, on keyboard focus and when tapped.
 * It is also attached to the button with aria-describedby, so a screen reader reads it with the button.
 * Escape or a click elsewhere closes it.
 */
export function HelpTip({ label, text }: HelpTipProps) {
  const id = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false); // opened by a click or tap
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const visible = pinned || hover || focus;

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinned(false);
        setHover(false);
        setFocus(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setPinned(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [visible]);

  return (
    <span
      ref={wrapRef}
      className="relative inline-flex align-middle"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-describedby={id}
        onClick={() => setPinned((p) => !p)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="flex h-11 w-11 items-center justify-center rounded-full"
      >
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full font-display text-base leading-none"
        >
          ?
        </span>
      </button>
      {/* Always in the page (hidden with display:none) so aria-describedby can find it */}
      <span
        id={id}
        role="tooltip"
        className={`${visible ? "block" : "hidden"} absolute left-0 top-full z-50 mt-1 w-72 max-w-[calc(100vw-2rem)] rounded-[3px]   bg-paper p-4 text-left font-sans text-sm font-normal normal-case leading-snug tracking-normal text-ink shadow-folder`}
      >
        {text}
      </span>
    </span>
  );
}
