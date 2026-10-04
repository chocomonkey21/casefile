import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Button } from "@/components/ui/Button";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { PrevNext } from "@/components/ui/PrevNext";
import { RedThread } from "@/components/ui/RedThread";
import { VideoCard } from "@/components/videos/VideoCard";
import { VideoPlayer } from "@/components/videos/VideoPlayer";
import { getCase } from "@/data/cases";
import { SUBJECTS } from "@/data/subjects";
import { parseVideoUrl } from "@/lib/cms/embed";
import type { VideoEntry } from "@/lib/cms/types";
import { getPublished, listPublished } from "@/lib/cms/videos";
import { copy } from "@/lib/copy";

const t = copy.videos;

export async function generateMetadata(props: PageProps<"/videos/[id]">) {
  const { id } = await props.params;
  try {
    return { title: (await getPublished(id))?.title ?? t.notFound };
  } catch {
    return { title: t.title };
  }
}

/** The watch page: the player on this site, what the video is about, where it fits, and what to watch next. */
export default async function WatchPage(props: PageProps<"/videos/[id]">) {
  await connection();
  const { id } = await props.params;

  let video: VideoEntry | null = null;
  let siblings: VideoEntry[] = [];
  try {
    video = await getPublished(id);
    if (video) siblings = await listPublished(video.caseId ? { caseId: video.caseId } : { subject: video.subjectId });
  } catch {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div role="alert" className="rounded-[3px] bg-paper-dark p-6">
          <p className="font-display text-2xl">{t.errorTitle}</p>
          <p className="mt-1 text-ink-soft">{t.errorText}</p>
          <div className="mt-4 flex gap-3">
            <Button href={`/videos/${id}`}>{t.tryAgain}</Button>
            <Button href="/videos" variant="secondary">
              {t.backToVideos}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  // Drafts and unknown ids look the same to a learner
  if (!video) notFound();

  const subject = SUBJECTS[video.subjectId];
  const chapter = video.caseId ? getCase(video.caseId) : undefined;
  const lesson = chapter?.clues.find((c) => c.id === video.clueId);
  const parsed = parseVideoUrl(video.videoUrl);

  const crumbs: Crumb[] = [
    { label: t.title, href: "/videos" },
    { label: subject.label, href: `/videos?subject=${video.subjectId}` },
  ];
  if (chapter) crumbs.push({ label: chapter.title, href: `/videos?subject=${video.subjectId}&chapter=${chapter.id}` });
  crumbs.push({ label: video.title });

  const i = siblings.findIndex((v) => v.id === video.id);
  const link = (v: VideoEntry | undefined, label: string) => (v ? { href: `/videos/${v.id}`, label, title: v.title } : null);
  const more = siblings.filter((v) => v.id !== video.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <Breadcrumb items={crumbs} />

      <header className="mt-2">
        <p className="label flex items-center gap-2 text-ink-soft">
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${subject.dot}`} />
          {subject.label}
        </p>
        <h1 className="mt-1 text-3xl leading-tight sm:text-4xl">{video.title}</h1>
        <RedThread className="mt-4" />
      </header>

      <div className="mt-6">
        {parsed.ok ? (
          <VideoPlayer
            title={video.title}
            provider={parsed.video.provider}
            embedUrl={parsed.video.embedUrl}
            openUrl={parsed.video.openUrl}
            captionsUrl={video.captionsUrl}
            thumbnailUrl={video.thumbnailUrl}
          />
        ) : (
          // A saved address that no longer passes the checks is never embedded
          <div role="alert" className="rounded-[3px] bg-paper-dark p-6">
            <p className="font-semibold">{t.fallbackTitle}</p>
            <p className="text-ink-soft">{t.fallbackText}</p>
          </div>
        )}
      </div>

      {video.description && <p className="mt-6 max-w-prose text-lg text-ink-soft">{video.description}</p>}
      {video.channel && (
        <p className="mt-3 max-w-prose text-sm text-ink-soft">
          {t.credit(video.sourceTitle ?? video.title, video.channel)}
        </p>
      )}
      {video.note && (
        <p className="mt-3 max-w-prose rounded-[3px] bg-paper-dark p-3 text-sm">
          <span className="font-semibold">{t.noteLabel}</span> {video.note}
        </p>
      )}

      {(chapter || lesson) && (
        <section aria-labelledby="where-heading" className="tex-postit mt-6 rounded-[3px] p-5 shadow-card">
          <h2 id="where-heading" className="label text-ink">
            {t.relatedLesson}
          </h2>
          <ul className="mt-2 space-y-1">
            {lesson && chapter && (
              <li>
                <Link
                  href={`/cases/${chapter.id}/clues/${lesson.id}`}
                  className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:no-underline"
                >
                  {t.goToLesson}: {lesson.title}
                </Link>
              </li>
            )}
            {chapter && (
              <li>
                <Link
                  href={`/cases/${chapter.id}?tab=clues`}
                  className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline"
                >
                  {t.chapterLabel}: {chapter.title}
                </Link>
              </li>
            )}
          </ul>
        </section>
      )}

      <section aria-labelledby="transcript-heading" className="mt-8">
        <h2 id="transcript-heading" className="text-2xl">
          {t.transcript}
        </h2>
        {video.transcript ? (
          <details className="mt-2 rounded-[3px] bg-paper-dark p-4">
            <summary className="min-h-11 cursor-pointer py-2 font-semibold">{t.showTranscript}</summary>
            <div className="mt-2 max-w-prose whitespace-pre-line text-lg leading-relaxed">{video.transcript}</div>
          </details>
        ) : (
          <p className="mt-1 text-ink-soft">{t.noTranscript}</p>
        )}
      </section>

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="mt-10">
          <h2 id="more-heading" className="text-2xl sm:text-3xl">
            {chapter ? t.moreInChapter : t.moreInSubject(subject.label)}
          </h2>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((v) => (
              <li key={v.id}>
                <VideoCard video={v} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10">
        <PrevNext label={t.title} prev={link(siblings[i - 1], t.prevVideo)} next={link(siblings[i + 1], t.nextVideo)} />
      </div>
    </div>
  );
}
