import Link from "next/link";
import { connection } from "next/server";
import { Button } from "@/components/ui/Button";
import { RedThread } from "@/components/ui/RedThread";
import { getCase } from "@/data/cases";
import { SUBJECTS } from "@/data/subjects";
import { getEditorState } from "@/lib/cms/auth";
import { storeKind } from "@/lib/cms/store";
import { listAll } from "@/lib/cms/videos";
import type { VideoEntry } from "@/lib/cms/types";
import { deleteVideoAction, moveAction, setStatusAction } from "./actions";
import { LoginForm } from "./LoginForm";
import { StudioShell } from "./StudioShell";

export const metadata = { title: "Editor desk", robots: { index: false, follow: false } };

const STORE_NOTE = {
  upstash: "Saving to Redis. Changes are kept between deployments.",
  file: "Saving to a file on this computer (.data/videos.json). Fine for trying things out. It is not available on Vercel.",
  none: "Saving is not set up on this server, so changes cannot be stored. Connect a Redis store to turn it on.",
} as const;

const small = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] px-3 text-sm font-semibold";

export default async function StudioPage(props: PageProps<"/studio">) {
  await connection();
  const state = await getEditorState();

  if (state.status === "not-configured") {
    return (
      <StudioShell signedIn={false}>
        <h1 className="text-3xl sm:text-4xl">Editor desk</h1>
        <RedThread className="mt-4" />
        <div role="status" className="tex-postit mt-6 max-w-prose rounded-[3px] p-5 shadow-card">
          <p className="font-display text-xl">Editing is switched off</p>
          <p className="mt-2">Editing stays off until the server has an editor password. Still missing:</p>
          <ul className="mt-2 list-disc pl-6">
            {state.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </StudioShell>
    );
  }

  if (state.status === "signed-out") {
    return (
      <StudioShell signedIn={false}>
        <h1 className="text-3xl sm:text-4xl">Editor desk</h1>
        <RedThread className="mt-4" />
        <p className="mt-4 max-w-prose text-ink-soft">For the people who manage CaseFile videos. Learners do not need this page.</p>
        <LoginForm />
      </StudioShell>
    );
  }

  const sp = await props.searchParams;
  let videos: VideoEntry[] = [];
  let loadError = false;
  try {
    videos = await listAll();
  } catch {
    loadError = true;
  }
  const kind = storeKind();
  const saved = typeof sp.saved === "string";
  const deleted = sp.deleted === "1";

  return (
    <StudioShell signedIn>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl">Videos</h1>
          <RedThread className="mt-4" />
        </div>
        {kind !== "none" && <Button href="/studio/video/new">Add a video</Button>}
      </div>

      <p className={`mt-4 max-w-prose ${kind === "none" ? "font-semibold text-evidence-dark" : "text-ink-soft"}`} role={kind === "none" ? "alert" : undefined}>
        {STORE_NOTE[kind]}
      </p>
      {(saved || deleted) && (
        <p role="status" className="mt-4 font-semibold text-desk-dark">
          {saved ? "Saved." : "Deleted."}
        </p>
      )}

      {loadError ? (
        <p role="alert" className="mt-6 font-semibold text-evidence-dark">
          The videos could not be loaded. Refresh the page to try again.
        </p>
      ) : videos.length === 0 ? (
        <div className="mt-8 rounded-[3px] bg-paper-dark p-8 text-center">
          <p className="font-display text-2xl">No videos yet</p>
          <p className="mt-1 text-ink-soft">Add one and publish it when it is ready. Only published videos are shown to learners.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {videos.map((v, i) => {
            const chapter = v.caseId ? getCase(v.caseId) : undefined;
            const lesson = chapter?.clues.find((c) => c.id === v.clueId);
            const published = v.status === "published";
            return (
              <li key={v.id} className="tex-paper rounded-[3px] p-4 shadow-card sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl leading-snug">{v.title}</h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      {SUBJECTS[v.subjectId].label}
                      {chapter ? ` / ${chapter.title}` : ""}
                      {lesson ? ` / ${lesson.title}` : ""}
                    </p>
                  </div>
                  <span
                    className={`rounded-[3px] px-3 py-1 text-sm font-semibold ${published ? "bg-desk-light text-desk-dark" : "bg-postit text-ink"}`}
                  >
                    {published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link href={`/studio/video/${v.id}`} className={`${small} bg-manila hover:bg-manila-400`}>
                    Edit
                  </Link>
                  {published && (
                    <Link href={`/videos/${v.id}`} className={`${small} bg-manila-100 hover:bg-manila`}>
                      View
                    </Link>
                  )}
                  <form action={setStatusAction}>
                    <input type="hidden" name="id" value={v.id} />
                    <input type="hidden" name="status" value={published ? "draft" : "published"} />
                    <button type="submit" className={`${small} bg-espresso text-paper hover:bg-coffee`}>
                      {published ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <form action={moveAction}>
                    <input type="hidden" name="id" value={v.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button type="submit" disabled={i === 0} aria-label={`Move ${v.title} up`} className={`${small} bg-manila-100 hover:bg-manila disabled:opacity-40`}>
                      Up
                    </button>
                  </form>
                  <form action={moveAction}>
                    <input type="hidden" name="id" value={v.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      disabled={i === videos.length - 1}
                      aria-label={`Move ${v.title} down`}
                      className={`${small} bg-manila-100 hover:bg-manila disabled:opacity-40`}
                    >
                      Down
                    </button>
                  </form>
                  {/* Deleting takes two steps: open this, then confirm */}
                  <details className="ml-auto">
                    <summary className={`${small} cursor-pointer list-none bg-paper-dark text-evidence-dark hover:bg-evidence-light`}>Delete</summary>
                    <form action={deleteVideoAction} className="mt-2 rounded-[3px] bg-evidence-light p-3">
                      <input type="hidden" name="id" value={v.id} />
                      <p className="max-w-xs text-sm">Delete “{v.title}” for good? This cannot be undone.</p>
                      <button type="submit" className="mt-2 min-h-11 rounded-[3px] bg-evidence px-4 font-semibold text-paper hover:bg-evidence-dark">
                        Yes, delete it
                      </button>
                    </form>
                  </details>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </StudioShell>
  );
}
