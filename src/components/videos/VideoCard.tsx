import Link from "next/link";
import { PlayIcon } from "@/components/ui/Icons";
import { getCase } from "@/data/cases";
import { SUBJECTS } from "@/data/subjects";
import { copy } from "@/lib/copy";
import type { VideoEntry } from "@/lib/cms/types";

type CardVideo = Pick<VideoEntry, "id" | "title" | "subjectId" | "caseId" | "thumbnailUrl"> & { channel?: string };

/** A video as a printed photo on the desk: a still, a title, and where it belongs. The whole card is one link. */
export function VideoCard({ video }: { video: CardVideo }) {
  const subject = SUBJECTS[video.subjectId];
  const chapter = video.caseId ? getCase(video.caseId) : undefined;
  return (
    <Link
      href={`/videos/${video.id}`}
      className="tex-paper tex-worn group flex h-full flex-col rounded-[3px] p-2 pb-4 shadow-card transition-transform active:scale-[0.99] motion-safe:hover:-translate-y-0.5"
    >
      <span className="relative block aspect-video overflow-hidden rounded-[2px] bg-espresso">
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- editor-supplied address, so next/image would need every host listed
          <img src={video.thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center bg-manila-400 font-display text-ink">
            <span className="text-3xl">{chapter?.grade ? copy.grades.label(chapter.grade) : copy.videos.noThumb}</span>
            <span className="text-base">{subject.label}</span>
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/95 text-ink shadow-card group-hover:bg-postit"
        >
          <PlayIcon width={20} height={20} />
        </span>
      </span>
      <span className="mt-3 block px-2">
        <span className="label flex items-center gap-2 text-ink-soft">
          <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${subject.dot}`} />
          {subject.label}
        </span>
        <span className="mt-1 block font-display text-xl leading-snug">{video.title}</span>
        {chapter && (
          <span className="mt-1 block text-sm text-ink-soft">
            {chapter.title}
            {chapter.grade ? ` · ${copy.grades.label(chapter.grade)}` : ""}
          </span>
        )}
        {video.channel && <span className="mt-1 block text-sm text-ink-soft">{video.channel}</span>}
      </span>
    </Link>
  );
}
