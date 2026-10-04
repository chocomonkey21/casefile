import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  ICSE, Grade 6: two chapters for each subject, one lesson each.
  ASSUMPTION: topics are ones commonly taught in ICSE (CISCE) schools at this level, chosen by the project team.
  They have not been checked against the official CISCE syllabus. Videos are in data/videos-curated.ts.
*/

const LIGHT: ChapterSpec = {
  id: "icse-light-shadows",
  number: "301",
  board: "icse",
  title: "The Case of the Long Shadow",
  topic: "Light and shadows",
  subject: "science",
  grade: 6,
  tagline: "Find out where light comes from, how it travels and why shadows change through the day.",
  hook: "A detective notices that a lamp post’s shadow is short at lunchtime but stretches across the road by evening. The lamp post has not moved. What has?",
  goal: "Explain luminous and non-luminous objects, how light travels in straight lines, and how shadows form.",
  learn: ["Sort objects into luminous and non-luminous", "Explain that light travels in straight lines", "Explain how shadows form and change"],
  lessons: [
    {
      id: "shadows",
      title: "Light and shadows",
      teaser: "Light travels in straight lines, so solid objects block it.",
      question: "Why is a lamp post’s shadow short at midday and long in the evening?",
      goals: ["Name luminous and non-luminous objects", "Explain that light travels in straight lines", "Explain how the size and direction of a shadow depend on the light source"],
      hint: "Where is the Sun at midday, and where is it in the evening?",
      walk: "Light travels in straight lines, so the lamp post blocks the sunlight and leaves a dark area behind it: the shadow. At midday the Sun is high, so the light comes down steeply and the shadow is short. In the evening the Sun is low, so the light comes in at a shallow angle and the shadow is long. The shadow always falls on the side away from the Sun.",
      summary: [
        "Luminous objects give out their own light (the Sun, a candle flame). Non-luminous objects are seen only because they reflect light (the Moon, a book).",
        "Light travels in straight lines. An opaque object blocks it and makes a shadow on the opposite side from the light source.",
      ],
      explain: [
        p("We see things because light enters our eyes. Some objects make their own light; others only reflect light that falls on them."),
        h("Luminous and non-luminous"),
        list("Luminous: the Sun, stars, a candle flame, a lit bulb.", "Non-luminous: the Moon, a mirror, a desk, your face. You see them because light bounces off them."),
        tip("Key idea", "The Moon is not luminous. It shines only because it reflects sunlight."),
        h("Transparent, translucent and opaque"),
        list("Transparent materials let almost all light through, such as clear glass.", "Translucent materials let some light through, but you cannot see clearly, such as frosted glass or tracing paper.", "Opaque materials let no light through, such as wood, metal or your body."),
        h("Shadows"),
        p("Light travels in straight lines. When an opaque object blocks it, a dark area forms behind the object. This is a shadow. A shadow is always on the side opposite the light source. Its length depends on the angle of the light: a high light source gives a short shadow, and a low one gives a long shadow."),
      ],
      tryIt: [
        h("Torch and toy"),
        list("Shine a torch at a toy from straight above: the shadow is small and directly under it.", "Move the torch low to one side: the shadow becomes long and points away from the torch.", "Move the torch closer to the toy: the shadow gets bigger."),
        p("Detective question: why does a sundial work? (The Sun moves across the sky, so the shadow moves round and points to the time.)"),
      ],
      practice: [
        { p: "Which object is luminous?", a: "A candle flame", w: [["The Moon", "The Moon reflects sunlight; it does not make its own light."], ["A mirror", "A mirror reflects light but does not produce it."]], x: "A flame gives out its own light." },
        { p: "Which material is opaque?", a: "Wood", w: [["Clear glass", "Clear glass is transparent."], ["Tracing paper", "Tracing paper is translucent."]], x: "Opaque materials let no light through." },
      ],
      quiz: [
        { p: "Why is a shadow long in the evening?", a: "The Sun is low, so light hits the object at a shallow angle", w: [["The object grows in the evening", "The object stays the same size."], ["Light travels in curves in the evening", "Light always travels in straight lines."]], x: "A low light source makes long shadows." },
        { p: "Three statements about light. Which is true?", a: "Light travels in straight lines.", w: [["Light bends around opaque objects to fill the shadow.", "If it did, there would be no shadow."], ["The Moon makes its own light.", "The Moon reflects sunlight."]], x: "Straight-line travel is why shadows form.", lineup: true },
        { p: "A lamp is on the left of a ball. Where is the ball’s shadow?", a: "On the right of the ball", w: [["On the left of the ball", "The shadow falls on the side away from the light."], ["Underneath the lamp", "The ball blocks the light, so the shadow is behind the ball."]], x: "Shadows form on the opposite side from the light source." },
      ],
      check: [
        { p: "What is a translucent material?", a: "One that lets some light through but you cannot see clearly through it", w: [["One that lets no light through", "That is opaque."], ["One that makes its own light", "That is luminous."]], x: "Frosted glass is translucent." },
        { p: "Why can we see a book in a lit room?", a: "Light reflects off the book into our eyes", w: [["The book gives out its own light", "Books are non-luminous."], ["Our eyes send light to the book", "Light travels from the source, off the book, into our eyes."]], x: "Non-luminous objects are seen by reflected light." },
      ],
    },
  ],
};

