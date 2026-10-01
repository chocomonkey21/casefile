"use client";

import { useRef, type KeyboardEvent } from "react";

export type TabItem = { id: string; label: string; count?: number };

type TabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Used to link each tab to its panel: the panel needs id `${idBase}-panel-${tab.id}` */
  idBase: string;
  label: string;
};

/**
 * Folder index tabs. Follows the WAI-ARIA tabs pattern:
 * arrow keys move between tabs, Home and End jump to the ends, only the active tab is in the Tab order.
 */
export function Tabs({ tabs, value, onChange, idBase, label }: TabsProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="-mb-[2px] flex gap-1 overflow-x-auto px-1 pt-1">
      {tabs.map((tab, i) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[tab.id] = el;
            }}
            role="tab"
            type="button"
            id={`${idBase}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idBase}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative min-h-11 shrink-0 rounded-t-xl border-2 border-b-0 px-2.5 font-display text-sm uppercase tracking-wide transition-colors sm:px-6 sm:text-base sm:tracking-wider ${
              selected
                ? "z-10 border-manila-600/60 bg-manila-50 text-ink"
                : "border-manila-600/30 bg-manila-400 text-ink hover:bg-manila-500/60"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 hidden rounded-full bg-ink/10 px-2 py-0.5 font-sans text-xs font-semibold tracking-normal sm:inline">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
