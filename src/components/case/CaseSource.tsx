import { boardLabel, DEFAULT_BOARD } from "@/lib/access";
import { copy } from "@/lib/copy";
import type { CaseDef } from "@/lib/types";

/**
 * Board, grade and textbook for a case, in one line. With `credits`, a second line says who wrote it.
 * The textbook and credits come only from the case data; until they are filled in, the line says so plainly.
 * The practice case belongs to no board or grade, so it shows nothing.
 */
export function CaseSource({ caseDef, credits = false, className = "" }: { caseDef: CaseDef; credits?: boolean; className?: string }) {
  if (caseDef.practice) return null;
  const parts = [
    boardLabel(caseDef.board ?? DEFAULT_BOARD),
    caseDef.grade ? copy.grades.label(caseDef.grade) : null,
    caseDef.textbook ? copy.source.textbook(caseDef.textbook) : copy.source.textbookPending,
  ].filter(Boolean);
  return (
    <div className={className}>
      <p>{parts.join(" · ")}</p>
      {credits && (
        <p className="mt-1">
          {caseDef.credits ? copy.source.credits(caseDef.credits.author, caseDef.credits.checkedAgainst) : copy.source.creditsPending}
        </p>
      )}
    </div>
  );
}
