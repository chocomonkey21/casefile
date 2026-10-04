import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  ICSE, Grade 10: two chapters for each subject, one lesson each.
  ASSUMPTION: topics are ones commonly taught in ICSE (CISCE) schools at this level, chosen by the project team.
  They have not been checked against the official CISCE syllabus. Videos are in data/videos-curated.ts.
*/

const ELECTROLYSIS: ChapterSpec = {
  id: "icse-electrolysis",
  number: "341",
  board: "icse",
  title: "The Case of the Copper-Coated Key",
  topic: "Electrolysis",
  subject: "science",
  grade: 10,
  tagline: "Use electricity to split compounds and to coat metals.",
  hook: "A plain iron key is hung in a blue solution and connected to a battery. An hour later it is coated in shiny copper. Where did the copper come from?",
  goal: "Explain electrolysis, the movement of ions to electrodes, and uses such as electroplating.",
  learn: ["Define electrolytes and electrolysis", "Explain what happens at the cathode and anode", "Describe electroplating and the extraction of reactive metals"],
  lessons: [
    {
      id: "electrolysis-basics",
      title: "Electrolysis",
      teaser: "Positive ions to the cathode, negative ions to the anode.",
      question: "How does a battery coat an iron key with copper from a blue solution?",
      goals: ["Explain what an electrolyte is and why it must be molten or dissolved", "Describe the movement of ions and the reactions at the cathode and anode", "Explain electroplating and other uses of electrolysis"],
      hint: "The blue solution contains copper ions, which are positive. Which electrode attracts positive ions?",
      walk: "The blue solution is copper(II) sulphate, which contains Cu²⁺ ions. The key is made the cathode (negative electrode). Positive copper ions move to it, gain electrons and become copper atoms that coat the key: Cu²⁺ + 2e⁻ → Cu. If the anode is a copper plate, it dissolves to replace the copper ions in solution.",
      summary: [
        "Electrolysis is the decomposition of an electrolyte (a molten or dissolved ionic compound) by an electric current.",
        "Positive ions (cations) move to the cathode and gain electrons (reduction). Negative ions (anions) move to the anode and lose electrons (oxidation). Uses include electroplating, purifying copper and extracting reactive metals.",
      ],
      explain: [
        p("Ionic compounds conduct electricity only when molten or dissolved in water, because then their ions are free to move. Such a liquid is called an electrolyte."),
        h("The set-up"),
        list(
          "Two electrodes are placed in the electrolyte and connected to a direct-current supply.",
          "The cathode is the negative electrode. Cations (positive ions) move to it.",
          "The anode is the positive electrode. Anions (negative ions) move to it.",
        ),
        h("What happens at each electrode"),
        list(
          "At the cathode, cations gain electrons. This is reduction. For example, Cu²⁺ + 2e⁻ → Cu.",
          "At the anode, anions lose electrons. This is oxidation. For example, 2Cl⁻ → Cl₂ + 2e⁻.",
        ),
        tip("Key idea", "Memory aid: OIL RIG. Oxidation Is Loss of electrons, Reduction Is Gain."),
        h("Uses"),
        list(
          "Electroplating: coating an object with a thin layer of metal, such as silver on cutlery or nickel on steel, to protect it or make it look better. The object is the cathode.",
          "Purifying copper: impure copper is the anode; pure copper builds up on the cathode.",
          "Extracting reactive metals: aluminium is extracted by electrolysis of molten aluminium oxide.",
        ),
      ],
      tryIt: [
        h("Predict the products"),
        list("Molten lead(II) bromide: lead at the cathode, bromine at the anode.", "Copper(II) sulphate with copper electrodes: copper deposited on the cathode, copper anode dissolves.", "To silver-plate a spoon: the spoon is the cathode, a silver plate is the anode, and the electrolyte contains silver ions."),
        p("Back to the case: the key was the cathode, so copper ions from the blue solution were deposited on it."),
      ],
      practice: [
        { p: "Why must an ionic compound be molten or dissolved for electrolysis?", a: "So its ions are free to move", w: [["So it becomes a metal", "It stays ionic; the ions need to move."], ["So it gets heavier", "Mass is not the reason."]], x: "Moving ions carry the current." },
        { p: "Which electrode do positive ions move to?", a: "The cathode (negative electrode)", w: [["The anode (positive electrode)", "Opposite charges attract, so cations go to the negative cathode."], ["Neither", "Ions do move in electrolysis."]], x: "Cations move to the cathode." },
      ],
      quiz: [
        { p: "How does the iron key become coated in copper?", a: "Copper ions move to the key (the cathode), gain electrons and form copper", w: [["The iron turns into copper", "Iron does not change into copper; copper is deposited on it."], ["Copper ions move to the anode", "Positive copper ions move to the cathode."]], x: "Cu²⁺ + 2e⁻ → Cu at the cathode." },
        { p: "Three statements about electrolysis. Which is true?", a: "Oxidation happens at the anode.", w: [["Reduction happens at the anode.", "Reduction happens at the cathode."], ["Solid salt conducts electricity well.", "The ions cannot move in a solid."]], x: "Anions lose electrons at the anode.", lineup: true },
        { p: "In electroplating, which electrode is the object to be plated?", a: "The cathode", w: [["The anode", "The plating metal is usually the anode."], ["It is placed outside the solution", "It must be in the electrolyte."]], x: "Metal ions are deposited on the cathode." },
      ],
      check: [
        { p: "What does OIL RIG stand for?", a: "Oxidation Is Loss, Reduction Is Gain (of electrons)", w: [["Oxygen In, Liquid Removed In Gas", "It is a memory aid about electrons."], ["Only Ions Leave, Rarely In Gases", "It is about losing and gaining electrons."]], x: "It helps to remember electrode reactions." },
        { p: "How is aluminium extracted?", a: "By electrolysis of molten aluminium oxide", w: [["By heating its ore with charcoal", "Aluminium is too reactive for that."], ["By filtering sea water", "Aluminium comes from bauxite ore."]], x: "Reactive metals need electrolysis." },
      ],
    },
  ],
};

