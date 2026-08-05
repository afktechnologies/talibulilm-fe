export interface QnaCategoryList {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QnaCategoryResponse {
  message: string;
  code: number;
  data: QnaCategoryList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/** Mirrors the backend's public (submitter-PII-stripped) answer shape. */
export interface QnaAnswer {
  id: number;
  answer: string;
  shortAnswer?: string;
  answeredBy?: string;
  references?: string[];
}

/**
 * Mirrors talibulilm-be `src/qna/entities/question.entity.ts`'s public
 * (sanitized) shape — the public `/qna` endpoints only ever return
 * `status: "ANSWERED"` questions, with `answer` joined and submitter PII
 * stripped server-side.
 */
export interface QnaList {
  id: number;
  question: string;
  source: "USER" | "ADMIN";
  similar?: number[];
  viewCount: number;
  category?: QnaCategoryList;
  categoryId?: number;
  answer?: QnaAnswer;
  createdAt: string;
  updatedAt: string;
}

export interface QnaResponse {
  message: string;
  code: number;
  data: QnaList[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/** Submitted through `/api/backend/qna/submit` (authenticated) — name/email come from the session, not this payload. */
export interface SubmitQuestionPayload {
  question: string;
  gender?: string;
  country?: string;
  categoryId?: number;
}

export interface QnaSettings {
  id: number;
  dailySubmissionLimit: number;
  updatedAt: string;
}

export interface QnaSettingsResponse {
  message: string;
  code: number;
  data: QnaSettings;
}
