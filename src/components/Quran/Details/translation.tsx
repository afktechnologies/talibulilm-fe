import React, { useEffect, useRef } from "react";
import styles from "./translation.module.css";
import { lateef, primary_font, roboto } from "@/app/font/font";
import { IoBookOutline, IoPlayOutline } from "react-icons/io5";
import { MdOutlineBookmark, MdOutlineBookmarkAdd } from "react-icons/md";
import { LiaRedoAltSolid } from "react-icons/lia";
import { SlOptions } from "react-icons/sl";
import makkahImage from "../../../../public/Images/makkah1.png";
import madinaImage from "../../../../public/Images/madina2.png";
import Image from "next/image";
import WaqfComponent from "@/components/common/Waqf/waqf";
import { AyahListWithTranslation, JuzList } from "@/types/surah";
import Rectangle from "@/components/skeleton/rectangle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addQuranLastRead } from "@/store/slice/quranLastReadSlice";
import {
  addQuranBookmark,
  removeQuranBookmark,
} from "@/store/slice/quranBookmarkSlice";

interface TranslationProps {
  juzData: JuzList | null | undefined;
  ayahData: AyahListWithTranslation[] | undefined | null;
  isVisible: boolean;
  initialVerse: string | null;
  isAyahPending: boolean;
  isAyahError: Error | null;
}

const Translation: React.FC<TranslationProps> = ({
  juzData,
  isVisible,
  initialVerse,
  ayahData,
  isAyahPending,
}) => {
  const origin = juzData?.surahInfo.revelationType.toLowerCase();
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.quranBookmark.items);

  // Scroll to initialVerse if provided
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

  // IntersectionObserver to track visible ayahs for "Last Read"
  useEffect(() => {
    if (!ayahData || !juzData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = ayahRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (index !== -1) {
              const ayah = ayahData[index];
              dispatch(
                addQuranLastRead({
                  surahNumber: juzData.surahNumber,
                  surahNameEn: juzData.surahInfo.nameEn,
                  surahNameAr: juzData.surahInfo.nameAr,
                  surahSlug: juzData.surahInfo.slug,
                  ayahNumber: ayah.ayahNumber,
                })
              );
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    ayahRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [ayahData, juzData, dispatch]);

  if (!isVisible) return null;

  if (isAyahPending) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
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
          {Array.from({ length: 3 }).map((_, index) => (
            <Rectangle
              key={index}
              width="90%"
              height="600px"
              borderRadius="10px"
              className={styles.main}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
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

        {ayahData &&
          ayahData.map((ayah, index) => {
            const isBookmarked = bookmarks.some((b: any) => b.id === ayah.id);

            const handleBookmarkToggle = () => {
              if (isBookmarked) {
                dispatch(removeQuranBookmark(ayah.id));
              } else {
                dispatch(addQuranBookmark(ayah));
              }
            };

            return (
              <div
                key={index}
                className={styles.main}
                ref={(el) => {
                  ayahRefs.current[index] = el;
                }}
              >
                <div className={styles.details}>
                  <p>
                    {ayah.surahNumber}
                    <span>:</span>
                    {ayah.ayahNumber}
                  </p>
                  <SlOptions />
                </div>
                <div className={styles.ayah}>
                  <div className={styles.arabic}>
                    <h4 className={lateef.className}>{ayah.arabicText}</h4>
                  </div>
                  <p className={roboto.className}>
                    {ayah.translations[0].translationText}
                  </p>
                </div>
                <div className={styles.buttons}>
                  <IoBookOutline />
                  <IoPlayOutline />
                  <div
                    onClick={handleBookmarkToggle}
                    style={{ cursor: "pointer" }}
                  >
                    {isBookmarked ? (
                      <MdOutlineBookmark />
                    ) : (
                      <MdOutlineBookmarkAdd />
                    )}
                  </div>
                  <LiaRedoAltSolid />
                </div>
                <div className={styles.diamondWrapper}>
                  <span className={styles.diamond}></span>
                  <span className={styles.line}></span>
                  <span className={styles.diamond}></span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Translation;