const RADIOACTIVITY: ChapterSpec = {
  id: "icse-radioactivity",
  number: "342",
  board: "icse",
  title: "The Case of the Fogged Photographic Plate",
  topic: "Radioactivity",
  subject: "science",
  grade: 10,
  tagline: "Discover the invisible radiation from unstable nuclei: alpha, beta and gamma.",
  hook: "In 1896, Henri Becquerel left uranium salts on a wrapped photographic plate in a dark drawer. When he developed it, the plate showed a dark image. No light had reached it. What had?",
  goal: "Describe radioactivity, compare alpha, beta and gamma radiation, and explain uses and safety.",
  learn: ["Explain radioactivity", "Compare alpha, beta and gamma radiation", "Describe uses, hazards and safety precautions"],
  lessons: [
    {
      id: "alpha-beta-gamma",
      title: "Radioactivity",
      teaser: "Unstable nuclei give out alpha, beta and gamma radiation.",
      question: "What fogged Becquerel’s wrapped photographic plate in the dark?",
      goals: ["Explain radioactivity as the spontaneous decay of unstable nuclei", "Compare the nature, charge, penetrating power and ionising power of alpha, beta and gamma radiation", "Describe uses of radioactivity and safety precautions"],
      hint: "Something from the uranium passed through the wrapping without being light.",
      walk: "Uranium nuclei are unstable. They decay spontaneously and give out radiation that can pass through paper wrapping and affect a photographic plate. Becquerel had discovered radioactivity.",
      summary: [
        "Radioactivity is the spontaneous emission of radiation from unstable nuclei. It is not affected by heat, pressure or chemical reactions.",
        "Alpha particles are helium nuclei: strongly ionising, stopped by paper. Beta particles are fast electrons: stopped by a few mm of aluminium. Gamma rays are electromagnetic waves: very penetrating, reduced by thick lead or concrete.",
      ],
      explain: [
        p("Some atoms have unstable nuclei. They change, or decay, by themselves, giving out radiation. This is radioactivity. Nothing we do, such as heating or squeezing, changes the rate at which a substance decays."),
        h("Three types of radiation"),
        list(
          "Alpha (α): two protons and two neutrons, a helium nucleus. Charge +2. Very strongly ionising, but stopped by a sheet of paper or a few centimetres of air.",
          "Beta (β): a fast-moving electron from the nucleus. Charge −1. Medium ionising. Stopped by a few millimetres of aluminium.",
          "Gamma (γ): a high-energy electromagnetic wave. No charge. Weakly ionising, but very penetrating. Reduced by thick lead or concrete.",
        ),
        tip("Key idea", "Ionising power and penetrating power are opposite: alpha ionises the most but penetrates the least; gamma penetrates the most but ionises the least."),
        h("Changes in the nucleus"),
        list("Alpha decay: the mass number falls by 4 and the atomic number by 2.", "Beta decay: a neutron becomes a proton; the atomic number rises by 1 and the mass number stays the same.", "Gamma emission: no change in mass number or atomic number; the nucleus loses energy."),
        h("Uses and safety"),
        list(
          "Uses: treating cancer (radiotherapy), sterilising medical equipment, tracers in medicine, carbon dating of ancient remains, and nuclear power.",
          "Hazards: radiation can damage cells and DNA, causing burns or cancer.",
          "Safety: handle sources with tongs, keep exposure time short, keep a distance, use shielding (lead) and wear monitoring badges.",
        ),
      ],
      tryIt: [
        h("Identify the radiation"),
        list("Stopped by paper: alpha.", "Passes through paper, stopped by 3 mm of aluminium: beta.", "Passes through aluminium, reduced by thick lead: gamma.", "Deflected towards a negative plate in an electric field: alpha (positive)."),
        p("Back to the case: Becquerel’s plate was fogged by radiation from the uranium that passed through the wrapping."),
      ],
      practice: [
        { p: "What is an alpha particle?", a: "A helium nucleus (2 protons and 2 neutrons)", w: [["A fast electron", "That is a beta particle."], ["An electromagnetic wave", "That is gamma radiation."]], x: "Alpha particles carry a +2 charge." },
        { p: "Which radiation is stopped by a sheet of paper?", a: "Alpha", w: [["Gamma", "Gamma needs thick lead or concrete."], ["Beta", "Beta needs a few millimetres of aluminium."]], x: "Alpha has the least penetrating power." },
      ],
      quiz: [
        { p: "What fogged Becquerel’s photographic plate?", a: "Radiation given out by the unstable uranium nuclei", w: [["Light leaking into the drawer", "The plate was wrapped and in the dark."], ["Heat from the uranium", "The effect came from radiation, not heat."]], x: "He had discovered radioactivity." },
        { p: "Three statements about radiation. Which is true?", a: "Gamma rays are the most penetrating of the three.", w: [["Alpha particles are the most penetrating.", "They are stopped by paper."], ["Heating a source speeds up its decay.", "Radioactive decay is not affected by heat."]], x: "Gamma rays need thick lead or concrete to reduce them.", lineup: true },
        { p: "In beta decay, what happens to the atomic number?", a: "It increases by 1", w: [["It decreases by 2", "That happens in alpha decay."], ["It stays the same", "That is gamma emission."]], x: "A neutron turns into a proton." },
      ],
      check: [
        { p: "Which is a safety precaution when handling radioactive sources?", a: "Use tongs and keep exposure time short", w: [["Hold the source close to your body", "Keep a safe distance."], ["Heat the source to make it safe", "Heating does not change radioactivity."]], x: "Time, distance and shielding reduce exposure." },
        { p: "Which radiation is an electromagnetic wave?", a: "Gamma", w: [["Alpha", "Alpha is a particle (helium nucleus)."], ["Beta", "Beta is a particle (electron)."]], x: "Gamma rays have no mass or charge." },
      ],
    },
  ],
};

