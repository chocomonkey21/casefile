import Link from "next/link";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RedThread } from "@/components/ui/RedThread";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.families };

const t = copy.families;
const S = t.sections;

/** A clearly labelled gap. Nothing is claimed here until the team supplies the real answer. */
function Pending({ children }: { children: string }) {
  return (
    <div className="tex-postit mt-4 max-w-prose -rotate-[0.5deg] rounded-[3px] p-4 shadow-card">
      <p className="label text-evidence-dark">{t.pending}</p>
      <p className="mt-1 text-ink">{children}</p>
    </div>
  );
}

function Facts({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 max-w-prose list-disc space-y-2 pl-6 text-lg text-ink-soft">
      {items.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}

export default function FamiliesPage() {
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
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                <li>
                  <Link href="/" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:no-underline">
                    {copy.landing.home}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{t.eyebrow}</li>
              </ol>
            </nav>
            <p className="label mt-4 text-evidence-dark">{t.eyebrow}</p>
            <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">{t.heading}</h1>
            <RedThread className="mt-4" />
            <p className="mt-6 max-w-prose text-xl text-ink-soft">{t.intro}</p>

            <section id={S.privacy.id} aria-labelledby="privacy-heading" className="mt-12 scroll-mt-6">
              <h2 id="privacy-heading" className="text-3xl">
                {S.privacy.heading}
              </h2>
              <Facts items={S.privacy.facts} />
              <Pending>{S.privacy.pendingNote}</Pending>
            </section>

            <section id={S.content.id} aria-labelledby="content-heading" className="mt-12 scroll-mt-6">
              <h2 id="content-heading" className="text-3xl">
                {S.content.heading}
              </h2>
              <Pending>{S.content.pendingNote}</Pending>
            </section>

            <section id={S.curriculum.id} aria-labelledby="curriculum-heading" className="mt-12 scroll-mt-6">
              <h2 id="curriculum-heading" className="text-3xl">
                {S.curriculum.heading}
              </h2>
              <Facts items={S.curriculum.facts} />
              <Pending>{S.curriculum.pendingNote}</Pending>
            </section>

            <p className="mt-12">
              <Link href="/" className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline">
                ← {t.back}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
