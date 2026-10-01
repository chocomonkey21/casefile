/*
  Pieces of evidence that belong together, by evidence id. The Evidence Board uses these to
  nudge: "You haven't connected X and Y yet". The `why` is shown as the reason, so the
  nudge teaches something. Pairs from the same clue are also treated as related (see lib/board.ts).
*/
export type Relation = { a: string; b: string; why: string };

export const RELATIONS: Relation[] = [
  { a: "sun-job", b: "evap-close", why: "The reading says the sun warms the water. The diagram shows the tiny bits escaping." },
  { a: "evap-close", b: "puddle-shrink", why: "One zooms in on the molecules, the other shows the whole puddle shrinking." },
  { a: "sun-job", b: "why-clouds", why: "Water vapour from evaporation is what rises up and turns into clouds." },
  { a: "why-clouds", b: "cold-glass", why: "Both are condensation: vapour cooling and turning back into drops." },
  { a: "why-clouds", b: "cloud-spotter", why: "The practice set tests the idea from the reading." },
  { a: "why-clouds", b: "rain-snow", why: "Cloud drops join up, get heavy and fall as precipitation." },
  { a: "rain-snow", b: "inside-drop", why: "One lists the kinds of precipitation, the other shows how a raindrop forms." },
  { a: "rain-snow", b: "four-types", why: "The diagram shows the four kinds from the reading." },
  { a: "rain-snow", b: "rivers-lakes", why: "Where the precipitation lands is where collection begins." },
  { a: "rivers-lakes", b: "where-rain-goes", why: "The diagram follows one raindrop along the routes in the reading." },
  { a: "rivers-lakes", b: "follow-drop", why: "The practice set asks where different raindrops end up." },
  { a: "cycle-map", b: "sun-job", why: "The sun powers the first step of the whole loop." },
  { a: "cycle-map", b: "rivers-lakes", why: "The loop closes when collected water evaporates again." },
  { a: "all-together", b: "cycle-map", why: "The reading lists the four steps. The map shows them as a loop." },
  { a: "sock-read", b: "sock-practice", why: "The practice questions are about the reading." },
];