const MATRICES: ChapterSpec = {
  id: "icse-matrices",
  number: "343",
  board: "icse",
  title: "The Case of the Shop Ledger",
  topic: "Matrices",
  subject: "maths",
  grade: 10,
  tagline: "Store numbers in tables called matrices, and add and multiply them.",
  hook: "Two branches of a bakery record their weekly sales of bread and cakes in neat tables. The owner wants the total for both branches, and the takings using each item’s price. Matrices make both jobs quick.",
  goal: "Understand the order of a matrix and carry out addition, subtraction and multiplication of matrices.",
  learn: ["Find the order of a matrix", "Add, subtract and multiply by a number", "Multiply two matrices when possible"],
  lessons: [
    {
      id: "matrix-operations",
      title: "Matrices",
      teaser: "Rows, columns, and multiplying row by column.",
      question: "Branch A sells [20 15] (bread, cakes) and branch B sells [25 10]. Bread costs ₹40 and cakes ₹60. How can matrices give the total takings of each branch?",
      goals: ["Write the order of a matrix as rows × columns", "Add and subtract matrices of the same order, and multiply by a scalar", "Multiply two matrices and know when multiplication is possible"],
      hint: "Put the sales in a 2 × 2 matrix and the prices in a 2 × 1 column matrix, then multiply row by column.",
      walk: "Sales matrix S has rows (20, 15) and (25, 10). Price matrix P is the column (40, 60). S × P = (20 × 40 + 15 × 60, 25 × 40 + 10 × 60) = (800 + 900, 1,000 + 600) = (1,700, 1,600). Branch A takes ₹1,700 and branch B ₹1,600.",
      summary: [
        "A matrix is a rectangular arrangement of numbers in rows and columns. Its order is rows × columns.",
        "Matrices of the same order are added element by element. To multiply A × B, the number of columns of A must equal the number of rows of B; each entry is a row of A times a column of B. In general, AB ≠ BA.",
      ],
      explain: [
        p("A matrix is a rectangular array of numbers, written in brackets. A matrix with 2 rows and 3 columns has order 2 × 3."),
        h("Types"),
        list("Row matrix: one row, such as [3 5 7].", "Column matrix: one column.", "Square matrix: as many rows as columns.", "Zero matrix: all entries are 0.", "Identity matrix I: 1s on the main diagonal and 0s elsewhere. AI = IA = A."),
        h("Adding and subtracting"),
        p("Only matrices of the same order can be added or subtracted. Add or subtract the matching entries. Multiplying by a number (a scalar) multiplies every entry."),
        h("Multiplying two matrices"),
        p("A × B is possible only if the number of columns of A equals the number of rows of B. If A is m × n and B is n × p, the product is m × p. Each entry is found by multiplying a row of A by a column of B, entry by entry, and adding."),
        tip("Key idea", "Matrix multiplication is not commutative: AB is usually different from BA, and one of them may not even be possible."),
      ],
      tryIt: [
        h("Calculate"),
        list(
          "[1 2; 3 4] + [5 6; 7 8] = [6 8; 10 12].",
          "3 × [2 −1; 0 4] = [6 −3; 0 12].",
          "[1 2; 3 4] × [5; 6] = [1 × 5 + 2 × 6; 3 × 5 + 4 × 6] = [17; 39].",
        ),
        p("(Here a semicolon separates the rows.)"),
      ],
      practice: [
        { p: "What is the order of a matrix with 3 rows and 2 columns?", a: "3 × 2", w: [["2 × 3", "Rows come first."], ["6", "The order is written as rows × columns."]], x: "Order = rows × columns." },
        { p: "Can a 2 × 3 matrix be added to a 3 × 2 matrix?", a: "No, they have different orders", w: [["Yes, always", "Only matrices of the same order can be added."], ["Yes, if you swap the rows", "The orders must match exactly."]], x: "Addition needs the same order." },
      ],
      quiz: [
        { p: "Sales [20 15; 25 10] × prices [40; 60]. What are the takings?", a: "₹1,700 and ₹1,600", w: [["₹800 and ₹1,000", "Those are only the bread takings."], ["₹3,300 and ₹0", "Multiply each row by the price column."]], x: "20 × 40 + 15 × 60 = 1,700; 25 × 40 + 10 × 60 = 1,600." },
        { p: "Three statements about matrices. Which is true?", a: "In general, AB is not equal to BA.", w: [["Any two matrices can be multiplied.", "The columns of the first must equal the rows of the second."], ["To add matrices, multiply matching entries.", "You add matching entries."]], x: "Matrix multiplication is not commutative.", lineup: true },
        { p: "A is 2 × 3 and B is 3 × 4. What is the order of AB?", a: "2 × 4", w: [["3 × 3", "The product takes the rows of A and the columns of B."], ["AB is not possible", "Columns of A (3) equal rows of B (3), so it is possible."]], x: "m × n times n × p gives m × p." },
      ],
      check: [
        { p: "What is the identity matrix?", a: "A square matrix with 1s on the main diagonal and 0s elsewhere", w: [["A matrix full of 1s", "Only the diagonal has 1s."], ["A matrix full of 0s", "That is the zero matrix."]], x: "Multiplying by I leaves a matrix unchanged." },
        { p: "Find 2 × [1 3; 0 5].", a: "[2 6; 0 10]", w: [["[3 5; 2 7]", "Multiply each entry by 2, do not add 2."], ["[2 3; 0 5]", "Every entry is multiplied."]], x: "Scalar multiplication multiplies every entry." },
      ],
    },
  ],
};

