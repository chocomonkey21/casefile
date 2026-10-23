"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TeacherAccess } from "@/components/teach/TeacherAccess";
import { DEFAULT_BOARD, parseBoard, parseGrade, writeAccessCookies } from "@/lib/access";
import { copy } from "@/lib/copy";
import { useCaseFile, useHydrated } from "@/lib/store";
import { JoinWizard } from "./JoinWizard";
import { Button } from "@/components/ui/Button";
import { RedThread } from "@/components/ui/RedThread";

function Skeleton() {
  return <div className="mx-auto mt-10 h-96 max-w-3xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={copy.onboarding.loading} />;
}

/**
 * Waits for the saved profile to load. A student who already has a profile (or a signed-in teacher) does not need
 * onboarding, so they are sent on (to ?next= when the library sent them here, otherwise Home).
 * Log out clears the profile, which is how someone starts again.
 *
 * Profiles saved before grade access existed have no access cookies yet. The proxy sends them here, and this
 * copies the profile's grade and board into the cookies and returns them to where they were going.
 *
 * New visitors first answer "Who is this for?": a student (the sign-up wizard), a parent or guardian (the parent view),
 * or, through a smaller link, a teacher. ?role=teacher or ?role=student skips the question.
 */
export function JoinFlow() {
  const hydrated = useHydrated();
  return hydrated ? <Loaded /> : <Skeleton />;
}

/** Only same-site paths, so ?next= can never send someone to another website */
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/join") ? value : "/home";
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
  const initialRole = search.get("role");
  const [role, setRole] = useState<"choose" | "student" | "teacher">(initialRole === "teacher" ? "teacher" : initialRole === "student" ? "student" : "choose");
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

  if (role === "student") return <JoinWizard onBack={() => setRole("choose")} />;

  if (role === "teacher") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Button variant="ghost" onClick={() => setRole("choose")}>
          {copy.common.back}
        </Button>
        <div className="mt-4">
          <TeacherAccess />
        </div>
      </div>
    );
  }

  // Who is this for? Two big choices, each one clear next step. Teachers have a smaller link of their own.
  const w = copy.onboarding.who;
  const choice = "tex-paper flex min-h-24 w-full flex-col items-start justify-center rounded-[3px] p-5 text-left shadow-card transition-colors hover:bg-manila-50";
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="label text-evidence-dark">{copy.onboarding.eyebrow}</p>
      <h1 className="mt-1 text-4xl sm:text-5xl">{w.heading}</h1>
      <RedThread className="mt-4" />
      <p className="mt-2 text-lg text-ink-soft">{w.text}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <button type="button" className={choice} onClick={() => setRole("student")}>
          <span className="font-display text-2xl">{w.student}</span>
          <span className="mt-1 text-ink-soft">{w.studentText}</span>
        </button>
        <button type="button" className={choice} onClick={() => router.push("/parent")}>
          <span className="font-display text-2xl">{w.parent}</span>
          <span className="mt-1 text-ink-soft">{w.parentText}</span>
        </button>
      </div>
      <p className="mt-6">
        <button type="button" onClick={() => setRole("teacher")} className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline">
          {w.teacher}
        </button>
      </p>
    </div>
  );
}
