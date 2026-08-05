"use client";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import { JuzList, SurahList } from "@/types/surah";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

interface SideDrawerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  juzData: JuzList;
  allSurahs: SurahList[] | undefined;
  surahsLoading: boolean;
  selectedMode: "reading" | "translation";
  setSelectedMode: React.Dispatch<
    React.SetStateAction<"reading" | "translation">
  >;
  initialVerse: string | null;
}

const sd = {
  overlay:
    "fixed inset-0 w-full h-screen bg-black/50 z-[1099] [animation:fadeIn_0.2s_ease-out]",
  drawer:
    "fixed top-0 right-0 w-[85%] max-w-[380px] h-screen bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.15)] z-[1100] flex flex-col md:hidden [animation:slideInRight_0.3s_ease-out]",
  nav: "flex-1 flex flex-col h-full overflow-hidden",
  headers: "flex items-center justify-between gap-2 py-4 px-5 bg-[#DBB346]",
  closeBtn:
    "flex items-center justify-center w-8 h-8 rounded-full text-[#7a604f] bg-white/40 hover:bg-white/70 transition-colors duration-150",
  headerTitle: "flex flex-col items-center flex-1 text-[#7a604f]",
  headersH4: "font-bold text-[1.15rem]",
  headerRef: "text-xs opacity-80",
  modeTabs: "flex items-center gap-2 p-3 bg-[#f4e8c7]/50",
  modeTab:
    "flex-1 text-center py-2 rounded-full text-sm font-semibold text-[#7A604F] transition-colors duration-150",
  modeTabActive: "flex-1 text-center py-2 rounded-full text-sm font-semibold bg-[#7A604F] text-white",
  menuList: "flex flex-col flex-1 overflow-y-auto p-4 gap-1",
  juzName: "font-bold text-lg text-[#5C6357] text-center mb-3",
  sectionLabel: "text-xs font-semibold tracking-[0.1em] uppercase text-[#8A6D59] mb-2",
  customDropdown: "flex flex-col w-full cursor-pointer mb-4",
  dropdownHeader:
    "flex justify-between items-center font-bold gap-2 py-3 px-4 border border-[#C2CDD3] rounded-2xl text-[#5C6357]",
  chevron: "w-5 h-5 transition-transform duration-200 text-[#8A6D59]",
  chevronOpen: "rotate-180",
  dropdownList:
    "max-h-[260px] overflow-y-auto mt-2 rounded-2xl flex flex-col gap-2 p-1 [scrollbar-width:thin]",
  dropdownItem:
    "border border-[#C2CDD3] bg-white rounded-xl py-2.5 px-3 text-sm cursor-pointer transition-colors duration-150 hover:border-[#DBB346] hover:bg-[#f4e8c7]/40",
  activeItem: "bg-[#f4e8c7] border-[#DBB346] font-bold text-[#7a604f]",
  disabled: "py-2 px-3 text-[#888] text-sm",
};

const SideDrawerQuran: React.FC<SideDrawerProps> = ({
  setIsOpen,
  juzData,
  allSurahs,
  surahsLoading,
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

  // ✅ lock body scroll while drawer is open
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

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
    setIsOpen(false);
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
    <div className={sd.overlay} onClick={() => setIsOpen(false)}>
      <div className={sd.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={sd.nav}>
          <div className={sd.headers}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className={sd.closeBtn}
            >
              <IoMdClose className="w-5 h-5" />
            </button>
            <div className={sd.headerTitle}>
              <h4 className={`${primary_font.className} ${sd.headersH4}`}>
                سورة {juzData.surahInfo.nameAr}
              </h4>
              <p className={`${roboto.className} ${sd.headerRef}`}>
                {juzData.surahNumber}:{activeVerse}
              </p>
            </div>
            <div className="w-8" />
          </div>

          <div className={`${sd.modeTabs} ${primary_font.className}`}>
            <button
              type="button"
              className={selectedMode === "translation" ? sd.modeTabActive : sd.modeTab}
              onClick={() => handleModeChange("translation")}
            >
              Translation
            </button>
            <button
              type="button"
              className={selectedMode === "reading" ? sd.modeTabActive : sd.modeTab}
              onClick={() => handleModeChange("reading")}
            >
              Reading
            </button>
          </div>

          <div className={sd.menuList} ref={dropdownRef}>
            <p className={sd.juzName}>{juzData.juzNameAr}</p>

            {/* Surah Dropdown */}
            <div className={sd.customDropdown}>
              <div
                className={`${roboto.className} ${sd.dropdownHeader}`}
                onClick={() => {
                  setChapterOpen((prev) => !prev);
                  setVerseOpen(false);
                }}
              >
                {juzData.surahInfo.nameEn}
                <MdOutlineKeyboardArrowDown
                  className={`${sd.chevron} ${chapterOpen ? sd.chevronOpen : ""}`}
                />
              </div>
              {chapterOpen && (
                <ul className={sd.dropdownList}>
                  {surahsLoading ? (
                    <li className={sd.disabled}>Loading Surahs...</li>
                  ) : (
                    allSurahs?.map((surah) => (
                      <li
                        key={surah.surahNumber}
                        onClick={() => handleChapterChange(surah.surahNumber)}
                        className={`${roboto.className} ${sd.dropdownItem} ${
                          surah.surahNumber === juzData.surahNumber
                            ? sd.activeItem
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

            {/* Verse Dropdown */}
            <div className={sd.customDropdown}>
              <div
                className={`${roboto.className} ${sd.dropdownHeader}`}
                onClick={() => {
                  setVerseOpen((prev) => !prev);
                  setChapterOpen(false);
                }}
              >
                Verse {activeVerse}
                <MdOutlineKeyboardArrowDown
                  className={`${sd.chevron} ${verseOpen ? sd.chevronOpen : ""}`}
                />
              </div>
              {verseOpen && (
                <ul className={sd.dropdownList}>
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
                        className={`${roboto.className} ${sd.dropdownItem} ${
                          verseNumber === activeVerse ? sd.activeItem : ""
                        }`}
                      >
                        <Link
                          href={`/quran/${juzData.surahInfo.slug}?${newParams.toString()}`}
                          onClick={() => {
                            setVerseOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          Verse {verseNumber}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawerQuran;
