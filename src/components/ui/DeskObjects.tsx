import type { CSSProperties } from "react";

/*
  Small drawn objects that sit on the papers: a brass paper clip and a brass pushpin.
  Simple strokes and a soft highlight, like a quick ink drawing, not an icon set.
  Purely decorative, so they are hidden from screen readers.
*/

type ObjectProps = { className?: string; style?: CSSProperties };

/** A brass paper clip, drawn as one bent wire */
export function PaperClip({ className = "", style }: ObjectProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 22 56" width="22" height="56" className={className} style={style}>
      <path
        d="M7 14 V44 a5 5 0 0 0 10 0 V9 a7.5 7.5 0 0 0 -15 0 V40"
        fill="none"
        stroke="var(--color-brass-dark)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M7 14 V44 a5 5 0 0 0 10 0 V9 a7.5 7.5 0 0 0 -15 0 V40"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="1.4"
        strokeLinecap="round"
        transform="translate(-0.4 -0.4)"
      />
    </svg>
  );
}

/** A brass pushpin seen from slightly above, with its shadow on the paper */
export function Pushpin({ className = "", style }: ObjectProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 28 28" width="28" height="28" className={className} style={style}>
      <ellipse cx="16.5" cy="17.5" rx="7.5" ry="5" fill="rgb(36 25 19 / 0.28)" />
      <circle cx="13" cy="13" r="8" fill="var(--color-brass)" />
      <circle cx="13" cy="13" r="8" fill="none" stroke="var(--color-brass-dark)" strokeWidth="1.4" />
      <circle cx="13" cy="13" r="3.6" fill="var(--color-brass-dark)" opacity="0.55" />
      <ellipse cx="10.4" cy="10" rx="2.6" ry="1.7" fill="rgb(255 244 214 / 0.75)" transform="rotate(-35 10.4 10)" />
    </svg>
  );
}
