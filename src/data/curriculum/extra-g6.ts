import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  Grade 6: two more chapters for each subject, one lesson each, so every grade and subject has three chapters.
  ASSUMPTION: topics and depth were chosen by the project team for a typical Grade 6 class. They are not matched to an
  official curriculum. Videos for these lessons are in data/videos-curated.ts.
*/

const FOOD_CHAINS: ChapterSpec = {
  id: "food-chains",
  number: "201",
  title: "The Case of the Missing Rabbits",
  topic: "Food chains and food webs",
  subject: "science",
  grade: 6,
  tagline: "Follow the energy from the Sun, through plants, to the animals that eat them.",
  hook: "The rabbits in a meadow have almost vanished, and now the foxes are going hungry too. Nobody hunted them. To find out what happened, follow who eats what.",
  goal: "Read and build food chains and food webs, and explain what happens when one living thing disappears.",
  learn: ["Say what producers, consumers and decomposers are", "Read the arrows in a food chain", "Predict what happens to a food web when one species changes"],
  lessons: [
    {
      id: "food-webs",
      title: "Food chains and food webs",
      teaser: "Every arrow shows where the energy goes.",
      question: "A disease kills most of the rabbits in a meadow. Why might the grass grow taller and the foxes go hungry?",
      goals: ["Name producers, consumers and decomposers", "Read the direction of the arrows in a food chain", "Explain how a change to one living thing affects others in a food web"],
      hint: "Rabbits eat grass, and foxes eat rabbits. What happens to each when the rabbits disappear?",
      walk: "In the chain grass → rabbit → fox, the arrows show energy passing from the thing eaten to the eater. With fewer rabbits, less grass is eaten, so it grows taller. The foxes have less food, so they go hungry or have to find other prey.",
      summary: [
        "A food chain shows who eats what. Arrows point from the food to the animal that eats it, showing the flow of energy.",
        "Food chains link up into food webs, so a change to one living thing affects many others.",
      ],
      explain: [
        p("Every living thing needs energy. Almost all of that energy starts with the Sun."),
        h("Producers and consumers"),
        list(
          "Producers make their own food using sunlight. Plants, algae and seaweed are producers.",
          "Consumers get their energy by eating other living things. Herbivores eat plants, carnivores eat animals, and omnivores eat both.",
          "Decomposers, such as fungi and bacteria, break down dead plants and animals and return nutrients to the soil.",
        ),
        h("Reading a food chain"),
        p("A food chain is written with arrows: grass → rabbit → fox. The arrow means “is eaten by”. It points the way the energy travels, from the grass to the rabbit, then from the rabbit to the fox."),
        tip("Key idea", "The arrow points to the eater, not to the food. Think of it as energy moving along the chain."),
        h("Food webs"),
        p("Most animals eat more than one thing, and are eaten by more than one thing. When you join many food chains together you get a food web. In a meadow, foxes might eat rabbits and mice; owls might eat mice too."),
        p("Because everything is linked, a change in one place spreads. If the rabbits disappear, the grass they used to eat grows taller, the foxes eat more mice instead, and the owls may then find fewer mice."),
      ],
      tryIt: [
        h("Build a pond food chain"),
        p("In a pond: algae are eaten by water fleas, water fleas are eaten by small fish, and small fish are eaten by herons."),
        list("Write it with arrows: algae → water flea → small fish → heron.", "The producer is the algae.", "The heron is the top predator: nothing in this chain eats it."),
        p("Now predict: what might happen to the water fleas if a disease killed most of the small fish? (They would probably increase, because fewer of them are being eaten.)"),
      ],
      practice: [
        { p: "In the chain grass → grasshopper → frog, what does the arrow from grasshopper to frog mean?", a: "The grasshopper is eaten by the frog", w: [["The frog is eaten by the grasshopper", "The arrow points towards the eater, so the frog eats the grasshopper."], ["The grasshopper turns into a frog", "Arrows in a food chain show feeding, not changing into something else."]], x: "Arrows point from the food to the eater, following the energy." },
        { p: "Which of these is a producer?", a: "An oak tree", w: [["A mushroom", "A mushroom is a fungus. It breaks down dead material, so it is a decomposer."], ["A caterpillar", "A caterpillar eats leaves, so it is a consumer."]], x: "Plants make their own food from sunlight, so they are producers." },
      ],
      quiz: [
        { p: "Where does the energy in almost every food chain start?", a: "The Sun", w: [["The top predator", "The top predator is at the end of the chain, not the start."], ["The soil", "Soil gives plants nutrients and water, but the energy comes from sunlight."]], x: "Producers use the Sun’s energy to make food, and that energy passes along the chain." },
        { p: "Three statements about decomposers. Which is true?", a: "They break down dead things and return nutrients to the soil.", w: [["They make food from sunlight, like plants.", "That describes producers."], ["They are always the top predator.", "Decomposers feed on dead material. They are not predators."]], x: "Fungi and bacteria recycle nutrients by breaking down dead plants and animals.", lineup: true },
        { p: "In a meadow food web, most of the rabbits die. What is the most likely effect on the foxes that ate them?", a: "They have less food and may eat more of other animals, such as mice", w: [["Nothing, because foxes do not need rabbits", "The foxes ate rabbits, so losing them takes away part of their food."], ["The foxes increase, because there is more grass", "Foxes do not eat grass. Less prey means less food for them."]], x: "In a food web, losing one food source pushes predators onto other prey or leaves them hungry." },
      ],
      check: [
        { p: "What is a food web?", a: "Many food chains joined together", w: [["One food chain with three living things", "That is a single food chain."], ["A spider’s web that catches food", "In science, a food web is a diagram of feeding links."]], x: "Most animals eat and are eaten by several things, so chains link into a web." },
        { p: "An animal that eats both plants and animals is called a...", a: "Omnivore", w: [["Herbivore", "Herbivores eat only plants."], ["Producer", "Producers make their own food. They do not eat other things."]], x: "Omnivores, such as bears and humans, eat both plants and animals." },
      ],
    },
  ],
};

