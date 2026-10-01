import type { Block } from "@/lib/types";

/** Renders the simple content blocks used by reading evidence. Body text stays in DM Sans. */
export function ReadingBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-prose space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-lg leading-relaxed">
                {block.text}
              </p>
            );
          case "h":
            return (
              <h4 key={i} className="pt-2 text-xl">
                {block.text}
              </h4>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-relaxed">
                    <span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-evidence" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "tip":
            return (
              <div key={i} role="note" className="rounded-md border-l-8 border-postit-dark bg-postit-light/70 p-4">
                <p className="label text-ink">{block.title}</p>
                <p className="mt-1 text-lg font-medium">{block.text}</p>
              </div>
            );
        }
      })}
    </div>
  );
}
