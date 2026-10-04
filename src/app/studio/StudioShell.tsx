import type { ReactNode } from "react";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { logoutAction } from "./actions";

/** Frame for every editor page. It is never linked from the learner site. */
export function StudioShell({ children, signedIn }: { children: ReactNode; signedIn: boolean }) {
  return (
    <>
      <SimpleHeader>
        <span className="label text-beige">Editor desk</span>
        {signedIn && (
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center font-semibold text-beige underline underline-offset-4 hover:text-paper"
            >
              Sign out
            </button>
          </form>
        )}
      </SimpleHeader>
      <main id="main-content" className="flex-1">
        <div className="sheet mx-2 mb-2 mt-4 sm:mx-8 sm:mb-8 sm:mt-6 xl:mx-auto xl:max-w-[80rem]">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>
        </div>
      </main>
    </>
  );
}
