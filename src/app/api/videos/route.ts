import { listPublished } from "@/lib/cms/videos";
import type { VideoEntry } from "@/lib/cms/types";

/** What a video card needs. The video address and transcript are only sent on the watch page. */
export type VideoSummary = Pick<
  VideoEntry,
  "id" | "title" | "description" | "subjectId" | "caseId" | "clueId" | "thumbnailUrl"
>;

const clean = (v: string | null) => (v && /^[a-z0-9-]{1,80}$/.test(v) ? v : undefined);

/** Public and read-only. It can only ever return published videos. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  try {
    const videos = await listPublished({
      subject: clean(params.get("subject")),
      caseId: clean(params.get("chapter")),
      clueId: clean(params.get("lesson")),
    });
    const summaries: VideoSummary[] = videos.map(({ id, title, description, subjectId, caseId, clueId, thumbnailUrl }) => ({
      id,
      title,
      description,
      subjectId,
      caseId,
      clueId,
      thumbnailUrl,
    }));
    return Response.json({ videos: summaries }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
