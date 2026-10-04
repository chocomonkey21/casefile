import { getStudentAccess } from "@/lib/access-server";
import { listPublished } from "@/lib/cms/videos";
import { videosForStudent } from "@/lib/video-access";
import type { VideoEntry } from "@/lib/cms/types";

/** What a video card needs. The video address and transcript are only sent on the watch page. */
export type VideoSummary = Pick<
  VideoEntry,
  "id" | "title" | "description" | "subjectId" | "caseId" | "clueId" | "thumbnailUrl" | "channel"
>;

const clean = (v: string | null) => (v && /^[a-z0-9-]{1,80}$/.test(v) ? v : undefined);

/** Read-only, for signed-up students (proxy.ts). Only published videos, and only those open to the student's grade and board. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const { grade, board } = await getStudentAccess();
  if (grade === null) return Response.json({ error: "profile-required" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  try {
    const all = await listPublished({
      subject: clean(params.get("subject")),
      caseId: clean(params.get("chapter")),
      clueId: clean(params.get("lesson")),
    });
    const videos = videosForStudent(all, grade, board);
    const summaries: VideoSummary[] = videos.map(({ id, title, description, subjectId, caseId, clueId, thumbnailUrl, channel }) => ({
      id,
      title,
      description,
      subjectId,
      caseId,
      clueId,
      thumbnailUrl,
      channel,
    }));
    return Response.json({ videos: summaries }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