const LEAF: ChapterSpec = {
  id: "icse-leaf",
  number: "302",
  board: "icse",
  title: "The Case of the Green Kitchen",
  topic: "The leaf and photosynthesis",
  subject: "science",
  grade: 6,
  tagline: "Explore the parts of a leaf and how it makes food from sunlight, water and air.",
  hook: "A plant in a dark cupboard turns pale and droopy, while the same kind of plant on the windowsill stays green and strong. Both had the same water. What was the cupboard plant missing?",
  goal: "Describe the parts of a leaf and explain what a plant needs for photosynthesis and what it makes.",
  learn: ["Name the parts of a leaf", "State what photosynthesis needs and makes", "Explain why light is essential for green plants"],
  lessons: [
    {
      id: "photosynthesis",
      title: "The leaf and photosynthesis",
      teaser: "Leaves are a plant’s kitchen.",
      question: "Why did the plant in the dark cupboard turn pale and weak?",
      goals: ["Name the lamina, petiole, midrib, veins and stomata", "State the raw materials and products of photosynthesis", "Explain why plants need light"],
      hint: "What does a plant need, apart from water, to make its own food?",
      walk: "Green plants make food by photosynthesis. They need carbon dioxide from the air, water from the soil, and sunlight, which is absorbed by the green pigment chlorophyll. In the dark cupboard there was no light, so the plant could not make food and its leaves lost their green colour.",
      summary: [
        "A leaf has a flat blade (lamina), a stalk (petiole), a midrib and veins, and tiny pores called stomata.",
        "Photosynthesis: carbon dioxide + water, using sunlight and chlorophyll, make glucose (food) and oxygen.",
      ],
      explain: [
        p("Green plants are producers: they make their own food. Most of this happens in the leaves."),
        h("Parts of a leaf"),
        list(
          "Lamina: the flat, broad blade. Its large surface catches sunlight.",
          "Petiole: the stalk that joins the leaf to the stem.",
          "Midrib and veins: carry water to the leaf and food away from it, and support the lamina.",
          "Stomata: tiny pores, mostly on the underside, that let air in and out and let water vapour escape.",
        ),
        h("Photosynthesis"),
        p("Photosynthesis means “making with light”. Inside leaf cells, chlorophyll absorbs sunlight. The plant uses that energy to combine carbon dioxide (taken in through the stomata) with water (taken up by the roots). This makes glucose, a sugar the plant uses for energy and growth, and releases oxygen."),
        tip("Key idea", "Carbon dioxide + water → (sunlight, chlorophyll) → glucose + oxygen."),
        p("Extra glucose is often stored as starch. Almost all the oxygen in the air was put there by photosynthesis."),
      ],
      tryIt: [
        h("Test a leaf for starch (with a teacher)"),
        list("Boil a leaf in water, then warm it in alcohol (in a water bath, away from flames) to remove the green colour.", "Rinse it and add iodine solution.", "A blue-black colour shows starch is present, so the leaf has been making food."),
        p("Detective question: if part of a leaf was covered with black paper for two days, what would the iodine test show there? (No blue-black colour, because no light meant no photosynthesis.)"),
      ],
      practice: [
        { p: "What gas do plants take in for photosynthesis?", a: "Carbon dioxide", w: [["Oxygen", "Oxygen is released by photosynthesis."], ["Nitrogen", "Plants do not use nitrogen gas for photosynthesis."]], x: "Carbon dioxide enters through the stomata." },
        { p: "What are stomata?", a: "Tiny pores on leaves that let gases in and out", w: [["The veins of a leaf", "Veins carry water and food."], ["The stalk of the leaf", "That is the petiole."]], x: "Stomata are mostly on the underside of the leaf." },
      ],
      quiz: [
        { p: "Why did the plant in the cupboard turn pale and weak?", a: "With no light, it could not photosynthesise to make food", w: [["It had too much water", "Both plants had the same water."], ["Plants grow best in the dark", "Green plants need light to make food."]], x: "Light is essential for photosynthesis." },
        { p: "Three statements about photosynthesis. Which is true?", a: "It releases oxygen into the air.", w: [["It takes in oxygen and gives out carbon dioxide.", "That describes respiration."], ["It can happen without chlorophyll in green leaves.", "Chlorophyll absorbs the light energy needed."]], x: "Oxygen is a product of photosynthesis.", lineup: true },
        { p: "What does the green pigment chlorophyll do?", a: "Absorbs sunlight for photosynthesis", w: [["Carries water up the stem", "Water travels through tubes in the stem and veins."], ["Stores starch", "Starch is a store of food, not a pigment."]], x: "Chlorophyll captures light energy." },
      ],
      check: [
        { p: "What is the food made in photosynthesis?", a: "Glucose (a sugar)", w: [["Oxygen", "Oxygen is a product, but it is not food."], ["Carbon dioxide", "Carbon dioxide is a raw material."]], x: "Glucose is used for energy and growth, or stored as starch." },
        { p: "Which chemical shows that starch is present by turning blue-black?", a: "Iodine solution", w: [["Water", "Water does not change colour with starch."], ["Lime water", "Lime water tests for carbon dioxide."]], x: "Iodine turns blue-black with starch." },
      ],
    },
  ],
};

