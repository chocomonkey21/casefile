import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  ICSE, Grade 8: two chapters for each subject, one lesson each.
  ASSUMPTION: topics are ones commonly taught in ICSE (CISCE) schools at this level, chosen by the project team.
  They have not been checked against the official CISCE syllabus. Videos are in data/videos-curated.ts.
*/

const REFLECTION: ChapterSpec = {
  id: "icse-reflection",
  number: "321",
  board: "icse",
  title: "The Case of the Backwards Sign",
  topic: "Reflection of light",
  subject: "science",
  grade: 8,
  tagline: "Learn the laws of reflection and why mirror images look the way they do.",
  hook: "Ambulances often have the word AMBULANCE painted backwards on the front. A driver glancing in a rear-view mirror reads it the right way round. Why does a mirror flip words?",
  goal: "State the laws of reflection and describe images formed by plane mirrors.",
  learn: ["Use the terms incident ray, reflected ray and normal", "State the laws of reflection", "Describe the image in a plane mirror"],
  lessons: [
    {
      id: "laws-of-reflection",
      title: "Reflection of light",
      teaser: "Angle of incidence equals angle of reflection.",
      question: "Why is AMBULANCE written backwards on the front of ambulances?",
      goals: ["Label incident ray, reflected ray, normal, angle of incidence and angle of reflection", "State the two laws of reflection", "Describe the image formed by a plane mirror, including lateral inversion"],
      hint: "Hold a page up to a mirror. What happens to the left and right sides?",
      walk: "A plane mirror swaps left and right in the image: this is called lateral inversion. Painting the word backwards means that, after the mirror flips it again, a driver ahead sees it the right way round in their rear-view mirror.",
      summary: [
        "Laws of reflection: the angle of incidence equals the angle of reflection, and the incident ray, reflected ray and normal all lie in the same plane.",
        "A plane mirror forms an image that is upright, the same size, as far behind the mirror as the object is in front, virtual, and laterally inverted.",
      ],
      explain: [
        p("Reflection is the bouncing back of light from a surface. Smooth, shiny surfaces like mirrors give regular reflection, which forms clear images. Rough surfaces scatter light in many directions: diffuse reflection."),
        h("Key words"),
        list("Incident ray: the ray of light hitting the mirror.", "Reflected ray: the ray bouncing off.", "Normal: an imaginary line at 90° to the mirror where the ray hits.", "Angle of incidence (i): between the incident ray and the normal.", "Angle of reflection (r): between the reflected ray and the normal."),
        h("The laws of reflection"),
        list("The angle of incidence is equal to the angle of reflection (i = r).", "The incident ray, the reflected ray and the normal all lie in the same plane."),
        tip("Key idea", "Angles are always measured from the normal, not from the mirror surface."),
        h("Images in a plane mirror"),
        list("Upright (not upside down).", "The same size as the object.", "As far behind the mirror as the object is in front.", "Virtual: it cannot be caught on a screen.", "Laterally inverted: left and right are swapped."),
      ],
      tryIt: [
        h("Work it out"),
        list("A ray hits a mirror at 30° to the normal. The angle of reflection is 30°.", "A ray hits a mirror at 20° to the mirror surface. The angle of incidence is 90° − 20° = 70°, so the reflected ray is also at 70° to the normal.", "You stand 2 m from a mirror. Your image is 2 m behind it, so 4 m from you."),
        p("Back to the case: the word is reversed once on the ambulance and again by the mirror, so drivers read it the right way round."),
      ],
      practice: [
        { p: "A ray strikes a mirror with an angle of incidence of 40°. What is the angle of reflection?", a: "40°", w: [["50°", "That would be measured from the mirror, not the normal."], ["80°", "That is the angle between the two rays."]], x: "i = r." },
        { p: "What is the normal?", a: "A line at 90° to the mirror where the ray hits", w: [["The ray coming from the light source", "That is the incident ray."], ["The surface of the mirror", "The normal is perpendicular to it."]], x: "Angles are measured from the normal." },
      ],
      quiz: [
        { p: "Why is AMBULANCE written backwards on the front of ambulances?", a: "A mirror swaps left and right, so drivers see it correctly in their mirrors", w: [["To confuse other drivers", "It is there to be read easily in a mirror."], ["Because mirrors turn images upside down", "Plane mirror images are upright."]], x: "This is lateral inversion." },
        { p: "Three statements about plane mirror images. Which is true?", a: "The image is as far behind the mirror as the object is in front.", w: [["The image is bigger than the object.", "It is the same size."], ["The image can be caught on a screen.", "It is a virtual image."]], x: "Plane mirror images are virtual, upright and the same size.", lineup: true },
        { p: "A ray hits a mirror at 25° to the mirror surface. What is the angle of reflection?", a: "65°", w: [["25°", "Angles are measured from the normal, not the surface."], ["50°", "Measure from the normal: 90° − 25°."]], x: "i = 90° − 25° = 65°, and r = i." },
      ],
      check: [
        { p: "What is lateral inversion?", a: "The swapping of left and right in a mirror image", w: [["Turning an image upside down", "Plane mirror images stay upright."], ["Making an image larger", "Plane mirror images are the same size."]], x: "Your right hand appears as the image’s left hand." },
        { p: "What kind of surface gives diffuse reflection?", a: "A rough surface, such as paper", w: [["A smooth mirror", "Mirrors give regular reflection."], ["Still, clear water", "Still water acts like a mirror."]], x: "Rough surfaces scatter light in many directions." },
      ],
    },
  ],
};

