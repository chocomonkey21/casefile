import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  Grade 9: two more chapters for each subject, one lesson each, so every grade and subject has three chapters.
  ASSUMPTION: topics and depth were chosen by the project team for a typical Grade 9 class. They are not matched to an
  official curriculum. Videos for these lessons are in data/videos-curated.ts.
*/

const ELECTRICITY: ChapterSpec = {
  id: "electricity",
  number: "231",
  title: "The Case of the Flickering Bulb",
  topic: "Current, voltage and resistance",
  subject: "science",
  grade: 9,
  tagline: "Measure current and voltage, and use Ohm’s law to explain what resistance does.",
  hook: "A bulb glows brightly with a short wire, but grows dim when a long, thin wire is added to the circuit. The battery has not changed. What has?",
  goal: "Explain current, potential difference and resistance, and use V = I × R.",
  learn: ["Define current, potential difference and resistance with their units", "Use V = I × R", "Explain what affects the resistance of a wire"],
  lessons: [
    {
      id: "ohms-law",
      title: "Current, voltage and resistance",
      teaser: "V = I × R links the three.",
      question: "A 12 V battery is connected to a 4 Ω resistor. What current flows? What happens if the resistance doubles?",
      goals: ["Define current (A), potential difference (V) and resistance (Ω)", "Use V = I × R to calculate one quantity from the other two", "Explain why a long, thin wire has more resistance"],
      hint: "Rearrange V = I × R to find I: I = V ÷ R.",
      walk: "I = V ÷ R = 12 ÷ 4 = 3 A. If R doubles to 8 Ω, I = 12 ÷ 8 = 1.5 A. The current halves. That is why the bulb dims when a long, thin wire adds resistance: less current flows.",
      summary: [
        "Current (I, amps) is the rate of flow of charge. Potential difference (V, volts) is the push that drives it. Resistance (R, ohms) opposes the flow.",
        "Ohm’s law: V = I × R, for a resistor at constant temperature. More resistance means less current for the same voltage.",
      ],
      explain: [
        p("Electric current is a flow of charge, carried in metal wires by electrons. To understand circuits, we use three linked quantities."),
        h("Three quantities"),
        list(
          "Current (I) is how much charge flows past a point each second. It is measured in amperes (A) with an ammeter, placed in series.",
          "Potential difference (V), often called voltage, is the energy given to each unit of charge: the push. It is measured in volts (V) with a voltmeter, placed in parallel across a component.",
          "Resistance (R) is how much a component opposes the current. It is measured in ohms (Ω).",
        ),
        h("Ohm’s law"),
        p("For a resistor kept at a constant temperature, the current is directly proportional to the potential difference. This gives V = I × R. It can be rearranged: I = V ÷ R, and R = V ÷ I."),
        tip("Key idea", "For the same voltage, doubling the resistance halves the current."),
        h("What affects resistance"),
        list(
          "Length: a longer wire has more resistance.",
          "Thickness: a thinner wire has more resistance.",
          "Material: copper has low resistance; nichrome has high resistance.",
          "Temperature: for most metals, resistance rises as they get hotter. A filament bulb does not obey Ohm’s law for this reason.",
        ),
      ],
      tryIt: [
        h("Use the formula"),
        list(
          "V = 6 V, R = 2 Ω: I = 6 ÷ 2 = 3 A.",
          "I = 0.5 A, R = 20 Ω: V = 0.5 × 20 = 10 V.",
          "V = 9 V, I = 3 A: R = 9 ÷ 3 = 3 Ω.",
        ),
        p("Back to the case: adding a long, thin wire raises the total resistance. With the same battery, less current flows, so the bulb is dimmer."),
      ],
      practice: [
        { p: "What is the unit of resistance?", a: "Ohm (Ω)", w: [["Volt (V)", "Volts measure potential difference."], ["Ampere (A)", "Amperes measure current."]], x: "Resistance is measured in ohms." },
        { p: "V = 10 V and R = 5 Ω. What is the current?", a: "2 A", w: [["50 A", "That is V × R. Current is V ÷ R."], ["0.5 A", "That is R ÷ V."]], x: "I = 10 ÷ 5 = 2 A." },
      ],
      quiz: [
        { p: "A 12 V battery is connected to a 4 Ω resistor. What is the current?", a: "3 A", w: [["48 A", "That is V × R."], ["16 A", "That is V + R."]], x: "I = V ÷ R = 12 ÷ 4 = 3 A." },
        { p: "Three statements about measuring circuits. Which is true?", a: "A voltmeter is connected in parallel across a component.", w: [["An ammeter is connected in parallel.", "An ammeter goes in series, in the path of the current."], ["Resistance is measured in amps.", "Resistance is measured in ohms."]], x: "Voltmeters measure the difference across a component, so they go in parallel.", lineup: true },
        { p: "The voltage stays the same and the resistance doubles. What happens to the current?", a: "It halves", w: [["It doubles", "More resistance means less current."], ["It stays the same", "With V fixed, I = V ÷ R falls as R rises."]], x: "Current is inversely proportional to resistance at fixed voltage." },
      ],
      check: [
        { p: "Which wire has the most resistance?", a: "A long, thin wire", w: [["A short, thick wire", "Short and thick means less resistance."], ["A short, thin wire", "A longer wire of the same thickness has more resistance."]], x: "Length increases resistance; thickness reduces it." },
        { p: "I = 2 A and R = 6 Ω. What is the potential difference?", a: "12 V", w: [["3 V", "That is R ÷ I."], ["8 V", "That is I + R."]], x: "V = I × R = 2 × 6 = 12 V." },
      ],
    },
  ],
};