const HCF: ChapterSpec = {
  id: "icse-hcf-lcm",
  number: "303",
  board: "icse",
  title: "The Case of the Matching Packs",
  topic: "HCF and LCM",
  subject: "maths",
  grade: 6,
  tagline: "Use factors and multiples to share things equally and to find when events line up.",
  hook: "Rolls come in packs of 6 and sausages in packs of 8. A cook wants exactly the same number of each with none left over. What is the smallest number of each she can buy?",
  goal: "Find the HCF and LCM of numbers using prime factorisation, and use them to solve problems.",
  learn: ["Write a number as a product of primes", "Find the highest common factor", "Find the lowest common multiple"],
  lessons: [
    {
      id: "hcf-lcm",
      title: "HCF and LCM",
      teaser: "Highest common factor and lowest common multiple.",
      question: "Rolls come in packs of 6 and sausages in packs of 8. What is the smallest equal number of each the cook can buy?",
      goals: ["Write a number as a product of prime factors", "Find the HCF of two numbers", "Find the LCM of two numbers and use it in problems"],
      hint: "You need a number that is in the 6 times table and the 8 times table.",
      walk: "Multiples of 6: 6, 12, 18, 24, 30… Multiples of 8: 8, 16, 24, 32… The first number in both lists is 24, the lowest common multiple. So she buys 24 of each: 4 packs of rolls and 3 packs of sausages.",
      summary: [
        "The HCF (highest common factor) is the biggest number that divides exactly into all the numbers. The LCM (lowest common multiple) is the smallest number that all the numbers divide into.",
        "Using prime factors: the HCF multiplies the primes they share; the LCM multiplies the highest power of every prime that appears.",
      ],
      explain: [
        p("Factors are numbers that divide exactly into a number. Multiples are what you get when you multiply it by 1, 2, 3 and so on."),
        h("Prime factorisation"),
        p("Every whole number greater than 1 can be written as a product of primes. 12 = 2 × 2 × 3 and 18 = 2 × 3 × 3. A factor tree helps: split the number into two factors, and keep splitting until every branch ends in a prime."),
        h("HCF"),
        p("The highest common factor is the largest number that divides into all of them. For 12 and 18, the shared primes are one 2 and one 3, so HCF = 2 × 3 = 6."),
        h("LCM"),
        p("The lowest common multiple is the smallest number they all divide into. For 12 and 18, take every prime the most times it appears in either: 2 × 2 × 3 × 3 = 36."),
        tip("Key idea", "HCF problems are about sharing or cutting into the largest equal groups. LCM problems are about when things line up again."),
        p("Useful check: for two numbers, HCF × LCM = the product of the numbers. 6 × 36 = 216 = 12 × 18."),
      ],
      tryIt: [
        h("Which one do you need?"),
        list("Cutting ribbons of 24 cm and 36 cm into equal pieces as long as possible: HCF = 12 cm.", "Two bells ring every 4 and 6 minutes. When do they next ring together? LCM = 12 minutes.", "Sharing 18 pencils and 27 erasers into identical kits: HCF = 9 kits."),
        p("Check your answers: for 12 and 18, HCF × LCM = 6 × 36 = 216, which is the same as 12 × 18."),
      ],
      practice: [
        { p: "Write 20 as a product of primes.", a: "2 × 2 × 5", w: [["4 × 5", "4 is not prime; split it into 2 × 2."], ["2 × 10", "10 is not prime; split it into 2 × 5."]], x: "20 = 2 × 2 × 5." },
        { p: "What is the HCF of 8 and 12?", a: "4", w: [["2", "2 divides both, but 4 is bigger and also divides both."], ["24", "24 is the LCM."]], x: "4 is the largest number that divides both." },
      ],
      quiz: [
        { p: "Rolls come in 6s and sausages in 8s. What is the smallest equal number of each?", a: "24", w: [["48", "48 works, but 24 is smaller."], ["14", "14 is 6 + 8; it is not a multiple of either."]], x: "The LCM of 6 and 8 is 24." },
        { p: "Three statements about HCF and LCM. Which is true?", a: "The LCM of two numbers is never smaller than the larger number.", w: [["The HCF is always bigger than both numbers.", "The HCF divides into both, so it cannot be bigger than either."], ["The HCF and LCM are always equal.", "They are equal only if the numbers are the same."]], x: "A common multiple must be at least as big as each number.", lineup: true },
        { p: "Two lights flash every 10 and 15 seconds. They flash together now. When will they next flash together?", a: "After 30 seconds", w: [["After 5 seconds", "5 is the HCF; they line up at the LCM."], ["After 25 seconds", "25 is not a multiple of 10."]], x: "LCM of 10 and 15 is 30." },
      ],
      check: [
        { p: "What is the LCM of 4 and 6?", a: "12", w: [["24", "24 is a common multiple, but not the lowest."], ["2", "2 is the HCF."]], x: "12 is the smallest number in both times tables." },
        { p: "Ribbons of 24 cm and 36 cm are cut into equal pieces, as long as possible. How long is each piece?", a: "12 cm", w: [["6 cm", "6 cm works, but 12 cm is longer."], ["72 cm", "That is the LCM, longer than the ribbons."]], x: "The HCF of 24 and 36 is 12." },
      ],
    },
  ],
};

