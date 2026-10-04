import { h, list, p, tip, type ChapterSpec } from "./build";

/*
  Grade 7: two more chapters for each subject, one lesson each, so every grade and subject has three chapters.
  ASSUMPTION: topics and depth were chosen by the project team for a typical Grade 7 class. They are not matched to an
  official curriculum. Videos for these lessons are in data/videos-curated.ts.
*/

const CELLS: ChapterSpec = {
  id: "cells",
  number: "211",
  title: "The Case of the Tiny Rooms",
  topic: "Plant and animal cells",
  subject: "science",
  grade: 7,
  tagline: "Look through a microscope and find the parts that keep every living thing alive.",
  hook: "In 1665, Robert Hooke looked at a thin slice of cork under a microscope and saw rows of tiny boxes. He called them cells, like the small rooms monks lived in. What was he really looking at?",
  goal: "Describe the parts of plant and animal cells and explain what each part does.",
  learn: ["Say what a cell is", "Name the parts of animal and plant cells", "Explain how plant and animal cells differ"],
  lessons: [
    {
      id: "plant-animal-cells",
      title: "Plant and animal cells",
      teaser: "The building blocks of every living thing.",
      question: "A cell under a microscope has a cell wall and green chloroplasts. Is it from a plant or an animal, and how can you tell?",
      goals: ["Say that all living things are made of cells", "Name the nucleus, cell membrane, cytoplasm and mitochondria", "Name three parts found in plant cells but not animal cells"],
      hint: "Which parts do only plant cells have? Think about what plants need that animals do not.",
      walk: "Animal cells have a nucleus, cytoplasm, cell membrane and mitochondria. Plant cells have all of those plus a cell wall, chloroplasts and a large vacuole. A cell wall and chloroplasts mean it must be a plant cell. Chloroplasts are where photosynthesis happens.",
      summary: [
        "All living things are made of cells. Animal and plant cells both have a nucleus, cytoplasm, cell membrane and mitochondria.",
        "Plant cells also have a cell wall (support), chloroplasts (photosynthesis) and a large permanent vacuole (holds cell sap).",
      ],
      explain: [
        p("A cell is the smallest unit of life. Some living things, like bacteria, are just one cell. You are made of tens of trillions of cells."),
        h("Parts found in both plant and animal cells"),
        list(
          "Nucleus: controls the cell and contains genetic material (DNA).",
          "Cytoplasm: a jelly-like substance where many chemical reactions happen.",
          "Cell membrane: a thin layer around the cell that controls what goes in and out.",
          "Mitochondria: where respiration releases energy from glucose.",
        ),
        h("Extra parts in plant cells"),
        list(
          "Cell wall: made of cellulose. It is stronger than the membrane and supports the cell.",
          "Chloroplasts: contain green chlorophyll and are where photosynthesis makes food.",
          "Large permanent vacuole: filled with cell sap. It keeps the cell firm.",
        ),
        tip("Key idea", "Cell wall, chloroplasts, large vacuole: if you see these, it is a plant cell. Not every plant cell has chloroplasts, though. Root cells, underground, do not."),
        h("Seeing cells"),
        p("Most cells are too small to see without a microscope. A typical animal cell is about 0.01 to 0.02 mm across. A light microscope can magnify a few hundred times, enough to see the nucleus and cell wall."),
      ],
      tryIt: [
        h("Sort the cell parts"),
        p("For each part, say whether it is in animal cells, plant cells, or both."),
        list("Nucleus: both.", "Chloroplast: plant cells (the green parts).", "Cell membrane: both.", "Cell wall: plant cells.", "Mitochondria: both."),
        p("Detective question: Hooke saw empty boxes in cork. Which part was he seeing? (The cell walls. Cork cells are dead, so the insides had gone.)"),
      ],
      practice: [
        { p: "Which part controls the cell and holds its DNA?", a: "Nucleus", w: [["Cytoplasm", "Cytoplasm is where reactions happen, but it does not control the cell."], ["Vacuole", "The vacuole stores cell sap."]], x: "The nucleus contains the genetic material." },
        { p: "Where does photosynthesis happen?", a: "In the chloroplasts", w: [["In the mitochondria", "Mitochondria release energy by respiration."], ["In the cell wall", "The cell wall gives support."]], x: "Chloroplasts contain chlorophyll, which absorbs light." },
      ],
      quiz: [
        { p: "A cell has a cell wall and chloroplasts. What kind of cell is it?", a: "A plant cell", w: [["An animal cell", "Animal cells have no cell wall or chloroplasts."], ["It could be either", "These parts are only found in plant cells."]], x: "The cell wall and chloroplasts are plant-only parts." },
        { p: "Three statements about cells. Which is true?", a: "Both plant and animal cells have mitochondria.", w: [["Only animal cells have mitochondria.", "Plant cells respire too, so they also have mitochondria."], ["Animal cells have a cell wall made of cellulose.", "Only plant cells have a cellulose cell wall."]], x: "Every plant and animal cell needs energy from respiration.", lineup: true },
        { p: "What does the cell membrane do?", a: "Controls what goes into and out of the cell", w: [["Makes food from sunlight", "That is the job of chloroplasts."], ["Keeps the plant cell rigid like a wall", "That is mainly the cell wall and vacuole."]], x: "The membrane is a barrier that controls movement in and out." },
      ],
      check: [
        { p: "Why do root cells usually have no chloroplasts?", a: "They are underground, so they get no light for photosynthesis", w: [["Roots are not made of cells", "All parts of a plant are made of cells."], ["Chloroplasts would make roots too heavy", "Weight is not the reason. Without light, chloroplasts would be no use."]], x: "Chloroplasts are only useful where there is light." },
        { p: "What is the smallest unit of life?", a: "A cell", w: [["An organ", "Organs are made of many tissues and cells."], ["A nucleus", "A nucleus is part of a cell, not alive on its own."]], x: "Cells are the building blocks of all living things." },
      ],
    },
  ],
};

