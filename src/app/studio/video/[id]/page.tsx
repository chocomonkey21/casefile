import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { RedThread } from "@/components/ui/RedThread";
import { requireEditor } from "@/lib/cms/auth";
import { getAny, pickerData } from "@/lib/cms/videos";
import { StudioShell } from "../../StudioShell";
import { VideoForm } from "../../VideoForm";

export const metadata = { title: "Edit video", robots: { index: false, follow: false } };

export default async function EditVideoPage(props: PageProps<"/studio/video/[id]">) {
  await connection();
  await requireEditor();
  const { id } = await props.params;
  const video = await getAny(id);
  if (!video) notFound();
  return (
    <StudioShell signedIn>
      <Link href="/studio" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:no-underline">
        ← All videos
      </Link>
      <h1 className="mt-2 text-3xl sm:text-4xl">Edit video</h1>
      <RedThread className="mt-4" />
      <VideoForm
        id={video.id}
        picker={pickerData()}
        initial={{
          title: video.title,
          description: video.description,
          subjectId: video.subjectId,
          caseId: video.caseId ?? "",
          clueId: video.clueId ?? "",
          videoUrl: video.videoUrl,
          thumbnailUrl: video.thumbnailUrl ?? "",
          captionsUrl: video.captionsUrl ?? "",
          transcript: video.transcript,
          order: String(video.order),
          status: video.status,
        }}
      />
    </StudioShell>
  );
}
