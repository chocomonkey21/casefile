/** WCAG 2.x contrast ratio between two hex colours. Used by the style guide page so the numbers never go stale. */

function channel(v: number) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** The colour you see when `top` is drawn at `alpha` opacity over `bottom` (both hex). */
export function blend(top: string, alpha: number, bottom: string): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  };
  const t = parse(top);
  const u = parse(bottom);
  const out = t.map((v, i) => Math.round(v * alpha + u[i] * (1 - alpha)));
  return `#${out.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
