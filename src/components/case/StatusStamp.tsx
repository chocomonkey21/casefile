import { Stamp } from "@/components/ui/Stamp";
import { copy } from "@/lib/copy";
import type { CaseStatus } from "@/lib/types";

const CONFIG: Record<CaseStatus, { tone: "red" | "coffee" | "desk" | "cold"; rotate: number }> = {
  open: { tone: "coffee", rotate: -5 },
  active: { tone: "desk", rotate: -4 },
  cold: { tone: "cold", rotate: -6 },
  closed: { tone: "red", rotate: -8 },
};

/**
 * The status of a case as a small ink-stamp tag. The text is real text, so screen readers get it too.
 * "Cold case" is always shown next to a plain sentence that says what to do (see the Desk and the Lab).
 */
export function StatusStamp({
  status,
  size = "sm",
  slam = false,
}: {
  status: CaseStatus;
  size?: "sm" | "md" | "lg" | "xl";
  slam?: boolean;
}) {
  const c = CONFIG[status];
  return (
    <Stamp tone={c.tone} size={size} rotate={c.rotate} slam={slam}>
      {copy.status[status]}
    </Stamp>
  );
}
