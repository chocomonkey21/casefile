"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { copy } from "@/lib/copy";
import { MobileNav } from "./MobileNav";
import { TopNav } from "./TopNav";

/** Pages that carry their own header, main and footer instead of the app navigation */
const BARE_ROUTES = ["/", "/join", "/families"];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // The editor desk has its own header and is never part of the learner navigation
  const bare = BARE_ROUTES.includes(pathname) || pathname.startsWith("/studio");

  return (
    <>
      <a href="#main-content" className="skip-link">
        {copy.common.skipLink}
      </a>
      {bare ? (
        // Bare pages render their own <header>, <main id="main-content"> and <footer>
        children
      ) : (
        <>
          <TopNav />
          {/* pb-20 leaves room for the fixed bottom bar on small screens */}
          {/* Everything a student reads lies on a sheet of paper, never straight on the walnut desk */}
          <main id="main-content" className="flex-1 pb-20 lg:pb-0">
            <div className="sheet mx-2 mb-2 mt-4 sm:mx-8 sm:mb-8 sm:mt-6 xl:mx-auto xl:max-w-[80rem]">{children}</div>
          </main>
          <MobileNav />
        </>
      )}
    </>
  );
}