const SETS: ChapterSpec = {
  id: "icse-sets",
  number: "304",
  board: "icse",
  title: "The Case of the Sorted Suspects",
  topic: "Sets",
  subject: "maths",
  grade: 6,
  tagline: "Group things into sets, write them in roster and set-builder form, and spot what belongs.",
  hook: "A detective lists every suspect who wore a red hat. Another list shows everyone who was in the library. To find who did both, she needs to think in sets.",
  goal: "Describe sets, write them in roster and set-builder form, and use the symbols for belonging, empty sets and subsets.",
  learn: ["Recognise a well-defined collection", "Write sets in roster and set-builder form", "Use ∈, ∉, the empty set and subsets"],
  lessons: [
    {
      id: "sets-intro",
      title: "Sets",
      teaser: "A well-defined collection of objects.",
      question: "Is “the tall students in your class” a set? Is “the students in your class shorter than 150 cm”?",
      goals: ["Explain what makes a collection well-defined", "Write sets in roster form and set-builder form", "Use the symbols ∈ and ∉, and recognise empty sets and subsets"],
      hint: "A set must be well-defined: anyone must be able to say for certain whether something belongs.",
      walk: "“Tall” means different things to different people, so “tall students” is not well-defined and is not a set. “Shorter than 150 cm” can be checked exactly by measuring, so it is a set.",
      summary: [
        "A set is a well-defined collection of distinct objects, called elements. Write sets with curly brackets: A = {2, 4, 6}.",
        "Roster form lists the elements; set-builder form describes them: {x : x is an even number less than 7}. ∈ means “is an element of”, ∉ means “is not”.",
      ],
      explain: [
        p("In maths, a set is a collection of distinct objects that is well-defined: it is always possible to decide whether something belongs to it. The objects in a set are its elements."),
        h("Writing sets"),
        list(
          "Roster (listing) form: V = {a, e, i, o, u}. Each element is written once; order does not matter.",
          "Set-builder form: V = {x : x is a vowel in the English alphabet}. Read “the set of all x such that x is a vowel”.",
        ),
        h("Symbols"),
        list("3 ∈ {1, 2, 3}: 3 is an element of the set.", "5 ∉ {1, 2, 3}: 5 is not an element.", "The empty set, written { } or ∅, has no elements, such as the set of months with 32 days.", "n(A) is the number of elements in A. If A = {a, e, i, o, u}, n(A) = 5."),
        h("Subsets"),
        p("If every element of B is also in A, then B is a subset of A, written B ⊆ A. {2, 4} ⊆ {1, 2, 3, 4}. The empty set is a subset of every set."),
        tip("Key idea", "A set must be well-defined. “Good books” is not a set; “books written before 1900” is."),
      ],
      tryIt: [
        h("Write each set two ways"),
        list("Even numbers between 1 and 9: {2, 4, 6, 8}, or {x : x is an even number, 1 < x < 9}.", "Days of the week starting with T: {Tuesday, Thursday}.", "Prime numbers less than 10: {2, 3, 5, 7}."),
        p("Detective question: the suspects with red hats are {Ali, Bea, Cy} and the people in the library are {Bea, Cy, Dev}. Who is in both? (Bea and Cy.)"),
      ],
      practice: [
        { p: "Which is a well-defined set?", a: "The months with 31 days", w: [["The best footballers", "“Best” is an opinion, so it is not well-defined."], ["Large numbers", "“Large” is not exact."]], x: "Everyone agrees which months have 31 days." },
        { p: "If A = {2, 3, 5, 7}, what is n(A)?", a: "4", w: [["7", "7 is the largest element, not the count."], ["17", "17 is the sum of the elements."]], x: "A has four elements." },
      ],
      quiz: [
        { p: "Is “the students in your class shorter than 150 cm” a set?", a: "Yes, because membership can be checked exactly", w: [["No, because heights change", "At any moment we can measure and decide, so it is well-defined."], ["No, because it uses numbers", "Sets can be described using numbers."]], x: "Well-defined means you can always decide." },
        { p: "Three statements about sets. Which is true?", a: "The empty set is a subset of every set.", w: [["{1, 2} and {2, 1} are different sets.", "Order does not matter; they are equal."], ["An element can be listed twice to make a set bigger.", "Each element is counted once."]], x: "∅ has no elements, so all of them (none) belong to any set.", lineup: true },
        { p: "Which is {x : x is an odd number less than 8} in roster form?", a: "{1, 3, 5, 7}", w: [["{1, 3, 5, 7, 9}", "9 is not less than 8."], ["{2, 4, 6}", "Those are even numbers."]], x: "Odd numbers less than 8: 1, 3, 5, 7." },
      ],
      check: [
        { p: "What does 6 ∉ {1, 2, 3} mean?", a: "6 is not an element of the set", w: [["6 is an element of the set", "That would be 6 ∈ {1, 2, 3}."], ["The set has 6 elements", "∉ is about membership, not size."]], x: "∉ means “is not an element of”." },
        { p: "Which of these is an empty set?", a: "The set of whole numbers between 3 and 4", w: [["The set of even primes", "2 is an even prime, so it has one element."], ["The set of days in a week", "It has seven elements."]], x: "There is no whole number between 3 and 4." },
      ],
    },
  ],
};

