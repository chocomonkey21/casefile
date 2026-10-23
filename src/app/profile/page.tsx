import { ProfileView } from "@/components/profile/ProfileView";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.about };

export default function AboutPage() {
  return <ProfileView />;
}
