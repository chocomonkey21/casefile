import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  ICSE, Grade 7: two chapters for each subject, one lesson each.
  ASSUMPTION: topics are ones commonly taught in ICSE (CISCE) schools at this level, chosen by the project team.
  They have not been checked against the official CISCE syllabus. Videos are in data/videos-curated.ts.
*/

const MIXTURES: ChapterSpec = {
  id: "icse-mixtures",
  number: "311",
  board: "icse",
  title: "The Case of the Salty Sand",
  topic: "Separating mixtures",
  subject: "science",
  grade: 7,
  tagline: "Choose the right method to pull a mixture apart: filter, evaporate, distil or use chromatography.",
  hook: "A jar of beach sand has been mixed with salt. The lab needs pure, dry salt back. Picking out grains by hand would take forever. Is there a better way?",
  goal: "Choose and explain methods to separate mixtures based on the properties of their parts.",
  learn: ["Explain the difference between a pure substance and a mixture", "Use filtration, evaporation, distillation and chromatography", "Choose a method based on the properties of the parts"],
  lessons: [
    {
      id: "separation",
      title: "Separating mixtures",
      teaser: "Use a difference between the parts to pull them apart.",
      question: "How can you get pure, dry salt back from a mixture of sand and salt?",
      goals: ["Explain that the parts of a mixture keep their own properties", "Describe filtration, evaporation, distillation and chromatography", "Choose a separation method and explain why it works"],
      hint: "One part dissolves in water and the other does not.",
      walk: "Add water and stir: the salt dissolves, the sand does not. Filter the mixture: sand stays on the filter paper (the residue) and salty water passes through (the filtrate). Evaporate the water from the filtrate by heating gently, and salt crystals are left behind.",
      summary: [
        "In a mixture the parts are not chemically joined, so they can be separated by physical methods that use a difference in their properties.",
        "Filtration separates an insoluble solid from a liquid. Evaporation gets a dissolved solid back. Distillation collects the liquid. Chromatography separates dissolved dyes.",
      ],
      explain: [
        p("A pure substance contains only one kind of particle, like pure water or pure salt. A mixture contains two or more substances that are not chemically joined, like sea water or air. Each part keeps its own properties, which is the key to separating them."),
        h("Methods"),
        list(
          "Filtration: pour the mixture through filter paper. An insoluble solid (residue) is trapped; the liquid (filtrate) passes through. Sand and water.",
          "Evaporation: heat a solution so the liquid turns to vapour, leaving the dissolved solid. Salt from salt water.",
          "Distillation: boil a solution and cool the vapour in a condenser to collect the pure liquid. Drinking water from sea water.",
          "Chromatography: a solvent carries dissolved dyes up a paper; different dyes travel different distances. Separating the colours in ink.",
          "Using a magnet: iron filings from sulphur powder.",
          "Decantation: gently pour off a liquid, leaving a settled solid behind.",
        ),
        tip("Key idea", "Pick the method by asking: what is different about the parts? Size, solubility, boiling point or magnetism."),
      ],
      tryIt: [
        h("Choose the method"),
        list("Chalk dust in water: filtration.", "Pure water from salty water: distillation.", "Colours in a black felt-tip pen: chromatography.", "Iron nails mixed with sawdust: a magnet."),
        p("Back to the case: dissolve, filter, then evaporate."),
      ],
      practice: [
        { p: "Which method separates sand from water?", a: "Filtration", w: [["Chromatography", "That separates dissolved dyes."], ["Using a magnet", "Sand is not magnetic."]], x: "Sand is insoluble, so it is trapped by the filter paper." },
        { p: "What is the filtrate?", a: "The liquid that passes through the filter paper", w: [["The solid left on the filter paper", "That is the residue."], ["The steam from evaporation", "Filtration does not involve heating."]], x: "The filtrate goes through; the residue stays behind." },
      ],
      quiz: [
        { p: "How do you get pure, dry salt from a sand and salt mixture?", a: "Dissolve in water, filter out the sand, then evaporate the water", w: [["Use a magnet to pull out the salt", "Salt is not magnetic."], ["Filter the dry mixture without water", "Both are dry solids; the salt must be dissolved first."]], x: "Use the difference in solubility." },
        { p: "Three statements about mixtures. Which is true?", a: "The parts of a mixture keep their own properties.", w: [["The parts of a mixture are chemically joined.", "That describes a compound."], ["Mixtures can only be separated by chemical reactions.", "Physical methods are used."]], x: "That is why physical methods work.", lineup: true },
        { p: "Which method gives you pure drinking water from sea water?", a: "Distillation", w: [["Filtration", "Salt is dissolved, so it passes through the filter."], ["Chromatography", "That is used for separating dyes."]], x: "The water boils off and is condensed back into a liquid." },
      ],
      check: [
        { p: "What does chromatography separate?", a: "Different dissolved substances, such as dyes in ink", w: [["Iron from sulphur", "That is done with a magnet."], ["Sand from water", "That is filtration."]], x: "Dyes travel different distances up the paper." },
        { p: "Which property does a magnet use to separate iron filings from sand?", a: "Iron is magnetic, sand is not", w: [["Iron dissolves in water", "Iron does not dissolve."], ["Iron has a lower boiling point", "Boiling is not involved."]], x: "Separation uses a difference in properties." },
      ],
    },
  ],
};

