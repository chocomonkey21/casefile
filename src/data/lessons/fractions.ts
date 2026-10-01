import type { ClueContent } from "@/lib/types";

/* The Case of the Missing Slice: fractions. */

export const FRACTIONS_LESSONS: Record<string, ClueContent> = {
  /* ------------------------------------------------------------------ */
  "what-is": {
    question: "A pizza is cut into 8 slices and 1 is missing. How much is left?",
    hints: {
      nudge: "Count how many equal slices there were at the start, then count how many are still there.",
      evidenceId: "intro",
      evidenceNote: "Open the reading “What a fraction means”. Look at what the top and bottom numbers stand for.",
      walkthrough:
        "The pizza had 8 equal slices, so the bottom number is 8. One is missing, so 7 are left. The top number is 7. That makes 7/8 of the pizza.",
    },
    explanation: [
      "There were 8 equal slices and 7 are left, so 7/8 of the pizza is left.",
      "The bottom number (the denominator) says how many equal parts the whole is cut into. The top number (the numerator) says how many of those parts you have.",
    ],
    evidence: {
      intro: {
        kind: "reading",
        blocks: [
          { type: "p", text: "A fraction describes part of a whole. The whole could be a pizza, a chocolate bar, a class of students or a day." },
          { type: "p", text: "Every fraction has two numbers. The bottom number is the denominator. It tells you how many equal parts the whole is split into. The top number is the numerator. It tells you how many of those parts you are talking about." },
          { type: "tip", title: "Key idea", text: "In 3/4, the whole is cut into 4 equal parts and you have 3 of them." },
          { type: "h", text: "The parts must be equal" },
          { type: "p", text: "If you cut a cake into one huge piece and one tiny piece, each piece is not a half. Fractions only work when every part is the same size." },
          { type: "list", items: ["1/2: one of two equal parts", "1/4: one of four equal parts", "4/4: all four parts, which is the whole thing"] },
        ],
      },
      "slice-it": {
        kind: "practice",
        intro: "Two quick ones to check you can read a fraction. Just for practice.",
        questions: [
          {
            id: "fw-p1",
            type: "choice",
            prompt: "A chocolate bar has 6 equal squares. You eat 2. What fraction did you eat?",
            options: [
              { id: "a", text: "2/6" },
              { id: "b", text: "6/2", why: "The bottom number is the number of equal parts in the whole bar, which is 6." },
              { id: "c", text: "4/6", why: "4/6 is the part you did not eat." },
            ],
            correctId: "a",
            hint: "How many squares are in the whole bar? That is the bottom number.",
            walkthrough: "The whole bar has 6 squares, so the bottom number is 6. You ate 2, so the top number is 2. That makes 2/6.",
            explanation: "You ate 2 of 6 equal squares, which is 2/6.",
          },
          {
            id: "fw-p2",
            type: "choice",
            prompt: "In the fraction 5/9, what does the 9 tell you?",
            options: [
              { id: "a", text: "How many equal parts the whole is cut into" },
              { id: "b", text: "How many parts you have", why: "That is the top number, 5." },
              { id: "c", text: "How many parts are missing", why: "The missing parts would be 9 minus 5, which is 4." },
            ],
            correctId: "a",
            hint: "The bottom number is called the denominator.",
            walkthrough: "The bottom number is the denominator. It always tells you how many equal parts make the whole.",
            explanation: "The 9 is the denominator: the whole is cut into 9 equal parts.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "fw-1",
        type: "choice",
        prompt: "A pizza is cut into 8 equal slices. 1 slice is missing. What fraction of the pizza is left?",
        options: [
          { id: "a", text: "1/8", why: "1/8 is the slice that is missing, not what is left." },
          { id: "b", text: "7/8" },
          { id: "c", text: "8/7", why: "The bottom number is the number of slices in the whole pizza, which is 8." },
          { id: "d", text: "7/1", why: "That would mean seven whole pizzas." },
        ],
        correctId: "b",
        hint: "Count the slices that are left. That is the top number.",
        evidenceId: "intro",
        walkthrough: "The pizza has 8 equal slices, so the bottom is 8. 7 slices are left, so the top is 7. The answer is 7/8.",
        explanation: "7 of the 8 equal slices are left, so 7/8 of the pizza is left.",
      },
      {
        id: "fw-2",
        type: "lineup",
        prompt: "Four ideas about fractions. Only one is correct. Which one?",
        options: [
          { id: "a", text: "A bigger bottom number always means a bigger fraction.", why: "The opposite is often true: 1/8 is smaller than 1/2, because the whole is cut into more pieces." },
          { id: "b", text: "The parts of a fraction can be any size.", why: "The parts must be equal, or the fraction does not mean anything." },
          { id: "c", text: "The bottom number says how many equal parts make the whole." },
          { id: "d", text: "The top number is always smaller than 1.", why: "The top number is a count of parts, like 3 in 3/4. It is the whole fraction that is less than 1." },
        ],
        correctId: "c",
        hint: "Think about what the denominator means.",
        evidenceId: "intro",
        walkthrough: "The bottom number (the denominator) tells you how many equal parts the whole is cut into. The other ideas are common mix-ups.",
        explanation: "The denominator, the bottom number, is the number of equal parts in the whole.",
      },
      {
        id: "fw-3",
        type: "choice",
        prompt: "Which fraction means the whole thing?",
        options: [
          { id: "a", text: "1/4", why: "That is one part out of four." },
          { id: "b", text: "4/4" },
          { id: "c", text: "0/4", why: "That means none of it." },
          { id: "d", text: "4/1", why: "That would be four wholes." },
        ],
        correctId: "b",
        hint: "If you have every one of the equal parts, what is the top number?",
        evidenceId: "intro",
        walkthrough: "The whole is cut into 4 parts. Having all 4 of them means 4/4, which is the whole thing.",
        explanation: "4/4 means all four of four equal parts, so the whole thing.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  equivalent: {
    question: "Is half a pizza the same as two quarters of a pizza?",
    hints: {
      nudge: "Picture both on the same pizza. Do they cover the same amount?",
      evidenceId: "same-size",
      evidenceNote: "The reading “Fractions that are equal” shows how to turn one fraction into another of the same size.",
      walkthrough: "Cut each half of a pizza into two. Now there are 4 quarters, and half the pizza is 2 of them. So 1/2 and 2/4 cover exactly the same amount.",
    },
    explanation: [
      "Yes. 1/2 and 2/4 are equivalent fractions: different numbers, same amount.",
      "If you multiply (or divide) the top and the bottom by the same number, you get an equivalent fraction.",
    ],
    evidence: {
      "same-size": {
        kind: "reading",
        blocks: [
          { type: "p", text: "Equivalent fractions look different but show the same amount. Half a pizza is the same amount of pizza as two quarters, or four eighths." },
          { type: "tip", title: "Key idea", text: "Multiply the top and the bottom by the same number and the fraction keeps its size. 1/2 = 2/4 = 4/8." },
          { type: "p", text: "Why does this work? Doubling the bottom cuts every piece in two, so there are twice as many pieces. Doubling the top takes twice as many of those smaller pieces. You end up with the same amount." },
          { type: "h", text: "Going the other way" },
          { type: "p", text: "You can also divide the top and bottom by the same number. 6/9 becomes 2/3 when you divide both by 3. This is called simplifying." },
        ],
      },
      "match-up": {
        kind: "practice",
        intro: "Match the equal fractions. Just for practice.",
        questions: [
          {
            id: "fe-p1",
            type: "choice",
            prompt: "Which fraction is equal to 1/3?",
            options: [
              { id: "a", text: "2/6" },
              { id: "b", text: "1/6", why: "1/6 is half the size of 1/3." },
              { id: "c", text: "3/1", why: "That is three wholes." },
            ],
            correctId: "a",
            hint: "Multiply the top and bottom of 1/3 by 2.",
            walkthrough: "1 times 2 is 2, and 3 times 2 is 6. So 1/3 = 2/6.",
            explanation: "1/3 = 2/6, because both numbers were multiplied by 2.",
          },
          {
            id: "fe-p2",
            type: "choice",
            prompt: "Simplify 4/8.",
            options: [
              { id: "a", text: "1/2" },
              { id: "b", text: "1/4", why: "4/8 is half of the eight parts, not a quarter." },
              { id: "c", text: "2/8", why: "You need to divide the bottom number too." },
            ],
            correctId: "a",
            hint: "What number divides into both 4 and 8?",
            walkthrough: "Divide both by 4: 4 ÷ 4 is 1 and 8 ÷ 4 is 2. So 4/8 = 1/2.",
            explanation: "4/8 simplifies to 1/2.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "fe-1",
        type: "choice",
        prompt: "Which of these is equal to 1/2?",
        options: [
          { id: "a", text: "2/3", why: "2/3 is more than a half." },
          { id: "b", text: "3/6" },
          { id: "c", text: "1/4", why: "1/4 is half of a half." },
          { id: "d", text: "2/2", why: "2/2 is the whole thing." },
        ],
        correctId: "b",
        hint: "A half means the top number is half of the bottom number.",
        evidenceId: "same-size",
        walkthrough: "Multiply 1/2 by 3 on the top and bottom and you get 3/6. Three is half of six.",
        explanation: "3/6 is equal to 1/2.",
      },
      {
        id: "fe-2",
        type: "lineup",
        prompt: "Which idea about equivalent fractions is correct?",
        options: [
          { id: "a", text: "Add the same number to the top and bottom to get an equal fraction.", why: "Adding changes the size: 1/2 becomes 2/3 if you add 1 to both." },
          { id: "b", text: "Multiply the top and bottom by the same number to get an equal fraction." },
          { id: "c", text: "Fractions with different numbers can never be equal.", why: "1/2 and 2/4 have different numbers and the same size." },
          { id: "d", text: "Only multiply the bottom number.", why: "Changing only the bottom makes the pieces smaller, so the fraction shrinks." },
        ],
        correctId: "b",
        hint: "Look at the key idea in the reading.",
        evidenceId: "same-size",
        walkthrough: "Multiplying the top and bottom by the same number cuts every piece smaller and takes more of them. The amount stays the same.",
        explanation: "Multiply (or divide) the top and the bottom by the same number.",
      },
      {
        id: "fe-3",
        type: "choice",
        prompt: "Simplify 6/9.",
        options: [
          { id: "a", text: "2/3" },
          { id: "b", text: "3/6", why: "Divide both numbers by the same thing. 3/6 is a half, but 6/9 is more than a half." },
          { id: "c", text: "1/3", why: "That would be 3/9." },
          { id: "d", text: "6/3", why: "That is two wholes." },
        ],
        correctId: "a",
        hint: "Find a number that divides into both 6 and 9.",
        evidenceId: "same-size",
        walkthrough: "3 divides into both. 6 ÷ 3 is 2 and 9 ÷ 3 is 3, so 6/9 = 2/3.",
        explanation: "6/9 simplifies to 2/3.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  compare: {
    question: "Who ate more pizza: Sam, who ate 3/8, or Priya, who ate 1/2?",
    hints: {
      nudge: "It is hard to compare eighths with halves. Can you write 1/2 in eighths?",
      evidenceId: "compare-intro",
      evidenceNote: "The reading “Ways to compare fractions” has a method for fractions with different bottom numbers.",
      walkthrough: "1/2 is the same as 4/8. Now both are in eighths: Sam ate 3/8 and Priya ate 4/8. Priya ate more.",
    },
    explanation: [
      "Priya ate more. 1/2 = 4/8, and 4/8 is more than 3/8.",
      "To compare fractions, make the bottom numbers the same, then compare the top numbers.",
    ],
    evidence: {
      "compare-intro": {
        kind: "reading",
        blocks: [
          { type: "h", text: "Same bottom number" },
          { type: "p", text: "If the bottom numbers match, the pieces are the same size. Just compare the tops. 5/7 is more than 2/7." },
          { type: "h", text: "Same top number" },
          { type: "p", text: "If the top numbers match, look at the bottoms. A bigger bottom number means smaller pieces. So 1/3 is more than 1/5." },
          { type: "h", text: "Different numbers" },
          { type: "p", text: "Turn both fractions into equivalent fractions with the same bottom number. Then compare the tops." },
          { type: "tip", title: "Key idea", text: "Make the bottom numbers the same, then compare the top numbers." },
        ],
      },
      "bigger-smaller": {
        kind: "practice",
        intro: "Put these fractions in order, smallest first. Just for practice.",
        order: { prompt: "Drag or move each fraction so the smallest is at the top.", items: ["1/8", "1/4", "1/2", "3/4"] },
      },
    },
    quiz: [
      {
        id: "fc-1",
        type: "choice",
        prompt: "Which is bigger, 3/8 or 1/2?",
        options: [
          { id: "a", text: "3/8", why: "1/2 is 4/8, which is more than 3/8." },
          { id: "b", text: "1/2" },
          { id: "c", text: "They are the same", why: "Write 1/2 in eighths and compare again." },
        ],
        correctId: "b",
        hint: "Write 1/2 as eighths.",
        evidenceId: "compare-intro",
        walkthrough: "1/2 = 4/8. Comparing 4/8 with 3/8, the tops are 4 and 3, so 1/2 is bigger.",
        explanation: "1/2 is bigger, because it equals 4/8.",
      },
      {
        id: "fc-2",
        type: "lineup",
        prompt: "Which statement is true?",
        options: [
          { id: "a", text: "1/5 is bigger than 1/3 because 5 is bigger than 3.", why: "A bigger bottom number means smaller pieces. 1/5 is smaller." },
          { id: "b", text: "1/3 is bigger than 1/5." },
          { id: "c", text: "You can only compare fractions with the same top number.", why: "Any two fractions can be compared, once you make the bottoms match." },
          { id: "d", text: "2/7 is bigger than 5/7.", why: "The bottoms match, so compare the tops: 5 is more than 2." },
        ],
        correctId: "b",
        hint: "Would you rather have a pizza cut into 3 slices or 5 slices, if you only get one slice?",
        evidenceId: "compare-intro",
        walkthrough: "With the same top number, fewer pieces means bigger pieces. Thirds are bigger than fifths, so 1/3 is bigger.",
        explanation: "1/3 is bigger than 1/5, because thirds are bigger pieces than fifths.",
      },
      {
        id: "fc-3",
        type: "choice",
        prompt: "Which list is in order from smallest to largest?",
        options: [
          { id: "a", text: "1/2, 1/4, 3/4", why: "1/4 is smaller than 1/2, so it comes first." },
          { id: "b", text: "1/4, 1/2, 3/4" },
          { id: "c", text: "3/4, 1/2, 1/4", why: "That is largest to smallest." },
        ],
        correctId: "b",
        hint: "Write them all as quarters.",
        evidenceId: "compare-intro",
        walkthrough: "As quarters: 1/4, 2/4 and 3/4. So the order is 1/4, 1/2, 3/4.",
        explanation: "1/4, 1/2, 3/4 is smallest to largest.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  add: {
    question: "You eat 2/8 of a pizza and your friend eats 3/8. How much did you eat together?",
    hints: {
      nudge: "Both fractions are in eighths. Does the size of each slice change when you add them?",
      evidenceId: "add-intro",
      evidenceNote: "The reading “Adding fractions step by step” shows what happens to the top and the bottom numbers.",
      walkthrough: "The slices are all eighths, so the bottom stays 8. Add the tops: 2 + 3 = 5. Together you ate 5/8.",
    },
    explanation: [
      "Together you ate 5/8 of the pizza.",
      "When the bottom numbers are the same, add the top numbers and keep the bottom number.",
    ],
    evidence: {
      "add-intro": {
        kind: "reading",
        blocks: [
          { type: "p", text: "Adding fractions is like counting slices. If you have 2 eighths and add 3 more eighths, you have 5 eighths." },
          { type: "tip", title: "Key idea", text: "Same bottom number: add the tops, keep the bottom. 2/8 + 3/8 = 5/8." },
          { type: "h", text: "The common mistake" },
          { type: "p", text: "Some people add the bottoms too: 2/8 + 3/8 = 5/16. That cannot be right, because 5/16 is less than either share of pizza! The size of the slices does not change when you put them together." },
          { type: "p", text: "If the answer is something like 4/8, you can simplify it to 1/2." },
        ],
      },
      "add-practice": {
        kind: "practice",
        intro: "Two sums to try. Just for practice.",
        questions: [
          {
            id: "fa-p1",
            type: "choice",
            prompt: "1/5 + 2/5 = ?",
            options: [
              { id: "a", text: "3/5" },
              { id: "b", text: "3/10", why: "Keep the bottom number the same. The pieces are still fifths." },
              { id: "c", text: "2/5", why: "Add the top numbers: 1 + 2." },
            ],
            correctId: "a",
            hint: "Add the tops. Keep the bottom.",
            walkthrough: "1 + 2 = 3, and the bottom stays 5. The answer is 3/5.",
            explanation: "1/5 + 2/5 = 3/5.",
          },
          {
            id: "fa-p2",
            type: "choice",
            prompt: "3/4 + 1/4 = ?",
            options: [
              { id: "a", text: "4/8", why: "Do not add the bottoms. The pieces are still quarters." },
              { id: "b", text: "4/4, which is 1 whole" },
              { id: "c", text: "3/4", why: "Add the top numbers: 3 + 1." },
            ],
            correctId: "b",
            hint: "What do four quarters make?",
            walkthrough: "3 + 1 = 4, so 4/4. Four quarters make one whole.",
            explanation: "3/4 + 1/4 = 4/4, which is one whole.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "fa-1",
        type: "choice",
        prompt: "2/8 + 3/8 = ?",
        options: [
          { id: "a", text: "5/16", why: "Keep the bottom number. Eighths added to eighths are still eighths." },
          { id: "b", text: "5/8" },
          { id: "c", text: "6/8", why: "Add the tops, do not multiply them." },
          { id: "d", text: "1/8", why: "That is the difference, not the sum." },
        ],
        correctId: "b",
        hint: "The bottom numbers are the same. What do you do with the tops?",
        evidenceId: "add-intro",
        walkthrough: "Add the tops: 2 + 3 = 5. Keep the bottom: 8. The answer is 5/8.",
        explanation: "2/8 + 3/8 = 5/8.",
      },
      {
        id: "fa-2",
        type: "lineup",
        prompt: "Four students added 1/3 + 1/3. Who is right?",
        options: [
          { id: "a", text: "2/6", why: "Adding the bottoms makes the pieces smaller. 2/6 is the same as 1/3, so nothing was added." },
          { id: "b", text: "1/3", why: "Something was added, so the answer must be bigger than 1/3." },
          { id: "c", text: "2/3" },
          { id: "d", text: "1/9", why: "That would be multiplying, and multiplying the bottoms too." },
        ],
        correctId: "c",
        hint: "One third plus one more third makes how many thirds?",
        evidenceId: "add-intro",
        walkthrough: "1 third plus 1 third is 2 thirds, written 2/3. The bottom stays 3.",
        explanation: "1/3 + 1/3 = 2/3.",
      },
      {
        id: "fa-3",
        type: "choice",
        prompt: "2/6 + 1/6, simplified, is:",
        options: [
          { id: "a", text: "1/2" },
          { id: "b", text: "3/12", why: "Keep the bottom number as 6." },
          { id: "c", text: "1/3", why: "2/6 + 1/6 is 3/6, which is a half." },
        ],
        correctId: "a",
        hint: "Add first, then simplify.",
        evidenceId: "add-intro",
        walkthrough: "2/6 + 1/6 = 3/6. Divide the top and bottom by 3 and you get 1/2.",
        explanation: "3/6 simplifies to 1/2.",
      },
    ],
  },
};
