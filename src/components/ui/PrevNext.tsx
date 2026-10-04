import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

export type PrevNextLink = { href: string; label: string; title: string };

/**
 * Previous and next controls for chapters, lessons and videos. Both sides always occupy their slot,
 * so "Next" stays on the right even when there is no "Previous".
 */
export function PrevNext({ prev, next, label }: { prev: PrevNextLink | null; next: PrevNextLink | null; label: string }) {
  if (!prev && !next) return null;
  const card =
    "group flex min-h-16 flex-col justify-center rounded-[3px] bg-manila-100 px-4 py-3 shadow-card transition-colors hover:bg-manila motion-safe:transition-transform motion-safe:hover:-translate-y-0.5";
  return (
    <nav aria-label={label} className="grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className={card} rel="prev">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
            <ArrowLeftIcon width={16} height={16} />
            {prev.label}
          </span>
          <span className="mt-0.5 font-display text-lg leading-snug">{prev.title}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link href={next.href} className={`${card} sm:text-right`} rel="next">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink-soft sm:justify-end">
            {next.label}
            <ArrowRightIcon width={16} height={16} />
          </span>
          <span className="mt-0.5 font-display text-lg leading-snug">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
