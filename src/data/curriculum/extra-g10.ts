import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  Grade 10: two more chapters for each subject, one lesson each, so every grade and subject has three chapters.
  ASSUMPTION: topics and depth were chosen by the project team for a typical Grade 10 class. They are not matched to an
  official curriculum. Videos for these lessons are in data/videos-curated.ts.
*/

const BONDING: ChapterSpec = {
  id: "bonding",
  number: "241",
  title: "The Case of the Stubborn Salt",
  topic: "Ionic and covalent bonding",
  subject: "science",
  grade: 10,
  tagline: "Explain why salt melts at over 800 °C while wax melts in your hand, using bonds between atoms.",
  hook: "Table salt melts at about 801 °C. Candle wax melts at around 60 °C. Both are white solids. Something very different must be holding their particles together.",
  goal: "Explain how ionic and covalent bonds form and link structure to properties such as melting point and conductivity.",
  learn: ["Explain how ionic bonds form by electron transfer", "Explain how covalent bonds form by sharing electrons", "Link structure to melting point and conductivity"],
  lessons: [
    {
      id: "ionic-covalent",
      title: "Ionic and covalent bonding",
      teaser: "Transferring electrons versus sharing them.",
      question: "Why does salt (sodium chloride) melt at about 801 °C, while wax melts at around 60 °C?",
      goals: ["Explain ionic bonding as the transfer of electrons from a metal to a non-metal", "Explain covalent bonding as the sharing of pairs of electrons between non-metals", "Explain how giant ionic lattices and simple molecules differ in melting point and conductivity"],
      hint: "Salt is a giant lattice of ions held by strong forces in every direction. Wax is made of separate molecules.",
      walk: "In sodium chloride, sodium gives an electron to chlorine, making Na⁺ and Cl⁻ ions. Millions of ions are held in a giant lattice by strong electrostatic forces in all directions, so a lot of energy is needed to melt it. Wax is made of simple covalent molecules. The bonds inside each molecule are strong, but the forces between molecules are weak, so it melts easily.",
      summary: [
        "Ionic bonds form when metal atoms transfer electrons to non-metal atoms, making oppositely charged ions that attract. They form giant lattices with high melting points that conduct when melted or dissolved.",
        "Covalent bonds form when non-metal atoms share pairs of electrons. Simple molecular substances have low melting points because the forces between molecules are weak.",
      ],
      explain: [
        p("Atoms bond to reach a more stable arrangement of electrons, usually a full outer shell. How they do it depends on the elements involved."),
        h("Ionic bonding: metal and non-metal"),
        p("A metal atom loses electrons from its outer shell and becomes a positive ion. A non-metal atom gains them and becomes a negative ion. For example, sodium (2,8,1) gives one electron to chlorine (2,8,7), making Na⁺ (2,8) and Cl⁻ (2,8,8). The oppositely charged ions attract strongly. This attraction is the ionic bond."),
        p("Ionic compounds form giant ionic lattices: huge, regular arrangements of ions. They have high melting points. They do not conduct electricity as solids, because the ions cannot move, but they do when melted or dissolved in water, because the ions are free to move."),
        h("Covalent bonding: non-metals"),
        p("Non-metal atoms share pairs of electrons. Each shared pair is one covalent bond. In a water molecule (H₂O), oxygen shares one pair with each hydrogen atom. In methane (CH₄), carbon shares four pairs."),
        p("Simple molecular substances, such as water, carbon dioxide and wax, have strong bonds inside each molecule but weak forces between molecules. Little energy is needed to separate molecules, so their melting and boiling points are low. They do not conduct electricity, because there are no free charged particles."),
        tip("Key idea", "When a simple molecular substance melts, the covalent bonds do not break. Only the weak forces between the molecules are overcome."),
        p("Some covalent substances, such as diamond, form giant covalent structures with very high melting points, because melting means breaking many strong covalent bonds."),
      ],
      tryIt: [
        h("Predict the bonding"),
        list("Magnesium oxide (metal + non-metal): ionic. High melting point.", "Carbon dioxide (non-metal + non-metal): simple covalent molecules. A gas at room temperature.", "Potassium chloride: ionic. Conducts when dissolved in water.", "Ammonia, NH₃: covalent. Low boiling point."),
        p("Detective question: a white solid melts at 1,000 °C and conducts electricity only when molten. What type of structure is it most likely to be? (A giant ionic lattice.)"),
      ],
      practice: [
        { p: "What type of bond forms between sodium and chlorine?", a: "Ionic", w: [["Covalent", "Covalent bonds form between non-metals. Sodium is a metal."], ["Metallic", "Metallic bonding is between metal atoms only."]], x: "A metal transfers electrons to a non-metal." },
        { p: "What is a covalent bond?", a: "A shared pair of electrons between two atoms", w: [["An electron transferred from a metal to a non-metal", "That makes ions for ionic bonding."], ["The attraction between two neutrons", "Bonds involve electrons."]], x: "Non-metal atoms share electron pairs." },
      ],
      quiz: [
        { p: "Why does sodium chloride have a high melting point?", a: "Strong electrostatic forces act between ions in all directions in a giant lattice", w: [["Its molecules are very large", "Sodium chloride is a lattice of ions, not molecules."], ["It has weak forces between molecules", "That explains low melting points."]], x: "Lots of energy is needed to overcome many strong ionic bonds." },
        { p: "Three statements about ionic compounds. Which is true?", a: "They conduct electricity when molten or dissolved.", w: [["They conduct electricity as solids.", "The ions cannot move in a solid."], ["They form between two non-metals.", "Ionic compounds form between metals and non-metals."]], x: "Ions must be free to move to carry a current.", lineup: true },
        { p: "When water boils, what is overcome?", a: "The weak forces between water molecules", w: [["The covalent bonds between hydrogen and oxygen", "The molecules stay as H₂O; only the forces between them are overcome."], ["Ionic bonds between ions", "Water is covalent, not ionic."]], x: "Boiling separates molecules without breaking them apart." },
      ],
      check: [
        { p: "What charge does a chloride ion have?", a: "1−", w: [["1+", "Chlorine gains an electron, so it becomes negative."], ["2−", "Chlorine gains one electron, not two."]], x: "Gaining one electron gives Cl⁻." },
        { p: "Why does diamond have a very high melting point?", a: "It is a giant covalent structure, so many strong bonds must be broken", w: [["It is made of ions", "Diamond is pure carbon with covalent bonds."], ["It has weak forces between small molecules", "Diamond is not made of small molecules."]], x: "Each carbon atom is bonded to four others in a giant structure." },
      ],
    },
  ],
};