const SOUND: ChapterSpec = {
  id: "sound",
  number: "212",
  title: "The Case of the Silent Bell",
  topic: "How sound travels",
  subject: "science",
  grade: 7,
  tagline: "Discover why sound needs something to travel through, and what makes it loud or high.",
  hook: "In a famous experiment, a ringing bell is put inside a glass jar and the air is slowly pumped out. The hammer keeps hitting the bell, but the sound fades away. Where did it go?",
  goal: "Explain that sound is a vibration that needs a medium to travel, and describe loudness and pitch.",
  learn: ["Explain that sound is made by vibrations", "Explain why sound cannot travel through a vacuum", "Link loudness to amplitude and pitch to frequency"],
  lessons: [
    {
      id: "sound-waves",
      title: "How sound travels",
      teaser: "Every sound starts with something shaking.",
      question: "Why does the bell go silent when the air is pumped out of the jar?",
      goals: ["Explain that sound is made by vibrating objects", "Explain why sound needs a medium and cannot travel through a vacuum", "Describe how amplitude affects loudness and frequency affects pitch"],
      hint: "Sound travels by particles passing on vibrations. What is left in the jar when the air is removed?",
      walk: "The bell still vibrates, but sound travels by particles bumping into their neighbours and passing the vibration on. With the air pumped out, there are almost no particles to carry the vibration to the glass and to your ears. Sound cannot travel through a vacuum.",
      summary: [
        "Sound is made by vibrations. It travels as a wave by particles passing the vibration along, so it needs a medium: a solid, liquid or gas.",
        "Sound cannot travel through a vacuum. Bigger vibrations (amplitude) are louder; faster vibrations (frequency) have a higher pitch.",
      ],
      explain: [
        p("Every sound begins with a vibration. A guitar string shakes, your vocal cords vibrate, a drum skin moves up and down."),
        h("How sound moves"),
        p("When an object vibrates, it pushes on the particles next to it. They push on their neighbours, and the vibration passes along. This is a sound wave. The particles do not travel all the way to your ear; they jiggle back and forth and pass the energy on."),
        tip("Key idea", "Sound needs a medium, something made of particles. In a vacuum, such as space, there is nothing to carry it."),
        h("Faster in solids"),
        p("Sound travels at about 340 metres per second in air, about 1,500 m/s in water and even faster in many solids, such as steel. In solids the particles are packed closely, so they pass the vibration on quickly. That is why you can hear a train coming through the rails before you hear it through the air."),
        h("Loudness and pitch"),
        list(
          "Amplitude is the size of the vibration. A bigger amplitude means a louder sound. Loudness is measured in decibels (dB).",
          "Frequency is how many vibrations happen each second, measured in hertz (Hz). A higher frequency means a higher pitch.",
          "Humans can hear roughly 20 Hz to 20,000 Hz. Dogs and bats can hear higher frequencies.",
        ),
      ],
      tryIt: [
        h("Ruler on a desk"),
        p("Hold a ruler on the edge of a desk and twang the end."),
        list("Twang it harder: bigger vibrations, louder sound (bigger amplitude).", "Make the overhanging part shorter: it vibrates faster, giving a higher pitch (higher frequency).", "Put your ear on the desk and tap it gently: it sounds louder through the solid wood."),
        p("Detective question: in films, space battles have loud explosions. Is that realistic? (No. There is no air in space to carry the sound.)"),
      ],
      practice: [
        { p: "What makes every sound?", a: "Something vibrating", w: [["Light shining on an object", "Light does not make sound."], ["Air being heated", "Heating air does not by itself make a sound."]], x: "All sounds start with vibrations." },
        { p: "A sound gets higher in pitch. What has changed?", a: "The frequency has increased", w: [["The amplitude has increased", "Bigger amplitude makes a sound louder, not higher."], ["The sound is travelling faster", "The speed depends on the material, not the pitch."]], x: "Higher pitch means more vibrations each second." },
      ],
      quiz: [
        { p: "Why can sound not travel through space?", a: "Space is a vacuum, so there are no particles to pass the vibration on", w: [["Space is too cold for sound", "Temperature is not the reason. Sound needs particles."], ["Sound is too slow to cross space", "Without particles, sound cannot travel at all."]], x: "Sound needs a medium; a vacuum has none." },
        { p: "Three statements about sound. Which is true?", a: "Sound usually travels faster through solids than through air.", w: [["Sound travels fastest through a vacuum.", "Sound cannot travel through a vacuum at all."], ["The particles travel all the way from the source to your ear.", "The particles vibrate and pass the energy on; they do not travel the whole way."]], x: "Closely packed particles pass vibrations on quickly.", lineup: true },
        { p: "You hit a drum harder. What happens to the sound?", a: "It gets louder, because the amplitude is bigger", w: [["It gets higher in pitch", "Pitch depends on frequency, not how hard you hit."], ["It travels more slowly", "The speed depends on the air, not on how hard you hit."]], x: "A bigger vibration means a bigger amplitude and a louder sound." },
      ],
      check: [
        { p: "What unit is frequency measured in?", a: "Hertz (Hz)", w: [["Decibels (dB)", "Decibels measure loudness."], ["Metres per second", "That is a unit of speed."]], x: "One hertz is one vibration per second." },
        { p: "Why can you hear a train sooner by putting your ear to the rail?", a: "Sound travels faster through steel than through air", w: [["The rail makes the sound higher", "The rail does not change the pitch."], ["Air blocks all sound", "Air carries sound, just more slowly than steel."]], x: "Sound travels much faster in solids such as steel." },
      ],
    },
  ],
};

