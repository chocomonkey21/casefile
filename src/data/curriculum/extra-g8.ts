import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  Grade 8: two more chapters for each subject, one lesson each, so every grade and subject has three chapters.
  ASSUMPTION: topics and depth were chosen by the project team for a typical Grade 8 class. They are not matched to an
  official curriculum. Videos for these lessons are in data/videos-curated.ts.
*/

const HEAT: ChapterSpec = {
  id: "heat-transfer",
  number: "221",
  title: "The Case of the Cooling Cup",
  topic: "Heat transfer",
  subject: "science",
  grade: 8,
  tagline: "Find out how heat moves by conduction, convection and radiation.",
  hook: "Two cups of hot chocolate are poured at the same time. One is in a thin metal mug, the other in a thick foam cup with a lid. Ten minutes later, one is barely warm. Which one, and why?",
  goal: "Explain conduction, convection and radiation, and use them to explain how to keep things hot or cold.",
  learn: ["Explain conduction in terms of particles", "Explain convection currents in liquids and gases", "Explain radiation and how surfaces affect it"],
  lessons: [
    {
      id: "conduction-convection",
      title: "Heat transfer",
      teaser: "Conduction, convection and radiation.",
      question: "Why does hot chocolate in a thin metal mug cool faster than in a thick foam cup with a lid?",
      goals: ["Explain conduction and name good conductors and insulators", "Explain how convection currents form", "Explain radiation and how colour and shine affect it"],
      hint: "Think about each way heat can escape: through the cup walls, out of the open top, and as infrared radiation.",
      walk: "Metal is a good conductor, so heat passes quickly through the mug walls to the air. Foam traps air, which is a poor conductor, so it insulates. An open top lets warm air rise away by convection and lets water evaporate; a lid stops this. So the metal mug cools faster.",
      summary: [
        "Heat always moves from hotter places to cooler places, by conduction, convection or radiation.",
        "Conduction passes energy through particles touching (best in metals). Convection carries energy in moving liquids and gases. Radiation is infrared waves and needs no particles.",
      ],
      explain: [
        p("Heat is energy that moves from a hotter object to a cooler one. It keeps moving until both are the same temperature. There are three ways it can travel."),
        h("Conduction"),
        p("In a solid, particles vibrate. When one end is heated, its particles vibrate more and bump into their neighbours, passing the energy along. Metals are especially good conductors because they also have free electrons that carry energy quickly. Materials that conduct poorly, such as wood, plastic, wool and trapped air, are insulators."),
        h("Convection"),
        p("In liquids and gases, particles can move. Heated fluid expands, becomes less dense and rises. Cooler, denser fluid sinks to take its place. This circulation is a convection current. It is why a radiator can heat a whole room, and why the top of a bath is warmer."),
        h("Radiation"),
        p("All objects give out infrared radiation, and hotter objects give out more. Radiation is a wave, so it can travel through empty space. This is how heat from the Sun reaches Earth. Dark, dull surfaces absorb and emit radiation well. Light, shiny surfaces reflect it."),
        tip("Key idea", "To keep something hot, block all three: insulate against conduction, cover it against convection, and use shiny surfaces against radiation. A vacuum flask does all three."),
      ],
      tryIt: [
        h("Explain the everyday examples"),
        list(
          "A metal spoon in hot soup gets hot at the handle: conduction.",
          "Hot air balloons rise: the heated air is less dense, as in convection.",
          "You feel warm in sunshine on a cold day: radiation, travelling through space.",
          "Emergency blankets are shiny: they reflect your body’s radiation back to you.",
        ),
        p("Detective question: why do pans often have plastic or wooden handles? (They are insulators, so the handle stays cool.)"),
      ],
      practice: [
        { p: "Which way of heat transfer can travel through empty space?", a: "Radiation", w: [["Conduction", "Conduction needs particles touching."], ["Convection", "Convection needs a moving liquid or gas."]], x: "Infrared radiation is a wave and needs no particles." },
        { p: "Which material is the best conductor of heat?", a: "Copper", w: [["Wool", "Wool traps air and is an insulator."], ["Plastic", "Plastic is an insulator."]], x: "Metals such as copper conduct heat well." },
      ],
      quiz: [
        { p: "Why does warm air rise?", a: "It expands and becomes less dense than the cooler air around it", w: [["Heat is lighter than cold", "Heat is energy; it has no weight. The warm air is less dense."], ["Warm air has fewer particles in the whole room", "The particles spread out, so the warm air is less dense."]], x: "Less dense fluid rises; denser fluid sinks. This makes convection currents." },
        { p: "Three statements about radiation. Which is true?", a: "Dark, dull surfaces absorb more radiation than shiny ones.", w: [["Shiny surfaces absorb the most radiation.", "Shiny surfaces reflect radiation."], ["Radiation only travels through metals.", "Radiation can travel through space, with no material at all."]], x: "Black, dull surfaces are good absorbers and emitters.", lineup: true },
        { p: "Why does the foam cup keep drinks hot longer than a thin metal mug?", a: "Foam contains trapped air, so it is a poor conductor", w: [["Foam produces its own heat", "Foam does not make heat; it slows heat loss."], ["Metal is an insulator", "Metal is a good conductor, so heat escapes quickly."]], x: "Trapped air in foam insulates against conduction." },
      ],
      check: [
        { p: "Heat always flows from...", a: "Hotter places to cooler places", w: [["Cooler places to hotter places", "Heat flows from hot to cold, never the other way on its own."], ["Bigger objects to smaller ones", "Temperature decides the direction, not size."]], x: "Energy moves until temperatures are equal." },
        { p: "How does heat from the Sun reach Earth?", a: "By radiation", w: [["By conduction through space", "Space has almost no particles for conduction."], ["By convection currents in space", "Convection needs a fluid."]], x: "Only radiation can cross the vacuum of space." },
      ],
    },
  ],
};

