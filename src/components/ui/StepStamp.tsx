import { CheckIcon } from "@/components/ui/Icons";

/** Old stamp-pad inks, in the order the steps use them */
const INKS = ["text-stamp-oxblood", "text-stamp-violet", "text-stamp-olive", "text-stamp-sepia"];
const FILLS = ["bg-stamp-oxblood", "bg-stamp-violet", "bg-stamp-olive", "bg-stamp-sepia"];
/** A slightly different tilt for each step, the way a hand stamp never lands straight */
const TILTS = [-6, 4, -3, 7, -5];

type StepStampProps = {
  /** 0-based step number */
  index: number;
  state?: "todo" | "current" | "done";
  size?: "sm" | "lg";
};

/**
 * A step number pressed with a round rubber stamp in faded office ink.
 * Done steps are a solid stamp with a tick, the current step is a crisp ring,
 * and steps still to come are a faint, half-inked ring.
 */
export function StepStamp({ index, state = "current", size = "sm" }: StepStampProps) {
  const ink = INKS[index % INKS.length];
  const fill = FILLS[index % FILLS.length];
  const box = size === "lg" ? "h-14 w-14 text-2xl border-[3px]" : "h-10 w-10 text-lg border-[2.5px]";
  const look =
    state === "done"
      ? `${fill} border-transparent text-paper`
      : state === "current"
        ? `${ink} border-current`
        : `${ink} border-current opacity-60`;
  return (
    <span
      aria-hidden="true"
      className={`stamp-sm inline-flex shrink-0 items-center justify-center rounded-full font-display mix-blend-multiply ${box} ${look}`}
      style={{ rotate: `${TILTS[index % TILTS.length]}deg` }}
    >
      {state === "done" ? <CheckIcon width={size === "lg" ? 24 : 18} height={size === "lg" ? 24 : 18} /> : index + 1}
    </span>
  );
}
