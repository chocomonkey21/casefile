import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { RedThread } from "@/components/ui/RedThread";
import { SUBJECTS } from "@/data/subjects";
import { copy } from "@/lib/copy";
import { getStudentAccess } from "@/lib/access-server";
import { getSubjects } from "@/lib/structure";

export const metadata = { title: copy.meta.subjects };

const t = copy.subjectsPage;

/** Level 1 of the hierarchy: every subject, with its chapters listed so a learner can see what is inside before opening it. */
export default async function SubjectsPage() {
  // Only chapters open to the student's grade (lib/access.ts)
  const { grade, board } = await getStudentAccess();
  const subjects = getSubjects(grade, board);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumb items={[{ label: copy.nav.items.cases.label, href: "/cases" }, { label: t.title }]} />
      <header className="mt-2">
        <p className="label text-evidence-dark">{t.label}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{t.title}</h1>
        <RedThread className="mt-4" />
        <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>
        {grade && <p className="mt-1 font-semibold text-ink-soft">{copy.grades.showing(grade, board)}</p>}
      </header>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {subjects.map((s) => (
          <li key={s.id} className="tex-paper tex-worn flex flex-col rounded-[3px] p-6 shadow-card">
            <h2 className="flex items-center gap-3 text-2xl sm:text-3xl">
              <span aria-hidden="true" className={`h-3 w-3 shrink-0 rounded-full ${SUBJECTS[s.id].dot}`} />
              {s.label}
            </h2>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              {t.chapters(s.chapters.length)} · {t.lessons(s.lessonCount)}
            </p>
            <ul className="mt-4 space-y-1 text-lg">
              {s.chapters.map((c) => (
                <li key={c.id}>
                  <Link href={`/cases/${c.id}?tab=clues`} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline">
                    {c.title}
                    {c.grade ? ` (${copy.grades.label(c.grade)})` : ""}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <Link
                href={`/subjects/${s.id}`}
                aria-label={t.open(s.label)}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline"
              >
                {t.open(s.label)}
                <ArrowRightIcon width={18} height={18} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
