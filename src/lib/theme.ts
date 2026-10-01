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
  "ink-soft": "#4A3E32",
  "ink-mute": "#5A4C3D",
  // Evidence red
  evidence: "#A63A2E",
  "evidence-dark": "#762620",
  "evidence-light": "#EBD3C9",
  // Desk green
  desk: "#3F5A47",
  "desk-dark": "#2F4837",
  "desk-light": "#D9E0CF",
  // Brass
  brass: "#A98652",
  "brass-dark": "#7A5C2E",
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
  { label: "Muted ink on paper", fg: "ink-mute", bg: "paper", min: 4.5 },
  { label: "Ink on darker paper", fg: "ink", bg: "paper-dark", min: 4.5 },
  { label: "Soft ink on darker paper", fg: "ink-soft", bg: "paper-dark", min: 4.5 },
  { label: "Muted ink on darker paper", fg: "ink-mute", bg: "paper-dark", min: 4.5 },
  { label: "Ink on light beige", fg: "ink", bg: "beige", min: 4.5 },
  { label: "Soft ink on light beige", fg: "ink-soft", bg: "beige", min: 4.5 },
  { label: "Muted ink on light beige", fg: "ink-mute", bg: "beige", min: 4.5 },
  // Text on manila folders
  { label: "Ink on manila", fg: "ink", bg: "manila", min: 4.5 },
  { label: "Soft ink on manila", fg: "ink-soft", bg: "manila", min: 4.5 },
  { label: "Muted ink on manila", fg: "ink-mute", bg: "manila", min: 4.5 },
  { label: "Ink on manila tab", fg: "ink", bg: "manila-400", min: 4.5 },
  { label: "Soft ink on manila tab", fg: "ink-soft", bg: "manila-400", min: 4.5 },
  { label: "Ink on pale manila", fg: "ink", bg: "manila-100", min: 4.5 },
  { label: "Soft ink on pale manila", fg: "ink-soft", bg: "manila-100", min: 4.5 },
  { label: "Muted ink on pale manila", fg: "ink-mute", bg: "manila-100", min: 4.5 },
  { label: "Soft ink on very pale manila", fg: "ink-soft", bg: "manila-50", min: 4.5 },
  { label: "Soft ink on pale manila over paper", fg: "ink-soft", bg: b("manila-100", 0.7, "paper"), min: 4.5 },
  // Post-it notes and hints
  { label: "Ink on post-it", fg: "ink", bg: "postit", min: 4.5 },
  { label: "Soft ink on post-it", fg: "ink-soft", bg: "postit", min: 4.5 },
  { label: "Muted ink on post-it", fg: "ink-mute", bg: "postit", min: 4.5 },
  { label: "Ink on light post-it", fg: "ink", bg: "postit-light", min: 4.5 },
  { label: "Soft ink on light post-it", fg: "ink-soft", bg: "postit-light", min: 4.5 },
  // Evidence red
  { label: "Evidence red on paper", fg: "evidence", bg: "paper", min: 4.5 },
  { label: "Dark red text on paper", fg: "evidence-dark", bg: "paper", min: 4.5 },
  { label: "Dark red text on manila", fg: "evidence-dark", bg: "manila", min: 4.5 },
  { label: "Dark red text on manila tab", fg: "evidence-dark", bg: "manila-400", min: 4.5 },
  { label: "Dark red text on pale manila", fg: "evidence-dark", bg: "manila-100", min: 4.5 },
  { label: "Dark red text on post-it", fg: "evidence-dark", bg: "postit", min: 4.5 },
  { label: "Dark red text on red tint", fg: "evidence-dark", bg: "evidence-light", min: 4.5 },
  { label: "Paper on evidence red", fg: "paper", bg: "evidence", min: 4.5 },
  { label: "Paper on dark red", fg: "paper", bg: "evidence-dark", min: 4.5 },
  // Desk green (right answers, solved)
  { label: "Desk green on paper", fg: "desk", bg: "paper", min: 4.5 },
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
