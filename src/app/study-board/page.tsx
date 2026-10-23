import { StudyBoardView } from "@/components/study-board/StudyBoardView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.board };

export default function BoardPage() {
  return <StudyBoardView />;
}
