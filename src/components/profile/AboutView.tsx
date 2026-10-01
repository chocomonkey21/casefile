"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { AVATARS } from "@/data/avatars";
import { INTERESTS } from "@/data/interests";
import { copy } from "@/lib/copy";
import { levelFor } from "@/lib/progress";
import { useCaseFile, useHydrated } from "@/lib/store";
import { RedThread } from "@/components/ui/RedThread";

/** A read-only page with what the student told us during onboarding, plus their current level. */
export function AboutView() {
  const state = useCaseFile();
  const hydrated = useHydrated();

  if (!hydrated) {
    return <div className="mx-auto mt-10 h-64 max-w-2xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={copy.about.loading} />;
  }

  const { profile, joinedAt } = state;

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
  const avatar = AVATARS.find((a) => a.id === profile.avatarId);
  const interests = INTERESTS.filter((i) => profile.interests.includes(i.id)).map((i) => i.label);
  const joined = joinedAt
    ? new Date(joinedAt).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })
    : copy.about.notRecorded;

  const rows: { label: string; value: string }[] = [
    { label: copy.about.name, value: profile.name },
    { label: copy.about.grade, value: copy.about.gradeValue(profile.grade) },
    { label: copy.about.interests, value: interests.length ? interests.join(", ") : copy.about.noInterests },
    { label: copy.about.level, value: rank.name },
    { label: copy.about.joined, value: joined },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-4xl sm:text-5xl">{copy.about.title}</h1>
<RedThread className="mt-4" />
      <p className="mt-2 text-lg text-ink-soft">{copy.about.intro}</p>

      <div className="mt-6 rounded-[3px] bg-manila-50 p-6 shadow-folder sm:p-8">
        <div className="flex items-center gap-4 pb-6">
          <Avatar avatarId={profile.avatarId} size={72} />
          <div>
            <p className="label text-ink-soft">{copy.about.avatar}</p>
            <p className="font-display text-2xl">{avatar?.label}</p>
          </div>
        </div>
        <dl className="mt-6 space-y-4">
          {rows.map((r) => (
            <div key={r.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="label text-ink-soft">{r.label}</dt>
              <dd className="text-lg">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6">
        <Button href="/desk" variant="secondary">
          {copy.about.toDesk}
        </Button>
      </div>
    </div>
  );
}
