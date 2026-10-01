import { StyleguideDemo } from "./StyleguideDemo";
import { StatusStamp } from "@/components/case/StatusStamp";
import { Stamp } from "@/components/ui/Stamp";
import { Diagram } from "@/components/lesson/Diagrams";
import { blend, contrastRatio } from "@/lib/contrast";
import { copy } from "@/lib/copy";
import { PAIRS, PALETTE, type Backdrop, type ColorName } from "@/lib/theme";
import type { DiagramId } from "@/lib/types";

const DIAGRAM_IDS: DiagramId[] = ["evap-close", "cold-glass", "four-types", "where-rain-goes", "cycle-map"];

// Internal reference page, not part of the student experience
export const metadata = { title: copy.meta.styleguide, robots: { index: false, follow: false } };

const SWATCHES: { name: string; token: ColorName; use: string }[] = [
  { name: "Walnut", token: "walnut", use: "Page backdrop only" },
  { name: "Espresso", token: "espresso", use: "Top nav, deepest areas" },
  { name: "Coffee", token: "coffee", use: "Raised dark surfaces" },
  { name: "Paper cream", token: "paper", use: "Folders, lesson pages, cards" },
  { name: "Light beige", token: "beige", use: "Accents, text on dark" },
  { name: "Manila", token: "manila", use: "Folder body" },
  { name: "Post-it yellow", token: "postit", use: "Hints, sticky notes, highlights" },
  { name: "Evidence red", token: "evidence", use: "String, stamps, alerts" },
  { name: "Ink", token: "ink", use: "Text on paper" },
  { name: "Desk green", token: "desk", use: "Right answers, solved" },
  { name: "Brass", token: "brass", use: "Pins and clip hardware" },
];

const resolveBackdrop = (bg: Backdrop) =>
  typeof bg === "string" ? PALETTE[bg] : blend(PALETTE[bg.color], bg.alpha, PALETTE[bg.over]);

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6">
      <header>
        <p className="label text-evidence-dark">Internal</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">Style guide</h1>
        <p className="mt-4 max-w-prose text-lg text-ink-soft">
          A quick place to check colours, fonts, buttons and the saved progress. Not part of the student
          experience.
        </p>
      </header>

      <section aria-labelledby="colours">
        <h2 id="colours" className="text-3xl">
          Colours
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SWATCHES.map((s) => (
            <li key={s.name} className="overflow-hidden rounded-[3px] bg-paper">
              <div className="h-20" style={{ background: PALETTE[s.token] }} aria-hidden="true" />
              <div className="p-4">
                <p className="font-display text-lg">{s.name}</p>
                <p className="text-sm text-ink-soft">
                  {PALETTE[s.token]} &middot; {s.use}
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
        <p className="mt-2 text-ink-soft">
          Normal text needs 4.5 or more to pass WCAG AA. Large text and interface parts need 3. Run{" "}
          <code>npm run contrast</code> to check every pair from the terminal.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {PAIRS.map((p) => {
            const bg = resolveBackdrop(p.bg);
            const ratio = contrastRatio(PALETTE[p.fg], bg);
            const pass = ratio >= p.min;
            // Text pairs are shown as text. Pairs that are parts of the interface (3:1) are shown as a colour chip.
            const isText = p.min === 4.5;
            return (
              <li
                key={p.label}
                className="flex items-center justify-between gap-4 rounded-[3px] bg-paper-dark px-4 py-4 text-ink"
                style={isText ? { background: bg, color: PALETTE[p.fg] } : undefined}
              >
                <span className="flex items-center gap-4 font-medium">
                  {!isText && (
                    <span
                      aria-hidden="true"
                      className="inline-block h-6 w-10 shrink-0"
                      style={{ background: bg, boxShadow: `inset 0 -6px 0 ${PALETTE[p.fg]}` }}
                    />
                  )}
                  {p.label}
                </span>
                <span className="text-sm font-semibold">
                  {ratio.toFixed(1)} : 1, {pass ? "AA pass" : "fails"} (needs {p.min})
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
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[3px] bg-manila p-6">
            <p className="label text-evidence-dark">Special Elite: labels and headings</p>
            <p className="mt-2 font-display text-4xl">The Case of the Vanishing Puddle</p>
            <p className="mt-2 font-display text-xl">Case no. 017 &middot; CLUE 3 OF 5</p>
          </div>
          <div className="rounded-[3px] bg-paper-dark p-6">
            <p className="label text-evidence-dark">DM Sans: everything you read</p>
            <p className="mt-2 text-lg">
              The puddle did not just disappear. The sun warmed it up, and the water slipped into the air as
              a gas you cannot see. That is called evaporation.
            </p>
            <p className="mt-4 text-sm text-ink-soft">Small text, captions and hints use this too.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="textures">
        <h2 id="textures" className="text-3xl">
          Paper and ink
        </h2>
        <p className="mt-2 max-w-prose text-ink-soft">
          Procedural textures from <code>src/lib/textures.ts</code>, laid over the content with multiply so the type looks
          printed. Swap in scanned paper there.
        </p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          <li className="tex-paper tex-worn p-6 shadow-card">
            <p className="label text-ink-soft">tex-paper tex-worn</p>
            <p className="mt-2 font-display text-2xl">Loose paper</p>
            <p className="mt-2 text-ink-soft">Fine fibres and a faint handled tone.</p>
          </li>
          <li className="tex-manila tex-worn tex-crease p-6 shadow-folder">
            <p className="label text-ink-soft">tex-manila tex-crease</p>
            <p className="mt-2 font-display text-2xl">Folder card</p>
            <p className="mt-2 text-ink-soft">Rougher grain and short fibres.</p>
          </li>
          <li className="tex-postit -rotate-1 p-6 shadow-card">
            <p className="label text-ink-soft">tex-postit</p>
            <p className="mt-2 font-display text-2xl">Sticky note</p>
            <p className="mt-2 text-ink-soft">Smooth, with a glue strip at the top.</p>
          </li>
        </ul>
        <div className="tex-paper mt-6 flex flex-wrap items-center gap-6 p-6 shadow-card">
          <Stamp tone="red" size="lg" rotate={-6}>
            Case closed
          </Stamp>
          <Stamp tone="desk" size="md" rotate={-4}>
            Solved
          </Stamp>
          <StatusStamp status="open" />
          <StatusStamp status="cold" />
        </div>
      </section>

      <section aria-labelledby="learning-colours">
        <h2 id="learning-colours" className="text-3xl">
          Learning colours
        </h2>
        <p className="mt-2 max-w-prose text-ink-soft">
          Real-world colours for lesson diagrams only, so water reads as water. The interface never uses them, and{" "}
          <code>npm run contrast</code> fails if one leaks out.
        </p>
        <ul className="mt-6 flex flex-wrap gap-4">
          {(Object.keys(PALETTE) as ColorName[])
            .filter((n) => n.startsWith("ill-"))
            .map((n) => (
              <li key={n} className="w-28 text-sm">
                <span aria-hidden="true" className="block h-12 shadow-card" style={{ background: PALETTE[n] }} />
                <span className="mt-1 block font-semibold">{n.replace("ill-", "")}</span>
                <span className="block text-ink-soft">{PALETTE[n]}</span>
              </li>
            ))}
        </ul>
      </section>

      <section aria-labelledby="diagrams">
        <h2 id="diagrams" className="text-3xl">
          Lesson diagrams
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {DIAGRAM_IDS.map((id) => (
            <li key={id} className="overflow-hidden rounded-[3px] bg-paper">
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