const NEGATIVES: ChapterSpec = {
  id: "negative-numbers",
  number: "213",
  title: "The Case of the Frozen Thermometer",
  topic: "Negative numbers",
  subject: "maths",
  grade: 7,
  tagline: "Work with numbers below zero: temperatures, depths and bank balances.",
  hook: "At midnight the thermometer read −4 °C. By noon it was 7 °C. The weather report says it warmed by 3 degrees. Something does not add up.",
  goal: "Order, add, subtract, multiply and divide negative numbers.",
  learn: ["Place negative numbers on a number line", "Add and subtract with negative numbers", "Multiply and divide with negative numbers"],
  lessons: [
    {
      id: "negatives",
      title: "Negative numbers",
      teaser: "Numbers below zero, on the number line.",
      question: "The temperature rose from −4 °C to 7 °C. How many degrees did it rise?",
      goals: ["Order negative and positive numbers on a number line", "Add and subtract with negative numbers", "Use the sign rules to multiply and divide"],
      hint: "Count the steps on a number line from −4 up to 0, and then from 0 up to 7.",
      walk: "From −4 to 0 is 4 degrees. From 0 to 7 is 7 more. 4 + 7 = 11. You can also calculate 7 − (−4) = 7 + 4 = 11. The temperature rose by 11 degrees, not 3.",
      summary: [
        "Negative numbers are less than zero. On a number line, the further left, the smaller the number: −8 is less than −3.",
        "Subtracting a negative is the same as adding: 5 − (−2) = 7. When multiplying or dividing, two signs the same give a positive; different signs give a negative.",
      ],
      explain: [
        p("Negative numbers are numbers less than zero. We use them for temperatures below freezing, depths below sea level, and money owed."),
        h("Ordering"),
        p("On a number line, numbers get bigger as you move right. −2 is bigger than −7, because it is further right, even though 7 is bigger than 2."),
        h("Adding and subtracting"),
        list(
          "Adding a positive number moves right: −3 + 5 = 2.",
          "Subtracting a positive number moves left: 2 − 6 = −4.",
          "Adding a negative is the same as subtracting: 4 + (−6) = 4 − 6 = −2.",
          "Subtracting a negative is the same as adding: 3 − (−5) = 3 + 5 = 8.",
        ),
        tip("Key idea", "Two minus signs next to each other, as in − (−5), become a plus."),
        h("Multiplying and dividing"),
        list("Same signs give a positive: −3 × −4 = 12, and −12 ÷ −3 = 4.", "Different signs give a negative: −3 × 4 = −12, and 12 ÷ −3 = −4."),
      ],
      tryIt: [
        h("Temperature and money"),
        list(
          "Moscow is −12 °C and Cairo is 18 °C. The difference is 18 − (−12) = 30 degrees.",
          "You have £5 and spend £8. Your balance is 5 − 8 = −£3 (you owe £3).",
          "A diver at −20 m rises 6 m: −20 + 6 = −14 m.",
        ),
        p("Challenge: put these in order from smallest to largest: 3, −1, −6, 0, −2. (−6, −2, −1, 0, 3.)"),
      ],
      practice: [
        { p: "Which is smaller: −7 or −2?", a: "−7", w: [["−2", "−2 is further right on the number line, so it is bigger."], ["They are equal", "They are different points on the number line."]], x: "−7 is further left, so it is smaller." },
        { p: "Work out 3 − (−4).", a: "7", w: [["−1", "Subtracting a negative means adding: 3 + 4."], ["−7", "The two minus signs make a plus."]], x: "3 − (−4) = 3 + 4 = 7." },
      ],
      quiz: [
        { p: "The temperature rose from −4 °C to 7 °C. How much did it rise?", a: "11 degrees", w: [["3 degrees", "That is 7 − 4, but the start was −4, not 4."], ["−11 degrees", "It rose, so the change is positive."]], x: "7 − (−4) = 11." },
        { p: "Three statements about negative numbers. Which is true?", a: "A negative times a negative gives a positive.", w: [["A negative times a negative gives a negative.", "Same signs give a positive."], ["−10 is bigger than −1.", "−10 is further left, so it is smaller."]], x: "−3 × −4 = 12.", lineup: true },
        { p: "Work out −24 ÷ 6.", a: "−4", w: [["4", "Different signs give a negative answer."], ["−18", "That is −24 + 6, not division."]], x: "24 ÷ 6 = 4, and the signs are different, so −4." },
      ],
      check: [
        { p: "A diver is at −15 m and goes down 10 m more. Where is the diver now?", a: "−25 m", w: [["−5 m", "Going down makes the number more negative."], ["25 m", "The diver is below sea level, so the number is negative."]], x: "−15 − 10 = −25." },
        { p: "Work out −5 × −3.", a: "15", w: [["−15", "Same signs give a positive."], ["−8", "That is −5 + −3, not multiplication."]], x: "Two negatives multiply to a positive: 15." },
      ],
    },
  ],
};

