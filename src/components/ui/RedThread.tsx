/**
 * A length of red thread pinned at one end, like the string on an evidence board.
 * Used under page titles as the one strong red accent on each page. Decorative only.
 */
export function RedThread({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 18" width="220" height="18" className={`block h-[18px] w-[220px] max-w-full ${className}`}>
      <path
        d="M9 9 C 48 3, 70 15, 110 9 S 172 4, 214 11"
        fill="none"
        stroke="var(--color-evidence)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* a second, thinner strand so it reads as twisted thread, not a drawn line */}
      <path d="M9 9 C 50 5, 72 13, 110 8 S 170 6, 214 11" fill="none" stroke="var(--color-evidence-dark)" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      <circle cx="9" cy="9" r="6" fill="var(--color-evidence)" />
      <circle cx="9" cy="9" r="6" fill="none" stroke="var(--color-evidence-dark)" strokeWidth="1.2" />
      <ellipse cx="7" cy="7" rx="2" ry="1.3" fill="rgb(255 240 220 / 0.7)" transform="rotate(-30 7 7)" />
    </svg>
  );
}
