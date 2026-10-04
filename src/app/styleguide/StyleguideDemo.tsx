"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { AVATARS } from "@/data/avatars";
import { getCase } from "@/data/cases";
import { RANKS } from "@/data/ranks";
import { copy } from "@/lib/copy";
import { caseStatus, currentStreak, evidenceKey, levelFor, nextClue, solvedCount } from "@/lib/progress";
import { actions, useCaseFile } from "@/lib/store";

/** Buttons, levels, avatars and demo controls that change the saved state, so you can see the app react. */
export function StyleguideDemo() {
  const state = useCaseFile();
  const level = levelFor(state);
  const puddle = getCase("puddle")!;
  const next = nextClue(puddle, state);

  return (
    <>
      <section aria-labelledby="buttons">
        <h2 id="buttons" className="text-3xl">
          Buttons
        </h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button>Start</Button>
          <Button variant="secondary">Continue</Button>
          <Button variant="highlight">Collect evidence</Button>
          <Button variant="ghost">Save</Button>
          <Button variant="danger">Log out</Button>
          <Button disabled>Next</Button>
          <Button size="lg">Start the case</Button>
        </div>
      </section>

      <section aria-labelledby="badges">
        <h2 id="badges" className="text-3xl">
          Levels and avatars
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-ink-soft">
          {RANKS.map((r) => (
            <li key={r.id}>{copy.level.label(r.name)}</li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-4">
          {AVATARS.map((a) => (
            <li key={a.id} className="flex flex-col items-center gap-1 text-sm text-ink-soft">
              <Avatar avatarId={a.id} size={56} />
              {a.name}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="state" className="rounded-[3px] bg-espresso p-6 text-paper">
        <h2 id="state" className="text-3xl">
          Saved progress (demo controls)
        </h2>
        <p className="mt-2 text-beige">
          Watch the level and study streak in the top bar change. Refresh the page and they should stay put.
        </p>
        <dl className="mt-4 grid gap-2 text-lg sm:grid-cols-3">
          <div>
            <dt className="label text-beige">Name</dt>
            <dd>{state.profile?.name ?? "No profile yet"}</dd>
          </div>
          <div>
            <dt className="label text-beige">Level</dt>
            <dd>
              {level.rank.name}
              {level.next ? ` (${copy.level.nextLevel(level.remaining, level.next.name)})` : ""}
            </dd>
          </div>
          <div>
            <dt className="label text-beige">Study streak</dt>
            <dd>{copy.level.streak(currentStreak(state.streak))}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            variant="highlight"
            onClick={() =>
              actions.setProfile({
                name: "Sam",
                avatarId: "amara",
                interests: ["space"],
                grade: 7,
              })
            }
          >
            Make demo profile
          </Button>
          <Button variant="secondary" onClick={() => actions.recordStudy()}>
            Count today as a study day
          </Button>
          <Button variant="secondary" onClick={() => actions.logOut()}>
            Clear everything (same as Log out)
          </Button>
        </div>
      </section>

      <section aria-labelledby="case-demo" className="rounded-[3px] p-6">
        <h2 id="case-demo" className="text-3xl">
          Case demo tools
        </h2>
        <p className="mt-2 max-w-prose text-ink-soft">
          Move the Vanishing Puddle through its states so you can check the Desk, the library and the case file.
        </p>
        <p className="mt-4 font-medium">
          Puddle status now: <span className="font-display">{copy.status[caseStatus(puddle, state)]}</span>,{" "}
          {copy.folder.lessonsDone(solvedCount(puddle, state), puddle.clues.length)}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button
            variant="primary"
            disabled={!next}
            onClick={() => next && actions.solveClue(puddle.id, next.clue.id)}
          >
            Complete next Puddle clue
          </Button>
          <Button variant="secondary" onClick={() => actions.touchCase(puddle.id)}>
            Mark Puddle as studied today
          </Button>
          <Button
            variant="secondary"
            onClick={() => actions.setCaseActivity(puddle.id, new Date(Date.now() - 9 * 86400000).toISOString())}
          >
            Make Puddle a cold case (9 days ago)
          </Button>
          <Button variant="secondary" onClick={() => actions.closeCase(puddle.id, 8, 8)}>
            Close Puddle
          </Button>
          <Button
            variant="highlight"
            onClick={() => {
              // Pin every piece of Puddle evidence that is not on the board yet
              for (const clue of puddle.clues) {
                for (const e of clue.evidence) {
                  const key = evidenceKey(puddle.id, clue.id, e.id);
                  if (!state.collected[key]) actions.toggleEvidence(key);
                }
              }
            }}
          >
            Collect all Puddle evidence
          </Button>
        </div>
      </section>
    </>
  );
}
