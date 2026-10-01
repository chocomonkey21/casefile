import type { ClueContent } from "@/lib/types";

/* The Case of the Shaking Ground: earthquakes and volcanoes. */

export const EARTH_LESSONS: Record<string, ClueContent> = {
  /* ------------------------------------------------------------------ */
  layers: {
    question: "What is under the ground beneath your feet, all the way to the centre of the Earth?",
    hints: {
      nudge: "The Earth is built in layers, a bit like a peach: skin, flesh and a stone in the middle.",
      evidenceId: "layers-intro",
      evidenceNote: "The reading “Inside the Earth” names the four layers from the outside in.",
      walkthrough: "From the outside in: the thin rocky crust, the hot slowly flowing mantle, the liquid metal outer core and the solid metal inner core.",
    },
    explanation: [
      "Crust, mantle, outer core and inner core. The crust we live on is very thin compared with the rest.",
      "It gets hotter the deeper you go. The inner core is about as hot as the surface of the Sun.",
    ],
    evidence: {
      "layers-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "Nobody has ever dug to the centre of the Earth. The deepest hole ever drilled goes about 12 km down, less than a third of one percent of the way. Scientists learn what is inside by studying how earthquake waves travel through the planet." },
          { type: "h", text: "The four layers" },
          { type: "list", items: ["Crust: the rocky outer skin, 5 to 70 km thick. We live on it.", "Mantle: very hot rock that flows slowly, like thick toffee, over millions of years.", "Outer core: liquid iron and nickel.", "Inner core: solid iron and nickel, around 5,500°C, but squeezed so hard it cannot melt."] },
          { type: "tip", title: "Key idea", text: "If the Earth were an apple, the crust would be thinner than the apple's skin." },
        ],
      },
      "layers-order": {
        kind: "practice",
        intro: "Put the layers in order, from the surface to the centre. Just for practice.",
        order: { prompt: "From the surface to the centre:", items: ["Crust", "Mantle", "Outer core", "Inner core"] },
      },
    },
    quiz: [
      {
        id: "gl-1",
        type: "choice",
        prompt: "Which layer do we live on?",
        options: [
          { id: "a", text: "The crust" },
          { id: "b", text: "The mantle", why: "The mantle is under the crust." },
          { id: "c", text: "The core", why: "The core is thousands of kilometres down." },
        ],
        correctId: "a",
        hint: "It is the outer skin.",
        evidenceId: "layers-intro",
        walkthrough: "The crust is the thin, rocky outer layer. Everything we see on land and under the sea is crust.",
        explanation: "The crust.",
      },
      {
        id: "gl-2",
        type: "lineup",
        prompt: "Which idea about the inside of the Earth is correct?",
        options: [
          { id: "a", text: "The Earth is hollow in the middle.", why: "The centre is a solid ball of iron and nickel." },
          { id: "b", text: "The mantle is a sea of liquid lava.", why: "The mantle is mostly solid rock that flows very slowly." },
          { id: "c", text: "The inner core is solid metal, even though it is extremely hot." },
          { id: "d", text: "The crust is the thickest layer.", why: "The crust is by far the thinnest layer." },
        ],
        correctId: "c",
        hint: "Pressure matters as much as heat.",
        evidenceId: "layers-intro",
        walkthrough: "The inner core is hotter than 5,000°C, but the weight of everything above squeezes it so hard it stays solid.",
        explanation: "The inner core is solid metal.",
      },
      {
        id: "gl-3",
        type: "choice",
        prompt: "How do scientists know what is inside the Earth?",
        options: [
          { id: "a", text: "By studying how earthquake waves travel through it" },
          { id: "b", text: "By digging to the centre", why: "The deepest hole is only about 12 km." },
          { id: "c", text: "By guessing", why: "They have strong evidence from earthquake waves." },
        ],
        correctId: "a",
        hint: "Look at the first paragraph.",
        evidenceId: "layers-intro",
        walkthrough: "Earthquake waves bend, speed up and slow down as they pass through different layers. Measuring them reveals what is inside.",
        explanation: "From earthquake waves.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  plates: {
    question: "Why do the continents slowly move?",
    hints: {
      nudge: "The crust is not one piece. Think of a cracked eggshell sitting on something that moves.",
      evidenceId: "plates-intro",
      evidenceNote: "The reading “The moving puzzle” explains what carries the plates.",
      walkthrough: "The crust is broken into huge pieces called tectonic plates. They float on the slowly flowing mantle underneath, which carries them a few centimetres a year.",
    },
    explanation: [
      "The crust is split into tectonic plates. The slow movement of the hot mantle beneath carries them along.",
      "They move about as fast as your fingernails grow, but over millions of years that moves whole continents.",
    ],
    evidence: {
      "plates-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "The Earth's crust is cracked into about 15 large pieces called tectonic plates. They fit together like a jigsaw puzzle." },
          { type: "p", text: "Heat from deep inside makes the mantle churn very slowly. As it moves, it drags the plates along, a few centimetres each year." },
          { type: "tip", title: "Key idea", text: "Plates move about as fast as your fingernails grow. 200 million years ago all the continents were joined as one, called Pangaea." },
          { type: "h", text: "Where plates meet" },
          { type: "list", items: ["Pulling apart: new crust forms, like in the middle of the Atlantic Ocean.", "Pushing together: one plate can slide under the other, or both crumple up into mountains like the Himalayas.", "Sliding past: the plates grind sideways, like at the San Andreas Fault in California."] },
        ],
      },
      "plates-match": {
        kind: "practice",
        intro: "Match the plate boundary. Just for practice.",
        questions: [
          {
            id: "gp-p1",
            type: "choice",
            prompt: "Two plates push into each other and crumple up. What forms?",
            options: [
              { id: "a", text: "Mountains" },
              { id: "b", text: "A new ocean", why: "New ocean floor forms where plates pull apart." },
              { id: "c", text: "Nothing at all", why: "Pushing plates crumple the crust." },
            ],
            correctId: "a",
            hint: "Think of the Himalayas.",
            walkthrough: "When two continents push together, the crust crumples and is pushed upwards into mountains.",
            explanation: "Mountains, like the Himalayas.",
          },
          {
            id: "gp-p2",
            type: "choice",
            prompt: "What was Pangaea?",
            options: [
              { id: "a", text: "One giant continent, long ago" },
              { id: "b", text: "A type of volcano", why: "Pangaea was the supercontinent." },
              { id: "c", text: "A layer of the Earth", why: "Pangaea was a continent." },
            ],
            correctId: "a",
            hint: "Check the key idea.",
            walkthrough: "About 200 million years ago all the land was joined into one supercontinent called Pangaea.",
            explanation: "A supercontinent.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "gp-1",
        type: "lineup",
        prompt: "Why do continents move? Pick the correct idea.",
        options: [
          { id: "a", text: "Ocean currents push them.", why: "Currents move water, not the solid crust." },
          { id: "b", text: "The slowly flowing mantle carries the plates along." },
          { id: "c", text: "The Moon pulls them around.", why: "The Moon pulls on tides, not on plates." },
          { id: "d", text: "They do not move at all.", why: "Measurements show plates move a few centimetres a year." },
        ],
        correctId: "b",
        hint: "What is underneath the plates?",
        evidenceId: "plates-intro",
        walkthrough: "Heat inside the Earth makes the mantle churn slowly. That motion drags the plates, and the continents ride on them.",
        explanation: "The mantle carries the plates.",
      },
      {
        id: "gp-2",
        type: "choice",
        prompt: "About how fast do tectonic plates move?",
        options: [
          { id: "a", text: "About as fast as fingernails grow" },
          { id: "b", text: "About as fast as a person walks", why: "Much slower than that." },
          { id: "c", text: "They are completely still", why: "They do move, just very slowly." },
        ],
        correctId: "a",
        hint: "A few centimetres a year.",
        evidenceId: "plates-intro",
        walkthrough: "A few centimetres a year, roughly how fast your fingernails grow.",
        explanation: "About as fast as fingernails grow.",
      },
      {
        id: "gp-3",
        type: "choice",
        prompt: "At the San Andreas Fault, the plates...",
        options: [
          { id: "a", text: "Slide past each other sideways" },
          { id: "b", text: "Pull apart to make an ocean", why: "That happens in the middle of the Atlantic." },
          { id: "c", text: "Crumple into tall mountains", why: "That happens where plates push together." },
        ],
        correctId: "a",
        hint: "Look at the list of where plates meet.",
        evidenceId: "plates-intro",
        walkthrough: "The San Andreas Fault is where two plates grind past each other sideways.",
        explanation: "They slide past each other.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  quakes: {
    question: "Why does the ground suddenly shake in an earthquake?",
    hints: {
      nudge: "Think of two plates trying to slide past each other, but stuck.",
      evidenceId: "quake-intro",
      evidenceNote: "The reading “Why the ground shakes” explains what builds up and then lets go.",
      walkthrough: "Plates get stuck as they try to move. Pressure builds up for years. When the rock finally slips, all that stored energy is released at once as shaking waves.",
    },
    explanation: [
      "Plates get stuck, strain builds up, and then the rock suddenly slips. The energy travels out as waves that shake the ground.",
      "The place underground where the slip starts is the focus. The point on the surface right above it is the epicentre.",
    ],
    evidence: {
      "quake-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "Tectonic plates do not slide smoothly. Their edges are rough, so they lock together and get stuck." },
          { type: "p", text: "The plates keep pushing, so pressure builds up in the rock for years, even centuries. Then suddenly the rock snaps and slips. The stored energy rushes out as seismic waves, and the ground shakes." },
          { type: "tip", title: "Key idea", text: "Stuck, strain, slip. That is how an earthquake happens." },
          { type: "h", text: "Words to know" },
          { type: "list", items: ["Focus: the place underground where the rock slips.", "Epicentre: the point on the surface directly above the focus. Shaking is usually strongest here.", "Seismometer: an instrument that measures shaking.", "Magnitude: a number for how much energy was released."] },
          { type: "h", text: "Staying safe" },
          { type: "p", text: "Drop, cover and hold on. Get down, shelter under a sturdy table, and hold on until the shaking stops." },
        ],
      },
      "quake-safe": {
        kind: "practice",
        intro: "Two quick questions. Just for practice.",
        questions: [
          {
            id: "gq-p1",
            type: "choice",
            prompt: "You are in a classroom when an earthquake starts. What should you do?",
            options: [
              { id: "a", text: "Drop, cover under a sturdy desk and hold on" },
              { id: "b", text: "Run outside straight away", why: "Running while the ground shakes is dangerous. Falling objects and glass are the biggest risk." },
              { id: "c", text: "Stand by a window to watch", why: "Windows can shatter. Stay away from glass." },
            ],
            correctId: "a",
            hint: "Three words: drop, cover...",
            walkthrough: "Drop to the floor, cover under something sturdy, hold on until it stops.",
            explanation: "Drop, cover and hold on.",
          },
          {
            id: "gq-p2",
            type: "choice",
            prompt: "What does a seismometer measure?",
            options: [
              { id: "a", text: "How the ground shakes" },
              { id: "b", text: "How hot lava is", why: "That would be a thermometer." },
              { id: "c", text: "How tall a mountain is", why: "A seismometer measures shaking." },
            ],
            correctId: "a",
            hint: "Seismic means to do with earthquakes.",
            walkthrough: "A seismometer records the shaking from seismic waves.",
            explanation: "It measures shaking.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "gq-1",
        type: "lineup",
        prompt: "What causes an earthquake? Pick the correct idea.",
        options: [
          { id: "a", text: "Thunder underground.", why: "Thunder happens in the sky. Earthquakes come from moving rock." },
          { id: "b", text: "Stuck plates suddenly slipping and releasing stored energy." },
          { id: "c", text: "Very heavy buildings pressing down.", why: "Buildings are far too light to move plates." },
          { id: "d", text: "Hot weather cracking the ground.", why: "Earthquakes start kilometres underground, not from weather." },
        ],
        correctId: "b",
        hint: "Stuck, strain, slip.",
        evidenceId: "quake-intro",
        walkthrough: "Plates lock together, strain builds, then the rock slips and the energy shakes the ground.",
        explanation: "Stuck plates slipping.",
      },
      {
        id: "gq-2",
        type: "choice",
        prompt: "What is the epicentre?",
        options: [
          { id: "a", text: "The point on the surface right above where the rock slipped" },
          { id: "b", text: "The place deep underground where the rock slipped", why: "That is the focus. The epicentre is on the surface above it." },
          { id: "c", text: "The centre of the Earth", why: "It is just above the earthquake's focus." },
        ],
        correctId: "a",
        hint: "Epi means above.",
        evidenceId: "quake-intro",
        walkthrough: "The focus is underground. The epicentre is the spot on the surface directly above it.",
        explanation: "The point on the surface above the focus.",
      },
      {
        id: "gq-3",
        type: "choice",
        prompt: "Where do most earthquakes happen?",
        options: [
          { id: "a", text: "Near the edges of tectonic plates" },
          { id: "b", text: "In the middle of plates, far from any edge", why: "They can happen there, but much less often." },
          { id: "c", text: "Only in cold countries", why: "Climate has nothing to do with it." },
        ],
        correctId: "a",
        hint: "Where do plates get stuck against each other?",
        evidenceId: "quake-intro",
        walkthrough: "Plates lock and slip where they meet, so most earthquakes happen along plate edges.",
        explanation: "Near plate edges.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  volcanoes: {
    question: "Where does the lava in a volcano come from?",
    hints: {
      nudge: "Lava is melted rock. Where is the rock hot enough to melt?",
      evidenceId: "volcano-intro",
      evidenceNote: "The reading “Inside a volcano” follows melted rock from deep underground to the surface.",
      walkthrough: "Deep underground, rock melts into magma. Magma is lighter than the solid rock around it, so it rises and collects in a magma chamber. When pressure builds, it bursts out of the volcano. Once it reaches the surface it is called lava.",
    },
    explanation: [
      "Lava starts as magma: melted rock from deep underground, often where plates meet. It rises because it is lighter than the rock around it.",
      "Underground it is called magma. Once it comes out of the ground it is called lava.",
    ],
    evidence: {
      "volcano-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "A volcano is an opening in the crust where melted rock, ash and gas escape." },
          { type: "p", text: "Deep underground, often where plates pull apart or one sinks under another, rock melts into magma. Magma is lighter than solid rock, so it slowly rises, like a blob in a lava lamp, and gathers in a magma chamber." },
          { type: "p", text: "Gas in the magma builds pressure, like shaking a fizzy drink. When it is too much, the volcano erupts." },
          { type: "tip", title: "Key idea", text: "Magma is melted rock underground. Lava is the same melted rock once it reaches the surface." },
          { type: "h", text: "Parts of a volcano" },
          { type: "list", items: ["Magma chamber: where magma collects underground", "Vent: the pipe the magma rises through", "Crater: the opening at the top", "Ash cloud: tiny bits of rock and glass blasted into the sky"] },
          { type: "p", text: "Volcanoes are not all bad news. Volcanic soil is very rich, which is why farmers live near volcanoes like Mount Vesuvius in Italy." },
        ],
      },
      "volcano-parts": {
        kind: "practice",
        intro: "Follow the magma upwards. Just for practice.",
        order: { prompt: "Put the journey of melted rock in order.", items: ["Rock melts deep underground", "Magma rises and collects in the magma chamber", "Pressure from gas builds up", "Magma bursts out through the vent as lava"] },
      },
    },
    quiz: [
      {
        id: "gv-1",
        type: "choice",
        prompt: "What is the difference between magma and lava?",
        options: [
          { id: "a", text: "Magma is underground, lava has reached the surface" },
          { id: "b", text: "Lava is hotter than magma", why: "They are the same melted rock. The name depends on where it is." },
          { id: "c", text: "Magma is solid, lava is liquid", why: "Both are melted rock." },
        ],
        correctId: "a",
        hint: "Same stuff, different place.",
        evidenceId: "volcano-intro",
        walkthrough: "Melted rock is called magma underground and lava once it comes out.",
        explanation: "Magma is underground. Lava is on the surface.",
      },
      {
        id: "gv-2",
        type: "lineup",
        prompt: "Why does magma rise towards the surface? Pick the correct idea.",
        options: [
          { id: "a", text: "Because it is lighter than the solid rock around it." },
          { id: "b", text: "Because the Sun pulls it up.", why: "The Sun has nothing to do with magma rising." },
          { id: "c", text: "Because volcanoes suck it up like a straw.", why: "Nothing sucks. Magma floats up because it is lighter." },
          { id: "d", text: "Because rain pushes it from below.", why: "Rain stays near the surface." },
        ],
        correctId: "a",
        hint: "Think of a lava lamp.",
        evidenceId: "volcano-intro",
        walkthrough: "Hot melted rock is less dense than the solid rock around it, so it slowly floats upwards.",
        explanation: "It is lighter than the rock around it.",
      },
      {
        id: "gv-3",
        type: "choice",
        prompt: "Why do many farmers live near volcanoes?",
        options: [
          { id: "a", text: "Volcanic soil is very rich" },
          { id: "b", text: "Volcanoes keep the air warm for crops", why: "The real reason is the soil." },
          { id: "c", text: "Lava waters the fields", why: "Lava destroys fields. Old volcanic ash makes rich soil." },
        ],
        correctId: "a",
        hint: "Look at the last paragraph.",
        evidenceId: "volcano-intro",
        walkthrough: "Ash and rock from old eruptions break down into soil full of nutrients, which is great for crops.",
        explanation: "Volcanic soil is rich.",
      },
    ],
  },
};
