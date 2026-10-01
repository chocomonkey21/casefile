"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { HowItWorksDialog } from "@/components/onboarding/HowItWorksDialog";
import { Avatar } from "@/components/ui/Avatar";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { copy } from "@/lib/copy";
import { currentStreak, levelFor } from "@/lib/progress";
import { actions, useCaseFile } from "@/lib/store";

/**
 * Avatar button that opens a small menu: About me, How CaseFile works, My progress, Reduce motion,
 * and Log out (separated, last). Closes on Escape, outside click or after choosing something.
 */
export function ProfileMenu() {
  const router = useRouter();
  const state = useCaseFile();
  const { profile, reduceMotion } = state;
  const { rank } = levelFor(state);
  const days = currentStreak(state.streak);
  const [open, setOpen] = useState(false);
  const [confirmLogOut, setConfirmLogOut] = useState(false);
  const [showHow, setShowHow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemClass = "block w-full rounded-[3px] px-4 py-2 text-left text-base text-ink hover:bg-manila-100";

  const logOut = () => {
    // Clear everything saved on this device, then go back to the landing page as a brand new visitor
    actions.logOut();
    setConfirmLogOut(false);
    router.push("/");
  };

  return (
    <>
      <div ref={wrapRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={copy.profile.menuLabel(profile?.name)}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full"
        >
          <Avatar avatarId={profile?.avatarId ?? null} size={40} />
        </button>

        {open && (
          <div
            id={menuId}
            className="tex-paper absolute right-0 top-full z-50 mt-2 w-72 rounded-[3px] p-2 text-ink shadow-folder"
          >
            <div className="px-4 pb-2 pt-1">
              <p className="font-display text-lg">{profile ? profile.name : copy.profile.guest}</p>
              <p className="text-sm text-ink-soft">{copy.level.label(rank.name)}</p>
              <p className="text-sm text-ink-soft">{copy.level.streak(days)}</p>
            </div>
            <div className="pt-1">
              {profile ? (
                <Link href="/about" className={itemClass} onClick={() => setOpen(false)}>
                  {copy.profile.aboutMe}
                </Link>
              ) : (
                <Link href="/join" className={itemClass} onClick={() => setOpen(false)}>
                  {copy.profile.setUp}
                </Link>
              )}
              <button
                type="button"
                className={itemClass}
                onClick={() => {
                  setOpen(false);
                  setShowHow(true);
                }}
              >
                {copy.profile.howItWorks}
              </button>
              <Link href="/lab" className={itemClass} onClick={() => setOpen(false)}>
                {copy.profile.myProgress}
              </Link>
              {/* Switch for people who want less movement, on top of the device setting */}
              <button
                type="button"
                role="switch"
                aria-checked={reduceMotion}
                className={`${itemClass} flex items-center justify-between gap-4`}
                onClick={() => actions.setReduceMotion(!reduceMotion)}
              >
                {copy.profile.reduceMotion}
                <span
                  aria-hidden="true"
                  className={`rounded-[4px] px-2 text-sm font-semibold ${reduceMotion ? " bg-desk-light" : " bg-paper"}`}
                >
                  {reduceMotion ? copy.profile.on : copy.profile.off}
                </span>
              </button>
              {profile && (
                <>
                  <hr className="my-2" />
                  <button
                    type="button"
                    className={`${itemClass} font-semibold text-evidence-dark`}
                    onClick={() => {
                      setOpen(false);
                      setConfirmLogOut(true);
                    }}
                  >
                    {copy.profile.logOut}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmLogOut}
        title={copy.profile.logOutTitle}
        text={copy.profile.logOutText}
        cancelLabel={copy.profile.logOutCancel}
        confirmLabel={copy.profile.logOutConfirm}
        onCancel={() => {
          setConfirmLogOut(false);
          buttonRef.current?.focus();
        }}
        onConfirm={logOut}
      />
      <HowItWorksDialog
        open={showHow}
        onClose={() => {
          setShowHow(false);
          buttonRef.current?.focus();
        }}
      />
    </>
  );
}
