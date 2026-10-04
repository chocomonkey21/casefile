"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { VideoSummary } from "@/app/api/videos/route";
import { copy } from "@/lib/copy";
import { VideoCard } from "./VideoCard";

type Props = {
  subject?: string;
  chapter?: string;
  lesson?: string;
  /** Heading text. The block is a section with its own heading, so it can sit anywhere on a page. */
  heading: string;
  headingId: string;
  intro?: string;
  /** Optional link shown beside the heading, for example to the full video list */
  seeAll?: { href: string; label: string };
};

type State = { status: "loading" } | { status: "error" } | { status: "ready"; videos: VideoSummary[] };

/**
 * Published videos for a subject, chapter or lesson, loaded after the page appears.
 * When there are none it renders nothing at all, so lessons without videos stay uncluttered.
 */
export function RelatedVideos({ subject, chapter, lesson, heading, headingId, intro, seeAll }: Props) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const q = new URLSearchParams();
    if (subject) q.set("subject", subject);
    if (chapter) q.set("chapter", chapter);
    if (lesson) q.set("lesson", lesson);
    fetch(`/api/videos?${q}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ videos: VideoSummary[] }>;
      })
      .then((data) => setState({ status: "ready", videos: data.videos }))
      .catch((e: Error) => {
        if (e.name !== "AbortError") setState({ status: "error" });
      });
    return () => controller.abort();
  }, [subject, chapter, lesson, attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  };

  if (state.status === "ready" && state.videos.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className="mt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={headingId} className="text-2xl sm:text-3xl">
          {heading}
        </h2>
        {seeAll && (
          <Link
            href={seeAll.href}
            className="inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline"
          >
            {seeAll.label}
          </Link>
        )}
      </div>
      {intro && <p className="mt-1 text-ink-soft">{intro}</p>}
      {state.status === "loading" && (
        <div role="status" aria-label={copy.videos.loading} className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="aspect-video animate-pulse rounded-[3px] bg-manila/60" />
        </div>
      )}
      {state.status === "error" && (
        <div role="alert" className="mt-4 rounded-[3px] bg-paper-dark p-4">
          <p className="font-semibold">{copy.videos.errorTitle}</p>
          <p className="text-ink-soft">{copy.videos.errorText}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-3 min-h-11 rounded-[3px] bg-espresso px-5 font-semibold text-paper hover:bg-coffee"
          >
            {copy.videos.tryAgain}
          </button>
        </div>
      )}
      {state.status === "ready" && (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {state.videos.map((v) => (
            <li key={v.id}>
              <VideoCard video={v} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
