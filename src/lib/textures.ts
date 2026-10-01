/**
 * Paper, manila and desk textures.
 *
 * Every texture in CaseFile comes from this file. Each one is drawn procedurally as a tiny SVG
 * (feTurbulence noise run through a colour matrix), so there are no image downloads.
 * layout.tsx turns them into CSS variables on <html> (`--tex-paper-grain` and so on), and
 * globals.css layers them onto surfaces.
 *
 * ── Swapping in real scans ─────────────────────────────────────────────────────────────────
 * Put the image in /public/textures/ and replace the value here with `image("/textures/name.jpg")`.
 * Scans should be greyscale, mostly white, with the grain in darker tones, because every surface
 * texture is laid over the content with `mix-blend-mode: multiply` (white disappears, darker
 * tones darken the paper and the ink together). Keep tiles seamless and around 256 to 512px.
 * After swapping, run `npm run contrast`: the overlay strength in theme.ts (OVERLAYS) is part of
 * the contrast check, so raise or lower it to match how dark the scan is.
 * ───────────────────────────────────────────────────────────────────────────────────────────
 */

type NoiseOptions = {
  width: number;
  height: number;
  /** One number, or "x y" for grain stretched in one direction (fibres, wood) */
  baseFrequency: string;
  octaves: number;
  seed: number;
  type?: "fractalNoise" | "turbulence";
  /**
   * Maps the noise to colour. RGB are fixed (the colour of the grain), and alpha is
   * `gain * noise + offset`, so only the brighter peaks of the noise leave a mark.
   */
  rgb: [number, number, number];
  gain: number;
  offset: number;
  opacity?: number;
};

function svgUrl(svg: string) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** A seamless tile of procedural noise */
function noise(o: NoiseOptions) {
  const [r, g, b] = o.rgb.map((v) => (v / 255).toFixed(3));
  const matrix = `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${o.gain} 0 0 0 ${o.offset}`;
  return svgUrl(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${o.width}' height='${o.height}'>` +
      `<filter id='n' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
      `<feTurbulence type='${o.type ?? "fractalNoise"}' baseFrequency='${o.baseFrequency}' numOctaves='${o.octaves}' seed='${o.seed}' stitchTiles='stitch'/>` +
      `<feColorMatrix values='${matrix}'/>` +
      `</filter>` +
      `<rect width='100%' height='100%' filter='url(#n)' opacity='${o.opacity ?? 1}'/>` +
      `</svg>`,
  );
}

/** For a real scanned image in /public */
export function image(path: string) {
  return `url("${path}")`;
}

/**
 * Darker, uneven edges for loose papers and folders: a soft frame pushed around by noise.
 * Stretched to the size of the element, so keep it for card-shaped things, not whole pages.
 */
function edgeWear(seed: number) {
  return svgUrl(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='none'>` +
      `<filter id='w' x='-5%' y='-5%' width='110%' height='110%'>` +
      `<feTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='3' seed='${seed}' result='t'/>` +
      `<feDisplacementMap in='SourceGraphic' in2='t' scale='22' xChannelSelector='R' yChannelSelector='G' result='d'/>` +
      `<feGaussianBlur in='d' stdDeviation='5'/>` +
      `</filter>` +
      `<rect x='2' y='2' width='396' height='296' fill='none' stroke='rgb(107,83,48)' stroke-width='8' stroke-opacity='0.3' filter='url(#w)'/>` +
      `</svg>`,
  );
}

export const TEXTURES = {
  /** Paper cream: very fine fibre grain */
  paperGrain: noise({ width: 240, height: 240, baseFrequency: "0.82", octaves: 3, seed: 2, rgb: [96, 72, 44], gain: 0.4, offset: -0.185 }),
  /** Paper cream: faint blotchy tone, like paper that has been handled */
  paperBlotch: noise({ width: 900, height: 900, baseFrequency: "0.0045", octaves: 2, seed: 9, rgb: [122, 92, 52], gain: 0.2, offset: -0.085 }),
  /** Manila: a rougher grain than paper */
  manilaGrain: noise({ width: 260, height: 260, baseFrequency: "0.62", octaves: 4, seed: 4, rgb: [92, 66, 34], gain: 0.55, offset: -0.24 }),
  /** Manila: faint horizontal fibres pressed into the card */
  manilaFibres: noise({ width: 520, height: 260, baseFrequency: "0.016 0.42", octaves: 2, seed: 15, type: "turbulence", rgb: [104, 78, 42], gain: 0.34, offset: -0.1 }),
  /** Post-it: a smoother paper, so a lighter grain */
  postitGrain: noise({ width: 200, height: 200, baseFrequency: "0.9", octaves: 2, seed: 21, rgb: [120, 104, 40], gain: 0.3, offset: -0.13 }),
  /** Uneven darker edges for folders and loose papers. Two versions so neighbours do not match. */
  edgeWearA: edgeWear(3),
  edgeWearB: edgeWear(17),
  /** The walnut desk: long stretched grain, kept very low in contrast */
  woodGrain: noise({ width: 900, height: 600, baseFrequency: "0.004 0.19", octaves: 3, seed: 7, rgb: [23, 13, 8], gain: 1.9, offset: -0.78, opacity: 0.55 }),
} as const;

export type TextureName = keyof typeof TEXTURES;

/** CSS variables for <html>: --tex-paper-grain, --tex-manila-fibres ... */
export function textureVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(TEXTURES)) {
    vars[`--tex-${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`] = value;
  }
  return vars;
}