const ACIDS: ChapterSpec = {
  id: "icse-acids-bases",
  number: "322",
  board: "icse",
  title: "The Case of the Purple Cabbage",
  topic: "Acids, bases and indicators",
  subject: "science",
  grade: 8,
  tagline: "Use indicators to test substances, and see what happens when acids meet bases.",
  hook: "A cook boils red cabbage and the water turns purple. A splash of lemon juice turns it pink; a pinch of baking soda turns it green. Is the cabbage water a secret detector?",
  goal: "Describe acids and bases, use indicators and the pH scale, and explain neutralisation.",
  learn: ["Describe properties of acids and bases", "Use indicators and the pH scale", "Explain neutralisation and everyday uses"],
  lessons: [
    {
      id: "indicators-ph",
      title: "Acids, bases and indicators",
      teaser: "Litmus, pH and neutralisation.",
      question: "Why does red cabbage water turn pink with lemon juice and green with baking soda?",
      goals: ["Describe common acids and bases and their properties", "Use litmus, other indicators and the pH scale", "Explain neutralisation and give everyday examples"],
      hint: "Lemon juice is acidic. Baking soda is basic. What do indicators do?",
      walk: "Red cabbage contains natural dyes that change colour with acidity. Lemon juice is an acid, so it turns the indicator pink or red. Baking soda solution is a base (alkaline), so it turns it green. Red cabbage water is a natural indicator.",
      summary: [
        "Acids taste sour and turn blue litmus red (pH below 7). Bases taste bitter and feel soapy; soluble bases (alkalis) turn red litmus blue (pH above 7). Pure water is neutral (pH 7).",
        "An acid and a base react to form a salt and water. This is neutralisation.",
      ],
      explain: [
        p("Acids and bases are found everywhere: in food, cleaning products and our own bodies. Never taste or touch unknown chemicals; use indicators instead."),
        h("Acids and bases"),
        list(
          "Acids: lemon juice (citric acid), vinegar (acetic acid), hydrochloric acid in the stomach. They taste sour and turn blue litmus red.",
          "Bases: baking soda, soap, milk of magnesia. Bases that dissolve in water are called alkalis, such as sodium hydroxide. They turn red litmus blue.",
        ),
        h("Indicators and pH"),
        p("Indicators change colour depending on acidity. Litmus, turmeric, red cabbage juice, phenolphthalein and methyl orange are examples. The pH scale runs from 0 to 14: below 7 is acidic, 7 is neutral, above 7 is basic. Universal indicator shows a different colour for each pH."),
        h("Neutralisation"),
        p("When an acid reacts with a base, they cancel each other out to form a salt and water. Acid + base → salt + water. For example, hydrochloric acid + sodium hydroxide → sodium chloride + water."),
        tip("Key idea", "Everyday neutralisation: antacid tablets for indigestion, lime added to acidic soil, and baking soda on an ant sting (ants inject formic acid)."),
      ],
      tryIt: [
        h("Predict the colour"),
        list("Blue litmus in vinegar: turns red.", "Red litmus in soap solution: turns blue.", "Universal indicator in pure water: green (pH 7).", "Turmeric paper with soap: turns reddish-brown."),
        p("Back to the case: red cabbage water is a natural indicator."),
      ],
      practice: [
        { p: "What colour does blue litmus turn in an acid?", a: "Red", w: [["Blue", "It stays blue in a base or neutral solution."], ["Green", "Litmus does not turn green."]], x: "Acids turn blue litmus red." },
        { p: "What is the pH of a neutral solution such as pure water?", a: "7", w: [["0", "pH 0 is very strongly acidic."], ["14", "pH 14 is very strongly basic."]], x: "7 is neutral." },
      ],
      quiz: [
        { p: "Why does red cabbage water turn pink with lemon juice?", a: "Lemon juice is acidic and the cabbage dye is an indicator", w: [["Lemon juice is a base", "Lemon juice is acidic."], ["Cabbage water always turns pink when anything is added", "It turns green with baking soda."]], x: "Natural dyes change colour with acidity." },
        { p: "Three statements about acids and bases. Which is true?", a: "An acid and a base react to form a salt and water.", w: [["Bases turn blue litmus red.", "Acids do that; alkalis turn red litmus blue."], ["A pH of 3 is basic.", "Below 7 is acidic."]], x: "This is neutralisation.", lineup: true },
        { p: "Why is an antacid taken for indigestion?", a: "It is a base that neutralises extra stomach acid", w: [["It is an acid that adds more acid", "Antacids reduce acidity."], ["It turns stomach acid into water only", "Neutralisation makes a salt and water."]], x: "Antacids such as milk of magnesia are bases." },
      ],
      check: [
        { p: "Which of these is a base?", a: "Baking soda", w: [["Vinegar", "Vinegar is an acid."], ["Lemon juice", "Lemon juice is an acid."]], x: "Baking soda (sodium hydrogen carbonate) is basic." },
        { p: "Which pH value is the most acidic?", a: "pH 1", w: [["pH 6", "pH 6 is only weakly acidic."], ["pH 12", "pH 12 is basic."]], x: "The lower the pH, the more acidic." },
      ],
    },
  ],
};

