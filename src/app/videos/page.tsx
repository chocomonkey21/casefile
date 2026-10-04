import Link from "next/link";
import { connection } from "next/server";
import { Button } from "@/components/ui/Button";
import { PlayIcon } from "@/components/ui/Icons";
import { RedThread } from "@/components/ui/RedThread";
import { VideoCard } from "@/components/videos/VideoCard";
import { getStudentAccess } from "@/lib/access-server";
import { listPublished } from "@/lib/cms/videos";
import { videosForStudent } from "@/lib/video-access";
import type { VideoEntry } from "@/lib/cms/types";
import { copy } from "@/lib/copy";
import { getSubject, getSubjects, isSubjectId } from "@/lib/structure";

export const metadata = { title: copy.meta.videos };

const t = copy.videos;

const chip = (on: boolean) =>
  `inline-flex min-h-11 items-center rounded-[4px] px-4 text-sm font-semibold transition-colors ${
    on ? "bg-espresso text-paper" : "bg-paper text-ink hover:bg-postit-light/60"
  }`;

const href = (subject?: string, chapter?: string) => {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (chapter) q.set("chapter", chapter);
  const s = q.toString();
  return s ? `/videos?${s}` : "/videos";
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** The video library. Filters are plain links, so they work without scripts and can be shared. */
export default async function VideosPage(props: PageProps<"/videos">) {
  await connection();
  const sp = await props.searchParams;
  const subjectParam = first(sp.subject);
  const subject = subjectParam && isSubjectId(subjectParam) ? subjectParam : undefined;
  const { grade, board } = await getStudentAccess();
  // Only chapters open to the student's grade and board appear as filters, so any other chapter id in the address shows nothing
  const entry = subject ? getSubject(subject, grade, board) : undefined;
  const chapterParam = first(sp.chapter);
  const chapter = entry?.chapters.find((c) => c.id === chapterParam)?.id;

  let videos: VideoEntry[] = [];
  let failed = false;
  try {
    videos = videosForStudent(await listPublished({ subject, caseId: chapter }), grade, board);
  } catch {
    failed = true;
  }
  const filtered = !!subject;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <p className="label text-evidence-dark">{t.label}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{t.title}</h1>
        <RedThread className="mt-4" />
        <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.intro}</p>
      </header>

      <nav aria-label={t.filterLabel} className="mt-6 space-y-4 rounded-[3px] bg-manila-100/60 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label mr-2 w-16 text-ink-soft">{t.subject}</span>
          <Link href={href()} aria-current={!subject ? "true" : undefined} className={chip(!subject)}>
            {t.all}
          </Link>
          {getSubjects(grade, board).map((s) => (
            <Link key={s.id} href={href(s.id)} aria-current={subject === s.id ? "true" : undefined} className={chip(subject === s.id)}>
              {s.label}
            </Link>
          ))}
        </div>
        {entry && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="label mr-2 w-16 text-ink-soft">{t.chapter}</span>
            <Link href={href(subject)} aria-current={!chapter ? "true" : undefined} className={chip(!chapter)}>
              {t.all}
            </Link>
            {entry.chapters.map((c) => (
              <Link key={c.id} href={href(subject, c.id)} aria-current={chapter === c.id ? "true" : undefined} className={chip(chapter === c.id)}>
                {c.title}
                {c.grade ? ` · ${copy.grades.label(c.grade)}` : ""}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {failed ? (
        <div role="alert" className="mt-8 rounded-[3px] bg-paper-dark p-6">
          <p className="font-display text-2xl">{t.errorTitle}</p>
          <p className="mt-1 text-ink-soft">{t.errorText}</p>
          <div className="mt-4">
            <Button href={href(subject, chapter)}>{t.tryAgain}</Button>
          </div>
        </div>
      ) : videos.length > 0 ? (
        <>
          <p className="mt-6 text-ink-soft" role="status">
            {t.showing(videos.length)}
          </p>
          <h2 className="sr-only">{t.title}</h2>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}>
                <VideoCard video={v} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-8 rounded-[3px] bg-paper-dark p-8 text-center" role="status">
          <PlayIcon width={36} height={36} className="mx-auto text-ink-soft" />
          <p className="mt-3 font-display text-2xl">{t.emptyTitle}</p>
          <p className="mx-auto mt-1 max-w-md text-ink-soft">{t.emptyText}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {filtered && (
              <Button href="/videos" variant="secondary">
                {t.clearFilters}
              </Button>
            )}
            <Button href="/cases">{t.emptyCta}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
