import type { ClueContent } from "@/lib/types";

/** The tutorial case. Short on purpose, and it teaches how a clue works. */
export const SOCK_LESSONS: Record<string, ClueContent> = {
  trail: {
    question: "Where do lost socks go?",
    hints: {
      nudge: "This is a Hint 1. It gives you a small nudge. Think about the places in a house where small things get stuck.",
      evidenceId: "sock-read",
      evidenceNote: "This is a Hint 2. It points you to the right evidence. Open “Where socks go” and look at the list.",
      walkthrough:
        "This is a Hint 3. It walks through the thinking. The reading lists three hiding spots: behind machines, inside duvet covers and in coat pockets. So lost socks are hiding, not vanishing.",
    },
    explanation: [
      "Most lost socks never leave the house. They hide behind machines, inside duvet covers and in coat pockets.",
      "You just used all three hints. You can ask for help whenever you need it. Hints are there to help you learn.",
    ],
    evidence: {
      "sock-read": {
        kind: "reading",
        blocks: [
          {
            type: "p",
            text: "This is a clue, and this page is evidence. Read it carefully and look for the facts that answer the question at the top.",
          },
          {
            type: "p",
            text: "Here is a fact. When a sock goes missing, it has usually not gone far. It is hiding.",
          },
          { type: "h", text: "Favourite hiding spots" },
          {
            type: "list",
            items: [
              "Behind or under the washing machine or dryer.",
              "Inside a duvet cover, stuck in the corner.",
              "In the pocket of a coat or a pair of jeans.",
            ],
          },
          {
            type: "tip",
            title: "Try it",
            text: "Press the Collect evidence button below. That pins this page to your Evidence Board, so you can find it later.",
          },
        ],
      },
      "sock-practice": {
        kind: "practice",
        intro: "Two practice questions. Nothing here counts toward your score, so just try them.",
        questions: [
          {
            id: "sp-1",
            type: "choice",
            prompt: "Which of these is a favourite hiding spot for a lost sock?",
            options: [
              { id: "a", text: "Inside a duvet cover" },
              { id: "b", text: "At the top of a tree", why: "Not many socks climb trees." },
              { id: "c", text: "Inside the fridge", why: "It could happen, but it is not a favourite spot." },
            ],
            correctId: "a",
            hint: "Look at the list in the reading.",
            evidenceId: "sock-read",
            walkthrough: "The reading lists three spots. Only one of the options is on that list.",
            explanation: "Duvet covers are one of the top hiding spots.",
          },
          {
            id: "sp-2",
            type: "choice",
            prompt: "When a sock goes missing, where is it usually?",
            options: [
              { id: "a", text: "Still in the house" },
              { id: "b", text: "Far away in another country", why: "Socks almost never go that far." },
            ],
            correctId: "a",
            hint: "The second paragraph of the reading has the answer.",
            walkthrough: "The reading says a missing sock has usually not gone far. It is hiding.",
            explanation: "Missing socks are usually still in the house, hiding.",
          },
        ],
      },
    },
    quiz: [
      {
        id: "sock-1",
        type: "choice",
        prompt: "Where do lost socks most often hide?",
        options: [
          { id: "a", text: "Behind the washing machine" },
          { id: "b", text: "At the bottom of the sea", why: "That is a long way for a sock to go." },
          { id: "c", text: "On the moon", why: "No socks have made it to the moon yet." },
        ],
        correctId: "a",
        hint: "It is on the list in the reading.",
        evidenceId: "sock-read",
        walkthrough: "The reading lists three hiding places. Behind the washing machine is the first one.",
        explanation: "Behind or under the washing machine is a top spot for lost socks.",
      },
      {
        id: "sock-2",
        type: "lineup",
        prompt: "This is a suspect lineup. Each card shows an idea, and only one is correct. The others are common mistakes. Which idea is correct?",
        options: [
          { id: "a", text: "The washing machine eats socks.", why: "Not quite. Machines don't eat socks, but socks can slip behind them." },
          { id: "b", text: "Socks get stuck in duvet covers or fall behind machines." },
          { id: "c", text: "Socks melt in the dryer.", why: "Not quite. Socks don't melt. They can get stuck to other clothes, though." },
        ],
        correctId: "b",
        hint: "Which idea matches the list in the reading?",
        evidenceId: "sock-read",
        walkthrough: "The reading says socks hide behind machines, in duvet covers and in pockets. Only one idea says that.",
        explanation: "Socks hide in duvet covers and behind machines. They don't get eaten or melted.",
      },
    ],
  },
};