const SECTION: ChapterSpec = {
  id: "icse-section-formula",
  number: "344",
  board: "icse",
  title: "The Case of the Meeting Point",
  topic: "Section and mid-point formula",
  subject: "maths",
  grade: 10,
  tagline: "Find the point that divides a line in a given ratio, using coordinates.",
  hook: "Two friends live at A(2, 3) and B(10, 7) on a town grid. They agree to meet at a café that is twice as far from A as from B, on the straight road between them. Where is the café?",
  goal: "Use the section formula and the mid-point formula to find points dividing a line segment.",
  learn: ["Use the mid-point formula", "Use the section formula for internal division", "Find the ratio in which a point divides a segment"],
  lessons: [
    {
      id: "section-midpoint",
      title: "Section and mid-point formula",
      teaser: "Divide a line segment in the ratio m : n.",
      question: "A café on segment AB, with A(2, 3) and B(10, 7), divides AB in the ratio 2 : 1. What are its coordinates?",
      goals: ["Use the mid-point formula", "Use the section formula for a point dividing a segment internally in the ratio m : n", "Find the ratio in which a given point divides a segment"],
      hint: "Use x = (m x₂ + n x₁) ÷ (m + n), and the same for y.",
      walk: "With m : n = 2 : 1, A(2, 3) and B(10, 7): x = (2 × 10 + 1 × 2) ÷ 3 = 22 ÷ 3 ≈ 7.33, and y = (2 × 7 + 1 × 3) ÷ 3 = 17 ÷ 3 ≈ 5.67. The café is at (22/3, 17/3). It is twice as far from A as from B, as required.",
      summary: [
        "Section formula: the point dividing the segment from A(x₁, y₁) to B(x₂, y₂) internally in the ratio m : n is ((m x₂ + n x₁) ÷ (m + n), (m y₂ + n y₁) ÷ (m + n)).",
        "Mid-point formula (ratio 1 : 1): ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2).",
      ],
      explain: [
        p("Coordinate geometry uses coordinates to describe points and lines. Often we need a point on a line segment that divides it in a given ratio."),
        h("Mid-point"),
        p("The mid-point of A(x₁, y₁) and B(x₂, y₂) is ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2). It is simply the average of the coordinates. The mid-point of (2, 4) and (8, 10) is (5, 7)."),
        h("Section formula"),
        p("If P divides AB internally in the ratio m : n (AP : PB = m : n), then P = ((m x₂ + n x₁) ÷ (m + n), (m y₂ + n y₁) ÷ (m + n)). Notice that m is multiplied by B’s coordinates and n by A’s."),
        tip("Key idea", "Check your answer: a point dividing AB in the ratio m : n with m bigger than n should be closer to B."),
        h("Finding the ratio"),
        p("If you know the point and need the ratio, write the ratio as k : 1, substitute into the formula, and solve for k. If a point lies on the x-axis, its y-coordinate is 0; on the y-axis, its x-coordinate is 0."),
      ],
      tryIt: [
        h("Calculate"),
        list(
          "Mid-point of (−2, 5) and (6, −1): (2, 2).",
          "Point dividing A(1, 2) to B(7, 8) in the ratio 1 : 2: x = (1 × 7 + 2 × 1) ÷ 3 = 3, y = (1 × 8 + 2 × 2) ÷ 3 = 4. So (3, 4).",
          "In what ratio does the x-axis divide the segment from (2, −3) to (5, 6)? Using k : 1, y = (6k − 3) ÷ (k + 1) = 0, so k = 1/2: the ratio is 1 : 2.",
        ),
        p("Back to the case: the café is at (22/3, 17/3), about (7.3, 5.7) on the town grid."),
      ],
      practice: [
        { p: "Find the mid-point of (2, 4) and (8, 10).", a: "(5, 7)", w: [["(6, 6)", "Add the matching coordinates and halve: (2 + 8) ÷ 2 = 5."], ["(10, 14)", "Remember to divide by 2."]], x: "Average the x-values and the y-values." },
        { p: "In the section formula, which point’s coordinates are multiplied by m?", a: "B, the end point", w: [["A, the starting point", "A’s coordinates are multiplied by n."], ["Neither", "m multiplies B’s coordinates."]], x: "P = (m x₂ + n x₁) ÷ (m + n)." },
      ],
      quiz: [
        { p: "A(2, 3), B(10, 7). Which point divides AB in the ratio 2 : 1?", a: "(22/3, 17/3)", w: [["(6, 5)", "That is the mid-point (ratio 1 : 1)."], ["(14/3, 13/3)", "That divides AB in the ratio 1 : 2, closer to A."]], x: "x = (20 + 2) ÷ 3, y = (14 + 3) ÷ 3." },
        { p: "Three statements about the section formula. Which is true?", a: "The mid-point formula is the section formula with ratio 1 : 1.", w: [["A point dividing AB in the ratio 3 : 1 is closer to A.", "It is closer to B."], ["The formula adds the ratio numbers to the coordinates.", "It uses a weighted average."]], x: "With m = n = 1, the formula gives the average.", lineup: true },
        { p: "A point lies on the y-axis. What is its x-coordinate?", a: "0", w: [["1", "Points on the y-axis have x = 0."], ["It can be any number", "On the y-axis, x is always 0."]], x: "Use this fact to find unknown ratios." },
      ],
      check: [
        { p: "Find the point dividing A(1, 2) to B(7, 8) in the ratio 1 : 2.", a: "(3, 4)", w: [["(5, 6)", "That divides it in the ratio 2 : 1."], ["(4, 5)", "That is the mid-point."]], x: "x = (7 + 2) ÷ 3 = 3, y = (8 + 4) ÷ 3 = 4." },
        { p: "M(4, 1) is the mid-point of A(2, −3) and B. What is B?", a: "(6, 5)", w: [["(3, −1)", "That is the mid-point of A and M."], ["(2, 4)", "Use (2 + x) ÷ 2 = 4 and (−3 + y) ÷ 2 = 1."]], x: "x = 2 × 4 − 2 = 6, y = 2 × 1 + 3 = 5." },
      ],
    },
  ],
};