const CIRCULATION: ChapterSpec = {
  id: "circulation",
  number: "232",
  title: "The Case of the Racing Heart",
  topic: "The heart and circulation",
  subject: "science",
  grade: 9,
  tagline: "Trace blood through the heart, lungs and body, and find out why your heart races when you run.",
  hook: "After a sprint, a runner’s heart is pounding at over 150 beats a minute. Ten minutes later it is back to about 70. What was the heart doing, and why?",
  goal: "Describe the structure of the heart and the double circulation, and explain how the heart responds to exercise.",
  learn: ["Name the chambers and main blood vessels of the heart", "Trace the double circulation", "Compare arteries, veins and capillaries"],
  lessons: [
    {
      id: "heart",
      title: "The heart and circulation",
      teaser: "Two pumps side by side, and a double circuit.",
      question: "Why does your heart beat faster when you exercise?",
      goals: ["Name the four chambers of the heart and the main vessels", "Trace the path of blood through the double circulation", "Explain how heart rate changes with exercise"],
      hint: "Muscles need oxygen and glucose to release energy. How does that oxygen reach them?",
      walk: "During exercise, muscles respire faster and need more oxygen and glucose, and make more carbon dioxide. The heart beats faster and harder to pump more blood: to the lungs to pick up oxygen and remove carbon dioxide, and to the muscles to deliver oxygen and glucose.",
      summary: [
        "The heart has four chambers: two atria on top, two ventricles below. The right side pumps blood to the lungs; the left side pumps it to the body. This is a double circulation.",
        "Arteries carry blood away from the heart, veins carry it back, and capillaries exchange substances with cells. Exercise raises heart rate to supply more oxygen.",
      ],
      explain: [
        p("The heart is a muscular pump about the size of your fist. Blood carries oxygen, glucose and other substances to cells, and carries waste such as carbon dioxide away."),
        h("Four chambers"),
        list(
          "Right atrium: receives blood from the body through the vena cava.",
          "Right ventricle: pumps blood to the lungs through the pulmonary artery.",
          "Left atrium: receives oxygenated blood from the lungs through the pulmonary vein.",
          "Left ventricle: pumps blood to the whole body through the aorta. Its wall is the thickest, because it pumps the furthest.",
        ),
        p("Valves stop blood flowing backwards. The “lub-dub” sound of a heartbeat is the valves closing."),
        h("Double circulation"),
        p("Blood passes through the heart twice on each complete trip. Heart to lungs and back (pulmonary circuit), then heart to body and back (systemic circuit). This keeps the pressure high enough to reach every part of the body."),
        tip("Key idea", "Arteries carry blood Away from the heart. Veins carry it back. The pulmonary artery is unusual: it carries deoxygenated blood, but it still goes away from the heart."),
        h("Blood vessels"),
        list(
          "Arteries: thick, muscular, elastic walls to cope with high pressure.",
          "Veins: thinner walls, wider space inside, and valves to stop backflow at low pressure.",
          "Capillaries: walls one cell thick, so oxygen and glucose can pass into cells and waste can pass out.",
        ),
      ],
      tryIt: [
        h("Trace one red blood cell"),
        list("Body → vena cava → right atrium → right ventricle → pulmonary artery → lungs (picks up oxygen).", "Lungs → pulmonary vein → left atrium → left ventricle → aorta → body (delivers oxygen)."),
        p("Try it: take your pulse for 15 seconds and multiply by 4. Jog on the spot for one minute and measure again. Measure every minute after to see how long it takes to return to normal. Fitter people usually recover faster."),
      ],
      practice: [
        { p: "Which chamber pumps blood to the whole body?", a: "The left ventricle", w: [["The right atrium", "The right atrium receives blood from the body."], ["The right ventricle", "The right ventricle pumps blood to the lungs."]], x: "The left ventricle pumps blood into the aorta." },
        { p: "What do valves in the heart do?", a: "Stop blood flowing backwards", w: [["Add oxygen to blood", "Oxygen is added in the lungs."], ["Make the heart beat", "Valves only control the direction of flow."]], x: "Valves keep blood moving one way." },
      ],
      quiz: [
        { p: "Why does heart rate increase during exercise?", a: "To deliver more oxygen and glucose to the muscles and remove more carbon dioxide", w: [["To cool the body down", "Sweating cools the body; the heart supplies oxygen."], ["Because blood gets thicker", "Heart rate rises to meet the muscles’ needs."]], x: "Muscles respire faster during exercise and need more supply." },
        { p: "Three statements about blood vessels. Which is true?", a: "Capillaries have walls one cell thick.", w: [["Veins have the thickest, most muscular walls.", "Arteries have the thickest walls."], ["All arteries carry oxygenated blood.", "The pulmonary artery carries deoxygenated blood."]], x: "Thin capillary walls let substances pass easily.", lineup: true },
        { p: "Where does blood go after the right ventricle?", a: "To the lungs, through the pulmonary artery", w: [["To the body, through the aorta", "That is the left ventricle’s job."], ["Straight to the left ventricle", "It must go through the lungs first."]], x: "The right side pumps blood to the lungs." },
      ],
      check: [
        { p: "Why is the wall of the left ventricle thicker than the right?", a: "It pumps blood all around the body, which needs more force", w: [["It holds more blood", "Both ventricles pump the same volume."], ["It pumps blood to the lungs", "That is the right ventricle."]], x: "A stronger pump is needed for the whole body." },
        { p: "What is meant by double circulation?", a: "Blood passes through the heart twice on each complete trip around the body", w: [["There are two hearts", "There is one heart with two sides."], ["Blood moves twice as fast as normal", "It is about the route, not speed."]], x: "One circuit goes to the lungs, the other to the body." },
      ],
    },
  ],
};

