import { notFound } from "next/navigation";
import { QuizRoom, type RoomQuestion } from "@/components/quiz/QuizRoom";
import { PreviewNotice } from "@/components/ui/PreviewNotice";
import { CASES, getCase } from "@/data/cases";
import { getLesson } from "@/data/lessons";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.interrogation };

export function generateStaticParams() {
  return CASES.flatMap((c) => [...c.clues.map((clue) => ({ caseId: c.id, lessonId: clue.id })), { caseId: c.id, lessonId: "refresh" }]);
}

/**
 * /quiz/<lessonId> quizzes one lesson and completes it at the end.
 * /quiz/refresh is the short refresher for a case that needs revising: one question from each lesson.
 */
export default async function QuizPage(props: PageProps<"/cases/[caseId]/quiz/[lessonId]">) {
  const { caseId, lessonId: clueId } = await props.params;
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
    return <QuizRoom caseDef={caseDef} mode="refresh" questions={questions} />;
  }

  if (!caseDef.clues.some((c) => c.id === clueId)) notFound();
  const lesson = getLesson(caseId, clueId);
  if (!lesson) {
    return <PreviewNotice title={copy.preview.roomTitle} blurb={copy.preview.roomText} backHref={`/cases/${caseId}`} />;
  }
  return (
    <QuizRoom
      caseDef={caseDef}
      mode="clue"
      clueId={clueId}
      questions={lesson.quiz.map((question) => ({ clueId, question }))}
    />
  );
}
