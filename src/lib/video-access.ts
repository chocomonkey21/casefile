import { getCase } from "@/data/cases";
import { canAccessGrade } from "./access";
import type { VideoEntry } from "./cms/types";
import type { Grade } from "./types";

/*
  Videos take their grade from the chapter they belong to.
  ASSUMPTION: a video an editor attached to a whole subject (no chapter) has no grade, so every signed-up
  student can see it. The editor desk has no grade field; add one there if subject-wide videos need limits.
*/

export function videoGrade(video: Pick<VideoEntry, "caseId">): Grade | undefined {
  return video.caseId ? getCase(video.caseId)?.grade : undefined;
}

export function canWatch(studentGrade: Grade | null, video: Pick<VideoEntry, "caseId">): boolean {
  return canAccessGrade(studentGrade, videoGrade(video));
}

export function videosForGrade<T extends Pick<VideoEntry, "caseId">>(videos: T[], studentGrade: Grade | null): T[] {
  return videos.filter((v) => canWatch(studentGrade, v));
}