const SIMULTANEOUS: ChapterSpec = {
  id: "simultaneous",
  number: "233",
  title: "The Case of the Two Tickets",
  topic: "Simultaneous equations",
  subject: "maths",
  grade: 9,
  tagline: "Solve two equations at once to find two unknowns.",
  hook: "A school sold 200 tickets for a play and took £1,100. Adult tickets cost £7 and child tickets £4. The treasurer lost the record of how many of each were sold. Can you find out?",
  goal: "Form and solve pairs of linear simultaneous equations by elimination and by substitution.",
  learn: ["Form two equations from a word problem", "Solve by elimination", "Solve by substitution and check the answer"],
  lessons: [
    {
      id: "simultaneous-equations",
      title: "Simultaneous equations",
      teaser: "Two unknowns need two equations.",
      question: "200 tickets were sold for £1,100. Adults paid £7, children £4. How many of each were sold?",
      goals: ["Write two equations from a word problem", "Solve a pair of equations by elimination", "Solve a pair of equations by substitution, and check the answer"],
      hint: "Let a be the number of adult tickets and c the number of child tickets. One equation counts tickets; the other counts money.",
      walk: "a + c = 200 and 7a + 4c = 1100. Multiply the first by 4: 4a + 4c = 800. Subtract this from the second: 3a = 300, so a = 100. Then c = 200 − 100 = 100. Check: 7 × 100 + 4 × 100 = 1100. So 100 adult and 100 child tickets.",
      summary: [
        "Simultaneous equations are two equations with two unknowns that are both true at the same time.",
        "Elimination: make one variable’s coefficients match, then add or subtract to remove it. Substitution: rearrange one equation and put it into the other. Always check in both equations.",
      ],
      explain: [
        p("One equation with two unknowns, such as x + y = 10, has many solutions. A second equation narrows it down to one pair of values that works in both."),
        h("Method 1: elimination"),
        p("Solve 3x + 2y = 16 and x + 2y = 8."),
        list("The y terms match (2y in both). Subtract the second equation from the first: 2x = 8, so x = 4.", "Put x = 4 into x + 2y = 8: 4 + 2y = 8, so y = 2.", "Check in the first: 3 × 4 + 2 × 2 = 16. Correct."),
        p("If no coefficients match, multiply one or both equations first. Add the equations when the signs are different; subtract when they are the same."),
        h("Method 2: substitution"),
        p("Solve y = 2x + 1 and 3x + y = 11. Replace y in the second equation: 3x + (2x + 1) = 11, so 5x = 10 and x = 2. Then y = 2 × 2 + 1 = 5."),
        tip("Key idea", "The solution is the point where the two lines cross on a graph. Two parallel lines never cross, so they have no solution."),
      ],
      tryIt: [
        h("Two pens and a pencil"),
        p("2 pens and 1 pencil cost £5. 1 pen and 1 pencil cost £3. Let pens cost p and pencils q."),
        list("2p + q = 5", "p + q = 3", "Subtract: p = 2. Then q = 3 − 2 = 1.", "A pen costs £2 and a pencil £1. Check: 2 × 2 + 1 = 5."),
      ],
      practice: [
        { p: "Solve x + y = 10 and x − y = 4.", a: "x = 7, y = 3", w: [["x = 3, y = 7", "Check: 3 − 7 = −4, not 4."], ["x = 5, y = 5", "Check: 5 − 5 = 0, not 4."]], x: "Add the equations: 2x = 14, so x = 7, then y = 3." },
        { p: "y = x + 2 and 2x + y = 8. What is x?", a: "2", w: [["4", "Substitute: 2x + x + 2 = 8 gives 3x = 6."], ["6", "Substitute y = x + 2 into the second equation."]], x: "3x + 2 = 8, so x = 2 (and y = 4)." },
      ],
      quiz: [
        { p: "200 tickets sold for £1,100; adults £7, children £4. How many adult tickets?", a: "100", w: [["150", "Check: 7 × 150 + 4 × 50 = 1,250, not 1,100."], ["50", "Check: 7 × 50 + 4 × 150 = 950, not 1,100."]], x: "Elimination gives 3a = 300, so a = 100." },
        { p: "Three statements about simultaneous equations. Which is true?", a: "The solution is where the two lines cross on a graph.", w: [["Two parallel lines have exactly one solution.", "Parallel lines never meet, so there is no solution."], ["You only need to check the answer in one equation.", "The answer must work in both."]], x: "Both equations are true only at the crossing point.", lineup: true },
        { p: "To eliminate y from 2x + 3y = 13 and x + y = 5, what should you multiply the second equation by?", a: "3", w: [["2", "That would match the x terms, not the y terms."], ["5", "Multiply so the y coefficients match: 3y."]], x: "3x + 3y = 15, then subtract from the first equation." },
      ],
      check: [
        { p: "Solve 2a + b = 9 and a + b = 6.", a: "a = 3, b = 3", w: [["a = 6, b = 0", "Check: 2 × 6 + 0 = 12, not 9."], ["a = 2, b = 5", "Check: 2 × 2 + 5 = 9, but 2 + 5 = 7, not 6."]], x: "Subtract: a = 3, then b = 3." },
        { p: "When should you add two equations to eliminate a variable?", a: "When that variable has the same coefficient but opposite signs", w: [["When that variable has the same coefficient and the same sign", "Then you subtract."], ["Never; you always subtract", "Adding works when the signs are opposite."]], x: "For example, +2y and −2y cancel when added." },
      ],
    },
  ],
};

