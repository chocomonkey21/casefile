import { Button } from "@/components/ui/Button";
import { Stamp } from "@/components/ui/Stamp";
import { getCase } from "@/data/cases";
import { getStudentGrade } from "@/lib/access-server";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.locked.meta };

/**
 * Where proxy.ts and the video pages send a student who opens a chapter or video above their grade.
 * It explains why, and links back to what they can open.
 */
export default async function LockedPage(props: PageProps<"/locked">) {
  const t = copy.locked;
  const sp = await props.searchParams;
  const caseId = Array.isArray(sp.case) ? sp.case[0] : sp.case;
  const contentGrade = (caseId && getCase(caseId)?.grade) || null;
  const studentGrade = await getStudentGrade();

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
      <Stamp tone="red" size="lg" rotate={-6}>
        {t.label}
      </Stamp>
      <h1 className="mt-6 text-4xl sm:text-5xl">{t.title}</h1>
      <p role="status" className="mx-auto mt-4 max-w-prose text-lg text-ink-soft">
        {t.text(contentGrade, studentGrade)}
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
