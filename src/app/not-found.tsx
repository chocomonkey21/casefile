import { Button } from "@/components/ui/Button";
import { Stamp } from "@/components/ui/Stamp";
import { copy } from "@/lib/copy";

export const metadata = { title: copy.meta.notFound };

/** Wrong address: the page is missing. Friendly, with a way back. */
export default function NotFound() {
  const t = copy.notFound;
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
      <Stamp tone="red" size="lg" rotate={-6}>
        {t.stamp}
      </Stamp>
      <h1 className="mt-6 text-4xl sm:text-5xl">{t.title}</h1>
      <p className="mx-auto mt-4 max-w-prose text-lg text-ink-soft">{t.text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Button href="/desk" size="lg">
          {t.toDesk}
        </Button>
        <Button href="/cases" variant="secondary" size="lg">
          {t.browse}
        </Button>
      </div>
    </div>
  );
}