const SCATTER: ChapterSpec = {
  id: "scatter-graphs",
  number: "234",
  title: "The Case of the Ice Cream Sales",
  topic: "Scatter graphs and correlation",
  subject: "maths",
  grade: 9,
  tagline: "Plot two sets of data and decide whether they are linked, and whether one causes the other.",
  hook: "A newspaper reports that on days when more ice cream is sold, more people get sunburnt. Does ice cream cause sunburn? A good detective looks for the hidden cause.",
  goal: "Plot and interpret scatter graphs, describe correlation, use a line of best fit, and explain why correlation does not prove causation.",
  learn: ["Plot a scatter graph", "Describe positive, negative and no correlation", "Use a line of best fit and explain correlation versus causation"],
  lessons: [
    {
      id: "correlation",
      title: "Scatter graphs and correlation",
      teaser: "Linked is not the same as caused.",
      question: "Ice cream sales and sunburn cases rise together. Does ice cream cause sunburn?",
      goals: ["Plot paired data on a scatter graph", "Describe the type and strength of correlation", "Use a line of best fit to estimate, and explain why correlation does not prove causation"],
      hint: "Is there a third thing that might make both go up on the same days?",
      walk: "The two sets of data show positive correlation: they rise together. But a third factor, hot sunny weather, causes both. People buy more ice cream and spend more time in the sun. Correlation shows a link, not that one causes the other.",
      summary: [
        "A scatter graph plots pairs of data as points. Positive correlation: both rise together. Negative: one rises as the other falls. None: no clear pattern.",
        "A line of best fit shows the trend and can be used to estimate values within the data. Correlation does not prove causation.",
      ],
      explain: [
        p("A scatter graph shows whether two variables are linked. Each point represents one pair of values, such as the temperature on a day and the number of ice creams sold."),
        h("Types of correlation"),
        list(
          "Positive correlation: as one variable increases, the other tends to increase. For example, height and shoe size.",
          "Negative correlation: as one increases, the other tends to decrease. For example, the age of a car and its value.",
          "No correlation: no clear pattern. For example, shoe size and test scores.",
        ),
        p("Correlation can be strong (points close to a straight line) or weak (points spread out)."),
        h("Line of best fit"),
        p("A line of best fit is a straight line drawn through the middle of the points, with roughly equal numbers on each side. Use it to estimate a value. Estimates inside the range of the data (interpolation) are fairly reliable; estimates outside it (extrapolation) are risky."),
        tip("Key idea", "Correlation is not causation. Two things can rise together because a third factor affects both, or just by coincidence."),
        p("An outlier is a point that does not fit the pattern. Check whether it is a mistake before deciding whether to leave it out."),
      ],
      tryIt: [
        h("Describe the correlation"),
        list(
          "Hours of revision and test score: positive correlation (more revision, higher scores, usually).",
          "Temperature outside and heating bills: negative correlation.",
          "Birthday month and height: no correlation.",
        ),
        p("Detective question: towns with more fire stations have more fires. Do fire stations cause fires? (No. Bigger towns have both more fires and more fire stations. Population is the hidden factor.)"),
      ],
      practice: [
        { p: "As the age of a car goes up, its value goes down. What type of correlation is this?", a: "Negative", w: [["Positive", "Positive means both rise together."], ["No correlation", "There is a clear pattern here."]], x: "One goes up as the other goes down." },
        { p: "Where should a line of best fit go?", a: "Through the middle of the points, following the trend", w: [["Through the first and last points only", "It should follow the overall trend, not just two points."], ["Through the origin every time", "It does not have to pass through (0, 0)."]], x: "Roughly equal numbers of points lie on each side." },
      ],
      quiz: [
        { p: "Ice cream sales and sunburn rise together. What is the best explanation?", a: "Hot, sunny weather causes both", w: [["Ice cream causes sunburn", "Correlation does not prove causation."], ["Sunburn makes people want ice cream", "A hidden factor, the weather, explains both."]], x: "A third variable can create a correlation." },
        { p: "Three statements about scatter graphs. Which is true?", a: "Estimating outside the range of the data is less reliable.", w: [["A line of best fit must join every point.", "It follows the trend, not every point."], ["Strong correlation proves one thing causes the other.", "Correlation never proves causation on its own."]], x: "Extrapolation assumes the pattern continues, which may not be true.", lineup: true },
        { p: "Points on a scatter graph are spread widely but rise slightly from left to right. How would you describe this?", a: "Weak positive correlation", w: [["Strong negative correlation", "The points rise, so it is positive, and they are spread out, so it is weak."], ["Strong positive correlation", "Strong would mean points close to a line."]], x: "Rising trend, widely spread: weak positive." },
      ],
      check: [
        { p: "What is an outlier?", a: "A point that does not fit the general pattern", w: [["The highest point on the graph", "The highest point can still fit the pattern."], ["The line of best fit", "An outlier is a data point."]], x: "Outliers stand apart from the trend." },
        { p: "Which pair is most likely to show no correlation?", a: "Shoe size and maths test score", w: [["Height and arm span", "These show strong positive correlation."], ["Hours of daylight and electricity used for lighting", "These show negative correlation."]], x: "There is no reason for shoe size and test scores to be linked." },
      ],
    },
  ],
};