const ENERGY: ChapterSpec = {
  id: "icse-energy",
  number: "312",
  board: "icse",
  title: "The Case of the Bouncing Ball",
  topic: "Forms of energy and energy changes",
  subject: "science",
  grade: 7,
  tagline: "Follow energy as it changes from one form to another, without ever being destroyed.",
  hook: "A ball dropped from a balcony bounces lower and lower until it stops. Where did its energy go? It did not just vanish.",
  goal: "Name forms of energy, describe energy changes, and explain the conservation of energy.",
  learn: ["Name the main forms of energy", "Describe energy conversions in everyday devices", "Explain that energy is conserved"],
  lessons: [
    {
      id: "energy-forms",
      title: "Forms of energy and energy changes",
      teaser: "Energy changes form, but the total stays the same.",
      question: "A dropped ball bounces lower each time. Where does its energy go?",
      goals: ["Name forms of energy such as kinetic, potential, heat, light, sound, chemical and electrical", "Describe energy conversions in devices and activities", "Explain the law of conservation of energy"],
      hint: "Listen and feel. What does each bounce make, apart from motion?",
      walk: "At the top the ball has potential energy. As it falls this changes to kinetic energy. Each bounce changes some energy into sound (the thud) and heat (the ball and floor warm slightly). Less is left as motion, so each bounce is lower. The energy is not destroyed; it spreads out as heat and sound.",
      summary: [
        "Energy is the ability to do work. Forms include kinetic (movement), potential (stored by position or stretching), chemical, electrical, heat, light and sound.",
        "Energy can change from one form to another but cannot be created or destroyed. In real changes some energy is always spread out as heat.",
      ],
      explain: [
        p("Energy is the ability to do work: to move something, heat it or change it. It is measured in joules (J)."),
        h("Forms of energy"),
        list(
          "Kinetic energy: the energy of moving objects.",
          "Potential energy: stored energy, such as in a raised object or a stretched spring.",
          "Chemical energy: stored in food, fuels and batteries.",
          "Electrical energy: carried by an electric current.",
          "Heat (thermal), light and sound energy.",
        ),
        h("Energy changes"),
        list("A torch: chemical (battery) → electrical → light and heat.", "A fan: electrical → kinetic and sound.", "Eating and running: chemical (food) → kinetic and heat.", "A hydroelectric dam: potential (high water) → kinetic → electrical."),
        tip("Key idea", "Law of conservation of energy: energy cannot be created or destroyed, only changed from one form to another."),
        p("No device turns all its energy into the form we want. The rest is usually lost as heat. That is why devices feel warm."),
      ],
      tryIt: [
        h("Trace the energy"),
        list("A candle: chemical → light and heat.", "A swing at its highest point: mostly potential; at its lowest point: mostly kinetic.", "A solar panel: light → electrical."),
        p("Back to the case: the ball’s energy turned into sound and heat with each bounce, until none was left as motion."),
      ],
      practice: [
        { p: "What form of energy does a moving car have?", a: "Kinetic energy", w: [["Potential energy only", "Moving objects have kinetic energy."], ["Light energy", "The car’s motion is kinetic."]], x: "Kinetic energy is the energy of motion." },
        { p: "What energy change happens in a torch?", a: "Chemical to electrical to light (and some heat)", w: [["Light to chemical", "That is the wrong way round for a torch."], ["Sound to light", "A torch is powered by a battery."]], x: "The battery stores chemical energy." },
      ],
      quiz: [
        { p: "Why does a dropped ball bounce lower each time?", a: "Some energy is changed into sound and heat at each bounce", w: [["Energy is destroyed at each bounce", "Energy cannot be destroyed; it changes form."], ["Gravity gets stronger each time", "Gravity stays the same."]], x: "Less energy remains as motion after each bounce." },
        { p: "Three statements about energy. Which is true?", a: "Energy can change form but cannot be created or destroyed.", w: [["Devices turn all their energy into the useful form.", "Some energy is always lost, usually as heat."], ["Food contains no energy.", "Food stores chemical energy."]], x: "This is the law of conservation of energy.", lineup: true },
        { p: "A book on a high shelf has which kind of energy because of its position?", a: "Potential energy", w: [["Kinetic energy", "It is not moving."], ["Sound energy", "It is silent on the shelf."]], x: "Raised objects store gravitational potential energy." },
      ],
      check: [
        { p: "What is the unit of energy?", a: "The joule (J)", w: [["The metre (m)", "The metre measures length."], ["The kilogram (kg)", "The kilogram measures mass."]], x: "Energy is measured in joules." },
        { p: "What energy change happens in a solar panel?", a: "Light to electrical", w: [["Electrical to light", "That is a lamp."], ["Chemical to sound", "Solar panels use light."]], x: "Solar panels convert light into electricity." },
      ],
    },
  ],
};

