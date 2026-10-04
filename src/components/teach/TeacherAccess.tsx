"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { BOARDS, boardLabel } from "@/lib/access";
import { copy } from "@/lib/copy";
import { actions } from "@/lib/store";
import type { TeacherPublic } from "@/lib/teach/types";
import type { Board } from "@/lib/types";

const t = copy.teach;

/**
 * Teacher sign-up and sign-in, shown on /join when "Teacher" is chosen.
 * The server checks everything and sets an httpOnly session cookie; this only shows the forms and the result.
 */
export function TeacherAccess() {
  const router = useRouter();
  const [mode, setMode] = useState<"signUp" | "signIn">("signUp");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [board, setBoard] = useState<Board | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "signUp") {
      if (!name.trim()) return setError(t.errors.name);
      if (!/^[a-z0-9_.-]{3,30}$/.test(username.trim().toLowerCase())) return setError(t.errors.username);
      if (password.length < 10) return setError(t.errors.password);
      if (!board) return setError(t.errors.board);
    }
    setBusy(true);
    try {
      const res = await fetch(mode === "signUp" ? "/api/teach/signup" : "/api/teach/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "signUp" ? { name, username, password, board } : { username, password }),
      });
      const body = (await res.json().catch(() => ({}))) as { teacher?: TeacherPublic; error?: string };
      if (!res.ok || !body.teacher) {
        setError(t.errors[body.error ?? "generic"] ?? t.errors.generic);
        return;
      }
      actions.setTeacher(body.teacher);
      router.push("/desk");
    } catch {
      setError(t.errors.network);
    } finally {
      setBusy(false);
    }
  };

  const tab = (m: "signUp" | "signIn") =>
    `min-h-11 flex-1 rounded-[3px] px-4 font-semibold transition-colors ${mode === m ? "bg-espresso text-paper" : "bg-paper text-ink hover:bg-manila-50"}`;

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-[3px] bg-manila-50 p-6 shadow-folder sm:p-8">
      <p className="label text-evidence-dark">{t.eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-1 text-3xl">
        {t.title}
      </h2>
      <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>

      <div role="group" aria-label={t.title} className="mt-6 flex max-w-md gap-2">
        <button type="button" aria-pressed={mode === "signUp"} className={tab("signUp")} onClick={() => { setMode("signUp"); setError(null); }}>
          {t.tabs.signUp}
        </button>
        <button type="button" aria-pressed={mode === "signIn"} className={tab("signIn")} onClick={() => { setMode("signIn"); setError(null); }}>
          {t.tabs.signIn}
        </button>
      </div>

      <form onSubmit={submit} noValidate className="mt-6 max-w-md space-y-5">
        {mode === "signUp" && (
          <div>
            <label htmlFor={`${id}-name`} className="text-lg font-semibold">
              {t.name}
            </label>
            <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="name" className="field mt-1 block min-h-12 w-full px-4 text-lg" />
          </div>
        )}
        <div>
          <label htmlFor={`${id}-user`} className="text-lg font-semibold">
            {t.username}
          </label>
          <input
            id={`${id}-user`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={30}
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            aria-describedby={mode === "signUp" ? `${id}-user-help` : undefined}
            className="field mt-1 block min-h-12 w-full px-4 text-lg"
          />
          {mode === "signUp" && (
            <p id={`${id}-user-help`} className="mt-1 text-sm text-ink-soft">
              {t.usernameHelp}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-pass`} className="text-lg font-semibold">
            {t.password}
          </label>
          <input
            id={`${id}-pass`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={200}
            autoComplete={mode === "signUp" ? "new-password" : "current-password"}
            aria-describedby={mode === "signUp" ? `${id}-pass-help` : undefined}
            className="field mt-1 block min-h-12 w-full px-4 text-lg"
          />
          {mode === "signUp" && (
            <p id={`${id}-pass-help`} className="mt-1 text-sm text-ink-soft">
              {t.passwordHelp}
            </p>
          )}
        </div>
        {mode === "signUp" && (
          <fieldset>
            <legend className="text-lg font-semibold">{t.board}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {BOARDS.map((b) => (
                <label
                  key={b}
                  className={`flex min-h-12 cursor-pointer items-center justify-center rounded-[3px] font-display text-xl transition-colors ${
                    board === b ? "bg-postit shadow-[inset_0_0_0_2px_var(--color-espresso)]" : "bg-paper hover:bg-manila-50"
                  }`}
                >
                  <input type="radio" name={`${id}-board`} value={b} checked={board === b} onChange={() => setBoard(b)} className="sr-only" />
                  {boardLabel(b)}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {error && (
          <p role="alert" className="font-semibold text-evidence-dark">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? t.working : mode === "signUp" ? t.create : t.signIn}
        </Button>
        {mode === "signUp" && (
          <p className="text-sm text-ink-soft">
            {t.privacy}{" "}
            <Link href="/privacy" className="font-semibold underline underline-offset-4">
              {copy.privacy.linkLabel}
            </Link>
          </p>
        )}
      </form>
    </section>
  );
}