const CIRCUITS: ChapterSpec = {
  id: "circuits",
  number: "202",
  title: "The Case of the Dark Torch",
  topic: "Simple electric circuits",
  subject: "science",
  grade: 6,
  tagline: "Find out why a bulb lights, and why sometimes it does not.",
  hook: "A torch has a new battery and a working bulb, but it still will not light. Something in the circuit is broken. Your job is to find the gap.",
  goal: "Explain how a simple circuit works and use conductors, insulators and switches to make a bulb light or go out.",
  learn: ["Say what a complete circuit needs", "Sort materials into conductors and insulators", "Explain what a switch does"],
  lessons: [
    {
      id: "simple-circuits",
      title: "Simple electric circuits",
      teaser: "Electricity only flows around a complete loop.",
      question: "A torch has a good battery and a good bulb, but the bulb stays dark. What could be wrong?",
      goals: ["Say what a complete circuit is", "Name some conductors and insulators", "Explain how a switch turns a bulb on and off"],
      hint: "Electricity needs an unbroken path all the way round, from the battery and back again.",
      walk: "For the bulb to light, there must be a complete loop: battery, wire, bulb, wire, back to the battery. If there is a gap anywhere, such as a loose wire, a dirty contact or a switch that is off, no electricity flows and the bulb stays dark.",
      summary: [
        "Electricity flows only around a complete circuit, an unbroken loop from one end of the battery to the other.",
        "Conductors (like metals) let electricity flow. Insulators (like plastic and rubber) do not. A switch opens or closes the gap.",
      ],
      explain: [
        p("A circuit is a path that electricity can flow around. The simplest circuit has a battery (or cell), wires and a bulb."),
        h("A complete loop"),
        p("Electricity flows out of one end of the battery, along a wire, through the bulb and back along another wire to the other end. The loop must be complete. If there is a gap anywhere, the flow stops everywhere in the loop."),
        tip("Key idea", "No complete loop, no flow. One break anywhere is enough to stop the whole circuit."),
        h("Conductors and insulators"),
        list(
          "Conductors let electricity pass through them easily. Most metals, such as copper, iron and aluminium, are good conductors. That is why wires are made of copper.",
          "Insulators do not let electricity pass. Plastic, rubber, wood and glass are insulators. The plastic coating on a wire keeps the electricity inside and keeps you safe.",
        ),
        h("Switches"),
        p("A switch is a gap you can open and close. When the switch is closed (on), the metal parts touch and the loop is complete. When it is open (off), there is a gap, so the bulb goes out."),
        p("Safety: only experiment with small batteries. Mains electricity from wall sockets is dangerous and can kill."),
      ],
      tryIt: [
        h("Test it: conductor or insulator?"),
        p("Imagine a circuit with a gap in it, between two crocodile clips. You put different objects across the gap and see if the bulb lights."),
        list("A steel paper clip: the bulb lights, so steel is a conductor.", "A plastic ruler: the bulb stays dark, so plastic is an insulator.", "A coin: the bulb lights, because coins are metal.", "A rubber band: the bulb stays dark."),
        p("Detective question: the torch from the case lights when you press the battery hard against the spring. What was the problem? (A loose contact was leaving a gap in the circuit.)"),
      ],
      practice: [
        { p: "Which material is a good conductor of electricity?", a: "Copper", w: [["Rubber", "Rubber is an insulator. It is used to cover wires."], ["Wood", "Dry wood is an insulator."]], x: "Metals such as copper conduct electricity well." },
        { p: "What does a switch do when it is turned off?", a: "It makes a gap in the circuit", w: [["It uses up the battery", "Turning a switch off stops the flow, so the battery is not being used."], ["It makes the bulb brighter", "Off means no flow, so the bulb goes out."]], x: "An open switch breaks the loop, so electricity cannot flow." },
      ],
      quiz: [
        { p: "Why must a circuit be a complete loop?", a: "Electricity can only flow if there is an unbroken path back to the battery", w: [["So the wires look tidy", "The shape does not matter. What matters is that the path is unbroken."], ["So the battery does not get too heavy", "Battery weight has nothing to do with it."]], x: "Any gap in the loop stops the flow everywhere in it." },
        { p: "Three statements about insulators. Which is true?", a: "They stop electricity from flowing through them.", w: [["They are always made of metal.", "Metals are usually conductors, not insulators."], ["They make a bulb shine more brightly.", "An insulator in the path stops the bulb lighting at all."]], x: "Plastic, rubber, glass and wood are insulators.", lineup: true },
        { p: "A bulb in a circuit will not light. The battery and bulb both work. Which is the most likely cause?", a: "A loose wire is leaving a gap", w: [["The wires are too long", "Longer wires still conduct. The bulb would still light."], ["The bulb is the wrong colour", "Colour does not stop electricity flowing."]], x: "If the parts work, look for a break in the loop." },
      ],
      check: [
        { p: "Why do electrical wires have a plastic coating?", a: "Plastic is an insulator, so it keeps the electricity in the wire and keeps people safe", w: [["Plastic helps the electricity flow faster", "Plastic is an insulator. It does not help electricity flow."], ["The coating is just for colour", "The colour helps, but the main job is insulation."]], x: "The insulating coating stops electricity escaping." },
        { p: "Which object would let a bulb light if you placed it across a gap in a circuit?", a: "A metal key", w: [["A plastic comb", "Plastic is an insulator."], ["A pencil eraser", "Rubber is an insulator."]], x: "Metal conducts, so it closes the gap." },
      ],
    },
  ],
};