const EM_SPECTRUM: ChapterSpec = {
  id: "em-spectrum",
  number: "242",
  title: "The Case of the Invisible Light",
  topic: "The electromagnetic spectrum",
  subject: "science",
  grade: 10,
  tagline: "Discover the light you cannot see, from radio waves to gamma rays.",
  hook: "A security camera sees a burglar in total darkness. A phone talks to a tower kilometres away. A doctor sees inside a broken arm. All three use the same kind of wave. What is it?",
  goal: "Describe the electromagnetic spectrum, the properties shared by all electromagnetic waves, and the uses and dangers of each type.",
  learn: ["Name the parts of the spectrum in order", "Describe properties all EM waves share", "Give uses and dangers of each type"],
  lessons: [
    {
      id: "em-waves",
      title: "The electromagnetic spectrum",
      teaser: "Radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma.",
      question: "How can a camera see in the dark, and why are X-rays more dangerous than radio waves?",
      goals: ["List the electromagnetic spectrum in order of wavelength", "State properties shared by all electromagnetic waves", "Describe uses and hazards of different types of electromagnetic radiation"],
      hint: "Warm bodies give out a type of electromagnetic wave we cannot see. And shorter wavelengths carry more energy.",
      walk: "Warm objects such as people give out infrared radiation, which thermal cameras detect even in darkness. Along the spectrum, wavelength gets shorter and frequency and energy get higher. X-rays have very short wavelengths and high energy, so they can damage cells and DNA. Radio waves have long wavelengths and low energy, so they are much safer.",
      summary: [
        "Electromagnetic waves are transverse waves that travel at the same speed in a vacuum (about 300,000 km/s). In order of increasing frequency: radio, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.",
        "Higher frequency means more energy. Ultraviolet, X-rays and gamma rays are ionising and can damage cells.",
      ],
      explain: [
        p("Visible light is just a small part of a much bigger family of waves called the electromagnetic (EM) spectrum."),
        h("What all EM waves share"),
        list(
          "They are transverse waves.",
          "They travel through a vacuum, such as space.",
          "They all travel at the same speed in a vacuum: about 3 × 10⁸ metres per second.",
          "They transfer energy from one place to another.",
        ),
        h("The spectrum in order"),
        p("From longest wavelength (lowest frequency and energy) to shortest wavelength (highest frequency and energy):"),
        list(
          "Radio waves: broadcasting and communication.",
          "Microwaves: mobile phones, satellites and cooking.",
          "Infrared: remote controls, thermal cameras and heaters.",
          "Visible light: seeing, photography and fibre optics.",
          "Ultraviolet: security marking, sterilising water and sun tanning. It can cause sunburn and skin cancer.",
          "X-rays: imaging bones. They can damage cells, so exposure is kept low.",
          "Gamma rays: killing cancer cells and sterilising medical equipment. Very penetrating and dangerous.",
        ),
        tip("Key idea", "Order trick: Raging Martians Invaded Venus Using X-ray Guns (radio, micro, infrared, visible, UV, X-ray, gamma)."),
        p("The equation v = f × λ links speed (v), frequency (f) and wavelength (λ). Since v is the same for all EM waves in a vacuum, higher frequency means shorter wavelength."),
      ],
      tryIt: [
        h("Match the use"),
        list("Thermal camera: infrared.", "Wi-Fi and mobile phones: microwaves and radio waves.", "Checking bank notes for hidden marks: ultraviolet.", "Treating some cancers: gamma rays."),
        p("Detective question: why does a radiographer stand behind a screen when taking X-rays, even though the patient does not? (The patient has one short exposure; the radiographer would be exposed many times a day.)"),
      ],
      practice: [
        { p: "Which EM wave has the longest wavelength?", a: "Radio waves", w: [["Gamma rays", "Gamma rays have the shortest wavelength."], ["Visible light", "Visible light is in the middle of the spectrum."]], x: "Radio waves are at the long-wavelength end." },
        { p: "What do all EM waves have in common?", a: "They travel at the same speed in a vacuum", w: [["They all have the same wavelength", "Wavelengths vary hugely across the spectrum."], ["They are all visible to humans", "We see only visible light."]], x: "All EM waves travel at about 3 × 10⁸ m/s in a vacuum." },
      ],
      quiz: [
        { p: "How can a thermal camera detect a person in the dark?", a: "It detects the infrared radiation given out by the warm body", w: [["It detects visible light reflected from the person", "In darkness there is little visible light."], ["It sends out X-rays", "Thermal cameras detect infrared."]], x: "Warm objects emit infrared radiation." },
        { p: "Three statements about the EM spectrum. Which is true?", a: "Higher-frequency waves carry more energy.", w: [["Radio waves are more dangerous than gamma rays.", "Gamma rays carry much more energy."], ["EM waves need air to travel.", "EM waves travel through a vacuum."]], x: "Energy increases with frequency.", lineup: true },
        { p: "Which type of EM radiation is used to sterilise medical equipment?", a: "Gamma rays", w: [["Radio waves", "Radio waves have too little energy to kill bacteria."], ["Infrared", "Infrared heats things but is not used for this kind of sterilising."]], x: "Gamma rays kill bacteria on sealed equipment." },
      ],
      check: [
        { p: "Which is in the correct order of increasing frequency?", a: "Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma", w: [["Gamma, X-ray, ultraviolet, visible, infrared, microwave, radio", "That is decreasing frequency."], ["Visible, radio, gamma, infrared, X-ray, microwave, ultraviolet", "That order is mixed up."]], x: "Frequency rises from radio to gamma." },
        { p: "Why can ultraviolet radiation be harmful?", a: "It can damage skin cells and cause sunburn and skin cancer", w: [["It is too cold for the skin", "UV is not about temperature."], ["It cannot pass through the atmosphere at all", "Some UV reaches the ground and affects skin."]], x: "UV is ionising and can damage cells." },
      ],
    },
  ],
};