const DIGESTION: ChapterSpec = {
  id: "digestion",
  number: "222",
  title: "The Case of the Vanishing Lunch",
  topic: "The digestive system",
  subject: "science",
  grade: 8,
  tagline: "Follow a sandwich on its nine-metre journey through your body.",
  hook: "At 12 o’clock you eat a cheese sandwich. By the evening, most of it has disappeared into your blood. Where did it go, and what broke it down?",
  goal: "Describe the organs of the digestive system and explain how food is broken down and absorbed.",
  learn: ["Name the organs of the digestive system in order", "Explain the role of enzymes", "Explain how nutrients are absorbed in the small intestine"],
  lessons: [
    {
      id: "digestive-system",
      title: "The digestive system",
      teaser: "From mouth to small intestine: breaking food down so it can be used.",
      question: "How does a sandwich get from your plate into your blood?",
      goals: ["Name the main organs of the digestive system in order", "Explain how enzymes break large molecules into small ones", "Explain why the small intestine is good at absorbing nutrients"],
      hint: "Food has to be broken into molecules small enough to pass through the gut wall into the blood.",
      walk: "Teeth chew the sandwich and saliva starts digesting starch. The stomach churns it with acid and enzymes. In the small intestine, more enzymes break proteins, carbohydrates and fats into small molecules. These pass through the wall of the small intestine, which is lined with millions of villi, into the blood. The large intestine absorbs water.",
      summary: [
        "Digestion breaks large food molecules into small soluble ones. Enzymes speed this up. Order: mouth, oesophagus, stomach, small intestine, large intestine.",
        "Small molecules are absorbed into the blood through the small intestine, whose villi give a huge surface area. The large intestine absorbs water.",
      ],
      explain: [
        p("Food contains large molecules, such as starch, proteins and fats. They are too big to pass into your blood. Digestion breaks them into small molecules that can be absorbed."),
        h("The journey"),
        list(
          "Mouth: teeth break food into smaller pieces. Saliva contains an enzyme (amylase) that starts breaking starch into sugar.",
          "Oesophagus: a muscular tube that pushes food to the stomach by waves of muscle contraction.",
          "Stomach: churns food with acid and enzymes. The acid also kills many bacteria.",
          "Small intestine: about six metres long. Enzymes from the pancreas and the intestine finish digestion, and bile from the liver helps break up fats. Nutrients are absorbed here.",
          "Large intestine: absorbs water. What is left leaves the body as faeces.",
        ),
        h("Enzymes"),
        p("Enzymes are proteins that act as biological catalysts: they speed up reactions without being used up. Each enzyme works on one kind of molecule. Carbohydrases break carbohydrates into sugars, proteases break proteins into amino acids, and lipases break fats into fatty acids and glycerol."),
        tip("Key idea", "The small intestine is lined with villi: tiny finger-like folds that give a huge surface area, so nutrients are absorbed quickly into the blood."),
      ],
      tryIt: [
        h("Follow the sandwich"),
        list(
          "Bread (starch): starts being digested in the mouth by amylase, finished in the small intestine into glucose.",
          "Cheese (protein and fat): proteins digested by proteases in the stomach and small intestine; fats by lipases, helped by bile.",
          "Water: most is absorbed in the small and large intestines.",
        ),
        p("Try it: chew a piece of plain bread for a minute without swallowing. It may start to taste slightly sweet as amylase turns starch into sugar."),
      ],
      practice: [
        { p: "Where are most nutrients absorbed into the blood?", a: "The small intestine", w: [["The stomach", "The stomach digests food but absorbs few nutrients."], ["The mouth", "The mouth starts digestion but absorbs very little."]], x: "Villi in the small intestine absorb nutrients." },
        { p: "What does an enzyme do?", a: "Speeds up a chemical reaction without being used up", w: [["Adds energy to food", "Enzymes speed up reactions; they are not food energy."], ["Absorbs water", "Water is absorbed by the intestines."]], x: "Enzymes are biological catalysts." },
      ],
      quiz: [
        { p: "What is the correct order of the digestive system?", a: "Mouth, oesophagus, stomach, small intestine, large intestine", w: [["Mouth, stomach, oesophagus, large intestine, small intestine", "The oesophagus comes before the stomach, and the small intestine before the large."], ["Stomach, mouth, small intestine, oesophagus, large intestine", "Food starts in the mouth."]], x: "Food travels in that order." },
        { p: "Three statements about villi. Which is true?", a: "They give the small intestine a very large surface area.", w: [["They are found in the stomach and make acid.", "Villi line the small intestine."], ["They break down fats into fatty acids.", "That is the job of lipase enzymes."]], x: "More surface area means faster absorption.", lineup: true },
        { p: "What is the main job of the large intestine?", a: "Absorbing water", w: [["Making bile", "Bile is made in the liver."], ["Starting to digest starch", "That starts in the mouth."]], x: "The large intestine absorbs water from what is left." },
      ],
      check: [
        { p: "Which enzyme starts digesting starch in the mouth?", a: "Amylase", w: [["Lipase", "Lipase digests fats."], ["Protease", "Protease digests proteins."]], x: "Amylase in saliva breaks starch into sugar." },
        { p: "Why must food be digested before it can be used?", a: "Large molecules are too big to pass into the blood", w: [["Food is poisonous until digested", "Food is not poisonous; its molecules are just too large."], ["The body can only use liquids", "It is molecule size, not just being liquid."]], x: "Only small soluble molecules can be absorbed." },
      ],
    },
  ],
};

