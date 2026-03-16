"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./mainNav.module.css";
import { lateef } from "@/app/font/font";
import Translation from "./translation";
import MainNav from "./mainNav";
import { useAyahTranslationBySlug, useJuzBySurahSlug } from "@/services/hooks/quran";
import { AyahListWithTranslation, JuzList } from "@/types/surah";
import Rectangle from "@/components/skeleton/rectangle";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import Reading from "./reading";

interface DetailsPageProps {
  surahSlug: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ surahSlug }) => {
  const { data: juzData, isPending: isJuzPending, error: isJuzError } = useJuzBySurahSlug(surahSlug);
  const { data: isAyah, isPending: isAyahPending, error: isAyahError } = useAyahTranslationBySlug(surahSlug);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialMode = useMemo(() => {
    return searchParams.get("mode") === "reading" ? "reading" : "translation";
  }, [searchParams]);
  const [selectedMode, setSelectedMode] = useState<"reading" | "translation">(initialMode);
  const initialVerse = useMemo(() => {
    return searchParams.get("verse");
  }, [searchParams]);
  const [juz, setJuz] = useState<JuzList | null | undefined>(null);
  const [ayahData, setAyahData] = useState<AyahListWithTranslation[] | undefined | null>(null);

  useEffect(() => {
    if (juzData) {
      setJuz(
        juzData?.find((juz: JuzList) => juz.surahInfo?.slug === surahSlug)
      );
    }
  }, [juzData, surahSlug]);

  useEffect(() => {
    if (isAyah) {
      setAyahData(isAyah);
    }
  }, [isAyah]);

  // Handle verse selection from dropdown
  const handleVerseSelect = (verse: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("verse", verse);
    params.set("mode", selectedMode);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Update URL when mode changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", selectedMode);
    if (initialVerse) {
      params.set("verse", initialVerse);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedMode, initialVerse, pathname, router, searchParams]);

  if (isJuzPending) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.despBar}>
            <h2 className={`${styles.title} ${lateef.className}`}></h2>
            <div>
              <p className={styles.JuzNumber}></p>
            </div>
          </div>
        </div>

        <div className={styles.tabContent}>
          <Rectangle width="100%" height="1000px" borderRadius="10px" />
        </div>
      </div>
    );
  }

  if (isJuzError && !juz) {
    return (
      <div className={styles.wrapper}>
        <FallbackError />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {juz && (
        <div className={styles.container}>
          <div className={styles.NavContainer}>
            <MainNav
              juzData={juz}
              isJuzPending={isJuzPending}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              initialVerse={initialVerse}
              onVerseSelect={handleVerseSelect}
            />
          </div>
          <div className={styles.tabContent}>
            <Reading
              juzData={juz}
              isVisible={selectedMode === "reading"}
              initialVerse={initialVerse}
              ayahData={ayahData}
              isAyahPending={isAyahPending}
              isAyahError={isAyahError}
            />
            <Translation
              juzData={juz}
              isVisible={selectedMode === "translation"}
              initialVerse={initialVerse}
              ayahData={ayahData}
              isAyahPending={isAyahPending}
              isAyahError={isAyahError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;