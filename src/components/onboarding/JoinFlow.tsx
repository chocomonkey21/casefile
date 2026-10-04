"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parseGrade, writeGradeCookie } from "@/lib/access";
import { copy } from "@/lib/copy";
import { useCaseFile, useHydrated } from "@/lib/store";
import { JoinWizard } from "./JoinWizard";

function Skeleton() {
  return <div className="mx-auto mt-10 h-96 max-w-3xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={copy.onboarding.loading} />;
}

/**
 * Waits for the saved profile to load. A student who already has a profile does not need onboarding,
 * so they are sent on (to ?next= when the library sent them here, otherwise the Desk).
 * Log out clears the profile, which is how someone starts again.
 *
 * Profiles saved before grade access existed have no grade cookie yet. The proxy sends them here, and this
 * copies the profile's grade into the cookie and returns them to where they were going.
 */
export function JoinFlow() {
  const hydrated = useHydrated();
  return hydrated ? <Loaded /> : <Skeleton />;
}

/** Only same-site paths, so ?next= can never send someone to another website */
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/join") ? value : "/desk";
}

function Loaded() {
  const router = useRouter();
  const search = useSearchParams();
  const { profile } = useCaseFile();
  const grade = parseGrade(String(profile?.grade ?? ""));
  // Remember how the visit started. Saving the profile at the end of onboarding must not trigger the redirect.
  // A profile without a valid grade (an old save) goes through sign-up again.
  const [hadProfile] = useState(profile !== null && grade !== null);
  const next = safeNext(search.get("next"));

  useEffect(() => {
    if (!hadProfile) return;
    writeGradeCookie(grade);
    router.replace(next);
  }, [hadProfile, grade, next, router]);

  return hadProfile ? <Skeleton /> : <JoinWizard />;
}
