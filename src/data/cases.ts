import type { CaseDef, EvidenceDef, EvidenceKind } from "@/lib/types";

/*
  Mock course data. Swap this file (or fetch from an API later) without touching the UI.
  Full lesson text for every case lives in data/lessons. Here we only need the
  structure: clues (lessons), evidence lists and the brief.

  Wording rule: titles say what the lesson is about ("How clouds form"), so no theme word
  needs decoding. The ids must not change, because saved progress is keyed by them.
*/

const ev = (
  kind: EvidenceKind,
  id: string,
  title: string,
  minutes: number,
  blurb: string,
): EvidenceDef => ({ id, kind, title, minutes, blurb });

const puddle: CaseDef = {
  id: "puddle",
  number: "017",
  title: "The Case of the Vanishing Puddle",
  topic: "The water cycle",
  subject: "science",
  tagline: "A puddle disappears during the day. Find out where the water goes and how it comes back as rain.",
  hook: "A large puddle by the school gate is gone by lunchtime. In this case you will find out where the water went. Along the way you will learn how the water cycle works: evaporation, condensation, precipitation and collection.",
  goal: "Explain where a puddle's water goes, and how that water ends up in clouds and rain.",
  learn: [
    "Say what evaporation is and what makes it faster",
    "Explain how clouds form (condensation)",
    "Name the ways water falls from the sky (precipitation)",
    "Follow water as it collects and flows back to where it started",
    "Explain the whole water cycle in your own words",
  ],
  clues: [
    {
      id: "evaporation",
      title: "How water evaporates",
      teaser: "Find out what happens to the water in a puddle when the sun comes out.",
      minutes: 8,
      evidence: [
        ev("reading", "sun-job", "How the sun makes water evaporate", 4, "How heat turns liquid water into an invisible gas."),
        ev("diagram", "evap-close", "Evaporation up close", 2, "A close-up of the tiny water particles that escape."),
        ev("video", "puddle-shrink", "A puddle shrinking during the day", 2, "A step-by-step animation of one puddle on a sunny day."),
      ],
    },
    {
      id: "condensation",
      title: "How clouds form",
      teaser: "Water vapour rises and cools. Find out how it turns into clouds.",
      minutes: 9,
      evidence: [
        ev("reading", "why-clouds", "How clouds form", 4, "What happens when water vapour cools down."),
        ev("diagram", "cold-glass", "Why a cold glass gets wet", 2, "A diagram of condensation on a glass of cold water."),
        ev("practice", "cloud-spotter", "Spot the condensation", 3, "Find examples of condensation in everyday life."),
      ],
    },
    {
      id: "precipitation",
      title: "How water falls from the sky",
      teaser: "Clouds release their water. Rain is only one of the ways.",
      minutes: 8,
      evidence: [
        ev("reading", "rain-snow", "Rain, snow, sleet and hail", 4, "The four kinds of precipitation and what decides which one falls."),
        ev("video", "inside-drop", "How a raindrop forms", 2, "An animation of tiny droplets joining into a raindrop."),
        ev("diagram", "four-types", "Four types of precipitation", 2, "A diagram comparing rain, snow, sleet and hail."),
      ],
    },
    {
      id: "collection",
      title: "Where water goes after it lands",
      teaser: "Follow the water after it reaches the ground.",
      minutes: 9,
      evidence: [
        ev("reading", "rivers-lakes", "Rivers, lakes and underground water", 5, "Runoff, groundwater and the journey to the sea."),
        ev("diagram", "where-rain-goes", "Where does rain go?", 2, "Follow one raindrop down a hillside."),
        ev("practice", "follow-drop", "Where does each raindrop go?", 3, "Three practice questions about where water ends up."),
      ],
    },
    {
      id: "cycle",
      title: "The whole water cycle",
      teaser: "Put the four steps together and explain the full cycle.",
      minutes: 10,
      evidence: [
        ev("reading", "all-together", "Putting it all together", 4, "Why the water cycle keeps going."),
        ev("diagram", "cycle-map", "The water cycle map", 3, "The full cycle on one page."),
        ev("practice", "order-cycle", "Put the cycle in order", 3, "Put the four steps in the right order."),
      ],
    },
  ],
};