const EXPONENTS: ChapterSpec = {
  id: "icse-exponents",
  number: "323",
  board: "icse",
  title: "The Case of the Doubling Rice",
  topic: "Exponents and their laws",
  subject: "maths",
  grade: 8,
  tagline: "Write huge numbers simply with powers, and use the laws of exponents to simplify them.",
  hook: "An old story tells of a reward: one grain of rice on the first square of a chessboard, two on the next, four on the next, doubling each time. How can you even write the number on the last square?",
  goal: "Use exponents and the laws of exponents to simplify expressions, including zero and negative powers.",
  learn: ["Read and write numbers in exponential form", "Use the laws of exponents", "Understand zero and negative exponents"],
  lessons: [
    {
      id: "laws-of-exponents",
      title: "Exponents and their laws",
      teaser: "aᵐ × aⁿ = aᵐ⁺ⁿ, and more.",
      question: "On a chessboard, square 1 has 1 grain, and each square doubles. How many grains are on square 64, written as a power?",
      goals: ["Write repeated multiplication using exponents", "Use the product, quotient and power laws", "Explain zero and negative exponents"],
      hint: "Square 1 has 1 = 2⁰ grains, square 2 has 2¹, square 3 has 2². What is the pattern?",
      walk: "Square n has 2ⁿ⁻¹ grains: square 1 has 2⁰ = 1, square 2 has 2¹ = 2, square 3 has 2² = 4. So square 64 has 2⁶³ grains, about 9.2 × 10¹⁸, far more rice than the world grows in a year.",
      summary: [
        "aⁿ means a multiplied by itself n times: a is the base, n is the exponent (power).",
        "Laws: aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ.",
      ],
      explain: [
        p("An exponent tells you how many times to multiply a number by itself. In 2⁵, 2 is the base and 5 is the exponent: 2⁵ = 2 × 2 × 2 × 2 × 2 = 32."),
        h("The laws of exponents (same base)"),
        list(
          "Multiplying: add the powers. 3⁴ × 3² = 3⁶.",
          "Dividing: subtract the powers. 5⁷ ÷ 5³ = 5⁴.",
          "Power of a power: multiply the powers. (2³)² = 2⁶.",
          "Power of a product: (ab)ⁿ = aⁿbⁿ. (2 × 5)³ = 2³ × 5³.",
        ),
        h("Zero and negative exponents"),
        list("Any non-zero number to the power 0 is 1: 7⁰ = 1. (Because 7³ ÷ 7³ = 7⁰, and anything divided by itself is 1.)", "A negative power means a reciprocal: 2⁻³ = 1/2³ = 1/8."),
        tip("Key idea", "The laws only work when the bases are the same. 2³ × 3² cannot be combined into one power."),
        p("Exponents give standard form for very large or small numbers: 3,000,000 = 3 × 10⁶."),
      ],
      tryIt: [
        h("Simplify"),
        list("a⁵ × a³ = a⁸.", "x⁹ ÷ x⁴ = x⁵.", "(y²)⁴ = y⁸.", "10⁰ = 1.", "4⁻² = 1/16."),
        p("Challenge: simplify (2³ × 2⁴) ÷ 2⁵. (2⁷ ÷ 2⁵ = 2² = 4.)"),
      ],
      practice: [
        { p: "Simplify 3⁴ × 3².", a: "3⁶", w: [["3⁸", "Add the powers when multiplying, do not multiply them."], ["9⁶", "Keep the same base."]], x: "4 + 2 = 6." },
        { p: "What is 5⁰?", a: "1", w: [["0", "Any non-zero number to the power 0 is 1."], ["5", "5¹ = 5, but 5⁰ = 1."]], x: "a⁰ = 1." },
      ],
      quiz: [
        { p: "How many grains are on square 64 if square 1 has 1 grain and each square doubles?", a: "2⁶³", w: [["2⁶⁴", "Square 1 has 2⁰, so square 64 has 2⁶³."], ["64 × 2", "The amount doubles each time, so it grows as a power."]], x: "Square n has 2ⁿ⁻¹ grains." },
        { p: "Three statements about exponents. Which is true?", a: "2⁻³ equals 1/8.", w: [["2⁻³ equals −8.", "A negative power gives a reciprocal, not a negative number."], ["2³ × 3² equals 6⁵.", "The bases are different, so the powers cannot be added."]], x: "a⁻ⁿ = 1/aⁿ.", lineup: true },
        { p: "Simplify (x³)⁴.", a: "x¹²", w: [["x⁷", "For a power of a power, multiply: 3 × 4."], ["4x³", "The power applies to x³, not a multiple of it."]], x: "(aᵐ)ⁿ = aᵐⁿ." },
      ],
      check: [
        { p: "Simplify 10⁸ ÷ 10⁵.", a: "10³", w: [["10¹³", "Subtract the powers when dividing."], ["1³", "Keep the base 10."]], x: "8 − 5 = 3." },
        { p: "Write 4,000,000 in standard form.", a: "4 × 10⁶", w: [["4 × 10⁵", "Count the zeros: 6."], ["40 × 10⁵", "In standard form the first number is between 1 and 10."]], x: "4,000,000 = 4 × 1,000,000." },
      ],
    },
  ],
};

