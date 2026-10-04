"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { RedThread } from "@/components/ui/RedThread";
import { boardLabel, GRADES } from "@/lib/access";
import { copy } from "@/lib/copy";
import { actions } from "@/lib/store";
import type { DrawerItem, TeacherPublic } from "@/lib/teach/types";
import type { Grade } from "@/lib/types";
import { DrawerItemCard } from "@/components/drawer/DrawerItemCard";

const t = copy.drawer;

type ClassRow = { code: string; name: string; grade: Grade; board: string; itemCount: number };
type Load = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; teacher: TeacherPublic; classes: ClassRow[] };

/**
 * The Desk for a signed-in teacher: their classes, each with a code to give students, and the Drawer for each
 * class, where they add files, links, notes and deadlines. Everything is saved on the server (lib/teach/store.ts).
 */
export function TeacherDesk() {
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [selected, setSelected] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/teach/me", { cache: "no-store" });
      const body = (await res.json().catch(() => ({}))) as { teacher?: TeacherPublic; classes?: ClassRow[]; error?: string };
      if (res.status === 401) {
        // The session ended (expired or signed out elsewhere): forget the teacher on this device
        actions.clearTeacher();
        return;
      }
      if (!res.ok || !body.teacher) {
        setLoad({ status: "error", message: body.error === "no-secret" || body.error === "no-storage" ? t.unavailable : t.error });
        return;
      }
      setLoad({ status: "ready", teacher: body.teacher, classes: body.classes ?? [] });
    } catch {
      setLoad({ status: "error", message: t.error });
    }
  }, []);

  useEffect(() => {
    // Load once on arrival; refresh() only sets state after the request finishes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  if (load.status === "loading") {
    return <div className="mx-auto mt-10 h-72 max-w-4xl animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={t.loading} />;
  }
  if (load.status === "error") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div role="alert" className="rounded-[3px] bg-paper-dark p-6">
          <p className="font-semibold">{load.message}</p>
          <div className="mt-4">
            <Button onClick={() => { setLoad({ status: "loading" }); void refresh(); }}>{t.retry}</Button>
          </div>
        </div>
      </div>
    );
  }

  const { teacher, classes } = load;
  const current = classes.find((c) => c.code === selected) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <header>
        <p className="label text-evidence-dark">{copy.teach.roleLine(boardLabel(teacher.board as "cbse" | "icse"))}</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{copy.teach.welcome(teacher.name)}</h1>
        <RedThread className="mt-4" />
        <p className="mt-4 max-w-prose text-lg text-ink-soft">{t.teacherIntro}</p>
        <p className="mt-2">
          <Link href="/subjects" className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline">
            {copy.teach.browse}
          </Link>
        </p>
      </header>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <section aria-labelledby="classes-heading">
          <h2 id="classes-heading" className="text-2xl sm:text-3xl">
            {t.classes}
          </h2>
          {classes.length === 0 ? (
            <p className="mt-2 text-ink-soft">{t.noClasses}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {classes.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    aria-pressed={selected === c.code}
                    onClick={() => setSelected(c.code)}
                    className={`tex-paper flex min-h-11 w-full flex-wrap items-baseline justify-between gap-2 rounded-[3px] p-4 text-left shadow-card transition-colors ${
                      selected === c.code ? "shadow-[inset_0_0_0_2px_var(--color-espresso)]" : "hover:bg-manila-50"
                    }`}
                  >
                    <span>
                      <span className="block text-lg font-semibold">{c.name}</span>
                      <span className="text-sm text-ink-soft">
                        {copy.grades.label(c.grade)} · {t.items(c.itemCount)}
                      </span>
                    </span>
                    <span className="font-mono text-lg tracking-widest" aria-label={`${t.code} ${c.code.split("").join(" ")}`}>
                      {c.code}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <NewClassForm
            onCreated={(code) => {
              setSelected(code);
              void refresh();
            }}
          />
        </section>

        <section aria-labelledby="drawer-heading" className="min-w-0">
          <h2 id="drawer-heading" className="text-2xl sm:text-3xl">
            {t.title}
          </h2>
          {current ? (
            <ClassDrawer
              key={current.code}
              cls={current}
              onChanged={() => void refresh()}
              onDeleted={() => {
                setSelected(null);
                void refresh();
              }}
            />
          ) : (
            <p className="mt-2 text-ink-soft">{classes.length ? t.pickClass : t.noClasses}</p>
          )}
        </section>
      </div>

      <DeleteAccount />
    </div>
  );
}

/** Teachers can delete their own account and everything in it (see the privacy policy) */
function DeleteAccount() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const remove = async () => {
    setOpen(false);
    try {
      const res = await fetch("/api/teach/me", { method: "DELETE" });
      if (!res.ok) throw new Error();
      actions.clearTeacher();
      router.push("/");
    } catch {
      setFailed(true);
    }
  };
  return (
    <section aria-label={copy.teach.deleteAccount} className="mt-16 border-t border-manila-600/30 pt-6">
      <Button variant="ghost" onClick={() => setOpen(true)}>
        {copy.teach.deleteAccount}
      </Button>
      {failed && (
        <p role="alert" className="mt-2 font-semibold text-evidence-dark">
          {copy.teach.errors.generic}
        </p>
      )}
      <ConfirmDialog
        open={open}
        title={copy.teach.deleteAccountTitle}
        text={copy.teach.deleteAccountText}
        cancelLabel={t.cancel}
        confirmLabel={copy.teach.deleteAccountConfirm}
        onCancel={() => setOpen(false)}
        onConfirm={() => void remove()}
      />
    </section>
  );
}