const DECIMALS: ChapterSpec = {
  id: "decimals",
  number: "203",
  title: "The Case of the Wrong Change",
  topic: "Decimals and place value",
  subject: "maths",
  grade: 6,
  tagline: "Read, compare and order decimals by knowing what each digit is worth.",
  hook: "A shopkeeper insists that 0.5 is smaller than 0.45 because 5 is smaller than 45. A customer has been given the wrong change. Who is right?",
  goal: "Use place value to read, compare and order decimals.",
  learn: ["Name the value of each digit after the decimal point", "Compare decimals by place value", "Write tenths and hundredths as decimals"],
  lessons: [
    {
      id: "decimal-place-value",
      title: "Decimals and place value",
      teaser: "Each place after the point is ten times smaller.",
      question: "Which is bigger, 0.5 or 0.45? How can you be sure?",
      goals: ["Name the tenths, hundredths and thousandths places", "Compare and order decimals using place value", "Write fractions with denominators of 10 and 100 as decimals"],
      hint: "Compare the tenths digit first. Which number has more tenths?",
      walk: "0.5 has 5 tenths. 0.45 has 4 tenths and 5 hundredths. Compare the tenths first: 5 tenths is more than 4 tenths, so 0.5 is bigger. You can check by writing 0.5 as 0.50: 50 hundredths is more than 45 hundredths.",
      summary: [
        "After the decimal point, the places are tenths, hundredths, thousandths. Each place is worth ten times less than the one to its left.",
        "To compare decimals, line up the points and compare digit by digit from the left. More digits does not mean bigger.",
      ],
      explain: [
        p("Decimals let us write numbers that are between whole numbers, such as £2.75 or 1.5 km."),
        h("What each digit is worth"),
        p("In 3.47, the 3 is 3 ones, the 4 is 4 tenths and the 7 is 7 hundredths. So 3.47 = 3 + 4/10 + 7/100."),
        list("1 tenth = 1/10 = 0.1", "1 hundredth = 1/100 = 0.01", "1 thousandth = 1/1000 = 0.001"),
        tip("Key idea", "Each place to the right is worth ten times less. 10 hundredths make 1 tenth."),
        h("Comparing decimals"),
        p("Line up the decimal points. Compare the digits from the left, place by place. The first place where they differ decides."),
        p("A common mistake is to think 0.45 is bigger than 0.5 because 45 is bigger than 5. But 0.5 is 5 tenths, and 0.45 is only 4 tenths and a bit. Adding a zero helps: 0.5 = 0.50, and 50 hundredths beats 45 hundredths."),
        h("Ordering"),
        p("To put 0.3, 0.29 and 0.305 in order, write them with the same number of places: 0.300, 0.290, 0.305. Now order them: 0.29, 0.3, 0.305."),
      ],
      tryIt: [
        h("Sort the price tags"),
        p("Three items cost £1.6, £1.06 and £1.60."),
        list("£1.6 and £1.60 are the same amount: 1 pound and 6 tenths (60 pence).", "£1.06 is 1 pound and 6 hundredths (6 pence).", "So £1.06 is the cheapest, and the other two are equal."),
        p("Challenge: write 0.7, 0.07 and 0.71 from smallest to largest. (0.07, 0.7, 0.71.)"),
      ],
      practice: [
        { p: "What is the value of the 8 in 2.38?", a: "8 hundredths", w: [["8 tenths", "The tenths digit is 3. The 8 is one place further right."], ["8 ones", "The ones digit is 2."]], x: "In 2.38, 3 is in the tenths place and 8 in the hundredths place." },
        { p: "Write 7/10 as a decimal.", a: "0.7", w: [["0.07", "That is 7 hundredths."], ["7.10", "7/10 is less than 1, so it starts with 0."]], x: "7 tenths is written 0.7." },
      ],
      quiz: [
        { p: "Which is bigger: 0.5 or 0.45?", a: "0.5", w: [["0.45", "0.45 has 4 tenths; 0.5 has 5 tenths, which is more."], ["They are equal", "0.5 = 0.50, which is more than 0.45."]], x: "Compare tenths first: 5 tenths beats 4 tenths." },
        { p: "Three statements about decimals. Which is true?", a: "0.3 and 0.30 are the same number.", w: [["A decimal with more digits is always bigger.", "0.299 has more digits than 0.3 but is smaller."], ["0.09 is bigger than 0.1.", "0.09 is 9 hundredths; 0.1 is 10 hundredths."]], x: "A zero on the end after the point does not change the value.", lineup: true },
        { p: "Which list is in order from smallest to largest?", a: "0.29, 0.3, 0.305", w: [["0.3, 0.29, 0.305", "0.29 is smaller than 0.3."], ["0.305, 0.3, 0.29", "That is largest to smallest."]], x: "As thousandths: 0.290, 0.300, 0.305." },
      ],
      check: [
        { p: "How many hundredths make one tenth?", a: "10", w: [["100", "100 hundredths make one whole."], ["1", "One hundredth is ten times smaller than one tenth."]], x: "Each place is worth ten times the one to its right." },
        { p: "Write 3 + 4/10 + 2/100 as a decimal.", a: "3.42", w: [["3.24", "The tenths digit is 4 and the hundredths digit is 2."], ["34.2", "3 is the ones digit, not the tens."]], x: "3 ones, 4 tenths and 2 hundredths make 3.42." },
      ],
    },
  ],
};

