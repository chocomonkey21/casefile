"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { FolderCard } from "@/components/case/FolderCard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { AVATARS } from "@/data/avatars";
import { getCase } from "@/data/cases";
import { GRADES, INTERESTS } from "@/data/interests";
import { RANKS } from "@/data/ranks";
import { copy } from "@/lib/copy";
import { caseStatus, solvedCount } from "@/lib/progress";
import { actions, useCaseFile } from "@/lib/store";
import type { AvatarId, Grade } from "@/lib/types";
import { HowItWorks } from "./HowItWorks";

const PRACTICE_CASE_ID = "sock";
const t = copy.onboarding;

/**
 * "Set up your profile": about you, interests, grade, then the "How CaseFile works" walkthrough,
 * then the practice case. The profile is saved when the grade step is finished.
 */
export function JoinWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [avatarId, setAvatarId] = useState<AvatarId>("magnifier");
  const [interests, setInterests] = useState<string[]>([]);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [error, setError] = useState<string | null>(null);

  const state = useCaseFile();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const nameId = useId();

  // Move keyboard and screen reader focus to the new step's heading, so the change is announced.
  // This happens after the new step has finished sliding in, because until then the old step is still on screen.
  const focusedStep = useRef(0);
  const focusHeading = () => {
    if (focusedStep.current === step) return;
    focusedStep.current = step;
    headingRef.current?.focus();
  };

  const goNext = () => {
    if (step === 0 && !name.trim()) {
      setError(t.about.nameError);
      nameRef.current?.focus();
      return;
    }
    if (step === 2) {
      if (grade === null) {
        setError(t.grade.error);
        return;
      }
      saveProfile();
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const saveProfile = () => {
    actions.setProfile({ name: name.trim(), avatarId, interests, grade: grade! });
    // Hand over the practice case by marking it as started (not as a study day)
    actions.setCaseActivity(PRACTICE_CASE_ID, new Date().toISOString());
    setError(null);
    setStep(3);
  };

  const toggleInterest = (id: string) =>
    setInterests((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  /** The walkthrough was finished: remember it and go straight into the practice case */
  const startFirstCase = () => {
    actions.markExplainerSeen();
    router.push(`/cases/${PRACTICE_CASE_ID}`);
  };

  /** The walkthrough was skipped: remember it and show the practice case step */
  const skipWalkthrough = () => {
    actions.markExplainerSeen();
    setStep(4);
  };

  const practice = getCase(PRACTICE_CASE_ID)!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="label text-evidence-dark">{t.eyebrow}</p>
      <h1 className="mt-1 text-4xl sm:text-5xl">{t.title}</h1>

      {/* Progress */}
      <ol className="mt-6 flex items-center gap-2" aria-label={t.stepsLabel}>
        {t.steps.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} aria-current={current ? "step" : undefined} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-display ${
                  done ? "border-sage bg-sage text-paper" : current ? "border-navy bg-navy text-paper" : "border-manila-600/50 bg-paper text-ink-soft"
                }`}
              >
                {done ? <CheckIcon width={18} height={18} /> : i + 1}
                <span className="sr-only">{done ? ` ${t.done}` : ""}</span>
              </span>
              <span className={`hidden text-sm font-semibold lg:block ${current ? "text-ink" : "text-ink-soft"}`}>{label}</span>
              {i < t.steps.length - 1 && <span aria-hidden="true" className="h-0.5 min-w-3 flex-1 bg-manila-600/30" />}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-manila-600/50 bg-manila-50 p-5 shadow-folder sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.18 }}
            onAnimationComplete={focusHeading}
          >
            {step === 0 && (
              <section aria-labelledby="step-heading">
                <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="text-3xl outline-none">
                  {t.about.heading}
                </h2>

                <div className="mt-5">
                  <label htmlFor={nameId} className="text-lg font-semibold">
                    {t.about.nameLabel}
                  </label>
                  <input
                    id={nameId}
                    ref={nameRef}
                    value={name}
                    maxLength={20}
                    autoComplete="off"
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(null);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && goNext()}
                    aria-describedby={`${nameId}-help`}
                    aria-invalid={error ? true : undefined}
                    className="mt-1 block min-h-12 w-full max-w-sm rounded-lg border-2 border-manila-600/60 bg-paper px-4 text-lg"
                    placeholder={t.about.namePlaceholder}
                  />
                  <p id={`${nameId}-help`} className="mt-1 text-sm text-ink-soft">
                    {t.about.nameHelp}
                  </p>
                  {error && (
                    <p role="alert" className="mt-2 font-semibold text-evidence-dark">
                      {error}
                    </p>
                  )}
                </div>

                <fieldset className="mt-6">
                  <legend className="text-lg font-semibold">{t.about.avatarLegend}</legend>
                  <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {AVATARS.map((a) => {
                      const on = a.id === avatarId;
                      return (
                        <label
                          key={a.id}
                          className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 p-2 text-center text-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
                            on ? "border-navy bg-highlighter-light" : "border-manila-600/40 bg-paper hover:border-navy"
                          }`}
                        >
                          <input
                            type="radio"
                            name="avatar"
                            value={a.id}
                            checked={on}
                            onChange={() => setAvatarId(a.id)}
                            className="sr-only"
                          />
                          <Avatar avatarId={a.id} size={52} />
                          <span className="leading-tight">{a.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Live preview of the profile */}
                <div className="mt-6 flex items-center gap-4 rounded-xl border-2 border-dashed border-manila-600/60 bg-paper p-4">
                  <Avatar avatarId={avatarId} size={56} />
                  <div>
                    <p className="label text-ink-soft">{t.about.previewLabel}</p>
                    <p className="font-display text-2xl">{name.trim() || t.about.previewEmpty}</p>
                    <p className="text-sm text-ink-soft">{copy.level.label(RANKS[0].name)}</p>
                  </div>
                </div>
              </section>
            )}

            {step === 1 && (
              <section aria-labelledby="step-heading">
                <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="text-3xl outline-none">
                  {t.interests.heading}
                </h2>
                <p className="mt-2 text-lg text-ink-soft">{t.interests.text}</p>
                <fieldset className="mt-5">
                  <legend className="sr-only">{t.interests.legend}</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {INTERESTS.map((i) => {
                      const on = interests.includes(i.id);
                      return (
                        <label
                          key={i.id}
                          className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 px-4 font-semibold has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
                            on ? "border-navy bg-navy text-paper" : "border-manila-600/50 bg-paper hover:border-navy"
                          }`}
                        >
                          <input type="checkbox" checked={on} onChange={() => toggleInterest(i.id)} className="sr-only" />
                          {on && <CheckIcon width={16} height={16} />}
                          {i.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
                  {interests.length === 0 ? t.interests.none : t.interests.picked(interests.length)}
                </p>
              </section>
            )}

            {step === 2 && (
              <section aria-labelledby="step-heading">
                <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="text-3xl outline-none">
                  {t.grade.heading}
                </h2>
                <p className="mt-2 text-lg text-ink-soft">{t.grade.text}</p>
                <fieldset className="mt-5">
                  <legend className="sr-only">{t.grade.legend}</legend>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {GRADES.map((g) => {
                      const on = grade === g;
                      return (
                        <label
                          key={g}
                          className={`flex min-h-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 text-center has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
                            on ? "border-navy bg-highlighter" : "border-manila-600/50 bg-paper hover:border-navy"
                          }`}
                        >
                          <input
                            type="radio"
                            name="grade"
                            value={g}
                            checked={on}
                            onChange={() => {
                              setGrade(g);
                              setError(null);
                            }}
                            className="sr-only"
                          />
                          <span className="label text-ink-soft">{t.grade.word}</span>
                          <span className="font-display text-3xl">{g}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                {error && (
                  <p role="alert" className="mt-3 font-semibold text-evidence-dark">
                    {error}
                  </p>
                )}
              </section>
            )}

            {step === 3 && <HowItWorks variant="wizard" onFinish={startFirstCase} onSkip={skipWalkthrough} />}

            {step === 4 && (
              <section aria-labelledby="step-heading">
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar avatarId={avatarId} size={72} />
                  <div className="min-w-0 flex-1">
                    <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="text-3xl outline-none">
                      {t.first.heading(name.trim())}
                    </h2>
                    <p className="mt-1 text-lg text-ink-soft">{t.first.sub}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl">{t.first.caseHeading}</h3>
                  <p className="mt-1 max-w-prose text-lg text-ink-soft">{t.first.caseText}</p>
                  <div className="mt-5 grid items-start gap-6 sm:grid-cols-2">
                    <FolderCard caseDef={practice} status={caseStatus(practice, state)} solved={solvedCount(practice, state)} />
                    <div className="space-y-3">
                      <Button href={`/cases/${practice.id}`} size="lg" variant="highlight">
                        {t.first.start}
                      </Button>
                      <p>
                        <Link href="/desk" className="inline-flex min-h-11 items-center font-semibold text-navy underline underline-offset-4">
                          {t.first.toDesk}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-manila-600/40 pt-5">
            {step === 0 ? (
              <Button href="/" variant="ghost">
                {t.backHome}
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setError(null);
                  setStep(step - 1);
                }}
              >
                {copy.common.back}
              </Button>
            )}
            <Button size="lg" onClick={goNext}>
              {step === 1 && interests.length === 0 ? copy.common.skip : copy.common.next}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