const SEQUENCES: ChapterSpec = {
  id: "sequences",
  number: "243",
  title: "The Case of the Growing Pattern",
  topic: "Arithmetic and geometric sequences",
  subject: "maths",
  grade: 10,
  tagline: "Find the rule behind a sequence and predict any term without listing them all.",
  hook: "A rumour spreads: on day 1, three people know it. Each day, every person who knows tells two more people who did not, so the number who know triples. A second rumour also starts with three people, but just gains five new people a day. By day 10, which rumour is ahead?",
  goal: "Identify arithmetic and geometric sequences and find and use their nth-term formulas.",
  learn: ["Recognise arithmetic and geometric sequences", "Find the nth term of an arithmetic sequence", "Find the nth term of a geometric sequence"],
  lessons: [
    {
      id: "arith-geo",
      title: "Arithmetic and geometric sequences",
      teaser: "Adding the same amount, or multiplying by the same amount.",
      question: "Sequence A is 3, 9, 27, 81, … and sequence B is 3, 8, 13, 18, … What is the 10th term of each?",
      goals: ["Recognise arithmetic sequences (common difference) and geometric sequences (common ratio)", "Use the nth-term formula a + (n − 1)d", "Use the nth-term formula a × r^(n − 1)"],
      hint: "A multiplies by 3 each time. B adds 5 each time.",
      walk: "A is geometric with first term 3 and ratio 3, so the nth term is 3 × 3^(n − 1) = 3ⁿ. The 10th term is 3¹⁰ = 59,049. B is arithmetic with first term 3 and difference 5, so the nth term is 3 + (n − 1) × 5 = 5n − 2. The 10th term is 48. Geometric growth soon overtakes arithmetic growth.",
      summary: [
        "Arithmetic sequence: add a common difference d each time. nth term = a + (n − 1)d, where a is the first term.",
        "Geometric sequence: multiply by a common ratio r each time. nth term = a × r^(n − 1). Geometric sequences with r > 1 grow much faster in the long run.",
      ],
      explain: [
        p("A sequence is an ordered list of numbers that follows a rule. Each number is a term. Two important types are arithmetic and geometric."),
        h("Arithmetic sequences"),
        p("You add the same number each time. That number is the common difference, d. In 7, 11, 15, 19, …, d = 4."),
        p("nth term = a + (n − 1)d. For 7, 11, 15, …: 7 + (n − 1) × 4 = 4n + 3. Check: n = 1 gives 7, n = 2 gives 11. Correct."),
        h("Geometric sequences"),
        p("You multiply by the same number each time. That number is the common ratio, r. In 2, 6, 18, 54, …, r = 3. To find r, divide any term by the term before it."),
        p("nth term = a × r^(n − 1). For 2, 6, 18, …: 2 × 3^(n − 1). The 6th term is 2 × 3⁵ = 486."),
        tip("Key idea", "Check the differences first. If they are constant, it is arithmetic. If not, check the ratios. If they are constant, it is geometric."),
        h("Real life"),
        p("Arithmetic: saving the same amount every week. Geometric: compound interest, bacteria doubling, or a rumour spreading. If r is between 0 and 1, a geometric sequence shrinks instead, as with the value of a car falling by the same percentage each year."),
      ],
      tryIt: [
        h("Identify and continue"),
        list("5, 12, 19, 26, …: arithmetic, d = 7. nth term 7n − 2. 10th term 68.", "4, 8, 16, 32, …: geometric, r = 2. nth term 4 × 2^(n − 1). 8th term 512.", "100, 50, 25, 12.5, …: geometric, r = 0.5. It halves each time."),
        p("Back to the case: on day 10, the doubling rumour has reached 3 × 3⁹ = 59,049 people in total, while the steady one has only 48. In real life the rumour would run out of new people to tell long before that."),
      ],
      practice: [
        { p: "What is the common difference of 10, 7, 4, 1, …?", a: "−3", w: [["3", "The terms go down, so the difference is negative."], ["−7", "Subtract each term from the next: 7 − 10 = −3."]], x: "Each term is 3 less than the one before." },
        { p: "What is the common ratio of 5, 20, 80, 320, …?", a: "4", w: [["15", "15 is the first difference. Geometric sequences multiply."], ["5", "Divide a term by the one before: 20 ÷ 5 = 4."]], x: "Each term is 4 times the one before." },
      ],
      quiz: [
        { p: "Find the 10th term of 3, 8, 13, 18, …", a: "48", w: [["50", "Use 3 + 9 × 5 = 48, not 10 × 5."], ["53", "The first term is 3; add 5 nine more times."]], x: "nth term 5n − 2; 5 × 10 − 2 = 48." },
        { p: "Three statements about sequences. Which is true?", a: "A geometric sequence has a common ratio between terms.", w: [["An arithmetic sequence multiplies by the same number each time.", "That describes a geometric sequence."], ["Every sequence is either arithmetic or geometric.", "Many sequences are neither, such as square numbers."]], x: "Geometric sequences multiply; arithmetic sequences add.", lineup: true },
        { p: "What is the nth term of 2, 6, 18, 54, …?", a: "2 × 3^(n − 1)", w: [["4n − 2", "That would be arithmetic; this sequence multiplies by 3."], ["3n − 1", "Check n = 3: 3 × 3 − 1 = 8, not 18."]], x: "First term 2, ratio 3." },
      ],
      check: [
        { p: "Is 1, 4, 9, 16, 25, … arithmetic, geometric or neither?", a: "Neither (they are square numbers)", w: [["Arithmetic", "The differences are 3, 5, 7, 9, which are not constant."], ["Geometric", "The ratios are not constant either."]], x: "The square numbers follow the rule n²." },
        { p: "A car worth £20,000 loses 10% of its value each year. What type of sequence do its values form?", a: "Geometric, with ratio 0.9", w: [["Arithmetic, with difference −10", "It loses 10% of its current value, not a fixed amount."], ["Arithmetic, with difference −2,000", "The amount lost gets smaller each year, so it is not constant."]], x: "Multiplying by 0.9 each year gives a geometric sequence." },
      ],
    },
  ],
};

