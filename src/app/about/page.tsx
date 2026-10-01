import { AboutView } from "@/components/profile/AboutView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.about };

export default function AboutPage() {
  return <AboutView />;
}
