import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  ICSE, Grade 9: two chapters for each subject, one lesson each.
  ASSUMPTION: topics are ones commonly taught in ICSE (CISCE) schools at this level, chosen by the project team.
  They have not been checked against the official CISCE syllabus. Videos are in data/videos-curated.ts.
*/

const UPTHRUST: ChapterSpec = {
  id: "icse-upthrust",
  number: "331",
  board: "icse",
  title: "The Case of the Floating Ship",
  topic: "Upthrust and Archimedes’ principle",
  subject: "science",
  grade: 9,
  tagline: "Explain why a steel ship floats while a steel nail sinks.",
  hook: "A tiny steel nail sinks straight to the bottom of a bucket, yet a steel ship weighing thousands of tonnes floats. Both are made of steel. What makes the difference?",
  goal: "Explain upthrust, state Archimedes’ principle, and use it to explain floating and sinking.",
  learn: ["Explain upthrust (buoyant force)", "State Archimedes’ principle", "Explain floating and sinking using density and the principle of floatation"],
  lessons: [
    {
      id: "archimedes",
      title: "Upthrust and Archimedes’ principle",
      teaser: "The upthrust equals the weight of fluid displaced.",
      question: "Why does a steel ship float when a steel nail sinks?",
      goals: ["Explain upthrust and what it depends on", "State Archimedes’ principle and use it to calculate upthrust", "Explain floating using density and the principle of floatation"],
      hint: "A ship’s shape pushes aside a huge amount of water. What does Archimedes’ principle say about that?",
      walk: "Upthrust equals the weight of water displaced. A solid nail displaces only a tiny amount of water, so the upthrust is less than its weight and it sinks. A ship is hollow and shaped to push aside a very large volume of water. That water weighs as much as the whole ship, so the upthrust balances the ship’s weight and it floats. Overall, the ship (steel plus the air inside) is less dense than water.",
      summary: [
        "Archimedes’ principle: when a body is wholly or partly immersed in a fluid, it experiences an upthrust equal to the weight of the fluid it displaces.",
        "A body floats when the upthrust equals its weight (principle of floatation). An object sinks if its average density is greater than the fluid’s density.",
      ],
      explain: [
        p("When you push a ball under water, you feel it pushing back up. This upward force from a fluid is called upthrust, or buoyant force."),
        h("Archimedes’ principle"),
        p("When a body is fully or partly immersed in a fluid, it experiences an upthrust equal to the weight of the fluid displaced. A stone that pushes aside 2 N of water feels an upthrust of 2 N, so it seems lighter in water."),
        h("What upthrust depends on"),
        list("The volume of the body under the fluid: more volume displaced, more upthrust.", "The density of the fluid: denser fluids, such as salt water, give more upthrust."),
        h("Floating and sinking"),
        list(
          "If the weight is greater than the maximum upthrust, the object sinks.",
          "If the weight equals the upthrust, the object floats. This is the principle of floatation: a floating body displaces its own weight of fluid.",
          "In terms of density: an object floats if its average density is less than the fluid’s, and sinks if it is greater.",
        ),
        tip("Key idea", "Shape matters for floating because it changes how much fluid is displaced and the object’s average density."),
        p("Real-life examples: ships float higher in sea water than in river water, a hydrometer measures liquid density, and submarines dive by taking in water to increase their weight."),
      ],
      tryIt: [
        h("Calculate the upthrust"),
        list("A stone weighs 5 N in air and 3 N in water. Upthrust = 5 − 3 = 2 N.", "So the weight of water displaced is 2 N.", "Why does the same ship float a little higher in the sea than in a river? Sea water is denser, so less needs to be displaced to balance the ship’s weight."),
        p("Back to the case: the nail displaces only a little water, but the ship’s hollow shape displaces enough water to balance its whole weight."),
      ],
      practice: [
        { p: "What is upthrust?", a: "The upward force a fluid exerts on an object in it", w: [["The weight of an object in air", "Weight acts downwards."], ["The friction of water on a moving boat", "That is drag, not upthrust."]], x: "Upthrust is also called buoyant force." },
        { p: "A body weighs 8 N in air and 5 N in water. What is the upthrust?", a: "3 N", w: [["13 N", "Subtract the weights, do not add them."], ["5 N", "That is the apparent weight in water."]], x: "8 − 5 = 3 N." },
      ],
      quiz: [
        { p: "Why does a steel ship float while a steel nail sinks?", a: "The ship’s shape displaces a weight of water equal to its own weight", w: [["Ships are made of a lighter kind of steel", "Both are steel; shape makes the difference."], ["Water pushes harder on big objects for no reason", "Upthrust depends on the water displaced."]], x: "A hollow shape displaces much more water." },
        { p: "Three statements about floating. Which is true?", a: "A floating body displaces its own weight of fluid.", w: [["Objects denser than water always float.", "They sink."], ["Upthrust does not depend on the fluid.", "Denser fluids give more upthrust."]], x: "This is the principle of floatation.", lineup: true },
        { p: "Why does a ship float higher in sea water than in fresh water?", a: "Sea water is denser, so less volume needs to be displaced", w: [["Sea water has fewer waves", "Waves do not decide how high it floats."], ["The ship gets lighter at sea", "Its weight is the same."]], x: "Denser fluid gives more upthrust per volume." },
      ],
      check: [
        { p: "State Archimedes’ principle.", a: "A body in a fluid feels an upthrust equal to the weight of the fluid it displaces", w: [["A body in a fluid gets heavier", "It seems lighter because of upthrust."], ["Pressure is the same at every depth", "Pressure increases with depth."]], x: "Upthrust = weight of fluid displaced." },
        { p: "How does a submarine dive?", a: "It takes water into its tanks to increase its weight", w: [["It removes all the air from the sea", "It changes its own weight."], ["It becomes less dense than water", "To dive it must become denser."]], x: "Letting in water makes it heavier than the upthrust." },
      ],
    },
  ],
};