const TREE: ChapterSpec = {
  id: "tree-diagrams",
  number: "244",
  title: "The Case of the Double Draw",
  topic: "Probability tree diagrams",
  subject: "maths",
  grade: 10,
  tagline: "Use tree diagrams to work out the chances of two events happening together.",
  hook: "A bag has 4 red and 6 blue sweets. You take one, eat it, then take another. A friend says the chance of two reds is 4/10 × 4/10. Is your friend right?",
  goal: "Draw and use tree diagrams for combined events, including dependent events without replacement.",
  learn: ["Draw a tree diagram for two events", "Multiply along branches and add between outcomes", "Handle events without replacement"],
  lessons: [
    {
      id: "combined-events",
      title: "Probability tree diagrams",
      teaser: "Multiply along the branches, add the outcomes.",
      question: "A bag has 4 red and 6 blue sweets. You eat one, then take another. What is the probability both are red?",
      goals: ["Draw a tree diagram for two events", "Multiply along branches for “and”, and add for “or”", "Adjust the second-stage probabilities when there is no replacement"],
      hint: "After you eat one red sweet, how many sweets are left, and how many of them are red?",
      walk: "First pick: P(red) = 4/10. You eat it, so 9 sweets remain, 3 of them red. Second pick: P(red) = 3/9. Multiply along the branch: 4/10 × 3/9 = 12/90 = 2/15. Your friend’s 4/10 × 4/10 would only be right if the sweet were put back.",
      summary: [
        "A tree diagram shows every outcome of two or more events. Multiply probabilities along a path to find P(A and B). Add the results of paths to find P(this or that).",
        "Without replacement, the second set of probabilities changes because the total and the numbers left have changed. The probabilities on each set of branches add up to 1.",
      ],
      explain: [
        p("When two events happen one after the other, a tree diagram helps you see all the possible outcomes and their probabilities."),
        h("Drawing the tree"),
        list(
          "Draw branches for the first event, labelled with outcomes and probabilities.",
          "From the end of each branch, draw branches for the second event.",
          "Check: the branches from any single point add up to 1.",
        ),
        h("Using the tree"),
        list(
          "To find the probability of one path (A and then B), multiply along the branches.",
          "To find the probability of several paths (for example, “one of each colour”), add the probabilities of those paths.",
          "All the final probabilities add up to 1.",
        ),
        h("With and without replacement"),
        p("If the first item is put back, the second pick has the same probabilities as the first: the events are independent. If it is not put back, the second-stage probabilities change: the events are dependent."),
        tip("Key idea", "Without replacement, both the total and the number of the chosen colour can go down by one on the second pick."),
      ],
      tryIt: [
        h("Two coins"),
        p("Flip two fair coins. Each branch has probability 1/2."),
        list("P(two heads) = 1/2 × 1/2 = 1/4.", "P(one head and one tail) = P(HT) + P(TH) = 1/4 + 1/4 = 1/2.", "Check: 1/4 (HH) + 1/2 + 1/4 (TT) = 1."),
        p("Your turn, with the sweets and no replacement: P(one red and one blue) = 4/10 × 6/9 + 6/10 × 4/9 = 24/90 + 24/90 = 48/90 = 8/15."),
      ],
      practice: [
        { p: "Two fair coins are flipped. What is P(two tails)?", a: "1/4", w: [["1/2", "That is the chance for one coin; multiply for two."], ["1/3", "There are four equally likely outcomes, not three."]], x: "1/2 × 1/2 = 1/4." },
        { p: "On a tree diagram, how do you find P(A and then B)?", a: "Multiply the probabilities along the path", w: [["Add the probabilities along the path", "You add between different paths, not along one."], ["Subtract one from the other", "Multiply along a path."]], x: "Along a path you multiply." },
      ],
      quiz: [
        { p: "4 red and 6 blue sweets. You eat one, then take another. What is P(both red)?", a: "2/15", w: [["4/25", "That is 4/10 × 4/10, which assumes the sweet is put back."], ["7/19", "Multiply 4/10 by 3/9."]], x: "4/10 × 3/9 = 12/90 = 2/15." },
        { p: "Three statements about tree diagrams. Which is true?", a: "The probabilities on branches from one point add up to 1.", w: [["Without replacement, the second branches always match the first.", "They change when the item is not replaced."], ["You add along a path to find P(A and B).", "Along a path you multiply."]], x: "Each set of branches covers every possibility.", lineup: true },
        { p: "P(rain on Saturday) = 0.3 and P(rain on Sunday) = 0.3, independently. What is P(rain on neither day)?", a: "0.49", w: [["0.4", "P(no rain) each day is 0.7; multiply 0.7 × 0.7."], ["0.09", "That is the probability of rain on both days."]], x: "0.7 × 0.7 = 0.49." },
      ],
      check: [
        { p: "A bag has 3 green and 2 yellow counters. One is taken and not replaced, then another. What is P(both yellow)?", a: "1/10", w: [["4/25", "That assumes replacement."], ["2/5", "That is the chance for only the first counter."]], x: "2/5 × 1/4 = 2/20 = 1/10." },
        { p: "What does “without replacement” mean?", a: "The first item is not put back before the second is chosen", w: [["Both items are put back", "That is with replacement."], ["The bag is replaced with a new one", "It refers to putting the item back or not."]], x: "Not replacing changes the second probabilities." },
      ],
    },
  ],
};

