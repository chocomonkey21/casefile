import type { ClueContent } from "@/lib/types";

/* The Case of the Secret Scroll: ancient Egypt. */

export const EGYPT_LESSONS: Record<string, ClueContent> = {
  /* ------------------------------------------------------------------ */
  nile: {
    question: "Why did almost everyone in ancient Egypt live beside the Nile?",
    hints: {
      nudge: "Egypt is mostly desert. What do people need that the desert does not have?",
      evidenceId: "nile-intro",
      evidenceNote: "The reading “Life on the Nile” explains what the river gave people every year.",
      walkthrough: "The desert has no water and poor soil. Every summer the Nile flooded and left rich black mud on its banks. Farmers grew crops in that mud, and the river gave water, fish and a road for boats.",
    },
    explanation: [
      "The Nile gave water, fertile soil, food and transport in the middle of a desert. Without it, ancient Egypt could not have existed.",
      "Each year's flood spread black silt over the fields. The Egyptians called their land Kemet, the black land, after that soil.",
    ],
    evidence: {
      "nile-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "Egypt is a hot, dry country. Most of it is desert where almost nothing grows. But through the middle runs the River Nile, the longest river in Africa." },
          { type: "p", text: "Every summer, rain far to the south made the Nile flood. When the water went down, it left a layer of rich black mud called silt. Crops grew brilliantly in it." },
          { type: "tip", title: "Key idea", text: "The yearly flood made farming possible. Food from the farms let Egypt grow into a powerful kingdom." },
          { type: "h", text: "What the Nile gave" },
          { type: "list", items: ["Water for drinking, washing and crops", "Silt to grow wheat, barley and flax", "Fish and birds to eat", "Papyrus reeds to make paper and boats", "A river road to carry people and stone"] },
        ],
      },
      "nile-map": {
        kind: "practice",
        intro: "Put the farming year in order, starting with the flood. Just for practice.",
        order: {
          prompt: "Put the seasons of the Nile farming year in order.",
          items: ["The Nile floods the fields", "The water goes down and leaves black silt", "Farmers plant seeds in the silt", "Crops are harvested before the next flood"],
        },
      },
    },
    quiz: [
      {
        id: "en-1",
        type: "lineup",
        prompt: "Why did people in ancient Egypt live by the Nile? Pick the correct idea.",
        options: [
          { id: "a", text: "Because the river kept away enemies with crocodiles.", why: "There were crocodiles, but people lived there for water and farming." },
          { id: "b", text: "Because the yearly flood left rich soil for farming in a desert country." },
          { id: "c", text: "Because the Nile was always calm and never changed.", why: "The Nile flooded every year. That was the whole point." },
          { id: "d", text: "Because it rained a lot by the river.", why: "Egypt hardly gets any rain. The water came from far to the south." },
        ],
        correctId: "b",
        hint: "What did the flood leave behind?",
        evidenceId: "nile-intro",
        walkthrough: "The flood left black silt. In a desert country, that fertile land beside the river was the only good place to farm.",
        explanation: "The flood made farming possible in a desert.",
      },
      {
        id: "en-2",
        type: "choice",
        prompt: "What was papyrus used for?",
        options: [
          { id: "a", text: "Making paper and boats" },
          { id: "b", text: "Building pyramids", why: "The pyramids were made of stone blocks." },
          { id: "c", text: "Cooking food", why: "Papyrus is a reed, used mainly for paper, rope and boats." },
        ],
        correctId: "a",
        hint: "Check the list of what the Nile gave.",
        evidenceId: "nile-intro",
        walkthrough: "Papyrus reeds grew along the Nile. The Egyptians pressed them into paper and tied them into light boats.",
        explanation: "Paper and boats.",
      },
      {
        id: "en-3",
        type: "choice",
        prompt: "What did the Egyptians call their land, and why?",
        options: [
          { id: "a", text: "Kemet, the black land, after the dark soil" },
          { id: "b", text: "The red land, after the desert", why: "The desert was the red land. Their farmland was the black land." },
          { id: "c", text: "The river land, after the Nile", why: "Close, but their name came from the colour of the soil." },
        ],
        correctId: "a",
        hint: "Think about the colour of the silt.",
        evidenceId: "nile-intro",
        walkthrough: "The flood left black silt, so the Egyptians called their farmland Kemet, the black land.",
        explanation: "Kemet, the black land.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  pharaohs: {
    question: "Why did the people of Egypt obey the pharaoh?",
    hints: {
      nudge: "Think about what Egyptians believed about the pharaoh and the gods.",
      evidenceId: "pharaoh-intro",
      evidenceNote: "The reading “Who the pharaohs were” explains why the pharaoh was so powerful.",
      walkthrough: "Egyptians believed the pharaoh was a link between the gods and the people, almost a god himself. Obeying the pharaoh kept the world in order, which they called maat.",
    },
    explanation: [
      "People believed the pharaoh was chosen by the gods and kept the world in balance. Obeying him was part of their religion.",
      "The pharaoh owned the land, led the army, made laws and led the most important religious ceremonies.",
    ],
    evidence: {
      "pharaoh-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "The pharaoh was the king or queen of Egypt. The word means great house, after the palace." },
          { type: "p", text: "Egyptians believed the pharaoh stood between the gods and the people. The pharaoh's job was to keep maat: order, truth and balance in the world." },
          { type: "tip", title: "Key idea", text: "The pharaoh ruled as both king and religious leader. That is why people obeyed." },
          { type: "h", text: "Famous pharaohs" },
          { type: "list", items: ["Khufu built the Great Pyramid of Giza.", "Hatshepsut was a woman who ruled as pharaoh and sent trading trips abroad.", "Tutankhamun became pharaoh at about nine. His tomb was found almost untouched in 1922.", "Ramesses II ruled for 66 years and built huge temples."] },
        ],
      },
      "pharaoh-quiz": {
        kind: "practice",
        intro: "Who did what? Just for practice.",
        questions: [
          {
            id: "ep-p1",
            type: "choice",
            prompt: "Which pharaoh's tomb was found almost untouched in 1922?",
            options: [
              { id: "a", text: "Tutankhamun" },
              { id: "b", text: "Khufu", why: "Khufu built the Great Pyramid." },
              { id: "c", text: "Ramesses II", why: "Ramesses is famous for temples and a very long reign." },
            ],
            correctId: "a",
            hint: "He became pharaoh as a boy.",
            walkthrough: "Howard Carter found Tutankhamun's tomb in 1922, still full of treasure.",
            explanation: "Tutankhamun.",
          },
          {
            id: "ep-p2",
            type: "choice",
            prompt: "Could a woman be pharaoh?",
            options: [
              { id: "a", text: "Yes, Hatshepsut ruled as pharaoh" },
              { id: "b", text: "No, never", why: "Hatshepsut, and later Cleopatra, ruled Egypt." },
            ],
            correctId: "a",
            hint: "Look at the list of famous pharaohs.",
            walkthrough: "Hatshepsut ruled for about 20 years and is one of Egypt's most successful pharaohs.",
            explanation: "Yes. Hatshepsut was pharaoh.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "ep-1",
        type: "lineup",
        prompt: "Why did Egyptians obey the pharaoh? Pick the correct idea.",
        options: [
          { id: "a", text: "Because the pharaoh was elected by a vote.", why: "There were no elections. Power usually passed down the family." },
          { id: "b", text: "Because they believed the pharaoh linked them to the gods and kept order." },
          { id: "c", text: "Because the pharaoh paid everyone.", why: "Most people were farmers who paid taxes to the pharaoh, not the other way round." },
          { id: "d", text: "Because the pharaoh was the oldest person in Egypt.", why: "Tutankhamun was about nine when he became pharaoh." },
        ],
        correctId: "b",
        hint: "Think about religion.",
        evidenceId: "pharaoh-intro",
        walkthrough: "Egyptians believed the pharaoh kept maat, the order of the world, and spoke for the gods. Obeying was part of their beliefs.",
        explanation: "They believed the pharaoh linked people and gods, and kept order.",
      },
      {
        id: "ep-2",
        type: "choice",
        prompt: "What does the word pharaoh originally mean?",
        options: [
          { id: "a", text: "Great house" },
          { id: "b", text: "Son of the sun", why: "That was one of the pharaoh's titles, but not what the word means." },
          { id: "c", text: "River king", why: "The word comes from the royal palace." },
        ],
        correctId: "a",
        hint: "It is the name of a building.",
        evidenceId: "pharaoh-intro",
        walkthrough: "Pharaoh comes from the Egyptian for great house, meaning the royal palace.",
        explanation: "Great house.",
      },
      {
        id: "ep-3",
        type: "choice",
        prompt: "What was maat?",
        options: [
          { id: "a", text: "Order, truth and balance in the world" },
          { id: "b", text: "A type of crown", why: "Maat was an idea, not an object." },
          { id: "c", text: "The pharaoh's army", why: "Maat was about keeping the world in balance." },
        ],
        correctId: "a",
        hint: "It was the pharaoh's most important job.",
        evidenceId: "pharaoh-intro",
        walkthrough: "Maat meant order, truth and balance. The pharaoh's duty was to protect it.",
        explanation: "Maat was order and balance.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  writing: {
    question: "How can a picture stand for a sound?",
    hints: {
      nudge: "Think about the first sound of the thing in the picture.",
      evidenceId: "glyph-intro",
      evidenceNote: "The reading “Reading hieroglyphs” shows three kinds of symbol.",
      walkthrough: "Some hieroglyphs stand for a whole idea, like a sun for sun. Others stand for a sound, like an owl for the sound m. Scribes mixed both kinds, so pictures could spell out any word.",
    },
    explanation: [
      "Hieroglyphs mixed picture signs (a picture means the thing) with sound signs (a picture stands for a sound).",
      "Nobody could read them for over 1,400 years, until the Rosetta Stone helped Jean-François Champollion crack the code in 1822.",
    ],
    evidence: {
      "glyph-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "Hieroglyphs were the writing of ancient Egypt. There were more than 700 different signs, carved on temples and painted on tombs." },
          { type: "h", text: "Three kinds of sign" },
          { type: "list", items: ["Picture signs: a sun means sun.", "Sound signs: an owl stands for the sound m, a water ripple for the sound n.", "Clue signs: a small picture at the end that shows what kind of word it is, like a little man for a person's job."] },
          { type: "p", text: "Names of pharaohs were written inside an oval loop called a cartouche, to show they were special." },
          { type: "tip", title: "Key idea", text: "The Rosetta Stone had the same message in hieroglyphs and in Greek. Experts who could read the Greek used it to work out the hieroglyphs." },
          { type: "p", text: "Only scribes could read and write. They trained for years at special schools." },
        ],
      },
      "glyph-decode": {
        kind: "practice",
        intro: "Decode a few facts. Just for practice.",
        questions: [
          {
            id: "ew-p1",
            type: "choice",
            prompt: "What is a cartouche?",
            options: [
              { id: "a", text: "An oval loop around a royal name" },
              { id: "b", text: "A type of pen", why: "Scribes used reed brushes. A cartouche is a loop around a name." },
              { id: "c", text: "A tomb", why: "A cartouche marks a name, often in a tomb." },
            ],
            correctId: "a",
            hint: "It shows a name is special.",
            walkthrough: "A pharaoh's name was written inside an oval loop called a cartouche.",
            explanation: "An oval loop around a royal name.",
          },
          {
            id: "ew-p2",
            type: "choice",
            prompt: "Who could read and write hieroglyphs?",
            options: [
              { id: "a", text: "Trained scribes" },
              { id: "b", text: "Everyone", why: "Most Egyptians could not read. Scribes trained for years." },
              { id: "c", text: "Only the pharaoh", why: "Scribes did the writing for everyone, including the pharaoh." },
            ],
            correctId: "a",
            hint: "Look at the last paragraph.",
            walkthrough: "Reading and writing was a special skill. Scribes trained for years to learn it.",
            explanation: "Trained scribes.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "ew-1",
        type: "lineup",
        prompt: "Which idea about hieroglyphs is correct?",
        options: [
          { id: "a", text: "Every hieroglyph is just a picture of what it means.", why: "Many signs stand for sounds instead." },
          { id: "b", text: "Hieroglyphs mix picture signs and sound signs." },
          { id: "c", text: "There were only 26 hieroglyphs, like an alphabet.", why: "There were more than 700 signs." },
          { id: "d", text: "Hieroglyphs were only used for shopping lists.", why: "They were used on temples, tombs and important records." },
        ],
        correctId: "b",
        hint: "Look at the three kinds of sign.",
        evidenceId: "glyph-intro",
        walkthrough: "Some signs mean a thing, some stand for a sound, and some are clues to the meaning.",
        explanation: "Hieroglyphs mix pictures and sounds.",
      },
      {
        id: "ew-2",
        type: "choice",
        prompt: "How did the Rosetta Stone help people read hieroglyphs again?",
        options: [
          { id: "a", text: "It had the same text in hieroglyphs and Greek" },
          { id: "b", text: "It had a list of every hieroglyph and its meaning", why: "It was not a dictionary. It was one message written in different scripts." },
          { id: "c", text: "A pharaoh wrote instructions on it", why: "It was a public notice from priests, written in three scripts." },
        ],
        correctId: "a",
        hint: "Experts could already read one of the languages on it.",
        evidenceId: "glyph-intro",
        walkthrough: "Experts could read the Greek. Matching it to the hieroglyphs let Champollion work out the signs.",
        explanation: "It had the same message in hieroglyphs and Greek.",
      },
      {
        id: "ew-3",
        type: "choice",
        prompt: "An owl hieroglyph stands for the sound m. What kind of sign is it?",
        options: [
          { id: "a", text: "A sound sign" },
          { id: "b", text: "A picture sign", why: "A picture sign would mean owl. This one stands for a sound." },
          { id: "c", text: "A clue sign", why: "Clue signs come at the end of a word to show its type." },
        ],
        correctId: "a",
        hint: "It stands for a sound, not a thing.",
        evidenceId: "glyph-intro",
        walkthrough: "When a picture stands for a sound rather than the object, it is a sound sign.",
        explanation: "A sound sign.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  pyramids: {
    question: "How could people build pyramids without machines?",
    hints: {
      nudge: "Think about lots of people, simple tools and a very long time.",
      evidenceId: "pyramid-intro",
      evidenceNote: "The reading “Building a pyramid” explains the workers, the ramps and the plans.",
      walkthrough: "Thousands of skilled workers cut stone with copper tools, moved blocks on wooden sledges, poured water on the sand to help them slide, and dragged them up ramps. The Great Pyramid took about 20 years.",
    },
    explanation: [
      "With huge teams of paid workers, simple tools, sledges, ramps and careful planning over about 20 years.",
      "The pyramids were tombs. They were built to protect the pharaoh's body and help him live on in the afterlife.",
    ],
    evidence: {
      "pyramid-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "A pyramid was a tomb for a pharaoh. Egyptians believed the pharaoh would live on after death, and the pyramid protected his body and treasure for that afterlife." },
          { type: "p", text: "The Great Pyramid of Giza was built for Khufu about 4,500 years ago. It has about 2.3 million stone blocks, each heavier than a car." },
          { type: "h", text: "How it was done" },
          { type: "list", items: ["Stone was cut in quarries with copper chisels and wooden wedges.", "Blocks were loaded onto wooden sledges.", "Workers poured water on the sand in front of the sledge, which made it much easier to pull.", "Ramps of mud brick and rubble rose with the pyramid.", "Teams of workers were paid in bread, beer and housing. They were not slaves."] },
          { type: "tip", title: "Key idea", text: "Simple tools plus thousands of organised workers plus about 20 years built the Great Pyramid." },
        ],
      },
      "pyramid-order": {
        kind: "practice",
        intro: "Put the building steps in order. Just for practice.",
        order: {
          prompt: "Put the steps for moving one block in order.",
          items: ["Cut the block in the quarry", "Load it onto a wooden sledge", "Pour water on the sand and pull the sledge", "Drag the block up the ramp into place"],
        },
      },
    },
    quiz: [
      {
        id: "ey-1",
        type: "lineup",
        prompt: "Who built the pyramids? Pick the correct idea.",
        options: [
          { id: "a", text: "Slaves who were forced to work for nothing.", why: "Workers' villages and records show they were paid workers, fed and housed." },
          { id: "b", text: "Teams of paid workers, fed with bread and beer." },
          { id: "c", text: "Giants, because the blocks are so heavy.", why: "Ordinary people moved the blocks with sledges, water and ramps." },
          { id: "d", text: "The pharaoh, on his own.", why: "It took thousands of people about 20 years." },
        ],
        correctId: "b",
        hint: "Check the last item in the list in the reading.",
        evidenceId: "pyramid-intro",
        walkthrough: "Archaeologists found the workers' villages, bakeries and graves. They were organised, paid workers.",
        explanation: "Paid teams of workers.",
      },
      {
        id: "ey-2",
        type: "choice",
        prompt: "Why did workers pour water on the sand in front of a sledge?",
        options: [
          { id: "a", text: "It made the sledge slide much more easily" },
          { id: "b", text: "To cool the stone down", why: "The water was for the sand, not the stone." },
          { id: "c", text: "To clean the path", why: "Wet sand is firmer, so the sledge slides instead of digging in." },
        ],
        correctId: "a",
        hint: "Think about pulling something heavy across dry sand.",
        evidenceId: "pyramid-intro",
        walkthrough: "Dry sand piles up in front of a sledge. Damp sand is firm, so the sledge slides over it with far less effort.",
        explanation: "Wet sand made the sledges slide easily.",
      },
      {
        id: "ey-3",
        type: "choice",
        prompt: "What was a pyramid for?",
        options: [
          { id: "a", text: "A tomb for a pharaoh" },
          { id: "b", text: "A palace to live in", why: "Pharaohs lived in palaces. Pyramids were for after death." },
          { id: "c", text: "A store for grain", why: "That is an old myth. Pyramids were tombs." },
        ],
        correctId: "a",
        hint: "Look at the first paragraph.",
        evidenceId: "pyramid-intro",
        walkthrough: "Pyramids protected the pharaoh's body and treasure for the afterlife.",
        explanation: "A tomb for a pharaoh.",
      },
    ],
  },
};