const AVERAGES: ChapterSpec = {
  id: "averages",
  number: "214",
  title: "The Case of the Misleading Average",
  topic: "Mean, median, mode and range",
  subject: "maths",
  grade: 7,
  tagline: "Choose the right average, and spot when one is being used to mislead.",
  hook: "A company says the average pay of its workers is £60,000. Most of the workers earn £20,000. Is the company lying, or just choosing its average carefully?",
  goal: "Calculate the mean, median, mode and range, and choose the most suitable average for a set of data.",
  learn: ["Calculate the mean, median and mode", "Calculate the range", "Explain how an extreme value affects the mean"],
  lessons: [
    {
      id: "mean-median-mode",
      title: "Mean, median, mode and range",
      teaser: "Three kinds of average and one measure of spread.",
      question: "Five workers earn £20,000, £20,000, £22,000, £25,000 and £213,000. What are the mean and median, and which is fairer?",
      goals: ["Calculate the mean, median and mode of a data set", "Calculate the range", "Choose a suitable average, especially when there is an extreme value"],
      hint: "Add them up and divide by 5 for the mean. For the median, find the middle value when they are in order.",
      walk: "Total: 20,000 + 20,000 + 22,000 + 25,000 + 213,000 = 300,000. Mean = 300,000 ÷ 5 = £60,000. In order, the middle (third) value is £22,000, so the median is £22,000. One very large salary pulls the mean up, so the median describes a typical worker better.",
      summary: [
        "Mean: add the values and divide by how many there are. Median: the middle value in order. Mode: the most common value. Range: largest minus smallest.",
        "An extreme value (an outlier) pulls the mean towards it. The median is less affected, so it can be a fairer average.",
      ],
      explain: [
        p("An average is a single value that represents a set of data. There are three common averages, and they can give different answers."),
        h("The three averages"),
        list(
          "Mean: add all the values, then divide by the number of values. For 2, 4, 9: (2 + 4 + 9) ÷ 3 = 5.",
          "Median: put the values in order and find the middle one. For 3, 7, 8, 10, 15 the median is 8. With an even number of values, the median is halfway between the two middle ones.",
          "Mode: the value that appears most often. For 4, 6, 6, 9 the mode is 6. There can be more than one mode, or none.",
        ),
        h("The range"),
        p("The range shows how spread out the data is: largest value minus smallest value. For 3, 7, 8, 10, 15 the range is 15 − 3 = 12."),
        tip("Key idea", "The mean uses every value, so one extreme value can drag it a long way. The median only cares about the middle."),
        h("Choosing an average"),
        p("Use the median when there are extreme values, such as house prices or salaries. Use the mode for things that are not numbers, such as the most popular shoe size or favourite colour. Use the mean when the data has no extreme values and you want every value to count."),
      ],
      tryIt: [
        h("Test scores"),
        p("Scores: 6, 8, 8, 9, 4, 7."),
        list("In order: 4, 6, 7, 8, 8, 9.", "Mean: 42 ÷ 6 = 7.", "Median: halfway between 7 and 8, which is 7.5.", "Mode: 8.", "Range: 9 − 4 = 5."),
        p("Back to the case: the company is not lying about the mean, but the median (£22,000) gives a fairer picture of most workers’ pay."),
      ],
      practice: [
        { p: "Find the median of 5, 1, 9, 3, 7.", a: "5", w: [["9", "Put them in order first: 1, 3, 5, 7, 9."], ["3", "3 is second in order, not the middle."]], x: "In order the middle value is 5." },
        { p: "Find the range of 12, 4, 20, 9.", a: "16", w: [["20", "That is the largest value, not the range."], ["11.25", "That is the mean."]], x: "20 − 4 = 16." },
      ],
      quiz: [
        { p: "Five salaries: £20,000, £20,000, £22,000, £25,000, £213,000. What is the mean?", a: "£60,000", w: [["£22,000", "That is the median."], ["£20,000", "That is the mode."]], x: "300,000 ÷ 5 = 60,000." },
        { p: "Three statements about averages. Which is true?", a: "One very large value can pull the mean up a lot.", w: [["The median changes a lot when one value is extreme.", "The median depends on the middle value, so it changes little."], ["Every data set has exactly one mode.", "There can be several modes, or none."]], x: "The mean includes every value, so outliers affect it strongly.", lineup: true },
        { p: "Which average suits “the most popular shoe size sold”?", a: "The mode", w: [["The mean", "A mean shoe size such as 6.37 is not a size you can buy."], ["The range", "The range is a measure of spread, not an average."]], x: "The mode is the most common value." },
      ],
      check: [
        { p: "Find the mean of 3, 5, 10.", a: "6", w: [["5", "That is the median."], ["18", "18 is the total. Divide by 3."]], x: "(3 + 5 + 10) ÷ 3 = 6." },
        { p: "Find the median of 2, 4, 6, 8.", a: "5", w: [["4", "With four values, take halfway between the two middle ones, 4 and 6."], ["6", "The median is halfway between 4 and 6."]], x: "Halfway between 4 and 6 is 5." },
      ],
    },
  ],
};