const VEDIC: ChapterSpec = {
  id: "icse-vedic",
  number: "305",
  board: "icse",
  title: "The Case of the Spoken Hymns",
  topic: "The Vedic period",
  subject: "history",
  grade: 6,
  tagline: "Learn how historians study a period whose main sources were memorised and sung for centuries.",
  hook: "For hundreds of years, a collection of hymns was passed on only by memory, word for word, before anyone wrote it down. How can hymns tell historians about ordinary life?",
  goal: "Describe life in the Vedic period and explain how the Vedas are used as historical sources.",
  learn: ["Explain what the Vedas are", "Describe society and economy in the Vedic period", "Compare the early and later Vedic periods"],
  lessons: [
    {
      id: "vedic-age",
      title: "The Vedic period",
      teaser: "Hymns, herds, villages and the varna system.",
      question: "How can hymns written for worship tell historians about everyday life?",
      goals: ["Explain what the Vedas are and why they are important sources", "Describe the economy, society and government of the Vedic period", "Describe changes from the early to the later Vedic period"],
      hint: "Hymns mention things people cared about. What might people pray for?",
      walk: "The Rig Veda’s hymns ask the gods for cattle, rain, good harvests, sons and victory in battle. This tells historians that cattle were wealth, farming mattered and tribes fought each other. Mentions of rivers show where people lived. So even religious texts reveal everyday concerns.",
      summary: [
        "The Vedic period (roughly 1500 to 600 BCE) is named after the Vedas, sacred texts in Sanskrit. The Rig Veda is the oldest.",
        "Early Vedic people were mostly cattle herders in tribes in the north-west; in the later Vedic period farming spread east, kingdoms grew and society became more divided into varnas.",
      ],
      explain: [
        p("The Vedic period is named after the Vedas, a group of sacred texts composed in Sanskrit. They were passed on orally for centuries before being written down. There are four Vedas: the Rig, Sama, Yajur and Atharva Vedas."),
        h("Early Vedic period (about 1500 to 1000 BCE)"),
        list(
          "People lived in the region of the Indus and its tributaries (the Sapta Sindhu, or land of seven rivers).",
          "Cattle were the main form of wealth. People also grew barley.",
          "Tribes were led by a chief called the rajan, advised by assemblies called the sabha and samiti.",
          "Gods of nature, such as Indra and Agni, were worshipped through hymns and sacrifices.",
        ),
        h("Later Vedic period (about 1000 to 600 BCE)"),
        list(
          "People moved east into the Ganga valley. Iron tools helped clear forests for farming.",
          "Kingdoms (janapadas) became larger and kings more powerful.",
          "Society became more firmly divided into four varnas: Brahmins, Kshatriyas, Vaishyas and Shudras.",
        ),
        tip("Key idea", "Historians use the Vedas as evidence, but they read them carefully: hymns show what their composers valued, not a full picture of everyone’s life."),
      ],
      tryIt: [
        h("What does it tell us?"),
        list("A hymn asking for “many cows”: cattle were valued as wealth.", "A hymn praising the River Saraswati: rivers were important and sacred.", "Later texts mentioning iron ploughs: farming was changing."),
        p("Detective question: why might the Vedas tell us more about priests and chiefs than about ordinary farmers? (They were composed and kept by priests, mainly for rituals.)"),
      ],
      practice: [
        { p: "What are the Vedas?", a: "Sacred texts composed in Sanskrit", w: [["Stone inscriptions by Ashoka", "Ashoka’s edicts came much later."], ["Coins from the Vedic period", "The Vedas are texts."]], x: "The Vedas are the main source for the period." },
        { p: "What was the main form of wealth in the early Vedic period?", a: "Cattle", w: [["Gold coins", "Coins were not in use then."], ["Factories", "There were no factories."]], x: "Hymns often ask for cattle." },
      ],
      quiz: [
        { p: "How can religious hymns tell historians about daily life?", a: "They mention what people valued and hoped for, such as cattle, rain and harvests", w: [["They list every person’s name and job", "They do not record everyone."], ["They cannot tell us anything about daily life", "They give many clues, read carefully."]], x: "Requests in prayers reveal everyday concerns." },
        { p: "Three statements about the later Vedic period. Which is true?", a: "Iron tools helped people farm in the Ganga valley.", w: [["People moved west, away from the Ganga.", "They moved east into the Ganga valley."], ["The varnas disappeared completely.", "The varna system became more fixed."]], x: "Iron helped clear forests for farming.", lineup: true },
        { p: "Which is the oldest of the Vedas?", a: "The Rig Veda", w: [["The Atharva Veda", "The Rig Veda is older."], ["The Sama Veda", "The Rig Veda is the oldest."]], x: "The Rig Veda is the earliest collection of hymns." },
      ],
      check: [
        { p: "What were the sabha and samiti?", a: "Assemblies that advised the tribal chief", w: [["Types of crops", "They were assemblies."], ["Vedic gods", "Indra and Agni were gods; the sabha and samiti were assemblies."]], x: "They took part in decisions with the rajan." },
        { p: "Why were the Vedas passed on carefully by memory?", a: "They were sacred and had to be recited exactly", w: [["Writing was banned by law", "They were memorised because exact recitation mattered."], ["Nobody could speak Sanskrit", "Priests spoke and chanted in Sanskrit."]], x: "Exact oral recitation preserved them for centuries." },
      ],
    },
  ],
};