const PROBABILITY: ChapterSpec = {
  id: "probability",
  number: "223",
  title: "The Case of the Suspicious Dice",
  topic: "Probability basics",
  subject: "maths",
  grade: 8,
  tagline: "Measure chance with numbers, and test whether a dice is fair.",
  hook: "At the school fair, a stall’s dice lands on 6 far more often than you would expect. Is it bad luck, or is the dice loaded? Probability can help you decide.",
  goal: "Calculate probabilities of single events, use the 0 to 1 scale, and compare theoretical and experimental probability.",
  learn: ["Place events on the probability scale from 0 to 1", "Calculate the probability of an event", "Compare expected results with experimental results"],
  lessons: [
    {
      id: "probability-basics",
      title: "Probability basics",
      teaser: "Chance measured from 0 (impossible) to 1 (certain).",
      question: "A fair dice is rolled 60 times. About how many sixes would you expect? What if you got 30?",
      goals: ["Use the probability scale from 0 to 1", "Calculate probability as favourable outcomes divided by total outcomes", "Compare expected frequency with experimental results"],
      hint: "A fair dice has 6 equally likely outcomes, and only one of them is a six.",
      walk: "The probability of a six is 1/6. Expected sixes in 60 rolls: 60 × 1/6 = 10. Getting a few more or fewer than 10 is normal. Getting 30, three times as many, is very unlikely for a fair dice, so it suggests the dice may be biased.",
      summary: [
        "Probability measures how likely something is, from 0 (impossible) to 1 (certain). P(event) = number of favourable outcomes ÷ total number of equally likely outcomes.",
        "Expected frequency = probability × number of trials. Results vary, but large differences over many trials suggest bias.",
      ],
      explain: [
        p("Probability is a number that tells us how likely an event is. It can be written as a fraction, a decimal or a percentage."),
        h("The probability scale"),
        list("0 means impossible: rolling a 7 on a normal dice.", "1/2 or 0.5 means an even chance: a fair coin landing heads.", "1 means certain: rolling a number less than 7 on a dice."),
        h("Calculating a probability"),
        p("When all outcomes are equally likely: P(event) = number of ways it can happen ÷ total number of outcomes. For a fair dice, P(even number) = 3/6 = 1/2, because 2, 4 and 6 are even."),
        tip("Key idea", "The probabilities of all possible outcomes add up to 1. So P(not a six) = 1 − 1/6 = 5/6."),
        h("Experiments"),
        p("Experimental probability comes from doing trials: number of times it happened ÷ number of trials. The more trials you do, the closer the experimental probability usually gets to the theoretical one. Expected frequency = probability × number of trials."),
      ],
      tryIt: [
        h("A bag of counters"),
        p("A bag has 3 red, 5 blue and 2 green counters. One is picked at random."),
        list("P(red) = 3/10.", "P(blue) = 5/10 = 1/2.", "P(not green) = 1 − 2/10 = 8/10.", "P(yellow) = 0, because there are no yellow counters."),
        p("Challenge: if you pick a counter 50 times, putting it back each time, how many reds would you expect? (50 × 3/10 = 15.)"),
      ],
      practice: [
        { p: "What is the probability of getting heads with a fair coin?", a: "1/2", w: [["1", "That would mean heads is certain."], ["2", "Probabilities are never more than 1."]], x: "There are 2 equally likely outcomes, and 1 is heads." },
        { p: "Where on the probability scale is an impossible event?", a: "0", w: [["1", "1 means certain."], ["1/2", "1/2 means an even chance."]], x: "Impossible events have probability 0." },
      ],
      quiz: [
        { p: "A fair dice is rolled 60 times. How many sixes would you expect?", a: "10", w: [["6", "Expected frequency is 60 × 1/6."], ["30", "That would be half the rolls, far more than expected."]], x: "60 × 1/6 = 10." },
        { p: "Three statements about probability. Which is true?", a: "The probabilities of all possible outcomes add up to 1.", w: [["A probability can be 1.5.", "Probabilities are between 0 and 1."], ["After five heads in a row, tails is more likely next.", "Each toss of a fair coin is independent; it is still 1/2."]], x: "One of the outcomes must happen, so together they make 1.", lineup: true },
        { p: "A bag has 4 red and 6 blue balls. What is P(blue)?", a: "3/5", w: [["6/4", "Divide by the total, 10, not by the number of reds."], ["1/6", "There are 6 blue balls out of 10."]], x: "6/10 = 3/5." },
      ],
      check: [
        { p: "P(rain tomorrow) = 0.3. What is P(no rain)?", a: "0.7", w: [["0.3", "That is the chance of rain."], ["1.3", "Probabilities cannot be more than 1."]], x: "1 − 0.3 = 0.7." },
        { p: "A spinner lands on red 52 times in 100 spins. What is the experimental probability of red?", a: "0.52", w: [["52", "Divide by the number of trials."], ["0.48", "That is the probability of not red."]], x: "52 ÷ 100 = 0.52." },
      ],
    },
  ],
};

