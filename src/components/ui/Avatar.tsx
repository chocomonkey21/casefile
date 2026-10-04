import { findAvatar, type AvatarOption } from "@/data/avatars";

type AvatarProps = {
  /** A portrait id. null shows a plain "?" for a student who has not joined yet. Retired icon ids map to a portrait. */
  avatarId: string | null;
  size?: number;
  className?: string;
};

/*
  A head-and-shoulders portrait, drawn as flat shapes on a 64 × 64 grid and cut to a circle by the wrapper.
  Order matters: long hair and headscarves sit behind the head; fringes, glasses, the beret and a braid sit in front.
  Shapes stay simple so each person is still recognisable at 32px.
*/

const INK = "fill-ink";
const LINE = "stroke-ink";

function HairBack({ a }: { a: AvatarOption }) {
  if (a.hairStyle === "waves") {
    return <path className={a.hair} d="M19 30 C16 13 48 13 45 30 C47 38 48 46 45 53 C40 55 24 55 19 53 C16 46 17 38 19 30 Z" />;
  }
  if (a.hairStyle === "hijab") {
    return <path className={a.hair} d="M18 31 C18 12 46 12 46 31 L47.5 47 C40 52 24 52 16.5 47 Z" />;
  }
  return null;
}

function Outfit({ a }: { a: AvatarOption }) {
  const shoulders = <path className={a.cloth} d="M8 64 C8 52 18 46 32 46 C46 46 56 52 56 64 Z" />;
  switch (a.outfit) {
    case "cardigan":
      return (
        <>
          {shoulders}
          <path className={a.trim} d="M27 46 L32 56 L37 46 Z" />
          <circle className={a.trim} cx={32} cy={59} r={1} />
          <circle className={a.trim} cx={32} cy={62.5} r={1} />
        </>
      );
    case "trench":
      return (
        <>
          {shoulders}
          <path className={a.trim} d="M28 46 L32 54 L36 46 Z" />
          <path className={INK} opacity={0.2} d="M27 46 L32 55 L29 64 L20 64 Z M37 46 L32 55 L35 64 L44 64 Z" />
        </>
      );
    case "sweater":
      return (
        <>
          {shoulders}
          <path className={a.trim} d="M8 55 L56 55 L56 58 L8 58 Z" />
          <path className={a.trim} d="M26 46.3 Q32 52 38 46.3 L37 48.6 Q32 53.4 27 48.6 Z" />
        </>
      );
    case "hoodie":
      return (
        <>
          {shoulders}
          <path className={a.trim} d="M23 45 C23 51 41 51 41 45 L43 47 C43 55 21 55 21 47 Z" />
          <path className={a.trim} d="M28.6 51 L29.4 51 L29.4 59 L28.6 59 Z M34.6 51 L35.4 51 L35.4 59 L34.6 59 Z" />
        </>
      );
    case "coat":
      return (
        <>
          {shoulders}
          <path className={a.trim} d="M26 45.5 L32 50.5 L28 54 Z M38 45.5 L32 50.5 L36 54 Z" />
          <circle className={a.trim} cx={32} cy={57} r={1.1} />
          <circle className={a.trim} cx={32} cy={61.5} r={1.1} />
        </>
      );
    case "jacket":
      return (
        <>
          {shoulders}
          <path className={a.trim} d="M31.4 47 L32.6 47 L32.6 64 L31.4 64 Z" />
          <path className={a.trim} d="M25 45.5 L30.5 50 L23.5 51.5 Z M39 45.5 L33.5 50 L40.5 51.5 Z" />
          <path className={a.trim} d="M39.5 54.5 L45 54.5 L45 58.5 L39.5 58.5 Z" />
        </>
      );
    case "scarf":
      return (
        <>
          {shoulders}
          <path className={a.trim} d="M24 43.5 Q32 49.5 40 43.5 L41 48.5 Q32 55.5 23 48.5 Z" />
          <path className={a.trim} d="M34.5 49.5 L39.5 49 L41.5 61 L36 62 Z" />
        </>
      );
  }
}

function HairFront({ a }: { a: AvatarOption }) {
  switch (a.hairStyle) {
    case "puffs":
      return (
        <g className={a.hair}>
          <circle cx={20.5} cy={15.5} r={7.5} />
          <circle cx={43.5} cy={15.5} r={7.5} />
          <path d="M21.5 27 C21 15 43 15 42.5 27 C39 21 25 21 21.5 27 Z" />
        </g>
      );
    case "fringe":
      return <path className={a.hair} d="M21 30 C19 15 45 13 43.5 28 C41 21 35 19.5 28 22.5 C25 24 22.5 27 21 30 Z" />;
    case "waves":
      return <path className={a.hair} d="M21.5 27.5 C21 15 43 15 42.5 27.5 C37 20 27 20 21.5 27.5 Z" />;
    case "curls":
      return (
        <g className={a.hair}>
          <circle cx={23} cy={21.5} r={4.3} />
          <circle cx={27.5} cy={17.5} r={4.3} />
          <circle cx={32} cy={16} r={4.3} />
          <circle cx={36.5} cy={17.5} r={4.3} />
          <circle cx={41} cy={21.5} r={4.3} />
          <path d="M21.5 26 C21.5 17 42.5 17 42.5 26 C38 22 26 22 21.5 26 Z" />
        </g>
      );
    case "hijab":
      return (
        <g className={a.hair}>
          <path d="M21.5 25 C22.5 15 41.5 15 42.5 25 C38 19.5 26 19.5 21.5 25 Z" />
          <path d="M21.5 33 C23 43 41 43 42.5 33 L44 46 C38 49.5 26 49.5 20 46 Z" />
        </g>
      );
    case "buzz":
      return <path className={a.hair} d="M21.5 26 C21.5 15.5 42.5 15.5 42.5 26 C40 21.5 24 21.5 21.5 26 Z" />;
    case "choppy":
      return (
        <path
          className={a.hair}
          d="M20.5 29 C18.5 13 46 12 43.5 28 L41 22.5 L38 25.5 L35.5 20.5 L32 24.5 L28.5 20.5 L25.5 25.5 L23 22.5 Z"
        />
      );
    case "braid":
      return <path className={a.hair} d="M21.5 28 C20 14 44 14 42.5 28 C41 20 34 18.5 32 18.5 C30 18.5 23 20 21.5 28 Z" />;
  }
}

