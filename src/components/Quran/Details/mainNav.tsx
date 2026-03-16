"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import styles from "./mainNav.module.css";
import { JuzList } from "@/types/surah";
import { useJuz } from "@/services/hooks/quran";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import SideDrawerQuran from "./sideDrawer";

interface MainNavProps {
  juzData: JuzList;
  isJuzPending: boolean
  selectedMode: "reading" | "translation";
  setSelectedMode: React.Dispatch<
    React.SetStateAction<"reading" | "translation">
  >;
  initialVerse: string | null;
  onVerseSelect: (verse: string) => void;
}

const MainNav: React.FC<MainNavProps> = ({
  juzData,
  isJuzPending,
  selectedMode,
  setSelectedMode,
  initialVerse,
  onVerseSelect,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: juzList, isLoading: juzLoading } = useJuz();
  const [chapterOpen, setChapterOpen] = useState(false);
  const [verseOpen, setVerseOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setChapterOpen(false);
        setVerseOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("mode", selectedMode);
    router.push(`/quran/${juzData.surahInfo.slug}?${newParams.toString()}`);
  }, [selectedMode, juzData, router, searchParams]);

  const handleChapterChange = (surahNumber: number) => {
    const selectedSurah = juzList?.find(
      (juz: JuzList) => juz.surahNumber === surahNumber
    );
    if (selectedSurah) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("mode", selectedMode);
      newParams.delete("verse");
      router.push(
        `/quran/${selectedSurah.surahInfo.slug}?${newParams.toString()}`
      );
    }
    setChapterOpen(false);
  };

  const handleModeChange = (mode: "reading" | "translation") => {
    setSelectedMode(mode);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("mode", mode);
    router.push(`/quran/${juzData.surahInfo.slug}?${newParams.toString()}`);
  };

  const activeVerse = parseInt(searchParams.get("verse") || initialVerse || "1");

  return (
    <div className={styles.mainNav} ref={dropdownRef}>
      <div className={`${styles.selectContainer} ${primary_font.className}`}>
        <div className={styles.navbar}>
        <div className={styles.selectWrapper}>
          <p className={styles.JuzName}>{juzData.juzNameAr}</p>
        </div>
        <hr />

        {/* Custom Chapter Dropdown */}
        <div
          className={styles.customDropdown}
          onClick={() => {
            setChapterOpen((prev) => !prev);
            setVerseOpen(false); // ✅ close other
          }}
        >
          <div className={`${roboto.className} ${styles.dropdownHeader}`}>
             {juzData.surahInfo.nameEn}
            <MdOutlineKeyboardArrowDown className={styles.selectIcon} />
          </div>
          {chapterOpen && (
            <ul className={styles.dropdownList}>
              {juzLoading ? (
                <li className={styles.disabled}>Loading Surahs...</li>
              ) : (
                Array.from(
                  new Map(
                    juzList?.map((juz: JuzList) => [juz.surahNumber, juz])
                  ).values()
                ).map((surah) => (
                  <li
                    key={surah.surahNumber}
                    onClick={() => handleChapterChange(surah.surahNumber)}
                    className={`${roboto.className} ${styles.dropdownItemChapter} ${
                      surah.surahNumber === juzData.surahNumber
                        ? styles.activeItem
                        : ""
                    }`}
                  >
                    {surah.surahNumber}. {surah.surahInfo.nameEn}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
        <hr />

        {/* Custom Verse Dropdown */}
        <div
          className={styles.customDropdown}
          onClick={() => {
            setVerseOpen((prev) => !prev);
            setChapterOpen(false); // ✅ close other
          }}
        >
          <div className={`${roboto.className} ${styles.dropdownHeader}`}>
            Verse {activeVerse}
            <MdOutlineKeyboardArrowDown className={styles.selectIcon} />
          </div>
          {verseOpen && (
            <ul className={styles.dropdownList}>
              {Array.from(
                { length: juzData.surahInfo.verseCount },
                (_, i) => i + 1
              ).map((verseNumber) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("mode", selectedMode);
                newParams.set("verse", verseNumber.toString());

                return (
                  <Link
                  key={verseNumber}
                    href={`/quran/${juzData.surahInfo.slug}?${newParams.toString()}`}
                    onClick={() => {onVerseSelect(verseNumber.toString()) ;setVerseOpen(false)}}
                  >
                  <li
                    
                    className={`${roboto.className} ${styles.dropdownItem} ${
                      verseNumber === activeVerse ? styles.activeItem : ""
                    }`}
                  >
                      Verse {verseNumber}
                  </li>
                    </Link>
                );
              })}
            </ul>
          )}
        </div>
        <hr />
        </div>

        <div>
          <ul className={`${styles.selectionTab} ${primary_font.className}`}>
            <li
              className={selectedMode === "translation" ? styles.active : ""}
              onClick={() => handleModeChange("translation")}
            >
              Translation
            </li>
            <li
              className={selectedMode === "reading" ? styles.active : ""}
              onClick={() => handleModeChange("reading")}
            >
              Reading
            </li>
          </ul>
        </div>
        <div className={styles.menu_btn}>
          <button className={styles.hamburger_menu} onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
        {isOpen && <SideDrawerQuran setIsOpen={setIsOpen} isOpen={isOpen} juzData={juzData} isJuzPending={isJuzPending} juzList={juzList} selectedMode={selectedMode} setSelectedMode={setSelectedMode} initialVerse={initialVerse}/>}
      </div>
    </div>
  );
};

export default MainNav;