const SILK: ChapterSpec = {
  id: "silk-roads",
  number: "215",
  title: "The Case of the Silk Bale",
  topic: "Trade on the Silk Roads",
  subject: "history",
  grade: 7,
  tagline: "Follow goods, people and ideas along the trade routes that linked China to Europe.",
  hook: "A bale of Chinese silk turns up in a Roman market, thousands of kilometres from where it was woven. No single trader carried it all the way. How did it get there?",
  goal: "Explain how the Silk Roads worked and how they spread goods, ideas and diseases.",
  learn: ["Describe the Silk Roads and where they ran", "Explain how goods moved by relay trade", "Describe the spread of ideas, religions and disease"],
  lessons: [
    {
      id: "silk-trade",
      title: "Trade on the Silk Roads",
      teaser: "A web of routes that carried silk, spices, paper and ideas.",
      question: "How could Chinese silk reach Rome when no trader travelled the whole way?",
      goals: ["Describe the Silk Roads as a network of land and sea routes", "Explain relay trade through many merchants and cities", "Give examples of ideas, technologies and diseases that spread along the routes"],
      hint: "Think of a relay race. Goods could be sold on from one merchant to the next.",
      walk: "The Silk Roads were not one road but a network. Merchants usually travelled one section. They sold goods in trading cities such as Samarkand, and other merchants carried them further. Each step added to the price. By relay, silk could cross Asia and reach the Mediterranean.",
      summary: [
        "The Silk Roads were a network of trade routes linking China, Central Asia, India, the Middle East, Africa and Europe from about the 2nd century BCE.",
        "Goods moved by relay through many merchants and cities. Religions, technologies and diseases spread along the same routes.",
      ],
      explain: [
        p("The name “Silk Road” was invented by a German geographer in the 1800s. In fact there were many routes, over mountains, deserts and seas. Historians often say “Silk Roads”."),
        h("What was traded"),
        list(
          "From China: silk, porcelain, tea and paper.",
          "From India and South-East Asia: spices, cotton and gems.",
          "From the West: glass, gold, silver, wool and horses.",
        ),
        h("How it worked"),
        p("Trade grew after China’s Han dynasty opened routes west in the 2nd century BCE. Camel caravans crossed deserts and stopped at oasis cities and caravanserais, which were roadside inns. Most merchants travelled only part of the way, so goods passed through many hands. Cities like Samarkand and Kashgar grew rich as trading hubs."),
        tip("Key idea", "The Silk Roads moved more than goods. Ideas, religions and diseases travelled too."),
        h("Ideas and diseases"),
        p("Buddhism spread from India into China along these routes. Paper-making spread west from China. Later, Islam spread east. In the 1300s, the Black Death is thought to have travelled along trade routes from Asia towards Europe, killing millions."),
      ],
      tryIt: [
        h("Trace the journey"),
        p("Put this journey of a silk bale in order."),
        list("1. Silk is woven in Chang’an, China.", "2. A caravan carries it west to Dunhuang, then across the desert.", "3. It is sold in Samarkand to a Persian merchant.", "4. It reaches a port on the Mediterranean.", "5. It is sold in a Roman market, at a much higher price."),
        p("Detective question: why was silk so expensive in Rome? (Every merchant along the way added their cost and profit.)"),
      ],
      practice: [
        { p: "What was the Silk Roads?", a: "A network of trade routes linking Asia, Africa and Europe", w: [["A single paved road from Rome to Beijing", "There were many routes, mostly unpaved."], ["A river in China", "The Silk Roads were trade routes over land and sea."]], x: "Historians say “roads” because there were many routes." },
        { p: "Which product did China export along the Silk Roads?", a: "Silk", w: [["Horses", "Horses were mostly traded towards China."], ["Glass from Rome", "Glass came from the West."]], x: "Chinese silk was so famous the routes were named after it." },
      ],
      quiz: [
        { p: "How did most goods travel the whole length of the Silk Roads?", a: "They were passed from merchant to merchant along different sections", w: [["One merchant carried them all the way", "Few traders made the whole journey."], ["They were posted by a government postal service", "Trade was carried out by merchants."]], x: "Relay trade moved goods through many hands and cities." },
        { p: "Three statements about the Silk Roads. Which is true?", a: "Religions such as Buddhism spread along the routes.", w: [["Only silk was ever traded.", "Spices, paper, glass, horses and much more were traded."], ["The routes had no effect on Europe.", "Goods, ideas and even disease reached Europe."]], x: "Ideas travelled with the merchants.", lineup: true },
        { p: "Why did cities like Samarkand grow rich?", a: "They were trading hubs where merchants met to buy and sell", w: [["They had the biggest silk farms", "Silk mostly came from China."], ["They were capitals of the Roman Empire", "Samarkand is in Central Asia."]], x: "Trading cities profited from the goods passing through." },
      ],
      check: [
        { p: "What was a caravanserai?", a: "A roadside inn where caravans could rest", w: [["A type of silk", "It was a building for travellers."], ["A Chinese emperor", "It was a resting place on the routes."]], x: "Caravanserais gave shelter to merchants and their animals." },
        { p: "Which deadly disease is thought to have spread along trade routes in the 1300s?", a: "The Black Death", w: [["Smallpox in the Americas", "That spread after 1492, mainly by sea."], ["The common cold", "The Black Death was the deadly plague of the 1300s."]], x: "The plague is thought to have spread from Asia along trade routes." },
      ],
    },
  ],
};

