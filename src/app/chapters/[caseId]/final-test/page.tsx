import { notFound } from "next/navigation";
import { FinalTestView } from "@/components/final-test/FinalTestView";
import { PreviewNotice } from "@/components/ui/PreviewNotice";
import { CASES, getCase } from "@/data/cases";
import { getVerdict } from "@/data/verdicts";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.verdict };

export function generateStaticParams() {
  return CASES.map((c) => ({ caseId: c.id }));
}

export default async function FinalTestPage(props: PageProps<"/chapters/[caseId]/final-test">) {
  const { caseId } = await props.params;
  const caseDef = getCase(caseId);
  if (!caseDef) notFound();

  const questions = getVerdict(caseId);
  if (!questions) {
    return <PreviewNotice title={copy.preview.verdictTitle} blurb={copy.preview.verdictText} backHref={`/chapters/${caseId}`} />;
  }
  return <FinalTestView caseDef={caseDef} questions={questions} />;
}
