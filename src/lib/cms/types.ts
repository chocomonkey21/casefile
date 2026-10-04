import type { SubjectId } from "@/lib/types";

export type VideoStatus = "draft" | "published";

/** One video entry, as an editor manages it. Only published entries are ever shown to learners. */
export type VideoEntry = {
  id: string;
  title: string;
  description: string;
  subjectId: SubjectId;
  /** A chapter is a case, so this is a case id. Empty for a video about the whole subject. */
  caseId: string | null;
  /** A lesson is a clue inside that case. Only set when caseId is set. */
  clueId: string | null;
  /** An https address, or a path to an image in this site's public folder */
  thumbnailUrl: string | null;
  /** The address the editor pasted: YouTube, Vimeo, or a direct .mp4 / .webm / .ogv link */
  videoUrl: string;
  /** WebVTT captions file. Only used by direct video files. */
  captionsUrl: string | null;
  transcript: string;
  /** Lower numbers come first */
  order: number;
  status: VideoStatus;
  createdAt: string;
  updatedAt: string;
  /** Credit: the video's own title and channel on YouTube. Set on the built-in lesson videos. */
  sourceTitle?: string;
  channel?: string;
  /** A caveat for teachers and parents, such as advanced vocabulary or difficult subject matter */
  note?: string;
  /** True for the lesson videos that ship with the project (src/data/videos-curated.ts). They cannot be edited in the editor desk. */
  builtin?: boolean;
};

export type StoreKind = "upstash" | "file" | "none";