const FEUDAL: ChapterSpec = {
  id: "feudalism",
  number: "216",
  title: "The Case of the Castle Keep",
  topic: "The feudal system",
  subject: "history",
  grade: 7,
  tagline: "Find out who owed what to whom in medieval Europe.",
  hook: "A medieval peasant must work three days a week on the lord’s land, and give him some of the harvest. In return, what does the peasant get?",
  goal: "Explain how the feudal system worked in medieval Europe, especially in England after 1066.",
  learn: ["Describe the levels of the feudal system", "Explain the exchange of land for service and loyalty", "Describe the life of a peasant"],
  lessons: [
    {
      id: "feudal-system",
      title: "The feudal system",
      teaser: "Land in return for loyalty and service.",
      question: "Why did a medieval peasant work for the lord, and what did the peasant get in return?",
      goals: ["Name the main levels of the feudal system", "Explain the exchange of land, service and protection", "Describe the duties and rights of peasants"],
      hint: "The feudal system was a chain of promises. Each level gave something and got something back.",
      walk: "In the feudal system the king owned the land and granted it to barons in return for loyalty and soldiers. Barons granted land to knights, who served as soldiers. Peasants farmed small strips and worked the lord’s land, gave part of the harvest and paid dues. In return they had land to live on and the lord’s protection, though they could not leave without permission.",
      summary: [
        "Feudalism was a system of land in exchange for service. King, then barons (and bishops), then knights, then peasants.",
        "Peasants worked the land and paid dues in return for a place to live and protection. Many were villeins, not free to leave.",
      ],
      explain: [
        p("In medieval Europe, land was the main source of wealth. The feudal system organised who held land and what they owed for it. In England, William the Conqueror set it up firmly after he won the Battle of Hastings in 1066."),
        h("The levels"),
        list(
          "The king: owned all the land and granted large areas to barons and bishops.",
          "Barons and bishops: swore loyalty (homage) to the king and provided knights for his army.",
          "Knights: were given land (a manor) by a baron in return for fighting when needed.",
          "Peasants: farmed the land and did work for the lord of the manor.",
        ),
        tip("Key idea", "Each level gave something to the level above and received something from it. It was a chain of promises."),
        h("Peasant life"),
        p("Most people were peasants. Many were villeins (serfs), who could not leave the manor or marry without the lord’s permission. They worked the lord’s fields for part of the week, gave him some of their crops, and paid a tenth (a tithe) to the Church. In return they had strips of land to grow food and the lord’s protection."),
        p("The feudal system began to weaken after the Black Death in 1348. So many peasants died that the survivors could demand wages and more freedom."),
      ],
      tryIt: [
        h("Who owes what?"),
        list(
          "A knight to his baron: military service, about 40 days a year.",
          "A baron to the king: loyalty and knights for the army.",
          "A villein to the lord of the manor: work on the lord’s land and part of the harvest.",
          "The lord to the villein: land to farm and protection.",
        ),
        p("Detective question: why might peasants have been able to ask for wages after 1348? (So many workers died that there were too few to farm the land.)"),
      ],
      practice: [
        { p: "Who was at the top of the feudal system?", a: "The king", w: [["The knights", "Knights were below the barons."], ["The peasants", "Peasants were at the bottom."]], x: "The king granted land to everyone below." },
        { p: "What did a knight give in return for land?", a: "Military service", w: [["A tenth of his crops to the Church", "That was a tithe, paid by peasants and others."], ["Nothing at all", "Feudal land always came with duties."]], x: "Knights fought for their lord when called." },
      ],
      quiz: [
        { p: "What did peasants receive in return for working the lord’s land?", a: "Land to farm and the lord’s protection", w: [["A large salary in gold coins", "Most peasants paid in work and crops, not wages."], ["The right to become king", "The feudal system kept people in their place."]], x: "It was an exchange of work for land and protection." },
        { p: "Three statements about villeins. Which is true?", a: "They could not leave the manor without the lord’s permission.", w: [["They owned large estates.", "They farmed small strips and owned little."], ["They gave orders to knights.", "Knights were above peasants."]], x: "Villeins were tied to the manor.", lineup: true },
        { p: "Why did the Black Death weaken the feudal system?", a: "So many peasants died that the survivors could demand wages and freedom", w: [["It killed all the kings of Europe", "Kings survived; it was the loss of workers that mattered."], ["It made land worthless forever", "Land still mattered, but there were too few workers to farm it."]], x: "A shortage of workers gave peasants bargaining power." },
      ],
      check: [
        { p: "What was a tithe?", a: "A tenth of produce or income given to the Church", w: [["A type of castle", "A tithe was a payment."], ["A knight’s weapon", "A tithe was a payment to the Church."]], x: "Tithe means a tenth." },
        { p: "In which year did William the Conqueror win the Battle of Hastings?", a: "1066", w: [["1348", "That is when the Black Death reached England."], ["1215", "That is the year of Magna Carta."]], x: "William won in 1066 and set up feudal rule in England." },
      ],
    },
  ],
};