const fractions: CaseDef = {
  id: "fractions",
  number: "023",
  title: "The Case of the Missing Slice",
  topic: "Fractions",
  subject: "maths",
  tagline: "Learn what fractions mean, and how to compare and add them.",
  hook: "A pizza has one slice missing. To say how much is left, you need fractions. In this case you will learn how to read, compare and add simple fractions.",
  goal: "Read, compare and add simple fractions with confidence.",
  learn: [
    "Say what the top and bottom of a fraction mean",
    "Spot fractions that are the same size",
    "Decide which of two fractions is larger",
    "Add fractions with the same bottom number",
  ],
  clues: [
    { id: "what-is", title: "What a fraction is", teaser: "Parts of a whole, and what the top and bottom numbers mean.", minutes: 6, evidence: [ev("reading", "intro", "What a fraction means", 3, "Read a fraction and say what each number tells you."), ev("practice", "slice-it", "Read the fraction", 3, "Two quick questions on reading fractions.")] },
    { id: "equivalent", title: "Equivalent fractions", teaser: "Different fractions can show the same amount, like 2/4 and 1/2.", minutes: 6, evidence: [ev("reading", "same-size", "Fractions that are equal", 3, "Why 2/4 is the same as 1/2."), ev("practice", "match-up", "Match equal fractions", 3, "Pair up fractions that are the same size.")] },
    { id: "compare", title: "Comparing fractions", teaser: "Decide which of two fractions is larger.", minutes: 6, evidence: [ev("reading", "compare-intro", "Ways to compare fractions", 3, "Quick methods for deciding which is larger."), ev("practice", "bigger-smaller", "Order the fractions", 3, "Sort four fractions from smallest to largest.")] },
    { id: "add", title: "Adding fractions", teaser: "Add fractions that have the same bottom number.", minutes: 6, evidence: [ev("reading", "add-intro", "Adding fractions step by step", 3, "Add the top numbers and keep the bottom number."), ev("practice", "add-practice", "Fraction sums", 3, "Two quick sums to try.")] },
  ],
};

const solar: CaseDef = {
  id: "solar-system",
  number: "031",
  title: "The Case of the Wandering Lights",
  topic: "The solar system",
  subject: "science",
  tagline: "Learn about the Sun, the planets and the objects that travel around the Sun.",
  hook: "Some bright lights in the night sky do not twinkle, and they slowly move. They are planets. In this case you will learn what the solar system contains and how it fits together.",
  goal: "Describe the Sun, the planets and how they fit together in our solar system.",
  learn: [
    "Explain why the Sun is the centre of our solar system",
    "Tell the four rocky planets apart",
    "Describe the giant planets",
    "Say what moons, asteroids and comets are",
  ],
  clues: [
    { id: "sun", title: "The Sun", teaser: "Everything in the solar system moves around one star.", minutes: 6, evidence: [ev("reading", "sun-intro", "About the Sun", 3, "Why the Sun matters so much."), ev("practice", "sun-quiz", "Check what you know about the Sun", 3, "A few quick questions.")] },
    { id: "rocky", title: "The rocky planets", teaser: "Mercury, Venus, Earth and Mars are closest to the Sun.", minutes: 6, evidence: [ev("reading", "rocky-intro", "Four rocky planets", 3, "What makes each one different."), ev("practice", "rocky-match", "Match the planet", 3, "Use clues to name the planet.")] },
    { id: "giants", title: "The giant planets", teaser: "Jupiter and Saturn are gas giants. Uranus and Neptune are ice giants.", minutes: 6, evidence: [ev("reading", "giants-intro", "Gas giants and ice giants", 3, "Size, rings and storms."), ev("practice", "giants-sort", "Sort the giant planets", 3, "Gas giant or ice giant?")] },
    { id: "small", title: "Moons, asteroids and comets", teaser: "Other objects also travel around the Sun.", minutes: 6, evidence: [ev("reading", "small-intro", "Smaller objects in space", 3, "Which objects go around what."), ev("practice", "small-quiz", "Name that space object", 3, "Test what you know.")] },
  ],
};