const FRENCH: ChapterSpec = {
  id: "french-revolution",
  number: "235",
  title: "The Case of the Stormed Fortress",
  topic: "The French Revolution",
  subject: "history",
  grade: 9,
  tagline: "Investigate why the people of France overthrew their king, and what followed.",
  hook: "On 14 July 1789, a crowd in Paris attacked the Bastille, a royal fortress holding only seven prisoners. Why did this attack become the symbol of a revolution?",
  goal: "Explain the causes, key events and consequences of the French Revolution.",
  learn: ["Explain the long-term and short-term causes", "Describe key events from 1789 to 1799", "Assess the Revolution’s impact"],
  lessons: [
    {
      id: "revolution-1789",
      title: "The French Revolution",
      teaser: "Debt, bread, new ideas and the fall of a king.",
      question: "Why did the French Revolution break out in 1789?",
      goals: ["Explain the social, financial and political causes of the Revolution", "Describe key events: the Estates-General, the Bastille, the Declaration of Rights, the Terror", "Explain why the Revolution mattered beyond France"],
      hint: "Think about who paid taxes, who went hungry, and what new ideas people were reading.",
      walk: "France was deeply in debt, partly from wars, including helping the American Revolution. The Third Estate (most people) paid most of the taxes while nobles and clergy paid little. Bad harvests made bread very expensive. Enlightenment ideas questioned the king’s absolute power. When King Louis XVI called the Estates-General in 1789 to raise money, the Third Estate broke away and declared itself the National Assembly. The storming of the Bastille showed that ordinary people would act.",
      summary: [
        "Causes: royal debt, an unfair tax system based on the three estates, food shortages and Enlightenment ideas about rights.",
        "1789 brought the National Assembly, the storming of the Bastille and the Declaration of the Rights of Man. The king was executed in 1793, the Terror followed, and Napoleon took power in 1799.",
      ],
      explain: [
        p("Before 1789, France was an absolute monarchy ruled by King Louis XVI. Society was divided into three estates."),
        h("The three estates"),
        list(
          "First Estate: the clergy. Few in number and paid little tax.",
          "Second Estate: the nobility. Also paid little tax and held many privileges.",
          "Third Estate: everyone else, about 97% of the people, from rich merchants to poor peasants. They paid most of the taxes.",
        ),
        h("Causes"),
        list(
          "Debt: wars, including support for the American Revolution, left the government nearly bankrupt.",
          "Hunger: poor harvests in 1788 made bread prices soar.",
          "Ideas: Enlightenment writers argued that people have natural rights and that government should serve the people.",
        ),
        h("Key events"),
        list(
          "May to June 1789: the Estates-General meets; the Third Estate declares itself the National Assembly.",
          "14 July 1789: the storming of the Bastille.",
          "August 1789: the Declaration of the Rights of Man and of the Citizen.",
          "1792 to 1793: France becomes a republic; Louis XVI is executed in January 1793.",
          "1793 to 1794: the Reign of Terror; thousands are executed as suspected enemies of the Revolution.",
          "1799: Napoleon Bonaparte seizes power.",
        ),
        tip("Key idea", "The Revolution spread the ideas of liberty, equality and the rights of citizens, but it also showed how revolutions can turn violent."),
      ],
      tryIt: [
        h("Cause or event?"),
        list("Rising bread prices: cause (short-term).", "Storming of the Bastille: event.", "Unfair taxes on the Third Estate: cause (long-term).", "Execution of Louis XVI: event and consequence."),
        p("Detective question: the Bastille held only seven prisoners. Why did attacking it matter? (It was a symbol of the king’s power, and the crowd also wanted its gunpowder.)"),
      ],
      practice: [
        { p: "Which estate paid most of the taxes?", a: "The Third Estate", w: [["The First Estate (clergy)", "The clergy paid little tax."], ["The Second Estate (nobles)", "Nobles had many tax privileges."]], x: "The Third Estate, most of the population, paid most taxes." },
        { p: "On what date was the Bastille stormed?", a: "14 July 1789", w: [["4 July 1776", "That is the American Declaration of Independence."], ["21 January 1793", "That is when Louis XVI was executed."]], x: "14 July is still France’s national day." },
      ],
      quiz: [
        { p: "Which was a short-term cause of the Revolution?", a: "Poor harvests made bread very expensive in 1788 to 1789", w: [["Napoleon becoming emperor", "That happened after the Revolution."], ["The execution of Louis XVI", "That was a result, in 1793."]], x: "Food shortages made people desperate in 1789." },
        { p: "Three statements about the French Revolution. Which is true?", a: "The Declaration of the Rights of Man set out rights for citizens.", w: [["The Revolution ended peacefully with no executions.", "The Terror saw thousands executed."], ["The king gained more power during the Revolution.", "The monarchy was abolished in 1792."]], x: "The Declaration stated liberty, equality and rights.", lineup: true },
        { p: "Why was France in debt before 1789?", a: "Costly wars, including helping the American Revolution, and an unfair tax system", w: [["Because the Third Estate refused to work", "The Third Estate paid most of the taxes."], ["Because of the Black Death", "The Black Death was over 400 years earlier."]], x: "War costs and a narrow tax base drained royal finances." },
      ],
      check: [
        { p: "What was the Reign of Terror?", a: "A period of mass executions of suspected enemies of the Revolution", w: [["A time of peace and good harvests", "It was a violent period, 1793 to 1794."], ["The rule of Napoleon", "Napoleon took power in 1799."]], x: "Thousands were executed in 1793 to 1794." },
        { p: "Who took power in France in 1799?", a: "Napoleon Bonaparte", w: [["Louis XVI", "Louis XVI was executed in 1793."], ["Queen Victoria", "Victoria ruled Britain, later."]], x: "Napoleon seized power in 1799." },
      ],
    },
  ],
};

