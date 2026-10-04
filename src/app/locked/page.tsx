import { Button } from "@/components/ui/Button";
import { Stamp } from "@/components/ui/Stamp";
import { getCase } from "@/data/cases";
import { boardLabel, canAccessGrade, caseBoard } from "@/lib/access";
import { getStudentAccess } from "@/lib/access-server";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.locked.meta };

/**
 * Where proxy.ts and the video pages send a student who opens a chapter or video above their grade,
 * or one written for the other board. It explains why, and links back to what they can open.
 */
export default async function LockedPage(props: PageProps<"/locked">) {
  const t = copy.locked;
  const sp = await props.searchParams;
  const caseId = Array.isArray(sp.case) ? sp.case[0] : sp.case;
  const chapter = caseId ? getCase(caseId) : undefined;
  const { grade, board } = await getStudentAccess();
  const contentBoard = chapter ? caseBoard(chapter) : undefined;
  // A grade problem is explained first; if the grade is fine, the board must be the reason
  const wrongBoard = !!chapter && canAccessGrade(grade, chapter.grade) && contentBoard !== undefined && contentBoard !== board;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
      <Stamp tone="red" size="lg" rotate={-6}>
        {t.label}
      </Stamp>
      <h1 className="mt-6 text-4xl sm:text-5xl">{wrongBoard ? t.boardTitle : t.title}</h1>
      <p role="status" className="mx-auto mt-4 max-w-prose text-lg text-ink-soft">
        {wrongBoard && contentBoard ? t.boardText(boardLabel(contentBoard), boardLabel(board)) : t.text(chapter?.grade ?? null, grade)}
      </p>
      <p className="mx-auto mt-2 max-w-prose text-ink-soft">{t.changeGrade}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Button href="/cases" size="lg">
          {t.toCases}
        </Button>
        <Button href="/subjects" variant="secondary" size="lg">
          {t.toSubjects}
        </Button>
      </div>
    </div>
  );
}