const JAIN_BUDDHA: ChapterSpec = {
  id: "icse-jainism-buddhism",
  number: "306",
  board: "icse",
  title: "The Case of the Two Princes",
  topic: "Jainism and Buddhism",
  subject: "history",
  grade: 6,
  tagline: "Meet two princes who gave up palaces to search for an answer to suffering.",
  hook: "Around 2,500 years ago, two princes in north India each left a life of comfort. Their teachings spread across Asia. Why did people listen to them?",
  goal: "Describe the lives and teachings of Mahavira and Gautama Buddha and explain why their ideas spread.",
  learn: ["Describe the lives of Mahavira and the Buddha", "Explain the main teachings of Jainism and Buddhism", "Explain why the new ideas appealed to people"],
  lessons: [
    {
      id: "mahavira-buddha",
      title: "Jainism and Buddhism",
      teaser: "Non-violence, the Middle Path and the search for freedom from suffering.",
      question: "Why did the teachings of Mahavira and the Buddha attract so many followers?",
      goals: ["Describe the lives of Mahavira and Gautama Buddha", "Explain key teachings such as ahimsa, the Four Noble Truths and the Eightfold Path", "Explain why these teachings appealed to many people"],
      hint: "Think about how complicated and expensive rituals had become, and how the new teachers spoke to people.",
      walk: "In the 6th century BCE, rituals led by priests had become costly and complex, and the varna system was rigid. Mahavira and the Buddha taught that anyone could seek freedom from suffering through right conduct, not expensive sacrifices. They taught in the everyday languages people spoke, such as Prakrit and Pali, and welcomed people of all varnas. Rulers and traders supported them.",
      summary: [
        "Mahavira (the 24th tirthankara of Jainism) taught ahimsa (non-violence) and strict self-discipline. Gautama Buddha taught the Four Noble Truths and the Eightfold Path, a Middle Path between luxury and harsh self-denial.",
        "Their ideas spread because they were simple, open to all, taught in everyday languages, and supported by traders and kings.",
      ],
      explain: [
        p("In the 6th century BCE, many thinkers in north India questioned costly rituals and the power of priests. Two teachers had lasting influence."),
        h("Mahavira and Jainism"),
        p("Vardhamana Mahavira was a prince who left home at about 30 and lived as an ascetic. Jains believe he was the 24th tirthankara, or teacher. Jainism stresses ahimsa, non-violence towards every living being, and the Three Jewels: right faith, right knowledge and right conduct."),
        h("Gautama Buddha and Buddhism"),
        p("Siddhartha Gautama was a prince of the Shakya clan. Moved by the sight of old age, sickness and death, he left his palace to search for the cause of suffering. After years of searching he gained enlightenment at Bodh Gaya and became the Buddha, the “enlightened one”. He gave his first sermon at Sarnath."),
        list(
          "The Four Noble Truths: life involves suffering; suffering is caused by desire; suffering can end; the way to end it is the Eightfold Path.",
          "The Eightfold Path includes right speech, right action and right effort.",
          "The Middle Path: avoid both luxury and extreme self-punishment.",
        ),
        tip("Key idea", "Both teachers spoke in the languages of ordinary people and welcomed followers from every varna."),
      ],
      tryIt: [
        h("Compare the teachings"),
        list("Both rejected costly animal sacrifices.", "Both taught non-violence; Jainism took it especially far, for example in avoiding harm to insects.", "Buddhism taught a Middle Path, while Jain monks practised very strict self-denial."),
        p("Detective question: why did merchants often support these religions? (Their emphasis on peace and honest conduct suited trade, and they did not depend on expensive rituals.)"),
      ],
      practice: [
        { p: "What does ahimsa mean?", a: "Non-violence towards all living beings", w: [["Prayer to Indra", "Ahimsa is about not harming living things."], ["A royal title", "It is a teaching, not a title."]], x: "Ahimsa is central to Jainism and important in Buddhism." },
        { p: "Where did the Buddha gain enlightenment?", a: "Bodh Gaya", w: [["Sarnath", "Sarnath is where he gave his first sermon."], ["Pataliputra", "Pataliputra was a capital city, not the place of enlightenment."]], x: "He was enlightened under a tree at Bodh Gaya." },
      ],
      quiz: [
        { p: "Why did Jainism and Buddhism attract many followers?", a: "Their teachings were simple, open to all varnas and given in everyday languages", w: [["They required very expensive sacrifices", "They rejected costly sacrifices."], ["Only kings were allowed to join", "Anyone could follow them."]], x: "Simplicity and openness made them popular." },
        { p: "Three statements about the Buddha’s teachings. Which is true?", a: "He taught a Middle Path between luxury and harsh self-denial.", w: [["He taught that suffering has no cause.", "The Second Noble Truth says desire causes suffering."], ["He taught only in Sanskrit for priests.", "He taught in Pali, an everyday language."]], x: "The Middle Path is a key idea in Buddhism.", lineup: true },
        { p: "Which are the Three Jewels of Jainism?", a: "Right faith, right knowledge and right conduct", w: [["The Four Noble Truths", "Those belong to Buddhism."], ["The four Vedas", "The Vedas are Vedic texts, not Jain teachings."]], x: "The Three Jewels guide a Jain life." },
      ],
      check: [
        { p: "Which number tirthankara was Mahavira, according to Jain belief?", a: "The 24th", w: [["The 1st", "Jains believe there were 23 before him."], ["The 4th", "He was the last, the 24th."]], x: "Mahavira is the 24th tirthankara." },
        { p: "What is the first of the Four Noble Truths?", a: "Life involves suffering", w: [["Desire leads to happiness", "The Second Truth says desire causes suffering."], ["Sacrifices end suffering", "The Buddha rejected sacrifices as the answer."]], x: "The Truths begin by recognising suffering." },
      ],
    },
  ],
};