const GAS_LAWS: ChapterSpec = {
  id: "icse-gas-laws",
  number: "332",
  board: "icse",
  title: "The Case of the Bursting Balloon",
  topic: "Boyle’s law and Charles’s law",
  subject: "science",
  grade: 9,
  tagline: "Predict how a gas changes when you squeeze it or heat it.",
  hook: "A balloon left in a hot car bursts. A sealed packet of crisps puffs up on a mountain road. What do these two mysteries have in common?",
  goal: "Use Boyle’s law and Charles’s law to explain and calculate changes in the volume of a gas.",
  learn: ["Explain gas pressure using particles", "Use Boyle’s law (constant temperature)", "Use Charles’s law with the kelvin scale"],
  lessons: [
    {
      id: "boyle-charles",
      title: "Boyle’s law and Charles’s law",
      teaser: "Squeeze it and the pressure rises; heat it and it expands.",
      question: "Why does a balloon burst in a hot car, and why does a crisp packet puff up on a mountain?",
      goals: ["Explain gas pressure in terms of moving particles", "Use Boyle’s law, P₁V₁ = P₂V₂, at constant temperature", "Use Charles’s law, V₁/T₁ = V₂/T₂, with temperatures in kelvin"],
      hint: "The car gets hotter. The mountain has lower air pressure outside the packet.",
      walk: "In the hot car, the gas in the balloon is heated. By Charles’s law, at constant pressure the volume increases with absolute temperature, so the balloon expands until it bursts. On a mountain, the outside air pressure is lower. By Boyle’s law, at constant temperature lower pressure means larger volume, so the packet puffs up.",
      summary: [
        "Boyle’s law: at constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure. P₁V₁ = P₂V₂.",
        "Charles’s law: at constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature (in kelvin). V₁/T₁ = V₂/T₂, where T(K) = T(°C) + 273.",
      ],
      explain: [
        p("Gas particles move fast in all directions. They hit the walls of their container, and these collisions cause pressure."),
        h("Boyle’s law"),
        p("Squeeze a gas into a smaller space and the particles hit the walls more often, so the pressure rises. At constant temperature, pressure × volume stays the same: P₁V₁ = P₂V₂. Halve the volume and the pressure doubles."),
        h("Charles’s law"),
        p("Heat a gas and the particles move faster. At constant pressure, the gas expands. The volume is proportional to the absolute temperature: V₁/T₁ = V₂/T₂."),
        tip("Key idea", "Always use kelvin in Charles’s law: K = °C + 273. At 0 K (absolute zero, −273 °C), particles would have the lowest possible energy."),
        h("Examples"),
        list("Tyres look flatter on a cold morning: lower temperature, lower volume and pressure.", "Bubbles grow as they rise in water: the pressure falls, so the volume increases (Boyle).", "A hot-air balloon rises: heated air expands, becoming less dense."),
      ],
      tryIt: [
        h("Calculate"),
        list(
          "Boyle: 4 litres of gas at 100 kPa is squeezed to 2 litres. P₂ = 100 × 4 ÷ 2 = 200 kPa.",
          "Charles: 300 cm³ of gas at 27 °C (300 K) is heated to 127 °C (400 K). V₂ = 300 × 400 ÷ 300 = 400 cm³.",
        ),
        p("Why must you convert to kelvin? (Volume is proportional to absolute temperature; in °C the numbers can be zero or negative, which makes no sense for proportion.)"),
      ],
      practice: [
        { p: "At constant temperature, the volume of a gas is halved. What happens to the pressure?", a: "It doubles", w: [["It halves", "Pressure and volume are inversely proportional."], ["It stays the same", "Squeezing a gas raises its pressure."]], x: "P₁V₁ = P₂V₂." },
        { p: "Convert 27 °C to kelvin.", a: "300 K", w: [["27 K", "Add 273."], ["246 K", "Add 273, do not subtract."]], x: "27 + 273 = 300 K." },
      ],
      quiz: [
        { p: "Why does a balloon burst in a hot car?", a: "Heating the gas makes it expand (Charles’s law)", w: [["Heat makes the rubber shrink", "The gas expands; the rubber cannot stretch enough."], ["Hot air is heavier", "Heated gas expands and becomes less dense."]], x: "Volume rises with absolute temperature." },
        { p: "Three statements about gases. Which is true?", a: "Gas pressure is caused by particles hitting the container walls.", w: [["In Charles’s law, temperature must be in °C.", "It must be in kelvin."], ["Boyle’s law applies when the temperature changes a lot.", "Boyle’s law is for constant temperature."]], x: "More frequent or harder collisions mean more pressure.", lineup: true },
        { p: "300 cm³ of gas at 300 K is heated to 400 K at constant pressure. What is the new volume?", a: "400 cm³", w: [["225 cm³", "Heating increases volume, it does not decrease it."], ["100 cm³", "V₂ = 300 × 400 ÷ 300."]], x: "V₂ = V₁ × T₂ ÷ T₁ = 400 cm³." },
      ],
      check: [
        { p: "Which law says P₁V₁ = P₂V₂?", a: "Boyle’s law", w: [["Charles’s law", "Charles’s law links volume and temperature."], ["Newton’s first law", "That is about motion."]], x: "Boyle’s law is for constant temperature." },
        { p: "Why do bubbles get bigger as they rise in water?", a: "The water pressure falls, so the gas volume increases", w: [["The water heats them up", "The main cause is falling pressure."], ["More gas enters them from nowhere", "The gas mass stays the same."]], x: "Lower pressure means larger volume (Boyle’s law)." },
      ],
    },
  ],
};

