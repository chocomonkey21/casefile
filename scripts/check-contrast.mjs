// Checks every text and background pair in the theme against WCAG AA and prints the failures.
// Run with: npm run contrast        (add --all to print every row)
//
// Three passes:
//   1. flat      the colours as defined
//   2. textured  under the darkest part of the texture overlay, with typewriter ink at its lightest
//   3. stamps    rubber stamp ink at its lightest, pressed into paper
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { blend, contrastRatio } from "../src/lib/contrast.ts";
import { INK_DENSITY, OVERLAYS, PAIRS, PALETTE, STAMP_CHECKS, overlayFor } from "../src/lib/theme.ts";

const showAll = process.argv.includes("--all");
let failed = 0;
const rows = [];

// 0. The palette in theme.ts must match the @theme block in globals.css
const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
for (const [name, hex] of Object.entries(PALETTE)) {
  const m = css.match(new RegExp(`--color-${name}:[ \t]*(#[0-9a-fA-F]{6})`));
  if (!m) {
    console.log(`DRIFT  --color-${name} is missing from globals.css`);
    failed++;
  } else if (m[1].toLowerCase() !== hex.toLowerCase()) {
    console.log(`DRIFT  --color-${name} is ${m[1]} in globals.css but ${hex} in theme.ts`);
    failed++;
  }
}

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const rgbToHex = (rgb) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

/** Multiply blend, layer by layer, the way the browser composites the ::after overlay */
function underOverlay(hex, overlay) {
  let rgb = hexToRgb(hex);
  for (const layer of OVERLAYS[overlay]) {
    rgb = rgb.map((c, i) => c * (1 - layer.alpha + (layer.alpha * layer.rgb[i]) / 255));
  }
  return rgbToHex(rgb);
}

const resolve = (c) => (typeof c === "string" ? PALETTE[c] : blend(PALETTE[c.color], c.alpha, PALETTE[c.over]));
const baseName = (c) => (typeof c === "string" ? c : c.color);

function record(pass, label, ratio, min) {
  const ok = ratio >= min;
  if (!ok) failed++;
  rows.push({ pass, label, ratio, min, ok });
}

// 1. Flat
for (const p of PAIRS) record("flat", p.label, contrastRatio(PALETTE[p.fg], resolve(p.bg)), p.min);

// 2. Textured: the overlay is multiplied over the text and the paper alike, and typewriter ink is
//    at its lightest coverage. Interface parts (3:1 pairs) are not text, so they skip the ink filter.
for (const p of PAIRS) {
  const overlay = overlayFor(baseName(p.bg));
  if (!overlay) continue;
  const bg = underOverlay(resolve(p.bg), overlay);
  let fg = underOverlay(PALETTE[p.fg], overlay);
  if (p.min === 4.5) fg = blend(fg, INK_DENSITY.type, bg);
  record("textured", `${p.label} (${overlay} grain)`, contrastRatio(fg, bg), p.min);
}

// 3. Stamps
for (const s of STAMP_CHECKS) {
  const overlay = overlayFor(s.on);
  const paper = overlay ? underOverlay(PALETTE[s.on], overlay) : PALETTE[s.on];
  const ink = blend(overlay ? underOverlay(PALETTE[s.ink], overlay) : PALETTE[s.ink], INK_DENSITY[s.density], paper);
  record("stamps", s.label, contrastRatio(ink, paper), s.min);
}

// 4. Learning colours (ill-*) belong to lesson illustrations only, never to interface chrome
const ILLUSTRATION_FILES = [
  "src/components/lesson/Diagrams.tsx",
  "src/components/lesson/Explainer.tsx",
  "src/app/styleguide/page.tsx",
  "src/lib/theme.ts",
  "src/app/globals.css",
];
const root = fileURLToPath(new URL("..", import.meta.url));
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
for (const file of walk(join(root, "src"))) {
  const rel = relative(root, file).replaceAll("\\", "/");
  if (!/\.(tsx?|css)$/.test(rel) || ILLUSTRATION_FILES.includes(rel)) continue;
  const text = readFileSync(file, "utf8");
  const hit = text.match(/\b(?:bg|text|fill|stroke|border|from|to|via)-ill-[a-z-]+|--color-ill-/);
  if (hit) {
    failed++;
    console.log(`LEAK   ${hit[0]} in ${rel}: learning colours are for lesson illustrations only`);
  }
}

for (const r of rows) {
  if (!r.ok || showAll) {
    console.log(`${r.ok ? "ok    " : "FAIL  "} ${r.ratio.toFixed(2).padStart(5)}  (min ${r.min})  [${r.pass}] ${r.label}`);
  }
}
const passed = rows.filter((r) => r.ok).length;
console.log(`\n${passed} of ${rows.length} checks pass.${failed ? ` ${failed} problem(s) found.` : " No failures."}`);
process.exit(failed ? 1 : 0);