const ANGLES: ChapterSpec = {
  id: "angles",
  number: "204",
  title: "The Case of the Bent Signpost",
  topic: "Measuring and naming angles",
  subject: "maths",
  grade: 6,
  tagline: "Measure angles with a protractor and name them by size.",
  hook: "After a storm, a signpost points the wrong way. The map says the path turns through 120 degrees, but the sign shows something else. Measure it to find out.",
  goal: "Measure angles with a protractor, name them by size, and use the facts that angles on a line make 180° and around a point make 360°.",
  learn: ["Name acute, right, obtuse and reflex angles", "Measure an angle with a protractor", "Use angles on a straight line and around a point"],
  lessons: [
    {
      id: "measure-angles",
      title: "Measuring and naming angles",
      teaser: "An angle measures a turn, in degrees.",
      question: "A path turns off a straight road at 65°. What is the angle on the other side of the turn?",
      goals: ["Name angles as acute, right, obtuse or reflex", "Read an angle on a protractor from the correct zero", "Use the fact that angles on a straight line add up to 180°"],
      hint: "A straight road is a straight line. Angles on a straight line add up to 180°.",
      walk: "The two angles sit side by side on the straight road, so they add up to 180°. 180° − 65° = 115°. The angle on the other side is 115°, which is obtuse.",
      summary: [
        "Angles measure turn in degrees. Acute is less than 90°, right is 90°, obtuse is between 90° and 180°, reflex is more than 180°.",
        "Angles on a straight line add up to 180°. Angles around a point add up to 360°.",
      ],
      explain: [
        p("An angle measures how much something turns. We measure angles in degrees (°). A full turn is 360°."),
        h("Names for angles"),
        list("Acute: less than 90°.", "Right angle: exactly 90°, like the corner of a page. It is marked with a small square.", "Obtuse: more than 90° but less than 180°.", "Straight angle: exactly 180°.", "Reflex: more than 180° but less than 360°."),
        h("Using a protractor"),
        list(
          "Put the centre of the protractor exactly on the point (vertex) of the angle.",
          "Line up the zero line with one arm of the angle.",
          "Follow the scale that starts at 0 on that arm, and read where the other arm crosses it.",
        ),
        tip("Key idea", "A protractor has two scales. Always start from the 0 on the arm you lined up. Check: if the angle looks acute, your answer must be under 90°."),
        h("Angle facts"),
        p("Angles on a straight line add up to 180°. Angles all the way around a point add up to 360°. These let you work out missing angles without measuring."),
      ],
      tryIt: [
        h("Find the missing angles"),
        list(
          "Two angles on a straight line: one is 140°. The other is 180° − 140° = 40°.",
          "Three angles around a point: 100°, 150° and a missing one. The missing angle is 360° − 100° − 150° = 110°.",
          "The hands of a clock at 3 o’clock make a right angle: 90°.",
        ),
        p("Challenge: what angle do the hands of a clock make at 6 o’clock? (180°, a straight angle.)"),
      ],
      practice: [
        { p: "What type of angle is 125°?", a: "Obtuse", w: [["Acute", "Acute angles are less than 90°."], ["Reflex", "Reflex angles are more than 180°."]], x: "125° is between 90° and 180°, so it is obtuse." },
        { p: "Two angles on a straight line. One is 70°. What is the other?", a: "110°", w: [["290°", "That would be the rest of a full turn, 360°."], ["20°", "That would make 90°, not 180°."]], x: "180° − 70° = 110°." },
      ],
      quiz: [
        { p: "A path turns off a straight road at 65°. What is the angle on the other side?", a: "115°", w: [["25°", "That would add to 90°, but a straight line is 180°."], ["295°", "That would add to 360°, a full turn."]], x: "Angles on a straight line add to 180°: 180° − 65° = 115°." },
        { p: "Three statements about measuring with a protractor. Which is true?", a: "You put the centre on the vertex and start from the zero on one arm.", w: [["You can start from any number on the scale.", "Start from 0 on the arm you lined up, or the reading will be wrong."], ["The protractor’s edge goes on the vertex.", "The centre point goes on the vertex."]], x: "Centre on the vertex, zero on one arm, read the matching scale.", lineup: true },
        { p: "Three angles meet at a point: 90°, 120° and one more. What is the missing angle?", a: "150°", w: [["210°", "90 + 120 + 210 = 420°, more than a full turn."], ["30°", "That would make 240°, not 360°."]], x: "360° − 90° − 120° = 150°." },
      ],
      check: [
        { p: "Which angle is reflex?", a: "250°", w: [["90°", "That is a right angle."], ["170°", "That is obtuse, less than 180°."]], x: "Reflex angles are between 180° and 360°." },
        { p: "How many degrees are in a full turn?", a: "360°", w: [["180°", "That is a half turn, a straight line."], ["100°", "A full turn is 360°."]], x: "A full turn is 360°." },
      ],
    },
  ],
};

