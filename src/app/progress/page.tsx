import { ProgressView } from "@/components/progress/ProgressView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.lab };

export default function LabPage() {
  return <ProgressView />;
}
