"use client";
import Link from "next/link";
import styles from "./sideDrawer.module.css";
import { primary_font, roboto } from "@/app/font/font";
import { JuzList } from "@/types/surah";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface SideDrawerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  juzData: JuzList;
  isJuzPending: boolean;
  juzList: JuzList[] | undefined;
  selectedMode: "reading" | "translation";
  setSelectedMode: React.Dispatch<
    React.SetStateAction<"reading" | "translation">
  >;
  initialVerse: string | null;
}

const SideDrawerQuran: React.FC<SideDrawerProps> = ({
  setIsOpen,
  isOpen,
  juzData,
  isJuzPending,
  juzList,
  selectedMode,
  setSelectedMode,
  initialVerse,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chapterOpen, setChapterOpen] = useState(false);
  const [verseOpen, setVerseOpen] = useState(false);

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

  const activeVerse = parseInt(
    searchParams.get("verse") || initialVerse || "1"
  );

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.nav}>
          <div className={styles.headers}>
            <div onClick={() => setIsOpen(false)} className={styles.close}><span><IoMdClose /></span></div>
            <h4 className={primary_font.className}>
              سورة {juzData.surahInfo.nameAr}
            </h4>
            <p className={primary_font.className}>
              {juzData.surahNumber}:{activeVerse}
            </p>
          </div>

          <div className={styles.menuList} ref={dropdownRef}>
            <div className={styles.selectWrappers}>
              <p className={styles.juzName}>{juzData.juzNameAr}</p>
            </div>
            <hr />

            {/* Surah Dropdown */}
            <div
              className={styles.customDropdown}
              onClick={() => {
                setChapterOpen((prev) => !prev);
                setVerseOpen(false);
              }}
            >
              <div className={`${roboto.className} ${styles.dropdownHeader}`}>
                {juzData.surahInfo.nameEn}
                <MdOutlineKeyboardArrowDown className={styles.selectIcon} />
              </div>
              {chapterOpen && (
                <ul className={styles.dropdownList}>
                  {isJuzPending ? (
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
                        className={`${roboto.className} ${styles.dropdownItem} ${
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

            {/* Verse Dropdown */}
            <div
              className={styles.customDropdown}
              onClick={() => {
                setVerseOpen((prev) => !prev);
                setChapterOpen(false);
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
                      <li
                        key={verseNumber}
                        className={`${roboto.className} ${styles.dropdownItem} ${
                          verseNumber === activeVerse ? styles.activeItem : ""
                        }`}
                      >
                        <Link
                          href={`/quran/${juzData.surahInfo.slug}?${newParams.toString()}`}
                          onClick={() => setVerseOpen(false)}
                        >
                          Verse {verseNumber}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawerQuran;
