import { apiClient } from "../client";
import { QnaCategoryResponse, QnaResponse } from "@/types/qna";

export const qnaApi = {
  // All Qna Categories
  getCategories: (page: number = 1, limit: number = 0) =>
    apiClient.get(`qna-categories?page=${page}&limit=${limit}`).json<QnaCategoryResponse>(),

  // All Qna entries
  getAll: (page: number = 1, limit: number = 0) =>
    apiClient.get(`qna?page=${page}&limit=${limit}`).json<QnaResponse>(),

  getByCategory: (categoryId: number, page: number = 1, limit: number = 0) =>
    apiClient.get(`qna/category/${categoryId}?page=${page}&limit=${limit}`).json<QnaResponse>(),
};
