import { HomeView } from "@/components/home/HomeView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.desk };

export default function DeskPage() {
  return <HomeView />;
}