const COLD_WAR: ChapterSpec = {
  id: "cold-war",
  number: "245",
  title: "The Case of the Divided City",
  topic: "The Cold War",
  subject: "history",
  grade: 10,
  tagline: "Investigate a long rivalry between superpowers that came close to nuclear war without a direct battle.",
  hook: "In August 1961, people in Berlin woke up to find barbed wire across their streets. Families were cut off from each other overnight. Within days a wall was going up. Why would a city be split in two?",
  goal: "Explain the causes of the Cold War, its key crises and how it ended.",
  learn: ["Explain why the wartime allies became rivals", "Describe key crises such as Berlin and Cuba", "Explain how the Cold War ended"],
  lessons: [
    {
      id: "superpowers",
      title: "The Cold War",
      teaser: "Two superpowers, two ideologies, and the threat of nuclear war.",
      question: "Why did the USA and the USSR, allies in World War II, become rivals in a Cold War?",
      goals: ["Explain the ideological differences between the USA and the USSR", "Describe key crises: the Berlin Blockade, the Berlin Wall and the Cuban Missile Crisis", "Explain why it was “cold” and how it ended in 1989 to 1991"],
      hint: "Think about the two different systems they believed in, and what happened to Europe after 1945.",
      walk: "The USA was capitalist and democratic; the USSR was a communist one-party state. After 1945 each feared the other would spread its system. The USSR set up communist governments in Eastern Europe, and Europe was divided by what Churchill called an “iron curtain”. Both built nuclear weapons. They avoided fighting each other directly, because nuclear war could destroy both, but competed through alliances, an arms race, the space race and wars fought by others.",
      summary: [
        "The Cold War (about 1947 to 1991) was a rivalry between the capitalist USA and the communist USSR, fought through alliances, arms and space races, propaganda and proxy wars, but not direct fighting between the two.",
        "Key crises included the Berlin Blockade (1948 to 1949), the Berlin Wall (1961) and the Cuban Missile Crisis (1962). It ended with the fall of the Berlin Wall in 1989 and the collapse of the USSR in 1991.",
      ],
      explain: [
        p("During World War II, the USA, the USSR and Britain fought together against Nazi Germany. Soon after the war they became rivals."),
        h("Two systems"),
        list(
          "USA: capitalism (private businesses, free markets) and democracy with competing parties.",
          "USSR: communism (the state owns and runs the economy) and rule by one party.",
        ),
        p("Each side believed its system was better and feared the other would spread. After 1945, the USSR set up communist governments across Eastern Europe. Winston Churchill said an “iron curtain” had come down across Europe."),
        h("Key crises"),
        list(
          "Berlin Blockade (1948 to 1949): the USSR blocked roads and railways into West Berlin. The Western allies flew in supplies for almost a year.",
          "Berlin Wall (1961): East Germany built a wall to stop people escaping to the West.",
          "Cuban Missile Crisis (1962): the USSR placed nuclear missiles in Cuba. For 13 days the world feared nuclear war, until the USSR agreed to remove them and the USA secretly agreed to remove its missiles from Turkey.",
        ),
        tip("Key idea", "It was “cold” because the superpowers never fought each other directly. But wars linked to the rivalry, such as in Korea and Vietnam, were very real and killed millions."),
        h("The end"),
        p("In the 1980s, the Soviet leader Mikhail Gorbachev introduced reforms. In 1989, Eastern European countries broke away from communist rule and the Berlin Wall fell. Germany reunited in 1990, and the USSR broke up in 1991."),
      ],
      tryIt: [
        h("Order the events"),
        list("1948: Berlin Blockade begins.", "1949: NATO is formed.", "1961: the Berlin Wall is built.", "1962: Cuban Missile Crisis.", "1989: the Berlin Wall falls.", "1991: the USSR breaks up."),
        p("Detective question: why did both sides build so many nuclear weapons if they never intended to use them? (To deter the other side: each believed an attack would bring destruction in return.)"),
      ],
      practice: [
        { p: "Which two countries were the main rivals in the Cold War?", a: "The USA and the USSR", w: [["Britain and France", "They were allies on the same side."], ["Germany and Japan", "They were defeated in World War II."]], x: "The superpowers were the USA and the Soviet Union." },
        { p: "In which year was the Berlin Wall built?", a: "1961", w: [["1989", "That is when the Wall fell."], ["1945", "That is the end of World War II."]], x: "The Wall went up in August 1961." },
      ],
      quiz: [
        { p: "Why is it called the “Cold” War?", a: "The USA and USSR never fought each other directly", w: [["It was fought mainly in cold countries", "“Cold” means no direct fighting between the superpowers."], ["No one died in any related conflict", "Wars such as Korea and Vietnam killed millions."]], x: "Nuclear weapons made direct war too dangerous." },
        { p: "Three statements about the Cuban Missile Crisis. Which is true?", a: "It began when the USSR placed nuclear missiles in Cuba.", w: [["It ended with a nuclear war.", "It ended when the missiles were removed."], ["It happened in 1989.", "It happened in 1962."]], x: "For 13 days in 1962 the world feared nuclear war.", lineup: true },
        { p: "What was the main difference between the USA and the USSR?", a: "The USA was capitalist and democratic; the USSR was communist with one-party rule", w: [["The USA was communist; the USSR was capitalist", "That is the wrong way round."], ["They spoke the same language", "The difference was in political and economic systems."]], x: "Opposing ideologies drove the rivalry." },
      ],
      check: [
        { p: "Which event in 1989 became a symbol of the end of the Cold War?", a: "The fall of the Berlin Wall", w: [["The Cuban Missile Crisis", "That was in 1962."], ["The Berlin Blockade", "That began in 1948."]], x: "Crowds crossed and broke down the Wall in November 1989." },
        { p: "What did Churchill mean by an “iron curtain”?", a: "The division of Europe between the communist East and the democratic West", w: [["A real metal wall across Europe", "It was a metaphor for division."], ["A new type of tank", "It described a political divide."]], x: "He used it in a speech in 1946." },
      ],
    },
  ],
};

