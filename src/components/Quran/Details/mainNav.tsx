"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import { JuzList } from "@/types/surah";
import { useAllSurahs } from "@/services/hooks/quran";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import SideDrawerQuran from "./sideDrawer";

interface MainNavProps {
  juzData: JuzList;
  selectedMode: "reading" | "translation";
  setSelectedMode: React.Dispatch<
    React.SetStateAction<"reading" | "translation">
  >;
  initialVerse: string | null;
  onVerseSelect: (verse: string) => void;
}

const mn = {
  mainNav: "bg-gradient-to-b from-[#e2bd5b] to-[#DBB346] rounded-t-[20px] p-3 flex justify-center shadow-[0_2px_10px_rgba(0,0,0,0.12)]",
  selectContainer: "flex w-full justify-between items-center text-center",
  selectContainerHr: "w-px h-[40px] bg-black/20 mx-[0.2rem] border-none max-md:flex max-md:justify-center max-md:items-center max-md:w-[80%] max-md:h-px max-md:bg-[#d9d9d9] max-md:m-4 max-md:border-none",
  navbar: "flex w-full justify-between items-center text-center max-md:hidden",
  selectWrapper: "relative w-[25%] flex flex-col items-center gap-0.5",
  selectLabel: "text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-[#7a604f]/60",
  selectIcon: "flex justify-center items-center w-6 h-6 transition-transform duration-200 max-[915px]:w-[1.2rem] max-[915px]:h-[1.2rem]",
  iconOpen: "rotate-180",
  juzName: "flex justify-center text-[1.8rem] font-bold text-center text-[#7a604f] max-[915px]:text-[1.5rem]",
  customDropdown: "w-[30%] relative cursor-pointer select-none max-[1200px]:w-[35%] max-[915px]:w-[35%]",
  dropdownHeader: "p-[0.6rem] flex items-center justify-center gap-2 text-[1.2rem] text-[#7a604f] font-bold rounded-full transition-colors duration-150 hover:bg-black/5 max-[915px]:py-0 max-[915px]:px-[0.8rem] max-[915px]:text-[0.9rem]",
  dropdownList: "w-full absolute top-full left-0 right-0 mt-2 bg-white border border-[#C2CDD3] rounded-2xl max-h-[340px] overflow-y-auto overflow-x-hidden z-10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] p-2 flex flex-col gap-1.5 [scroll-behavior:smooth] [scrollbar-width:thin] [scrollbar-color:#c69e30_#f1f1f1] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[#c69e30] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb:hover]:bg-[#a88320] max-[915px]:max-h-[300px]",
  dropdownItem: "py-2.5 px-3 transition-colors duration-150 cursor-pointer border border-[#C2CDD3] bg-white rounded-xl text-black text-[1rem] hover:bg-[#f4e8c7]/50 hover:border-[#DBB346] max-[915px]:py-2 max-[915px]:px-2 max-[915px]:text-[0.8rem] max-[740px]:text-[0.75rem]",
  dropdownItemChapter: "py-2.5 px-3 transition-colors duration-150 cursor-pointer border border-[#C2CDD3] bg-white rounded-xl text-black text-[0.95rem] hover:bg-[#f4e8c7]/50 hover:border-[#DBB346] max-[915px]:py-2 max-[915px]:px-2 max-[915px]:text-[0.85rem]",
  disabled: "py-2 px-3 text-[gray] cursor-not-allowed",
  selectionTab: "flex justify-center items-center gap-2 py-[0.4rem] px-[0.6rem] mx-8 bg-white rounded-[25px] text-[#7A604F] shadow-[0_2px_8px_rgba(0,0,0,0.08)] max-[915px]:gap-1 max-[915px]:py-[0.2rem] max-[915px]:px-[0.4rem] max-[915px]:mx-4 max-md:ml-8 max-[500px]:gap-1 max-[500px]:py-[0.3rem] max-[500px]:px-2 max-[500px]:ml-4 max-[450px]:ml-2",
  selectionTabLi: "text-[1rem] font-bold py-[4px] px-[24px] cursor-pointer rounded-[20px] transition-colors duration-200 hover:bg-[#7A604F]/10 max-[915px]:text-[0.9rem] max-[915px]:px-4 max-[500px]:text-[0.8rem] max-[500px]:px-2",
  active: "bg-[#7A604F] text-white hover:bg-[#7A604F]",
  activeItem: "bg-[#f4e8c7] border-[#DBB346] font-bold text-[#7a604f]",
  menuBtn: "hidden max-[768px]:flex justify-end items-center w-full",
  hamburgerMenu: "flex items-center justify-center w-9 h-9 rounded-full bg-white/40 hover:bg-white/70 transition-colors duration-150 mr-2 cursor-pointer",
  hamburgerInner: "w-4 flex flex-col gap-[3px]",
  hamburgerSpan: "block w-full whitespace-nowrap h-[2px] bg-[#7a604f] rounded-full",
};