const PROFIT: ChapterSpec = {
  id: "icse-profit-loss",
  number: "324",
  board: "icse",
  title: "The Case of the Sale Signs",
  topic: "Profit, loss and discount",
  subject: "maths",
  grade: 8,
  tagline: "Work out profit, loss and discounts like a shopkeeper and spot a real bargain.",
  hook: "A shop marks a jacket at ₹2,000 and offers 20% off. The shopkeeper still makes a profit. If she bought it for ₹1,250, what is her profit percentage?",
  goal: "Calculate profit, loss, percentages, marked price, discount and selling price.",
  learn: ["Find profit or loss and their percentages", "Work with marked price and discount", "Solve problems linking discount and profit"],
  lessons: [
    {
      id: "profit-discount",
      title: "Profit, loss and discount",
      teaser: "Cost price, selling price, marked price and discount.",
      question: "A jacket marked ₹2,000 is sold at 20% off. It cost the shopkeeper ₹1,250. What is the profit percentage?",
      goals: ["Find profit, loss and profit or loss percentages on the cost price", "Find the selling price after a discount on the marked price", "Combine discount and profit in one problem"],
      hint: "First find the selling price after the discount. Then compare it with the cost price.",
      walk: "Discount = 20% of ₹2,000 = ₹400, so the selling price = ₹1,600. Profit = 1,600 − 1,250 = ₹350. Profit % = 350 ÷ 1,250 × 100 = 28%.",
      summary: [
        "Profit = SP − CP (when SP > CP); loss = CP − SP. Profit % and loss % are always calculated on the cost price.",
        "Discount is taken off the marked price: SP = MP − discount. Discount % is calculated on the marked price.",
      ],
      explain: [
        p("Shops buy goods at one price and sell at another. Three prices matter."),
        list("Cost price (CP): what the shopkeeper paid.", "Marked price (MP): the price on the label.", "Selling price (SP): what the customer actually pays."),
        h("Profit and loss"),
        list("If SP > CP, there is a profit: profit = SP − CP.", "If SP < CP, there is a loss: loss = CP − SP.", "Profit % = profit ÷ CP × 100. Loss % = loss ÷ CP × 100."),
        h("Discount"),
        p("A discount is a reduction on the marked price. Discount = discount % × MP ÷ 100, and SP = MP − discount."),
        tip("Key idea", "Profit and loss percentages are on the cost price. Discount percentages are on the marked price. Mixing them up is the most common mistake."),
      ],
      tryIt: [
        h("Try these"),
        list("CP ₹500, SP ₹600: profit ₹100, profit % = 20%.", "CP ₹800, SP ₹720: loss ₹80, loss % = 10%.", "MP ₹1,500, discount 10%: SP = ₹1,350."),
        p("Challenge: two successive discounts of 10% and 10% on ₹1,000. Is that the same as 20% off? (No: ₹1,000 → ₹900 → ₹810, which is 19% off.)"),
      ],
      practice: [
        { p: "CP is ₹400 and SP is ₹500. What is the profit percentage?", a: "25%", w: [["20%", "That divides by the SP. Profit % is on the CP."], ["100%", "The profit is ₹100, which is 25% of ₹400."]], x: "100 ÷ 400 × 100 = 25%." },
        { p: "A ₹1,200 item has a 25% discount. What is the selling price?", a: "₹900", w: [["₹300", "That is the discount, not the selling price."], ["₹1,175", "25% of 1,200 is 300, not 25."]], x: "1,200 − 300 = 900." },
      ],
      quiz: [
        { p: "Marked ₹2,000, 20% discount, cost price ₹1,250. What is the profit percentage?", a: "28%", w: [["20%", "That is the discount percentage."], ["37.5%", "Use the selling price after discount (₹1,600), not the marked price."]], x: "Profit ₹350 on ₹1,250 is 28%." },
        { p: "Three statements about shop maths. Which is true?", a: "Discount percentage is calculated on the marked price.", w: [["Profit percentage is calculated on the selling price.", "It is calculated on the cost price."], ["Two 10% discounts equal a 20% discount.", "They make 19% overall."]], x: "Discount is on MP; profit and loss are on CP.", lineup: true },
        { p: "An item bought for ₹800 is sold for ₹720. What is the loss percentage?", a: "10%", w: [["11.1%", "Divide by the CP, ₹800, not the SP."], ["80%", "The loss is ₹80, which is 10% of ₹800."]], x: "80 ÷ 800 × 100 = 10%." },
      ],
      check: [
        { p: "What is the cost price?", a: "The price the shopkeeper paid for the item", w: [["The price written on the label", "That is the marked price."], ["The price after a discount", "That is the selling price."]], x: "CP is what the seller paid." },
        { p: "A shopkeeper makes a profit when...", a: "The selling price is more than the cost price", w: [["The marked price is more than the selling price", "That only means there is a discount."], ["The cost price is more than the selling price", "That is a loss."]], x: "Profit = SP − CP, when positive." },
      ],
    },
  ],
};