const LANDFORMS: ChapterSpec = {
  id: "icse-landforms",
  number: "307",
  board: "icse",
  title: "The Case of the Flat-Topped Hill",
  topic: "Major landforms",
  subject: "geography",
  grade: 6,
  tagline: "Tell mountains, plateaus and plains apart, and see why people live where they do.",
  hook: "From a train window, the land rises into a high, wide, flat-topped area. It is high like a mountain but flat like a field. What is it?",
  goal: "Describe mountains, plateaus and plains, how they form, and how people use them.",
  learn: ["Describe the features of mountains, plateaus and plains", "Give examples from India and the world", "Explain how landforms affect where people live"],
  lessons: [
    {
      id: "mountains-plateaus-plains",
      title: "Mountains, plateaus and plains",
      teaser: "High and steep, high and flat, low and flat.",
      question: "Why do far more people live on plains than on mountains?",
      goals: ["Describe the features of mountains, plateaus and plains", "Name examples, including the Himalayas, the Deccan Plateau and the Indo-Gangetic Plain", "Explain how each landform is useful to people"],
      hint: "Think about farming, building roads and finding water.",
      walk: "Plains are low and flat, often with deep, fertile soil left by rivers, and plenty of water. That makes farming, building towns and roads easy, so many people live there. Mountains are steep and cold with thin soil, which makes farming and travel hard, so fewer people live there.",
      summary: [
        "Mountains are high, with steep slopes and peaks. Plateaus are high, raised areas with a fairly flat top. Plains are low, flat areas, often formed by rivers.",
        "Plains are usually the most densely populated because they are easy to farm and build on. Plateaus are often rich in minerals, and mountains give water, forests and tourism.",
      ],
      explain: [
        p("The Earth’s surface has three main kinds of landform: mountains, plateaus and plains."),
        h("Mountains"),
        p("Mountains rise steeply high above the surrounding land, with peaks and steep slopes. Fold mountains, such as the Himalayas, form when tectonic plates push together. Mountains are cold, with thin soil. They are sources of rivers, forests and tourism."),
        h("Plateaus"),
        p("A plateau is a raised area of land with a fairly flat top and steep sides, like a table. The Deccan Plateau in India is very old and rich in minerals, and has black soil good for growing cotton. The Tibetan Plateau is the highest in the world."),
        h("Plains"),
        p("Plains are large, low, flat areas. Many are formed by rivers depositing fertile alluvial soil. The Indo-Gangetic Plain is one of the most fertile and crowded regions in the world."),
        tip("Key idea", "Landforms shape human life: plains support farming and large cities, plateaus provide minerals, mountains provide water and forests."),
      ],
      tryIt: [
        h("Name the landform"),
        list("High, steep, snowy peaks: mountains (the Himalayas).", "High land with a flat top and steep edges: a plateau (the Deccan).", "Low, flat land with fertile soil by a big river: a plain (the Indo-Gangetic Plain)."),
        p("Back to the case: high and flat-topped is a plateau."),
      ],
      practice: [
        { p: "What is a plateau?", a: "A raised area of land with a fairly flat top", w: [["A low, flat area beside a river", "That is a plain."], ["A steep, pointed peak", "That describes a mountain."]], x: "A plateau is like a table land." },
        { p: "Which is a plain in India?", a: "The Indo-Gangetic Plain", w: [["The Himalayas", "The Himalayas are mountains."], ["The Deccan", "The Deccan is a plateau."]], x: "It is formed by the Indus, Ganga and their tributaries." },
      ],
      quiz: [
        { p: "Why do more people live on plains than on mountains?", a: "Plains are flat and fertile, so farming and building are easier", w: [["Mountains have no water", "Many rivers start in mountains."], ["Plains are always colder", "Mountains are usually colder."]], x: "Flat, fertile land supports farming and towns." },
        { p: "Three statements about landforms. Which is true?", a: "Plateaus are often rich in minerals.", w: [["Plains are always high above sea level.", "Plains are usually low."], ["Mountains have deep, fertile soil everywhere.", "Mountain soils are usually thin."]], x: "The Deccan Plateau is rich in minerals.", lineup: true },
        { p: "How did the Himalayas form?", a: "Tectonic plates pushed together and folded the rock upwards", w: [["Rivers deposited soil", "That forms plains."], ["Wind blew sand into piles", "That can form dunes, not great mountain ranges."]], x: "The Himalayas are fold mountains." },
      ],
      check: [
        { p: "Which landform is like a table, high with a flat top?", a: "A plateau", w: [["A plain", "A plain is low and flat."], ["A valley", "A valley is low land between hills."]], x: "Plateaus are often called table lands." },
        { p: "What makes many river plains fertile?", a: "Rivers deposit rich alluvial soil", w: [["They are covered in snow", "Snow is typical of high mountains."], ["They have no water", "Plains usually have plenty of water."]], x: "Alluvial soil is good for crops." },
      ],
    },
  ],
};

