"use client";

import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { actions } from "@/lib/store";
import { DrawerItemCard, type DrawerItemView } from "./DrawerItemCard";

const t = copy.drawer;

type ClassView = { code: string; name: string; grade: number; teacherName: string; items: DrawerItemView[] } | { code: string; missing: true };
type Load = { status: "loading" } | { status: "error"; unavailable: boolean } | { status: "ready"; classes: ClassView[] };

/**
 * The student's Drawer on the Desk: join a class with its code, then see the files, links, notes and deadlines
 * the teacher put there. Joined class codes are saved on this device (in the profile).
 */
export function StudentDrawer({ codes }: { codes: string[] }) {
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const key = codes.join(",");

  const fetchDrawer = useCallback(async () => {
    if (!key) {
      setLoad({ status: "ready", classes: [] });
      return;
    }
    try {
      const res = await fetch(`/api/drawer?codes=${encodeURIComponent(key)}`, { cache: "no-store" });
      if (res.status === 503) return setLoad({ status: "error", unavailable: true });
      const body = (await res.json().catch(() => ({}))) as { classes?: ClassView[] };
      if (!res.ok || !body.classes) throw new Error();
      setLoad({ status: "ready", classes: body.classes });
    } catch {
      setLoad({ status: "error", unavailable: false });
    }
  }, [key]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchDrawer();
  }, [fetchDrawer]);

  // Everything with a due date first (soonest first), then the newest
  const all = load.status === "ready"
    ? load.classes.flatMap((c) => ("missing" in c ? [] : c.items.map((item) => ({ item, cls: c }))))
    : [];
  all.sort((a, b) => {
    if (a.item.dueDate && b.item.dueDate) return a.item.dueDate.localeCompare(b.item.dueDate);
    if (a.item.dueDate) return -1;
    if (b.item.dueDate) return 1;
    return b.item.createdAt.localeCompare(a.item.createdAt);
  });

  return (
    <section aria-labelledby="drawer-heading" className="mt-12">
      <h2 id="drawer-heading" className="text-2xl sm:text-3xl">
        {t.title}
      </h2>
      <p className="mt-1 max-w-prose text-ink-soft">{t.studentIntro}</p>

      <JoinClass onJoined={() => void fetchDrawer()} />

      {load.status === "loading" && <div className="mt-4 h-24 animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={t.loading} />}
      {load.status === "error" && (
        <div role="alert" className="mt-4 rounded-[3px] bg-paper-dark p-4">
          <p>{load.unavailable ? t.unavailable : t.error}</p>
          {!load.unavailable && (
            <div className="mt-2">
              <Button variant="secondary" onClick={() => { setLoad({ status: "loading" }); void fetchDrawer(); }}>
                {t.retry}
              </Button>
            </div>
          )}
        </div>
      )}
      {load.status === "ready" && (
        <>
          {load.classes.length === 0 ? (
            <p className="mt-4 text-ink-soft">{t.studentEmpty}</p>
          ) : (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.classes}>
              {load.classes.map((c) => (
                <li key={c.code} className="flex items-center gap-2 rounded-[3px] bg-manila-100 py-1 pl-3 pr-1">
                  <span className="text-sm">
                    {"missing" in c ? (
                      <>
                        <span className="font-mono">{c.code}</span> · {t.missingClass}
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">{c.name}</span> · {t.fromTeacher(c.teacherName, c.grade)}
                      </>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => actions.leaveClass(c.code)}
                    className="min-h-11 rounded-[3px] px-3 text-sm font-semibold text-evidence-dark underline underline-offset-4 hover:bg-manila-50"
                  >
                    {t.leave}
                    <span className="sr-only"> {"missing" in c ? c.code : c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {load.classes.some((c) => !("missing" in c)) && all.length === 0 && <p className="mt-4 text-ink-soft">{t.noItems}</p>}
          {all.length > 0 && (
            <ul className="mt-4 space-y-3">
              {all.map(({ item, cls }) => (
                <li key={item.id}>
                  <p className="mb-1 text-sm font-semibold text-ink-soft">{cls.name}</p>
                  <DrawerItemCard item={item} fileHref={`/api/drawer/file/${item.id}?code=${cls.code}`} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

function JoinClass({ onJoined }: { onJoined: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const id = useId();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase().replace(/[\s-]/g, "");
    if (!/^[A-HJ-NP-Z2-9]{8}$/.test(clean)) return setMessage({ ok: false, text: t.joinBad });
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/drawer/class/${clean}`, { cache: "no-store" });
      const body = (await res.json().catch(() => ({}))) as { class?: { name: string } };
      if (res.status === 429) return setMessage({ ok: false, text: t.joinTooMany });
      if (!res.ok || !body.class) return setMessage({ ok: false, text: t.joinNotFound });
      actions.joinClass(clean);
      setCode("");
      setMessage({ ok: true, text: t.joined(body.class.name) });
      onJoined();
    } catch {
      setMessage({ ok: false, text: copy.teach.errors.network });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="mt-4 flex max-w-lg flex-wrap items-end gap-3 rounded-[3px] bg-manila-100/60 p-4">
      <div className="min-w-0 flex-1">
        <label htmlFor={`${id}-code`} className="font-semibold">
          {t.join}
        </label>
        <input
          id={`${id}-code`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={12}
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          placeholder={t.joinPlaceholder}
          aria-describedby={message ? `${id}-msg` : undefined}
          className="field mt-1 block min-h-11 w-full px-3 font-mono uppercase tracking-widest"
        />
      </div>
      <Button type="submit" disabled={busy}>
        {busy ? t.joinChecking : t.joinButton}
      </Button>
      {message && (
        <p id={`${id}-msg`} role={message.ok ? "status" : "alert"} className={`w-full font-semibold ${message.ok ? "text-desk-dark" : "text-evidence-dark"}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}