const REVOLT_1857: ChapterSpec = {
  id: "icse-revolt-1857",
  number: "325",
  board: "icse",
  title: "The Case of the Greased Cartridge",
  topic: "The Revolt of 1857",
  subject: "history",
  grade: 8,
  tagline: "Investigate the great uprising of 1857 against the East India Company: its causes, events and results.",
  hook: "In 1857, a rumour spread among Indian soldiers that their new rifle cartridges were greased with cow and pig fat. Within weeks, a revolt had spread across north India. Was a cartridge really the cause?",
  goal: "Explain the long-term and immediate causes, main events and consequences of the Revolt of 1857.",
  learn: ["Explain the political, economic, social and military causes", "Describe the main centres and leaders", "Explain the results, including the end of Company rule"],
  lessons: [
    {
      id: "uprising",
      title: "The Revolt of 1857",
      teaser: "Many grievances, one spark.",
      question: "Was the greased cartridge the real cause of the Revolt of 1857?",
      goals: ["Distinguish the long-term causes from the immediate cause", "Describe key centres and leaders such as Delhi, Kanpur, Lucknow and Jhansi", "Explain the consequences, including the Government of India Act 1858"],
      hint: "Think of the cartridge as a spark. What had already piled up, waiting to catch fire?",
      walk: "The cartridge rumour was the immediate cause: it offended both Hindu and Muslim soldiers. But anger had built for years: rulers lost their kingdoms through the Doctrine of Lapse and annexation, peasants faced heavy land taxes, artisans lost work to British goods, and soldiers faced low pay and discrimination. The cartridge was the spark, not the only cause.",
      summary: [
        "Long-term causes: political (annexations, the Doctrine of Lapse), economic (heavy taxes, ruined crafts), social and religious fears, and military grievances. Immediate cause: the greased cartridges of the Enfield rifle.",
        "The revolt began at Meerut on 10 May 1857 and spread to Delhi, Kanpur, Lucknow and Jhansi. It was suppressed, and in 1858 the British Crown took over the rule of India from the East India Company.",
      ],
      explain: [
        p("By 1857, the East India Company controlled much of India. Many groups had reasons to be angry."),
        h("Long-term causes"),
        list(
          "Political: kingdoms were annexed. Under the Doctrine of Lapse, a state without a natural heir passed to the Company (Jhansi, Satara, Nagpur). Awadh was annexed in 1856.",
          "Economic: high land revenue drove peasants into debt; cheap British cloth ruined Indian weavers.",
          "Social and religious: many feared that reforms and missionaries threatened their customs and faith.",
          "Military: Indian soldiers (sepoys) were paid less than British soldiers and rarely promoted.",
        ),
        h("The spark"),
        p("The new Enfield rifle used cartridges that had to be bitten open. Rumours said they were greased with cow and pig fat, offensive to both Hindus and Muslims. On 10 May 1857, sepoys at Meerut rebelled and marched to Delhi, declaring the elderly Mughal emperor Bahadur Shah Zafar their leader."),
        h("Leaders and centres"),
        list("Delhi: Bahadur Shah Zafar.", "Kanpur: Nana Saheb and Tantia Tope.", "Lucknow: Begum Hazrat Mahal.", "Jhansi: Rani Lakshmibai.", "Bihar: Kunwar Singh."),
        tip("Key idea", "Historians debate what to call 1857: a sepoy mutiny, a revolt, or India’s First War of Independence. The name depends on how widely you think it spread and why people joined."),
        p("The revolt was crushed by 1858. The Government of India Act 1858 ended Company rule; India came under the British Crown, governed by a Viceroy."),
      ],
      tryIt: [
        h("Sort the causes"),
        list("Doctrine of Lapse: political, long-term.", "Weavers losing work to British cloth: economic, long-term.", "Greased cartridges: military and religious, immediate.", "Annexation of Awadh: political, long-term."),
        p("Discuss: why do historians use different names for 1857?"),
      ],
      practice: [
        { p: "What was the immediate cause of the Revolt of 1857?", a: "The rumour about greased cartridges", w: [["The annexation of Awadh", "That was a long-term political cause."], ["The Quit India Movement", "That was in 1942."]], x: "The cartridges were the spark." },
        { p: "Where did the revolt begin on 10 May 1857?", a: "Meerut", w: [["Calcutta", "The revolt began at Meerut."], ["Bombay", "The revolt began at Meerut."]], x: "Sepoys at Meerut rebelled and marched to Delhi." },
      ],
      quiz: [
        { p: "Was the greased cartridge the only cause of the revolt?", a: "No, it was the spark for anger that had built up for years", w: [["Yes, nobody had any other complaint", "Many groups had long-term grievances."], ["No, the revolt had nothing to do with cartridges", "The cartridges were the immediate cause."]], x: "Long-term causes plus an immediate spark." },
        { p: "Three statements about 1857. Which is true?", a: "After the revolt, the British Crown took over from the East India Company.", w: [["The revolt led to immediate independence for India.", "Independence came in 1947."], ["Only soldiers took part.", "Rulers, peasants and others joined too."]], x: "The Government of India Act 1858 ended Company rule.", lineup: true },
        { p: "What was the Doctrine of Lapse?", a: "A policy that let the Company take over a state with no natural heir", w: [["A rule about rifle cartridges", "It was about the succession of rulers."], ["A law ending the Mughal Empire in 1526", "It was a 19th-century Company policy."]], x: "Jhansi was annexed under it." },
      ],
      check: [
        { p: "Who led the revolt in Jhansi?", a: "Rani Lakshmibai", w: [["Begum Hazrat Mahal", "She led the revolt in Lucknow."], ["Bahadur Shah Zafar", "He was proclaimed leader in Delhi."]], x: "Rani Lakshmibai became a famous symbol of resistance." },
        { p: "Which act ended East India Company rule?", a: "The Government of India Act 1858", w: [["The Regulating Act 1773", "That brought the Company under some government control, much earlier."], ["The Indian Independence Act 1947", "That ended British rule altogether."]], x: "The Crown took direct control in 1858." },
      ],
    },
  ],
};