const INTEREST: ChapterSpec = {
  id: "icse-simple-interest",
  number: "313",
  board: "icse",
  title: "The Case of the Borrowed Bicycle Money",
  topic: "Simple interest",
  subject: "maths",
  grade: 7,
  tagline: "Work out how much extra you pay when you borrow, or earn when you save.",
  hook: "Riya borrows ₹5,000 to buy a bicycle. The lender charges 8% per year simple interest. After 3 years, how much must she pay back?",
  goal: "Calculate simple interest and the amount, and find the principal, rate or time.",
  learn: ["Explain principal, rate, time, interest and amount", "Use SI = P × R × T ÷ 100", "Find the amount, and work backwards to find P, R or T"],
  lessons: [
    {
      id: "simple-interest",
      title: "Simple interest",
      teaser: "SI = P × R × T ÷ 100.",
      question: "Riya borrows ₹5,000 at 8% per year simple interest for 3 years. How much does she pay back?",
      goals: ["Explain principal, rate, time, interest and amount", "Calculate simple interest with SI = PRT ÷ 100", "Find the amount, and rearrange the formula to find P, R or T"],
      hint: "Work out the interest for one year, then for three years, then add it to the amount borrowed.",
      walk: "SI = P × R × T ÷ 100 = 5,000 × 8 × 3 ÷ 100 = ₹1,200. Amount = principal + interest = 5,000 + 1,200 = ₹6,200. She pays back ₹6,200.",
      summary: [
        "Principal (P) is the money borrowed or saved. Rate (R) is the percentage charged per year. Time (T) is in years. Simple interest: SI = P × R × T ÷ 100.",
        "Amount = principal + interest. With simple interest, the interest is the same every year.",
      ],
      explain: [
        p("When you borrow money, you pay back extra for using it. When you save money in a bank, the bank pays you extra. This extra money is called interest."),
        h("The words"),
        list("Principal (P): the money borrowed or saved.", "Rate (R): the interest per year, as a percentage, such as 8% per annum.", "Time (T): how long, in years.", "Interest (SI): the extra money.", "Amount (A): the total, principal plus interest."),
        h("The formula"),
        p("Simple interest is worked out only on the original principal: SI = P × R × T ÷ 100. Then A = P + SI."),
        tip("Key idea", "Time must be in years. 6 months is 1/2 a year; 9 months is 3/4 of a year."),
        h("Working backwards"),
        p("The formula can be rearranged: P = (SI × 100) ÷ (R × T), R = (SI × 100) ÷ (P × T), T = (SI × 100) ÷ (P × R)."),
      ],
      tryIt: [
        h("Try these"),
        list("₹2,000 at 5% for 2 years: SI = 2,000 × 5 × 2 ÷ 100 = ₹200. Amount ₹2,200.", "₹1,200 at 10% for 6 months: SI = 1,200 × 10 × 1/2 ÷ 100 = ₹60.", "What rate gives ₹300 interest on ₹2,500 in 2 years? R = 300 × 100 ÷ (2,500 × 2) = 6%."),
        p("Back to the case: Riya pays back ₹6,200, which is ₹1,200 more than she borrowed."),
      ],
      practice: [
        { p: "Find the simple interest on ₹1,000 at 10% per year for 2 years.", a: "₹200", w: [["₹100", "That is the interest for one year only."], ["₹1,200", "That is the amount, not the interest."]], x: "1,000 × 10 × 2 ÷ 100 = 200." },
        { p: "What does “principal” mean?", a: "The money borrowed or saved at the start", w: [["The extra money paid back", "That is the interest."], ["The rate per year", "That is the rate."]], x: "Interest is calculated on the principal." },
      ],
      quiz: [
        { p: "₹5,000 is borrowed at 8% per year simple interest for 3 years. What is the amount to pay back?", a: "₹6,200", w: [["₹1,200", "That is the interest only."], ["₹5,400", "That is one year’s interest added."]], x: "SI = ₹1,200, so A = ₹6,200." },
        { p: "Three statements about simple interest. Which is true?", a: "The interest is the same amount every year.", w: [["The interest grows each year.", "That describes compound interest."], ["Time is always measured in months in the formula.", "Time is in years."]], x: "Simple interest is always on the original principal.", lineup: true },
        { p: "What is the simple interest on ₹800 at 5% per year for 6 months?", a: "₹20", w: [["₹240", "6 months is 1/2 a year, not 6 years."], ["₹40", "That is for a whole year."]], x: "800 × 5 × 1/2 ÷ 100 = 20." },
      ],
      check: [
        { p: "Which formula gives simple interest?", a: "SI = P × R × T ÷ 100", w: [["SI = P + R + T", "The values are multiplied, then divided by 100."], ["SI = P ÷ (R × T)", "That is not the formula."]], x: "Multiply principal, rate and time, then divide by 100." },
        { p: "At what rate will ₹2,500 earn ₹300 simple interest in 2 years?", a: "6%", w: [["12%", "That would give ₹600."], ["3%", "That would give ₹150."]], x: "R = 300 × 100 ÷ (2,500 × 2) = 6." },
      ],
    },
  ],
};