const SLAVE_TRADE: ChapterSpec = {
  id: "slave-trade",
  number: "236",
  title: "The Case of the Broken Chains",
  topic: "The transatlantic slave trade and its abolition",
  subject: "history",
  grade: 9,
  tagline: "Understand how the transatlantic slave trade worked, and how enslaved people and campaigners fought to end it.",
  hook: "In 1789, a man named Olaudah Equiano published the story of his life: kidnapped as a child, enslaved, and finally free. His book became a bestseller. Why did one person’s story matter so much to the campaign against slavery?",
  goal: "Explain how the transatlantic slave trade operated, its human cost, and how it was abolished.",
  learn: ["Describe the triangular trade", "Explain the human cost of the trade", "Explain the roles of resistance and campaigning in abolition"],
  lessons: [
    {
      id: "abolition",
      title: "The transatlantic slave trade and its abolition",
      teaser: "A trade in human beings, and the long struggle to end it.",
      question: "Why was the transatlantic slave trade abolished, and who helped end it?",
      goals: ["Describe the triangular trade and the Middle Passage", "Explain the scale and human cost of the trade", "Explain how resistance by enslaved people and campaigns by abolitionists led to abolition"],
      hint: "Think about several groups: enslaved people who resisted, formerly enslaved writers, campaigners in Britain, and changing economics.",
      walk: "Abolition came from many forces together. Enslaved people resisted constantly, including the successful Haitian Revolution from 1791. Formerly enslaved people such as Olaudah Equiano told the truth about the trade. Campaigners such as Thomas Clarkson and William Wilberforce gathered evidence, organised petitions and boycotts of slave-grown sugar, and pushed Parliament. Britain abolished the slave trade in 1807 and slavery in most of its colonies in 1833.",
      summary: [
        "From the 1500s to the 1800s, about 12.5 million Africans were forced onto ships to the Americas. Many died on the Middle Passage. The enslaved were forced to work, mostly on plantations.",
        "Abolition came from resistance by enslaved people, the testimony of formerly enslaved people, and campaigns by abolitionists. Britain banned the trade in 1807 and slavery in most colonies in 1833.",
      ],
      explain: [
        p("This lesson deals with cruelty and suffering. It is important to remember that the people who were enslaved were people with families, names and cultures, and that many resisted."),
        h("The triangular trade"),
        list(
          "Ships sailed from European ports such as Liverpool, Bristol and Nantes with goods such as cloth and guns.",
          "In West Africa, these goods were exchanged for captured African people.",
          "The Middle Passage: enslaved people were shipped across the Atlantic in terrible, crowded conditions. Many died.",
          "In the Americas, enslaved people were sold and forced to work, mostly on sugar, cotton and tobacco plantations. Ships returned to Europe with these products.",
        ),
        p("Historians estimate that about 12.5 million Africans were forced onto ships, and over 10 million survived the crossing."),
        h("Resistance"),
        p("Enslaved people resisted in many ways: rebellions on ships and plantations, escape, working slowly, and keeping their cultures alive. In Saint-Domingue, enslaved people rose up in 1791, and in 1804 they founded the independent nation of Haiti."),
        h("The campaign for abolition"),
        list(
          "Formerly enslaved people, such as Olaudah Equiano, wrote powerful accounts of their experiences.",
          "Thomas Clarkson collected evidence, including the famous diagram of the slave ship Brookes.",
          "William Wilberforce led the campaign in Parliament.",
          "Ordinary people signed petitions and boycotted slave-grown sugar.",
        ),
        tip("Key idea", "Abolition was not one person’s achievement. Enslaved people’s resistance and testimony were central to it."),
        p("Britain abolished the slave trade in 1807. The Slavery Abolition Act of 1833 ended slavery in most British colonies, though formerly enslaved people were forced into “apprenticeships” until 1838, and slave owners, not the enslaved, received compensation."),
      ],
      tryIt: [
        h("Sources and their purposes"),
        list(
          "Equiano’s autobiography (1789): a first-hand account written to persuade readers to oppose slavery.",
          "The Brookes ship diagram (1788): used by campaigners to show how tightly people were packed.",
          "A plantation owner’s letter defending slavery: shows the arguments abolitionists were up against.",
        ),
        p("Discuss: why was the voice of a formerly enslaved person so persuasive to British readers?"),
      ],
      practice: [
        { p: "What was the Middle Passage?", a: "The forced voyage of enslaved Africans across the Atlantic", w: [["A trade route through the Middle East", "It was the Atlantic crossing."], ["A law that ended slavery", "It was the journey across the ocean."]], x: "It was the central leg of the triangular trade." },
        { p: "In which year did Britain abolish the slave trade?", a: "1807", w: [["1833", "1833 is when slavery itself was abolished in most British colonies."], ["1776", "1776 is the American Declaration of Independence."]], x: "The trade was banned in 1807." },
      ],
      quiz: [
        { p: "Which helped bring about abolition?", a: "Resistance by enslaved people together with campaigns by abolitionists", w: [["Plantation owners asking for it", "Most plantation owners fought against abolition."], ["It happened by accident", "It took decades of resistance and campaigning."]], x: "Many forces worked together." },
        { p: "Three statements about the slave trade. Which is true?", a: "Enslaved people in Saint-Domingue rose up and founded Haiti.", w: [["Enslaved people never resisted.", "Resistance was constant: revolts, escapes and more."], ["Formerly enslaved people received compensation in 1833.", "The slave owners were compensated, not the enslaved."]], x: "The Haitian Revolution led to independence in 1804.", lineup: true },
        { p: "Why did abolitionists publish the diagram of the slave ship Brookes?", a: "To show the public the terrible crowding on slave ships", w: [["To advertise the ship for sale", "It was used as campaign evidence."], ["To help design faster ships", "It was used to persuade people to oppose the trade."]], x: "The image shocked many people." },
      ],
      check: [
        { p: "Who was Olaudah Equiano?", a: "A formerly enslaved man whose autobiography helped the abolition campaign", w: [["A plantation owner", "He had been enslaved himself."], ["A king of France", "He was a writer and campaigner."]], x: "His 1789 book told his own story." },
        { p: "About how many Africans were forced onto ships in the transatlantic slave trade?", a: "About 12.5 million", w: [["About 12,500", "The real number is about a thousand times larger."], ["About 1 billion", "That is far more than historians estimate."]], x: "Historians estimate about 12.5 million." },
      ],
    },
  ],
};