const INDIA: ChapterSpec = {
  id: "indian-independence",
  number: "246",
  title: "The Case of the Midnight Freedom",
  topic: "Indian independence and partition",
  subject: "history",
  grade: 10,
  tagline: "Investigate how India won independence from Britain in 1947, and why it was divided.",
  hook: "At midnight on 14 to 15 August 1947, India became independent after nearly two centuries of British rule. On the same night, a new country, Pakistan, was created. Within months, millions were on the move. How did freedom and division arrive together?",
  goal: "Explain how the independence movement ended British rule in India, and the causes and consequences of partition.",
  learn: ["Describe the independence movement and Gandhi’s methods", "Explain why India was partitioned", "Describe the human consequences of partition"],
  lessons: [
    {
      id: "independence-partition",
      title: "Indian independence and partition",
      teaser: "Non-violent protest, a hurried departure and a divided land.",
      question: "Why did British India become two countries, India and Pakistan, in 1947?",
      goals: ["Explain how the independence movement, including Gandhi’s non-violent protest, put pressure on Britain", "Explain the political reasons for partition", "Describe the violence and mass migration that followed partition"],
      hint: "Think about the two main political parties, their different demands, and how quickly Britain left.",
      walk: "By the 1940s, the Indian National Congress wanted one independent India. The Muslim League, led by Muhammad Ali Jinnah, feared Muslims would be a powerless minority and demanded a separate state, Pakistan. Tension and violence grew. Britain, weakened by World War II, decided to leave quickly. A border was drawn in a few weeks, splitting Punjab and Bengal. Partition led to mass migration and terrible violence.",
      summary: [
        "The independence movement, including Gandhi’s non-violent campaigns, made British rule hard to maintain. Britain, weakened by World War II, granted independence in August 1947.",
        "British India was partitioned into India and Pakistan, mainly along religious lines. Around 10 to 20 million people were displaced, and hundreds of thousands, possibly up to 2 million, were killed.",
      ],
      explain: [
        p("Britain ruled much of South Asia, first through the East India Company and, from 1858, directly. This lesson covers the end of that rule. It includes descriptions of violence."),
        h("The independence movement"),
        p("The Indian National Congress, founded in 1885, campaigned for self-rule. Mohandas Gandhi led mass campaigns of non-violent civil disobedience, such as the Salt March of 1930, when thousands marched to the sea to make salt in defiance of a British tax. In 1942 the Quit India movement demanded that Britain leave."),
        h("Why partition?"),
        list(
          "The Muslim League, led by Muhammad Ali Jinnah, argued that Muslims would be a minority without enough power in a Hindu-majority India, and called for a separate Muslim homeland.",
          "Congress leaders, including Jawaharlal Nehru, wanted a united India. Talks failed, and violence between communities grew in 1946.",
          "Britain, exhausted by World War II, wanted to leave quickly. The last Viceroy, Lord Mountbatten, brought the date forward to August 1947.",
          "A British lawyer, Cyril Radcliffe, who had never been to India before, drew the border in about five weeks.",
        ),
        tip("Key idea", "Partition was not only about religion. Politics, British decisions and the speed of the British departure all shaped what happened."),
        h("Consequences"),
        p("India became independent on 15 August 1947, and Pakistan, including what is now Bangladesh, on 14 August. Around 10 to 20 million people crossed the new borders. Violence killed hundreds of thousands, with some estimates up to 2 million. Families were split, and the dispute over Kashmir began. Gandhi was assassinated in January 1948."),
      ],
      tryIt: [
        h("Different perspectives"),
        list(
          "A Congress supporter: independence is a victory, but division is a tragedy.",
          "A Muslim League supporter: Pakistan protects Muslims’ political future.",
          "A British official: we had to leave quickly; staying was impossible.",
          "A refugee family: we lost our home overnight.",
        ),
        p("Discuss: was the speed of the British departure a cause of the violence? Give evidence for and against."),
      ],
      practice: [
        { p: "Which leader is famous for non-violent protest against British rule?", a: "Mohandas Gandhi", w: [["Winston Churchill", "Churchill was a British prime minister who opposed Indian independence."], ["Lord Mountbatten", "Mountbatten was the last British Viceroy."]], x: "Gandhi led campaigns of non-violent civil disobedience." },
        { p: "Which two countries were created in August 1947?", a: "India and Pakistan", w: [["India and Sri Lanka", "Sri Lanka became independent separately, in 1948."], ["India and Nepal", "Nepal was never part of British India."]], x: "British India was partitioned into India and Pakistan." },
      ],
      quiz: [
        { p: "Why did the Muslim League demand a separate state?", a: "It feared Muslims would lack political power as a minority in a united India", w: [["Britain asked it to", "The demand came from the League itself."], ["Muslims wanted to stay under British rule", "The League wanted independence, in a separate state."]], x: "Jinnah argued for a Muslim homeland, Pakistan." },
        { p: "Three statements about partition. Which is true?", a: "The new border was drawn in only a few weeks.", w: [["Partition happened peacefully, with no violence.", "Partition brought terrible violence."], ["Very few people had to move.", "Around 10 to 20 million people were displaced."]], x: "Radcliffe drew the border in about five weeks.", lineup: true },
        { p: "What was the Salt March?", a: "A non-violent protest in 1930 against the British tax on salt", w: [["A trade route for salt across the Sahara", "That was trade in West Africa."], ["A war between India and Pakistan", "It was a peaceful protest."]], x: "Gandhi marched to the sea to make salt, breaking an unfair law." },
      ],
      check: [
        { p: "Why did Britain leave India quickly in 1947?", a: "It was weakened by World War II and wanted to avoid being drawn into growing violence", w: [["India asked Britain to stay longer", "Most Indians wanted Britain to leave."], ["Britain had won new colonies elsewhere", "Britain was losing, not gaining, an empire."]], x: "War exhaustion and rising violence led to a hurried exit." },
        { p: "Which region’s dispute began at partition and continues today?", a: "Kashmir", w: [["Punjab", "Punjab was divided, but the long-running dispute is over Kashmir."], ["Bengal", "Bengal was divided; East Bengal later became Bangladesh."]], x: "India and Pakistan both claim Kashmir." },
      ],
    },
  ],
};