function Face({ a }: { a: AvatarOption }) {
  const covered = a.hairStyle === "hijab";
  return (
    <>
      {!covered && (
        <>
          <circle className={a.skin} cx={21.8} cy={30} r={2.4} />
          <circle className={a.skin} cx={42.2} cy={30} r={2.4} />
        </>
      )}
      <ellipse className={a.skin} cx={32} cy={29} rx={10.5} ry={12.5} />
      <circle className="fill-portrait-blush" opacity={0.35} cx={25.6} cy={33.6} r={1.9} />
      <circle className="fill-portrait-blush" opacity={0.35} cx={38.4} cy={33.6} r={1.9} />
      <circle className={INK} cx={27.8} cy={30} r={1.5} />
      <circle className={INK} cx={36.2} cy={30} r={1.5} />
      <path className={`${LINE} fill-none`} strokeWidth={1.3} strokeLinecap="round" d="M25.4 26.4 Q27.8 25.1 30.1 26.1 M33.9 26.1 Q36.2 25.1 38.6 26.4" />
      <path className={`${LINE} fill-none`} opacity={0.45} strokeWidth={1.1} strokeLinecap="round" d="M32.2 30.8 L31.3 33.2 L32.7 33.4" />
      <path className={`${LINE} fill-none`} strokeWidth={1.3} strokeLinecap="round" d="M28.9 35.4 Q32 37.8 35.1 35.4" />
      {a.extras.includes("freckles") && (
        <g className="fill-portrait-blush">
          <circle cx={26} cy={32.4} r={0.6} />
          <circle cx={27.6} cy={33.4} r={0.6} />
          <circle cx={36.4} cy={33.4} r={0.6} />
          <circle cx={38} cy={32.4} r={0.6} />
        </g>
      )}
    </>
  );
}

function Extras({ a }: { a: AvatarOption }) {
  return (
    <>
      {a.extras.includes("beret") && (
        <g className="fill-evidence">
          <ellipse cx={30} cy={16} rx={13} ry={4.8} />
          <circle cx={30} cy={11} r={1.6} />
        </g>
      )}
      {a.extras.includes("glasses") && (
        <path
          className={`${LINE} fill-none`}
          strokeWidth={1.2}
          d="M24.2 30 A3.6 3.6 0 1 0 31.4 30 A3.6 3.6 0 1 0 24.2 30 Z M32.6 30 A3.6 3.6 0 1 0 39.8 30 A3.6 3.6 0 1 0 32.6 30 Z M31.4 30 L32.6 30"
        />
      )}
      {a.hairStyle === "braid" && (
        <g>
          <g className={a.hair}>
            <ellipse cx={42.6} cy={35} rx={3.3} ry={4.2} />
            <ellipse cx={43.6} cy={42} rx={3.3} ry={4.2} />
            <ellipse cx={44.2} cy={49} rx={3.1} ry={4} />
            <ellipse cx={44.4} cy={55.6} rx={2.9} ry={3.7} />
          </g>
          <circle className={a.trim} cx={44.4} cy={60} r={1.7} />
        </g>
      )}
    </>
  );
}

/** Decorative. Wrap it in a labelled control when it is clickable. */
export function Avatar({ avatarId, size = 40, className = "" }: AvatarProps) {
  const a = findAvatar(avatarId);

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${a ? "" : "bg-manila text-ink-soft"} ${className}`}
      style={{ width: size, height: size }}
    >
      {a ? (
        <svg viewBox="0 0 64 64" width={size} height={size} focusable="false">
          <rect className={a.bg} width={64} height={64} />
          <HairBack a={a} />
          {/* Neck before the outfit, so collars and scarves sit over it */}
          <path className={a.skin} d="M27.5 36 L36.5 36 L36.5 47 Q32 49 27.5 47 Z" />
          <Outfit a={a} />
          <Face a={a} />
          <HairFront a={a} />
          <Extras a={a} />
        </svg>
      ) : (
        <span className="font-display" style={{ fontSize: size * 0.5 }}>
          ?
        </span>
      )}
    </span>
  );
}
