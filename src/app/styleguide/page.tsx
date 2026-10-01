import { StyleguideDemo } from "./StyleguideDemo";
import { Diagram } from "@/components/lesson/Diagrams";
import { contrastRatio } from "@/lib/contrast";
import { copy } from "@/lib/copy";
import type { DiagramId } from "@/lib/types";

const DIAGRAM_IDS: DiagramId[] = ["evap-close", "cold-glass", "four-types", "where-rain-goes", "cycle-map"];

// Internal reference page, not part of the student experience
export const metadata = { title: copy.meta.styleguide, robots: { index: false, follow: false } };

const SWATCHES = [
  { name: "Manila", hex: "#E8D9B5", use: "Folders, cards" },
  { name: "Paper cream", hex: "#FAF5E9", use: "Page background" },
  { name: "Ink", hex: "#1F1B16", use: "Text" },
  { name: "Evidence red", hex: "#C8372D", use: "String, stamps, alerts" },
  { name: "Highlighter yellow", hex: "#F6D743", use: "Hints, active states" },
  { name: "Desk navy", hex: "#22324A", use: "Nav bar, contrast sections" },
  { name: "Sage", hex: "#2F6B4A", use: "Right answers, solved" },
];

// Text/background pairs we actually use, checked against WCAG AA (4.5 for normal text)
const PAIRS = [
  { label: "Ink on paper", fg: "#1F1B16", bg: "#FAF5E9" },
  { label: "Ink on manila", fg: "#1F1B16", bg: "#E8D9B5" },
  { label: "Soft ink on paper", fg: "#453E33", bg: "#FAF5E9" },
  { label: "Muted ink on paper", fg: "#6A6050", bg: "#FAF5E9" },
  { label: "Paper on navy", fg: "#FAF5E9", bg: "#22324A" },
  { label: "Light navy text on navy", fg: "#CDD6E3", bg: "#22324A" },
  { label: "Ink on highlighter", fg: "#1F1B16", bg: "#F6D743" },
  { label: "Evidence red on paper", fg: "#C8372D", bg: "#FAF5E9" },
  { label: "Dark red on manila", fg: "#A32B22", bg: "#E8D9B5" },
  { label: "Paper on sage", fg: "#FAF5E9", bg: "#2F6B4A" },
  { label: "Highlighter on navy", fg: "#F6D743", bg: "#22324A" },
];

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6">
      <header>
        <p className="label text-evidence-dark">Internal, phase a</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">Style guide</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-soft">
          A quick place to check colours, fonts, buttons and the saved progress. Not part of the student
          experience.
        </p>
      </header>

      <section aria-labelledby="colours">
        <h2 id="colours" className="text-3xl">
          Colours
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SWATCHES.map((s) => (
            <li key={s.name} className="overflow-hidden rounded-xl border-2 border-manila-600/40 bg-paper">
              <div className="h-20" style={{ background: s.hex }} aria-hidden="true" />
              <div className="p-3">
                <p className="font-display text-lg">{s.name}</p>
                <p className="text-sm text-ink-soft">
                  {s.hex} &middot; {s.use}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="contrast">
        <h2 id="contrast" className="text-3xl">
          Contrast checks
        </h2>
        <p className="mt-2 text-ink-soft">Normal text needs 4.5 or more to pass WCAG AA. Large text needs 3.</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {PAIRS.map((p) => {
            const ratio = contrastRatio(p.fg, p.bg);
            const pass = ratio >= 4.5;
            return (
              <li
                key={p.label}
                className="flex items-center justify-between gap-3 rounded-lg border-2 border-manila-600/30 px-4 py-3"
                style={{ background: p.bg, color: p.fg }}
              >
                <span className="font-medium">{p.label}</span>
                <span className="text-sm font-semibold">
                  {ratio.toFixed(1)} : 1, {pass ? "AA pass" : "large text only"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="type">
        <h2 id="type" className="text-3xl">
          Typography
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-manila p-5">
            <p className="label text-evidence-dark">Special Elite: labels and headings</p>
            <p className="mt-2 font-display text-4xl">The Case of the Vanishing Puddle</p>
            <p className="mt-2 font-display text-xl">Case no. 017 &middot; CLUE 3 OF 5</p>
          </div>
          <div className="rounded-xl bg-paper-dark p-5">
            <p className="label text-evidence-dark">DM Sans: everything you read</p>
            <p className="mt-2 text-lg">
              The puddle did not just disappear. The sun warmed it up, and the water slipped into the air as
              a gas you cannot see. That is called evaporation.
            </p>
            <p className="mt-3 text-sm text-ink-soft">Small text, captions and hints use this too.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="diagrams">
        <h2 id="diagrams" className="text-3xl">
          Lesson diagrams
        </h2>
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {DIAGRAM_IDS.map((id) => (
            <li key={id} className="overflow-hidden rounded-xl border-2 border-manila-600/40 bg-paper">
              <Diagram id={id} alt={`Diagram: ${id}`} />
              <p className="p-2 text-sm text-ink-soft">{id}</p>
            </li>
          ))}
        </ul>
      </section>

      <StyleguideDemo />
    </div>
  );
}