const PARLIAMENT: ChapterSpec = {
  id: "icse-parliament",
  number: "345",
  board: "icse",
  title: "The Case of the Two Houses",
  topic: "The Union Parliament",
  subject: "history",
  grade: 10,
  tagline: "Find out how India’s Parliament is made up and how a bill becomes law.",
  hook: "A bill passes in the Lok Sabha, but the Rajya Sabha wants changes. The two houses disagree. Who decides, and how does a bill become a law?",
  goal: "Describe the structure, powers and law-making process of the Union Parliament.",
  learn: ["Describe the Lok Sabha and the Rajya Sabha", "Explain the powers of Parliament", "Explain how a bill becomes a law"],
  lessons: [
    {
      id: "lok-rajya-sabha",
      title: "The Union Parliament",
      teaser: "The President, the Lok Sabha and the Rajya Sabha.",
      question: "If the Lok Sabha and the Rajya Sabha disagree about an ordinary bill, how is it decided?",
      goals: ["Describe the composition of the Lok Sabha and the Rajya Sabha", "Explain the main powers and functions of Parliament", "Explain how a bill becomes law, including a joint sitting"],
      hint: "The Constitution provides a special meeting of both houses together.",
      walk: "If the two houses disagree on an ordinary bill, the President can call a joint sitting of both houses, presided over by the Speaker of the Lok Sabha. The bill is decided by a majority of members present and voting. Because the Lok Sabha has more members, it usually has the advantage. (Money bills are different: the Rajya Sabha can only delay them for 14 days.)",
      summary: [
        "Parliament consists of the President, the Lok Sabha (House of the People, directly elected) and the Rajya Sabha (Council of States, elected indirectly by state legislatures).",
        "Parliament makes laws, controls the budget and holds the government to account. A bill must pass both houses and get the President’s assent to become law.",
      ],
      explain: [
        p("India is a parliamentary democracy. The Union Parliament is the country’s law-making body."),
        h("The Lok Sabha"),
        list(
          "Members are directly elected by the people.",
          "At present it has 543 elected seats, each representing a constituency.",
          "Its normal term is five years, though it can be dissolved earlier.",
          "It is presided over by the Speaker.",
          "A citizen must be at least 25 years old to be a member.",
        ),
        h("The Rajya Sabha"),
        list(
          "Members are elected by the elected members of state legislative assemblies; 12 are nominated by the President for their knowledge of art, science, literature or social service.",
          "The maximum strength is 250.",
          "It is a permanent house: it is never dissolved; one-third of its members retire every two years, and each serves six years.",
          "The Vice-President of India is its chairperson. A member must be at least 30 years old.",
        ),
        h("How a bill becomes law"),
        list(
          "A bill is introduced in either house (a money bill only in the Lok Sabha).",
          "It goes through readings and debate, and may be examined by a committee.",
          "It must be passed by both houses.",
          "It goes to the President for assent; then it becomes an Act.",
        ),
        tip("Key idea", "The Lok Sabha is more powerful on money matters, and the Council of Ministers is responsible to the Lok Sabha."),
      ],
      tryIt: [
        h("Lok Sabha or Rajya Sabha?"),
        list("Directly elected by voters: Lok Sabha.", "Never dissolved: Rajya Sabha.", "Money bills introduced here: Lok Sabha.", "Chaired by the Vice-President: Rajya Sabha."),
        p("Back to the case: if the houses disagree on an ordinary bill, the President can call a joint sitting to decide it."),
      ],
      practice: [
        { p: "Who presides over the Lok Sabha?", a: "The Speaker", w: [["The Vice-President", "The Vice-President chairs the Rajya Sabha."], ["The Prime Minister", "The PM leads the government but does not preside over the house."]], x: "The Speaker conducts the house’s business." },
        { p: "How are Rajya Sabha members mostly chosen?", a: "By elected members of the state legislative assemblies", w: [["Directly by all voters", "That is the Lok Sabha."], ["By the Supreme Court", "Courts do not choose members of Parliament."]], x: "Most are elected indirectly; 12 are nominated." },
      ],
      quiz: [
        { p: "If the two houses disagree on an ordinary bill, what can happen?", a: "The President can call a joint sitting of both houses", w: [["The bill is automatically dropped forever", "A joint sitting can resolve the deadlock."], ["The Supreme Court votes on it", "Courts do not pass laws."]], x: "Joint sittings are presided over by the Speaker." },
        { p: "Three statements about Parliament. Which is true?", a: "The Rajya Sabha is a permanent house and is never dissolved.", w: [["The Lok Sabha members serve six-year terms.", "Lok Sabha terms are normally five years."], ["A money bill can be introduced in the Rajya Sabha.", "Money bills can only be introduced in the Lok Sabha."]], x: "One-third of Rajya Sabha members retire every two years.", lineup: true },
        { p: "What is the minimum age to be a member of the Rajya Sabha?", a: "30 years", w: [["25 years", "That is for the Lok Sabha."], ["18 years", "That is the voting age."]], x: "Rajya Sabha members must be at least 30." },
      ],
      check: [
        { p: "What is the final step before a bill becomes an Act?", a: "The President gives assent", w: [["The Prime Minister signs it", "The President’s assent is needed."], ["It is published in a newspaper", "Assent comes from the President."]], x: "Assent turns a passed bill into law." },
        { p: "For how long can the Rajya Sabha delay a money bill?", a: "14 days", w: [["Six months", "Its powers over money bills are limited to 14 days."], ["Forever", "It cannot block a money bill."]], x: "The Lok Sabha has the final say on money bills." },
      ],
    },
  ],
};

