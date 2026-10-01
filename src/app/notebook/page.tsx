import { NotebookView } from "@/components/notebook/NotebookView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.notebook };

export default function NotebookPage() {
  return <NotebookView />;
}