const ROCKS: ChapterSpec = {
  id: "rocks",
  number: "217",
  title: "The Case of the Layered Cliff",
  topic: "Rock types and the rock cycle",
  subject: "geography",
  grade: 7,
  tagline: "Read the story written in rocks, and follow how one rock becomes another.",
  hook: "A cliff shows neat stripes of rock, and halfway up there is a fossil seashell. The cliff is 200 metres above the sea. How did a seashell get up there?",
  goal: "Describe igneous, sedimentary and metamorphic rocks and explain how the rock cycle links them.",
  learn: ["Describe how the three rock types form", "Give an example of each rock type", "Explain the rock cycle"],
  lessons: [
    {
      id: "rock-cycle",
      title: "Rock types and the rock cycle",
      teaser: "Igneous, sedimentary and metamorphic, and how one becomes another.",
      question: "How can a fossil seashell end up in rock high above the sea?",
      goals: ["Explain how igneous, sedimentary and metamorphic rocks form", "Give an example of each type", "Describe the main processes of the rock cycle"],
      hint: "Which rock type forms from layers of sand and mud on the sea floor? What could lift it up later?",
      walk: "Shells and sediment settle on the sea floor in layers. Over millions of years they are squashed and cemented into sedimentary rock, trapping the shell as a fossil. Later, the movement of tectonic plates can push the rock up to form land. Erosion then exposes the layers in a cliff.",
      summary: [
        "Igneous rock forms from cooled magma or lava. Sedimentary rock forms from layers of sediment pressed together. Metamorphic rock forms when heat and pressure change existing rock.",
        "The rock cycle links them: weathering, erosion, deposition, compaction, heating, melting and uplift slowly turn one rock into another.",
      ],
      explain: [
        p("Rocks may look as if they never change, but over millions of years they are made, destroyed and remade. Geologists sort rocks into three types by how they formed."),
        h("Igneous rocks"),
        p("Igneous rocks form when molten rock cools and hardens. Magma that cools slowly underground forms large crystals, as in granite. Lava that cools quickly at the surface forms small crystals, as in basalt."),
        h("Sedimentary rocks"),
        p("Weathering and erosion break rocks into small pieces called sediment. Rivers carry sediment to lakes and seas, where it settles in layers. Over time the layers are squashed (compacted) and cemented into rock, such as sandstone, limestone and shale. Sedimentary rocks often contain fossils."),
        h("Metamorphic rocks"),
        p("When existing rock is heated and squeezed deep underground, without melting, it changes into metamorphic rock. Limestone becomes marble. Shale becomes slate."),
        tip("Key idea", "The rock cycle has no start or end. Any rock can become any other type, given enough time."),
        h("The rock cycle"),
        p("Rock at the surface is weathered and eroded, deposited as sediment and turned into sedimentary rock. Buried deeply, it may become metamorphic. Deeper still, it may melt into magma and cool as igneous rock. Plate movements lift rock back to the surface, and the cycle continues."),
      ],
      tryIt: [
        h("Identify the rock"),
        list("Large, speckled crystals that formed slowly underground: granite (igneous).", "Layers with a fossil shell: limestone (sedimentary).", "Made from heated, squeezed limestone, used for statues: marble (metamorphic).", "Thin sheets used for roofs, formed from shale: slate (metamorphic)."),
        p("Back to the case: the shell was trapped in sedimentary rock on the sea floor, and plate movement later lifted the layers far above sea level."),
      ],
      practice: [
        { p: "How does igneous rock form?", a: "When molten rock cools and hardens", w: [["When layers of sand are pressed together", "That forms sedimentary rock."], ["When rock is heated and squeezed without melting", "That forms metamorphic rock."]], x: "Igneous rocks come from magma or lava." },
        { p: "Which rock type often contains fossils?", a: "Sedimentary", w: [["Igneous", "The heat of molten rock destroys remains, so igneous rocks rarely have fossils."], ["None of them", "Sedimentary rocks often contain fossils."]], x: "Remains get trapped in layers of sediment." },
      ],
      quiz: [
        { p: "Limestone is heated and squeezed deep underground. What does it become?", a: "Marble, a metamorphic rock", w: [["Granite, an igneous rock", "Granite forms from cooled magma."], ["Sandstone, a sedimentary rock", "Sandstone forms from sand grains."]], x: "Heat and pressure turn limestone into marble." },
        { p: "Three statements about the rock cycle. Which is true?", a: "Any rock type can slowly change into another type.", w: [["Rocks never change once formed.", "Rocks are changed by weathering, heat, pressure and melting."], ["Only igneous rocks are part of the cycle.", "All three types are part of the rock cycle."]], x: "The rock cycle links all three types.", lineup: true },
        { p: "Why does granite have bigger crystals than basalt?", a: "Granite cooled slowly underground, so crystals had time to grow", w: [["Granite cooled quickly at the surface", "Quick cooling makes small crystals, as in basalt."], ["Granite is made of sand", "Granite is igneous, made from magma."]], x: "Slow cooling gives large crystals." },
      ],
      check: [
        { p: "What is sediment?", a: "Small pieces of broken rock, sand and mud", w: [["Molten rock under the ground", "That is magma."], ["A type of crystal", "Sediment is made of small particles."]], x: "Weathering and erosion break rock into sediment." },
        { p: "Which process lifts rock from deep underground back to the surface?", a: "Uplift caused by moving tectonic plates", w: [["Deposition", "Deposition drops sediment."], ["Evaporation", "Evaporation is part of the water cycle."]], x: "Plate movements can raise rock to form mountains." },
      ],
    },
  ],
};

