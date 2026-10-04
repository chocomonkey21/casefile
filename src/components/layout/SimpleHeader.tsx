import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { copy } from "@/lib/copy";

/** Top bar for pages without the app nav (landing, onboarding and the families page). Logo on the left, anything you like on the right. */
export function SimpleHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="on-dark bg-espresso">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2" aria-label={copy.brand.homeLabel}>
          <BrandMark />
          <span className="font-display text-xl tracking-wide sm:text-2xl">{copy.brand.name}</span>
        </Link>
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </header>
  );
}
