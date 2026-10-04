"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TeacherAccess } from "@/components/teach/TeacherAccess";
import { DEFAULT_BOARD, parseBoard, parseGrade, writeAccessCookies } from "@/lib/access";
import { copy } from "@/lib/copy";
import { useCaseFile, useHydrated } from "@/lib/store";
import { JoinWizard } from "./JoinWizard";

function Skeleton() {
  return <div className="mx-auto mt-10 h-96 max-w-3xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={copy.onboarding.loading} />;
}

/**
 * Waits for the saved profile to load. A student who already has a profile (or a signed-in teacher) does not need
 * onboarding, so they are sent on (to ?next= when the library sent them here, otherwise the Desk).
 * Log out clears the profile, which is how someone starts again.
 *
 * Profiles saved before grade access existed have no access cookies yet. The proxy sends them here, and this
 * copies the profile's grade and board into the cookies and returns them to where they were going.
 *
 * New visitors choose Student (the sign-up wizard) or Teacher (teacher sign-up and sign-in). ?role=teacher opens
 * the teacher form directly.
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
  const { profile, teacher } = useCaseFile();
  const grade = parseGrade(String(profile?.grade ?? ""));
  // Remember how the visit started. Saving the profile at the end of onboarding must not trigger the redirect.
  // A profile without a valid grade (an old save) goes through sign-up again.
  const [hadProfile] = useState(profile !== null && grade !== null);
  const [wasTeacher] = useState(teacher !== null);
  const [role, setRole] = useState<"student" | "teacher">(search.get("role") === "teacher" ? "teacher" : "student");
  const next = safeNext(search.get("next"));

  useEffect(() => {
    if (wasTeacher) {
      router.replace(next);
      return;
    }
    if (!hadProfile) return;
    writeAccessCookies(grade, parseBoard(profile?.board) ?? DEFAULT_BOARD);
    router.replace(next);
  }, [hadProfile, wasTeacher, grade, profile?.board, next, router]);

  if (hadProfile || wasTeacher) return <Skeleton />;

  const tab = (r: "student" | "teacher") =>
    `min-h-11 flex-1 rounded-[3px] px-4 font-semibold transition-colors ${role === r ? "bg-espresso text-paper" : "bg-paper text-ink hover:bg-manila-50"}`;

  return (
    <>
      {/* Student or teacher: a simple two-way toggle above the forms */}
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-10">
        <div role="group" aria-label={copy.role.legend} className="flex max-w-sm items-center gap-2 rounded-[4px] bg-manila-100/70 p-1">
          <span className="sr-only">{copy.role.legend}</span>
          <button type="button" aria-pressed={role === "student"} className={tab("student")} onClick={() => setRole("student")}>
            {copy.role.student}
          </button>
          <button type="button" aria-pressed={role === "teacher"} className={tab("teacher")} onClick={() => setRole("teacher")}>
            {copy.role.teacher}
          </button>
        </div>
      </div>
      {role === "student" ? (
        <JoinWizard />
      ) : (
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <TeacherAccess />
        </div>
      )}
    </>
  );
}
