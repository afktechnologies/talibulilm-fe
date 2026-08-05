"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import bgImage from "../../../../public/Images/Quran/tafsirHeroBg.png";
import { primary_font } from "@/app/font/font";
import { useAllSurahs, useAyahBySurahSlugAndAyahNumber } from "@/services/hooks/quran";
import { useTafsirsByAyahId } from "@/services/hooks/tafsir";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import Rectangle from "@/components/skeleton/rectangle";
import TafsirPageheader from "./header";
import TafsirDetails from "./tafsirDetails";

const DEFAULT_SURAH_SLUG = "al-fatihah";
const DEFAULT_AYAH_NUMBER = 1;

interface TafsirMainPageProps {
  initialSurahSlug: string | null;
  initialAyahNumber: number | null;
  initialLanguage: string | null;
}

const TafsirMainPage: React.FC<TafsirMainPageProps> = ({
  initialSurahSlug,
  initialAyahNumber,
  initialLanguage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [surahSlug, setSurahSlug] = useState(initialSurahSlug || DEFAULT_SURAH_SLUG);
  const [ayahNumber, setAyahNumber] = useState(initialAyahNumber || DEFAULT_AYAH_NUMBER);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(initialLanguage);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const hasAppliedInitialSelection = useRef(false);

  const { data: allSurahs, isLoading: isSurahsLoading } = useAllSurahs();
  const currentSurah = useMemo(
    () => allSurahs?.find((surah) => surah.slug === surahSlug),
    [allSurahs, surahSlug]
  );

  const {
    data: ayah,
    isLoading: isAyahLoading,
    isError: isAyahError,
  } = useAyahBySurahSlugAndAyahNumber(surahSlug, ayahNumber);

  const {
    data: tafsirs,
    isLoading: isTafsirsLoading,
  } = useTafsirsByAyahId(ayah?.id);

  // Whenever the resolved ayah's tafsir list changes, (re)pick a valid
  // book+language combo — honoring the URL's initial `language` only once,
  // afterward defaulting to the first available entry so the pickers never
  // land on a dead (book, language) pair.
  useEffect(() => {
    if (!tafsirs || tafsirs.length === 0) {
      setSelectedBookId(null);
      setSelectedLanguage(null);
      return;
    }

    if (!hasAppliedInitialSelection.current) {
      hasAppliedInitialSelection.current = true;
      const matched = initialLanguage
        ? tafsirs.find((t) => t.languageCode === initialLanguage)
        : undefined;
      const chosen = matched ?? tafsirs[0];
      setSelectedBookId(chosen.bookId);
      setSelectedLanguage(chosen.languageCode);
      return;
    }

    const stillValid = tafsirs.some(
      (t) => t.bookId === selectedBookId && t.languageCode === selectedLanguage
    );
    if (!stillValid) {
      setSelectedBookId(tafsirs[0].bookId);
      setSelectedLanguage(tafsirs[0].languageCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tafsirs]);

  // Sync surah/ayah/language to the URL so the page is shareable/bookmarkable.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("surahSlug", surahSlug);
    params.set("ayahNumber", String(ayahNumber));
    if (selectedLanguage) {
      params.set("language", selectedLanguage);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surahSlug, ayahNumber, selectedLanguage]);

  const availableBooks = useMemo(() => {
    if (!tafsirs) return [];
    const seen = new Map<number, (typeof tafsirs)[number]["book"]>();
    tafsirs.forEach((t) => seen.set(t.bookId, t.book));
    return [...seen.values()];
  }, [tafsirs]);

  const availableLanguages = useMemo(() => {
    if (!tafsirs) return [];
    return [...new Set(tafsirs.map((t) => t.languageCode))];
  }, [tafsirs]);

  const activeTafsir = useMemo(
    () =>
      tafsirs?.find(
        (t) => t.bookId === selectedBookId && t.languageCode === selectedLanguage
      ) ?? null,
    [tafsirs, selectedBookId, selectedLanguage]
  );

  function handleSurahChange(slug: string) {
    setSurahSlug(slug);
    setAyahNumber(1);
    hasAppliedInitialSelection.current = true; // don't re-apply the original URL language on navigation
  }

  function handleAyahChange(nextAyahNumber: number) {
    setAyahNumber(nextAyahNumber);
  }

  function handleBookChange(bookId: number) {
    setSelectedBookId(bookId);
    const languagesForBook = (tafsirs ?? [])
      .filter((t) => t.bookId === bookId)
      .map((t) => t.languageCode);
    if (selectedLanguage && !languagesForBook.includes(selectedLanguage)) {
      setSelectedLanguage(languagesForBook[0] ?? null);
    }
  }

  function handleLanguageChange(language: string) {
    setSelectedLanguage(language);
    const booksForLanguage = (tafsirs ?? [])
      .filter((t) => t.languageCode === language)
      .map((t) => t.bookId);
    if (selectedBookId !== null && !booksForLanguage.includes(selectedBookId)) {
      setSelectedBookId(booksForLanguage[0] ?? null);
    }
  }

  const isLoading = isSurahsLoading || isAyahLoading;

  return (
    <div className="flex justify-center overflow-x-hidden pt-6 px-4">
      <div className="flex flex-col justify-center w-full max-w-[1200px] rounded-2xl border border-[#C2CDD3] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
        <div className="relative w-full h-[16rem] max-md:h-[12rem]">
          <Image src={bgImage} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 pb-6 text-center px-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#f4e8c7] bg-black/30 border border-[#DBB346]/50 rounded-full px-4 py-1.5">
              Explanation &amp; Commentary
            </span>
            <h1 className={`${primary_font.className} text-white text-[2rem] max-md:text-[1.5rem]`}>Tafsir</h1>
          </div>
        </div>

        {isAyahError ? (
          <div className="p-8">
            <FallbackError />
          </div>
        ) : isLoading ? (
          <div className="p-8 flex flex-col gap-4">
            <Rectangle width="100%" height="60px" borderRadius="16px" />
            <Rectangle width="100%" height="200px" borderRadius="10px" />
          </div>
        ) : (
          <div className="pb-12">
            <TafsirPageheader
              surahs={allSurahs ?? []}
              currentSurah={currentSurah}
              ayahNumber={ayahNumber}
              verseCount={currentSurah?.verseCount ?? 1}
              languageOptions={availableLanguages}
              selectedLanguage={selectedLanguage}
              bookOptions={availableBooks}
              selectedBookId={selectedBookId}
              onSurahChange={handleSurahChange}
              onAyahChange={handleAyahChange}
              onLanguageChange={handleLanguageChange}
              onBookChange={handleBookChange}
            />
            <TafsirDetails
              ayah={ayah ?? null}
              tafsir={activeTafsir}
              isTafsirsLoading={isTafsirsLoading}
              ayahNumber={ayahNumber}
              verseCount={currentSurah?.verseCount ?? 1}
              onAyahChange={handleAyahChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TafsirMainPage;
