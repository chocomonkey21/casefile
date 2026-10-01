import type { SubjectId } from "@/lib/types";

export const SUBJECTS: Record<SubjectId, { label: string; dot: string }> = {
  science: { label: "Science", dot: "bg-sage" },
  maths: { label: "Maths", dot: "bg-navy-light" },
  history: { label: "History", dot: "bg-evidence" },
  english: { label: "English", dot: "bg-highlighter-dark" },
  practice: { label: "Practice", dot: "bg-manila-600" },
};

export const SUBJECT_IDS = Object.keys(SUBJECTS) as SubjectId[];
