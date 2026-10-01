import type { ClueContent } from "@/lib/types";

/* The Case of the Wandering Lights: the solar system. */

export const SOLAR_LESSONS: Record<string, ClueContent> = {
  /* ------------------------------------------------------------------ */
  sun: {
    question: "Why do all the planets travel around the Sun?",
    hints: {
      nudge: "Think about which object in the solar system is by far the heaviest.",
      evidenceId: "sun-intro",
      evidenceNote: "The reading “About the Sun” explains what holds the planets in their paths.",
      walkthrough: "The Sun holds almost all the mass of the solar system. Its gravity pulls on every planet. The planets are moving fast sideways, so instead of falling in they keep circling. That path is called an orbit.",
    },
    explanation: [
      "The Sun's gravity holds the planets in their orbits. The Sun is so massive that its pull reaches all the way out past Neptune.",
      "The Sun is a star: a huge ball of hot gas that makes its own light and heat. The planets only shine because they reflect sunlight.",
    ],
    evidence: {
      "sun-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "The Sun is a star, just like the stars you see at night. It only looks bigger and brighter because it is much closer to us." },
          { type: "p", text: "It is a giant ball of hot gas, mostly hydrogen and helium. Deep inside, the gas is squeezed so hard that it gives out enormous amounts of light and heat." },
          { type: "tip", title: "Key idea", text: "The Sun holds about 99.8% of all the mass in the solar system. Its gravity keeps every planet in orbit." },
          { type: "h", text: "Sun facts" },
          { type: "list", items: ["About 109 Earths would fit across it.", "Its light takes about 8 minutes to reach Earth.", "Planets and moons do not make light. They reflect the Sun's light."] },
        ],
      },
      "sun-quiz": {
        kind: "practice",
        intro: "Two quick questions about the Sun. Just for practice.",
        questions: [
          {
            id: "ss-p1",
            type: "choice",
            prompt: "What kind of object is the Sun?",
            options: [
              { id: "a", text: "A star" },
              { id: "b", text: "A planet", why: "Planets do not make their own light. The Sun does." },
              { id: "c", text: "A moon", why: "Moons travel around planets. Everything travels around the Sun." },
            ],
            correctId: "a",
            hint: "It makes its own light and heat.",
            walkthrough: "Objects that make their own light by burning through their gas are stars. The Sun is our closest star.",
            explanation: "The Sun is a star.",
          },
          {
            id: "ss-p2",
            type: "choice",
            prompt: "Why can we see the Moon at night?",
            options: [
              { id: "a", text: "It reflects light from the Sun" },
              { id: "b", text: "It makes its own light", why: "The Moon is rock. It does not make light." },
              { id: "c", text: "It is on fire", why: "The Moon has no air, so nothing on it can burn." },
            ],
            correctId: "a",
            hint: "Only stars make their own light.",
            walkthrough: "The Moon is a rocky ball. Sunlight hits it and bounces off towards us, so we see it shine.",
            explanation: "The Moon reflects sunlight.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "ss-1",
        type: "lineup",
        prompt: "Why do the planets keep travelling around the Sun? Pick the correct idea.",
        options: [
          { id: "a", text: "They are tied to the Sun by invisible strings.", why: "There are no strings. An invisible pull does the job, though: gravity." },
          { id: "b", text: "The Sun's gravity pulls on them while they move sideways, so they keep circling." },
          { id: "c", text: "The planets are pushed by wind in space.", why: "Space has no air, so there is no wind to push them." },
          { id: "d", text: "Magnets in the Sun pull the planets.", why: "It is gravity, not magnetism, that holds the planets." },
        ],
        correctId: "b",
        hint: "What force pulls objects towards a massive object?",
        evidenceId: "sun-intro",
        walkthrough: "Gravity pulls the planets towards the Sun. Because they are also moving fast sideways, they never fall in. They go round and round in an orbit.",
        explanation: "The Sun's gravity keeps the planets in orbit.",
      },
      {
        id: "ss-2",
        type: "choice",
        prompt: "Roughly how long does sunlight take to reach Earth?",
        options: [
          { id: "a", text: "Instantly", why: "Light is fast, but it still takes time over such a huge distance." },
          { id: "b", text: "About 8 minutes" },
          { id: "c", text: "About 8 days", why: "Much faster than that." },
          { id: "d", text: "About 8 years", why: "That is closer to the light from some nearby stars." },
        ],
        correctId: "b",
        hint: "Check the list of Sun facts.",
        evidenceId: "sun-intro",
        walkthrough: "The reading says sunlight takes about 8 minutes to cross the 150 million kilometres to Earth.",
        explanation: "About 8 minutes.",
      },
      {
        id: "ss-3",
        type: "choice",
        prompt: "Which of these makes its own light?",
        options: [
          { id: "a", text: "The Moon", why: "The Moon reflects sunlight." },
          { id: "b", text: "Mars", why: "Planets reflect sunlight." },
          { id: "c", text: "The Sun" },
          { id: "d", text: "A comet", why: "A comet's glowing tail is lit by the Sun." },
        ],
        correctId: "c",
        hint: "Only stars make their own light.",
        evidenceId: "sun-intro",
        walkthrough: "The Sun is a star, so it makes light. Everything else in the list reflects the Sun's light.",
        explanation: "The Sun is the only one that makes its own light.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  rocky: {
    question: "What do Mercury, Venus, Earth and Mars have in common?",
    hints: {
      nudge: "Think about what you could stand on.",
      evidenceId: "rocky-intro",
      evidenceNote: "The reading “Four rocky planets” describes what the inner planets are made of.",
      walkthrough: "These four are the planets closest to the Sun. Each has a solid, rocky surface you could stand on, unlike the giant planets further out.",
    },
    explanation: [
      "They are the four rocky planets, the closest to the Sun. Each one has a hard, rocky surface.",
      "They are small compared with the giant planets, and they have few or no moons.",
    ],
    evidence: {
      "rocky-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "The four planets closest to the Sun are made of rock and metal. You could stand on any of them, though you would not survive long on most." },
          { type: "list", items: [
            "Mercury: the smallest planet and closest to the Sun. No air to hold heat, so days are scorching and nights are freezing.",
            "Venus: the hottest planet. Thick clouds trap the heat, like a blanket.",
            "Earth: the only planet we know with liquid water on its surface and life.",
            "Mars: the red planet. Its soil is full of rusty iron. It has the tallest volcano in the solar system.",
          ] },
          { type: "tip", title: "Key idea", text: "Venus is hotter than Mercury, even though Mercury is closer to the Sun. Venus's thick atmosphere traps the heat." },
        ],
      },
      "rocky-match": {
        kind: "practice",
        intro: "Use the clues to name the planet. Just for practice.",
        questions: [
          {
            id: "sr-p1",
            type: "choice",
            prompt: "I am red because of rusty iron in my soil. Who am I?",
            options: [
              { id: "a", text: "Mars" },
              { id: "b", text: "Venus", why: "Venus is covered in yellowish clouds." },
              { id: "c", text: "Mercury", why: "Mercury is grey and covered in craters." },
            ],
            correctId: "a",
            hint: "It is called the red planet.",
            walkthrough: "Iron in Mars's soil has rusted, which makes the whole planet look red.",
            explanation: "Mars is the red planet.",
          },
          {
            id: "sr-p2",
            type: "choice",
            prompt: "I am the smallest planet and the closest to the Sun. Who am I?",
            options: [
              { id: "a", text: "Earth", why: "Earth is the third planet from the Sun." },
              { id: "b", text: "Mercury" },
              { id: "c", text: "Mars", why: "Mars is the fourth planet from the Sun." },
            ],
            correctId: "b",
            hint: "Look at the first planet in the list.",
            walkthrough: "Mercury is first in line from the Sun and the smallest of all eight planets.",
            explanation: "Mercury.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "sr-1",
        type: "choice",
        prompt: "Which planet is the hottest?",
        options: [
          { id: "a", text: "Mercury", why: "Mercury is closest, but it has no thick air to trap the heat." },
          { id: "b", text: "Venus" },
          { id: "c", text: "Mars", why: "Mars is further away and quite cold." },
          { id: "d", text: "Earth", why: "Earth is much cooler than Venus." },
        ],
        correctId: "b",
        hint: "Which planet has a thick blanket of clouds?",
        evidenceId: "rocky-intro",
        walkthrough: "Venus's thick atmosphere traps heat, so it is even hotter than Mercury.",
        explanation: "Venus is the hottest planet.",
      },
      {
        id: "sr-2",
        type: "lineup",
        prompt: "Which idea about the rocky planets is correct?",
        options: [
          { id: "a", text: "The rocky planets are the furthest from the Sun.", why: "They are the four closest planets." },
          { id: "b", text: "The rocky planets are made of gas.", why: "That describes Jupiter and Saturn." },
          { id: "c", text: "The rocky planets have solid surfaces you could stand on." },
          { id: "d", text: "Mars is red because it is very hot.", why: "Mars is red because of rusty iron in its soil, and it is cold." },
        ],
        correctId: "c",
        hint: "Why are they called rocky?",
        evidenceId: "rocky-intro",
        walkthrough: "They are made of rock and metal, so they have solid ground.",
        explanation: "The rocky planets have solid surfaces.",
      },
      {
        id: "sr-3",
        type: "choice",
        prompt: "What makes Earth different from the other rocky planets?",
        options: [
          { id: "a", text: "It is the biggest planet", why: "Jupiter is far bigger." },
          { id: "b", text: "It has liquid water on its surface and life" },
          { id: "c", text: "It has no atmosphere", why: "Earth has an atmosphere, the air we breathe." },
        ],
        correctId: "b",
        hint: "What do you need to live?",
        evidenceId: "rocky-intro",
        walkthrough: "Earth is the only planet we know with oceans of liquid water and living things.",
        explanation: "Liquid water and life.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  giants: {
    question: "Could you stand on Jupiter?",
    hints: {
      nudge: "Think about what Jupiter is made of.",
      evidenceId: "giants-intro",
      evidenceNote: "The reading “Gas giants and ice giants” explains what the outer planets are made of.",
      walkthrough: "Jupiter is a gas giant. It is mostly hydrogen and helium gas, getting thicker and hotter deeper down. There is no solid surface to stand on.",
    },
    explanation: [
      "No. Jupiter is a gas giant with no solid surface. You would sink through thicker and thicker gas.",
      "Jupiter and Saturn are gas giants. Uranus and Neptune are ice giants, made of icy water, ammonia and methane under thick gas.",
    ],
    evidence: {
      "giants-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "Beyond Mars and a belt of asteroids are four huge planets. They are very different from the rocky planets." },
          { type: "h", text: "Gas giants: Jupiter and Saturn" },
          { type: "p", text: "These are mostly hydrogen and helium gas. Jupiter is the biggest planet: more than 1,300 Earths would fit inside it. Its Great Red Spot is a storm bigger than Earth. Saturn has the most famous rings, made of chunks of ice and rock." },
          { type: "h", text: "Ice giants: Uranus and Neptune" },
          { type: "p", text: "These are made mostly of icy materials such as water, ammonia and methane. Methane gives them their blue colour. Neptune has the fastest winds in the solar system." },
          { type: "tip", title: "Key idea", text: "All four giant planets have rings and many moons. None of them has a solid surface to stand on." },
        ],
      },
      "giants-sort": {
        kind: "practice",
        intro: "Gas giant or ice giant? Just for practice.",
        questions: [
          {
            id: "sg-p1",
            type: "choice",
            prompt: "Neptune is a...",
            options: [
              { id: "a", text: "Gas giant", why: "Neptune and Uranus are made mostly of icy materials." },
              { id: "b", text: "Ice giant" },
              { id: "c", text: "Rocky planet", why: "Neptune is the furthest planet from the Sun, far from the rocky ones." },
            ],
            correctId: "b",
            hint: "It is one of the two blue planets.",
            walkthrough: "Uranus and Neptune are ice giants. Methane gives them their blue colour.",
            explanation: "Neptune is an ice giant.",
          },
          {
            id: "sg-p2",
            type: "choice",
            prompt: "Which giant planet has a storm bigger than Earth?",
            options: [
              { id: "a", text: "Jupiter" },
              { id: "b", text: "Saturn", why: "Saturn is known for its rings." },
              { id: "c", text: "Uranus", why: "The famous huge storm belongs to Jupiter." },
            ],
            correctId: "a",
            hint: "Look for the Great Red Spot.",
            walkthrough: "Jupiter's Great Red Spot is a storm that has lasted hundreds of years and is wider than Earth.",
            explanation: "Jupiter.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "sg-1",
        type: "lineup",
        prompt: "Could you stand on Jupiter? Pick the correct idea.",
        options: [
          { id: "a", text: "Yes, it has rocky ground like Earth.", why: "Jupiter is a gas giant, mostly hydrogen and helium." },
          { id: "b", text: "Yes, on its frozen ice sheets.", why: "That sounds more like an ice giant, and even they have no solid surface." },
          { id: "c", text: "No, it is a gas giant with no solid surface." },
          { id: "d", text: "No, because it is on fire.", why: "Jupiter is not burning. It is not a star." },
        ],
        correctId: "c",
        hint: "What is a gas giant made of?",
        evidenceId: "giants-intro",
        walkthrough: "Jupiter is mostly gas that gets thicker and hotter deep down. There is no ground to stand on.",
        explanation: "No. Jupiter has no solid surface.",
      },
      {
        id: "sg-2",
        type: "choice",
        prompt: "What gives Uranus and Neptune their blue colour?",
        options: [
          { id: "a", text: "Oceans of water", why: "They do not have oceans on a surface. The colour comes from gas." },
          { id: "b", text: "Methane gas" },
          { id: "c", text: "Reflected light from Earth", why: "They are far too far away for that." },
        ],
        correctId: "b",
        hint: "Check the ice giants section of the reading.",
        evidenceId: "giants-intro",
        walkthrough: "Methane in their atmospheres absorbs red light, so they look blue.",
        explanation: "Methane gas.",
      },
      {
        id: "sg-3",
        type: "choice",
        prompt: "What are Saturn's rings made of?",
        options: [
          { id: "a", text: "Chunks of ice and rock" },
          { id: "b", text: "Solid metal hoops", why: "The rings are billions of separate pieces." },
          { id: "c", text: "Clouds of gas", why: "They are pieces of ice and rock." },
        ],
        correctId: "a",
        hint: "Look at the gas giants section.",
        evidenceId: "giants-intro",
        walkthrough: "Saturn's rings are billions of pieces of ice and rock, from tiny grains to boulders, all orbiting Saturn.",
        explanation: "Chunks of ice and rock.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  small: {
    question: "What is the difference between a moon, an asteroid and a comet?",
    hints: {
      nudge: "Ask two things: what does each one travel around, and what is it made of?",
      evidenceId: "small-intro",
      evidenceNote: "The reading “Smaller objects in space” compares all three.",
      walkthrough: "A moon travels around a planet. Asteroids are rocky and orbit the Sun, mostly between Mars and Jupiter. Comets are icy and grow glowing tails when they come near the Sun.",
    },
    explanation: [
      "Moons orbit planets. Asteroids are lumps of rock and metal orbiting the Sun. Comets are balls of ice and dust that grow tails near the Sun.",
      "What an object travels around, and what it is made of, tells you what it is.",
    ],
    evidence: {
      "small-intro": {
        kind: "reading",
        blocks: [
          { type: "h", text: "Moons" },
          { type: "p", text: "A moon is a natural object that travels around a planet. Earth has one moon. Jupiter and Saturn have dozens each." },
          { type: "h", text: "Asteroids" },
          { type: "p", text: "Asteroids are rocky or metal lumps that orbit the Sun. Most are in the asteroid belt, between Mars and Jupiter. Some are small as a car, some hundreds of kilometres wide." },
          { type: "h", text: "Comets" },
          { type: "p", text: "Comets are dirty snowballs of ice and dust. Far from the Sun they are dark and frozen. Near the Sun the ice turns to gas and they grow a glowing tail that always points away from the Sun." },
          { type: "tip", title: "Key idea", text: "Moons orbit planets. Asteroids and comets orbit the Sun. Asteroids are rocky, comets are icy." },
        ],
      },
      "small-quiz": {
        kind: "practice",
        intro: "Name that space object. Just for practice.",
        questions: [
          {
            id: "sm-p1",
            type: "choice",
            prompt: "An icy object grows a long glowing tail as it gets near the Sun. What is it?",
            options: [
              { id: "a", text: "A comet" },
              { id: "b", text: "An asteroid", why: "Asteroids are rocky and do not grow tails." },
              { id: "c", text: "A moon", why: "Moons travel around planets." },
            ],
            correctId: "a",
            hint: "Which object is made of ice?",
            walkthrough: "Comets are icy. Near the Sun their ice turns to gas and streams out as a tail.",
            explanation: "A comet.",
          },
          {
            id: "sm-p2",
            type: "choice",
            prompt: "Where are most asteroids found?",
            options: [
              { id: "a", text: "Between Mars and Jupiter" },
              { id: "b", text: "Around Earth's Moon", why: "Most asteroids orbit the Sun in one belt." },
              { id: "c", text: "Inside the Sun", why: "Nothing solid survives inside the Sun." },
            ],
            correctId: "a",
            hint: "It is called the asteroid belt.",
            walkthrough: "The asteroid belt lies between the rocky planets and the giants, between Mars and Jupiter.",
            explanation: "In the asteroid belt, between Mars and Jupiter.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "sm-1",
        type: "choice",
        prompt: "What does a moon travel around?",
        options: [
          { id: "a", text: "A planet" },
          { id: "b", text: "The asteroid belt", why: "Asteroids are in the belt. Moons orbit planets." },
          { id: "c", text: "A comet", why: "Comets travel around the Sun." },
        ],
        correctId: "a",
        hint: "Think of our Moon. What does it circle?",
        evidenceId: "small-intro",
        walkthrough: "Our Moon travels around Earth. Every moon orbits a planet (or a dwarf planet).",
        explanation: "A moon orbits a planet.",
      },
      {
        id: "sm-2",
        type: "lineup",
        prompt: "Which idea about comets is correct?",
        options: [
          { id: "a", text: "A comet's tail points the way it is travelling.", why: "The tail always points away from the Sun, whichever way the comet moves." },
          { id: "b", text: "Comets are made of solid metal.", why: "That is closer to some asteroids. Comets are icy." },
          { id: "c", text: "Comets are icy and grow a tail near the Sun." },
          { id: "d", text: "Comets make their own light.", why: "Sunlight lights up the comet and its tail." },
        ],
        correctId: "c",
        hint: "Comets are often called dirty snowballs.",
        evidenceId: "small-intro",
        walkthrough: "Comets are ice and dust. Near the Sun the ice turns to gas and forms a tail that points away from the Sun.",
        explanation: "Comets are icy and grow a tail near the Sun.",
      },
      {
        id: "sm-3",
        type: "choice",
        prompt: "A rocky lump the size of a city orbits the Sun between Mars and Jupiter. What is it?",
        options: [
          { id: "a", text: "A comet", why: "Comets are icy, and they swing far out and back." },
          { id: "b", text: "An asteroid" },
          { id: "c", text: "A moon", why: "It orbits the Sun, not a planet." },
        ],
        correctId: "b",
        hint: "Rocky, orbiting the Sun, in the belt.",
        evidenceId: "small-intro",
        walkthrough: "Rocky, orbiting the Sun, between Mars and Jupiter: that is an asteroid.",
        explanation: "An asteroid.",
      },
    ],
  },
};
