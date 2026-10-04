/** Form shapes and limits shared by the editor form (browser) and the server checks. No server-only imports here. */

export type VideoFormValues = {
  title: string;
  description: string;
  subjectId: string;
  caseId: string;
  clueId: string;
  videoUrl: string;
  thumbnailUrl: string;
  captionsUrl: string;
  transcript: string;
  order: string;
  status: string;
};

export type FormErrors = Partial<Record<keyof VideoFormValues, string>>;

export const FIELD_LIMITS = { title: 120, description: 600, transcript: 20000 } as const;
