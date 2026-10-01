import { BoardView } from "@/components/board/BoardView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.board };

export default function BoardPage() {
  return <BoardView />;
}