const MESOPOTAMIA: ChapterSpec = {
  id: "mesopotamia",
  number: "205",
  title: "The Case of the Clay Tablet",
  topic: "Mesopotamia: the first cities",
  subject: "history",
  grade: 6,
  tagline: "Discover the land between two rivers, where some of the first cities and the first writing appeared.",
  hook: "Archaeologists dig up a small clay tablet covered in wedge-shaped marks. It turns out to be a receipt for barley, more than 4,000 years old. Who wrote it, and why?",
  goal: "Explain why some of the first cities grew in Mesopotamia and why writing was invented there.",
  learn: ["Locate Mesopotamia between the Tigris and Euphrates", "Explain how farming surpluses led to cities", "Describe cuneiform and what it was used for"],
  lessons: [
    {
      id: "first-cities",
      title: "Mesopotamia: the first cities",
      teaser: "Rivers, farming and the first writing.",
      question: "Why would people in the first cities need to invent writing?",
      goals: ["Locate Mesopotamia and its two rivers", "Explain how extra food allowed cities and jobs to grow", "Describe cuneiform writing and why it was first used"],
      hint: "Think about a city with stores of grain, traders and taxes. What would people need to keep track of?",
      walk: "Farming by the rivers produced extra food. That let cities grow, with traders, priests and rulers. They needed to record who owned what, who had paid taxes and what had been traded. Memory was not enough, so scribes pressed marks into clay: the first writing, cuneiform, began as record keeping.",
      summary: [
        "Mesopotamia means “land between rivers”: the Tigris and Euphrates, in what is now mainly Iraq.",
        "Farming surpluses let cities such as Uruk and Ur grow. Writing (cuneiform) began there, first to keep records.",
      ],
      explain: [
        p("Mesopotamia is a Greek name meaning “the land between the rivers”. The rivers are the Tigris and the Euphrates. Today most of this land is in Iraq, with parts in Syria and Turkey."),
        h("From farms to cities"),
        p("The rivers flooded and left rich soil. Farmers dug canals to bring water to their fields. They grew more food than they needed: a surplus. Because not everyone had to farm, some people could become potters, builders, traders, priests or soldiers."),
        p("By about 3500 BCE, some villages had grown into cities. Uruk may have had tens of thousands of people. Each city was a city-state with its own ruler and a great temple called a ziggurat."),
        h("The invention of writing"),
        p("With so much food, trade and taxes to manage, people needed records. Scribes pressed a cut reed into wet clay to make wedge-shaped marks. This writing is called cuneiform, from the Latin word for “wedge”."),
        tip("Key idea", "Writing was not invented for stories at first. It began as a way to keep accounts: grain, animals, payments."),
        p("Later, cuneiform was used for laws, letters and stories, such as the Epic of Gilgamesh. King Hammurabi of Babylon had a famous set of laws carved in stone around 1750 BCE."),
      ],
      tryIt: [
        h("Read the evidence"),
        p("A tablet shows a picture-like sign for “barley”, five marks and the name of a temple."),
        list("What it probably records: five measures of barley given to, or owed to, the temple.", "What it tells historians: the temple stored food, and people kept careful accounts.", "What it does not tell us: who ate the barley, or how they felt about it."),
        p("Detective question: why is clay a useful material for historians? (Baked or dried clay tablets survive for thousands of years.)"),
      ],
      practice: [
        { p: "Which two rivers flow through Mesopotamia?", a: "The Tigris and the Euphrates", w: [["The Nile and the Amazon", "The Nile is in Egypt, and the Amazon is in South America."], ["The Indus and the Ganges", "Those rivers are in South Asia."]], x: "Mesopotamia lies between the Tigris and Euphrates." },
        { p: "What is cuneiform?", a: "Wedge-shaped writing pressed into clay", w: [["A type of farming tool", "Cuneiform is a writing system."], ["A Mesopotamian temple", "The great temples were called ziggurats."]], x: "Scribes pressed a reed into clay to make wedge-shaped marks." },
      ],
      quiz: [
        { p: "Why could cities grow in Mesopotamia?", a: "Farmers produced extra food, so some people could do other jobs", w: [["Everyone stopped farming at once", "Cities depended on farmers growing a surplus."], ["The land was a desert with no water", "The rivers and canals made farming possible."]], x: "A food surplus freed people to become builders, traders and priests." },
        { p: "Three statements about early writing in Mesopotamia. Which is true?", a: "It was first used mostly to keep records such as grain and taxes.", w: [["It was first used only to write long stories.", "Stories came later. Early tablets are mostly accounts."], ["It was written with ink on paper.", "Mesopotamian scribes wrote on clay tablets."]], x: "The earliest writing kept track of goods and payments.", lineup: true },
        { p: "What was a ziggurat?", a: "A large stepped temple at the centre of a city", w: [["A clay writing tablet", "Tablets are what scribes wrote on."], ["A river boat", "A ziggurat was a temple building."]], x: "Each city-state had a ziggurat for its god." },
      ],
      check: [
        { p: "What does “Mesopotamia” mean?", a: "The land between the rivers", w: [["The land of the pharaohs", "That describes Egypt."], ["The city of kings", "The name comes from Greek words for “between” and “river”."]], x: "Meso means middle, potamos means river." },
        { p: "Which ruler of Babylon is famous for a written set of laws?", a: "Hammurabi", w: [["Julius Caesar", "Caesar was a Roman leader, much later."], ["Tutankhamun", "Tutankhamun was an Egyptian pharaoh."]], x: "Hammurabi’s laws were carved in stone around 1750 BCE." },
      ],
    },
  ],
};

