type ProgressBarProps = {
  value: number;
  max: number;
  /** Describes what is being measured, for screen readers */
  label: string;
  tone?: "desk" | "postit" | "coffee";
};

const FILLS = {
  desk: "bg-desk",
  postit: "bg-postit-dark",
  coffee: "bg-espresso",
};

export function ProgressBar({ value, max, label, tone = "desk" }: ProgressBarProps) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="h-2.5 w-full overflow-hidden rounded-full bg-manila-600/25"
    >
      {/* Full-width fill slid in from the left: transform stays on the GPU and, unlike scaleX, keeps the rounded end round. */}
      <div
        className={`h-full w-full rounded-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${FILLS[tone]}`}
        style={{ transform: `translateX(${pct - 100}%)` }}
      />
    </div>
  );
}
