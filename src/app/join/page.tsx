import Link from "next/link";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { JoinFlow } from "@/components/onboarding/JoinFlow";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.join };

export default function JoinPage() {
  return (
    <>
      <SimpleHeader>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-semibold text-navy-100 underline underline-offset-4 hover:text-paper"
        >
          {copy.landing.home}
        </Link>
      </SimpleHeader>
      <main id="main-content" className="flex-1">
        <JoinFlow />
      </main>
    </>
  );
}