const WATER: ChapterSpec = {
  id: "water-scarcity",
  number: "247",
  title: "The Case of the Dry Tap",
  topic: "Water scarcity",
  subject: "geography",
  grade: 10,
  tagline: "Find out why some places run short of water, and how they manage it.",
  hook: "In 2018, Cape Town in South Africa warned of “Day Zero”, when the city’s taps could be switched off. People were asked to use no more than 50 litres a day. How does a modern city come close to running out of water?",
  goal: "Explain the physical and human causes of water scarcity and evaluate ways to manage water supply and demand.",
  learn: ["Distinguish physical and economic water scarcity", "Explain causes of water stress", "Evaluate water management strategies"],
  lessons: [
    {
      id: "water-stress",
      title: "Water scarcity",
      teaser: "Too little water, or too little money to reach it.",
      question: "How did Cape Town come close to running its taps dry, and what did it do?",
      goals: ["Explain physical and economic water scarcity", "Explain how climate, population growth and demand cause water stress", "Evaluate strategies to increase supply and reduce demand"],
      hint: "Think about rainfall over several years, a growing population and how much water was being used.",
      walk: "Cape Town relies on reservoirs filled by winter rain. After three very dry years, from 2015 to 2017, while the population kept growing, the reservoirs fell very low. The city cut demand: strict limits, higher prices, lower water pressure and public campaigns. Usage fell sharply, rains returned, and Day Zero was avoided.",
      summary: [
        "Water scarcity is when demand for water is greater than the supply. Physical scarcity means there is not enough water naturally; economic scarcity means water exists but people cannot afford the infrastructure to reach it.",
        "Causes include low rainfall, droughts, climate change, population growth, farming and industry. Solutions either increase supply (dams, transfers, desalination) or reduce demand (efficiency, pricing, recycling).",
      ],
      explain: [
        p("Only about 3% of the world’s water is fresh water, and most of that is locked in ice caps, glaciers and underground. Water is also unevenly spread around the world."),
        h("Types of scarcity"),
        list(
          "Physical water scarcity: there is not enough water to meet demand, often in dry regions such as the Middle East and North Africa.",
          "Economic water scarcity: water is available, but a lack of money, pipes and treatment means people cannot get safe water. This is common in parts of sub-Saharan Africa.",
        ),
        h("Causes of water stress"),
        list(
          "Low or unreliable rainfall, and droughts.",
          "Climate change, which is making some regions drier and droughts more frequent.",
          "Population growth and urbanisation.",
          "Farming: irrigation uses about 70% of the world’s fresh water withdrawals.",
          "Pollution, which makes some water unusable.",
        ),
        tip("Key idea", "Water scarcity is about the balance of supply and demand. You can fix it from either side."),
        h("Managing water"),
        list(
          "Increase supply: dams and reservoirs, transferring water between regions, desalination (removing salt from sea water, which uses a lot of energy), and using groundwater carefully.",
          "Reduce demand: efficient irrigation such as drip systems, fixing leaks, water meters and pricing, recycling grey water, and education campaigns.",
        ),
      ],
      tryIt: [
        h("Cape Town’s response"),
        list("Limits: 50 litres per person per day in 2018.", "Pricing: higher charges for heavy users.", "Pressure: water pressure was lowered to reduce leaks and use.", "Communication: campaigns showed people how to save water."),
        p("Evaluate: which strategy do you think helped most, and what might a city do differently to avoid getting so close again? (For example, investing earlier in groundwater, recycling and desalination.)"),
      ],
      practice: [
        { p: "What is economic water scarcity?", a: "Water exists, but people lack the money and infrastructure to access it", w: [["There is no water at all in the area", "That is physical scarcity."], ["Water is too cheap", "Economic scarcity is about lack of investment and access."]], x: "The water is there, but pipes and treatment are missing." },
        { p: "Which activity uses the most fresh water worldwide?", a: "Farming (irrigation)", w: [["Drinking", "Drinking water is a small share."], ["Swimming pools", "Pools use a tiny share."]], x: "Irrigation uses about 70% of fresh water withdrawals." },
      ],
      quiz: [
        { p: "Why did Cape Town face “Day Zero”?", a: "Several dry years and a growing population drained its reservoirs", w: [["It had no reservoirs at all", "It relied on reservoirs that ran low."], ["The sea level fell", "The problem was low rainfall and high demand."]], x: "Drought from 2015 to 2017 and rising demand caused the crisis." },
        { p: "Three statements about water. Which is true?", a: "Desalination increases supply but uses a lot of energy.", w: [["Most of the Earth’s fresh water is in rivers.", "Most is in ice and underground."], ["Water scarcity can only be solved by building dams.", "Reducing demand also helps."]], x: "Desalination removes salt from sea water but is costly.", lineup: true },
        { p: "Which strategy reduces demand for water?", a: "Using drip irrigation on farms", w: [["Building a new dam", "That increases supply."], ["Transferring water from another region", "That increases supply in one place."]], x: "Drip irrigation delivers water directly to roots, using much less." },
      ],
      check: [
        { p: "About what share of the world’s water is fresh water?", a: "About 3%", w: [["About 50%", "Most of the world’s water is salty sea water."], ["About 97%", "About 97% is salt water."]], x: "Only about 3% is fresh, and most of that is ice or underground." },
        { p: "What is physical water scarcity?", a: "When there is not enough water naturally to meet demand", w: [["When people cannot afford water pipes", "That is economic scarcity."], ["When water is polluted by factories", "Pollution can cause scarcity, but physical scarcity means too little water naturally."]], x: "Dry climates often face physical scarcity." },
      ],
    },
  ],
};