const COASTS: ChapterSpec = {
  id: "coasts",
  number: "218",
  title: "The Case of the Vanishing Headland",
  topic: "Coastal erosion and landforms",
  subject: "geography",
  grade: 7,
  tagline: "Watch the sea carve caves, arches and stacks out of solid cliffs.",
  hook: "Imagine three pictures of the same headland. A very old drawing shows a cave. An old postcard shows a rock arch in the same place. A photo taken after a big storm shows the arch with part of its roof fallen in. What will be there next?",
  goal: "Explain how waves erode the coast and form caves, arches, stacks and stumps.",
  learn: ["Name the processes of coastal erosion", "Explain how headlands and bays form", "Describe the sequence from crack to stump"],
  lessons: [
    {
      id: "coastal-erosion",
      title: "Coastal erosion and landforms",
      teaser: "Crack, cave, arch, stack, stump.",
      question: "How does a solid headland turn into a tall stack of rock standing in the sea?",
      goals: ["Name hydraulic action, abrasion and attrition", "Explain how headlands and bays form", "Describe how a crack becomes a cave, an arch, a stack and a stump"],
      hint: "Waves attack weak points first. What happens to a small crack over many years?",
      walk: "Waves force air and water into a crack in the headland (hydraulic action) and throw stones at it (abrasion). The crack grows into a cave. If caves on both sides meet, they form an arch. The arch roof is eroded from below and weathered from above until it collapses, leaving a stack. The stack is worn down into a stump.",
      summary: [
        "Waves erode the coast by hydraulic action, abrasion and attrition, and also dissolve some rocks such as chalk and limestone.",
        "Headlands form where hard rock resists erosion. They are worn into caves, arches, stacks and stumps over hundreds or thousands of years.",
      ],
      explain: [
        p("The coast is where the land meets the sea. Waves carry enormous energy, especially in storms, and they slowly reshape the coastline."),
        h("How waves erode"),
        list(
          "Hydraulic action: waves force water and air into cracks. The pressure widens them.",
          "Abrasion: waves throw sand and pebbles at the cliff, scraping it like sandpaper.",
          "Attrition: rocks carried by the waves knock into each other and become smaller and rounder.",
          "Solution: sea water slowly dissolves some rocks, such as chalk and limestone.",
        ),
        h("Headlands and bays"),
        p("Where bands of hard and soft rock meet the sea, the soft rock erodes faster, making a bay. The hard rock is left sticking out as a headland."),
        tip("Key idea", "Headlands erode too, just more slowly. Erosion attacks their weak points: cracks and faults."),
        h("Crack, cave, arch, stack, stump"),
        p("A crack in a headland is widened into a cave. When caves on either side of the headland meet, an arch forms. The arch roof eventually collapses, leaving a stack. The stack is worn down into a stump, which may only show at low tide. Durdle Door in Dorset, England, is a famous arch; the Old Harry Rocks are stacks."),
      ],
      tryIt: [
        h("Put the stages in order"),
        list("1. A crack forms in the headland.", "2. The crack is eroded into a cave.", "3. The cave breaks through to make an arch.", "4. The arch roof collapses, leaving a stack.", "5. The stack is eroded into a stump."),
        p("Back to the case: if the rest of the arch roof falls, the headland will be left with a stack, and one day a stump."),
      ],
      practice: [
        { p: "Which process is waves throwing pebbles against a cliff?", a: "Abrasion", w: [["Attrition", "Attrition is rocks hitting each other, not the cliff."], ["Solution", "Solution is rock dissolving in sea water."]], x: "Abrasion scrapes the cliff like sandpaper." },
        { p: "Why do bays form?", a: "Softer rock erodes faster than the harder rock beside it", w: [["Hard rock erodes faster than soft rock", "Hard rock resists erosion, so it stays as headlands."], ["Bays are dug by people", "Bays are formed naturally by erosion."]], x: "Different rock strengths make headlands and bays." },
      ],
      quiz: [
        { p: "What forms when two caves on either side of a headland meet?", a: "An arch", w: [["A stump", "A stump is the last stage, after a stack."], ["A bay", "Bays form in softer rock, not through a headland."]], x: "The caves break through to form an arch." },
        { p: "Three statements about stacks. Which is true?", a: "A stack forms when the roof of an arch collapses.", w: [["A stack forms before a cave.", "The order is crack, cave, arch, stack, stump."], ["Stacks never erode further.", "Stacks are worn down into stumps."]], x: "A stack is a pillar left behind when an arch falls.", lineup: true },
        { p: "Which process happens when waves force air into a crack, widening it?", a: "Hydraulic action", w: [["Attrition", "Attrition is rocks colliding with each other."], ["Deposition", "Deposition is when material is dropped."]], x: "Compressed air and water widen cracks." },
      ],
      check: [
        { p: "What is a headland?", a: "An area of hard rock that sticks out into the sea", w: [["A curved bay of soft rock", "That is a bay."], ["A cave in a cliff", "A cave can form in a headland, but it is not the headland itself."]], x: "Hard rock resists erosion and is left sticking out." },
        { p: "What is the correct order?", a: "Crack, cave, arch, stack, stump", w: [["Cave, crack, stump, arch, stack", "A crack must come first, and a stump last."], ["Stack, arch, cave, crack, stump", "That is backwards."]], x: "Erosion works through the headland in that order." },
      ],
    },
  ],
};

export const EXTRA_G7: ChapterSpec[] = [CELLS, SOUND, NEGATIVES, AVERAGES, SILK, FEUDAL, ROCKS, COASTS];