const DOMAINS: ChapterSpec = {
  id: "icse-earth-domains",
  number: "308",
  board: "icse",
  title: "The Case of the Four Spheres",
  topic: "The domains of the Earth",
  subject: "geography",
  grade: 6,
  tagline: "Meet the land, water, air and life that together make Earth unique.",
  hook: "A raindrop falls on a mountain, soaks into the soil, is drunk by a tree, and escapes into the air from a leaf. In one short journey it passes through all four of Earth’s domains. What are they?",
  goal: "Describe the lithosphere, hydrosphere, atmosphere and biosphere and explain how they interact.",
  learn: ["Name the four domains of the Earth", "Describe what each contains", "Explain how they interact"],
  lessons: [
    {
      id: "four-domains",
      title: "The domains of the Earth",
      teaser: "Lithosphere, hydrosphere, atmosphere and biosphere.",
      question: "How does one raindrop pass through all four domains of the Earth?",
      goals: ["Name and describe the lithosphere, hydrosphere, atmosphere and biosphere", "Give facts about each, such as how much of the surface is water", "Explain how the domains interact"],
      hint: "Rain falls from the air, onto land, is taken up by living things and goes back to the air.",
      walk: "The raindrop falls from the atmosphere (air) onto the lithosphere (rock and soil), becomes part of the hydrosphere as soil water, is taken up by a tree in the biosphere (living things), and returns to the atmosphere as water vapour through the leaf. The domains are linked.",
      summary: [
        "Lithosphere: the solid crust and rocks. Hydrosphere: all the water. Atmosphere: the layer of air. Biosphere: the narrow zone where land, water and air meet and life exists.",
        "About 71% of Earth’s surface is covered by water. The domains constantly interact, for example in the water cycle.",
      ],
      explain: [
        p("Earth is the only planet known to support life. This is possible because of four connected domains."),
        h("Lithosphere"),
        p("The lithosphere is the solid outer layer of the Earth: the crust and the uppermost mantle. It includes continents, mountains and the ocean floor. It gives us soil, minerals and land to live on."),
        h("Hydrosphere"),
        p("The hydrosphere is all the water on Earth: oceans, seas, rivers, lakes, glaciers and groundwater. About 71% of the surface is covered by water, but about 97% of that water is salty sea water."),
        h("Atmosphere"),
        p("The atmosphere is the blanket of air around the Earth, held by gravity. It is mostly nitrogen (about 78%) and oxygen (about 21%). It gives us air to breathe, protects us from harmful ultraviolet rays and keeps the planet warm."),
        h("Biosphere"),
        p("The biosphere is the narrow zone where land, water and air meet and living things exist: plants, animals and humans."),
        tip("Key idea", "The domains depend on each other. Pollution of one, such as the air, affects the others."),
      ],
      tryIt: [
        h("Which domain?"),
        list("A coral reef: hydrosphere and biosphere.", "The Himalayas: lithosphere.", "Clouds: atmosphere.", "A forest: biosphere, rooted in the lithosphere."),
        p("Your turn: trace the journey of a piece of plastic from a beach into the sea and into a fish. Which domains does it pass through?"),
      ],
      practice: [
        { p: "Which domain contains all the Earth’s water?", a: "The hydrosphere", w: [["The lithosphere", "That is the solid rock and soil."], ["The atmosphere", "That is the layer of air."]], x: "Hydro means water." },
        { p: "Which gas makes up most of the atmosphere?", a: "Nitrogen", w: [["Oxygen", "Oxygen is about 21%."], ["Carbon dioxide", "Carbon dioxide is a tiny fraction."]], x: "Nitrogen is about 78% of the air." },
      ],
      quiz: [
        { p: "What is the biosphere?", a: "The zone where land, water and air meet and life exists", w: [["The solid outer layer of the Earth", "That is the lithosphere."], ["The layer of gases around the Earth", "That is the atmosphere."]], x: "Bio means life." },
        { p: "Three statements about Earth’s domains. Which is true?", a: "About 71% of Earth’s surface is covered by water.", w: [["Most of Earth’s water is fresh water.", "About 97% is salty sea water."], ["The domains never affect each other.", "They constantly interact."]], x: "Oceans cover most of the surface.", lineup: true },
        { p: "How does the atmosphere protect life?", a: "It blocks much harmful ultraviolet radiation and keeps the planet warm", w: [["It makes the oceans salty", "Salt comes from rocks, carried by rivers."], ["It makes the land solid", "That is the lithosphere."]], x: "The ozone layer and greenhouse gases are part of this protection." },
      ],
      check: [
        { p: "Which domain gives us soil and minerals?", a: "The lithosphere", w: [["The hydrosphere", "The hydrosphere is water."], ["The biosphere", "The biosphere is the zone of living things."]], x: "Litho means stone." },
        { p: "A tree releases water vapour from its leaves. Which two domains are linked here?", a: "The biosphere and the atmosphere", w: [["The lithosphere and the hydrosphere only", "The tree is living, and the vapour goes into the air."], ["None, because trees are not part of any domain", "Trees belong to the biosphere."]], x: "Living things exchange gases and water with the air." },
      ],
    },
  ],
};

export const ICSE_G6: ChapterSpec[] = [LIGHT, LEAF, HCF, SETS, VEDIC, JAIN_BUDDHA, LANDFORMS, DOMAINS];
