import { getCase } from "@/data/cases";
import { canOpenCase } from "./access";
import type { VideoEntry } from "./cms/types";
import type { Board, Grade } from "./types";

/*
  Videos follow the chapter they belong to: same grade rule, same board.
  ASSUMPTION: a video an editor attached to a whole subject (no chapter) has no grade or board, so every signed-up
  student can see it. The editor desk has no grade or board field; add one there if subject-wide videos need limits.
*/

export function canWatch(grade: Grade | null, board: Board, video: Pick<VideoEntry, "caseId">): boolean {
  if (grade === null) return false;
  const chapter = video.caseId ? getCase(video.caseId) : undefined;
  return chapter ? canOpenCase(grade, board, chapter) : true;
}

export function videosForStudent<T extends Pick<VideoEntry, "caseId">>(videos: T[], grade: Grade | null, board: Board): T[] {
  return videos.filter((v) => canWatch(grade, board, v));
}
