import { notFound } from "next/navigation";
import { SubjectChapters } from "@/components/subjects/SubjectChapters";
import { RelatedVideos } from "@/components/videos/RelatedVideos";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PrevNext } from "@/components/ui/PrevNext";
import { RedThread } from "@/components/ui/RedThread";
import { copy } from "@/lib/copy";
import { getStudentGrade } from "@/lib/access-server";
import { getSubject, getSubjects } from "@/lib/structure";

const t = copy.subjectsPage;

export function generateStaticParams() {
  return getSubjects().map((s) => ({ subject: s.id }));
}

export async function generateMetadata(props: PageProps<"/subjects/[subject]">) {
  const { subject } = await props.params;
  return { title: getSubject(subject)?.label ?? t.notFound };
}

/** Level 2: one subject and its chapters. */
export default async function SubjectPage(props: PageProps<"/subjects/[subject]">) {
  const { subject: id } = await props.params;
  // Only chapters open to the student's grade (lib/access.ts)
  const grade = await getStudentGrade();
  const subject = getSubject(id, grade);
  if (!subject) notFound();

  const all = getSubjects(grade);
  const i = all.findIndex((s) => s.id === subject.id);
  const link = (s: (typeof all)[number] | undefined, label: string) =>
    s ? { href: `/subjects/${s.id}`, label, title: s.label } : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumb items={[{ label: t.title, href: "/subjects" }, { label: subject.label }]} />
      <header className="mt-2">
        <p className="label text-evidence-dark">{t.title}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{subject.label}</h1>
        <RedThread className="mt-4" />
        <p className="mt-2 text-lg font-semibold text-ink-soft">
          {t.chapters(subject.chapters.length)} · {t.lessons(subject.lessonCount)}
        </p>
        {grade && <p className="mt-1 text-ink-soft">{copy.grades.showing(grade)}</p>}
      </header>

      <section aria-labelledby="chapters-heading" className="mt-8">
        <h2 id="chapters-heading" className="text-2xl sm:text-3xl">
          {t.chaptersHeading}
        </h2>
        <p className="mt-1 max-w-prose text-ink-soft">{t.chaptersIntro}</p>
        <SubjectChapters chapters={subject.chapters} />
      </section>

      <div className="mt-12">
        <RelatedVideos
          subject={subject.id}
          heading={t.videosHeading(subject.label)}
          headingId="subject-videos-heading"
          seeAll={{ href: `/videos?subject=${subject.id}`, label: t.seeVideos }}
        />
      </div>

      <div className="mt-12">
        <PrevNext
          label={copy.wayfinding.subjects}
          prev={link(all[i - 1], copy.wayfinding.prevSubject)}
          next={link(all[i + 1], copy.wayfinding.nextSubject)}
        />
      </div>
    </div>
  );
}