function NewClassForm({ onCreated }: { onCreated: (code: string) => void }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<Grade>(6);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError(copy.teach.errors.name);
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/teach/classes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, grade }) });
      const body = (await res.json().catch(() => ({}))) as { class?: { code: string } };
      if (!res.ok || !body.class) return setError(copy.teach.errors.generic);
      setName("");
      onCreated(body.class.code);
    } catch {
      setError(copy.teach.errors.network);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="mt-6 rounded-[3px] bg-manila-100/60 p-4">
      <h3 className="text-xl">{t.newClass}</h3>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <div className="min-w-[14rem] flex-1">
          <label htmlFor={`${id}-name`} className="font-semibold">
            {t.className}
          </label>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder={t.classNamePlaceholder} className="field mt-1 block min-h-11 w-full px-3" />
        </div>
        <div>
          <label htmlFor={`${id}-grade`} className="font-semibold">
            {t.classGrade}
          </label>
          <select id={`${id}-grade`} value={grade} onChange={(e) => setGrade(Number(e.target.value) as Grade)} className="field mt-1 block min-h-11 px-3">
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {copy.grades.label(g)}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? copy.teach.working : t.createClass}
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-2 font-semibold text-evidence-dark">
          {error}
        </p>
      )}
    </form>
  );
}