const DEVELOPMENT: ChapterSpec = {
  id: "development",
  number: "237",
  title: "The Case of the Uneven World",
  topic: "Measuring development",
  subject: "geography",
  grade: 9,
  tagline: "Find out how geographers compare countries, and why one number is never enough.",
  hook: "Two countries have almost the same income per person. In one, people live to 82 on average; in the other, to 66. If wealth is the same, what explains the difference?",
  goal: "Use economic and social indicators, including the Human Development Index, to compare development between countries.",
  learn: ["Define development", "Use economic and social indicators", "Explain the Human Development Index and its limits"],
  lessons: [
    {
      id: "measuring-development",
      title: "Measuring development",
      teaser: "GNI per head, life expectancy, schooling and the HDI.",
      question: "Why do geographers use several indicators, not just income, to measure development?",
      goals: ["Define development", "Use indicators such as GNI per head, life expectancy and literacy", "Explain how the Human Development Index combines indicators, and its limits"],
      hint: "Can a country be rich on average but still have poor health care or schooling for many people?",
      walk: "Income per head is an average, so it hides inequality, and it does not show health or education. Two countries with similar income can have very different life expectancy because of differences in health care, clean water and how fairly wealth is shared. Using several indicators, or a combined one such as the HDI, gives a fuller picture.",
      summary: [
        "Development means improving people’s quality of life. It is measured by economic indicators (such as GNI per head) and social indicators (such as life expectancy, literacy and infant mortality).",
        "The Human Development Index (HDI) combines health, education and income into one score from 0 to 1. No single indicator shows the whole picture.",
      ],
      explain: [
        p("Development is about improving people’s lives: wealth, but also health, education, freedom and safety. Geographers compare countries using development indicators."),
        h("Economic indicators"),
        list(
          "GDP (gross domestic product): the total value of goods and services produced in a country in a year.",
          "GNI per head (per capita): a country’s total income divided by its population. It allows fair comparison between big and small countries.",
        ),
        h("Social indicators"),
        list(
          "Life expectancy: how long people are expected to live, on average.",
          "Infant mortality: how many babies die before their first birthday, per 1,000 born.",
          "Literacy rate: the percentage of adults who can read and write.",
          "Access to clean water and doctors per 1,000 people.",
        ),
        h("The Human Development Index"),
        p("The United Nations’ HDI combines three things: a long and healthy life (life expectancy), knowledge (years of schooling) and a decent standard of living (GNI per head). Scores range from 0 to 1. Countries such as Norway and Switzerland score above 0.95; some countries score below 0.45."),
        tip("Key idea", "Averages hide inequality. A high average income can hide large gaps between rich and poor within a country."),
      ],
      tryIt: [
        h("Compare two countries"),
        p("Country A: GNI per head high, life expectancy 66, adult literacy 70%. Country B: GNI per head similar, life expectancy 82, adult literacy 99%."),
        list("Income alone suggests they are equally developed.", "Health and education show that Country B is more developed in quality of life.", "Possible reasons for A: wealth held by few people, weak health care, money from one export such as oil."),
        p("Detective question: why might the HDI still miss something important? (It does not measure inequality, freedom or the environment.)"),
      ],
      practice: [
        { p: "What does GNI per head measure?", a: "A country’s total income divided by its population", w: [["How long people live", "That is life expectancy."], ["The number of doctors", "That is a health indicator."]], x: "Dividing by population allows fair comparison." },
        { p: "Which is a social indicator of development?", a: "Literacy rate", w: [["GDP", "GDP is an economic indicator."], ["GNI per head", "GNI per head is an economic indicator."]], x: "Social indicators measure quality of life, such as education." },
      ],
      quiz: [
        { p: "Why is income per head alone not enough to measure development?", a: "It is an average that hides inequality and says nothing directly about health or education", w: [["It is impossible to calculate", "It can be calculated; it just misses things."], ["Richer countries always have worse health", "Wealth and health are often linked, but not always."]], x: "Several indicators give a fuller picture." },
        { p: "Three statements about the HDI. Which is true?", a: "It combines life expectancy, education and income.", w: [["It only measures income.", "It combines three dimensions."], ["A score of 10 is the highest possible.", "HDI scores range from 0 to 1."]], x: "The HDI is a composite indicator.", lineup: true },
        { p: "Infant mortality is measured as...", a: "Deaths of babies under one year old per 1,000 born", w: [["The number of babies born per year", "That is related to the birth rate."], ["The average age of mothers", "Infant mortality is about babies’ deaths."]], x: "Lower infant mortality usually means better health care." },
      ],
      check: [
        { p: "Which organisation publishes the Human Development Index?", a: "The United Nations", w: [["The Olympic Committee", "The HDI is published by the UN Development Programme."], ["A single country’s government", "It is an international index."]], x: "The UN publishes HDI scores every year." },
        { p: "Two countries have the same GNI per head but different life expectancy. What could explain this?", a: "Differences in health care, clean water and how fairly wealth is shared", w: [["One country has more mountains", "Relief alone does not explain a big health gap."], ["They must have measured wrongly", "Real differences in health systems and inequality can explain it."]], x: "The same average income can hide very different lives." },
      ],
    },
  ],
};

