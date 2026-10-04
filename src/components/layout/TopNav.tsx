"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { copy } from "@/lib/copy";
import { currentStreak, levelFor } from "@/lib/progress";
import { useCaseFile } from "@/lib/store";
import { NAV_ITEMS, isActive } from "./nav-items";
import { ProfileMenu } from "./ProfileMenu";

/**
 * Top bar in espresso. On screens under 1024px the five links move to MobileNav
 * (a bottom bar). Level and study streak are two quiet lines of text. On phones they live in the profile menu.
 */
export function TopNav() {
  const pathname = usePathname();
  const state = useCaseFile();
  const { rank } = levelFor(state);
  const days = currentStreak(state.streak);

  return (
    <header className="sticky top-0 z-40 on-dark bg-espresso">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/desk" className="flex min-h-11 items-center gap-2" aria-label={copy.brand.logoLabel}>
            <BrandMark />
            <span className="font-display text-xl tracking-wide sm:text-2xl">{copy.brand.name}</span>
          </Link>

          <nav aria-label={copy.nav.main} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map(({ href, label }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex min-h-11 items-center rounded-[3px] px-4 text-base font-medium transition-colors hover:bg-coffee ${
                        active ? "text-paper" : "text-beige"
                      }`}
                    >
                      {label}
                      {/* Highlighter swipe under the current page */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-1.5 h-1 rounded-full bg-postit transition-opacity ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-4">
          <p className="hidden text-right text-xs leading-snug text-beige sm:block">
            <span className="block">{copy.level.label(rank.name)}</span>
            <span className="block">{copy.level.streak(days)}</span>
          </p>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