const AREA: ChapterSpec = {
  id: "area",
  number: "224",
  title: "The Case of the Oddly Shaped Field",
  topic: "Area of triangles, parallelograms and trapeziums",
  subject: "maths",
  grade: 8,
  tagline: "Find areas of shapes that are not rectangles by cutting and rearranging them.",
  hook: "A farmer is selling a field shaped like a trapezium, priced per square metre. The advert says 900 m². Its parallel sides are 30 m and 50 m, and they are 20 m apart. Is the advert right?",
  goal: "Calculate the area of triangles, parallelograms and trapeziums, and explain where the formulas come from.",
  learn: ["Find the area of a parallelogram", "Find the area of a triangle", "Find the area of a trapezium"],
  lessons: [
    {
      id: "area-shapes",
      title: "Area of triangles, parallelograms and trapeziums",
      teaser: "Use the perpendicular height, not the slanted side.",
      question: "A trapezium-shaped field has parallel sides of 30 m and 50 m, 20 m apart. What is its area?",
      goals: ["Use area = base × perpendicular height for a parallelogram", "Use area = ½ × base × height for a triangle", "Use area = ½ × (a + b) × h for a trapezium"],
      hint: "Add the parallel sides, halve the total, and multiply by the distance between them.",
      walk: "Area of a trapezium = ½ × (a + b) × h = ½ × (30 + 50) × 20 = ½ × 80 × 20 = 800 m². The advert’s 900 m² is wrong; the field is 800 m².",
      summary: [
        "Parallelogram: base × perpendicular height. Triangle: ½ × base × perpendicular height. Trapezium: ½ × (sum of parallel sides) × perpendicular height.",
        "Always use the perpendicular (straight up) height, not a slanted side. Area is in square units, such as cm² or m².",
      ],
      explain: [
        p("Area is the amount of flat space a shape covers. For a rectangle, area = length × width. Other shapes can be cut up and rearranged into rectangles, which is where their formulas come from."),
        h("Parallelogram"),
        p("Cut a triangle off one end of a parallelogram and move it to the other end. It becomes a rectangle with the same base and height. So area = base × perpendicular height."),
        h("Triangle"),
        p("Two identical triangles fit together to make a parallelogram. So a triangle is half a parallelogram: area = ½ × base × perpendicular height."),
        h("Trapezium"),
        p("A trapezium has one pair of parallel sides, called a and b. Two identical trapeziums, one flipped, fit together to make a parallelogram with base (a + b). So area = ½ × (a + b) × h."),
        tip("Key idea", "The height must be perpendicular (at right angles) to the base. A slanted side is longer than the height and gives the wrong answer."),
      ],
      tryIt: [
        h("Work them out"),
        list(
          "Parallelogram, base 8 cm, height 5 cm: 8 × 5 = 40 cm².",
          "Triangle, base 10 cm, height 6 cm: ½ × 10 × 6 = 30 cm².",
          "Trapezium, parallel sides 4 cm and 10 cm, height 3 cm: ½ × 14 × 3 = 21 cm².",
        ),
        p("Check your thinking: a parallelogram has a slanted side of 7 cm, a base of 10 cm and a height of 6 cm. Its area is 10 × 6 = 60 cm², not 10 × 7."),
      ],
      practice: [
        { p: "A triangle has a base of 12 cm and a height of 5 cm. What is its area?", a: "30 cm²", w: [["60 cm²", "Remember to halve: a triangle is half a parallelogram."], ["17 cm²", "Area is not base plus height."]], x: "½ × 12 × 5 = 30 cm²." },
        { p: "A parallelogram has base 9 m and perpendicular height 4 m. What is its area?", a: "36 m²", w: [["18 m²", "Only triangles need halving."], ["13 m²", "Multiply, do not add."]], x: "9 × 4 = 36 m²." },
      ],
      quiz: [
        { p: "A trapezium has parallel sides 30 m and 50 m, 20 m apart. What is its area?", a: "800 m²", w: [["1,600 m²", "Remember the ½ in the formula."], ["900 m²", "½ × (30 + 50) × 20 = 800."]], x: "½ × 80 × 20 = 800 m²." },
        { p: "Three statements about area formulas. Which is true?", a: "You must use the perpendicular height, not the slanted side.", w: [["A triangle’s area is base × height.", "A triangle is half of that."], ["Area is measured in cm, not cm².", "Area is always in square units."]], x: "Perpendicular height gives the correct rearranged rectangle.", lineup: true },
        { p: "Why is the area of a triangle half of base × height?", a: "Two identical triangles make a parallelogram with that base and height", w: [["Triangles have three sides, and half of six is three", "The half comes from fitting two triangles together."], ["Because the angles add up to 180°", "Angles do not decide the area formula."]], x: "A triangle is half of a parallelogram." },
      ],
      check: [
        { p: "Find the area of a trapezium with parallel sides 6 cm and 8 cm and height 5 cm.", a: "35 cm²", w: [["70 cm²", "Remember to halve."], ["19 cm²", "Multiply, do not add the height."]], x: "½ × 14 × 5 = 35 cm²." },
        { p: "A parallelogram has a base of 10 cm, a slanted side of 7 cm and a height of 6 cm. What is its area?", a: "60 cm²", w: [["70 cm²", "Use the perpendicular height, 6 cm, not the slanted side."], ["42 cm²", "Use the base, 10 cm, and the height, 6 cm."]], x: "10 × 6 = 60 cm²." },
      ],
    },
  ],
};

