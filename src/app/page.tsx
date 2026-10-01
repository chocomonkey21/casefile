import { DeskIllustration } from "@/components/landing/DeskIllustration";
import { FinalAction, HeaderAction, HeroActions } from "@/components/landing/LandingActions";
import { SimpleHeader } from "@/components/layout/SimpleHeader";
import { CASES } from "@/data/cases";
import { SUBJECTS } from "@/data/subjects";
import { copy } from "@/lib/copy";

const t = copy.landing;

export default function Home() {
  // A peek at real cases, without the saved-progress bits
  const peek = CASES.filter((c) => !c.practice);

  return (
    <>
      <SimpleHeader>
        <HeaderAction />
      </SimpleHeader>

      <main id="main-content" className="flex-1">
        <div className="sheet mx-2 mb-2 mt-3 sm:mx-8 sm:mb-8 sm:mt-6 xl:mx-auto xl:max-w-[80rem] overflow-hidden">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div>
            <p className="label text-evidence-dark">{t.eyebrow}</p>
            <h1 className="mt-3 text-5xl leading-[1.05] sm:text-6xl">{t.heading}</h1>
            <p className="mt-5 max-w-lg text-xl text-ink-soft">{t.text}</p>
            <div className="mt-8">
              <HeroActions />
            </div>
            <p className="mt-4 text-sm text-ink-soft">{t.note}</p>
          </div>
          <div className="mx-auto w-full max-w-xl">
            <DeskIllustration />
          </div>
        </section>

        {/* How it works */}
        <section id="how" aria-labelledby="how-heading" className="scroll-mt-4 border-y-2 border-manila-600/30 bg-manila-100/70">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 id="how-heading" className="text-3xl sm:text-4xl">
              {t.howHeading}
            </h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {t.steps.map((s, i) => (
                <li key={s.title} className="tex-paper tex-worn relative rounded-2xl border-2 border-manila-600/40 p-6 shadow-card">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-evidence-dark font-display text-2xl text-evidence-dark"
                  >
                    {i + 1}
                  </span>
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
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {peek.slice(0, 3).map((c) => (
              <li key={c.id} className="relative pt-8">
                <div
                  aria-hidden="true"
                  className="tex-manila absolute left-0 top-0 flex h-10 items-center rounded-t-lg border-2 border-b-0 border-manila-600/50 bg-manila-400 px-4 font-display text-sm tracking-[0.2em]"
                >
                  {copy.folder.caseNo(c.number)}
                </div>
                <div className="tex-manila tex-worn tex-crease h-full rounded-b-xl rounded-tr-xl border-2 border-manila-600/50 p-5 shadow-folder">
                  <p className="label flex items-center gap-2 text-ink-soft">
                    <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${SUBJECTS[c.subject].dot}`} />
                    {SUBJECTS[c.subject].label}
                  </p>
                  <h3 className="mt-2 text-xl leading-snug">{c.title}</h3>
                  <p className="mt-2 text-ink-soft">{c.tagline}</p>
                  <p className="mt-3 text-sm font-semibold">{t.lessons(c.clues.length)}</p>
                </div>
              </li>
            ))}
          </ul>
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

      <footer className="on-dark border-t-4 border-brass bg-espresso py-6 text-center text-sm text-beige">
        <p>{t.footer}</p>
      </footer>
    </>
  );
}