const COMPOUND: ChapterSpec = {
  id: "icse-compound-interest",
  number: "333",
  board: "icse",
  title: "The Case of the Growing Savings",
  topic: "Compound interest",
  subject: "maths",
  grade: 9,
  tagline: "See how interest on interest makes money grow faster than simple interest.",
  hook: "Two friends each save ₹10,000 for 3 years at 10% a year. One bank pays simple interest, the other compound interest. They end up with different amounts. How much more does the second friend get?",
  goal: "Calculate compound interest year by year and with the formula, and compare it with simple interest.",
  learn: ["Calculate compound interest year by year", "Use A = P(1 + r/100)ⁿ", "Compare simple and compound interest"],
  lessons: [
    {
      id: "compound",
      title: "Compound interest",
      teaser: "Interest earns interest.",
      question: "₹10,000 is saved for 3 years at 10% per year. How much more does compound interest give than simple interest?",
      goals: ["Calculate compound interest year by year", "Use the formula A = P(1 + r/100)ⁿ", "Compare compound interest with simple interest"],
      hint: "With compound interest, each year’s interest is added to the principal before the next year’s interest is worked out.",
      walk: "Simple interest: 10,000 × 10 × 3 ÷ 100 = ₹3,000. Compound: year 1: 10,000 → 11,000. Year 2: 11,000 → 12,100. Year 3: 12,100 → 13,310. Compound interest = ₹3,310. The difference is ₹310.",
      summary: [
        "With compound interest, the interest for each period is added to the principal, so the next interest is calculated on a bigger amount.",
        "Amount A = P(1 + r/100)ⁿ, and compound interest CI = A − P. Compound interest is more than simple interest over the same time (for more than one period).",
      ],
      explain: [
        p("With simple interest, you earn the same interest every year on the original principal. With compound interest, the interest is added to the principal each year, so you earn interest on your interest."),
        h("Year by year"),
        p("₹5,000 at 8% compound interest for 2 years: Year 1 interest = 8% of 5,000 = 400, amount 5,400. Year 2 interest = 8% of 5,400 = 432, amount 5,832. CI = 832."),
        h("The formula"),
        p("A = P(1 + r/100)ⁿ, where P is the principal, r is the rate per year, and n is the number of years. Then CI = A − P. Using the formula: 5,000 × 1.08² = 5,000 × 1.1664 = ₹5,832."),
        tip("Key idea", "The longer the time, the bigger the gap between compound and simple interest, because the interest keeps growing."),
        h("Growth and decay"),
        p("The same idea works for things that grow or shrink by a percentage each year: populations growing by r% use (1 + r/100)ⁿ; a car losing value by r% each year uses (1 − r/100)ⁿ."),
      ],
      tryIt: [
        h("Compare"),
        list("₹2,000 at 5% for 2 years, simple: ₹200 interest.", "Compound: 2,000 × 1.05² = ₹2,205, so ₹205 interest.", "A town of 50,000 grows 4% a year. After 2 years: 50,000 × 1.04² = 54,080."),
        p("Back to the case: over 3 years at 10%, compound interest gives ₹310 more than simple interest on ₹10,000."),
      ],
      practice: [
        { p: "Find the amount on ₹1,000 at 10% compound interest for 2 years.", a: "₹1,210", w: [["₹1,200", "That is simple interest; compound adds interest on interest."], ["₹1,100", "That is only one year."]], x: "1,000 × 1.1² = 1,210." },
        { p: "In compound interest, what is the interest calculated on each year?", a: "The principal plus the interest already added", w: [["Only the original principal", "That is simple interest."], ["Only the previous year’s interest", "It is calculated on the whole amount so far."]], x: "Interest is added to the principal each year." },
      ],
      quiz: [
        { p: "₹10,000 for 3 years at 10%: how much more does compound interest give than simple interest?", a: "₹310", w: [["₹0", "Compound interest is more over 3 years."], ["₹3,310", "That is the compound interest itself, not the difference."]], x: "CI ₹3,310 − SI ₹3,000 = ₹310." },
        { p: "Three statements about compound interest. Which is true?", a: "The gap between compound and simple interest grows over time.", w: [["Compound interest is always less than simple interest.", "It is more for more than one period."], ["The interest is the same every year.", "That describes simple interest."]], x: "Interest on interest keeps growing.", lineup: true },
        { p: "Which formula gives the amount with compound interest?", a: "A = P(1 + r/100)ⁿ", w: [["A = P × r × n ÷ 100", "That is simple interest."], ["A = P + r + n", "The values are not added."]], x: "Each year multiplies the amount by (1 + r/100)." },
      ],
      check: [
        { p: "A car worth ₹4,00,000 loses 10% of its value each year. What is it worth after 2 years?", a: "₹3,24,000", w: [["₹3,20,000", "That subtracts ₹40,000 twice, which is simple, not compound."], ["₹3,60,000", "That is after only one year."]], x: "4,00,000 × 0.9² = 3,24,000." },
        { p: "CI on ₹5,000 at 8% for 2 years is...", a: "₹832", w: [["₹800", "That is simple interest."], ["₹5,832", "That is the amount, not the interest."]], x: "5,832 − 5,000 = 832." },
      ],
    },
  ],
};