const GOLDEN_AGE: ChapterSpec = {
  id: "golden-age",
  number: "225",
  title: "The Case of the House of Wisdom",
  topic: "The Islamic Golden Age",
  subject: "history",
  grade: 8,
  tagline: "Visit Baghdad, where scholars translated, debated and made discoveries that still shape science.",
  hook: "The word “algebra” comes from an Arabic book title written in Baghdad over 1,100 years ago. How did a city in the Middle East become one of the world’s great centres of learning?",
  goal: "Describe the Islamic Golden Age and explain its contributions to science, mathematics and medicine.",
  learn: ["Describe the House of Wisdom in Baghdad", "Name scholars and their contributions", "Explain how knowledge was preserved and passed on"],
  lessons: [
    {
      id: "house-of-wisdom",
      title: "The Islamic Golden Age",
      teaser: "Translation, mathematics, medicine and astronomy in Baghdad and beyond.",
      question: "How did Baghdad become a centre of learning, and why does it matter to us today?",
      goals: ["Describe the House of Wisdom and the translation movement", "Name scholars such as al-Khwarizmi and Ibn Sina and what they did", "Explain how this learning later reached Europe"],
      hint: "Think about what the scholars did with books from Greece, Persia and India, and what they added.",
      walk: "From the late 700s, the Abbasid caliphs in Baghdad supported scholars. At the House of Wisdom, works from Greece, Persia and India were translated into Arabic. Scholars built on them: al-Khwarizmi wrote about algebra and helped spread Hindu-Arabic numerals; Ibn Sina wrote a great medical encyclopedia. Later, many of these Arabic works were translated into Latin, reaching European universities.",
      summary: [
        "The Islamic Golden Age (roughly the 8th to 13th centuries) saw great advances in science, mathematics, medicine and philosophy, centred in cities such as Baghdad, Cairo and Córdoba.",
        "Scholars translated and preserved older knowledge, added new discoveries, and their works later influenced Europe.",
      ],
      explain: [
        p("In 762 CE, the Abbasid caliphs founded Baghdad as their capital. It grew into one of the largest cities in the world, on trade routes linking Asia, Africa and Europe."),
        h("The House of Wisdom"),
        p("Caliphs such as al-Ma’mun supported a centre of learning in Baghdad, often called the House of Wisdom (Bayt al-Hikma). Scholars of different faiths and backgrounds translated works of Greek, Persian and Indian science and philosophy into Arabic. Paper-making, learned from China, made books cheaper to produce."),
        h("New discoveries"),
        list(
          "Al-Khwarizmi (about 780 to 850) wrote a book on solving equations. The word “algebra” comes from al-jabr in its title, and “algorithm” comes from his name. He helped spread the Hindu-Arabic numerals, including zero.",
          "Ibn al-Haytham (about 965 to 1040) studied light and vision and stressed testing ideas by experiment.",
          "Ibn Sina (Avicenna, 980 to 1037) wrote the Canon of Medicine, used in European universities for centuries.",
          "Astronomers built observatories and improved instruments such as the astrolabe.",
        ),
        tip("Key idea", "The Golden Age did not just copy older knowledge. Scholars checked it, corrected it and added to it."),
        h("Passing it on"),
        p("Learning spread across the Islamic world, including to Córdoba in Spain. In the 1100s, many Arabic books were translated into Latin in places like Toledo, helping to shape science in medieval Europe. Baghdad itself was sacked by the Mongols in 1258."),
      ],
      tryIt: [
        h("Words with a history"),
        list("Algebra: from al-jabr, in al-Khwarizmi’s book title.", "Algorithm: from the name al-Khwarizmi.", "Zero: the idea travelled from India, through Arabic mathematics, to Europe."),
        p("Detective question: why was translation so important? (It saved older works that might have been lost, and let scholars build on them.)"),
      ],
      practice: [
        { p: "Which city was home to the House of Wisdom?", a: "Baghdad", w: [["Rome", "Rome was the centre of the earlier Roman Empire."], ["Athens", "Athens was a centre of ancient Greek learning, centuries earlier."]], x: "The House of Wisdom was in Baghdad." },
        { p: "Which word comes from al-Khwarizmi’s book title?", a: "Algebra", w: [["Geometry", "Geometry comes from Greek."], ["Astronomy", "Astronomy comes from Greek."]], x: "Al-jabr gave us “algebra”." },
      ],
      quiz: [
        { p: "What was the translation movement?", a: "Translating Greek, Persian and Indian works into Arabic", w: [["Translating the Bible into English", "That happened much later, in Europe."], ["Moving the capital from Baghdad to Rome", "It was about books and knowledge."]], x: "Scholars preserved and built on older knowledge." },
        { p: "Three statements about the Islamic Golden Age. Which is true?", a: "Ibn Sina’s Canon of Medicine was used in European universities.", w: [["Scholars only copied old books without adding anything.", "They corrected and added to older knowledge."], ["It ended because paper had not been invented.", "Paper was in use and helped spread books."]], x: "The Canon was a standard medical text for centuries.", lineup: true },
        { p: "How did much of this learning reach Europe?", a: "Arabic books were translated into Latin, for example in Spain", w: [["Europeans already had all the books", "Many works reached Europe through Arabic translations."], ["Through the internet", "This was in the Middle Ages."]], x: "Translation centres like Toledo passed knowledge on." },
      ],
      check: [
        { p: "Who studied light and vision and stressed testing ideas by experiment?", a: "Ibn al-Haytham", w: [["Julius Caesar", "Caesar was a Roman general."], ["Mansa Musa", "Mansa Musa was a ruler of Mali."]], x: "Ibn al-Haytham is famous for his work on optics." },
        { p: "Which number system did al-Khwarizmi help to spread?", a: "Hindu-Arabic numerals, including zero", w: [["Roman numerals", "Roman numerals were older and had no zero."], ["Binary code", "Binary was developed much later."]], x: "The numerals we use today came from India through Arabic mathematics." },
      ],
    },
  ],
};

