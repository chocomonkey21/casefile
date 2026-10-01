import { notFound } from "next/navigation";
import { ClueView } from "@/components/lesson/ClueView";
import { CASES, getCase } from "@/data/cases";
import { getLesson } from "@/data/lessons";
import { copy } from "@/lib/copy";

export function generateStaticParams() {
  return CASES.flatMap((c) => c.clues.map((clue) => ({ caseId: c.id, clueId: clue.id })));
}

export async function generateMetadata(props: PageProps<"/cases/[caseId]/clues/[clueId]">) {
  const { caseId, clueId } = await props.params;
  const clue = getCase(caseId)?.clues.find((c) => c.id === clueId);
  return { title: clue?.title ?? copy.meta.clueNotFound };
}

export default async function CluePage(props: PageProps<"/cases/[caseId]/clues/[clueId]">) {
  const { caseId, clueId } = await props.params;
  const caseDef = getCase(caseId);
  const clueIndex = caseDef?.clues.findIndex((c) => c.id === clueId) ?? -1;
  if (!caseDef || clueIndex === -1) notFound();

  return <ClueView caseDef={caseDef} clueIndex={clueIndex} lesson={getLesson(caseId, clueId)} />;
}
