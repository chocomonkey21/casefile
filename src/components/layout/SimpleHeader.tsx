import Link from "next/link";
import type { ReactNode } from "react";
import { MagnifierIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";

/** Top bar for pages without the app nav (landing and onboarding). Logo on the left, anything you like on the right. */
export function SimpleHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="on-dark border-b-4 border-brass bg-espresso">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2" aria-label={copy.brand.homeLabel}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-postit text-ink">
            <MagnifierIcon width={22} height={22} />
          </span>
          <span className="font-display text-xl tracking-wide sm:text-2xl">{copy.brand.name}</span>
        </Link>
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </header>
  );
}
