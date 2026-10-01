import type { SubjectId } from "@/lib/types";

export const SUBJECTS: Record<SubjectId, { label: string; dot: string }> = {
  science: { label: "Science", dot: "bg-desk" },
  maths: { label: "Maths", dot: "bg-coffee" },
  history: { label: "History", dot: "bg-evidence" },
  english: { label: "English", dot: "bg-postit-dark" },
  practice: { label: "Practice", dot: "bg-manila-600" },
};

export const SUBJECT_IDS = Object.keys(SUBJECTS) as SubjectId[];
