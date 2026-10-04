import Link from "next/link";
import { copy } from "@/lib/copy";

export type Crumb = { label: string; href?: string };

/**
 * "Where am I" trail: Subjects / Science / Chapter / Lesson. The last item is the current page and is not a link.
 * Each link has a 44px-tall hit area. Long titles wrap rather than overflow.
 */
export function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label={copy.wayfinding.breadcrumb} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 text-sm text-ink-soft">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={`inline-flex min-h-11 items-center ${last ? "font-semibold text-ink" : ""}`}>
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-manila-600">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
