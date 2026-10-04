import Link from "next/link";
import { copy } from "@/lib/copy";

const f = copy.landing.footerNav;

const linkClass =
  "inline-flex min-h-11 items-center text-beige underline underline-offset-4 hover:text-paper";

/** Footer for pages without the app nav. Links for families sit in their own labelled group. */
export function SiteFooter() {
  return (
    <footer className="on-dark bg-espresso text-sm">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl">{copy.brand.name}</p>
          <p className="mt-2 max-w-xs text-beige">{copy.landing.footer}</p>
        </div>
        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="label text-beige">
            {f.explore}
          </h2>
          <ul className="mt-2">
            <li>
              <Link href="/cases" className={linkClass}>
                {f.cases}
              </Link>
            </li>
            <li>
              <Link href="/#how" className={linkClass}>
                {f.how}
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-labelledby="footer-families">
          <h2 id="footer-families" className="label text-beige">
            {f.families}
          </h2>
          <ul className="mt-2">
            <li>
              <Link href="/families" className={linkClass}>
                {f.parents}
              </Link>
            </li>
            <li>
              <Link href="/families#privacy" className={linkClass}>
                {f.privacy}
              </Link>
            </li>
            <li>
              <Link href="/families#content" className={linkClass}>
                {f.content}
              </Link>
            </li>
            <li>
              <Link href="/families#curriculum" className={linkClass}>
                {f.curriculum}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
