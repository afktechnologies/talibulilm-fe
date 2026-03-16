"use client";
import Image from "next/image";
import styles from "./reading.module.css";
import { AyahList, AyahListWithTranslation, JuzList } from "@/types/surah";
import makkahImage from "../../../../public/Images/makkah1.png";
import madinaImage from "../../../../public/Images/madina2.png";
import { lateef, primary_font } from "@/app/font/font";
import { useEffect, useRef } from "react";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import WaqfComponent from "@/components/common/Waqf/waqf";
import { FaDiamond } from "react-icons/fa6";

interface ReadingProps {
  juzData: JuzList | null | undefined;
  isVisible: boolean;
  initialVerse: string | null;
  ayahData: AyahListWithTranslation[] | undefined | null;
  isAyahPending: boolean;
  isAyahError: Error | null;
}

const Reading: React.FC<ReadingProps> = ({
  juzData,
  isVisible,
  initialVerse,
  ayahData,
  isAyahPending,
  isAyahError,
}) => {
  const origin = juzData?.surahInfo.revelationType.toLowerCase();
  const ayahRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (initialVerse && ayahData) {
      const verseNumber = parseInt(initialVerse);
      const ayahIndex = ayahData.findIndex(
        (ayah) => ayah.ayahNumber === verseNumber
      );
      if (ayahIndex !== -1 && ayahRefs.current[ayahIndex]) {
        ayahRefs.current[ayahIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [initialVerse, ayahData]);

  if (!isVisible) return null;

  if (isAyahPending) {
    return <div className={styles.wrapper}></div>;
  }

  if (isAyahError) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <FallbackError />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <h3 className={primary_font.className}>
              {juzData?.surahInfo.nameEnMeaning}
              {origin && (
                <Image
                  src={origin === "makkah" ? makkahImage : madinaImage}
                  alt={origin}
                  width={32}
                  height={32}
                  className={styles.originImg}
                />
              )}
            </h3>
          </div>
          {juzData?.surahNumber !== 1 && juzData?.surahNumber !== 9 && (
            <h1>بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</h1>
          )}
        </div>

        {ayahData && (
          <>
            {Object.values(
              ayahData.reduce(
                (acc: { [key: number]: AyahList[] }, ayah: AyahList) => {
                  if (!acc[ayah.pageNumber]) {
                    acc[ayah.pageNumber] = [];
                  }
                  acc[ayah.pageNumber].push(ayah);
                  return acc;
                },
                {}
              )
            ).map((pageAyahs, pageIndex) => (
              <div key={pageIndex} className={styles.pageContainer}>
                <div className={styles.main}>
                  {pageAyahs.map((ayah, index) => (
                    <span
                      key={`${ayah.surahNumber}-${ayah.ayahNumber}`}
                      className={styles.ayahWrapper}
                      ref={(el) => {
                        ayahRefs.current[
                          ayahData.findIndex(
                            (a) => a.ayahNumber === ayah.ayahNumber
                          )
                        ] = el;
                      }}
                    >
                      <span
                        className={`${styles.ayahText} ${lateef.className}`}
                      >
                        {ayah.arabicText}
                      </span>
                      <WaqfComponent ayah={ayah.ayahNumber} />
                    </span>
                  ))}
                </div>

                {/* Page number + horizontal line */}
                <div className={styles.controls}>
                  <span className={styles.pageNumber}>
                    {pageAyahs[pageAyahs.length - 1].pageNumber}
                  </span>

                  <div className={styles.diamondWrapper}>
                    <span className={styles.diamond}></span>
                    <span className={styles.line}></span>
                    <span className={styles.diamond}></span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Reading;