const PARALLEL: ChapterSpec = {
  id: "icse-parallel-lines",
  number: "314",
  board: "icse",
  title: "The Case of the Railway Crossing",
  topic: "Parallel lines and transversals",
  subject: "maths",
  grade: 7,
  tagline: "Find hidden equal angles wherever a straight road crosses parallel tracks.",
  hook: "A road crosses two straight, parallel railway tracks. The surveyor measures only one angle, 65°, and then fills in all eight angles at the crossing. How?",
  goal: "Identify corresponding, alternate and co-interior angles and use them to find missing angles.",
  learn: ["Identify a transversal and the angles it makes", "Use corresponding and alternate angles", "Use co-interior angles"],
  lessons: [
    {
      id: "transversal-angles",
      title: "Parallel lines and transversals",
      teaser: "Corresponding, alternate and co-interior angles.",
      question: "A road crosses two parallel tracks and one angle is 65°. How can you find the other seven angles?",
      goals: ["Identify a transversal crossing parallel lines", "Use the facts that corresponding angles and alternate angles are equal", "Use the fact that co-interior angles add up to 180°"],
      hint: "Angles on a straight line add to 180°, and the pattern at one track repeats at the other.",
      walk: "At the first track, the angle next to 65° on the straight road is 180° − 65° = 115°. Vertically opposite angles are equal, so the four angles there are 65°, 115°, 65°, 115°. Because the tracks are parallel, corresponding angles are equal, so the second crossing has exactly the same four angles.",
      summary: [
        "A transversal is a line that crosses two or more lines. When the lines are parallel, corresponding angles are equal (F shape) and alternate angles are equal (Z shape).",
        "Co-interior angles (C or U shape) add up to 180°. Vertically opposite angles are equal, and angles on a straight line add up to 180°.",
      ],
      explain: [
        p("Parallel lines never meet; they are always the same distance apart. A line that cuts across them is called a transversal. It makes eight angles."),
        h("Angle pairs"),
        list(
          "Corresponding angles: in the same position at each crossing. They are equal. Look for an F shape.",
          "Alternate angles: on opposite sides of the transversal, between the parallel lines. They are equal. Look for a Z shape.",
          "Co-interior (allied) angles: on the same side of the transversal, between the parallel lines. They add up to 180°. Look for a C or U shape.",
          "Vertically opposite angles: opposite each other where two lines cross. They are equal.",
        ),
        tip("Key idea", "These rules only work when the lines are parallel. Parallel lines are often marked with matching arrows."),
        p("The rules also work in reverse: if corresponding angles are equal, the lines must be parallel."),
      ],
      tryIt: [
        h("Find the angle"),
        list("Corresponding to 72°: 72°.", "Alternate to 110°: 110°.", "Co-interior with 75°: 180° − 75° = 105°.", "Vertically opposite 40°: 40°."),
        p("Challenge: two co-interior angles are x and 2x. Find x. (3x = 180°, so x = 60°.)"),
      ],
      practice: [
        { p: "What do co-interior angles add up to?", a: "180°", w: [["90°", "That is a right angle, not the rule here."], ["360°", "That is a full turn."]], x: "Co-interior angles are supplementary." },
        { p: "Which angle pair makes a Z shape?", a: "Alternate angles", w: [["Corresponding angles", "These make an F shape."], ["Co-interior angles", "These make a C or U shape."]], x: "Alternate angles sit inside the Z." },
      ],
      quiz: [
        { p: "A transversal crosses parallel lines. One angle is 65°. What is its co-interior partner?", a: "115°", w: [["65°", "Co-interior angles add to 180°, they are not equal."], ["25°", "That would make 90°."]], x: "180° − 65° = 115°." },
        { p: "Three statements about parallel lines and a transversal. Which is true?", a: "Corresponding angles are equal.", w: [["Alternate angles add up to 180°.", "Alternate angles are equal."], ["The rules work even if the lines are not parallel.", "They only work for parallel lines."]], x: "The F-shaped angles match.", lineup: true },
        { p: "Two co-interior angles are x and 2x. What is x?", a: "60°", w: [["90°", "x + 2x = 180°, so 3x = 180°."], ["45°", "Check: 45 + 90 = 135, not 180."]], x: "3x = 180°, so x = 60°." },
      ],
      check: [
        { p: "What is a transversal?", a: "A line that crosses two or more other lines", w: [["A pair of parallel lines", "The transversal crosses them."], ["A right angle", "A transversal is a line."]], x: "It cuts across the lines, making angles." },
        { p: "An angle is 130°. What is the alternate angle?", a: "130°", w: [["50°", "Alternate angles are equal, not supplementary."], ["230°", "That would be reflex."]], x: "Alternate angles are equal." },
      ],
    },
  ],
};