const UNITED_NATIONS: ChapterSpec = {
  id: "icse-united-nations",
  number: "346",
  board: "icse",
  title: "The Case of the Blue Helmets",
  topic: "The United Nations",
  subject: "history",
  grade: 10,
  tagline: "Learn why the United Nations was created and how its main organs work.",
  hook: "After two world wars, 51 countries signed a charter in 1945 promising to “save succeeding generations from the scourge of war”. Today the organisation has 193 members. How does it try to keep that promise?",
  goal: "Explain why the UN was founded, describe its objectives and main organs, and evaluate its work.",
  learn: ["Explain why the UN was founded", "Describe its objectives and principal organs", "Describe the work of its agencies"],
  lessons: [
    {
      id: "un-organs",
      title: "The United Nations",
      teaser: "General Assembly, Security Council and agencies.",
      question: "Why was the United Nations created, and why can a single permanent member block a Security Council decision?",
      goals: ["Explain the reasons for founding the UN in 1945", "Describe the General Assembly, the Security Council and other principal organs", "Describe the work of agencies such as UNICEF and the WHO"],
      hint: "The founders wanted the great powers to stay involved. What power did they give them?",
      walk: "The UN was founded in 1945 to prevent another world war, after the League of Nations had failed. To keep the most powerful countries committed, the five permanent members of the Security Council (China, France, Russia, the United Kingdom and the United States) were given a veto. If any one of them votes against a substantive resolution, it fails.",
      summary: [
        "The UN was founded on 24 October 1945 to maintain international peace and security, develop friendly relations, and promote human rights and cooperation. It now has 193 member states.",
        "Its principal organs include the General Assembly (all members, one vote each), the Security Council (15 members, 5 permanent with a veto), the Secretariat, the International Court of Justice and the Economic and Social Council.",
      ],
      explain: [
        p("The United Nations was set up after World War II, which had shown that the earlier League of Nations could not prevent war. Its Charter came into force on 24 October 1945, now celebrated as UN Day. Its headquarters are in New York."),
        h("Objectives"),
        list("To maintain international peace and security.", "To develop friendly relations among nations.", "To cooperate in solving international problems and promote human rights.", "To be a centre for harmonising the actions of nations."),
        h("Principal organs"),
        list(
          "General Assembly: all 193 members, each with one vote. It discusses world issues and approves the UN budget.",
          "Security Council: 15 members. Five are permanent (China, France, Russia, the United Kingdom and the United States) and have a veto; ten are elected for two-year terms. It can authorise peacekeeping missions and sanctions.",
          "Secretariat: the UN’s staff, led by the Secretary-General.",
          "International Court of Justice: at The Hague, it settles legal disputes between states.",
          "Economic and Social Council (ECOSOC): coordinates economic, social and humanitarian work.",
        ),
        h("Agencies"),
        list("UNICEF: works for children’s health, education and protection.", "WHO (World Health Organization): leads on global health.", "UNESCO: education, science and culture, including World Heritage Sites."),
        tip("Key idea", "The veto keeps the great powers inside the UN, but it can also stop the Security Council from acting."),
        p("UN peacekeepers, often called “blue helmets”, have served in many conflict zones. India has been one of the largest contributors of peacekeeping troops."),
      ],
      tryIt: [
        h("Which organ or agency?"),
        list("Settles a border dispute between two countries: International Court of Justice.", "Sends peacekeepers to a conflict: Security Council.", "Runs a vaccination campaign for children: UNICEF, with the WHO.", "Where every member country has one vote: General Assembly."),
        p("Discuss: should the veto be reformed? What would be gained and lost?"),
      ],
      practice: [
        { p: "When was the United Nations founded?", a: "1945", w: [["1919", "The League of Nations was set up after World War I."], ["1947", "The UN was founded in 1945."]], x: "The Charter came into force on 24 October 1945." },
        { p: "How many permanent members does the Security Council have?", a: "Five", w: [["Fifteen", "The Council has 15 members, but only five are permanent."], ["193", "That is the number of UN member states."]], x: "China, France, Russia, the UK and the USA." },
      ],
      quiz: [
        { p: "Why can one permanent member block a Security Council decision?", a: "The five permanent members have a veto", w: [["Any member of the UN can veto Security Council decisions", "Only the five permanent members have a veto."], ["The Secretary-General votes last", "The Secretary-General does not have a veto."]], x: "A single veto stops a substantive resolution." },
        { p: "Three statements about the UN. Which is true?", a: "In the General Assembly, each member state has one vote.", w: [["The International Court of Justice is in New York.", "It is at The Hague."], ["The UN was founded before World War II.", "It was founded in 1945, after the war."]], x: "All members are equal in the General Assembly.", lineup: true },
        { p: "Which UN agency works mainly for children?", a: "UNICEF", w: [["UNESCO", "UNESCO focuses on education, science and culture."], ["The International Court of Justice", "It settles legal disputes between states."]], x: "UNICEF works on children’s health, education and protection." },
      ],
      check: [
        { p: "Who leads the UN Secretariat?", a: "The Secretary-General", w: [["The President of the USA", "The UN is led by the Secretary-General."], ["The judges of the ICJ", "They lead the court, not the Secretariat."]], x: "The Secretary-General is the UN’s chief administrator." },
        { p: "What was one reason the UN was set up?", a: "The League of Nations had failed to prevent another world war", w: [["To replace all national governments", "Countries keep their own governments."], ["To run the Olympic Games", "That is a separate organisation."]], x: "The UN aimed to do better than the League." },
      ],
    },
  ],
};