const REFORM: ChapterSpec = {
  id: "icse-social-reform",
  number: "326",
  board: "icse",
  title: "The Case of the Reformer’s Pen",
  topic: "Social reform in 19th-century India",
  subject: "history",
  grade: 8,
  tagline: "Meet the reformers who campaigned against cruel customs and for education for all.",
  hook: "In 1829, a law banned the practice of sati, in which a widow was burned on her husband’s funeral pyre. One reformer had campaigned for years, using newspapers and old texts as evidence. Who was he?",
  goal: "Describe the main social reformers of 19th-century India and the changes they campaigned for.",
  learn: ["Describe Raja Ram Mohan Roy and the Brahmo Samaj", "Describe reforms on widow remarriage, child marriage and education", "Explain how reformers used print and argument"],
  lessons: [
    {
      id: "reformers",
      title: "Social reform in 19th-century India",
      teaser: "Sati, widow remarriage and education for girls.",
      question: "How did reformers like Raja Ram Mohan Roy persuade people to change long-standing customs?",
      goals: ["Describe the work of Raja Ram Mohan Roy and the Brahmo Samaj", "Describe the work of other reformers such as Ishwar Chandra Vidyasagar and Jyotirao and Savitribai Phule", "Explain the methods reformers used: print, petitions, schools and debate"],
      hint: "Reformers wrote, argued and organised. What tools did the 19th century give them?",
      walk: "Raja Ram Mohan Roy used printed pamphlets and newspapers to reach many readers, and argued from ancient texts that sati was not required by religion. He petitioned the British government, which banned sati in 1829. He founded the Brahmo Samaj in 1828 to promote reason and reform. Reformers combined writing, petitions, schools and organisations to change minds and laws.",
      summary: [
        "Raja Ram Mohan Roy campaigned against sati (banned 1829) and founded the Brahmo Samaj (1828). Ishwar Chandra Vidyasagar campaigned for widow remarriage (Act of 1856).",
        "Jyotirao and Savitribai Phule opened schools for girls and fought caste discrimination. Reformers used print, petitions, schools and organisations.",
      ],
      explain: [
        p("In the 19th century, many Indian thinkers questioned customs that harmed women and lower castes. They are called social reformers."),
        h("Raja Ram Mohan Roy (1772 to 1833)"),
        list(
          "Campaigned against sati, arguing that ancient scriptures did not require it. Sati was banned in Bengal in 1829.",
          "Founded the Brahmo Samaj in 1828, which promoted the worship of one God, reason and social reform.",
          "Supported modern education, including English, science and women’s education, and published newspapers.",
        ),
        h("Other reformers"),
        list(
          "Ishwar Chandra Vidyasagar: campaigned for widow remarriage, legalised by the Hindu Widows’ Remarriage Act of 1856, and for girls’ education.",
          "Jyotirao Phule and Savitribai Phule: opened one of the first schools for girls in Pune in 1848, and fought against caste discrimination.",
          "Sir Syed Ahmad Khan: promoted modern education among Muslims and founded the college at Aligarh in 1875.",
        ),
        tip("Key idea", "The printing press helped reformers spread arguments quickly through pamphlets and newspapers."),
      ],
      tryIt: [
        h("Match the reformer"),
        list("Banning of sati: Raja Ram Mohan Roy.", "Widow remarriage: Ishwar Chandra Vidyasagar.", "Schools for girls in Pune: Jyotirao and Savitribai Phule.", "Aligarh college: Sir Syed Ahmad Khan."),
        p("Discuss: why might some people have opposed these reforms at the time?"),
      ],
      practice: [
        { p: "Which practice did Raja Ram Mohan Roy campaign against?", a: "Sati", w: [["Widow remarriage", "He supported reform; Vidyasagar led the widow remarriage campaign."], ["Education for girls", "He supported education for girls."]], x: "Sati was banned in 1829." },
        { p: "Which organisation did Raja Ram Mohan Roy found in 1828?", a: "The Brahmo Samaj", w: [["The Indian National Congress", "That was founded in 1885."], ["The Muslim League", "That was founded in 1906."]], x: "It promoted reason and reform." },
      ],
      quiz: [
        { p: "How did Raja Ram Mohan Roy persuade people?", a: "Through newspapers, pamphlets, arguments from scripture and petitions", w: [["By leading an army", "He used argument and print, not force."], ["By refusing to discuss the issue", "He argued in public."]], x: "Print and reasoned argument were his tools." },
        { p: "Three statements about 19th-century reform. Which is true?", a: "Savitribai Phule helped open schools for girls.", w: [["Widow remarriage was legalised in 1947.", "It was legalised in 1856."], ["Reformers never used printed material.", "Print was one of their main tools."]], x: "The Phules opened a girls’ school in Pune in 1848.", lineup: true },
        { p: "Which reformer is linked with the Widow Remarriage Act of 1856?", a: "Ishwar Chandra Vidyasagar", w: [["Sir Syed Ahmad Khan", "He focused on modern education for Muslims."], ["Mahatma Gandhi", "Gandhi was active in the 20th century."]], x: "Vidyasagar campaigned hard for the Act." },
      ],
      check: [
        { p: "In which year was sati banned in Bengal?", a: "1829", w: [["1857", "That was the year of the revolt."], ["1947", "That was the year of independence."]], x: "The ban came after years of campaigning." },
        { p: "Why was the printing press important to reformers?", a: "It let them spread their ideas quickly to many readers", w: [["It made reforms illegal", "Print helped, not hindered."], ["It replaced schools completely", "Reformers also opened schools."]], x: "Pamphlets and newspapers reached wide audiences." },
      ],
    },
  ],
};