const SULTANATE: ChapterSpec = {
  id: "icse-delhi-sultanate",
  number: "315",
  board: "icse",
  title: "The Case of the Tall Tower",
  topic: "The Delhi Sultanate",
  subject: "history",
  grade: 7,
  tagline: "Investigate the dynasties that ruled from Delhi for over 300 years.",
  hook: "In Delhi stands the Qutb Minar, a tower about 73 metres tall, begun around 1199. Who built it, and what does it tell us about the rulers of the time?",
  goal: "Describe the rise, rulers and administration of the Delhi Sultanate and its legacy.",
  learn: ["Name the dynasties of the Delhi Sultanate", "Describe key rulers and their policies", "Explain the Sultanate’s legacy in architecture and culture"],
  lessons: [
    {
      id: "sultans",
      title: "The Delhi Sultanate",
      teaser: "Five dynasties, from 1206 to 1526.",
      question: "What do buildings like the Qutb Minar tell us about the Delhi Sultanate?",
      goals: ["Name the five dynasties and the dates of the Sultanate", "Describe rulers such as Iltutmish, Razia Sultan and Alauddin Khalji", "Explain the Sultanate’s legacy, including its architecture and the iqta system"],
      hint: "Building a huge tower needs money, workers and a reason. What reasons might a new ruler have?",
      walk: "The Qutb Minar was begun by Qutb-ud-din Aibak, founder of the Delhi Sultanate, and completed by Iltutmish. Such a large monument shows the rulers had wealth and power over many workers, and wanted to show their authority and faith. Its style, mixing Islamic designs with the skills of local craftspeople, shows how cultures met.",
      summary: [
        "The Delhi Sultanate (1206 to 1526) was ruled by five dynasties: the Mamluk (Slave), Khalji, Tughlaq, Sayyid and Lodi dynasties.",
        "Rulers such as Iltutmish, Razia Sultan and Alauddin Khalji strengthened the state. The Sultanate ended when Babur defeated Ibrahim Lodi at Panipat in 1526.",
      ],
      explain: [
        p("In 1206, Qutb-ud-din Aibak, a general of Muhammad Ghori, became the first Sultan of Delhi. Five dynasties ruled from Delhi over the next 320 years."),
        h("Five dynasties"),
        list("Mamluk or Slave dynasty (1206 to 1290).", "Khalji dynasty (1290 to 1320).", "Tughlaq dynasty (1320 to 1414).", "Sayyid dynasty (1414 to 1451).", "Lodi dynasty (1451 to 1526)."),
        h("Key rulers"),
        list(
          "Iltutmish: completed the Qutb Minar and introduced silver and copper coins called the tanka and jital.",
          "Razia Sultan: the only woman to rule the Delhi Sultanate (1236 to 1240).",
          "Alauddin Khalji: defended against Mongol invasions and controlled market prices in Delhi.",
          "Muhammad bin Tughlaq: tried bold experiments, such as moving the capital to Daulatabad and issuing token copper coins, which failed.",
        ),
        h("Running the state"),
        p("Sultans gave military officers land revenue from areas called iqtas, in return for keeping soldiers and order. This was the iqta system."),
        tip("Key idea", "The Sultanate brought new styles of architecture, such as true arches and domes, and a mixing of Persian, Turkish and Indian cultures."),
        p("In 1526, Babur defeated Ibrahim Lodi at the First Battle of Panipat, ending the Sultanate and founding the Mughal Empire."),
      ],
      tryIt: [
        h("Evidence and what it shows"),
        list("The Qutb Minar: wealth, power and new architectural styles.", "Coins of Iltutmish: an organised economy and royal authority.", "Accounts of Razia Sultan: a woman could rule, though she faced opposition from nobles."),
        p("Detective question: why might Muhammad bin Tughlaq’s token coins have failed? (People forged them easily, so they lost value.)"),
      ],
      practice: [
        { p: "Who founded the Delhi Sultanate in 1206?", a: "Qutb-ud-din Aibak", w: [["Babur", "Babur founded the Mughal Empire in 1526."], ["Akbar", "Akbar was a Mughal emperor."]], x: "Aibak began the Mamluk dynasty." },
        { p: "Who was the only woman to rule the Delhi Sultanate?", a: "Razia Sultan", w: [["Nur Jahan", "Nur Jahan was a Mughal empress."], ["Rani Lakshmibai", "She fought in 1857, centuries later."]], x: "Razia ruled from 1236 to 1240." },
      ],
      quiz: [
        { p: "What does the Qutb Minar suggest about the early Sultans?", a: "They had great wealth and power, and wanted to display it", w: [["They had no money at all", "A huge tower needed great resources."], ["They were Mughal emperors", "The Mughals came later."]], x: "Monuments show power, wealth and beliefs." },
        { p: "Three statements about the Delhi Sultanate. Which is true?", a: "It ended when Babur defeated Ibrahim Lodi in 1526.", w: [["It was ruled by a single family throughout.", "There were five dynasties."], ["It began after the Mughal Empire.", "It came before the Mughals."]], x: "The First Battle of Panipat ended the Sultanate.", lineup: true },
        { p: "What was the iqta system?", a: "Giving officers land revenue in return for military service", w: [["A system of writing", "It was a way of running the land."], ["A type of coin", "The tanka and jital were coins."]], x: "Iqta holders kept soldiers and order." },
      ],
      check: [
        { p: "Which dynasty was the last of the Delhi Sultanate?", a: "The Lodi dynasty", w: [["The Khalji dynasty", "The Khaljis ruled from 1290 to 1320."], ["The Mamluk dynasty", "That was the first."]], x: "The Lodis ruled until 1526." },
        { p: "Which ruler moved the capital to Daulatabad?", a: "Muhammad bin Tughlaq", w: [["Iltutmish", "Iltutmish ruled from Delhi."], ["Razia Sultan", "Razia did not move the capital."]], x: "The move caused great hardship and was reversed." },
      ],
    },
  ],
};

