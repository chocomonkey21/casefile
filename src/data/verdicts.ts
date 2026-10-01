import type { VerdictQuestion } from "@/lib/types";

/*
  Verdict (final test) questions. No hints here. Each question belongs to a clue, so the
  results can tell the student which clue to look at again.
*/

const PUDDLE: VerdictQuestion[] = [
  {
    id: "v-evap-1",
    clueId: "evaporation",
    type: "choice",
    prompt: "A wet towel dries on a washing line on a hot day. What is happening to its water?",
    options: [
      { id: "a", text: "Evaporation: it turns into water vapour and goes into the air" },
      { id: "b", text: "Condensation: it turns into a cloud inside the towel", why: "Condensation is vapour turning into liquid. The towel is losing water, not gaining it." },
      { id: "c", text: "Precipitation: it falls out of the towel", why: "Precipitation is water falling from clouds." },
      { id: "d", text: "Collection: it gathers in the towel", why: "Collection is water gathering in rivers, lakes and the sea." },
    ],
    correctId: "a",
    evidenceId: "sun-job",
    explanation: "A drying towel is evaporation. Liquid water turns into water vapour and mixes into the air.",
  },
  {
    id: "v-evap-2",
    clueId: "evaporation",
    type: "lineup",
    prompt: "Pick the true idea about evaporation.",
    options: [
      { id: "a", text: "Water only evaporates when it boils.", why: "Water evaporates at any temperature. It is just faster when it is warm." },
      { id: "b", text: "Evaporation turns water vapour into rain.", why: "That is condensation and then precipitation. Evaporation goes the other way, from liquid to gas." },
      { id: "c", text: "Evaporation only happens in the sea.", why: "It happens from puddles, lakes, towels, even your skin." },
      { id: "d", text: "Evaporation turns liquid water into an invisible gas." },
    ],
    correctId: "d",
    evidenceId: "sun-job",
    explanation: "Evaporation is liquid water turning into water vapour, an invisible gas.",
  },
  {
    id: "v-cond-1",
    clueId: "condensation",
    type: "choice",
    prompt: "Why does a cold glass of juice get wet on the outside?",
    options: [
      { id: "a", text: "The juice leaks through the glass", why: "Glass does not let liquid through." },
      { id: "b", text: "Water vapour in the air cools down and turns into drops" },
      { id: "c", text: "Cold makes water appear out of nothing", why: "Water cannot appear from nothing. It comes from the air." },
      { id: "d", text: "The glass sweats like a person", why: "Glass does not sweat. The water comes from the air." },
    ],
    correctId: "b",
    evidenceId: "cold-glass",
    explanation: "Water vapour from the air touches the cold glass, cools, and condenses into drops.",
  },
  {
    id: "v-cond-2",
    clueId: "condensation",
    type: "choice",
    prompt: "What is a cloud made of?",
    options: [
      { id: "a", text: "Invisible water vapour", why: "Vapour is invisible. A cloud is something you can see." },
      { id: "b", text: "Smoke", why: "Smoke is not water. Clouds are made of water." },
      { id: "c", text: "Billions of tiny water drops or ice crystals" },
      { id: "d", text: "Fluffy white gas", why: "It looks like gas, but it is made of tiny drops." },
    ],
    correctId: "c",
    evidenceId: "why-clouds",
    explanation: "Clouds are billions of tiny water drops or ice crystals, floating together.",
  },
  {
    id: "v-prec-1",
    clueId: "precipitation",
    type: "choice",
    prompt: "Rain falls through a very cold layer of air near the ground and freezes into small ice pellets. What is it called?",
    options: [
      { id: "a", text: "Snow", why: "Snow forms as ice crystals and stays frozen the whole way." },
      { id: "b", text: "Sleet" },
      { id: "c", text: "Hail", why: "Hail grows inside a storm cloud, tossed up and down by strong winds." },
      { id: "d", text: "Fog", why: "Fog is a cloud near the ground. It does not fall." },
    ],
    correctId: "b",
    evidenceId: "rain-snow",
    explanation: "Rain that freezes on the way down is sleet.",
  },
  {
    id: "v-prec-2",
    clueId: "precipitation",
    type: "choice",
    prompt: "What makes a cloud let go of its water as rain?",
    options: [
      { id: "a", text: "The drops join together until they are too heavy to float" },
      { id: "b", text: "The sun switches off", why: "The sun does not switch off. Drops fall because they get heavy." },
      { id: "c", text: "The wind squeezes the cloud like a sponge", why: "Wind moves clouds, but it does not squeeze water out of them." },
      { id: "d", text: "The cloud runs out of air", why: "A cloud is not a container of air that runs out." },
    ],
    correctId: "a",
    evidenceId: "inside-drop",
    explanation: "Tiny drops bump together and join up. When they are too heavy to float, they fall.",
  },
  {
    id: "v-coll-1",
    clueId: "collection",
    type: "choice",
    prompt: "A raindrop lands on a steep hillside made of bare rock. What will most likely happen to it?",
    options: [
      { id: "a", text: "It will soak deep into the rock", why: "Bare rock does not soak up much water." },
      { id: "b", text: "It will run downhill as runoff" },
      { id: "c", text: "It will go straight back into the sky", why: "It could evaporate later, but first it runs downhill." },
      { id: "d", text: "It will stay exactly where it landed", why: "On a steep slope, gravity pulls the water downhill." },
    ],
    correctId: "b",
    evidenceId: "rivers-lakes",
    explanation: "Water cannot soak into bare rock easily, so it runs off downhill. That is runoff.",
  },
  {
    id: "v-cycle-1",
    clueId: "cycle",
    type: "lineup",
    prompt: "Which statement about the water cycle is true?",
    options: [
      { id: "a", text: "It starts at the sea and ends in the clouds.", why: "The cycle is a loop. It has no start or end." },
      { id: "b", text: "Water is used up every time it rains.", why: "Water is never used up. It keeps moving round." },
      { id: "c", text: "Only sea water takes part in it.", why: "Puddles, rivers, lakes and even plants take part too." },
      { id: "d", text: "The sun's heat powers it, and the water keeps going round." },
    ],
    correctId: "d",
    evidenceId: "all-together",
    explanation: "The sun powers the water cycle, and the water just keeps going round and round.",
  },
];

