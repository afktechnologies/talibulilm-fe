"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
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

const mn = {
  mainNav: "bg-[#DBB346] rounded-t-[20px] p-2 flex justify-center",
  selectContainer: "flex w-full justify-between items-center text-center",
  selectContainerHr: "w-px h-[40px] bg-black mx-[0.2rem] border-none max-md:flex max-md:justify-center max-md:items-center max-md:w-[80%] max-md:h-px max-md:bg-[#d9d9d9] max-md:m-4 max-md:border-none",
  navbar: "flex w-full justify-between items-center text-center max-md:hidden",
  selectWrapper: "relative w-[25%]",
  selectIcon: "flex justify-center items-center w-6 h-6 max-[915px]:w-[1.2rem] max-[915px]:h-[1.2rem]",
  juzName: "flex justify-center text-[1.8rem] font-bold text-center text-[#7a604f] max-[915px]:text-[1.5rem]",
  customDropdown: "w-[30%] relative cursor-pointer select-none max-[1200px]:w-[35%] max-[915px]:w-[35%]",
  dropdownHeader: "p-[0.6rem] flex items-center justify-center gap-2 text-[1.2rem] text-[#7a604f] font-bold max-[915px]:py-0 max-[915px]:px-[0.8rem] max-[915px]:text-[0.9rem]",
  dropdownList: "w-full absolute top-full left-0 right-0 bg-white border-2 border-[rgba(0,0,0,0.55)] rounded-[10px] max-h-[340px] overflow-y-auto overflow-x-hidden z-10 shadow-[0_4px_8px_rgba(0,0,0,0.1)] [scroll-behavior:smooth] [scrollbar-width:thin] [scrollbar-color:#c69e30_#f1f1f1] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[#c69e30] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb:hover]:bg-[#a88320] max-[915px]:max-h-[300px]",
  dropdownItem: "py-[0.6rem] px-0 transition-colors duration-200 ease-in-out cursor-pointer border-2 border-[rgba(198,158,48,0.8)] bg-white rounded-[10px] text-black mx-4 my-2 text-[1.2rem] hover:bg-[rgba(198,158,48,0.2)] hover:border-[rgba(198,158,48,0.8)] max-[915px]:py-[0.3rem] max-[915px]:px-[0.1rem] max-[915px]:m-2 max-[915px]:text-[0.8rem] max-[740px]:py-[0.3rem] max-[740px]:px-[0.1rem] max-[740px]:m-2 max-[740px]:text-[0.6rem]",
  dropdownItemChapter: "py-[0.6rem] px-0 transition-colors duration-200 ease-in-out cursor-pointer border-2 border-[rgba(198,158,48,0.8)] bg-white rounded-[10px] text-black mx-4 my-2 text-[1.1rem] hover:bg-[rgba(198,158,48,0.2)] hover:border-[rgba(198,158,48,0.8)] max-[915px]:py-[0.3rem] max-[915px]:px-[0.1rem] max-[915px]:m-2 max-[915px]:text-[0.9rem]",
  disabled: "py-[0.6rem] px-4 text-[gray] cursor-not-allowed",
  selectionTab: "flex justify-center items-center gap-8 py-[0.4rem] px-[0.6rem] mx-8 bg-white rounded-[25px] text-[#7A604F] max-[915px]:gap-4 max-[915px]:py-[0.2rem] max-[915px]:px-[0.4rem] max-[915px]:mx-4 max-md:ml-8 max-[500px]:gap-2 max-[500px]:py-[0.3rem] max-[500px]:px-2 max-[500px]:ml-4 max-[450px]:ml-2",
  selectionTabLi: "text-[1rem] font-bold py-[4px] px-[24px] cursor-pointer rounded-[20px] transition-[background-color,color] duration-300 ease-in-out max-[915px]:text-[0.9rem] max-[915px]:px-4 max-[500px]:text-[0.8rem] max-[500px]:px-2",
  active: "bg-[#7A604F] text-white",
  activeItem: "bg-[#e8d8ac] border-2 border-[rgba(198,158,48,0.8)] font-bold text-[#7a604f]",
  menuBtn: "hidden max-[768px]:flex justify-end items-center w-full",
  hamburgerMenu: "w-6 h-6 bg-transparent border-none flex flex-col justify-around mr-4 cursor-pointer max-[600px]:w-[1.3rem] max-[600px]:h-[1.3rem] max-[450px]:w-[1.2rem] max-[450px]:h-[1.2rem]",
  hamburgerSpan: "block w-full whitespace-nowrap h-[3px] bg-[#7a604f]",
};

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
    <div className={mn.mainNav} ref={dropdownRef}>
      <div className={`${mn.selectContainer} ${primary_font.className}`}>
        <div className={mn.navbar}>
        <div className={mn.selectWrapper}>
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
            <MdOutlineKeyboardArrowDown className={mn.selectIcon} />
          </div>
          {chapterOpen && (
            <ul className={mn.dropdownList}>
              {juzLoading ? (
                <li className={mn.disabled}>Loading Surahs...</li>
              ) : (
                Array.from(
                  new Map(
                    juzList?.map((juz: JuzList) => [juz.surahNumber, juz])
                  ).values()
                ).map((surah) => (
                  <li
                    key={surah.surahNumber}
                    onClick={() => handleChapterChange(surah.surahNumber)}
                    className={`${roboto.className} ${mn.dropdownItemChapter} ${
                      surah.surahNumber === juzData.surahNumber
                        ? mn.activeItem
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
            <MdOutlineKeyboardArrowDown className={mn.selectIcon} />
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
            <li
              className={`${mn.selectionTabLi} ${selectedMode === "translation" ? mn.active : ""}`}
              onClick={() => handleModeChange("translation")}
            >
              Translation
            </li>
            <li
              className={`${mn.selectionTabLi} ${selectedMode === "reading" ? mn.active : ""}`}
              onClick={() => handleModeChange("reading")}
            >
              Reading
            </li>
          </ul>
        </div>
        <div className={mn.menuBtn}>
          <button className={mn.hamburgerMenu} onClick={() => setIsOpen(!isOpen)}>
            <span className={mn.hamburgerSpan} />
            <span className={mn.hamburgerSpan} />
            <span className={mn.hamburgerSpan} />
          </button>
        </div>
        {isOpen && <SideDrawerQuran setIsOpen={setIsOpen} isOpen={isOpen} juzData={juzData} isJuzPending={isJuzPending} juzList={juzList} selectedMode={selectedMode} setSelectedMode={setSelectedMode} initialVerse={initialVerse}/>}
      </div>
    </div>
  );
};

export default MainNav;