const MUGHAL: ChapterSpec = {
  id: "icse-mughals",
  number: "316",
  board: "icse",
  title: "The Case of the Emperor’s Hall",
  topic: "The Mughal Empire under Akbar",
  subject: "history",
  grade: 7,
  tagline: "Find out how Akbar ran a vast empire of many faiths and peoples.",
  hook: "At Fatehpur Sikri, Emperor Akbar built a hall where scholars of many religions came to debate. Why would an emperor invite people to argue about beliefs?",
  goal: "Explain how Akbar strengthened the Mughal Empire through administration and religious tolerance.",
  learn: ["Describe the founding of the Mughal Empire", "Explain Akbar’s administration (the mansabdari system)", "Explain Akbar’s policy of sulh-i-kul"],
  lessons: [
    {
      id: "akbar",
      title: "The Mughal Empire under Akbar",
      teaser: "Conquest, the mansabdari system and sulh-i-kul.",
      question: "Why did Akbar invite scholars of different religions to debate at his court?",
      goals: ["Describe how the Mughal Empire was founded and expanded", "Explain the mansabdari system", "Explain Akbar’s policy of sulh-i-kul (peace with all) and why it helped him rule"],
      hint: "Most of Akbar’s subjects were not of his faith. How could he keep their loyalty?",
      walk: "Akbar ruled a huge empire where most people were Hindus, alongside Muslims, Jains, Christians and others. He was curious about religion, and he also saw that fairness to all would win loyalty and reduce conflict. The debates at the Ibadat Khana fitted his policy of sulh-i-kul, peace with all. He also ended the jizya tax on non-Muslims and gave high posts to Rajputs.",
      summary: [
        "Babur founded the Mughal Empire in 1526. Akbar (ruled 1556 to 1605) expanded and organised it.",
        "Akbar used the mansabdari system to rank officers and followed sulh-i-kul, a policy of tolerance and peace with all religions.",
      ],
      explain: [
        p("Babur founded the Mughal Empire after winning the First Battle of Panipat in 1526. His grandson Akbar became emperor at only 13, in 1556, and ruled for nearly 50 years."),
        h("Expansion"),
        p("Akbar won the Second Battle of Panipat in 1556 and expanded the empire across north India through conquest and alliances, including marriages with Rajput royal families."),
        h("Administration"),
        list(
          "Mansabdari system: every officer (mansabdar) held a rank, or mansab, that fixed their pay and the number of horsemen they had to keep.",
          "Land revenue: his minister Todar Mal measured land and fixed taxes based on average production.",
          "The empire was divided into provinces called subas, each with a governor.",
        ),
        h("Sulh-i-kul"),
        p("Akbar followed sulh-i-kul, meaning “peace with all”. He abolished the jizya tax on non-Muslims, held debates between religious scholars in the Ibadat Khana at Fatehpur Sikri, and appointed people of different faiths to high posts."),
        tip("Key idea", "Tolerance was both a belief and a practical way to keep a diverse empire united."),
      ],
      tryIt: [
        h("Why did it help?"),
        list("Alliances with Rajputs: brought powerful allies and soldiers.", "Abolishing jizya: won the loyalty of Hindu subjects.", "The mansabdari system: made officers depend on the emperor for rank and pay."),
        p("Detective question: Akbar’s court historian Abul Fazl wrote the Akbarnama. Why should historians read it carefully? (It was written to praise the emperor.)"),
      ],
      practice: [
        { p: "Who founded the Mughal Empire?", a: "Babur", w: [["Akbar", "Akbar was Babur’s grandson."], ["Shah Jahan", "Shah Jahan ruled later and built the Taj Mahal."]], x: "Babur won at Panipat in 1526." },
        { p: "What does sulh-i-kul mean?", a: "Peace with all", w: [["War against all", "It means the opposite."], ["A type of tax", "It was a policy of tolerance."]], x: "It describes Akbar’s policy of tolerance." },
      ],
      quiz: [
        { p: "Why did Akbar hold debates between scholars of different religions?", a: "He was curious about religion and wanted tolerance to keep a diverse empire united", w: [["He wanted to ban all religions", "He encouraged discussion, not bans."], ["Only one religion existed in his empire", "His subjects followed many faiths."]], x: "Sulh-i-kul helped him win loyalty." },
        { p: "Three statements about Akbar. Which is true?", a: "He abolished the jizya tax on non-Muslims.", w: [["He refused to make any alliances.", "He made alliances, including with Rajputs."], ["He founded the Delhi Sultanate.", "The Sultanate was earlier."]], x: "Ending jizya won the support of many subjects.", lineup: true },
        { p: "What was a mansabdar?", a: "An officer with a rank that fixed pay and the soldiers they kept", w: [["A tax collector in a village only", "Mansabdars were ranked officers."], ["A religious scholar", "Scholars debated in the Ibadat Khana; mansabdars served the state."]], x: "Mansab means rank." },
      ],
      check: [
        { p: "Where did Akbar build the Ibadat Khana?", a: "Fatehpur Sikri", w: [["Delhi’s Qutb complex", "That is from the Sultanate period."], ["Agra’s Taj Mahal", "The Taj Mahal was built by Shah Jahan."]], x: "Fatehpur Sikri was Akbar’s new capital." },
        { p: "Who wrote the Akbarnama?", a: "Abul Fazl", w: [["Babur", "Babur wrote his own memoir, the Baburnama."], ["Todar Mal", "Todar Mal was the revenue minister."]], x: "Abul Fazl was Akbar’s court historian." },
      ],
    },
  ],
};

