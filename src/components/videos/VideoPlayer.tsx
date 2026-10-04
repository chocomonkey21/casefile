"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/ui/Icons";
import { copy } from "@/lib/copy";

type Props = {
  title: string;
  provider: "youtube" | "vimeo" | "file";
  embedUrl: string;
  openUrl: string;
  captionsUrl: string | null;
  thumbnailUrl: string | null;
};

const t = copy.videos;

/**
 * Plays a video on the page without sending the learner away.
 *
 * Nothing is loaded from the video host until the learner presses Play, so just opening a lesson or the
 * video list does not contact YouTube or Vimeo. After Play, focus moves into the player so the keyboard
 * controls work straight away. A "trouble playing" note with a link to the original is always shown,
 * because a browser cannot tell the page when an embedded player has been blocked.
 */
export function VideoPlayer({ title, provider, embedUrl, openUrl, captionsUrl, thumbnailUrl }: Props) {
  const [started, setStarted] = useState(false);
  const [fileFailed, setFileFailed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const file = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (started) (frame.current ?? file.current)?.focus();
  }, [started]);

  const host = t.hosts[provider];
  const src = provider === "file" ? embedUrl : `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-[3px] bg-espresso shadow-folder">
        {!started ? (
          <button
            type="button"
            onClick={() => setStarted(true)}
            aria-label={t.play(title)}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {thumbnailUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- editor-supplied address
              <img src={thumbnailUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            )}
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-paper text-ink shadow-folder transition-transform group-hover:bg-postit motion-safe:group-hover:scale-105 motion-safe:group-active:scale-95">
              <PlayIcon width={32} height={32} />
            </span>
          </button>
        ) : provider === "file" ? (
          fileFailed ? (
            <p role="alert" className="flex h-full items-center justify-center p-6 text-center text-paper">
              {t.directFailed}
            </p>
          ) : (
            <video
              ref={file}
              className="h-full w-full"
              controls
              autoPlay
              playsInline
              preload="metadata"
              aria-label={t.playerLabel(title)}
              onError={() => setFileFailed(true)}
            >
              <source src={src} />
              {captionsUrl && <track kind="captions" srcLang="en" label="English" src={captionsUrl} default />}
            </video>
          )
        ) : (
          <iframe
            ref={frame}
            title={t.playerLabel(title)}
            src={src}
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
          />
        )}
      </div>

      {!started && <p className="mt-2 text-sm text-ink-soft">{t.playNote}</p>}

      <div className="mt-4 rounded-[3px] bg-paper-dark p-4">
        <p className="font-semibold">{t.fallbackTitle}</p>
        <p className="text-ink-soft">{t.fallbackText}</p>
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-11 items-center font-semibold text-evidence-dark underline underline-offset-4 hover:no-underline"
        >
          {t.openAt(host)}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
