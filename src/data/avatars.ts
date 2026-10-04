import type { AvatarId } from "@/lib/types";

/*
  Profile portraits: eight young detectives, drawn in components/ui/Avatar.tsx from the recipe below.
  Each has a different skin tone, hairstyle, outfit and background colour, so they stay easy to tell apart
  even at 32px. Colours are Tailwind classes, written out in full so Tailwind can find them.
*/

export type HairStyle = "puffs" | "fringe" | "waves" | "curls" | "hijab" | "buzz" | "choppy" | "braid";
export type Outfit = "cardigan" | "trench" | "sweater" | "hoodie" | "coat" | "jacket" | "scarf";
export type Extra = "glasses" | "beret" | "freckles";

export type AvatarOption = {
  id: AvatarId;
  /** The character's name, shown under the portrait */
  name: string;
  /** What the portrait shows, read after the name by screen readers */
  description: string;
  bg: string;
  skin: string;
  hair: string;
  hairStyle: HairStyle;
  outfit: Outfit;
  /** The outfit's main colour, and a second colour for its collar or trim */
  cloth: string;
  trim: string;
  extras: Extra[];
};

export const AVATARS: AvatarOption[] = [
  {
    id: "amara",
    name: "Amara",
    description: "dark brown skin, two round hair puffs, mustard cardigan",
    bg: "fill-desk-light",
    skin: "fill-portrait-skin-5",
    hair: "fill-portrait-hair-black",
    hairStyle: "puffs",
    outfit: "cardigan",
    cloth: "fill-portrait-mustard",
    trim: "fill-paper",
    extras: [],
  },
  {
    id: "kenji",
    name: "Kenji",
    description: "light skin, straight black hair with a side fringe, round glasses, navy trench coat",
    bg: "fill-postit",
    skin: "fill-portrait-skin-2",
    hair: "fill-portrait-hair-black",
    hairStyle: "fringe",
    outfit: "trench",
    cloth: "fill-portrait-navy",
    trim: "fill-beige",
    extras: ["glasses"],
  },
  {
    id: "sofia",
    name: "Sofia",
    description: "tan skin, long wavy brown hair, red beret, violet sweater",
    bg: "fill-manila-50",
    skin: "fill-portrait-skin-3",
    hair: "fill-portrait-hair-brown",
    hairStyle: "waves",
    outfit: "sweater",
    cloth: "fill-stamp-violet",
    trim: "fill-manila",
    extras: ["beret"],
  },
  {
    id: "zayn",
    name: "Zayn",
    description: "brown skin, short curly black hair, green hoodie",
    bg: "fill-beige",
    skin: "fill-portrait-skin-4",
    hair: "fill-portrait-hair-black",
    hairStyle: "curls",
    outfit: "hoodie",
    cloth: "fill-desk",
    trim: "fill-desk-light",
    extras: [],
  },
  {
    id: "leila",
    name: "Leila",
    description: "tan skin, teal headscarf, brown coat",
    bg: "fill-postit-light",
    skin: "fill-portrait-skin-3",
    hair: "fill-portrait-teal",
    hairStyle: "hijab",
    outfit: "coat",
    cloth: "fill-coffee",
    trim: "fill-manila-400",
    extras: [],
  },
  {
    id: "malik",
    name: "Malik",
    description: "deep brown skin, very short black hair, tan trench coat",
    bg: "fill-evidence-light",
    skin: "fill-portrait-skin-6",
    hair: "fill-portrait-hair-black",
    hairStyle: "buzz",
    outfit: "trench",
    cloth: "fill-manila-500",
    trim: "fill-manila-50",
    extras: [],
  },
  {
    id: "riley",
    name: "Riley",
    description: "pale skin with freckles, short choppy auburn hair, olive jacket",
    bg: "fill-desk-light",
    skin: "fill-portrait-skin-1",
    hair: "fill-portrait-hair-auburn",
    hairStyle: "choppy",
    outfit: "jacket",
    cloth: "fill-stamp-olive",
    trim: "fill-postit",
    extras: ["freckles"],
  },
  {
    id: "priya",
    name: "Priya",
    description: "brown skin, long black braid over one shoulder, red scarf, dark coat",
    bg: "fill-manila",
    skin: "fill-portrait-skin-4",
    hair: "fill-portrait-hair-black",
    hairStyle: "braid",
    outfit: "scarf",
    cloth: "fill-espresso",
    trim: "fill-evidence",
    extras: [],
  },
];

/** Profiles saved before the portraits keep a portrait: each old icon avatar maps to one person */
const LEGACY: Record<string, AvatarId> = {
  magnifier: "amara",
  fedora: "kenji",
  key: "sofia",
  compass: "zayn",
  lantern: "leila",
  watch: "malik",
};

export function findAvatar(id: string | null | undefined): AvatarOption | undefined {
  if (!id) return undefined;
  const resolved = LEGACY[id] ?? id;
  return AVATARS.find((a) => a.id === resolved);
}
