import { notFound } from "next/navigation";
import { CaseFileView } from "@/components/case/CaseFileView";
import { CASES, getCase } from "@/data/cases";
import { CASE_TABS } from "@/lib/case-tabs";
import { copy } from "@/lib/copy";

export function generateStaticParams() {
  return CASES.map((c) => ({ caseId: c.id }));
}

export async function generateMetadata(props: PageProps<"/cases/[caseId]">) {
  const { caseId } = await props.params;
  return { title: getCase(caseId)?.title ?? copy.meta.caseNotFound };
}

export default async function CasePage(props: PageProps<"/cases/[caseId]">) {
  const { caseId } = await props.params;
  const { tab } = await props.searchParams;
  const caseDef = getCase(caseId);
  if (!caseDef) notFound();

  // ?tab=clues lets other pages deep link straight to a tab
  const initialTab = CASE_TABS.find((t) => t === tab) ?? "brief";
  return <CaseFileView caseDef={caseDef} initialTab={initialTab} />;
}