const MALI: ChapterSpec = {
  id: "mali-empire",
  number: "226",
  title: "The Case of the Golden Caravan",
  topic: "The Mali Empire and Mansa Musa",
  subject: "history",
  grade: 8,
  tagline: "Discover a West African empire so rich in gold that its king appeared on European maps.",
  hook: "A Spanish map drawn in 1375 shows an African king holding a gold nugget. Merchants said his journey to Mecca had changed the price of gold in Cairo. Who was he?",
  goal: "Explain how the Mali Empire grew rich and powerful, and why Mansa Musa became famous.",
  learn: ["Locate the Mali Empire", "Explain how gold and salt trade made Mali rich", "Describe Mansa Musa’s pilgrimage and Timbuktu as a centre of learning"],
  lessons: [
    {
      id: "mansa-musa",
      title: "The Mali Empire and Mansa Musa",
      teaser: "Gold, salt, trade routes and the scholars of Timbuktu.",
      question: "Why did Mansa Musa’s pilgrimage make Mali famous across Africa, the Middle East and Europe?",
      goals: ["Locate the Mali Empire in West Africa", "Explain how trans-Saharan trade in gold and salt made Mali rich", "Describe Mansa Musa’s hajj and the growth of Timbuktu"],
      hint: "Think about what people in Cairo saw when thousands of travellers arrived carrying gold.",
      walk: "In 1324 Mansa Musa travelled to Mecca for the hajj with a huge caravan carrying gold. Accounts say he gave away and spent so much gold in Cairo that its value there fell for years. Traders spread the story, and Mali appeared on European maps, such as the Catalan Atlas of 1375.",
      summary: [
        "The Mali Empire (about 1235 to 1600) in West Africa grew rich by controlling trade in gold and salt across the Sahara.",
        "Mansa Musa’s pilgrimage to Mecca in 1324 displayed Mali’s wealth to the world. He built mosques and helped make Timbuktu a centre of Islamic learning.",
      ],
      explain: [
        p("The Mali Empire was founded around 1235 by Sundiata Keita. At its height it stretched across West Africa, including parts of modern Mali, Senegal, Guinea and Mauritania."),
        h("Gold and salt"),
        p("Mali had rich goldfields. North of it lay the Sahara, which had salt mines. People needed salt to preserve food and stay healthy in the heat. Camel caravans crossed the desert carrying salt south and gold north. Mali’s rulers taxed this trade and grew very rich."),
        h("Mansa Musa"),
        p("Mansa means king. Mansa Musa ruled from about 1312 to 1337. As a Muslim, he made the hajj, the pilgrimage to Mecca, in 1324. Writers of the time described a caravan of thousands of people and many camels carrying gold. In Cairo he spent and gave away so much gold that its value there fell."),
        tip("Key idea", "Many details come from writers who lived after the journey, so numbers may be exaggerated. But several sources agree that the pilgrimage displayed enormous wealth."),
        h("Timbuktu"),
        p("Mansa Musa returned with scholars and architects. He built mosques, including the Djinguereber Mosque in Timbuktu. The city became a centre of trade and learning, with many scholars and manuscripts, some of which still survive."),
      ],
      tryIt: [
        h("Weigh the evidence"),
        list(
          "The Catalan Atlas (1375): a European map showing Mansa Musa with gold. It shows his fame reached Europe.",
          "Al-Umari, a writer in Cairo about 12 years after the visit: describes the gold and its effect on prices.",
          "Surviving Timbuktu manuscripts: show a real tradition of scholarship.",
        ),
        p("Detective question: why might later writers exaggerate the size of the caravan? (Stories grow as they are retold, and writers may want to impress readers.)"),
      ],
      practice: [
        { p: "What two goods were most important in trans-Saharan trade for Mali?", a: "Gold and salt", w: [["Silk and spices", "Those were famous on the Silk Roads."], ["Oil and coal", "These were not traded then."]], x: "Gold went north and salt came south." },
        { p: "What does “mansa” mean?", a: "King", w: [["Gold", "Mansa is a title meaning king."], ["Desert", "Mansa is a royal title."]], x: "Mansa Musa means King Musa." },
      ],
      quiz: [
        { p: "Why did Mansa Musa’s visit to Cairo affect gold prices?", a: "He spent and gave away so much gold that its value fell", w: [["He took all of Cairo’s gold back to Mali", "Accounts say he brought gold and spent it."], ["He banned the use of gold", "He spent gold; he did not ban it."]], x: "So much gold entered Cairo that its value dropped." },
        { p: "Three statements about Timbuktu. Which is true?", a: "It became a centre of trade and Islamic learning.", w: [["It was the capital of the Roman Empire.", "Timbuktu is in West Africa."], ["It had no buildings, only tents.", "Mansa Musa built mosques there."]], x: "Scholars and manuscripts made Timbuktu famous.", lineup: true },
        { p: "How did Mali’s rulers grow rich?", a: "By controlling and taxing the trade in gold and salt", w: [["By selling oil to Europe", "Oil was not traded at that time."], ["By conquering China", "Mali was in West Africa, far from China."]], x: "Trans-Saharan trade passed through Mali." },
      ],
      check: [
        { p: "In which year did Mansa Musa make his pilgrimage?", a: "1324", w: [["1066", "That is the Battle of Hastings."], ["1492", "That is when Columbus crossed the Atlantic."]], x: "His hajj took place in 1324." },
        { p: "Why should historians be careful with the numbers in accounts of the caravan?", a: "Many were written later and may be exaggerated", w: [["The accounts are all forgeries", "They are real sources, but numbers may be exaggerated."], ["Numbers were not used in the 1300s", "Writers did use numbers; they may not be accurate."]], x: "Good historians compare sources and consider when they were written." },
      ],
    },
  ],
};