const CONTOURS: ChapterSpec = {
  id: "icse-contours",
  number: "327",
  board: "icse",
  title: "The Case of the Wiggly Lines",
  topic: "Contours and relief on maps",
  subject: "geography",
  grade: 8,
  tagline: "Read hills, valleys and cliffs from the lines on a flat map.",
  hook: "A hiking map shows a hill only as a set of curved lines, some packed tightly together, some far apart. Which side of the hill would be the hardest to climb?",
  goal: "Read contour lines to work out height, slope and landforms on a topographical map.",
  learn: ["Explain what contour lines and the contour interval show", "Tell steep slopes from gentle ones", "Recognise landforms from contour patterns"],
  lessons: [
    {
      id: "contour-lines",
      title: "Contours and relief on maps",
      teaser: "Close lines mean steep; far apart means gentle.",
      question: "On a map, one side of a hill has contour lines close together and the other has them far apart. Which side is steeper?",
      goals: ["Explain contour lines and the contour interval", "Tell steep and gentle slopes from the spacing of contour lines", "Recognise hills, valleys, ridges and cliffs from contour patterns"],
      hint: "Each line is a fixed height step. How far do you walk sideways to climb one step?",
      walk: "Each contour line joins places at the same height, and the lines are a fixed height apart (the contour interval). Where the lines are close together, you climb the same height in a short distance, so the slope is steep. Where they are far apart, the slope is gentle. The side with close lines is the hardest climb.",
      summary: [
        "A contour line joins points of equal height above sea level. The contour interval is the height difference between neighbouring lines.",
        "Lines close together show a steep slope; lines far apart show a gentle slope. Patterns reveal landforms: circles for a hill, V shapes pointing uphill for a valley.",
      ],
      explain: [
        p("Maps are flat, but land is not. Contour lines show the shape and height of the land, called relief."),
        h("Contour lines"),
        list(
          "A contour line joins places of the same height above mean sea level.",
          "The contour interval is the fixed height between neighbouring lines, such as 20 m.",
          "Heights are written on some lines. Spot heights mark exact heights at points; triangulation points mark survey stations.",
          "Contour lines never cross each other, except at an overhanging cliff.",
        ),
        h("Reading slopes"),
        list("Close together: steep slope.", "Far apart: gentle slope.", "Evenly spaced: an even slope.", "Lines merging into one: a cliff."),
        h("Landforms"),
        list("Hill: closed rings, with the highest value in the middle.", "Valley: V shapes pointing uphill (towards higher contours). Rivers flow along valleys.", "Ridge (spur): V shapes pointing downhill.", "Plateau: a flat top with close lines around the edges."),
        tip("Key idea", "To tell a valley from a spur, check which way the V points: a valley’s V points to higher ground."),
      ],
      tryIt: [
        h("Read the pattern"),
        list("Rings 100 m, 120 m, 140 m from outside to inside: a hill about 140 m high.", "Lines packed tightly on the east side: the east side is steep.", "V-shaped lines with the point towards higher values and a blue line along them: a river valley."),
        p("Back to the case: the side with close lines is the steeper climb."),
      ],
      practice: [
        { p: "What does a contour line join?", a: "Places of the same height above sea level", w: [["Places with the same temperature", "Isotherms show temperature."], ["Places on the same road", "Roads are shown with other symbols."]], x: "Contours show height." },
        { p: "Contour lines are close together. What does this show?", a: "A steep slope", w: [["A gentle slope", "Far-apart lines show gentle slopes."], ["Flat land", "Flat land has few or no contour lines."]], x: "Close lines mean height changes quickly." },
      ],
      quiz: [
        { p: "Which side of the hill is steeper?", a: "The side where the contour lines are close together", w: [["The side where the contour lines are far apart", "That side is gentler."], ["Both sides are the same", "Different spacing means different steepness."]], x: "Close spacing means a steep slope." },
        { p: "Three statements about contours. Which is true?", a: "In a valley, the V shapes of the contours point uphill.", w: [["Contour lines often cross each other.", "They do not cross, except at an overhanging cliff."], ["Closed rings always show a lake.", "Closed rings with rising values show a hill."]], x: "The V points towards higher ground in a valley.", lineup: true },
        { p: "What is the contour interval?", a: "The height difference between neighbouring contour lines", w: [["The distance on the map between two towns", "That is measured with the scale."], ["The highest point on the map", "That is shown by a spot height."]], x: "It is a fixed height step, such as 20 m." },
      ],
      check: [
        { p: "Contour lines merge into one line. What landform is this?", a: "A cliff", w: [["A plain", "A plain has very few contours."], ["A wide valley", "A valley shows V shapes, not merged lines."]], x: "The height drops sharply at a cliff." },
        { p: "What is a spot height?", a: "A point on a map marked with its exact height", w: [["A type of contour interval", "It is a single marked point."], ["A symbol for a well", "It shows height."]], x: "Spot heights give exact heights at points." },
      ],
    },
  ],
};