const FOOD: ChapterSpec = {
  id: "food-security",
  number: "248",
  title: "The Case of the Empty Plate",
  topic: "Food security",
  subject: "geography",
  grade: 10,
  tagline: "Investigate why some people go hungry in a world that grows enough food for everyone.",
  hook: "The world produces enough food to feed everyone, yet hundreds of millions of people regularly go hungry. Meanwhile, a large share of food is wasted. Where is the missing link?",
  goal: "Explain food security and insecurity, their causes, and strategies to improve food supply and access.",
  learn: ["Define food security and its four parts", "Explain physical and human causes of food insecurity", "Evaluate strategies to improve food security"],
  lessons: [
    {
      id: "feeding-world",
      title: "Food security",
      teaser: "Enough food, and the ability to get it, for everyone.",
      question: "If the world grows enough food, why do so many people still go hungry?",
      goals: ["Define food security, including availability, access, use and stability", "Explain causes of food insecurity such as poverty, conflict, climate and waste", "Evaluate large-scale and small-scale strategies to improve food security"],
      hint: "Having food in the world is not the same as being able to get it. Think about money, conflict and waste.",
      walk: "Hunger is often not caused by a global lack of food but by poverty (people cannot afford food), conflict (which disrupts farming and supply), climate shocks such as droughts, and poor infrastructure that stops food reaching people. Meanwhile, food is wasted in fields, in transport, in shops and at home.",
      summary: [
        "Food security means everyone always has access to enough safe, nutritious food. It depends on availability, access, use and stability.",
        "Food insecurity is caused by poverty, conflict, climate change and extreme weather, pests and disease, and food waste. Solutions range from new technology to small-scale, local projects.",
      ],
      explain: [
        p("Food security exists when all people, at all times, can get enough safe and nutritious food for an active, healthy life. It has four parts."),
        list(
          "Availability: is enough food produced or imported?",
          "Access: can people afford it or reach it?",
          "Use: is it safe, and nutritious, and can people prepare it with clean water?",
          "Stability: is it reliable over time, even during shocks?",
        ),
        h("Causes of food insecurity"),
        list(
          "Poverty: food may be in the shops, but people cannot afford it.",
          "Conflict: wars destroy crops and markets and stop aid getting through.",
          "Climate and weather: droughts, floods and rising temperatures cut harvests.",
          "Pests and diseases: for example, locust swarms can destroy crops.",
          "Waste: roughly a third of food produced is lost or wasted, by many estimates.",
        ),
        tip("Key idea", "Hunger is usually about access, not just the amount of food grown."),
        h("Strategies"),
        list(
          "Large scale: higher-yield crop varieties, irrigation schemes and new technology. These can raise production but may be costly and depend on fertiliser and water.",
          "Small scale: local projects such as water harvesting, better storage to stop crops rotting, and supporting small farmers. These are cheaper and suited to local needs.",
          "Reducing waste: better storage and transport, and buying and using food more carefully at home.",
        ),
      ],
      tryIt: [
        h("Which part of food security?"),
        list("A family cannot afford rice after prices double: access.", "A drought ruins the harvest: availability.", "Food spoils because there is no safe drinking water to cook with: use.", "Harvests are fine some years but fail in others: stability."),
        p("Your plan: suggest one small-scale and one large-scale way to improve food security in a dry farming region, and one weakness of each."),
      ],
      practice: [
        { p: "Which part of food security asks whether people can afford food?", a: "Access", w: [["Availability", "Availability is whether enough food exists."], ["Use", "Use is about safety and nutrition."]], x: "Access means being able to get the food." },
        { p: "Which is a human cause of food insecurity?", a: "Conflict", w: [["Drought", "Drought is a physical cause."], ["Locust swarms", "Pests are a physical (natural) cause."]], x: "Wars disrupt farming and supply." },
      ],
      quiz: [
        { p: "Why do people go hungry even though the world grows enough food?", a: "Poverty, conflict and waste stop food reaching everyone who needs it", w: [["The world grows far too little food for everyone", "Global production is enough; distribution and access are the problem."], ["People choose not to eat", "Hunger is caused by lack of access."]], x: "Hunger is mainly a problem of access." },
        { p: "Three statements about food security. Which is true?", a: "Better storage can reduce food loss after harvest.", w: [["Food security only means growing more food.", "It also means access, use and stability."], ["Climate change has no effect on harvests.", "Droughts, floods and heat affect harvests."]], x: "Stopping crops rotting increases the food available.", lineup: true },
        { p: "What is one disadvantage of large-scale solutions such as new irrigation schemes?", a: "They can be expensive and need a lot of water or energy", w: [["They never increase production", "They often increase production."], ["They are always cheaper than local projects", "Large schemes are usually more expensive."]], x: "Large-scale projects can be costly to build and run." },
      ],
      check: [
        { p: "What are the four parts of food security?", a: "Availability, access, use and stability", w: [["Farming, fishing, trading and cooking", "These are activities, not the parts of food security."], ["Price, taste, colour and size", "These are not the four parts."]], x: "All four must be in place for people to be food secure." },
        { p: "Which is a small-scale strategy for food security?", a: "Helping local farmers store grain safely", w: [["Building a giant national dam", "That is large scale."], ["Developing a new global crop variety", "That is large-scale research."]], x: "Small-scale projects are local and low cost." },
      ],
    },
  ],
};

export const EXTRA_G10: ChapterSpec[] = [BONDING, EM_SPECTRUM, SEQUENCES, TREE, COLD_WAR, INDIA, WATER, FOOD];