function ClassDrawer({ cls, onChanged, onDeleted }: { cls: ClassRow; onChanged: () => void; onDeleted: () => void }) {
  const [items, setItems] = useState<DrawerItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadItems = useCallback(async () => {
    try {
      const res = await fetch(`/api/teach/classes/${cls.code}`, { cache: "no-store" });
      const body = (await res.json().catch(() => ({}))) as { items?: DrawerItem[] };
      if (!res.ok || !body.items) throw new Error();
      setItems(body.items);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [cls.code]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadItems();
  }, [loadItems]);

  const remove = async (id: string) => {
    await fetch(`/api/teach/items/${id}`, { method: "DELETE" });
    await loadItems();
    onChanged();
  };

  const deleteClass = async () => {
    setConfirm(false);
    await fetch(`/api/teach/classes/${cls.code}`, { method: "DELETE" });
    onDeleted();
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(cls.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the code is on screen to copy by hand
    }
  };

  return (
    <div className="mt-4">
      <div className="tex-postit rounded-[3px] p-5 shadow-card">
        <p className="label text-ink">{t.code}</p>
        <p className="mt-1 font-mono text-3xl tracking-[0.3em]">{cls.code}</p>
        <p className="mt-1 text-sm">{t.codeHelp}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={copyCode}>
            <span aria-live="polite">{copied ? t.copied : t.copyCode}</span>
          </Button>
          <Button variant="ghost" onClick={() => setConfirm(true)}>
            {t.deleteClass}
          </Button>
        </div>
      </div>

      <AddItemForm
        code={cls.code}
        onAdded={() => {
          void loadItems();
          onChanged();
        }}
      />

      <div className="mt-6">
        {failed ? (
          <div role="alert" className="rounded-[3px] bg-paper-dark p-4">
            <p>{t.error}</p>
            <Button variant="secondary" onClick={() => void loadItems()}>
              {t.retry}
            </Button>
          </div>
        ) : items === null ? (
          <div className="h-24 animate-pulse rounded-[3px] bg-manila/60" aria-busy="true" aria-label={t.loading} />
        ) : items.length === 0 ? (
          <p className="text-ink-soft">{t.empty}</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <DrawerItemCard item={item} fileHref={`/api/drawer/file/${item.id}`} onRemove={() => void remove(item.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={confirm}
        title={t.deleteClassTitle}
        text={t.deleteClassText}
        cancelLabel={t.cancel}
        confirmLabel={t.confirmDelete}
        onCancel={() => setConfirm(false)}
        onConfirm={() => void deleteClass()}
      />
    </div>
  );
}

function AddItemForm({ code, onAdded }: { code: string; onAdded: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set("classCode", code);
    if (!String(form.get("title") ?? "").trim()) return setError(t.itemErrors.title);
    const file = form.get("file");
    if (file instanceof File && file.size > 4 * 1024 * 1024) return setError(t.itemErrors["too-big"]);
    setBusy(true);
    setError(null);
    setDone(false);
    try {
      const res = await fetch("/api/teach/items", { method: "POST", body: form });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) return setError(t.itemErrors[body.error ?? "generic"] ?? t.itemErrors.generic);
      formRef.current?.reset();
      setDone(true);
      onAdded();
    } catch {
      setError(copy.teach.errors.network);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="mt-6 space-y-4 rounded-[3px] bg-manila-100/60 p-4">
      <h3 className="text-xl">{t.addItem}</h3>
      <div>
        <label htmlFor={`${id}-title`} className="font-semibold">
          {t.itemTitle}
        </label>
        <input id={`${id}-title`} name="title" maxLength={120} placeholder={t.itemTitlePlaceholder} className="field mt-1 block min-h-11 w-full px-3" />
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="font-semibold">
          {t.message}
        </label>
        <textarea id={`${id}-message`} name="message" maxLength={2000} rows={3} className="field mt-1 block w-full px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-link`} className="font-semibold">
            {t.link}
          </label>
          <input id={`${id}-link`} name="link" type="url" inputMode="url" placeholder="https://" className="field mt-1 block min-h-11 w-full px-3" />
        </div>
        <div>
          <label htmlFor={`${id}-due`} className="font-semibold">
            {t.dueDate}
          </label>
          <input id={`${id}-due`} name="dueDate" type="date" className="field mt-1 block min-h-11 w-full px-3" />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-file`} className="font-semibold">
          {t.file}
        </label>
        <input
          id={`${id}-file`}
          name="file"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.docx,.pptx,.txt"
          aria-describedby={`${id}-file-help`}
          className="mt-1 block min-h-11 w-full text-base file:mr-3 file:min-h-11 file:rounded-[3px] file:border-0 file:bg-manila file:px-4 file:font-semibold"
        />
        <p id={`${id}-file-help`} className="mt-1 text-sm text-ink-soft">
          {t.fileHelp}
        </p>
      </div>
      {error && (
        <p role="alert" className="font-semibold text-evidence-dark">
          {error}
        </p>
      )}
      {done && (
        <p role="status" className="font-semibold text-desk-dark">
          {t.added}
        </p>
      )}
      <Button type="submit" disabled={busy}>
        {busy ? copy.teach.working : t.add}
      </Button>
    </form>
  );
}
