"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { NoteCards } from "@/components/notes/NoteCards";
import { NoteForm } from "@/components/notes/NoteForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { PrevNext } from "@/components/ui/PrevNext";
import { RelatedVideos } from "@/components/videos/RelatedVideos";
import { ClockIcon } from "@/components/ui/Icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { SUBJECTS } from "@/data/subjects";
import { copy } from "@/lib/copy";
import {
  caseMinutes,
  caseStatus,
  clueKey,
  clueState,
  evidenceKey,
  nextClue,
  solvedCount,
  warrantState,
} from "@/lib/progress";
import { useCaseFile } from "@/lib/store";
import { chapterCrumbs, chapterNeighbours, isChapter } from "@/lib/structure";
import type { CaseTab } from "@/lib/case-tabs";
import type { CaseDef } from "@/lib/types";
import { ClueCard } from "./ClueCard";
import { EvidenceCard } from "./EvidenceCard";
import { StatusStamp } from "./StatusStamp";
import { WarrantBanner } from "./WarrantBanner";

const t = copy.caseFile;

/** The case file: a manila folder with four tabs (Brief, Clues, Evidence, Notes) and a status tag. */
export function CaseFileView({ caseDef, initialTab }: { caseDef: CaseDef; initialTab: CaseTab }) {
  const state = useCaseFile();
  const [tab, setTab] = useState<CaseTab>(initialTab);
  const idBase = useId();

  const status = caseStatus(caseDef, state);
  const solved = solvedCount(caseDef, state);
  const total = caseDef.clues.length;
  const finalTest = warrantState(caseDef, state);
  const subject = SUBJECTS[caseDef.subject];
  const notes = state.notes.filter((n) => n.caseId === caseDef.id);
  const { prev: prevChapter, next: nextChapter } = chapterNeighbours(caseDef);

  const tabs: TabItem[] = [
    { id: "brief", label: t.tabs.brief },
    { id: "clues", label: t.tabs.clues, count: total },
    { id: "evidence", label: t.tabs.evidence },
    { id: "notes", label: t.tabs.notes, count: notes.length },
  ];

  const changeTab = (id: string) => {
    setTab(id as CaseTab);
    // Keep the tab in the address so the link can be shared or reloaded
    window.history.replaceState(null, "", `?tab=${id}`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <Breadcrumb items={chapterCrumbs(caseDef)} className="mb-2" />

      {/* The folder "unfolds" as the page arrives (flip-open from the library ends here) */}
      <div style={{ perspective: 1400 }}>
        <motion.div
          initial={{ rotateX: -14, opacity: 0, y: 16 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ transformOrigin: "top center" }}
          className="tex-manila tex-worn rounded-[3px] p-4 shadow-folder sm:p-6"
        >
          <header className="flex flex-wrap items-start justify-between gap-4 px-1 pb-6 sm:px-2">
            <div className="min-w-0 flex-1">
              <p className="label flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-soft">
                <span>{t.caseNo(caseDef.number)}</span>
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${subject.dot}`} />
                  {subject.label}
                  {caseDef.grade ? ` · ${copy.grades.label(caseDef.grade)}` : ""}
                </span>
              </p>
              <h1 className="mt-1 text-3xl leading-tight sm:text-4xl">{caseDef.title}</h1>
              <div className="mt-4 max-w-md">
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span>{t.lessonsDone(solved, total)}</span>
                  <span className="flex items-center gap-1 text-ink-soft">
                    <ClockIcon width={14} height={14} />
                    {copy.common.aboutMin(caseMinutes(caseDef))}
                  </span>
                </div>
                <ProgressBar value={solved} max={total} label={t.progressLabel} />
              </div>
            </div>
            <div className="pr-1 pt-1" aria-label={copy.status.aria(copy.status[status])}>
              <StatusStamp status={status} size="lg" slam={status === "closed"} />
            </div>
          </header>

          <Tabs tabs={tabs} value={tab} onChange={changeTab} idBase={idBase} label={t.tabsLabel} />

          <div className="tex-paper relative rounded-b-[3px] rounded-tr-[3px] p-4 sm:p-8">
            <Panel id={`${idBase}-panel-brief`} labelledBy={`${idBase}-tab-brief`} active={tab === "brief"}>
              <BriefTab caseDef={caseDef} onSeeClues={() => changeTab("clues")} />
            </Panel>

            <Panel id={`${idBase}-panel-clues`} labelledBy={`${idBase}-tab-clues`} active={tab === "clues"}>
              <CluesTab caseDef={caseDef} />
              <div className="mt-6">
                <WarrantBanner caseId={caseDef.id} state={finalTest} solved={solved} total={total} />
              </div>
            </Panel>

            <Panel id={`${idBase}-panel-evidence`} labelledBy={`${idBase}-tab-evidence`} active={tab === "evidence"}>
              <EvidenceTab caseDef={caseDef} />
            </Panel>

            <Panel id={`${idBase}-panel-notes`} labelledBy={`${idBase}-tab-notes`} active={tab === "notes"}>
              <NotesTab caseDef={caseDef} />
            </Panel>
          </div>
        </motion.div>
      </div>

      {isChapter(caseDef) && (
        <>
          <RelatedVideos chapter={caseDef.id} heading={copy.videos.chapterHeading} headingId="chapter-videos-heading" />
          <div className="mt-10">
            <PrevNext
              label={copy.wayfinding.chapterNav}
              prev={prevChapter ? { href: `/cases/${prevChapter.id}?tab=clues`, label: copy.wayfinding.prevChapter, title: prevChapter.title } : null}
              next={nextChapter ? { href: `/cases/${nextChapter.id}?tab=clues`, label: copy.wayfinding.nextChapter, title: nextChapter.title } : null}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Panel({
  id,
  labelledBy,
  active,
  children,
}: {
  id: string;
  labelledBy: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy} hidden={!active} tabIndex={0}>
      {active && children}
    </div>
  );
}

/* ---------------- Brief ---------------- */

function BriefTab({ caseDef, onSeeClues }: { caseDef: CaseDef; onSeeClues: () => void }) {
  const state = useCaseFile();
  const next = nextClue(caseDef, state);
  const started = solvedCount(caseDef, state) > 0 || Boolean(state.caseActivity[caseDef.id]);
  const closed = Boolean(state.closedCases[caseDef.id]);
  const b = t.brief;

  return (
    <div className="space-y-8">
      {caseDef.stub && (
        <p className="rounded-[3px] bg-paper-dark p-4 text-ink-soft">
          <strong className="text-ink">{b.previewTitle}</strong> {b.previewText}
        </p>
      )}

      <section aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-2xl">
          {b.about}
        </h2>
        <p className="mt-2 max-w-prose text-lg">{caseDef.hook}</p>
      </section>

      {/* Sticky note with the goal */}
      <section aria-labelledby="goal-heading" className="tex-postit max-w-xl rounded-[2px] p-6 shadow-card">
        <h2 id="goal-heading" className="label text-ink">
          {b.goal}
        </h2>
        <p className="mt-2 text-lg font-medium">{caseDef.goal}</p>
      </section>

      <section aria-labelledby="learn-heading">
        <h2 id="learn-heading" className="text-2xl">
          {b.learn}
        </h2>
        <ul className="mt-4 max-w-prose space-y-2">
          {caseDef.learn.map((item) => (
            <li key={item} className="flex gap-4">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-evidence" />
              <span className="text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="plan-heading">
        <h2 id="plan-heading" className="text-2xl">
          {b.how}
        </h2>
        <p className="mt-2 max-w-prose text-lg text-ink-soft">{b.howText(caseDef.clues.length)}</p>
      </section>

      <div className="flex flex-wrap gap-4">
        {closed ? (
          <Button href={`/cases/${caseDef.id}/verdict`}>{b.viewResults}</Button>
        ) : next ? (
          <Button href={`/cases/${caseDef.id}/clues/${next.clue.id}`} size="lg">
            {caseDef.stub ? b.previewFirst : started ? copy.common.continue : b.startFirst}
          </Button>
        ) : (
          <Button href={`/cases/${caseDef.id}/verdict`} size="lg">
            {b.startVerdict}
          </Button>
        )}
        <Button variant="secondary" onClick={onSeeClues}>
          {b.viewAll}
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Clues ---------------- */

function CluesTab({ caseDef }: { caseDef: CaseDef }) {
  const state = useCaseFile();
  return (
    <section aria-labelledby="clues-heading">
      <h2 id="clues-heading" className="text-2xl">
        {t.clues.heading}
      </h2>
      <p className="mt-1 text-ink-soft">{t.clues.intro}</p>
      <ol className="mt-4 space-y-4">
        {caseDef.clues.map((clue, i) => (
          <ClueCard
            key={clue.id}
            caseDef={caseDef}
            clue={clue}
            index={i}
            state={clueState(caseDef, state, i)}
            progress={state.clues[clueKey(caseDef.id, clue.id)]}
            preview={caseDef.stub}
          />
        ))}
      </ol>
    </section>
  );
}

/* ---------------- Evidence ---------------- */

/** The evidence "drawer": one expandable section per clue. Evidence for a clue that is not open yet stays closed. */
function EvidenceTab({ caseDef }: { caseDef: CaseDef }) {
  const state = useCaseFile();
  const current = nextClue(caseDef, state)?.index ?? -1;

  return (
    <section aria-labelledby="evidence-heading">
      <h2 id="evidence-heading" className="text-2xl">
        {t.evidence.heading}
      </h2>
      <p className="mt-1 text-ink-soft">{t.evidence.intro}</p>
      <div className="mt-4 space-y-4">
        {caseDef.clues.map((clue, i) => {
          const locked = clueState(caseDef, state, i) === "locked";
          return (
            <details
              key={clue.id}
              open={i === current || (current === -1 && i === 0)}
              className="group rounded-[3px] bg-manila-100/60"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-[3px] px-4 py-2 marker:hidden">
                <span>
                  <span className="label block text-ink-soft">
                    {t.clueCard.label(i + 1)}
                    {locked && <span> {t.evidence.locked}</span>}
                  </span>
                  <span className="font-display text-lg">{clue.title}</span>
                </span>
                <span className="text-sm text-ink-soft group-open:hidden">{t.evidence.itemsShow(clue.evidence.length)}</span>
                <span className="hidden text-sm text-ink-soft group-open:inline">{copy.common.hide}</span>
              </summary>
              <ul className="space-y-2 px-4 pb-4">
                {clue.evidence.map((e) => (
                  <li key={e.id}>
                    <EvidenceCard
                      evidence={e}
                      locked={locked}
                      collected={Boolean(state.collected[evidenceKey(caseDef.id, clue.id, e.id)])}
                      href={`/cases/${caseDef.id}/clues/${clue.id}#${e.id}`}
                    />
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Notes ---------------- */

function NotesTab({ caseDef }: { caseDef: CaseDef }) {
  const state = useCaseFile();
  const notes = state.notes.filter((n) => n.caseId === caseDef.id);

  return (
    <section aria-labelledby="notes-heading">
      <h2 id="notes-heading" className="text-2xl">
        {t.notes.heading}
      </h2>
      <p className="mt-1 text-ink-soft">{t.notes.intro}</p>

      <div className="mt-4">
        <NoteForm caseDef={caseDef} />
      </div>

      {notes.length > 0 ? (
        <div className="mt-6">
          <NoteCards notes={notes} caseDef={caseDef} />
        </div>
      ) : (
        <p className="mt-6 text-ink-soft">{t.notes.empty}</p>
      )}
    </section>
  );
}
