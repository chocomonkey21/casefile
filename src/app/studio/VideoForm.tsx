"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { FIELD_LIMITS, type FormErrors, type VideoFormValues } from "@/lib/cms/form";
import { saveVideoAction, type SaveState } from "./actions";

type Picker = { id: string; label: string; chapters: { id: string; title: string; lessons: { id: string; title: string }[] }[] }[];

type Props = { initial: VideoFormValues; id?: string; picker: Picker };

const input = "mt-1 min-h-11 w-full rounded-[3px] border-2 border-manila-600 bg-paper px-3 text-base";

/** Create or edit one video. Every value is checked again on the server, so these limits are only a convenience. */
export function VideoForm({ initial, id, picker }: Props) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveVideoAction, {});
  const [v, setV] = useState<VideoFormValues>(state.values ?? initial);
  const errors: FormErrors = state.errors ?? {};
  const set = <K extends keyof VideoFormValues>(key: K, value: VideoFormValues[K]) => setV((old) => ({ ...old, [key]: value }));

  const subject = picker.find((s) => s.id === v.subjectId);
  const chapter = subject?.chapters.find((c) => c.id === v.caseId);
  const errorList = Object.entries(errors) as [keyof VideoFormValues, string][];

  const field = (key: keyof VideoFormValues) => ({
    id: key,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": `${key}-help${errors[key] ? ` ${key}-error` : ""}`,
  });
  const note = (key: keyof VideoFormValues, help: string) => (
    <>
      <p id={`${key}-help`} className="mt-1 text-sm text-ink-soft">
        {help}
      </p>
      {errors[key] && (
        <p id={`${key}-error`} className="mt-1 font-semibold text-evidence-dark">
          {errors[key]}
        </p>
      )}
    </>
  );

  return (
    <form action={action} className="mt-6 max-w-2xl space-y-6" noValidate>
      {id && <input type="hidden" name="id" value={id} />}

      {(errorList.length > 0 || state.message) && (
        <div role="alert" className="rounded-[3px] bg-evidence-light p-4">
          <p className="font-semibold">{state.message ?? "This video was not saved. Fix these and try again:"}</p>
          {errorList.length > 0 && (
            <ul className="mt-2 list-disc pl-6">
              {errorList.map(([key, msg]) => (
                <li key={key}>
                  <a href={`#${key}`} className="underline underline-offset-4">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block font-semibold">
          Title
        </label>
        <input {...field("title")} type="text" required maxLength={FIELD_LIMITS.title} value={v.title} onChange={(e) => set("title", e.target.value)} className={input} />
        {note("title", "What learners will see on the card and the watch page.")}
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold">
          Description
        </label>
        <textarea
          {...field("description")}
          rows={3}
          maxLength={FIELD_LIMITS.description}
          value={v.description}
          onChange={(e) => set("description", e.target.value)}
          className={`${input} py-2`}
        />
        {note("description", "One or two sentences about what the video covers.")}
      </div>

      <fieldset className="space-y-4 rounded-[3px] bg-manila-100/60 p-4">
        <legend className="px-2 font-semibold">Where it belongs</legend>
        <div>
          <label htmlFor="subjectId" className="block font-semibold">
            Subject
          </label>
          <select
            {...field("subjectId")}
            required
            value={v.subjectId}
            onChange={(e) => setV((old) => ({ ...old, subjectId: e.target.value, caseId: "", clueId: "" }))}
            className={input}
          >
            <option value="">Choose a subject</option>
            {picker.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          {note("subjectId", "Every video belongs to a subject.")}
        </div>
        <div>
          <label htmlFor="caseId" className="block font-semibold">
            Chapter (optional)
          </label>
          <select
            {...field("caseId")}
            value={v.caseId}
            disabled={!subject}
            onChange={(e) => setV((old) => ({ ...old, caseId: e.target.value, clueId: "" }))}
            className={`${input} disabled:opacity-50`}
          >
            <option value="">Whole subject</option>
            {subject?.chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          {note("caseId", "A chapter is a case. Leave this as “Whole subject” for a video that covers more than one chapter.")}
        </div>
        <div>
          <label htmlFor="clueId" className="block font-semibold">
            Related lesson (optional)
          </label>
          <select
            {...field("clueId")}
            value={v.clueId}
            disabled={!chapter}
            onChange={(e) => set("clueId", e.target.value)}
            className={`${input} disabled:opacity-50`}
          >
            <option value="">No specific lesson</option>
            {chapter?.lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
          {note("clueId", "The video will also appear on that lesson’s page.")}
        </div>
      </fieldset>

      <div>
        <label htmlFor="videoUrl" className="block font-semibold">
          Video address
        </label>
        <input {...field("videoUrl")} type="url" required inputMode="url" value={v.videoUrl} onChange={(e) => set("videoUrl", e.target.value)} className={input} />
        {note("videoUrl", "A YouTube or Vimeo link, or a direct https link to an .mp4, .webm or .ogv file. Only use videos you have the right to show. CaseFile does not copy or host the video.")}
      </div>

      <div>
        <label htmlFor="thumbnailUrl" className="block font-semibold">
          Thumbnail (optional)
        </label>
        <input {...field("thumbnailUrl")} type="text" inputMode="url" value={v.thumbnailUrl} onChange={(e) => set("thumbnailUrl", e.target.value)} className={input} />
        {note("thumbnailUrl", "An image address, or a path to a picture in the site’s public folder, such as /video-thumbnails/clouds.jpg. A picture on this site avoids contacting another site when learners browse. Without one, a plain card is shown.")}
      </div>

      <div>
        <label htmlFor="captionsUrl" className="block font-semibold">
          Captions file (optional)
        </label>
        <input {...field("captionsUrl")} type="url" inputMode="url" value={v.captionsUrl} onChange={(e) => set("captionsUrl", e.target.value)} className={input} />
        {note("captionsUrl", "A .vtt file. Only works with a direct video file. For YouTube or Vimeo, add captions on that site.")}
      </div>

      <div>
        <label htmlFor="transcript" className="block font-semibold">
          Transcript (optional)
        </label>
        <textarea
          {...field("transcript")}
          rows={8}
          maxLength={FIELD_LIMITS.transcript}
          value={v.transcript}
          onChange={(e) => set("transcript", e.target.value)}
          className={`${input} py-2`}
        />
        {note("transcript", "Shown under the video. Line breaks are kept.")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="order" className="block font-semibold">
            Order (optional)
          </label>
          <input {...field("order")} type="number" min={0} max={9999} step={1} inputMode="numeric" value={v.order} onChange={(e) => set("order", e.target.value)} className={input} />
          {note("order", "Lower numbers come first. Leave empty to put a new video last.")}
        </div>
        <fieldset>
          <legend className="font-semibold">Status</legend>
          <div className="mt-1 space-y-1">
            {(["draft", "published"] as const).map((s) => (
              <label key={s} className="flex min-h-11 items-center gap-3">
                <input type="radio" name="status" value={s} checked={v.status === s} onChange={() => set("status", s)} className="h-5 w-5" />
                <span>{s === "draft" ? "Draft (hidden from learners)" : "Published (visible to learners)"}</span>
              </label>
            ))}
          </div>
          {errors.status && <p className="mt-1 font-semibold text-evidence-dark">{errors.status}</p>}
        </fieldset>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 rounded-[3px] bg-evidence px-6 font-semibold text-paper hover:bg-evidence-dark disabled:opacity-50"
        >
          {pending ? "Saving" : "Save video"}
        </button>
        <Link href="/studio" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:no-underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
