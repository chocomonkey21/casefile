import { CasesLibrary } from "@/components/cases/CasesLibrary";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.cases };

export default function CasesPage() {
  return <CasesLibrary />;
}