const MONSOON: ChapterSpec = {
  id: "icse-monsoon",
  number: "347",
  board: "icse",
  title: "The Case of the Bursting Rains",
  topic: "The climate of India: the monsoon",
  subject: "geography",
  grade: 10,
  tagline: "Explain how the monsoon winds bring most of India’s rain, and why their timing matters so much.",
  hook: "Around 1 June, the south-west monsoon usually reaches Kerala, and over the next weeks heavy rain spreads across almost the whole country. Months later the winds reverse. Why do the winds change direction with the seasons?",
  goal: "Explain the mechanism of the Indian monsoon and describe India’s seasons and rainfall pattern.",
  learn: ["Explain how the monsoon works", "Describe the seasons of India", "Explain the importance and unreliability of the monsoon"],
  lessons: [
    {
      id: "monsoon-mechanism",
      title: "The climate of India: the monsoon",
      teaser: "Seasonal reversal of winds, driven by land heating faster than sea.",
      question: "Why do the monsoon winds blow from the sea in summer and from the land in winter?",
      goals: ["Explain the monsoon as a seasonal reversal of winds caused by differential heating", "Describe India’s four seasons", "Explain why the monsoon is important and why it is unreliable"],
      hint: "Land heats up and cools down faster than the sea. What does that do to air pressure?",
      walk: "In summer, the land of north-west India heats strongly and a low-pressure area forms, while the Indian Ocean stays cooler with higher pressure. Moist winds blow from the sea towards the land: the south-west monsoon, bringing heavy rain. In winter, the land cools quickly and develops high pressure, so dry winds blow from the land towards the sea: the north-east monsoon.",
      summary: [
        "The monsoon is a seasonal reversal of winds caused by the different heating of land and sea, helped by the shifting of pressure belts and other factors.",
        "The south-west monsoon (June to September) brings most of India’s rain. The north-east monsoon (October to December) brings rain to the Tamil Nadu coast. The monsoon’s timing and amount vary from year to year.",
      ],
      explain: [
        p("India has a tropical monsoon climate. The word monsoon comes from the Arabic “mausim”, meaning season."),
        h("How the monsoon works"),
        list(
          "Differential heating: land heats and cools faster than the sea.",
          "In summer, intense heating creates low pressure over north-west India; the sea has relatively high pressure. Moist south-west winds blow inland.",
          "The pressure belts shift north with the overhead Sun, pulling the south-east trade winds across the Equator, where they turn into the south-west monsoon.",
          "In winter, the land cools and high pressure forms over north India. Dry north-east winds blow out to sea.",
        ),
        h("The seasons of India"),
        list(
          "Cold weather season (December to February): cool, mostly dry. Western disturbances bring some rain and snow to the north-west.",
          "Hot weather season (March to May): very hot in the north; local hot winds like the loo.",
          "Advancing monsoon (June to September): the south-west monsoon brings heavy rain. The Western Ghats and the north-east (for example, Mawsynram) get very heavy rainfall.",
          "Retreating monsoon (October to November): winds weaken and reverse; the Tamil Nadu coast gets rain from the north-east monsoon.",
        ),
        tip("Key idea", "Mountains matter: the Western Ghats force moist winds to rise and drop rain on their windward side, leaving a dry rain-shadow area to the east."),
        h("Why it matters"),
        p("Much of India’s farming depends on monsoon rain. A late, weak or broken monsoon can cause drought; very heavy rain can cause floods. Forecasting the monsoon is vital for farmers and planners."),
      ],
      tryIt: [
        h("Explain these"),
        list("Mumbai gets heavy rain in July: the south-west monsoon hits the Western Ghats.", "Chennai gets much of its rain in October and November: the north-east monsoon.", "Pune, east of the Ghats, gets much less rain than Mumbai: it lies in a rain shadow."),
        p("Back to the case: the winds reverse because land heats and cools faster than the sea, which swaps where high and low pressure lie."),
      ],
      practice: [
        { p: "What causes the monsoon winds to reverse?", a: "Land and sea heat and cool at different rates, changing the pressure", w: [["The Moon’s gravity", "The Moon causes tides, not the monsoon."], ["Earthquakes", "The monsoon is a weather system."]], x: "This is differential heating." },
        { p: "Which monsoon brings most of India’s rainfall?", a: "The south-west monsoon", w: [["The north-east monsoon", "It brings rain mainly to the Tamil Nadu coast."], ["Western disturbances", "These bring winter rain to the north-west."]], x: "June to September brings most rain." },
      ],
      quiz: [
        { p: "Why do monsoon winds blow from the sea to the land in summer?", a: "The land heats up and forms low pressure, while the sea has higher pressure", w: [["The sea is hotter than the land in summer", "The land heats faster."], ["Winds always blow from sea to land", "In winter they blow from land to sea."]], x: "Air moves from high pressure to low pressure." },
        { p: "Three statements about the Indian monsoon. Which is true?", a: "The Tamil Nadu coast gets much of its rain from the north-east monsoon.", w: [["The monsoon brings the same amount of rain every year.", "It varies, causing droughts and floods."], ["The monsoon winds blow in the same direction all year.", "They reverse with the seasons."]], x: "The retreating monsoon picks up moisture over the Bay of Bengal.", lineup: true },
        { p: "Why does Pune get less rain than Mumbai?", a: "Pune is in the rain shadow, east of the Western Ghats", w: [["Pune is closer to the sea", "Mumbai is on the coast."], ["Pune has no monsoon at all", "It gets some rain, but much less."]], x: "Moist air drops rain on the windward side of the Ghats." },
      ],
      check: [
        { p: "Where does the south-west monsoon usually arrive first, around 1 June?", a: "Kerala", w: [["Punjab", "The monsoon reaches the north-west last."], ["Rajasthan", "Rajasthan receives the monsoon late, if at all in some areas."]], x: "It then spreads north across the country." },
        { p: "Why is the monsoon so important to India?", a: "Much of India’s farming depends on its rain", w: [["It stops all earthquakes", "It is unrelated to earthquakes."], ["It only affects mountain areas", "It affects almost the whole country."]], x: "A failed monsoon can cause drought and food shortages." },
      ],
    },
  ],
};

