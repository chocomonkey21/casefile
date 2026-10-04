"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { useCaseFile } from "@/lib/store";

const t = copy.landing;

const headerLink =
  "inline-flex min-h-11 items-center rounded-[3px] px-3 text-base font-medium text-beige underline-offset-4 hover:bg-coffee hover:text-paper";

/**
 * Buttons that change depending on whether the student has already set up a profile.
 * Before the saved profile loads, everyone sees the "get started" version, which matches the server render.
 */
export function HeroActions() {
  const { profile } = useCaseFile();
  return (
    <div className="flex flex-wrap gap-4">
      {profile ? (
        <Button href="/desk" size="lg">
          {t.ctaDesk}
        </Button>
      ) : (
        <Button href="/join" size="lg">
          {t.cta}
        </Button>
      )}
      <Button href="#how" size="lg" variant="secondary">
        {t.howLink}
      </Button>
    </div>
  );
}

/**
 * Header links. "Cases" is always there so a visitor can look around before signing up.
 * There is deliberately no sign-up button here: the hero and the closing section already carry the two "Get started" actions.
 */
export function HeaderNav() {
  const { profile } = useCaseFile();
  return (
    <nav aria-label={copy.nav.main} className="flex items-center gap-1">
      <Link href="/cases" className={headerLink}>
        {t.headerCases}
      </Link>
      <Link href="/videos" className={headerLink}>
        {t.headerVideos}
      </Link>
      {profile ? (
        <Link href="/desk" className={headerLink}>
          {t.headerCtaDesk}
        </Link>
      ) : null}
    </nav>
  );
}

export function FinalAction() {
  const { profile } = useCaseFile();
  return profile ? (
    <Button href="/desk" size="lg">
      {t.finalCtaDesk}
    </Button>
  ) : (
    <Button href="/join" size="lg">
      {t.finalCta}
    </Button>
  );
}
