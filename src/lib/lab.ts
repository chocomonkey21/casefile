import { CASES } from "@/data/cases";
import { COLD_AFTER_DAYS, caseStatus, clueKey, daysSinceActivity } from "./progress";
import type { CaseDef, CaseFileState } from "./types";

/** How a student is doing on one clue's topic, mixing interrogation results and the latest Verdict */
export type TopicStat = {
  caseId: string;
  caseTitle: string;
  caseTopic: string;
  clueId: string;
  clueTitle: string;
  clueIndex: number;
  correct: number;
  total: number;
  /** 0 to 1 */
  fraction: number;
};

export function topicStats(state: CaseFileState): TopicStat[] {
  const stats: TopicStat[] = [];
  for (const c of CASES) {
    c.clues.forEach((clue, clueIndex) => {
      const progress = state.clues[clueKey(c.id, clue.id)];
      const verdict = state.verdicts[c.id]?.byClue[clue.id];
      let correct = 0;
      let total = 0;
      if (progress?.quiz) {
        correct += progress.quiz.firstTry;
        total += progress.quiz.total;
      }
      if (verdict) {
        correct += verdict.correct;
        total += verdict.total;
      }
      if (total === 0) return;
      stats.push({
        caseId: c.id,
        caseTitle: c.title,
        caseTopic: c.topic,
        clueId: clue.id,
        clueTitle: clue.title,
        clueIndex,
        correct,
        total,
        fraction: correct / total,
      });
    });
  }
  return stats;
}

/** A topic needs more practice when fewer than 60% of its questions were answered correctly. Using hints never counts against a topic. */
export function needsLook(t: TopicStat) {
  return t.fraction < 0.6;
}

export function splitTopics(stats: TopicStat[]) {
  const weak = stats.filter(needsLook).sort((a, b) => a.fraction - b.fraction);
  const strong = stats.filter((t) => !needsLook(t)).sort((a, b) => b.fraction - a.fraction);
  return { strong, weak };
}

export type CaseTimer = { caseDef: CaseDef; days: number; daysLeft: number };

/** Started cases that are cold right now */
export function coldCases(state: CaseFileState): CaseTimer[] {
  return CASES.filter((c) => caseStatus(c, state) === "cold").map((c) => {
    const days = daysSinceActivity(c, state) ?? 0;
    return { caseDef: c, days, daysLeft: 0 };
  });
}

/** Active cases that have been quiet for a few days and will go cold soon */
export function coolingCases(state: CaseFileState, warnAfterDays = 4): CaseTimer[] {
  return CASES.filter((c) => caseStatus(c, state) === "active")
    .map((c) => {
      const days = daysSinceActivity(c, state) ?? 0;
      return { caseDef: c, days, daysLeft: Math.max(0, COLD_AFTER_DAYS - days) };
    })
    .filter((t) => t.days >= warnAfterDays);
}

export function overallStats(state: CaseFileState) {
  const clues = Object.values(state.clues);
  const solved = clues.filter((c) => c.solved);
  const quizTotal = solved.reduce((n, c) => n + (c.quiz?.total ?? 0), 0);
  const quizRight = solved.reduce((n, c) => n + (c.quiz?.firstTry ?? 0), 0);
  return {
    cluesSolved: solved.length,
    casesClosed: Object.keys(state.closedCases).length,
    evidence: Object.keys(state.collected).length,
    notes: state.notes.length,
    accuracy: quizTotal > 0 ? Math.round((quizRight / quizTotal) * 100) : null,
  };
}
