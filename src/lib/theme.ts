/**
 * The CaseFile colour palette and the text/background pairs the interface uses.
 *
 * globals.css (@theme) is what the browser reads. This file mirrors it so the style guide and
 * `npm run contrast` can check every pairing. The script also fails if the two ever drift apart.
 */

export const PALETTE = {
  // Desk surfaces (backdrop only, never reading content)
  walnut: "#3A2A20",
  espresso: "#241913",
  coffee: "#4B382B",
  // Paper
  paper: "#F3EAD6",
  "paper-dark": "#E9DEC4",
  beige: "#E3D4B8",
  "manila-50": "#EFE3C8",
  "manila-100": "#E8D9B8",
  manila: "#D8C29A",
  "manila-400": "#C7AE82",
  "manila-500": "#A98F63",
  "manila-600": "#7A6238",
  "manila-700": "#5A4727",
  // Post-it
  postit: "#F2E7A8",
  "postit-light": "#F8F1C9",
  "postit-dark": "#D6C77A",
  // Ink
  ink: "#231B15",
  "ink-soft": "#43382D",
  // Evidence red
  evidence: "#A63A2E",
  "evidence-dark": "#762620",
  "evidence-light": "#EBD3C9",
  // Desk green
  desk: "#3F5A47",
  "desk-dark": "#2F4837",
  "desk-light": "#D9E0CF",
  // Old stamp-pad inks (subjects, onboarding steps)
  "stamp-oxblood": "#7A2E26",
  "stamp-violet": "#574474",
  "stamp-olive": "#4D5A2B",
  "stamp-sepia": "#6A4729",
  // Brass
  brass: "#A98652",
  "brass-dark": "#7A5C2E",
  // Learning imagery: real-world colours, lesson diagrams and explainers only
  "ill-sky": "#D5E7F1",
  "ill-sky-grey": "#C3D0DA",
  "ill-storm": "#6F8293",
  "ill-cloud": "#FBFCFC",
  "ill-cloud-shade": "#D9E0E6",
  "ill-water": "#2A6BA1",
  "ill-water-deep": "#1C4F7C",
  "ill-water-light": "#A9D2EC",
  "ill-ice": "#E6F3FA",
  "ill-sun": "#F4B740",
  "ill-sun-ray": "#E08A1E",
  "ill-grass": "#7EA95A",
  "ill-grass-dark": "#4C7A35",
  "ill-soil": "#7F5D3D",
  "ill-rock": "#5E4D3F",
  "ill-earth": "#C8AE85",
  "ill-wood": "#A27852",
  "ill-wall": "#DDE3E6",
} as const;

export type ColorName = keyof typeof PALETTE;

/** A background that is a colour drawn at partial opacity over another colour (e.g. `bg-manila-100/70`) */
export type Blend = { color: ColorName; alpha: number; over: ColorName };
export type Backdrop = ColorName | Blend;

export type ContrastPair = {
  label: string;
  fg: ColorName;
  bg: Backdrop;
  /** 4.5 for body text, 3 for large text and UI parts (icons, focus marks, borders that carry meaning) */
  min: 4.5 | 3;
};

const b = (color: ColorName, alpha: number, over: ColorName): Blend => ({ color, alpha, over });

