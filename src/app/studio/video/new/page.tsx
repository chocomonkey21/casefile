import { connection } from "next/server";
import Link from "next/link";
import { RedThread } from "@/components/ui/RedThread";
import { requireEditor } from "@/lib/cms/auth";
import { pickerData } from "@/lib/cms/videos";
import { StudioShell } from "../../StudioShell";
import { VideoForm } from "../../VideoForm";

export const metadata = { title: "Add a video", robots: { index: false, follow: false } };

export default async function NewVideoPage() {
  await connection();
  await requireEditor();
  return (
    <StudioShell signedIn>
      <Link href="/studio" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:no-underline">
        ← All videos
      </Link>
      <h1 className="mt-2 text-3xl sm:text-4xl">Add a video</h1>
      <RedThread className="mt-4" />
      <VideoForm
        picker={pickerData()}
        initial={{
          title: "",
          description: "",
          subjectId: "",
          caseId: "",
          clueId: "",
          videoUrl: "",
          thumbnailUrl: "",
          captionsUrl: "",
          transcript: "",
          order: "",
          status: "draft",
        }}
      />
    </StudioShell>
  );
}
