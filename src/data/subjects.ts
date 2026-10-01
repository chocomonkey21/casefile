import type { SubjectId } from "@/lib/types";

/** Each subject has an old stamp-pad ink, used for its dot and its folder stamp */
export const SUBJECTS: Record<SubjectId, { label: string; dot: string; ink: string }> = {
  science: { label: "Science", dot: "bg-stamp-olive", ink: "text-stamp-olive" },
  maths: { label: "Maths", dot: "bg-stamp-violet", ink: "text-stamp-violet" },
  history: { label: "History", dot: "bg-stamp-oxblood", ink: "text-stamp-oxblood" },
  geography: { label: "Geography", dot: "bg-stamp-sepia", ink: "text-stamp-sepia" },
  practice: { label: "Practice", dot: "bg-manila-600", ink: "text-ink-soft" },
};

export const SUBJECT_IDS = Object.keys(SUBJECTS) as SubjectId[];