const LOGARITHMS: ChapterSpec = {
  id: "icse-logarithms",
  number: "334",
  board: "icse",
  title: "The Case of the Hidden Power",
  topic: "Logarithms",
  subject: "maths",
  grade: 9,
  tagline: "Turn “what power?” questions into logarithms and use the laws of logarithms.",
  hook: "Bacteria double every hour. Starting with one, how many hours until there are over a million? The answer is a power you need to find, and logarithms are the tool for finding it.",
  goal: "Convert between exponential and logarithmic form and use the laws of logarithms.",
  learn: ["Convert between exponent form and log form", "Evaluate simple logarithms", "Use the product, quotient and power laws"],
  lessons: [
    {
      id: "logs-intro",
      title: "Logarithms",
      teaser: "A logarithm is an exponent.",
      question: "If 2ˣ = 1,024, what is x, and how do you write that as a logarithm?",
      goals: ["Convert between aˣ = N and logₐN = x", "Evaluate simple logarithms such as log₂8 and log₁₀1000", "Use the laws: log(mn) = log m + log n, log(m/n) = log m − log n, log mⁿ = n log m"],
      hint: "Keep doubling: 2, 4, 8, 16… How many 2s multiply to give 1,024?",
      walk: "2¹⁰ = 1,024, so x = 10. In log form: log₂1,024 = 10. A logarithm answers the question “what power of the base gives this number?”",
      summary: [
        "If aˣ = N, then logₐN = x (a > 0, a ≠ 1). A logarithm is the power to which the base must be raised to give the number.",
        "Laws: logₐ(mn) = logₐm + logₐn; logₐ(m/n) = logₐm − logₐn; logₐ(mⁿ) = n logₐm. Also logₐa = 1 and logₐ1 = 0.",
      ],
      explain: [
        p("Exponents ask: what is 2⁵? (32.) Logarithms ask the reverse: 2 to what power gives 32? (5.) So log₂32 = 5."),
        h("Two forms"),
        list("Exponent form: aˣ = N.", "Log form: logₐN = x.", "Example: 10³ = 1,000 is the same as log₁₀1,000 = 3."),
        h("Special values"),
        list("logₐa = 1, because a¹ = a.", "logₐ1 = 0, because a⁰ = 1.", "The base must be positive and not 1, and you can only take the log of a positive number."),
        h("Laws of logarithms"),
        list(
          "Product law: log(mn) = log m + log n.",
          "Quotient law: log(m/n) = log m − log n.",
          "Power law: log(mⁿ) = n log m.",
        ),
        tip("Key idea", "The laws of logs come straight from the laws of exponents: multiplying powers means adding exponents."),
        p("Logarithms with base 10 are called common logarithms, often written log without a base. They help with very large and small numbers, such as the pH scale and the decibel scale."),
      ],
      tryIt: [
        h("Evaluate and simplify"),
        list("log₃81 = 4, because 3⁴ = 81.", "log₁₀0.01 = −2, because 10⁻² = 0.01.", "log 2 + log 5 = log 10 = 1.", "log 1,000 − log 10 = log 100 = 2.", "log 8 = log 2³ = 3 log 2."),
        p("Back to the case: bacteria pass a million after 20 hours, because 2²⁰ = 1,048,576."),
      ],
      practice: [
        { p: "Write 5² = 25 in log form.", a: "log₅25 = 2", w: [["log₂25 = 5", "The base is 5, not 2."], ["log₂₅5 = 2", "log₂₅5 would be 1/2."]], x: "The base stays the base: log₅25 = 2." },
        { p: "Evaluate log₂8.", a: "3", w: [["4", "2⁴ = 16, not 8."], ["16", "The answer is the power, not a product."]], x: "2³ = 8." },
      ],
      quiz: [
        { p: "If 2ˣ = 1,024, what is x?", a: "10", w: [["512", "512 is 2⁹, a value, not the power."], ["9", "2⁹ = 512."]], x: "2¹⁰ = 1,024, so log₂1,024 = 10." },
        { p: "Three statements about logarithms. Which is true?", a: "log m + log n = log(mn).", w: [["log m + log n = log(m + n).", "Adding logs matches multiplying numbers."], ["The log of a negative number is negative.", "Logs of negative numbers are not defined in real numbers."]], x: "This is the product law.", lineup: true },
        { p: "Simplify log 1,000 − log 10.", a: "2", w: [["990", "Subtract the logs, not the numbers."], ["3", "log 1,000 = 3 and log 10 = 1."]], x: "log(1,000 ÷ 10) = log 100 = 2." },
      ],
      check: [
        { p: "What is logₐ1 for any valid base a?", a: "0", w: [["1", "logₐa = 1; logₐ1 = 0."], ["a", "a⁰ = 1, so the answer is 0."]], x: "Any valid base to the power 0 is 1." },
        { p: "Write log 8 using the power law.", a: "3 log 2", w: [["8 log 1", "log 1 = 0, so that is 0."], ["log 2 + 3", "The power becomes a multiplier."]], x: "8 = 2³, so log 8 = 3 log 2." },
      ],
    },
  ],
};

