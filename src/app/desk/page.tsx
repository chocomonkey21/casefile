import { DeskView } from "@/components/desk/DeskView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.desk };

export default function DeskPage() {
  return <DeskView />;
}
