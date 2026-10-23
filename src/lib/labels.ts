/*
  The single source of truth for the names students see. Every page, button, heading, tooltip, aria-label and
  page title takes these words from here (most of them through lib/copy.ts), so a name is changed in one place.

  Why plain names: students must understand every label without knowing the detective theme. The theme stays
  in the look of the site and in the word "Case"; everything a student has to act on uses a plain word.
  Copy rules: plain words, no em dashes, no short forms of labels, no points or "unlocked" language.

  Internal names in the code and in the progress saved on a device (clue, evidence, verdict) are unchanged, so
  nobody loses their saved progress. Only what people see, the routes and the file names use the words below.
*/

export const L = {
  home: "Home",
  cases: "Cases",
  case: "Case",
  studyBoard: "Study board",
  notes: "Notes",
  progress: "My progress",
  profile: "My profile",
  videos: "Videos",
  hints: "Hints",
  quiz: "Quiz",
  startQuiz: "Start the quiz",
  studyMaterial: "Study material",
  saveToBoard: "Save to study board",
  savedToBoard: "Saved to study board",
  lesson: "Lesson",
  lessons: "Lessons",
  overview: "Overview",
  finalTest: "Final test",
  startFinalTest: "Start the final test",
  caseComplete: "Case complete",
  timeToRevise: "Time to revise",
  setUpProfile: "Set up your profile",
  pickRightIdea: "Pick the right idea",
  practiceCase: "Practice case",
  howItWorks: "How CaseFile works",
  forFamilies: "For families",
  logOut: "Log out",
  daysThisWeek: "Days studied this week",
  /** Levels replace the old rank names */
  level: (n: number) => `Level ${n}`,
  /** "Lesson 2 of 5" */
  lessonOf: (n: number, total: number) => `Lesson ${n} of ${total}`,
  lessonN: (n: number) => `Lesson ${n}`,
} as const;

/** Every student page lives at one of these addresses. Old addresses redirect here (see next.config.ts). */
export const ROUTES = {
  home: "/home",
  cases: "/cases",
  studyBoard: "/study-board",
  notes: "/notes",
  progress: "/progress",
  profile: "/profile",
  videos: "/videos",
  families: "/families",
  parent: "/parent",
  join: "/join",
  privacy: "/privacy",
  subjects: "/subjects",
  caseFile: (caseId: string) => `/cases/${caseId}`,
  lesson: (caseId: string, lessonId: string) => `/cases/${caseId}/lessons/${lessonId}`,
  quiz: (caseId: string, lessonId: string) => `/cases/${caseId}/quiz/${lessonId}`,
  finalTest: (caseId: string) => `/cases/${caseId}/final-test`,
} as const;