const MAURYA: ChapterSpec = {
  id: "icse-mauryan-empire",
  number: "335",
  board: "icse",
  title: "The Case of the Emperor’s Edicts",
  topic: "The Mauryan Empire and Ashoka",
  subject: "history",
  grade: 9,
  tagline: "Read the messages an emperor carved on rocks and pillars across his empire.",
  hook: "After a terrible war at Kalinga, an emperor had messages carved into rocks and pillars across his empire. One expresses deep regret for the suffering the war caused. Why would a conqueror carve his regret in stone?",
  goal: "Describe the rise and administration of the Mauryan Empire, and explain Ashoka’s policy of Dhamma.",
  learn: ["Describe how Chandragupta Maurya founded the empire", "Describe Mauryan administration and sources", "Explain the Kalinga war and Ashoka’s Dhamma"],
  lessons: [
    {
      id: "ashoka",
      title: "The Mauryan Empire and Ashoka",
      teaser: "Chandragupta, Kautilya, Kalinga and Dhamma.",
      question: "Why did Ashoka have his messages carved on rocks and pillars after the Kalinga war?",
      goals: ["Describe the founding of the Mauryan Empire and its sources", "Describe Mauryan administration", "Explain how the Kalinga war changed Ashoka and what Dhamma meant"],
      hint: "Inscriptions last for centuries and can be read aloud to people across a huge empire.",
      walk: "The Kalinga war (about 261 BCE) caused huge loss of life. Ashoka’s edicts say he felt deep remorse. He turned to Buddhism and promoted Dhamma: non-violence, respect for all, kindness to animals and tolerance of all sects. Carving edicts on rocks and pillars across the empire spread his message widely and lastingly, in local languages.",
      summary: [
        "Chandragupta Maurya founded the Mauryan Empire around 321 BCE with the help of Kautilya (Chanakya). Ashoka (ruled about 268 to 232 BCE) expanded it to cover most of the subcontinent.",
        "After the Kalinga war, Ashoka adopted Buddhism and spread Dhamma through rock and pillar edicts. The Lion Capital of Sarnath is India’s national emblem today.",
      ],
      explain: [
        p("The Mauryan Empire was the first empire to cover most of the Indian subcontinent. Its capital was Pataliputra, near modern Patna."),
        h("Sources"),
        list("The Arthashastra, a text on statecraft linked to Kautilya.", "Indica, by the Greek ambassador Megasthenes, describing Pataliputra.", "Ashoka’s edicts on rocks and pillars, written mostly in Prakrit, in the Brahmi script."),
        h("Founding and administration"),
        p("Around 321 BCE, Chandragupta Maurya overthrew the Nanda dynasty with the advice of Kautilya. The empire had a strong central government, provinces run by governors (often princes), officials to collect taxes, a large army and a network of spies."),
        h("Ashoka and Kalinga"),
        p("Ashoka conquered Kalinga (in modern Odisha) around 261 BCE. His own edict says that about 100,000 people were killed and many more deported. Filled with remorse, he gave up war as a means of conquest and turned to Buddhism."),
        h("Dhamma"),
        list("Non-violence and kindness to all living beings.", "Respect for parents, elders and teachers.", "Tolerance of all religious sects.", "Welfare works: hospitals for people and animals, wells and shady trees along roads."),
        tip("Key idea", "Edicts are rare first-hand evidence from an ancient ruler, but they show how Ashoka wanted to be seen."),
      ],
      tryIt: [
        h("Evaluate the source"),
        list("What edicts tell us: Ashoka’s ideas, the size of his empire (from where they are found), and his regret over Kalinga.", "What to be careful about: they were written by the emperor himself, to present his rule well."),
        p("Detective question: the Lion Capital of Sarnath appears on Indian coins today. Why might a modern nation choose a symbol from Ashoka? (It stands for peace, justice and unity.)"),
      ],
      practice: [
        { p: "Who founded the Mauryan Empire?", a: "Chandragupta Maurya", w: [["Ashoka", "Ashoka was Chandragupta’s grandson."], ["Akbar", "Akbar was a Mughal emperor, much later."]], x: "He founded it around 321 BCE." },
        { p: "Which war changed Ashoka’s policy?", a: "The Kalinga war", w: [["The Battle of Panipat", "That was in 1526, much later."], ["The Persian Wars", "Those were fought by the Greeks."]], x: "The suffering at Kalinga led Ashoka to Dhamma." },
      ],
      quiz: [
        { p: "Why did Ashoka carve edicts on rocks and pillars?", a: "To spread his message of Dhamma widely and lastingly", w: [["To record tax payments only", "The edicts mainly explain Dhamma."], ["To hide his ideas from the people", "They were placed where people would see them."]], x: "Stone inscriptions could be read aloud across the empire." },
        { p: "Three statements about the Mauryan Empire. Which is true?", a: "Megasthenes described Pataliputra in his book Indica.", w: [["The capital was Delhi.", "The capital was Pataliputra."], ["Ashoka’s edicts were written only in English.", "They were mostly in Prakrit, in Brahmi script."]], x: "Megasthenes was a Greek ambassador.", lineup: true },
        { p: "Which is part of Ashoka’s Dhamma?", a: "Tolerance of all religious sects", w: [["Conquering neighbours by war", "Ashoka gave up war as a means of conquest."], ["Banning all religions except one", "Dhamma taught tolerance."]], x: "Respect and tolerance were central." },
      ],
      check: [
        { p: "Which text on statecraft is linked to Kautilya?", a: "The Arthashastra", w: [["The Indica", "Megasthenes wrote the Indica."], ["The Rig Veda", "The Rig Veda is a much older collection of hymns."]], x: "The Arthashastra discusses government and economy." },
        { p: "Which famous Mauryan sculpture is India’s national emblem?", a: "The Lion Capital of Sarnath", w: [["The Great Bath", "That is from the Indus Valley Civilisation."], ["The Qutb Minar", "That is from the Delhi Sultanate."]], x: "It comes from an Ashokan pillar at Sarnath." },
      ],
    },
  ],
};

