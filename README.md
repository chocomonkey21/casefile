# CaseFile

A learning platform for ages 11 to 15, built around one idea: **a detective case file**.
Each subject is a case, each lesson is a clue, and the student works through it one step at a time.

Built for a User Interface Studies assignment. Next.js (App Router), TypeScript, Tailwind CSS v4 and the Motion library.
There is no backend: course content is local mock data and progress is saved in `localStorage`.

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
  `src/data/verdicts.ts` (final tests).

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