export const PAIRS: ContrastPair[] = [
  // Reading text on paper surfaces
  { label: "Ink on paper", fg: "ink", bg: "paper", min: 4.5 },
  { label: "Soft ink on paper", fg: "ink-soft", bg: "paper", min: 4.5 },
  { label: "Ink on darker paper", fg: "ink", bg: "paper-dark", min: 4.5 },
  { label: "Soft ink on darker paper", fg: "ink-soft", bg: "paper-dark", min: 4.5 },
  { label: "Ink on light beige", fg: "ink", bg: "beige", min: 4.5 },
  { label: "Soft ink on light beige", fg: "ink-soft", bg: "beige", min: 4.5 },
  // Text on manila folders
  { label: "Ink on manila", fg: "ink", bg: "manila", min: 4.5 },
  { label: "Soft ink on manila", fg: "ink-soft", bg: "manila", min: 4.5 },
  // Folder tabs and index tabs: full ink only, the darker manila leaves too little room for softer tones
  { label: "Ink on manila tab", fg: "ink", bg: "manila-400", min: 4.5 },
  { label: "Ink on pale manila", fg: "ink", bg: "manila-100", min: 4.5 },
  { label: "Soft ink on pale manila", fg: "ink-soft", bg: "manila-100", min: 4.5 },
  { label: "Soft ink on very pale manila", fg: "ink-soft", bg: "manila-50", min: 4.5 },
  { label: "Soft ink on pale manila over paper", fg: "ink-soft", bg: b("manila-100", 0.7, "paper"), min: 4.5 },
  // Post-it notes and hints
  { label: "Ink on post-it", fg: "ink", bg: "postit", min: 4.5 },
  { label: "Soft ink on post-it", fg: "ink-soft", bg: "postit", min: 4.5 },
  { label: "Ink on light post-it", fg: "ink", bg: "postit-light", min: 4.5 },
  { label: "Soft ink on light post-it", fg: "ink-soft", bg: "postit-light", min: 4.5 },
  // Evidence red
  { label: "Dark red text on paper", fg: "evidence-dark", bg: "paper", min: 4.5 },
  { label: "Dark red text on manila", fg: "evidence-dark", bg: "manila", min: 4.5 },
  { label: "Dark red text on pale manila", fg: "evidence-dark", bg: "manila-100", min: 4.5 },
  { label: "Dark red text on post-it", fg: "evidence-dark", bg: "postit", min: 4.5 },
  { label: "Dark red text on red tint", fg: "evidence-dark", bg: "evidence-light", min: 4.5 },
  { label: "Paper on evidence red", fg: "paper", bg: "evidence", min: 4.5 },
  { label: "Paper on dark red", fg: "paper", bg: "evidence-dark", min: 4.5 },
  // Old stamp inks, as text on paper and manila
  ...(["stamp-oxblood", "stamp-violet", "stamp-olive", "stamp-sepia"] as const).flatMap((ink): ContrastPair[] => [
    { label: `${ink} on paper`, fg: ink, bg: "paper", min: 4.5 },
    // On manila folders these inks are only used for dots and stamp rings, never small text
    { label: `${ink} dot on manila`, fg: ink, bg: "manila", min: 3 },
  ]),
  // Desk green (right answers, solved)
  { label: "Desk green check marks on paper", fg: "desk", bg: "paper", min: 3 },
  { label: "Dark desk green on manila", fg: "desk-dark", bg: "manila", min: 4.5 },
  { label: "Dark desk green on green tint", fg: "desk-dark", bg: "desk-light", min: 4.5 },
  { label: "Ink on green tint", fg: "ink", bg: "desk-light", min: 4.5 },
  { label: "Paper on desk green", fg: "paper", bg: "desk", min: 4.5 },
  // Text on the dark desk
  { label: "Cream on walnut", fg: "paper", bg: "walnut", min: 4.5 },
  { label: "Light beige on walnut", fg: "beige", bg: "walnut", min: 4.5 },
  { label: "Cream on espresso", fg: "paper", bg: "espresso", min: 4.5 },
  { label: "Light beige on espresso", fg: "beige", bg: "espresso", min: 4.5 },
  { label: "Cream on coffee", fg: "paper", bg: "coffee", min: 4.5 },
  { label: "Light beige on coffee", fg: "beige", bg: "coffee", min: 4.5 },
  { label: "Post-it yellow on espresso", fg: "postit", bg: "espresso", min: 4.5 },
  { label: "Post-it yellow on coffee", fg: "postit", bg: "coffee", min: 4.5 },
  // Labels inside lesson diagrams (DM Sans, 15px semibold, so normal text)
  { label: "Diagram label, ink on sky", fg: "ink", bg: "ill-sky", min: 4.5 },
  { label: "Diagram label, ink on grey sky", fg: "ink", bg: "ill-sky-grey", min: 4.5 },
  { label: "Diagram label, ink on cloud", fg: "ink", bg: "ill-cloud-shade", min: 4.5 },
  { label: "Diagram label, ink on ice", fg: "ink", bg: "ill-ice", min: 4.5 },
  { label: "Diagram label, ink on wall", fg: "ink", bg: "ill-wall", min: 4.5 },
  { label: "Diagram label, ink on bare ground", fg: "ink", bg: "ill-earth", min: 4.5 },
  { label: "Diagram label, ink on grass", fg: "ink", bg: "ill-grass", min: 4.5 },
  { label: "Diagram label, white on water", fg: "ill-cloud", bg: "ill-water", min: 4.5 },
  { label: "Diagram label, white on deep water", fg: "ill-cloud", bg: "ill-water-deep", min: 4.5 },
  { label: "Diagram label, white on soil", fg: "ill-cloud", bg: "ill-soil", min: 4.5 },
  { label: "Diagram label, white on rock", fg: "ill-cloud", bg: "ill-rock", min: 4.5 },
  // Shapes inside lesson diagrams that carry meaning (3:1 against what is around them)
  { label: "Water against sky", fg: "ill-water", bg: "ill-sky", min: 3 },
  { label: "Molecules in water", fg: "ill-water-light", bg: "ill-water", min: 3 },
  { label: "Raindrops on grey sky", fg: "ill-water", bg: "ill-sky-grey", min: 3 },
  { label: "Hail outline on grey sky", fg: "ill-water-deep", bg: "ill-sky-grey", min: 3 },
  { label: "Snowflake outline on sky", fg: "ill-water-deep", bg: "ill-sky", min: 3 },
  { label: "Hill outline against sky", fg: "ill-grass-dark", bg: "ill-sky", min: 3 },
  { label: "Groundwater arrow in rock", fg: "ill-water-light", bg: "ill-rock", min: 3 },
  { label: "Runoff arrow on grass", fg: "ill-water-deep", bg: "ill-grass", min: 3 },
  { label: "Arrows in ink on sky", fg: "ink", bg: "ill-sky", min: 3 },

  // Parts of the interface that are not text (3:1)
  { label: "Brass on espresso (nav accents)", fg: "brass", bg: "espresso", min: 3 },
  { label: "Brass on walnut (pins)", fg: "brass", bg: "walnut", min: 3 },
  { label: "Focus mark, dark brass on paper", fg: "brass-dark", bg: "paper", min: 3 },
  { label: "Focus mark, dark brass on manila", fg: "brass-dark", bg: "manila", min: 3 },
  { label: "Focus mark, dark brass on post-it", fg: "brass-dark", bg: "postit", min: 3 },
  { label: "Focus mark, post-it on espresso", fg: "postit", bg: "espresso", min: 3 },
  { label: "Focus mark, post-it on walnut", fg: "postit", bg: "walnut", min: 3 },
  { label: "Red string on paper", fg: "evidence", bg: "paper", min: 3 },
  { label: "Red string on manila", fg: "evidence-dark", bg: "manila", min: 3 },
  { label: "Folder edge on paper", fg: "manila-600", bg: "paper", min: 3 },
];