const CONSTITUTION: ChapterSpec = {
  id: "icse-constitution",
  number: "336",
  board: "icse",
  title: "The Case of the Opening Words",
  topic: "The Indian Constitution: Preamble and Fundamental Rights",
  subject: "history",
  grade: 9,
  tagline: "Read the Preamble line by line, and find out which rights the Constitution guarantees.",
  hook: "The Constitution of India begins with the words “We, the people of India”. Not “We, the government”, not “We, the leaders”. Why does that choice of words matter?",
  goal: "Explain the key ideas in the Preamble and describe the Fundamental Rights.",
  learn: ["Explain the key words of the Preamble", "Describe the making of the Constitution", "Describe the Fundamental Rights and how they are protected"],
  lessons: [
    {
      id: "preamble-rights",
      title: "The Preamble and Fundamental Rights",
      teaser: "Sovereign, socialist, secular, democratic, republic.",
      question: "Why does the Constitution begin with “We, the people of India”?",
      goals: ["Explain the key words of the Preamble", "Describe how the Constitution was made and when it came into force", "List the Fundamental Rights and explain how they are protected"],
      hint: "Where does the power of a democratic government come from?",
      walk: "Beginning with “We, the people of India” shows that the Constitution’s authority comes from the people themselves, not from a king or a foreign power. In a democracy, power belongs to the citizens, who choose their government.",
      summary: [
        "The Preamble declares India a sovereign, socialist, secular, democratic republic, and promises justice, liberty, equality and fraternity.",
        "The Constitution came into force on 26 January 1950. It guarantees Fundamental Rights, which citizens can defend in court (the right to constitutional remedies).",
      ],
      explain: [
        p("The Constitution is the supreme law of India. It was drafted by the Constituent Assembly. Dr B. R. Ambedkar chaired its Drafting Committee. It was adopted on 26 November 1949 and came into force on 26 January 1950, now celebrated as Republic Day."),
        h("Key words of the Preamble"),
        list(
          "Sovereign: India makes its own decisions, free from outside control.",
          "Socialist: the state aims to reduce inequality.",
          "Secular: the state has no official religion and treats all religions equally.",
          "Democratic: the people elect their government.",
          "Republic: the head of state (the President) is elected, not hereditary.",
          "Justice, liberty, equality and fraternity: the goals the Constitution sets out.",
        ),
        p("The words “socialist” and “secular” were added by the 42nd Amendment in 1976."),
        h("Fundamental Rights"),
        list(
          "Right to equality.",
          "Right to freedom (of speech, movement and more, within reasonable limits).",
          "Right against exploitation (no forced labour, no child labour in factories).",
          "Right to freedom of religion.",
          "Cultural and educational rights.",
          "Right to constitutional remedies: the right to go to court to protect these rights.",
        ),
        tip("Key idea", "Dr Ambedkar called the right to constitutional remedies the “heart and soul” of the Constitution, because it makes the other rights enforceable."),
      ],
      tryIt: [
        h("Which right?"),
        list("A café refuses to serve someone because of their caste: right to equality.", "A child is made to work in a factory: right against exploitation.", "Someone is stopped from practising their faith peacefully: right to freedom of religion."),
        p("Discuss: why do rights have reasonable limits, for example free speech that incites violence?"),
      ],
      practice: [
        { p: "When did the Constitution of India come into force?", a: "26 January 1950", w: [["15 August 1947", "That is Independence Day."], ["26 November 1949", "The Constitution was adopted then, but came into force in 1950."]], x: "26 January is Republic Day." },
        { p: "What does “secular” mean in the Preamble?", a: "The state treats all religions equally and has no official religion", w: [["Only one religion is allowed", "Secular means equal treatment of all."], ["Religion is banned", "People are free to practise their religion."]], x: "Secularism means equal respect for all faiths." },
      ],
      quiz: [
        { p: "Why does the Constitution begin “We, the people of India”?", a: "It shows that its authority comes from the people", w: [["Because the British wrote it", "It was written by India’s own Constituent Assembly."], ["Because only leaders can make laws", "Power in a democracy comes from the people."]], x: "Sovereignty lies with the people." },
        { p: "Three statements about Fundamental Rights. Which is true?", a: "Citizens can go to court if their Fundamental Rights are violated.", w: [["Fundamental Rights have no limits at all.", "Most have reasonable limits."], ["Child labour in factories is a Fundamental Right.", "The right against exploitation forbids it."]], x: "This is the right to constitutional remedies.", lineup: true },
        { p: "What does “republic” mean?", a: "The head of state is elected, not born into the role", w: [["The country has a king or queen", "That is a monarchy."], ["The country has no laws", "A republic is governed by law."]], x: "India’s President is elected." },
      ],
      check: [
        { p: "Who chaired the Drafting Committee of the Constitution?", a: "Dr B. R. Ambedkar", w: [["Mahatma Gandhi", "Gandhi was not a member of the Drafting Committee."], ["Lord Mountbatten", "He was the last Viceroy."]], x: "Ambedkar is called the chief architect of the Constitution." },
        { p: "Which amendment added the words “socialist” and “secular” to the Preamble?", a: "The 42nd Amendment (1976)", w: [["The 1st Amendment (1951)", "It was the 42nd Amendment."], ["They were there from 1950", "They were added in 1976."]], x: "The 42nd Amendment changed the Preamble." },
      ],
    },
  ],
};

