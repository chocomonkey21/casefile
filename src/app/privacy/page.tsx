import Link from "next/link";
import { RedThread } from "@/components/ui/RedThread";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.privacy.meta };

const t = copy.privacy;

/**
 * The privacy policy. Every statement describes what the code actually does:
 * student data stays in the browser (lib/store.ts), grade and board cookies (lib/access.ts), teacher accounts and
 * the Drawer (lib/teach/*), videos load only after Play (components/videos/VideoPlayer.tsx).
 * The operator's name and contact address are not known yet, so the page says so instead of inventing them.
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="label text-evidence-dark">{t.label}</p>
      <h1 className="mt-1 text-4xl sm:text-5xl">{t.title}</h1>
      <RedThread className="mt-4" />
      <p className="mt-2 text-sm text-ink-soft">{t.updated}</p>
      <p className="mt-4 max-w-prose text-lg">{t.intro}</p>

      <nav aria-label={t.title} className="mt-6 rounded-[3px] bg-manila-100/60 p-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {t.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:no-underline">
                {s.heading}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:no-underline">
              {t.contactHeading}
            </a>
          </li>
        </ul>
      </nav>

      {t.sections.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mt-10 scroll-mt-24">
          <h2 id={`${s.id}-heading`} className="text-2xl sm:text-3xl">
            {s.heading}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-lg leading-relaxed">
            {s.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      ))}

      <section id="contact" aria-labelledby="contact-heading" className="mt-10 scroll-mt-24">
        <h2 id="contact-heading" className="text-2xl sm:text-3xl">
          {t.contactHeading}
        </h2>
        <p className="mt-3 max-w-prose rounded-[3px] bg-paper-dark p-4 text-lg">{t.contactPending}</p>
      </section>

      <p className="mt-10">
        <Link href="/families" className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline">
          {copy.families.heading}
        </Link>
      </p>
    </div>
  );
}
