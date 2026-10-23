import { NotesView } from "@/components/notes/NotesView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.notebook };

export default function NotebookPage() {
  return <NotesView />;
}