const RESOURCES: ChapterSpec = {
  id: "resources",
  number: "227",
  title: "The Case of the Running-Out Reserve",
  topic: "Renewable and non-renewable resources",
  subject: "geography",
  grade: 8,
  tagline: "Sort the world’s resources into those that run out and those that renew.",
  hook: "A town has relied on its coal mine for 150 years. Now the mine is closing because the coal is running out. What should the town use next, and what happens to the jobs?",
  goal: "Classify natural resources as renewable or non-renewable and evaluate how we use them.",
  learn: ["Define natural resources", "Classify resources as renewable or non-renewable", "Explain why sustainable use matters"],
  lessons: [
    {
      id: "renewable-resources",
      title: "Renewable and non-renewable resources",
      teaser: "Some resources renew themselves; others run out.",
      question: "Why is coal called non-renewable, while wind is renewable?",
      goals: ["Define a natural resource", "Classify resources as renewable or non-renewable with reasons", "Explain what sustainable use means"],
      hint: "How long does it take for coal to form? How long does it take for the wind to blow again?",
      walk: "Coal formed from plants buried millions of years ago. We use it far faster than it can form, so once it is used, it is effectively gone: non-renewable. Wind is produced continually by the Sun heating the Earth, so using it does not use it up: renewable.",
      summary: [
        "Natural resources are materials from the Earth that people use. Renewable resources are replaced naturally within a human lifetime; non-renewable ones are not.",
        "Fossil fuels and metal ores are non-renewable. Sunlight, wind and water flow are renewable. Some, like forests and fish, are renewable only if used sustainably.",
      ],
      explain: [
        p("A natural resource is anything from the natural world that people use: water, soil, wood, metals, fossil fuels, sunlight, wind."),
        h("Non-renewable resources"),
        p("Non-renewable resources form so slowly that once used, they are gone for practical purposes. Coal, oil and natural gas (fossil fuels) formed from living things buried millions of years ago. Metal ores, such as iron ore, are also non-renewable, though metals can often be recycled."),
        h("Renewable resources"),
        p("Renewable resources are naturally replaced. Sunlight, wind, flowing water and tides will not run out. Others, such as trees, fish and fresh water, renew themselves but can be used up if we take them faster than they recover."),
        tip("Key idea", "Sustainable use means using resources in a way that meets our needs without leaving too little for the future."),
        h("Choices"),
        p("Burning fossil fuels releases carbon dioxide, which adds to climate change, and causes air pollution. Renewable energy produces much less carbon dioxide once built, but wind and solar vary with the weather, and dams change rivers. Most countries use a mix."),
      ],
      tryIt: [
        h("Sort them"),
        list("Oil: non-renewable.", "Solar energy: renewable.", "Iron ore: non-renewable (but iron can be recycled).", "Timber from a managed forest: renewable, if trees are replanted.", "Fish in the sea: renewable, but can be overfished."),
        p("Case question: suggest one renewable resource the coal town could use, and one problem it might face. (For example, wind turbines on nearby hills; the wind does not always blow, and new jobs may need new skills.)"),
      ],
      practice: [
        { p: "Which resource is non-renewable?", a: "Natural gas", w: [["Sunlight", "The Sun will keep shining for billions of years."], ["Wind", "Wind is continually produced by the Sun heating the Earth."]], x: "Natural gas took millions of years to form." },
        { p: "What does “sustainable use” mean?", a: "Using a resource without leaving too little for the future", w: [["Using a resource as fast as possible", "That would use it up."], ["Never using any resources", "Sustainable use still uses resources, carefully."]], x: "Sustainable use balances today’s needs with tomorrow’s." },
      ],
      quiz: [
        { p: "Why is coal called non-renewable?", a: "It takes millions of years to form, much longer than we take to use it", w: [["It cannot be burned", "Coal is burned for energy."], ["It is only found in one country", "It is found in many countries; the problem is how slowly it forms."]], x: "We use coal far faster than it can form." },
        { p: "Three statements about resources. Which is true?", a: "Fish can be overused even though they are renewable.", w: [["Renewable resources can never run out, however they are used.", "Fish and forests can be used up if taken too fast."], ["Metals are renewable because they grow back.", "Metal ores do not grow back, though metals can be recycled."]], x: "Renewable resources still need careful management.", lineup: true },
        { p: "What is one disadvantage of wind power?", a: "It does not produce electricity when the wind is not blowing", w: [["It produces lots of carbon dioxide while running", "Wind turbines produce almost none while running."], ["The wind will run out soon", "Wind is renewable."]], x: "Wind and solar power vary with the weather." },
      ],
      check: [
        { p: "Which group are all fossil fuels?", a: "Coal, oil and natural gas", w: [["Wind, solar and tidal", "Those are renewable sources."], ["Iron, copper and gold", "Those are metals."]], x: "Fossil fuels formed from ancient living things." },
        { p: "Why does recycling metals help?", a: "It reduces the need to mine non-renewable ores", w: [["It makes metal ores grow back", "Ores do not grow back."], ["It turns metal into fossil fuel", "Recycling reuses the metal."]], x: "Recycling makes non-renewable resources last longer." },
      ],
    },
  ],
};

