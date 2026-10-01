import { LabView } from "@/components/lab/LabView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.lab };

export default function LabPage() {
  return <LabView />;
}
