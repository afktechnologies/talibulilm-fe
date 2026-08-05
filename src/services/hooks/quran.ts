import { useQuery } from "@tanstack/react-query";
import { quranApi } from "../api/endpoints/quran";

export const useSurahs = (options = {}) => {
  return useQuery({
    queryKey: ['surahs'],
    queryFn: () => quranApi.getSurahs(),
    select: (response) => response.data,
    ...options,
  });
};

// Full, unpaginated Surah list (114 rows) — used by navigational chapter
// pickers (reading-page dropdown, mobile side drawer) that need every
// Surah available at once, unlike the paginated home-page browse tab.
export const useAllSurahs = (options = {}) => {
  return useQuery({
    queryKey: ["surahs", "all"],
    queryFn: () => quranApi.getSurahsPaged(1, 0),
    select: (response) => response.data,
    ...options,
  });
};

export const useJuz = (options = {}) => {
  return useQuery({
    queryKey: ["juz"],
    queryFn: () => quranApi.getSurahByJuz(),
    select: (response) => response.data,
    ...options,
  });
};

export const useJuzBySurahSlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ["juz", slug],
    queryFn: () => quranApi.getJuzBySurahSlug(slug),
    select: (response) => response.data,
    ...options,
  });
}

export const usePage = (options = {}) => {
  return useQuery({
    queryKey: ["page"],
    queryFn: () => quranApi.getSurahByPage(),
    select: (response) => response.data,
    ...options,
  });
};


export const useAyahRandom = (options = {}) => {
  return useQuery({
    queryKey: ["ayahs"],
    queryFn: () => quranApi.getAyahRandom(),
    select: (response) => response.data,
    ...options,
  });
};

export const useAyahOfTheDay = (options = {}) => {
  // Keying on today's date means a new calendar day (or a fresh page load
  // after midnight) naturally requests fresh data instead of serving a
  // stale cached "yesterday" response for the rest of the session.
  const today = new Date().toISOString().slice(0, 10);
  return useQuery({
    queryKey: ["ayahs", "daily", today],
    queryFn: () => quranApi.getAyahOfTheDay(),
    select: (response) => response.data,
    ...options,
  });
};

// export const useAyahBySlugForVerse = (options ={})=>{
//   return useQuery({
//      queryKey: ["ayahs"],
//     queryFn: () => quranApi.getAyahRandom(),
//     select: (response) => response.data,
//     ...options,
//   })
// }

export const useAyahBySlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ["ayahs", slug],
    queryFn: () => quranApi.getAyahBySlug(slug),
    select: (response) => response.data,
    ...options,
  });
};


export const useAyahBySurahSlugAndAyahNumber = (
  surahSlug: string | undefined,
  ayahNumber: number | undefined,
  options = {}
) => {
  return useQuery({
    queryKey: ["ayahs", surahSlug, ayahNumber],
    queryFn: () => quranApi.getAyahBySurahSlugAndAyahNumber(surahSlug!, ayahNumber!),
    select: (response) => response.data,
    enabled: !!surahSlug && !!ayahNumber,
    ...options,
  });
};

export const useAyahTranslationBySlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ["ayahs", slug],
    queryFn: () => quranApi.getAyahTranslationBySlug(slug),
    select: (response) => response.data,
    ...options,
  });
};
