/* The Verdict (final test) pass rule. There are no points: the test is either passed or not yet passed. */

/** Share of questions that must be right to close the case */
export const VERDICT_PASS = 0.65;

export function passed(correct: number, total: number) {
  return total > 0 && correct / total >= VERDICT_PASS;
}

/** How many questions must be right out of `total` */
export function neededToPass(total: number) {
  return Math.ceil(total * VERDICT_PASS);
}