const WEATHERING: ChapterSpec = {
  id: "icse-weathering",
  number: "317",
  board: "icse",
  title: "The Case of the Cracked Boulder",
  topic: "Weathering and soil formation",
  subject: "geography",
  grade: 7,
  tagline: "Discover how rocks break down where they stand, and how that makes soil.",
  hook: "In a desert, a huge boulder has split cleanly in two. No one hit it, and it did not fall. How can a rock break by itself?",
  goal: "Explain physical, chemical and biological weathering and how weathering forms soil.",
  learn: ["Explain the difference between weathering and erosion", "Describe physical, chemical and biological weathering", "Explain how soil forms"],
  lessons: [
    {
      id: "weathering-soil",
      title: "Weathering and soil formation",
      teaser: "Rocks broken down in place by heat, frost, water and living things.",
      question: "How can a boulder in a desert split in two without being hit?",
      goals: ["Explain the difference between weathering and erosion", "Describe physical, chemical and biological weathering", "Explain how weathering helps to form soil"],
      hint: "Deserts are very hot by day and cold at night. What do heating and cooling do to rock?",
      walk: "In deserts, rock heats up and expands by day and cools and contracts at night. Repeated over many years, this stress makes the rock crack and even split. This is physical (mechanical) weathering. It happens in place: nothing carried the rock away.",
      summary: [
        "Weathering is the breaking down of rocks where they are. Erosion is the wearing away and carrying away of material by water, wind or ice.",
        "Physical weathering breaks rock without changing it (heating and cooling, frost). Chemical weathering changes the minerals (rainwater dissolving limestone). Biological weathering is caused by living things (roots, burrowing animals). Weathered rock, mixed with decayed plant and animal matter, forms soil.",
      ],
      explain: [
        p("Weathering is the breakdown of rocks at or near the Earth’s surface, in the place where they are. It is different from erosion, which moves the broken material away."),
        h("Physical weathering"),
        list(
          "Exfoliation (onion weathering): in hot deserts, the outer layers of rock heat and cool repeatedly and peel off.",
          "Frost action: water in cracks freezes, expands by about 9% and widens the crack. Repeated freezing and thawing splits the rock.",
        ),
        h("Chemical weathering"),
        p("Rainwater is slightly acidic because it absorbs carbon dioxide. It slowly dissolves rocks such as limestone. Oxygen can react with iron in rocks, making them rusty and crumbly. Chemical weathering is fastest in hot, wet climates."),
        h("Biological weathering"),
        p("Plant roots grow into cracks and push them apart. Burrowing animals break up rock and soil. Lichens release chemicals that slowly break down rock surfaces."),
        tip("Key idea", "Soil is made from weathered rock mixed with humus, the decayed remains of plants and animals. It forms very slowly, often over hundreds of years for a few centimetres."),
      ],
      tryIt: [
        h("Name the weathering"),
        list("A tree root splitting a pavement: biological.", "A limestone statue losing its detail in acid rain: chemical.", "Rocks shattering on a mountain after freezing nights: physical (frost action)."),
        p("Back to the case: the boulder split from repeated heating and cooling, which is physical weathering."),
      ],
      practice: [
        { p: "What is the difference between weathering and erosion?", a: "Weathering breaks rock in place; erosion carries the material away", w: [["They mean exactly the same thing", "Weathering happens in place; erosion moves material."], ["Erosion only happens in deserts", "Erosion happens by water, wind and ice everywhere."]], x: "Weathering comes first, erosion moves the pieces." },
        { p: "Which is an example of chemical weathering?", a: "Rainwater slowly dissolving limestone", w: [["Ice widening a crack", "That is physical weathering."], ["A root splitting a rock", "That is biological weathering."]], x: "Slightly acidic rain reacts with limestone." },
      ],
      quiz: [
        { p: "How can a desert boulder split without being hit?", a: "Repeated heating and cooling makes it expand and contract until it cracks", w: [["Rain dissolves it in one day", "Deserts have little rain, and splitting comes from temperature changes."], ["The wind carries half of it away", "That would be erosion, and the boulder split in place."]], x: "This is physical weathering." },
        { p: "Three statements about weathering. Which is true?", a: "Chemical weathering is fastest in hot, wet climates.", w: [["Frost action happens most in hot deserts with no frost.", "Frost action needs freezing and thawing."], ["Soil forms in a few days.", "Soil forms very slowly."]], x: "Heat and moisture speed up chemical reactions.", lineup: true },
        { p: "Why does frost action split rocks?", a: "Water in cracks expands when it freezes, widening the cracks", w: [["Ice dissolves the rock", "Ice pushes; it does not dissolve rock."], ["Cold makes rocks grow", "Rocks do not grow; the ice expands."]], x: "Repeated freeze and thaw breaks the rock apart." },
      ],
      check: [
        { p: "What is humus?", a: "Decayed plant and animal matter in soil", w: [["A type of rock", "Humus is organic material."], ["Frozen water in cracks", "That is part of frost action."]], x: "Humus makes soil fertile." },
        { p: "A plant root grows into a crack and splits a rock. What type of weathering is this?", a: "Biological", w: [["Chemical", "The root pushes the rock apart physically, caused by a living thing."], ["Erosion", "The rock is broken in place, not carried away."]], x: "Weathering caused by living things is biological." },
      ],
    },
  ],
};