/* ── Texture and ink, as far as contrast is concerned ─────────────────────────────────────── */

/** One layer of a texture overlay: its grain colour and how opaque its darkest specks get */
export type OverlayLayer = { rgb: [number, number, number]; alpha: number };

/**
 * How far each texture overlay darkens what is under it. The overlay is multiplied over paper and
 * ink alike, so both get darker together.
 *
 * Measured in the browser from the tiles in textures.ts:
 *  - fine grain (specks a pixel or two wide) uses the tile's mean opacity, because the eye reads
 *    a letter against the average of the grain around it
 *  - broad tone (blotches, fibres, the glue strip) uses its darkest 1 to 10%, because a whole
 *    word can sit inside one dark patch
 * If you swap in scanned images or change a texture, measure again and update these.
 */
export const OVERLAYS: Record<"paper" | "manila" | "postit", OverlayLayer[]> = {
  paper: [
    { rgb: [96, 72, 44], alpha: 0.028 }, // paperGrain, mean
    { rgb: [122, 92, 52], alpha: 0.063 }, // paperBlotch, 99th percentile
  ],
  manila: [
    { rgb: [92, 66, 34], alpha: 0.048 }, // manilaGrain, mean
    { rgb: [104, 78, 42], alpha: 0.055 }, // manilaFibres, 90th percentile
    // A manila folder lies on a sheet but rises above its grain, so no paper layer here
  ],
  postit: [
    { rgb: [120, 104, 40], alpha: 0.026 }, // postitGrain, mean
    { rgb: [196, 178, 96], alpha: 0.08 }, // glue strip, where the first line of text starts (0.22 only at the very edge)
  ],
};

/** Which overlay sits over a colour. Everything inside a page sheet gets at least the paper grain. */
export function overlayFor(color: ColorName): keyof typeof OVERLAYS | null {
  if (color.startsWith("manila")) return "manila";
  if (color.startsWith("postit")) return "postit";
  if (["walnut", "espresso"].includes(color)) return null; // the desk and nav bars are not paper
  return "paper";
}

/**
 * The lowest ink coverage the filters in InkFilters.tsx leave on a letter, including the stamp's
 * own 92% opacity. Text is checked at this coverage, blended into the paper.
 */
export const INK_DENSITY = {
  /** ink-type: Special Elite headings and labels */
  type: 0.92,
  /** ink-stamp-small: status stamps (12px text) */
  stampSmall: 0.94 * 1,
  /** ink-stamp: large stamps such as Case Closed (large text, so 3:1) */
  stamp: 0.8 * 0.95,
} as const;

export type StampCheck = { label: string; ink: ColorName; on: ColorName; density: keyof typeof INK_DENSITY; min: 4.5 | 3 };

export const STAMP_CHECKS: StampCheck[] = [
  { label: "Small red stamp on manila", ink: "evidence-dark", on: "manila", density: "stampSmall", min: 4.5 },
  { label: "Small red stamp on paper", ink: "evidence-dark", on: "paper", density: "stampSmall", min: 4.5 },
  { label: "Small coffee stamp on manila", ink: "coffee", on: "manila", density: "stampSmall", min: 4.5 },
  { label: "Small green stamp on manila", ink: "desk-dark", on: "manila", density: "stampSmall", min: 4.5 },
  { label: "Small green stamp on paper", ink: "desk-dark", on: "paper", density: "stampSmall", min: 4.5 },
  { label: "Large red stamp on paper", ink: "evidence-dark", on: "paper", density: "stamp", min: 3 },
  { label: "Large green stamp on paper", ink: "desk-dark", on: "paper", density: "stamp", min: 3 },
  { label: "Large coffee stamp on manila", ink: "coffee", on: "manila", density: "stamp", min: 3 },
];