const RAINFORESTS: ChapterSpec = {
  id: "rainforests",
  number: "228",
  title: "The Case of the Disappearing Forest",
  topic: "Rainforests and deforestation",
  subject: "geography",
  grade: 8,
  tagline: "Investigate why tropical rainforests are cut down, and what that costs the world.",
  hook: "Satellite photos taken years apart show a patch of green rainforest turning into a pattern of straight roads and brown fields, shaped a bit like a fishbone. What is happening, and who is doing it?",
  goal: "Explain the causes and effects of tropical deforestation and evaluate ways to manage rainforests sustainably.",
  learn: ["Describe the tropical rainforest and why it matters", "Explain the main causes of deforestation", "Evaluate effects and sustainable solutions"],
  lessons: [
    {
      id: "deforestation",
      title: "Rainforests and deforestation",
      teaser: "Cattle, crops, logging and roads, and what is lost.",
      question: "Why are tropical rainforests being cut down, and why does it matter to people far away?",
      goals: ["Describe why tropical rainforests are important", "Explain the main causes of deforestation", "Evaluate the effects of deforestation and some solutions"],
      hint: "Think about who earns money from the cleared land. Then think about what trees do for the climate and for wildlife.",
      walk: "Forests are cleared mainly for cattle ranching and farms (such as soya and palm oil), and also for logging, mining and roads. Roads open up more land, which is why clearings form a fishbone pattern. It matters globally because rainforests store huge amounts of carbon, which is released as carbon dioxide when trees are burned, and because they hold a large share of the world’s species.",
      summary: [
        "Tropical rainforests are home to a large share of the world’s species and store vast amounts of carbon.",
        "Deforestation is driven mostly by farming (especially cattle and crops), plus logging, mining and roads. It releases carbon, reduces biodiversity and affects local people.",
      ],
      explain: [
        p("Tropical rainforests grow near the equator, where it is hot and wet all year. The largest is the Amazon rainforest in South America. Others are in Central Africa and South-East Asia."),
        h("Why they matter"),
        list(
          "Biodiversity: rainforests hold a huge variety of plants and animals, many found nowhere else.",
          "Climate: trees take in carbon dioxide and store carbon. Burning or rotting trees releases it.",
          "Water: rainforests return water to the air, helping to make rain over large areas.",
          "People: many Indigenous peoples live in rainforests, and some medicines come from rainforest plants.",
        ),
        h("Causes of deforestation"),
        list(
          "Cattle ranching: in the Amazon, clearing for cattle pasture is the largest single cause.",
          "Commercial farming: crops such as soya and oil palm.",
          "Logging: for valuable timber.",
          "Mining, dams and roads: roads also make it easier for others to reach and clear more land.",
        ),
        tip("Key idea", "Deforestation is often driven by demand far away: beef, soya, palm oil and timber are traded around the world."),
        h("Solutions"),
        p("Ideas include protecting areas as national parks, recognising Indigenous land rights, using satellites to spot illegal clearing, selective logging and replanting, certification schemes for products such as timber and palm oil, and paying countries to keep forests standing."),
      ],
      tryIt: [
        h("Different viewpoints"),
        list(
          "A cattle rancher: clearing land provides a living for my family.",
          "An Indigenous community member: the forest is our home and our food.",
          "A climate scientist: burning forest adds carbon dioxide to the atmosphere.",
          "A government official: farming exports earn money for the country.",
        ),
        p("Your task: suggest one solution that could help both the rancher and the forest. (For example, using already cleared land more efficiently instead of clearing more.)"),
      ],
      practice: [
        { p: "What is the largest single cause of deforestation in the Amazon?", a: "Clearing land for cattle ranching", w: [["Building houses for big cities", "Cities cause some clearing, but cattle pasture is the biggest cause there."], ["Forest fires started by lightning", "Most fires in the Amazon are set by people to clear land."]], x: "Cattle pasture accounts for the largest share of cleared land in the Amazon." },
        { p: "Why does burning rainforest add to climate change?", a: "Trees store carbon, which is released as carbon dioxide", w: [["Burning trees cools the planet", "It releases greenhouse gases."], ["Smoke blocks all sunlight forever", "The main problem is carbon dioxide."]], x: "Stored carbon becomes carbon dioxide when trees burn or rot." },
      ],
      quiz: [
        { p: "Why do rainforest clearings often form a fishbone pattern?", a: "Side roads branch off a main road, and land is cleared along them", w: [["Fish are farmed in the cleared areas", "The name only describes the shape."], ["Rivers always flow in that pattern", "The pattern follows roads, not rivers."]], x: "Roads give access to clear more land." },
        { p: "Three statements about rainforests. Which is true?", a: "They contain a large share of the world’s plant and animal species.", w: [["They are found mainly near the North and South Poles.", "Tropical rainforests are near the equator."], ["Cutting them down has no effect on the climate.", "It releases carbon dioxide and affects rainfall."]], x: "Rainforests are hotspots of biodiversity.", lineup: true },
        { p: "Which is a sustainable way to manage a rainforest?", a: "Selective logging, taking only some trees and replanting", w: [["Clear-felling the whole area at once", "This removes all the trees and habitats."], ["Burning the forest to make farmland", "This is a cause of deforestation."]], x: "Selective logging lets the forest recover." },
      ],
      check: [
        { p: "Where is the largest tropical rainforest?", a: "The Amazon, in South America", w: [["The Sahara, in Africa", "The Sahara is a desert."], ["Siberia, in Russia", "Siberia has cold forests, not tropical rainforest."]], x: "The Amazon is the largest tropical rainforest." },
        { p: "How can satellites help protect rainforests?", a: "They can spot new clearing quickly so it can be investigated", w: [["They plant new trees from space", "Satellites take images; they do not plant trees."], ["They stop it raining", "Satellites only observe the forest."]], x: "Satellite images show where forest is being cleared." },
      ],
    },
  ],
};

export const EXTRA_G8: ChapterSpec[] = [HEAT, DIGESTION, PROBABILITY, AREA, GOLDEN_AGE, MALI, RESOURCES, RAINFORESTS];
