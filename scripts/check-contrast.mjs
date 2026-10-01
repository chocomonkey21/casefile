// Checks every text and background pair in the theme against WCAG AA and prints the failures.
// Run with: npm run contrast
import { readFileSync } from "node:fs";
import { blend, contrastRatio } from "../src/lib/contrast.ts";
import { PAIRS, PALETTE } from "../src/lib/theme.ts";

let failed = 0;

// 1. The palette in theme.ts must match the @theme block in globals.css
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

// 2. Every pair
const resolve = (c) => (typeof c === "string" ? PALETTE[c] : blend(PALETTE[c.color], c.alpha, PALETTE[c.over]));
const rows = PAIRS.map((p) => {
  const ratio = contrastRatio(PALETTE[p.fg], resolve(p.bg));
  return { ...p, ratio, ok: ratio >= p.min };
});
for (const r of rows) {
  if (!r.ok) {
    failed++;
    console.log(`FAIL   ${r.ratio.toFixed(2)} < ${r.min}   ${r.label}`);
  }
}
const passed = rows.filter((r) => r.ok).length;
console.log(`\n${passed} of ${rows.length} pairs pass.${failed ? ` ${failed} problem(s) found.` : " No failures."}`);
if (process.argv.includes("--all")) {
  for (const r of rows) console.log(`${r.ok ? "ok    " : "FAIL  "} ${r.ratio.toFixed(2).padStart(5)}  (min ${r.min})  ${r.label}`);
}
process.exit(failed ? 1 : 0);
