# CaseFile

A learning platform for ages 11 to 15, built around one idea: **a detective case file**.
Each subject is a case, each lesson is a clue, and the student works through it one step at a time.

Built for a User Interface Studies assignment. Next.js (App Router), TypeScript, Tailwind CSS v4 and the Motion library.
Course content is local data and each learner's progress is saved in `localStorage`. The only server-side data is the optional video list managed in the editor desk (see below).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npm run contrast # checks every text and background colour pair in the theme against WCAG AA
```

Start at `/` (landing), press **Get started**, and set up a profile. Onboarding ends with a short "How CaseFile works"
walkthrough and a practice case. `/styleguide` shows the colour tokens, contrast checks, type and demo controls for moving
cases through their states.

## The theme, in plain words

The detective theme lives in the nouns and in a few visual moments. The sentences around them read like a calm learning platform.

| Theme word | Plain meaning | Where |
| --- | --- | --- |
| Desk | Dashboard | `/desk` |
| Case | Subject | `/cases`, `/cases/[id]` |
| Clue | Lesson | `/cases/[id]/clues/[clue]` |
| Evidence | Study material (readings, videos, diagrams, practice sets) | inside each clue |
| Hints | Three levels of help, free to use any time | `HintSheet` |
| Evidence Board | Visual map of collected evidence, joined with red string | `/board` |
| Interrogation Room | Quizzes, including the "suspect lineup" question type | `/cases/[id]/interrogation/[clue]` |
| Notebook | Personal notes | `/notebook` |
| Cold case | Revision reminder after 7 days without studying | Desk, Lab, `.../interrogation/refresh` |
| Verdict | Final test for a case | `/cases/[id]/verdict` |
| Case Closed stamp | Case completed | `VerdictResult` |
| Lab | Progress and what to practise | `/lab` |

Case status (Not started, In progress, Cold case, Closed) is worked out from progress, never stored. See `src/lib/progress.ts`.
There are no points. A student's level (Rookie to Chief) comes from lessons completed and cases closed.

## Where to edit the wording

- **Interface text:** `src/lib/copy.ts`. Every button, heading, label, tooltip and message is there. Tone rules are at the top of the file.
- **Course content:** `src/data/cases.ts` (case and lesson titles, evidence lists), `src/data/lessons/*` (readings, hints, questions),
  `src/data/verdicts.ts` and `src/data/verdicts-subjects.ts` (final tests). Cases: water cycle (science), fractions (maths),
  the solar system (science), ancient Egypt (history), earthquakes and volcanoes (geography), plus the practice case.

## Project layout

```
src/
  app/            routes (App Router)
  components/     case, desk, cases, lesson, quiz, hints, board, verdict, lab, notebook, profile, onboarding, landing, layout, ui
  data/           mock content: cases, lessons, verdicts, ranks, relations, avatars, interests
  hooks/          useMotionOff
  lib/            copy, types, store (localStorage), progress rules, scoring, board layout, lab analytics
```

## Design notes

- **Colour:** a walnut desk (walnut, espresso, coffee) with everything you read on paper cream, manila or post-it yellow.
  Tokens live in `src/app/globals.css` and are mirrored in `src/lib/theme.ts`.
- **Learning colours:** lesson diagrams use real-world colours (blue water, green grass, a yellow sun) from the `ill-*`
  tokens, so the pictures teach. The interface never uses them.
- **Paper and ink:** textures are procedural SVG noise in `src/lib/textures.ts` (the place to swap in scanned paper).
  They are laid over the content with multiply, so type looks printed. Special Elite gets a typewriter ink filter and
  stamps get rough, patchy ink (`src/components/ui/InkFilters.tsx`). High contrast mode turns all of it off.
- **Folders:** each case is a 3D manila folder (`FolderCard`). It tilts toward the cursor, the cover swings open and the papers
  inside fan out to show the brief, the next lesson and a progress note. Tap once on touch screens, twice to open. Tilt, tab
  position and brass hardware are seeded by the case id, so no two folders match.
- **No outlines:** edges come from tone and shadow, corners are 2 to 4px, spacing is on an 8px scale, primary buttons are
  evidence red.
- **Contrast:** `npm run contrast` checks every colour pair flat, under the texture overlay with ink at its faintest,
  and as stamp ink. It also fails if a learning colour leaks into the interface.

- **Type:** Special Elite only for headings, labels, stamps and folder tabs. DM Sans for everything a student reads or taps.
- **Plain actions:** buttons stay plain (Start, Continue, Save, Next, Submit, Review).
- **Onboarding:** profile, interests, grade, a five-screen "How CaseFile works" walkthrough, then the practice case. The walkthrough
  can be reopened from the profile menu.
- **Profile menu:** About me, How CaseFile works, My progress, Reduce motion, and Log out. Log out clears the profile, progress,
  notes and board from this device (the Reduce motion setting is kept), so the next visit starts as a new student.
- **Motion:** folder flip, red string drawing itself, stamp slam, hints sliding out, dusty cold cases. All of it respects
  `prefers-reduced-motion`, and the profile menu has its own **Reduce motion** switch.
- **Accessibility:** semantic landmarks, one `h1` per page, keyboard operable drag (arrow keys) and string tying, a visible two-tone
  focus ring, tap targets of about 44px, native `<dialog>` for dialogs, and `axe-core` run over every route and the open dialogs
  with no open findings.
- **Copy:** no em dashes anywhere in the interface text.

## Saved data

Everything is stored in the browser under the key `casefile:v1`. Use **Log out** in the profile menu to clear it.

## Subjects, chapters and lessons

Browsing goes Subject → Chapter → Lesson. Nothing is regrouped: it is read from the course data in `src/data/cases.ts`.

| Level | In the course data | Page |
| --- | --- | --- |
| Subject | `subject` on a case (science, maths, history, geography) | `/subjects`, `/subjects/[subject]` |
| Chapter | a case | `/cases/[caseId]` (breadcrumbs and previous/next chapter added) |
| Lesson | a clue | `/cases/[caseId]/clues/[clueId]` (breadcrumbs, previous/next lesson, back to chapter) |

The practice case belongs to sign-up and is left out of subject browsing. `src/lib/structure.ts` holds the helpers.
To add a chapter, add a case. To add a subject, add it to `src/data/subjects.ts` and give a case that `subject`.

## Videos and the editor desk

Learners watch at `/videos` and `/videos/[id]`, and see related videos on subject, chapter and lesson pages.
Editors manage them at `/studio`, which is not linked anywhere in the learner site and is marked `noindex`.

Videos are not downloaded or copied. An editor pastes a link and CaseFile embeds it from its host. Accepted sources:
YouTube, Vimeo, or a direct https link to an `.mp4`, `.webm` or `.ogv` file. Anything else is refused (`src/lib/cms/embed.ts`).
Nothing is loaded from the host until the learner presses Play.

### Turning editing on

Copy `.env.example` to `.env.local` and fill it in. On Vercel, add the same names under Project Settings, Environment Variables.

- `EDITOR_PASSWORD` (12+ characters) and `EDITOR_SESSION_SECRET` (32+ random characters). With either missing the editor desk stays off. There is no default password.
- Somewhere to save entries. On Vercel connect a Redis store (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, or the `KV_REST_API_*` pair Vercel adds). Upstash is a separate account with a free tier. Without any of these, entries are saved to `.data/videos.json` when running locally, and nowhere on Vercel.

The sign-in is one shared password, a signed httpOnly cookie that lasts 8 hours, and a check on every editor page and action.
It has no individual accounts, so it cannot say who changed what. If that matters, put proper accounts in front of it.

```bash
npm run test:cms   # embed-link allowlist and editor session tests
```

## Grades 6 to 10: chapters, lessons and lesson videos

Every chapter has a suggested grade (`grade` on the case). The suggestion is the project team's, not a match to any curriculum or exam board.
There are 20 chapters, one for each grade (6 to 10) in each of the four subjects, and every chapter has five lessons.
Each lesson has learning goals, a question, hints, a reading, a "Try it" activity, two practice questions, three quiz questions, two final-test questions and one YouTube video.

| Where | What |
| --- | --- |
| `src/data/curriculum/g*-*.ts` | One file per new chapter, written in a compact format (see `build.ts`). **Server only.** |
| `src/data/curriculum/top-ups.ts` | The fifth lesson added to Fractions, Solar system, Ancient Egypt and Earthquakes and volcanoes |
| `src/data/curriculum/goals.ts` | Learning goals for the lessons that were written before goals existed |
| `src/data/curriculum/meta.generated.ts` | Chapter and lesson lists without lesson text, for browser code. **Generated.** |
| `src/data/videos-curated.ts` | The lesson videos, with title, channel, why they fit and any caveat |

```bash
npm run gen:curriculum     # after editing a chapter: rebuilds meta.generated.ts
npm run check:curriculum   # structure, answer integrity, 5 lessons per grade and subject, a video for every lesson
npm run check:videos       # asks YouTube whether every lesson video still exists, embeds, and has the recorded title and channel
npm run test:cms           # embed-link allowlist and editor session tests
```

To add a chapter: copy an existing chapter file, give it a new id, number and grade, add it to `SPECS` in `specs.ts`, run `npm run gen:curriculum`, and add a video for each lesson to `videos-curated.ts`.

Lesson videos are never downloaded or copied. They are embedded from YouTube only after a learner presses Play, and each page credits the video's title and channel.
Videos in `videos-curated.ts` are read-only in the editor desk. Videos added in the editor desk appear alongside them.