const INDUS: ChapterSpec = {
  id: "indus-valley",
  number: "206",
  title: "The Case of the Silent Seal",
  topic: "Cities of the Indus Valley",
  subject: "history",
  grade: 6,
  tagline: "Explore planned cities with drains and baths, and a script nobody can read yet.",
  hook: "A tiny stone seal shows an animal and a row of symbols. It is about 4,500 years old, and no one alive can read it. What can the cities themselves tell us?",
  goal: "Describe the cities of the Indus Valley Civilisation and explain how historians learn about a people whose writing cannot be read.",
  learn: ["Locate the Indus Valley Civilisation", "Describe the planning of cities such as Mohenjo-daro and Harappa", "Explain how archaeologists use objects as evidence"],
  lessons: [
    {
      id: "indus-cities",
      title: "Cities of the Indus Valley",
      teaser: "Grid streets, covered drains and a mystery script.",
      question: "How can historians learn about the Indus Valley people if nobody can read their writing?",
      goals: ["Locate the Indus Valley Civilisation on a map", "Describe how cities like Mohenjo-daro were planned", "Explain how objects such as seals and weights are used as evidence"],
      hint: "If you cannot read the words, what else did the people leave behind?",
      walk: "Archaeologists study what the people built and used: street plans, drains, houses, the Great Bath, standard weights and seals. Planned streets and drains suggest strong organisation. Matching weights suggest controlled trade. Seals found far away, in Mesopotamia, show long-distance trade.",
      summary: [
        "The Indus Valley Civilisation flourished from about 2600 to 1900 BCE in what is now Pakistan and north-west India.",
        "Its cities had grid streets, covered drains and standard brick sizes. Its script is still undeciphered, so evidence comes from objects and buildings.",
      ],
      explain: [
        p("Around the same time as ancient Egypt and Mesopotamia, another great civilisation grew along the River Indus and its neighbouring rivers. It is called the Indus Valley or Harappan Civilisation, after Harappa, one of its cities."),
        h("Planned cities"),
        list(
          "Streets were laid out in a grid, crossing at right angles.",
          "Houses were built of baked bricks of standard sizes, in the same proportions across many cities.",
          "Many houses had bathrooms, and waste water ran into covered drains along the streets.",
          "Mohenjo-daro had a large public pool, now called the Great Bath.",
        ),
        tip("Key idea", "Careful planning across many cities suggests shared rules and good organisation, even though we do not know who ruled."),
        h("Trade and evidence"),
        p("People used standard stone weights, which suggests that trade was measured fairly. Small carved stone seals show animals and symbols. Some seals have been found in Mesopotamia, so the two regions traded."),
        h("A mystery"),
        p("More than 4,000 short inscriptions survive, but the script has not been deciphered. Historians are still not sure why the cities declined after about 1900 BCE. Changes in rivers and climate are among the likely reasons."),
      ],
      tryIt: [
        h("Be the archaeologist"),
        p("For each find, say what it suggests."),
        list(
          "Covered drains in every street: the city planned for public health and cleanliness.",
          "Bricks of the same proportions in different cities: shared standards across a wide area.",
          "An Indus seal found in Mesopotamia: trade over long distances.",
        ),
        p("Careful detectives say “suggests” rather than “proves”. Without readable writing, some questions stay open."),
      ],
      practice: [
        { p: "Where was the Indus Valley Civilisation?", a: "In what is now Pakistan and north-west India", w: [["In Egypt, beside the Nile", "That was ancient Egypt."], ["In southern Italy", "That was part of the Roman world, much later."]], x: "It grew along the River Indus and nearby rivers." },
        { p: "Which feature was common in Indus cities?", a: "Covered drains along the streets", w: [["Pyramids for burying kings", "Pyramids are linked with Egypt."], ["Wooden castles", "Indus cities were built mostly of baked brick."]], x: "Many houses drained into covered street drains." },
      ],
      quiz: [
        { p: "Why do historians rely on objects to study the Indus Valley Civilisation?", a: "Its writing has not been deciphered", w: [["It left no objects behind", "It left many objects, such as seals, weights and buildings."], ["Its writing tells us everything already", "Nobody can read the script yet."]], x: "With an unread script, buildings and objects are the main evidence." },
        { p: "Three statements about Indus cities. Which is true?", a: "Streets were often laid out in a grid pattern.", w: [["Streets were random, with no plan.", "Excavations show grid-like planning."], ["The cities had no houses, only temples.", "Archaeologists have found many houses."]], x: "Grid streets and standard bricks show planning.", lineup: true },
        { p: "An Indus seal is found in Mesopotamia. What does this suggest?", a: "The two regions traded with each other", w: [["The Indus people invented cuneiform", "The seal shows contact, not who invented which script."], ["Mesopotamia ruled the Indus Valley", "One object is not evidence of rule."]], x: "Objects found far from home suggest trade links." },
      ],
      check: [
        { p: "What is the Great Bath?", a: "A large public pool in Mohenjo-daro", w: [["A river", "It is a built structure in the city."], ["A royal tomb", "It is a pool, not a tomb."]], x: "It may have been used for bathing or ceremonies." },
        { p: "What do standard weights suggest about Indus trade?", a: "Goods were measured in a shared, fair way", w: [["There was no trade at all", "Weights were used for trade."], ["Everyone used money coins", "Coins came much later. Weights measured goods."]], x: "Matching weights across cities suggest controlled, fair trading." },
      ],
    },
  ],
};

