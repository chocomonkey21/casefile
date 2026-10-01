import type { DiagramId } from "@/lib/types";
import { copy } from "@/lib/copy";
import { Diagram } from "./Diagrams";

type DiagramFigureProps = {
  diagramId: DiagramId;
  caption: string;
  alt: string;
  notice: string[];
};

/** A diagram with a caption and a short "what to notice" list. The alt text describes the whole picture. */
export function DiagramFigure({ diagramId, caption, alt, notice }: DiagramFigureProps) {
  return (
    <figure>
      <div className="overflow-hidden rounded-[2px] shadow-[0_1px_2px_rgb(36_25_19/0.3)]">
        <Diagram id={diagramId} alt={alt} />
      </div>
      <figcaption className="mt-2 text-ink-soft">{caption}</figcaption>
      <div className="mt-4 rounded-[3px] bg-manila-100 p-4">
        <p className="label text-ink-soft">{copy.lesson.noticeHeading}</p>
        <ul className="mt-2 space-y-2">
          {notice.map((n) => (
            <li key={n} className="flex gap-4">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-evidence" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
