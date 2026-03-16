import { apiClient } from "../client";
import {
  AyahResponse,
  AyahWithTranslationResponse,
  JuzResponse,
  PageResponse,
  RandomAyahResponse,
  SurahResponse,
} from "@/types/surah";

export const quranApi = {
  getSurahs: () => apiClient.get("surahs").json<SurahResponse>(),

  getSurahByJuz: () => apiClient.get("juz").json<JuzResponse>(),

  getJuzBySurahSlug: (slug: string) =>
    apiClient.get(`juz/surah/slug/${slug}`).json<JuzResponse>(),

  getSurahByPage: (page: number = 1, limit: number = 0) =>
    apiClient.get(`page?page=${page}&limit=${limit}`).json<PageResponse>(),

  getAyahRandom: () => apiClient.get("ayahs/random").json<RandomAyahResponse>(),

  getAyahBySlug: (slug: string) =>
    apiClient.get(`/ayahs/surah/slug/${slug}`).json<AyahResponse>(),

  getAyahTranslationBySlug: (
    slug: string,
    page: number | undefined = 1,
    limit: number | undefined = 0
  ) =>
    apiClient
      .get(`ayahs/surah/slug/${slug}/translation?page=${page}&limit=${limit}`)
      .json<AyahWithTranslationResponse>(),

  getAyahTranslationBySlugPaginated: (
    slug: string,
    page: number = 1,
    limit: number = 10
  ) =>
    apiClient
      .get(`ayahs/surah/slug/${slug}/translation?page=${page}&limit=${limit}`)
      .json<AyahWithTranslationResponse>(),
};
