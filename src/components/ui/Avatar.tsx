import { AVATARS } from "@/data/avatars";
import type { AvatarId } from "@/lib/types";
import {
  CompassIcon,
  HatIcon,
  KeyIcon,
  LanternIcon,
  MagnifierIcon,
  WatchIcon,
} from "./Icons";

const GLYPHS: Record<AvatarId, typeof MagnifierIcon> = {
  magnifier: MagnifierIcon,
  fedora: HatIcon,
  key: KeyIcon,
  compass: CompassIcon,
  lantern: LanternIcon,
  watch: WatchIcon,
};

type AvatarProps = {
  /** null shows a plain "?" for a student who has not joined yet */
  avatarId: AvatarId | null;
  size?: number;
  className?: string;
};

/** Decorative. Wrap it in a labelled control when it is clickable. */
export function Avatar({ avatarId, size = 40, className = "" }: AvatarProps) {
  const option = AVATARS.find((a) => a.id === avatarId);
  const Glyph = avatarId ? GLYPHS[avatarId] : null;
  const colours = option ? `${option.bg} ${option.fg}` : "bg-manila text-ink-soft";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full   ${colours} ${className}`}
      style={{ width: size, height: size }}
    >
      {Glyph ? (
        <Glyph width={size * 0.55} height={size * 0.55} />
      ) : (
        <span className="font-display" style={{ fontSize: size * 0.5 }}>
          ?
        </span>
      )}
    </span>
  );
}
