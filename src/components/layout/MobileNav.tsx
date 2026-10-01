"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/copy";
import { NAV_ITEMS, isActive } from "./nav-items";

/** Bottom tab bar for phones and tablets. Same five destinations as the top bar. */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label={copy.nav.main}
      className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-highlighter bg-navy pb-[env(safe-area-inset-bottom)] text-paper lg:hidden"
    >
      <ul className="mx-auto flex max-w-xl">
        {NAV_ITEMS.map(({ href, short, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-xs font-medium ${
                  active ? "bg-navy-light text-highlighter" : "text-navy-100"
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
