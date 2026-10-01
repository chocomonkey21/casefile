import { notFound } from "next/navigation";
import { InterrogationRoom, type RoomQuestion } from "@/components/quiz/InterrogationRoom";
import { PreviewNotice } from "@/components/ui/PreviewNotice";
import { CASES, getCase } from "@/data/cases";
import { getLesson } from "@/data/lessons";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.interrogation };

export function generateStaticParams() {
  return CASES.flatMap((c) => [...c.clues.map((clue) => ({ caseId: c.id, clueId: clue.id })), { caseId: c.id, clueId: "refresh" }]);
}

/**
 * /interrogation/<clueId> quizzes one clue and solves it at the end.
 * /interrogation/refresh is the short refresher for a cold case: one question from each clue.
 */
export default async function InterrogationPage(props: PageProps<"/cases/[caseId]/interrogation/[clueId]">) {
  const { caseId, clueId } = await props.params;
  const caseDef = getCase(caseId);
  if (!caseDef) notFound();

  if (clueId === "refresh") {
    const questions: RoomQuestion[] = caseDef.clues.flatMap((c) => {
      const first = getLesson(caseId, c.id)?.quiz[0];
      return first ? [{ clueId: c.id, question: first }] : [];
    });
    if (questions.length === 0) {
      return <PreviewNotice title={copy.preview.reviewTitle} blurb={copy.preview.reviewText} backHref={`/cases/${caseId}`} />;
    }
    // One question per clue. The room narrows this to the clues the student has solved.
    return <InterrogationRoom caseDef={caseDef} mode="refresh" questions={questions} />;
  }

  if (!caseDef.clues.some((c) => c.id === clueId)) notFound();
  const lesson = getLesson(caseId, clueId);
  if (!lesson) {
    return <PreviewNotice title={copy.preview.roomTitle} blurb={copy.preview.roomText} backHref={`/cases/${caseId}`} />;
  }
  return (
    <InterrogationRoom
      caseDef={caseDef}
      mode="clue"
      clueId={clueId}
      questions={lesson.quiz.map((question) => ({ clueId, question }))}
    />
  );
}
