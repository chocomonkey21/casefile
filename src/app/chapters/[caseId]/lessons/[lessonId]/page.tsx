import { notFound } from "next/navigation";
import { LessonView } from "@/components/lesson/LessonView";
import { CASES, getCase } from "@/data/cases";
import { getLesson } from "@/data/lessons";
import { copy } from "@/lib/copy";

export function generateStaticParams() {
  return CASES.flatMap((c) => c.clues.map((clue) => ({ caseId: c.id, lessonId: clue.id })));
}

export async function generateMetadata(props: PageProps<"/chapters/[caseId]/lessons/[lessonId]">) {
  const { caseId, lessonId: clueId } = await props.params;
  const clue = getCase(caseId)?.clues.find((c) => c.id === clueId);
  return { title: clue?.title ?? copy.meta.clueNotFound };
}

export default async function LessonPage(props: PageProps<"/chapters/[caseId]/lessons/[lessonId]">) {
  const { caseId, lessonId: clueId } = await props.params;
  const caseDef = getCase(caseId);
  const clueIndex = caseDef?.clues.findIndex((c) => c.id === clueId) ?? -1;
  if (!caseDef || clueIndex === -1) notFound();

  return <LessonView caseDef={caseDef} clueIndex={clueIndex} lesson={getLesson(caseId, clueId)} />;
}
