"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import { useCaseFile, useHydrated } from "@/lib/store";
import { JoinWizard } from "./JoinWizard";

function Skeleton() {
  return <div className="mx-auto mt-10 h-96 max-w-3xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={copy.onboarding.loading} />;
}

/**
 * Waits for the saved profile to load. A student who already has a profile does not need onboarding,
 * so they are sent to the Desk. (Log out clears the profile, which is how someone starts again.)
 */
export function JoinFlow() {
  const hydrated = useHydrated();
  return hydrated ? <Loaded /> : <Skeleton />;
}

function Loaded() {
  const router = useRouter();
  const { profile } = useCaseFile();
  // Remember how the visit started. Saving the profile at the end of onboarding must not trigger the redirect.
  const [hadProfile] = useState(profile !== null);

  useEffect(() => {
    if (hadProfile) router.replace("/desk");
  }, [hadProfile, router]);

  return hadProfile ? <Skeleton /> : <JoinWizard />;
}
