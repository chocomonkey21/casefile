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
          className="inline-flex min-h-11 items-center font-semibold text-beige underline underline-offset-4 hover:text-paper"
        >
          {copy.landing.home}
        </Link>
      </SimpleHeader>
      <main id="main-content" className="flex-1">
        <div className="sheet mx-2 mb-2 mt-4 sm:mx-8 sm:mb-8 sm:mt-6 xl:mx-auto xl:max-w-[80rem]">
          <JoinFlow />
        </div>
      </main>
    </>
  );
}
