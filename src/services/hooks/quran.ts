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


export const useAyahTranslationBySlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ["ayahs", slug],
    queryFn: () => quranApi.getAyahTranslationBySlug(slug),
    select: (response) => response.data,
    ...options,
  });
};
