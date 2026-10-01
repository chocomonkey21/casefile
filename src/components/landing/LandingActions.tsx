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
  const { profile } = useCaseFile();
  return (
    <div className="flex flex-wrap gap-3">
      {profile ? (
        <Button href="/desk" size="lg" variant="highlight">
          {t.ctaDesk}
        </Button>
      ) : (
        <Button href="/join" size="lg" variant="highlight">
          {t.cta}
        </Button>
      )}
      <Button href="#how" size="lg" variant="secondary">
        {t.howLink}
      </Button>
    </div>
  );
}

export function HeaderAction() {
  const { profile } = useCaseFile();
  return profile ? (
    <Button href="/desk" variant="highlight">
      {t.headerCtaDesk}
    </Button>
  ) : (
    <Button href="/join" variant="highlight">
      {t.headerCta}
    </Button>
  );
}

export function FinalAction() {
  const { profile } = useCaseFile();
  return profile ? (
    <Button href="/desk" size="lg" variant="highlight">
      {t.finalCtaDesk}
    </Button>
  ) : (
    <Button href="/join" size="lg" variant="highlight">
      {t.finalCta}
    </Button>
  );
}