const SOILS: ChapterSpec = {
  id: "icse-soils-india",
  number: "348",
  board: "icse",
  title: "The Case of the Black Cotton Fields",
  topic: "Soils of India",
  subject: "geography",
  grade: 10,
  tagline: "Match India’s main soil types to where they are found and what grows in them.",
  hook: "Farmers on the Deccan Plateau grow cotton in sticky black soil that cracks in summer. On the Ganga plains, wheat and rice grow in soft, grey alluvium. Why is India’s soil so different from place to place?",
  goal: "Describe the formation, distribution, characteristics and crops of India’s main soil types, and explain soil erosion and conservation.",
  learn: ["Describe the formation of soil", "Describe alluvial, black, red and laterite soils", "Explain soil erosion and conservation"],
  lessons: [
    {
      id: "soil-types",
      title: "Soils of India",
      teaser: "Alluvial, black, red and laterite soils.",
      question: "Why is black soil on the Deccan Plateau so good for growing cotton?",
      goals: ["Explain how parent rock and climate shape soil", "Describe the main soil types of India, where they are found and their crops", "Explain the causes of soil erosion and methods of conservation"],
      hint: "Black soil formed from volcanic lava. How does it behave with water?",
      walk: "Black soil (regur) formed from the weathering of volcanic basalt rock on the Deccan Plateau. It is rich in clay, which holds moisture for a long time, and in minerals such as iron, lime and magnesium. Cotton needs plenty of moisture through its growing season, so black soil suits it well; that is why it is called black cotton soil.",
      summary: [
        "Soil type depends on parent rock, climate, relief, vegetation and time. India’s main soils are alluvial, black, red and laterite.",
        "Alluvial soils (northern plains) suit wheat, rice and sugarcane. Black soil (Deccan) suits cotton. Red soil (eastern and southern plateaus) suits millets and pulses with fertilisers. Laterite (heavy-rainfall areas) suits tea, coffee and cashew.",
      ],
      explain: [
        p("Soil forms from weathered rock mixed with humus. Its type depends on the parent rock, climate (temperature and rainfall), slope, vegetation and how long it has been forming."),
        h("Main soil types of India"),
        list(
          "Alluvial soil: deposited by rivers on the northern plains and in coastal deltas. Very fertile and easy to plough; rich in potash, often poor in nitrogen. Crops: wheat, rice, sugarcane, jute.",
          "Black soil (regur): formed from volcanic basalt on the Deccan Plateau (Maharashtra, Gujarat, Madhya Pradesh). Clayey, holds moisture, swells when wet and cracks when dry. Crops: cotton, soybean, sugarcane.",
          "Red soil: formed from old crystalline rocks in low-rainfall areas of the eastern and southern plateaus. Red because of iron oxides; generally less fertile. Crops: millets, pulses, groundnut, with fertilisers.",
          "Laterite soil: formed in areas of high temperature and heavy rainfall, where rain washes nutrients out (leaching). Found in parts of the Western Ghats, Kerala, Karnataka and the north-east. Crops: tea, coffee, cashew, with fertilisers.",
        ),
        tip("Key idea", "Leaching in heavy rain removes soluble nutrients, which is why laterite soils need fertilisers."),
        h("Soil erosion and conservation"),
        list(
          "Causes: deforestation, overgrazing, heavy rain on bare slopes, strong winds in dry areas and poor farming methods.",
          "Conservation: planting trees (afforestation), terrace farming and contour ploughing on slopes, shelter belts against wind, checking gullies with small dams, and controlled grazing.",
        ),
      ],
      tryIt: [
        h("Match soil to place and crop"),
        list("Punjab wheat fields: alluvial soil.", "Maharashtra cotton: black soil.", "Kerala cashew plantations: laterite soil.", "Groundnut on the plateau of Tamil Nadu: red soil."),
        p("Your task: explain why terrace farming reduces soil erosion on hillsides."),
      ],
      practice: [
        { p: "Which soil is found on the northern plains of India?", a: "Alluvial soil", w: [["Laterite soil", "Laterite forms in heavy-rainfall areas such as the Western Ghats."], ["Black soil", "Black soil is found on the Deccan Plateau."]], x: "Rivers deposit alluvium on the plains." },
        { p: "What makes red soil red?", a: "Iron oxides", w: [["Volcanic ash", "Black soil formed from volcanic rock."], ["Red plants decaying", "The colour comes from iron oxides."]], x: "Iron oxides give the red colour." },
      ],
      quiz: [
        { p: "Why is black soil good for growing cotton?", a: "It holds moisture for a long time and is rich in minerals", w: [["It drains water away very quickly", "Black soil holds moisture."], ["It contains no clay", "It is clay-rich."]], x: "Cotton needs steady moisture." },
        { p: "Three statements about Indian soils. Which is true?", a: "Laterite soils form where heavy rain leaches nutrients away.", w: [["Alluvial soil is found only in the Thar Desert.", "It is found mainly on the river plains and deltas."], ["Black soil formed from river sediments.", "It formed from volcanic basalt."]], x: "Leaching makes laterite soils less fertile.", lineup: true },
        { p: "Which method reduces soil erosion on steep hillsides?", a: "Terrace farming", w: [["Overgrazing", "Overgrazing causes erosion."], ["Clearing all the trees", "Removing trees increases erosion."]], x: "Terraces slow down water running off slopes." },
      ],
      check: [
        { p: "Which crops are commonly grown on laterite soil?", a: "Tea, coffee and cashew", w: [["Wheat and sugarcane", "These are typical of alluvial soils."], ["Cotton and soybean", "These are typical of black soil."]], x: "Laterite soils suit plantation crops with fertilisers." },
        { p: "Why does black soil crack in summer?", a: "It is clay-rich, so it swells when wet and shrinks when dry", w: [["It is too sandy", "Black soil is clayey."], ["Earthquakes split it", "Cracking is due to drying clay."]], x: "This also allows air into the soil." },
      ],
    },
  ],
};

export const ICSE_G10: ChapterSpec[] = [ELECTROLYSIS, RADIOACTIVITY, MATRICES, SECTION, PARLIAMENT, UNITED_NATIONS, MONSOON, SOILS];
