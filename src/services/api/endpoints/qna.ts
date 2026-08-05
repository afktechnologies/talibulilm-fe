import { apiClient } from "../client";
import { postJson } from "../backendProxyClient";
import {
  QnaCategoryResponse,
  QnaResponse,
  QnaSettingsResponse,
  SubmitQuestionPayload,
} from "@/types/qna";

export const qnaApi = {
  // Active Q&A categories (public content reads go straight to the backend).
  getCategories: (activeOnly = true, page: number = 1, limit: number = 0) =>
    apiClient
      .get(`qna-categories?page=${page}&limit=${limit}&activeOnly=${activeOnly}`)
      .json<QnaCategoryResponse>(),

  // All answered Q&A entries (admin-curated + answered user submissions, unified).
  getAll: (page: number = 1, limit: number = 0) =>
    apiClient.get(`qna?page=${page}&limit=${limit}`).json<QnaResponse>(),

  getByCategory: (categoryId: number, page: number = 1, limit: number = 0) =>
    apiClient.get(`qna/category/${categoryId}?page=${page}&limit=${limit}`).json<QnaResponse>(),

  // The current daily submission cap — public, configurable from the admin panel.
  getSettings: () => apiClient.get("qna-settings").json<QnaSettingsResponse>(),

  // Authenticated submission — goes through this app's own session-aware
  // proxy (see backendProxyClient), never straight to the external backend,
  // since it needs the logged-in user's access token.
  submitQuestion: (payload: SubmitQuestionPayload) =>
    postJson<{ message: string; data: unknown }>("/api/backend/qna/submit", payload),
};