const ATMOSPHERE: ChapterSpec = {
  id: "icse-atmosphere",
  number: "318",
  board: "icse",
  title: "The Case of the Thin Air",
  topic: "Layers of the atmosphere",
  subject: "geography",
  grade: 7,
  tagline: "Climb through the layers of air above us, from the weather layer to the edge of space.",
  hook: "Mountaineers on Everest often carry oxygen tanks, and passenger jets fly above most of the clouds. What changes as you go higher into the atmosphere?",
  goal: "Describe the composition and layers of the atmosphere and the importance of each layer.",
  learn: ["Describe the gases in the atmosphere", "Name the layers of the atmosphere in order", "Explain what happens in each layer"],
  lessons: [
    {
      id: "atmosphere-layers",
      title: "Layers of the atmosphere",
      teaser: "Troposphere, stratosphere, mesosphere, thermosphere, exosphere.",
      question: "Why do mountaineers on very high peaks often need extra oxygen, and why do jets fly in the lower stratosphere?",
      goals: ["Describe the main gases in the atmosphere", "Name the layers of the atmosphere in order from the ground up", "Explain the key features of each layer"],
      hint: "The atmosphere gets thinner with height. Where does most of our weather happen?",
      walk: "Air gets thinner with height, so each breath on a high mountain contains less oxygen. Most weather (clouds, rain, storms) happens in the lowest layer, the troposphere. The stratosphere above it is calm and dry, so long-distance jets often fly in its lower part to avoid turbulence.",
      summary: [
        "The atmosphere is about 78% nitrogen, 21% oxygen and small amounts of argon, carbon dioxide and water vapour.",
        "From the ground up: troposphere (weather), stratosphere (ozone layer), mesosphere (meteors burn up), thermosphere (auroras) and exosphere (fades into space).",
      ],
      explain: [
        p("The atmosphere is a layer of gases held around the Earth by gravity. It is densest near the ground and gets thinner with height."),
        h("What it is made of"),
        list("Nitrogen: about 78%.", "Oxygen: about 21%.", "Argon: just under 1%.", "Carbon dioxide, water vapour and other gases: small amounts, but very important for climate and weather."),
        h("The layers"),
        list(
          "Troposphere: from the ground to about 8 km at the poles and about 18 km at the equator. All our weather happens here. Temperature falls with height.",
          "Stratosphere: up to about 50 km. Contains the ozone layer, which absorbs harmful ultraviolet radiation. It is calm and dry.",
          "Mesosphere: up to about 80 to 85 km. Most meteors burn up here. It is the coldest layer.",
          "Thermosphere: up to several hundred kilometres. Very thin, but very hot. Auroras happen here, and the International Space Station orbits within it.",
          "Exosphere: the outermost layer, gradually fading into space.",
        ),
        tip("Key idea", "Order trick: The Strong Man Throws Everything (troposphere, stratosphere, mesosphere, thermosphere, exosphere)."),
      ],
      tryIt: [
        h("Which layer?"),
        list("A thunderstorm: troposphere.", "The ozone layer: stratosphere.", "A shooting star: mesosphere.", "The northern lights: thermosphere."),
        p("Back to the case: thin air at height means less oxygen in each breath."),
      ],
      practice: [
        { p: "Which gas makes up most of the atmosphere?", a: "Nitrogen", w: [["Oxygen", "Oxygen is about 21%."], ["Carbon dioxide", "Carbon dioxide is a tiny fraction."]], x: "Nitrogen is about 78%." },
        { p: "In which layer does our weather happen?", a: "The troposphere", w: [["The stratosphere", "The stratosphere is calm and dry."], ["The thermosphere", "The thermosphere is far too high and thin."]], x: "Clouds and rain form in the troposphere." },
      ],
      quiz: [
        { p: "Why do climbers on very high peaks often use oxygen tanks?", a: "The air is thinner, so each breath contains less oxygen", w: [["There is no oxygen at all above 5 km", "There is oxygen, just less of it."], ["The air is made only of nitrogen up there", "The proportions are similar; the air is just thinner."]], x: "Thinner air means fewer oxygen molecules per breath." },
        { p: "Three statements about the layers. Which is true?", a: "The ozone layer is in the stratosphere.", w: [["The mesosphere is the warmest layer.", "It is the coldest."], ["Weather happens in the exosphere.", "Weather happens in the troposphere."]], x: "Ozone absorbs harmful ultraviolet rays.", lineup: true },
        { p: "Where do most meteors burn up?", a: "In the mesosphere", w: [["In the troposphere", "Most burn up much higher."], ["On the ground", "Most never reach the ground."]], x: "Friction with the air in the mesosphere burns them up." },
      ],
      check: [
        { p: "Which is the correct order from the ground up?", a: "Troposphere, stratosphere, mesosphere, thermosphere, exosphere", w: [["Stratosphere, troposphere, thermosphere, mesosphere, exosphere", "The troposphere is closest to the ground."], ["Exosphere, thermosphere, mesosphere, stratosphere, troposphere", "That is from the top down."]], x: "The Strong Man Throws Everything." },
        { p: "Why is the ozone layer important?", a: "It absorbs much of the Sun’s harmful ultraviolet radiation", w: [["It makes rain", "Rain forms in the troposphere."], ["It produces oxygen for breathing", "Plants produce most oxygen."]], x: "It protects living things from UV damage." },
      ],
    },
  ],
};

export const ICSE_G7: ChapterSpec[] = [MIXTURES, ENERGY, INTEREST, PARALLEL, SULTANATE, MUGHAL, WEATHERING, ATMOSPHERE];
