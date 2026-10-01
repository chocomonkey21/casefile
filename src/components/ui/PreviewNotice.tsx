import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";

/**
 * Shown for preview (stub) cases when a page has no content yet, such as the final test or the quiz.
 * Always offers a way out, so a student never hits a dead end.
 */
export function PreviewNotice({ title, blurb, backHref }: { title: string; blurb: string; backHref: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="label text-evidence-dark">{copy.preview.label}</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-prose text-lg text-ink-soft">{blurb}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={backHref}>{copy.preview.backToCase}</Button>
        <Button href="/cases/puddle" variant="secondary">
          {copy.preview.tryPuddle}
        </Button>
      </div>
    </div>
  );
}