const ROTATION: ChapterSpec = {
  id: "icse-rotation-revolution",
  number: "337",
  board: "icse",
  title: "The Case of the Longest Day",
  topic: "Rotation and revolution of the Earth",
  subject: "geography",
  grade: 9,
  tagline: "Explain day and night, the seasons, and why days are longer in summer.",
  hook: "On 21 June, Delhi gets about 14 hours of daylight; on 22 December, only about 10. Earth spins at the same speed all year. So why do the days change?",
  goal: "Explain the effects of the Earth’s rotation and revolution, including day and night, seasons and changing day length.",
  learn: ["Explain rotation and its effects", "Explain revolution and the tilt of the axis", "Explain solstices, equinoxes and the seasons"],
  lessons: [
    {
      id: "seasons-motion",
      title: "Rotation and revolution of the Earth",
      teaser: "Spin gives day and night; the tilted orbit gives seasons.",
      question: "Why are days longer in June than in December in India?",
      goals: ["Explain rotation and its effects: day and night, and the apparent movement of the Sun", "Explain revolution and the tilt of the Earth’s axis", "Explain solstices, equinoxes and changing day length"],
      hint: "The Earth’s axis is tilted. Which way is the Northern Hemisphere tilted in June?",
      walk: "The Earth’s axis is tilted at about 23.5° and keeps pointing the same way in space as it orbits the Sun. In June, the Northern Hemisphere is tilted towards the Sun. The Sun appears higher in the sky, and more than half of each northern circle of latitude is in daylight, so days are longer. In December, it is tilted away, so days are shorter.",
      summary: [
        "Rotation: the Earth spins on its axis from west to east once in about 24 hours, causing day and night. Revolution: it orbits the Sun once in about 365¼ days.",
        "Because the axis is tilted at about 23.5°, the angle of sunlight and the length of day change through the year, causing seasons. Solstices are around 21 June and 22 December; equinoxes are around 21 March and 23 September.",
      ],
      explain: [
        p("The Earth has two main motions."),
        h("Rotation"),
        list(
          "The Earth spins on its axis from west to east, once in about 24 hours.",
          "This causes day and night: the half facing the Sun has day.",
          "It makes the Sun appear to rise in the east and set in the west.",
          "The line between day and night is called the circle of illumination.",
        ),
        h("Revolution"),
        p("The Earth travels around the Sun in an elliptical orbit, once in about 365¼ days. The extra quarter day adds up to an extra day every four years: a leap year."),
        h("The tilted axis and the seasons"),
        p("The Earth’s axis is tilted at about 23.5° from the vertical (making an angle of about 66.5° with the plane of its orbit), and always points in the same direction in space. So during the year each hemisphere is tilted first towards, then away from, the Sun."),
        list(
          "Summer solstice (about 21 June): the Sun is overhead at the Tropic of Cancer. Longest day in the Northern Hemisphere.",
          "Winter solstice (about 22 December): the Sun is overhead at the Tropic of Capricorn. Shortest day in the Northern Hemisphere.",
          "Equinoxes (about 21 March and 23 September): the Sun is overhead at the Equator. Day and night are roughly equal everywhere.",
        ),
        tip("Key idea", "Seasons are caused by the tilt, not by the Earth’s distance from the Sun. In fact, the Earth is closest to the Sun in early January, during the northern winter."),
      ],
      tryIt: [
        h("Explain these"),
        list("Places within the Arctic Circle have 24-hour daylight in June: the North Pole is tilted towards the Sun.", "Australia has summer in December: the Southern Hemisphere is tilted towards the Sun then.", "Day and night are nearly 12 hours each at the Equator all year."),
        p("Back to the case: Delhi’s long June days and short December days both come from the tilt of the Earth’s axis."),
      ],
      practice: [
        { p: "What causes day and night?", a: "The rotation of the Earth on its axis", w: [["The Earth’s revolution around the Sun", "Revolution causes the seasons and the year."], ["The Moon blocking the Sun", "That would be an eclipse."]], x: "The side facing the Sun has day." },
        { p: "In which direction does the Earth rotate?", a: "From west to east", w: [["From east to west", "That is the direction the Sun appears to move."], ["From north to south", "The Earth spins around a north to south axis, from west to east."]], x: "So the Sun appears to rise in the east." },
      ],
      quiz: [
        { p: "Why are days longer in June than in December in India?", a: "In June the Northern Hemisphere is tilted towards the Sun", w: [["The Earth is closest to the Sun in June", "The Earth is closest in early January."], ["The Earth spins more slowly in June", "The rotation speed is the same all year."]], x: "The tilt of the axis causes the change." },
        { p: "Three statements about seasons. Which is true?", a: "Seasons are caused by the tilt of the Earth’s axis.", w: [["Seasons are caused by the Earth’s distance from the Sun.", "The Earth is closest to the Sun during the northern winter."], ["Both hemispheres have summer at the same time.", "When the north has summer, the south has winter."]], x: "The tilt changes the angle and length of daylight.", lineup: true },
        { p: "On about 21 June, where is the midday Sun directly overhead?", a: "The Tropic of Cancer", w: [["The Tropic of Capricorn", "That is around 22 December."], ["The Equator", "That is at the equinoxes."]], x: "This is the summer solstice in the north." },
      ],
      check: [
        { p: "Why do we have a leap year every four years?", a: "A revolution takes about 365¼ days, so the quarters add up to an extra day", w: [["The Earth speeds up every four years", "The orbit time stays about the same."], ["To match the Moon’s orbit", "Leap years match the Earth’s orbit around the Sun."]], x: "Four quarter days make one extra day." },
        { p: "What is an equinox?", a: "A time when day and night are roughly equal everywhere", w: [["The longest day of the year", "That is the summer solstice."], ["A day with no sunlight anywhere", "There is always daylight somewhere."]], x: "At the equinoxes the Sun is overhead at the Equator." },
      ],
    },
  ],
};

