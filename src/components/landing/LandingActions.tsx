"use client";

import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { useCaseFile } from "@/lib/store";

const t = copy.landing;


/**
 * Buttons that change depending on whether the student has already set up a profile.
 * Before the saved profile loads, everyone sees the "get started" version, which matches the server render.
 */
export function HeroActions() {
  const { profile: student, teacher } = useCaseFile();
  // A signed-in teacher also goes straight to the Desk
  const profile = student ?? teacher;
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
 * The header carries one action. Visitors get "Get started", which leads into sign-up; the library (Cases, Videos)
 * only opens after sign-up, for the student's grade (see lib/access.ts and proxy.ts), so it is not linked here.
 * A student who already has a profile gets a way back to their Desk instead.
 * Before the saved profile loads, everyone sees "Get started", which matches the server render.
 */
export function HeaderNav() {
  const { profile: student, teacher } = useCaseFile();
  // A signed-in teacher also goes straight to the Desk
  const profile = student ?? teacher;
  return (
    <nav aria-label={copy.nav.main} className="flex items-center gap-1">
      {profile ? (
        <Button href="/desk" variant="highlight">
          {t.headerCtaDesk}
        </Button>
      ) : (
        <Button href="/join" variant="highlight">
          {t.cta}
        </Button>
      )}
    </nav>
  );
}

export function FinalAction() {
  const { profile: student, teacher } = useCaseFile();
  // A signed-in teacher also goes straight to the Desk
  const profile = student ?? teacher;
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
