/**
 * The CaseFile logo mark: a manila folder with a lens in front of it.
 * It is a folder silhouette rather than a bare magnifier in a square, so it does not read as a search button.
 * Decorative: the link it sits in carries the accessible name.
 */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" className={`shrink-0 ${className}`}>
      <path d="M3 9a2 2 0 0 1 2-2h8l3 3h15a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="var(--color-manila)" />
      <path d="M3 14h30" stroke="var(--color-manila-600)" strokeWidth="1" opacity="0.6" />
      <circle cx="17" cy="21" r="6" fill="var(--color-postit-light)" stroke="var(--color-ink)" strokeWidth="2.2" />
      <path d="M21.5 25.5 27 31" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