const MainNav: React.FC<MainNavProps> = ({
  juzData,
  selectedMode,
  setSelectedMode,
  initialVerse,
  onVerseSelect,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: allSurahs, isLoading: surahsLoading } = useAllSurahs();
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
    const selectedSurah = allSurahs?.find(
      (surah) => surah.surahNumber === surahNumber
    );
    if (selectedSurah) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("mode", selectedMode);
      newParams.delete("verse");
      router.push(
        `/quran/${selectedSurah.slug}?${newParams.toString()}`
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
    <div className={mn.mainNav} ref={dropdownRef}>
      <div className={`${mn.selectContainer} ${primary_font.className}`}>
        <div className={mn.navbar}>
        <div className={mn.selectWrapper}>
          <span className={`${roboto.className} ${mn.selectLabel}`}>Juz</span>
          <p className={mn.juzName}>{juzData.juzNameAr}</p>
        </div>
        <hr className={mn.selectContainerHr} />

        {/* Custom Chapter Dropdown */}
        <div
          className={mn.customDropdown}
          onClick={() => {
            setChapterOpen((prev) => !prev);
            setVerseOpen(false); // ✅ close other
          }}
        >
          <div className={`${roboto.className} ${mn.dropdownHeader}`}>
             {juzData.surahInfo.nameEn}
            <MdOutlineKeyboardArrowDown className={`${mn.selectIcon} ${chapterOpen ? mn.iconOpen : ""}`} />
          </div>
          {chapterOpen && (
            <ul className={mn.dropdownList}>
              {surahsLoading ? (
                <li className={mn.disabled}>Loading Surahs...</li>
              ) : (
                allSurahs?.map((surah) => (
                  <li
                    key={surah.surahNumber}
                    onClick={() => handleChapterChange(surah.surahNumber)}
                    className={`${roboto.className} ${mn.dropdownItemChapter} ${
                      surah.surahNumber === juzData.surahNumber
                        ? mn.activeItem
                        : ""
                    }`}
                  >
                    {surah.surahNumber}. {surah.nameEn}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
        <hr className={mn.selectContainerHr} />

        {/* Custom Verse Dropdown */}
        <div
          className={mn.customDropdown}
          onClick={() => {
            setVerseOpen((prev) => !prev);
            setChapterOpen(false); // ✅ close other
          }}
        >
          <div className={`${roboto.className} ${mn.dropdownHeader}`}>
            Verse {activeVerse}
            <MdOutlineKeyboardArrowDown className={`${mn.selectIcon} ${verseOpen ? mn.iconOpen : ""}`} />
          </div>
          {verseOpen && (
            <ul className={mn.dropdownList}>
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

                    className={`${roboto.className} ${mn.dropdownItem} ${
                      verseNumber === activeVerse ? mn.activeItem : ""
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
        <hr className={mn.selectContainerHr} />
        </div>

        <div>
          <ul className={`${mn.selectionTab} ${primary_font.className}`}>
            <li>
              <button
                type="button"
                className={`${mn.selectionTabLi} ${selectedMode === "translation" ? mn.active : ""}`}
                onClick={() => handleModeChange("translation")}
              >
                Translation
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${mn.selectionTabLi} ${selectedMode === "reading" ? mn.active : ""}`}
                onClick={() => handleModeChange("reading")}
              >
                Reading
              </button>
            </li>
          </ul>
        </div>
        <div className={mn.menuBtn}>
          <button
            type="button"
            aria-label="Open menu"
            className={mn.hamburgerMenu}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={mn.hamburgerInner}>
              <span className={mn.hamburgerSpan} />
              <span className={mn.hamburgerSpan} />
              <span className={mn.hamburgerSpan} />
            </span>
          </button>
        </div>
        {isOpen && (
          <SideDrawerQuran
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            juzData={juzData}
            allSurahs={allSurahs}
            surahsLoading={surahsLoading}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            initialVerse={initialVerse}
          />
        )}
      </div>
    </div>
  );
};

export default MainNav;