const RIVERS: ChapterSpec = {
  id: "rivers",
  number: "207",
  title: "The Case of the Wandering River",
  topic: "A river's journey",
  subject: "geography",
  grade: 6,
  tagline: "Follow a river from its source to the sea and see how it shapes the land.",
  hook: "An old map shows a river running past a village church. Today the river is 200 metres away. Rivers move. How, and why?",
  goal: "Describe how a river and its valley change from source to mouth, and explain erosion, transport and deposition.",
  learn: ["Name the parts of a river", "Describe the upper, middle and lower course", "Explain erosion, transportation and deposition"],
  lessons: [
    {
      id: "river-journey",
      title: "A river's journey",
      teaser: "From a mountain stream to a wide estuary.",
      question: "Why is a river narrow and fast in the mountains, but wide and slow near the sea?",
      goals: ["Name the source, tributary, confluence, meander and mouth", "Describe how a river changes from its upper to lower course", "Explain erosion, transportation and deposition"],
      hint: "Think about the slope of the land and how much water joins the river along the way.",
      walk: "Near the source the land is steep, so the water cuts down into the land and makes a narrow V-shaped valley. Further on, tributaries add more water, the slope gets gentler, and the river erodes sideways, making meanders and a wider valley. Near the mouth the land is flat, the river slows and drops (deposits) the sediment it carries, making floodplains and wide channels.",
      summary: [
        "A river flows from its source (often in hills) to its mouth (usually the sea). Tributaries join it at confluences.",
        "Rivers erode, transport and deposit material. Upper courses are steep and narrow; lower courses are wide, flat and slow.",
      ],
      explain: [
        p("Every river begins at a source, such as a spring, a lake or melting snow in the hills. It ends at its mouth, where it flows into the sea, a lake or another river."),
        h("Parts of a river"),
        list(
          "Tributary: a smaller river or stream that joins a bigger one.",
          "Confluence: the place where two rivers meet.",
          "Meander: a large bend in a river.",
          "Floodplain: flat land beside a river that floods when the river is high.",
          "Estuary: the wide, tidal mouth of a river where it meets the sea.",
        ),
        h("Three jobs a river does"),
        list(
          "Erosion: the water and the stones it carries wear away the river bed and banks.",
          "Transportation: the river carries material, from tiny bits of mud to large boulders.",
          "Deposition: when the river slows down, it drops the material it is carrying.",
        ),
        h("Upper, middle and lower course"),
        p("In the upper course, the river is small and the land is steep. It erodes downwards, making steep V-shaped valleys and waterfalls. In the middle course, the river is bigger and erodes sideways, forming meanders. In the lower course, the land is flat; the river is wide and deep and deposits sediment on floodplains."),
        tip("Key idea", "A river is not just water moving. It is constantly reshaping the land, which is why rivers can move their course over time."),
      ],
      tryIt: [
        h("Follow the River Severn"),
        p("The Severn is the longest river in the UK. Its source is on a Welsh mountain, Plynlimon. It ends in a wide estuary in the Bristol Channel."),
        list("Near the source: narrow, fast, rocky, steep valley.", "Middle: meanders and a wider valley.", "Near the mouth: very wide, muddy, tidal."),
        p("Case question: how did the river move away from the church? (Over many years, it eroded the outside of a meander and deposited on the inside, so the bend shifted.)"),
      ],
      practice: [
        { p: "What is the source of a river?", a: "The place where it begins", w: [["The place where it meets the sea", "That is the mouth."], ["A big bend in the river", "That is a meander."]], x: "The source is the start of a river." },
        { p: "What is a tributary?", a: "A smaller river that joins a larger one", w: [["The flat land beside a river", "That is a floodplain."], ["The end of a river", "That is the mouth."]], x: "Tributaries add water to the main river." },
      ],
      quiz: [
        { p: "Why does a river deposit material?", a: "It slows down and no longer has the energy to carry it", w: [["It speeds up on a steep slope", "Speeding up gives more energy, so it carries more, not less."], ["The material dissolves", "Deposition means dropping the material, not dissolving it."]], x: "Slower water has less energy, so it drops sediment." },
        { p: "Three statements about the upper course of a river. Which is true?", a: "The land is steep and the river erodes downwards.", w: [["The river is at its widest.", "Rivers are usually widest near the mouth."], ["It is mostly flat floodplain.", "Floodplains are typical of the lower course."]], x: "Steep upper courses form V-shaped valleys.", lineup: true },
        { p: "Where two rivers meet is called a...", a: "Confluence", w: [["Meander", "A meander is a bend."], ["Estuary", "An estuary is a tidal river mouth."]], x: "A confluence is a meeting point of rivers." },
      ],
      check: [
        { p: "What is a meander?", a: "A large bend in a river", w: [["A waterfall", "A waterfall is where water drops over a step of rock."], ["The start of a river", "That is the source."]], x: "Meanders form as rivers erode sideways." },
        { p: "Which job is a river doing when it carries pebbles downstream?", a: "Transportation", w: [["Deposition", "Deposition is dropping material."], ["Evaporation", "Evaporation is part of the water cycle, not a river process."]], x: "Carrying material is transportation." },
      ],
    },
  ],
};

