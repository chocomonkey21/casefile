"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { HowItWorksDialog } from "@/components/onboarding/HowItWorksDialog";
import { Avatar } from "@/components/ui/Avatar";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { boardLabel } from "@/lib/access";
import { copy } from "@/lib/copy";
import { levelFor } from "@/lib/progress";
import { actions, useCaseFile, useHydrated } from "@/lib/store";

/**
 * Avatar button that opens a small menu: My profile, How CaseFile works, For families,
 * and Log out (separated, last). Closes on Escape, outside click or after choosing something.
 */
export function ProfileMenu() {
  const router = useRouter();
  const state = useCaseFile();
  // Before the saved profile loads, the store holds an empty default. Showing it would flash a guest “?” avatar
  // on every full page load, so a neutral placeholder is shown until then.
  const hydrated = useHydrated();
  const { profile, teacher } = state;
  const { rank } = levelFor(state);
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

  /** A teacher signs out: the server clears its session and access cookies, then the device forgets the teacher */
  const teacherSignOut = async () => {
    setOpen(false);
    try {
      await fetch("/api/teach/logout", { method: "POST" });
    } finally {
      actions.clearTeacher();
      router.push("/");
    }
  };

  const logOut = () => {
    // Clear everything saved on this device, then start onboarding again
    actions.logOut();
    setConfirmLogOut(false);
    router.push("/join");
  };

  return (
    <>
      <div ref={wrapRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={teacher ? copy.teach.menuLabel(teacher.name) : copy.profile.menuLabel(profile?.name)}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full"
        >
          {hydrated && teacher ? (
            // Teachers have no portrait: their initial on the teacher colour
            <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-postit font-display text-xl text-ink">
              {teacher.name.trim().charAt(0).toUpperCase() || "T"}
            </span>
          ) : hydrated ? (
            <Avatar avatarId={profile?.avatarId ?? null} size={40} />
          ) : (
            <span aria-hidden="true" className="inline-block h-10 w-10 animate-pulse rounded-full bg-coffee" />
          )}
        </button>

        {open && (
          <div
            id={menuId}
            className="tex-paper absolute right-0 top-full z-50 mt-2 w-72 rounded-[3px] p-2 text-ink shadow-folder"
          >
            {teacher ? (
              <div className="px-4 pb-2 pt-1">
                <p className="font-display text-lg">{teacher.name}</p>
                <p className="text-sm text-ink-soft">{copy.teach.roleLine(boardLabel(teacher.board))}</p>
              </div>
            ) : (
              <div className="px-4 pb-2 pt-1">
                <p className="font-display text-lg">{profile ? profile.name : copy.profile.guest}</p>
                <p className="text-sm text-ink-soft">{copy.level.label(rank.name)}</p>
              </div>
            )}
            <div className="pt-1">
              {teacher ? (
                <Link href="/home" className={itemClass} onClick={() => setOpen(false)}>
                  {copy.drawer.title}
                </Link>
              ) : profile ? (
                <Link href="/profile" className={itemClass} onClick={() => setOpen(false)}>
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
              <Link href="/families" className={itemClass} onClick={() => setOpen(false)}>
                {copy.profile.forFamilies}
              </Link>
              {teacher && (
                <>
                  <hr className="my-2" />
                  <button type="button" className={`${itemClass} font-semibold text-evidence-dark`} onClick={() => void teacherSignOut()}>
                    {copy.teach.signOut}
                  </button>
                </>
              )}
              {profile && !teacher && (
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
