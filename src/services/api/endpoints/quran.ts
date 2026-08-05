import { apiClient } from "../client";
import {
  AyahResponse,
  AyahSingleResponse,
  AyahWithTranslationResponse,
  JuzResponse,
  PageResponse,
  RandomAyahResponse,
  SurahResponse,
} from "@/types/surah";

export const quranApi = {
  getSurahs: () => apiClient.get("surahs").json<SurahResponse>(),

  // Explicit page/limit variant for infinite-scroll — kept separate from
  // `getSurahs` above so existing no-arg callers (defaulting to the
  // backend's page=1/limit=10) are unaffected.
  getSurahsPaged: (page: number, limit: number = 10, search?: string) =>
    apiClient
      .get(`surahs?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}`)
      .json<SurahResponse>(),

  getSurahByJuz: () => apiClient.get("juz").json<JuzResponse>(),

  getJuzPaged: (page: number, limit: number = 10, search?: string) =>
    apiClient
      .get(`juz?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}`)
      .json<JuzResponse>(),

  getJuzBySurahSlug: (slug: string) =>
    apiClient.get(`juz/surah/slug/${slug}`).json<JuzResponse>(),

  getSurahByPage: (page: number = 1, limit: number = 0) =>
    apiClient.get(`page?page=${page}&limit=${limit}`).json<PageResponse>(),

  // Explicit page/limit variant for infinite-scroll — kept separate from
  // `getSurahByPage` above (whose default limit=0 loads everything at
  // once) so existing no-arg callers are unaffected.
  getPagesPaged: (page: number, limit: number = 10, search?: string) =>
    apiClient
      .get(`page?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}`)
      .json<PageResponse>(),

  getAyahRandom: () => apiClient.get("ayahs/random").json<RandomAyahResponse>(),

  // Returns the admin-scheduled ayah for today's date, or a random one if
  // nothing is scheduled — the backend handles the fallback.
  getAyahOfTheDay: () => apiClient.get("ayahs/daily").json<RandomAyahResponse>(),

  getAyahBySlug: (slug: string) =>
    apiClient.get(`/ayahs/surah/slug/${slug}`).json<AyahResponse>(),

  // Resolves a single ayah (with juzNumber/pageNumber, no translations) by
  // surah slug + ayah number — used by the Tafsir page to resolve the ayah
  // the user navigated to before fetching its tafsir entries.
  getAyahBySurahSlugAndAyahNumber: (surahSlug: string, ayahNumber: number) =>
    apiClient
      .get(`ayahs/surah/slug/${surahSlug}/ayah/${ayahNumber}`)
      .json<AyahSingleResponse>(),

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
