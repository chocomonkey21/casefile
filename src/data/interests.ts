import type { SubjectId } from "@/lib/types";

/** Things a student can say they like. Each maps to a subject, which helps pick the next case to suggest. */
export const INTERESTS: { id: string; label: string; subject: SubjectId }[] = [
  { id: "space", label: "Space", subject: "science" },
  { id: "animals", label: "Animals", subject: "science" },
  { id: "weather", label: "Weather and nature", subject: "science" },
  { id: "tech", label: "Technology", subject: "science" },
  { id: "puzzles", label: "Maths puzzles", subject: "maths" },
  { id: "history", label: "History", subject: "history" },
  { id: "myths", label: "Myths and legends", subject: "history" },
  { id: "maps", label: "Maps and travel", subject: "geography" },
  { id: "planet", label: "Volcanoes and earthquakes", subject: "geography" },
  { id: "sport", label: "Sport", subject: "maths" },
];

export const GRADES = [6, 7, 8, 9, 10] as const;
