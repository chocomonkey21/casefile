/** Tabs on the case file page. Kept out of the client component so the server page can read it. */
export const CASE_TABS = ["brief", "clues", "evidence", "notes"] as const;
export type CaseTab = (typeof CASE_TABS)[number];