const egypt: CaseDef = {
  id: "ancient-egypt",
  number: "042",
  title: "The Case of the Secret Scroll",
  topic: "Ancient Egypt",
  subject: "history",
  tagline: "Find out how people in ancient Egypt lived, ruled and wrote.",
  hook: "A museum has an old scroll covered in small pictures. These pictures are hieroglyphs from ancient Egypt. In this case you will learn about the people who wrote them.",
  goal: "Understand how people lived, ruled and wrote in ancient Egypt.",
  learn: [
    "Explain why the Nile mattered so much",
    "Say who the pharaohs were and what they did",
    "Read a few hieroglyphs",
    "Describe how the pyramids were built",
  ],
  clues: [
    { id: "nile", title: "The River Nile", teaser: "Most people in ancient Egypt lived beside one river.", minutes: 6, evidence: [ev("reading", "nile-intro", "Life on the Nile", 3, "Floods, farms and boats."), ev("practice", "nile-map", "The Nile farming year", 3, "Put the flood, planting and harvest in order.")] },
    { id: "pharaohs", title: "Pharaohs and rulers", teaser: "Pharaohs ruled Egypt, and people believed they were special.", minutes: 6, evidence: [ev("reading", "pharaoh-intro", "Who the pharaohs were", 3, "Power, jobs and famous names."), ev("practice", "pharaoh-quiz", "Pharaoh quiz", 3, "Who did what?")] },
    { id: "writing", title: "Hieroglyphs", teaser: "Hieroglyphs use pictures to stand for sounds and ideas.", minutes: 6, evidence: [ev("reading", "glyph-intro", "Reading hieroglyphs", 3, "How the symbols work."), ev("practice", "glyph-decode", "Decode a message", 3, "Work out a short message.")] },
    { id: "pyramids", title: "How the pyramids were built", teaser: "Find out how huge stones were moved and lifted.", minutes: 6, evidence: [ev("reading", "pyramid-intro", "Building a pyramid", 3, "Workers, ramps and plans."), ev("practice", "pyramid-order", "Put the building steps in order", 3, "Order the steps.")] },
  ],
};

const earth: CaseDef = {
  id: "shaking-ground",
  number: "064",
  title: "The Case of the Shaking Ground",
  topic: "Earthquakes and volcanoes",
  subject: "geography",
  tagline: "Find out what is inside the Earth, and why the ground shakes and mountains erupt.",
  hook: "Cups rattle on a shelf and the floor trembles for a few seconds. Far away, a mountain sends up a cloud of ash. In this case you will find out what is happening deep under your feet.",
  goal: "Explain how the Earth's layers and moving plates cause earthquakes and volcanoes.",
  learn: [
    "Name the layers of the Earth",
    "Explain why tectonic plates move",
    "Say what causes an earthquake",
    "Follow magma from deep underground to an eruption",
  ],
  clues: [
    { id: "layers", title: "Inside the Earth", teaser: "Crust, mantle and core: the layers under your feet.", minutes: 6, evidence: [ev("reading", "layers-intro", "Inside the Earth", 3, "The four layers, from the surface to the centre."), ev("practice", "layers-order", "Put the layers in order", 2, "From the crust to the inner core.")] },
    { id: "plates", title: "Moving plates", teaser: "The ground is a jigsaw of plates that never stop moving.", minutes: 6, evidence: [ev("reading", "plates-intro", "The moving puzzle", 3, "Tectonic plates and what happens where they meet."), ev("practice", "plates-match", "Match the plate boundary", 3, "Mountains, oceans and faults.")] },
    { id: "quakes", title: "Why the ground shakes", teaser: "Stuck plates, built-up strain and a sudden slip.", minutes: 7, evidence: [ev("reading", "quake-intro", "Why the ground shakes", 4, "Focus, epicentre and how to stay safe."), ev("practice", "quake-safe", "Earthquake check", 3, "Two quick questions.")] },
    { id: "volcanoes", title: "Inside a volcano", teaser: "Follow melted rock from deep underground to an eruption.", minutes: 7, evidence: [ev("reading", "volcano-intro", "Inside a volcano", 4, "Magma, lava and the parts of a volcano."), ev("practice", "volcano-parts", "Follow the magma", 3, "Put the journey of melted rock in order.")] },
  ],
};

/** Short tutorial case that onboarding hands to every new student */
const sock: CaseDef = {
  id: "sock",
  number: "001",
  title: "The Case of the Missing Sock",
  topic: "Practice case",
  subject: "practice",
  tagline: "A short practice case that shows you how CaseFile works.",
  hook: "This short case is about a lost sock. Its real purpose is to show you how a case works: lessons, evidence, hints and questions.",
  goal: "Complete one lesson and close your first case.",
  learn: [
    "Read a lesson",
    "Collect evidence",
    "Use a hint",
    "Answer questions to complete a lesson",
  ],
  practice: true,
  clues: [
    {
      id: "trail",
      title: "Where lost socks go",
      teaser: "A very short lesson to get you started.",
      minutes: 4,
      evidence: [
        ev("reading", "sock-read", "Where socks go", 2, "A short reading to get you started."),
        ev("practice", "sock-practice", "Practice questions", 2, "Try a couple of practice questions."),
      ],
    },
  ],
};

/** Display order: practice first, then by case number */
export const CASES: CaseDef[] = [sock, puddle, fractions, solar, egypt, earth];

export const FEATURED_CASE_ID = "puddle";

export function getCase(id: string): CaseDef | undefined {
  return CASES.find((c) => c.id === id);
}

export function getClue(caseDef: CaseDef, clueId: string) {
  return caseDef.clues.find((c) => c.id === clueId);
}