const GLOBALISATION: ChapterSpec = {
  id: "globalisation",
  number: "238",
  title: "The Case of the Well-Travelled T-shirt",
  topic: "Globalisation",
  subject: "geography",
  grade: 9,
  tagline: "Trace how a single T-shirt connects farmers, factories, ships and shops around the world.",
  hook: "The label on a T-shirt says “Made in Bangladesh”. But the cotton was grown in India, the design came from Sweden, and it was sold in Canada. How did one T-shirt travel so far?",
  goal: "Explain globalisation, the factors that drive it, and its advantages and disadvantages for different people.",
  learn: ["Define globalisation", "Explain what drives it", "Weigh its benefits and costs"],
  lessons: [
    {
      id: "global-links",
      title: "Globalisation",
      teaser: "A more connected world, with winners and losers.",
      question: "Why is a T-shirt designed in Sweden, made in Bangladesh from Indian cotton, and sold in Canada?",
      goals: ["Define globalisation", "Explain how transport, communications and transnational corporations drive it", "Evaluate its advantages and disadvantages for different groups"],
      hint: "Think about where costs are lowest for each step, and how cheaply goods can now be shipped.",
      walk: "A transnational corporation (TNC) designs in one country and has products made where labour costs are lower, such as Bangladesh. Container ships make transport cheap, and the internet makes it easy to manage a supply chain spread across countries. Each step happens where it is cheapest or most efficient.",
      summary: [
        "Globalisation is the increasing connection of the world’s economies, cultures and people through trade, communication and travel.",
        "It is driven by cheaper transport (especially container shipping), the internet and transnational corporations. It brings jobs, growth and choice, but also inequality, poor working conditions and environmental costs.",
      ],
      explain: [
        p("Globalisation means that countries and people around the world are becoming more connected. Goods, money, ideas and people move between countries more easily than ever before."),
        h("What drives it"),
        list(
          "Transport: container ships carry huge loads cheaply, and air freight is fast.",
          "Communication: the internet and mobile phones let companies manage work across continents instantly.",
          "Transnational corporations (TNCs): companies that operate in many countries, placing each stage of production where it is cheapest or best.",
          "Trade agreements that reduce barriers to buying and selling between countries.",
        ),
        h("Advantages"),
        list("Jobs and income in countries where factories are built.", "Cheaper goods and more choice for shoppers.", "Faster sharing of ideas, technology and culture."),
        h("Disadvantages"),
        list(
          "Low wages and unsafe conditions in some factories. In 2013, the Rana Plaza garment factory collapsed in Bangladesh, killing more than 1,100 people.",
          "Jobs lost in countries where factories close and move abroad.",
          "Pollution and carbon emissions from production and long-distance transport.",
          "Local cultures and small businesses can be pushed aside by global brands.",
        ),
        tip("Key idea", "Globalisation affects different people differently. Ask: who benefits, and who pays the cost?"),
      ],
      tryIt: [
        h("Trace the supply chain"),
        list("Cotton grown in India.", "Cloth woven and T-shirt sewn in Bangladesh.", "Designed and branded by a company in Sweden.", "Shipped by container to Canada and sold in a shop."),
        p("Your view: name one person in this chain who benefits and one who may lose out, and explain why."),
      ],
      practice: [
        { p: "What is a transnational corporation (TNC)?", a: "A company that operates in more than one country", w: [["A government department for transport", "TNCs are businesses."], ["A type of container ship", "A TNC is a company."]], x: "TNCs spread their operations across countries." },
        { p: "Which invention made shipping goods around the world much cheaper?", a: "The shipping container", w: [["The steam train", "Trains matter on land, but containers transformed ocean shipping."], ["The telephone", "Phones help communication, not cargo costs."]], x: "Standard containers made loading and transport cheap." },
      ],
      quiz: [
        { p: "Why do many clothing companies have products made in countries such as Bangladesh?", a: "Labour costs are lower there", w: [["Because cotton cannot be grown anywhere else", "Cotton is grown in many countries."], ["Because shipping is free", "Shipping is cheap, but not free."]], x: "TNCs locate production where costs are lower." },
        { p: "Three statements about globalisation. Which is true?", a: "It can create jobs in some places and remove them in others.", w: [["It benefits everyone equally.", "Benefits and costs fall unevenly."], ["It only affects trade, not culture.", "It also spreads music, food, language and ideas."]], x: "Globalisation creates winners and losers.", lineup: true },
        { p: "Which is an environmental disadvantage of globalisation?", a: "More carbon emissions from long-distance transport", w: [["Cheaper goods for shoppers", "That is an advantage for consumers."], ["More jobs in factories", "That is an economic effect, not environmental."]], x: "Shipping and flying goods around the world adds emissions." },
      ],
      check: [
        { p: "What happened at Rana Plaza in 2013?", a: "A garment factory building collapsed in Bangladesh, killing more than 1,100 people", w: [["A new trade agreement was signed", "It was a factory disaster."], ["A container ship sank", "It was a building collapse."]], x: "It led to calls for safer working conditions." },
        { p: "How does the internet help globalisation?", a: "Companies can manage work and sell goods across countries instantly", w: [["It carries goods physically", "Goods still travel by ship, plane or truck."], ["It stops trade between countries", "It makes trade easier."]], x: "Fast communication links supply chains." },
      ],
    },
  ],
};

export const EXTRA_G9: ChapterSpec[] = [ELECTRICITY, CIRCULATION, SIMULTANEOUS, SCATTER, FRENCH, SLAVE_TRADE, DEVELOPMENT, GLOBALISATION];
