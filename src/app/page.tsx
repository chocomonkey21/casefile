import { DeskIllustration, DeskIllustrationCompact } from "@/components/landing/DeskIllustration";
import Link from "next/link";
import { FinalAction, HeaderNav, HeroActions } from "@/components/landing/LandingActions";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CASES } from "@/data/cases";
import { SUBJECTS } from "@/data/subjects";
import { copy } from "@/lib/copy";
import { RedThread } from "@/components/ui/RedThread";
import { StepStamp } from "@/components/ui/StepStamp";

const t = copy.landing;

export default function Home() {
  // Every real case, so the copy ("science, maths, history and geography") matches what is shown.
  // The practice case is left out: it belongs to sign-up, not the library.
  const peek = CASES.filter((c) => !c.practice);

  return (
    <>
      <SimpleHeader>
        <HeaderNav />
      </SimpleHeader>

      <main id="main-content" className="flex-1">
        <div className="sheet mx-2 mb-2 mt-4 sm:mx-8 sm:mb-8 sm:mt-6 xl:mx-auto xl:max-w-[80rem] overflow-hidden">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          {/* Phones only: a short strip of the desk above the headline. Wider screens get the full scene beside it. */}
          <div className="sm:hidden">
            <DeskIllustrationCompact />
          </div>
          <div>
            <p className="label text-evidence-dark">{t.eyebrow}</p>
            <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">{t.heading}</h1>
<RedThread className="mt-4" />
            <p className="mt-6 max-w-lg text-xl text-ink-soft">{t.text}</p>
            <div className="mt-8">
              <HeroActions />
            </div>
            <p className="mt-4 text-sm text-ink-soft">{t.note}</p>
          </div>
          <div className="mx-auto hidden w-full max-w-xl sm:block">
            <DeskIllustration />
          </div>
        </section>

        {/* How it works */}
        <section id="how" aria-labelledby="how-heading" className="scroll-mt-4 bg-manila-100/70">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 id="how-heading" className="text-3xl sm:text-4xl">
              {t.howHeading}
            </h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {t.steps.map((s, i) => (
                <li key={s.title} className="tex-paper tex-worn relative rounded-[3px] p-6 shadow-card">
                  <StepStamp index={i} size="lg" />
                  <h3 className="mt-4 text-2xl">{s.title}</h3>
                  <p className="mt-2 text-lg text-ink-soft">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* A peek at the cases */}
        <section aria-labelledby="peek-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="peek-heading" className="text-3xl sm:text-4xl">
            {t.peekHeading}
          </h2>
          <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.peekText}</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {peek.map((c) => (
              <li key={c.id} className="relative pt-8">
                <div
                  aria-hidden="true"
                  className="tex-manila absolute left-0 top-0 flex h-10 items-center rounded-t-[3px] bg-manila-400 px-4 font-display text-sm tracking-[0.2em]"
                >
                  {copy.folder.caseNo(c.number)}
                </div>
                {/* The whole folder is one link to the case preview, so it works with keyboard and screen readers */}
                <Link
                  href={`/cases/${c.id}`}
                  aria-label={t.peekOpen(c.title)}
                  className="tex-manila tex-worn tex-crease group block h-full rounded-b-[3px] rounded-tr-[3px] p-6 shadow-folder transition-transform active:scale-[0.99] motion-safe:hover:-translate-y-0.5"
                >
                  <p className="label flex items-center gap-2 text-ink-soft">
                    <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${SUBJECTS[c.subject].dot}`} />
                    {SUBJECTS[c.subject].label}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug">{c.title}</h3>
                  <p className="mt-2 text-ink-soft">{c.tagline}</p>
                  <p className="mt-4 flex items-center justify-between gap-2 text-sm font-semibold">
                    <span>{t.lessons(c.clues.length)}</span>
                    <span aria-hidden="true" className="text-evidence-dark underline underline-offset-4 group-hover:no-underline">
                      {t.peekCta} →
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Trust: only facts the code supports. Unknowns are shown as labelled placeholders. */}
        <section aria-labelledby="trust-heading" className="bg-manila-100/70">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 id="trust-heading" className="text-3xl sm:text-4xl">
              {t.trust.heading}
            </h2>
            <p className="mt-2 max-w-prose text-lg text-ink-soft">{t.trust.text}</p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.trust.items.map((item) => (
                <li
                  key={item.title}
                  className={`rounded-[3px] p-5 shadow-card ${item.pending ? "tex-postit" : "tex-paper tex-worn"}`}
                >
                  <h3 className="text-xl leading-snug">{item.title}</h3>
                  <p className="mt-2 text-ink-soft">{item.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href="/families"
                className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline"
              >
                {t.trust.linkAll}
              </Link>
            </p>
          </div>
        </section>

        {/* Final call */}
        <section aria-labelledby="join-heading" className="on-dark bg-coffee">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6">
            <div className="max-w-xl">
              <h2 id="join-heading" className="text-3xl sm:text-4xl">
                {t.finalHeading}
              </h2>
              <p className="mt-2 text-lg text-beige">{t.finalText}</p>
            </div>
            <FinalAction />
          </div>
        </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
