"use client";

import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";

const t = copy.drawer;

export type DrawerItemView = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  dueDate: string | null;
  file: { name: string; size: number } | null;
  createdAt: string;
};

function dueState(dueDate: string, now: Date = new Date()): "overdue" | "soon" | "later" {
  const due = new Date(`${dueDate}T23:59:59`);
  const days = (due.getTime() - now.getTime()) / 86_400_000;
  if (days < 0) return "overdue";
  return days <= 3 ? "soon" : "later";
}

const sizeLabel = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

/** One thing in a Drawer: its title, an optional due date, message, link and file. Used by teachers and students. */
export function DrawerItemCard({ item, fileHref, onRemove }: { item: DrawerItemView; fileHref: string; onRemove?: () => void }) {
  const state = item.dueDate ? dueState(item.dueDate) : null;
  const dateText = item.dueDate
    ? new Date(`${item.dueDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })
    : null;

  return (
    <article className="tex-paper rounded-[3px] p-4 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="text-lg font-semibold">{item.title}</h4>
        {dateText && (
          <p className={`rounded-[3px] px-2 py-0.5 text-sm font-semibold ${state === "overdue" ? "bg-evidence-light text-evidence-dark" : state === "soon" ? "bg-postit text-ink" : "bg-manila-100 text-ink"}`}>
            {t.due(dateText)}
            {state === "overdue" && ` · ${t.overdue}`}
            {state === "soon" && ` · ${t.dueSoon}`}
          </p>
        )}
      </div>
      {item.message && <p className="mt-2 whitespace-pre-line text-ink-soft">{item.message}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {item.file && (
          <a
            href={fileHref}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center rounded-[3px] bg-espresso px-4 font-semibold text-paper hover:bg-coffee"
          >
            {t.download(item.file.name)} <span className="ml-2 text-sm font-normal text-beige">({sizeLabel(item.file.size)})</span>
          </a>
        )}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline">
            {t.visit}
          </a>
        )}
        {onRemove && (
          <Button variant="ghost" onClick={onRemove}>
            {t.remove}
          </Button>
        )}
      </div>
    </article>
  );
}
