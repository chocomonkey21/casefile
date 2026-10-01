import type { AvatarId } from "@/lib/types";

export type AvatarOption = {
  id: AvatarId;
  label: string;
  /** Tailwind classes, written out in full so Tailwind can find them */
  bg: string;
  fg: string;
};

export const AVATARS: AvatarOption[] = [
  { id: "magnifier", label: "Magnifying glass", bg: "bg-postit", fg: "text-ink" },
  { id: "fedora", label: "Detective hat", bg: "bg-evidence", fg: "text-paper" },
  { id: "key", label: "Old key", bg: "bg-manila-400", fg: "text-ink" },
  { id: "compass", label: "Compass", bg: "bg-coffee", fg: "text-paper" },
  { id: "lantern", label: "Lantern", bg: "bg-desk", fg: "text-paper" },
  { id: "watch", label: "Pocket watch", bg: "bg-beige", fg: "text-coffee" },
];