const SETTLEMENTS: ChapterSpec = {
  id: "settlements",
  number: "208",
  title: "The Case of the Hilltop Village",
  topic: "Why settlements grow where they do",
  subject: "geography",
  grade: 6,
  tagline: "Work out why people chose to build villages, towns and cities in particular places.",
  hook: "A village sits on a hill beside a river bend, with a ruined castle at the top. Hundreds of years ago, someone chose this spot. What were they thinking?",
  goal: "Explain how site factors and situation influence where settlements grow, and describe a settlement hierarchy.",
  learn: ["Explain the difference between site and situation", "Name common site factors", "Order settlements from hamlet to city"],
  lessons: [
    {
      id: "site-situation",
      title: "Why settlements grow where they do",
      teaser: "Water, shelter, defence and a good crossing point.",
      question: "Why would early settlers choose a hill beside a river bend for a village?",
      goals: ["Say what a settlement is", "Explain site factors such as water supply, defence and shelter", "Describe how a settlement’s situation helps it grow"],
      hint: "Think about what people needed long ago: water, safety, food and a way to travel.",
      walk: "The river gave fresh water and fish. The hill was easy to defend and was above the floods. The river bend protected the village on three sides. If there was a crossing point nearby, traders would pass through, helping the village grow.",
      summary: [
        "A settlement is a place where people live. Its site is the land it is built on; its situation is where it is compared with places around it.",
        "Good sites had water, flat dry land, shelter, defence and resources. Good situations, such as crossroads or bridges, helped settlements grow.",
      ],
      explain: [
        p("A settlement is any place where people live, from a few houses to a huge city."),
        h("Site: the land itself"),
        list(
          "Water supply: a river or spring for drinking, cooking and farming. A wet-point site.",
          "Dry point: slightly higher land, safe from floods.",
          "Defence: a hill or a river bend that made attack harder.",
          "Shelter: protection from strong winds, often in a valley.",
          "Resources: wood for fuel and building, good soil for farming.",
        ),
        h("Situation: the place around it"),
        p("Situation is where the settlement sits in relation to roads, rivers, other towns and the coast. A town where roads meet, or where a river can be crossed (a bridging point), attracts traders and markets, and can grow into a big town."),
        tip("Key idea", "Site explains why people first settled. Situation helps explain why some settlements grew much bigger than others."),
        h("Settlement hierarchy"),
        p("Settlements can be ordered by size and services: hamlet (a few houses), village, town, city, and the largest, a conurbation or megacity. Bigger settlements usually offer more services, such as hospitals and universities."),
      ],
      tryIt: [
        h("Read the place names"),
        p("Many English place names record a site factor."),
        list("“-ford” (Oxford, Bradford): a shallow crossing point of a river.", "“-bridge” (Cambridge): a bridging point.", "“-burgh” or “-bury” (Edinburgh, Canterbury): a fortified or defended place."),
        p("Your turn: find a town near you and suggest one site factor and one situation factor that helped it grow."),
      ],
      practice: [
        { p: "What does a settlement’s “site” mean?", a: "The actual land it is built on", w: [["Its position compared with other places", "That is its situation."], ["How many people live there", "That is its population."]], x: "Site is the physical land, such as a hill or valley." },
        { p: "Which is the smallest type of settlement?", a: "Hamlet", w: [["Town", "Towns are larger than villages and hamlets."], ["City", "Cities are among the largest settlements."]], x: "A hamlet is just a few houses." },
      ],
      quiz: [
        { p: "Why was a hilltop a good site long ago?", a: "It was easy to defend and safe from floods", w: [["It was closest to the river water", "Hilltops are higher and further from water, which is a disadvantage."], ["It was always the warmest place", "Hilltops are often more exposed and windy."]], x: "Height gave defence and a dry point." },
        { p: "Three statements about a bridging point. Which is true?", a: "It is a place where a river can be crossed, so routes and trade meet there.", w: [["It is a high hill used for defence.", "That is a defensive site."], ["It is a place with no roads.", "Bridging points attract roads."]], x: "Crossings bring travellers and markets.", lineup: true },
        { p: "Which place name suggests a river crossing?", a: "Oxford", w: [["Edinburgh", "“-burgh” suggests a fortified place."], ["Newcastle", "This suggests a castle."]], x: "“-ford” means a shallow river crossing." },
      ],
      check: [
        { p: "Which is a situation factor?", a: "Being where two main roads meet", w: [["Being on dry land above floods", "That is a site factor about the land itself."], ["Having a spring for water", "That is a site factor too."]], x: "Situation is about connections with the wider area." },
        { p: "Why do bigger settlements usually have more services?", a: "More people use them, so it is worth providing them", w: [["Big settlements are always older", "Age does not decide services."], ["Small settlements are not allowed services", "There is no rule. It is about how many people need them."]], x: "Services need enough users to be worth running." },
      ],
    },
  ],
};

export const EXTRA_G6: ChapterSpec[] = [FOOD_CHAINS, CIRCUITS, DECIMALS, ANGLES, MESOPOTAMIA, INDUS, RIVERS, SETTLEMENTS];
