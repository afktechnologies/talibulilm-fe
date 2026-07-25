import { apiClient } from "../client";
import {
  SupplicationCategoryListResponse,
  SupplicationCategoryResponse,
  SupplicationListResponse,
  SupplicationResponse,
  SupplicationTranslationResponse,
  SupplicationTransliterationResponse,
} from "@/types/supplication";

export const supplicationApi = {
  // Categories
  getCategories: (page: number = 1, limit: number = 0) =>
    apiClient
      .get(`supplications/categories?page=${page}&limit=${limit}`)
      .json<SupplicationCategoryListResponse>(),

  getCategoryBySlug: (slug: string) =>
    apiClient
      .get(`supplications/categories/slug/${slug}`)
      .json<SupplicationCategoryResponse>(),

  // Supplications (duas)
  getAll: (page: number = 1, limit: number = 0) =>
    apiClient.get(`supplications?page=${page}&limit=${limit}`).json<SupplicationListResponse>(),

  getBySlug: (slug: string) =>
    apiClient.get(`supplications/slug/${slug}`).json<SupplicationResponse>(),

  getByCategory: (categoryId: number, page: number = 1, limit: number = 0) =>
    apiClient
      .get(`supplications/category/${categoryId}?page=${page}&limit=${limit}`)
      .json<SupplicationListResponse>(),

  // Per-supplication translation / transliteration text
  getTranslations: (supplicationId: number) =>
    apiClient
      .get(`supplication-translation/supplication/${supplicationId}`)
      .json<SupplicationTranslationResponse>(),

  getTransliterations: (supplicationId: number) =>
    apiClient
      .get(`supplication-transliteration/supplication/${supplicationId}`)
      .json<SupplicationTransliterationResponse>(),
};
