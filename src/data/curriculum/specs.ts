import type { CaseDef, ClueContent, ClueDef, VerdictQuestion } from "@/lib/types";
import { buildChapter, buildLesson, type ChapterSpec } from "./build";
import { MAPS_GLOBES } from "./g6-maps-globes";
import { RATIOS } from "./g7-ratios";
import { ANCIENT_GREECE } from "./g7-ancient-greece";
import { MATTER_ATOMS } from "./g8-matter-atoms";
import { EQUATIONS_GRAPHS } from "./g8-equations-graphs";
import { ROMAN_EMPIRE } from "./g8-roman-empire";
import { WEATHER_CLIMATE } from "./g8-weather-climate";
import { FORCES_MOTION } from "./g9-forces-motion";
import { GEOMETRY } from "./g9-geometry";
import { INDUSTRIAL_REVOLUTION } from "./g9-industrial-revolution";
import { POPULATION_CITIES } from "./g9-population-cities";
import { GENES_EVOLUTION } from "./g10-genes-evolution";
import { QUADRATICS_TRIG } from "./g10-quadratics-trig";
import { WORLD_WARS } from "./g10-world-wars";
import { CLIMATE_CHANGE } from "./g10-climate-change";
import { TOP_UP_SPECS } from "./top-ups";
import { EXTRA_G6 } from "./extra-g6";
import { EXTRA_G7 } from "./extra-g7";
import { EXTRA_G8 } from "./extra-g8";
import { EXTRA_G9 } from "./extra-g9";
import { EXTRA_G10 } from "./extra-g10";

/*
  SERVER ONLY. This file imports every chapter's full lesson text, so do not import it from browser code.
  Browser code uses meta.generated.ts (run `npm run gen:curriculum` after changing a chapter).

  Chapters added for Grades 6 to 10. Each one is written as a ChapterSpec (see build.ts) and built into the
  same structures the older chapters use, so the rest of the app treats them all alike.
  extra-g6.ts to extra-g10.ts add two shorter chapters (one lesson each) per grade and subject, so each has three chapters.
  Add a chapter here, give it a grade, and it appears in /subjects, /cases, the lesson pages and the final test.
*/
export const SPECS: ChapterSpec[] = [MAPS_GLOBES, RATIOS, ANCIENT_GREECE, MATTER_ATOMS, EQUATIONS_GRAPHS, ROMAN_EMPIRE, WEATHER_CLIMATE, FORCES_MOTION, GEOMETRY, INDUSTRIAL_REVOLUTION, POPULATION_CITIES, GENES_EVOLUTION, QUADRATICS_TRIG, WORLD_WARS, CLIMATE_CHANGE, ...EXTRA_G6, ...EXTRA_G7, ...EXTRA_G8, ...EXTRA_G9, ...EXTRA_G10];

const BUILT = SPECS.map(buildChapter);

export const NEW_CASES: CaseDef[] = BUILT.map((b) => b.caseDef);

export const NEW_LESSONS: Record<string, Record<string, ClueContent>> = Object.fromEntries(BUILT.map((b) => [b.caseDef.id, b.lessons]));

export const NEW_VERDICTS: Record<string, VerdictQuestion[]> = Object.fromEntries(BUILT.map((b) => [b.caseDef.id, b.verdict]));

/* ---------- A fifth lesson added to the end of four existing chapters ---------- */

const TOP_UPS = Object.entries(TOP_UP_SPECS).map(([caseId, specs]) => ({ caseId, built: specs.map((l) => buildLesson(l, caseId)) }));

export const TOP_UP_CLUES: Record<string, ClueDef[]> = Object.fromEntries(TOP_UPS.map((t) => [t.caseId, t.built.map((b) => b.clue)]));

export const TOP_UP_LESSONS: Record<string, Record<string, ClueContent>> = Object.fromEntries(
  TOP_UPS.map((t) => [t.caseId, Object.fromEntries(t.built.map((b, i) => [TOP_UP_SPECS[t.caseId][i].id, b.content]))]),
);

export const TOP_UP_VERDICTS: Record<string, VerdictQuestion[]> = Object.fromEntries(TOP_UPS.map((t) => [t.caseId, t.built.flatMap((b) => b.verdict)]));