const WINDS: ChapterSpec = {
  id: "icse-pressure-winds",
  number: "338",
  board: "icse",
  title: "The Case of the Trade Winds",
  topic: "Pressure belts and planetary winds",
  subject: "geography",
  grade: 9,
  tagline: "Map the world’s great wind belts and explain why sailors once relied on them.",
  hook: "For centuries, sailing ships crossing the Atlantic followed the same routes, using steady winds sailors called the trades. How could winds blow in the same direction year after year?",
  goal: "Describe the world’s pressure belts and explain the planetary winds and the Coriolis effect.",
  learn: ["Explain how pressure differences cause wind", "Describe the main pressure belts", "Name the planetary winds and explain their direction"],
  lessons: [
    {
      id: "wind-belts",
      title: "Pressure belts and planetary winds",
      teaser: "Wind blows from high to low pressure, bent by the Earth’s spin.",
      question: "Why do the trade winds blow steadily in the same direction all year?",
      goals: ["Explain that wind blows from high pressure to low pressure", "Describe the seven pressure belts", "Name the planetary winds and explain how the Coriolis effect deflects them"],
      hint: "Find the high-pressure belt around 30° and the low-pressure belt at the Equator.",
      walk: "Hot air rises at the Equator, creating a low-pressure belt. Air sinks around 30° north and south, creating high-pressure belts. Air flows from the subtropical highs towards the Equatorial low. The Earth’s rotation deflects it (the Coriolis effect): to the right in the Northern Hemisphere and to the left in the Southern. The result is the steady north-east and south-east trade winds.",
      summary: [
        "Wind blows from high pressure to low pressure. The Earth has belts of high and low pressure: the Equatorial low, the subtropical highs (about 30°), the subpolar lows (about 60°) and the polar highs.",
        "Planetary winds blow between these belts: the trade winds, the westerlies and the polar easterlies. The Coriolis effect deflects winds to the right in the Northern Hemisphere and to the left in the Southern.",
      ],
      explain: [
        p("Air has weight and presses down on the Earth: this is air pressure. Differences in pressure make air move from high to low pressure. This moving air is wind."),
        h("The pressure belts"),
        list(
          "Equatorial low (about 0° to 5°): hot air rises, giving low pressure. Called the doldrums: calm, with light winds.",
          "Subtropical highs (about 30° N and S): air sinks, giving high pressure. Called the horse latitudes.",
          "Subpolar lows (about 60° N and S): warm and cold air meet and rise.",
          "Polar highs (at the poles): very cold, dense air sinks.",
        ),
        h("The planetary winds"),
        list(
          "Trade winds: from the subtropical highs towards the Equator. North-east trades in the north, south-east trades in the south.",
          "Westerlies: from the subtropical highs towards the subpolar lows, blowing from the west. Very strong in the Southern Hemisphere (the Roaring Forties).",
          "Polar easterlies: from the polar highs towards the subpolar lows.",
        ),
        tip("Key idea", "The Coriolis effect, caused by the Earth’s rotation, deflects moving air to the right in the Northern Hemisphere and to the left in the Southern Hemisphere (Ferrel’s law)."),
        p("The pressure belts shift a little north and south with the seasons, following the overhead Sun."),
      ],
      tryIt: [
        h("Predict the wind"),
        list("Air moving south from 30° N towards the Equator is deflected to the right: it becomes the north-east trade wind.", "Air moving north from 30° S towards the Equator is deflected to the left: it becomes the south-east trade wind.", "A sailing ship heading west across the Atlantic near 15° N would use the north-east trades."),
        p("Back to the case: sailors used these steady trade winds to cross the Atlantic westwards in the tropics."),
      ],
      practice: [
        { p: "Wind blows from...", a: "High pressure to low pressure", w: [["Low pressure to high pressure", "Air flows from where pressure is higher."], ["The poles to the Equator only", "Winds blow between many pressure belts."]], x: "Pressure differences drive wind." },
        { p: "What is the Equatorial low-pressure belt also called?", a: "The doldrums", w: [["The horse latitudes", "That is the subtropical high-pressure belt."], ["The Roaring Forties", "These are strong westerlies in the south."]], x: "The doldrums are calm, with rising air." },
      ],
      quiz: [
        { p: "Why do trade winds blow steadily from the north-east in the Northern Hemisphere?", a: "Air flows from the subtropical high to the Equatorial low and is deflected right by the Coriolis effect", w: [["They are pushed by ocean waves", "Pressure differences and the Earth’s spin cause them."], ["Air flows from the Equator to the poles", "Trade winds blow towards the Equator."]], x: "High to low pressure, bent by the Earth’s rotation." },
        { p: "Three statements about pressure belts. Which is true?", a: "Air sinks around 30° north and south, creating high pressure.", w: [["The Equator has high pressure because air sinks there.", "Air rises at the Equator, making low pressure."], ["The pressure belts never move.", "They shift with the seasons."]], x: "These are the subtropical highs.", lineup: true },
        { p: "Which way are winds deflected in the Southern Hemisphere?", a: "To the left", w: [["To the right", "That is the Northern Hemisphere."], ["Not at all", "The Coriolis effect deflects winds in both hemispheres."]], x: "Ferrel’s law: right in the north, left in the south." },
      ],
      check: [
        { p: "Which planetary winds blow from the subtropical highs towards the subpolar lows?", a: "The westerlies", w: [["The trade winds", "They blow towards the Equator."], ["The polar easterlies", "They blow from the poles."]], x: "The westerlies blow from the west in the mid-latitudes." },
        { p: "What causes the Coriolis effect?", a: "The rotation of the Earth", w: [["The Moon’s gravity", "The Moon causes tides."], ["Ocean currents", "The Earth’s spin causes the deflection."]], x: "Moving air is deflected because the Earth spins beneath it." },
      ],
    },
  ],
};

export const ICSE_G9: ChapterSpec[] = [UPTHRUST, GAS_LAWS, COMPOUND, LOGARITHMS, MAURYA, CONSTITUTION, ROTATION, WINDS];