const SOCK: VerdictQuestion[] = [
  {
    id: "v-sock-1",
    clueId: "trail",
    type: "choice",
    prompt: "Where do lost socks usually hide?",
    options: [
      { id: "a", text: "Behind washing machines and inside duvet covers" },
      { id: "b", text: "On the moon", why: "No socks have made it to the moon yet." },
      { id: "c", text: "At the bottom of the sea", why: "That is a long way for a sock to go." },
    ],
    correctId: "a",
    evidenceId: "sock-read",
    explanation: "Missing socks are usually still in the house, hiding behind machines or in duvet covers.",
  },
  {
    id: "v-sock-2",
    clueId: "trail",
    type: "choice",
    prompt: "In CaseFile, what is a hint for?",
    options: [
      { id: "a", text: "To give you help when you are stuck. You can use it any time." },
      { id: "b", text: "To skip a clue", why: "Hints help you solve a clue. They do not skip it." },
      { id: "c", text: "To lock the case", why: "Hints never lock anything." },
    ],
    correctId: "a",
    evidenceId: "sock-read",
    explanation: "Hints are there to help you when you are stuck. You can use them any time.",
  },
  {
    id: "v-sock-3",
    clueId: "trail",
    type: "lineup",
    prompt: "Which idea is true?",
    options: [
      { id: "a", text: "Socks melt in the dryer.", why: "Not quite. Socks do not melt." },
      { id: "b", text: "A missing sock is usually still in the house." },
      { id: "c", text: "The washing machine eats socks.", why: "Not quite. Machines do not eat socks, but socks can fall behind them." },
    ],
    correctId: "b",
    evidenceId: "sock-read",
    explanation: "Missing socks have usually not gone far. They are hiding.",
  },
];

const VERDICTS: Record<string, VerdictQuestion[]> = { puddle: PUDDLE, sock: SOCK };

export function getVerdict(caseId: string): VerdictQuestion[] | undefined {
  return VERDICTS[caseId];
}
