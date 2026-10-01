type ProgressBarProps = {
  value: number;
  max: number;
  /** Describes what is being measured, for screen readers */
  label: string;
  tone?: "sage" | "highlighter" | "navy";
};

const FILLS = {
  sage: "bg-sage",
  highlighter: "bg-highlighter-dark",
  navy: "bg-navy",
};

export function ProgressBar({ value, max, label, tone = "sage" }: ProgressBarProps) {
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
      <div className={`h-full rounded-full transition-[width] duration-500 ${FILLS[tone]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
