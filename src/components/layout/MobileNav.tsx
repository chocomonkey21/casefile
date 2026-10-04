"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/copy";
import { useCaseFile, useHydrated } from "@/lib/store";
import { NAV_ITEMS, isActive } from "./nav-items";

/** Bottom tab bar for phones and tablets. Same five destinations as the top bar. */
export function MobileNav() {
  const pathname = usePathname();
  const { profile } = useCaseFile();
  const hydrated = useHydrated();
  // Visitors without a profile cannot open the library, so they get no library tabs (TopNav shows Get started)
  if (hydrated && !profile) return null;

  return (
    <nav
      aria-label={copy.nav.main}
      className="fixed inset-x-0 bottom-0 z-40 on-dark bg-espresso pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-xl">
        {NAV_ITEMS.map(({ href, short, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs font-medium ${
                  active ? "bg-coffee text-postit" : "text-beige"
                }`}
              >
                <Icon width={22} height={22} />
                {short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