const DISASTERS: ChapterSpec = {
  id: "icse-disasters",
  number: "328",
  board: "icse",
  title: "The Case of the Early Warning",
  topic: "Natural disasters and their management",
  subject: "geography",
  grade: 8,
  tagline: "Learn how communities prepare for, respond to and recover from floods, cyclones and earthquakes.",
  hook: "Two strong cyclones hit the same coast years apart. The first killed thousands; the second, just as strong, killed far fewer. The storm was no weaker. What had changed?",
  goal: "Explain the causes and effects of natural disasters and how good management reduces harm.",
  learn: ["Explain hazards and disasters", "Describe earthquakes, cyclones and floods", "Explain the stages of disaster management"],
  lessons: [
    {
      id: "disaster-management",
      title: "Natural disasters and their management",
      teaser: "Preparedness, response, recovery and mitigation.",
      question: "Why can a strong cyclone kill far fewer people when it strikes a well-prepared coast?",
      goals: ["Explain the difference between a natural hazard and a disaster", "Describe the causes and effects of earthquakes, cyclones and floods", "Explain the stages of disaster management with examples"],
      hint: "Think about warnings, shelters and evacuation.",
      walk: "Better preparation reduces harm. With satellite forecasts and early warnings, people can be evacuated in time. Cyclone shelters give safe places to go, and practised plans mean everyone knows what to do. The hazard (the cyclone) is the same, but the disaster (the loss of life) is much smaller.",
      summary: [
        "A hazard is a natural event that could cause harm. It becomes a disaster when it seriously harms people and property. Preparation can reduce the harm.",
        "Disaster management has stages: mitigation and preparedness before, response during and immediately after, and recovery afterwards.",
      ],
      explain: [
        p("Natural hazards include earthquakes, cyclones, floods, droughts, landslides and tsunamis. They become disasters when they cause major loss of life, damage or disruption."),
        h("Some hazards"),
        list(
          "Earthquakes: sudden shaking caused by movement along faults. Danger comes mainly from collapsing buildings.",
          "Cyclones: huge rotating storms that form over warm seas, bringing very strong winds, heavy rain and storm surges.",
          "Floods: water overflows onto normally dry land, after heavy rain, cyclones or blocked rivers.",
        ),
        h("Managing disasters"),
        list(
          "Mitigation: reducing the risk in advance, such as earthquake-resistant buildings, embankments and planting mangroves on coasts.",
          "Preparedness: warning systems, shelters, evacuation plans and drills.",
          "Response: rescue, first aid, food, water and shelter during and just after the event.",
          "Recovery: rebuilding homes, schools and livelihoods, ideally safer than before.",
        ),
        tip("Key idea", "We cannot stop hazards, but we can stop many of them becoming disasters."),
        p("In India, the National Disaster Management Authority (NDMA) and the National Disaster Response Force (NDRF) plan and carry out disaster management."),
      ],
      tryIt: [
        h("Earthquake safety drill"),
        list("Drop, cover and hold on under a sturdy table.", "Keep away from windows and heavy furniture.", "After the shaking stops, leave calmly and move to open ground."),
        p("Your task: name one mitigation measure and one preparedness measure for a flood-prone village."),
      ],
      practice: [
        { p: "What is the difference between a hazard and a disaster?", a: "A hazard could cause harm; a disaster is when it seriously harms people", w: [["They mean the same", "A hazard becomes a disaster only when it causes serious harm."], ["Disasters are always caused by people", "Natural hazards can cause disasters too."]], x: "Preparation can stop a hazard becoming a disaster." },
        { p: "Where do cyclones form?", a: "Over warm seas", w: [["Over cold deserts", "Cyclones need warm, moist air."], ["Underground", "Earthquakes start underground; cyclones form over the sea."]], x: "Warm ocean water powers cyclones." },
      ],
      quiz: [
        { p: "Why can a strong cyclone kill far fewer people on a well-prepared coast?", a: "Early warnings, shelters and evacuation move people out of danger", w: [["The cyclone is always much weaker", "The storm can be just as strong."], ["Cyclones only damage empty land", "They can hit towns; preparation protects people."]], x: "Preparedness saves lives." },
        { p: "Three statements about disaster management. Which is true?", a: "Earthquake-resistant buildings are a form of mitigation.", w: [["Recovery happens before the disaster.", "Recovery comes after."], ["Nothing can be done before a hazard strikes.", "Mitigation and preparedness happen before."]], x: "Mitigation reduces risk in advance.", lineup: true },
        { p: "During an earthquake indoors, what should you do?", a: "Drop, cover under a sturdy table and hold on", w: [["Run outside straight away", "Moving during shaking risks falling objects."], ["Stand next to a window", "Glass can shatter."]], x: "Drop, cover and hold on." },
      ],
      check: [
        { p: "Which is a preparedness measure?", a: "Running evacuation drills", w: [["Rebuilding schools after a flood", "That is recovery."], ["Rescuing people from collapsed buildings", "That is response."]], x: "Preparedness gets people ready before a hazard." },
        { p: "How do mangroves help on coasts?", a: "They reduce the force of storm surges and waves", w: [["They cause cyclones", "Mangroves cannot cause cyclones."], ["They make the sea warmer", "They protect the coast."]], x: "Mangroves act as a natural barrier." },
      ],
    },
  ],
};

export const ICSE_G8: ChapterSpec[] = [REFLECTION, ACIDS, EXPONENTS, PROFIT, REVOLT_1857, REFORM, CONTOURS, DISASTERS];
