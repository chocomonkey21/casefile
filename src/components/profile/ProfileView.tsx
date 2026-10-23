"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HowItWorksDialog } from "@/components/onboarding/HowItWorksDialog";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { AVATARS, findAvatar } from "@/data/avatars";
import { SUBJECTS } from "@/data/subjects";
import { boardLabel, DEFAULT_BOARD } from "@/lib/access";
import { copy } from "@/lib/copy";
import { levelFor } from "@/lib/progress";
import { actions, useCaseFile, useHydrated } from "@/lib/store";
import { RedThread } from "@/components/ui/RedThread";

/**
 * My profile: what the student told us during sign-up, their level, a portrait they can change, learning help
 * ("How CaseFile works" and "Take the tour again") and the Reduce motion setting.
 */
export function ProfileView() {
  const router = useRouter();
  const state = useCaseFile();
  const hydrated = useHydrated();
  const [showHow, setShowHow] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!hydrated) {
    return <div className="mx-auto mt-10 h-64 max-w-2xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={copy.about.loading} />;
  }

  const { profile, joinedAt, reduceMotion } = state;

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-4xl">{copy.about.noProfileTitle}</h1>
        <p className="mt-2 text-lg text-ink-soft">{copy.about.noProfileText}</p>
        <div className="mt-6">
          <Button href="/join">{copy.profile.setUp}</Button>
        </div>
      </div>
    );
  }

  const { rank } = levelFor(state);
  const avatar = findAvatar(profile.avatarId);
  const subjects = profile.subjects?.length ? profile.subjects.map((s) => SUBJECTS[s].label).join(", ") : copy.about.allSubjects;
  const joined = joinedAt
    ? new Date(joinedAt).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
    : copy.about.notRecorded;

  const rows: { label: string; value: string }[] = [
    { label: copy.about.name, value: profile.name },
    { label: copy.about.board, value: boardLabel(profile.board ?? DEFAULT_BOARD) },
    { label: copy.about.grade, value: copy.about.gradeValue(profile.grade) },
    { label: copy.about.subjects, value: subjects },
    { label: copy.about.level, value: rank.name },
    { label: copy.about.joined, value: joined },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-4xl sm:text-5xl">{copy.about.title}</h1>
      <RedThread className="mt-4" />
      <p className="mt-2 text-lg text-ink-soft">{copy.about.intro}</p>

      <div className="mt-6 rounded-[3px] bg-manila-50 p-6 shadow-folder sm:p-8">
        <div className="flex items-center gap-4 pb-2">
          <Avatar avatarId={profile.avatarId} size={72} />
          <div>
            <p className="label text-ink-soft">{copy.about.avatar}</p>
            <p className="font-display text-2xl">{avatar?.name}</p>
          </div>
        </div>
        <details className="mt-2">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-evidence-dark underline underline-offset-4">
            {copy.about.changePortrait}
          </summary>
          <fieldset className="mt-3">
            <legend className="sr-only">{copy.about.changePortrait}</legend>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {AVATARS.map((a) => {
                const on = a.id === avatar?.id;
                return (
                  <label
                    key={a.id}
                    title={a.description}
                    className={`flex min-h-11 cursor-pointer flex-col items-center gap-1 rounded-[3px] p-2 text-center text-sm transition-colors ${
                      on ? "bg-postit-light font-semibold shadow-[inset_0_0_0_2px_var(--color-espresso)]" : "bg-paper hover:bg-manila-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="portrait"
                      value={a.id}
                      checked={on}
                      onChange={() => {
                        actions.setAvatar(a.id);
                        setSaved(true);
                      }}
                      className="sr-only"
                    />
                    <Avatar avatarId={a.id} size={44} />
                    <span className="leading-tight">
                      {a.name}
                      <span className="sr-only">: {a.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <p role="status" className="mt-2 text-sm font-semibold text-desk-dark">
              {saved ? copy.about.portraitSaved : ""}
            </p>
          </fieldset>
        </details>
        <dl className="mt-6 space-y-4">
          {rows.map((r) => (
            <div key={r.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="label text-ink-soft">{r.label}</dt>
              <dd className="text-lg">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section aria-labelledby="learn-heading" className="mt-8">
        <h2 id="learn-heading" className="text-2xl">
          {copy.about.learnHeading}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Button variant="secondary" onClick={() => setShowHow(true)}>
            {copy.about.howItWorks}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              actions.resetTips();
              router.push("/home");
            }}
          >
            {copy.about.tourAgain}
          </Button>
        </div>
        <p className="mt-2 text-sm text-ink-soft">{copy.about.tourAgainHelp}</p>
      </section>

      <section aria-labelledby="settings-heading" className="mt-8">
        <h2 id="settings-heading" className="text-2xl">
          {copy.about.settingsHeading}
        </h2>
        {/* Switch for people who want less movement, on top of the device setting */}
        <button
          type="button"
          role="switch"
          aria-checked={reduceMotion}
          aria-describedby="reduce-motion-help"
          onClick={() => actions.setReduceMotion(!reduceMotion)}
          className="mt-3 flex min-h-11 w-full max-w-sm items-center justify-between gap-4 rounded-[3px] bg-paper px-4 py-2 text-left text-lg shadow-card hover:bg-manila-50"
        >
          {copy.profile.reduceMotion}
          <span aria-hidden="true" className={`rounded-[4px] px-2 text-sm font-semibold ${reduceMotion ? "bg-desk-light" : "bg-manila-100"}`}>
            {reduceMotion ? copy.profile.on : copy.profile.off}
          </span>
        </button>
        <p id="reduce-motion-help" className="mt-2 text-sm text-ink-soft">
          {copy.about.reduceMotionHelp}
        </p>
      </section>

      <div className="mt-10">
        <Button href="/home" variant="secondary">
          {copy.about.toDesk}
        </Button>
      </div>

      <HowItWorksDialog open={showHow} onClose={() => setShowHow(false)} />
    </div>
  );
}
