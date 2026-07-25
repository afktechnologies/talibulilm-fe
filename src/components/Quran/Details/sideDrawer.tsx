"use client";
import Link from "next/link";
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

const sd = {
  overlay: "fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] opacity-100 visible transition-all duration-300 ease-in-out z-[1099]",
  drawer: "fixed top-0 right-0 w-[80%] max-w-[400px] h-screen bg-white border-l border-[#7D887A] transition-[right] duration-300 ease-in-out z-[1100] flex flex-col md:hidden",
  nav: "flex-1 flex flex-col h-full overflow-hidden",
  headers: "py-[0.8rem] px-4 bg-[#f4e8c7] text-[#7a604f]",
  headersH4: "font-bold text-[1.2rem]",
  juzName: "font-bold text-[1.2rem] text-black",
  menuList: "flex flex-col items-center flex-1 overflow-y-auto p-4",
  customDropdown: "flex flex-col justify-center items-center w-full cursor-pointer mb-2",
  dropdownHeader: "flex justify-around items-center font-bold gap-4",
  dropdownList: "max-h-[300px] w-[90%] overflow-y-auto mt-2 rounded-[0.3rem]",
  dropdownItem: "border border-[rgba(198,158,48,0.8)] bg-white rounded-[10px] p-2 my-4 mx-2 cursor-pointer hover:bg-[#f9f9f9] max-[450px]:text-[0.9rem] max-[450px]:m-2 max-[335px]:text-[0.8rem]",
  activeItem: "bg-[#f4e8c7] font-bold",
  disabled: "p-2 text-[#888]",
  close: "flex justify-end",
  closeSpan: "flex justify-center items-center w-5 h-5",
};

const SideDrawerQuran: React.FC<SideDrawerProps> = ({
  setIsOpen,
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
      className={sd.overlay}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={sd.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={sd.nav}>
          <div className={sd.headers}>
            <div onClick={() => setIsOpen(false)} className={sd.close}><span className={sd.closeSpan}><IoMdClose className="w-full h-full" /></span></div>
            <h4 className={`${primary_font.className} ${sd.headersH4}`}>
              سورة {juzData.surahInfo.nameAr}
            </h4>
            <p className={primary_font.className}>
              {juzData.surahNumber}:{activeVerse}
            </p>
          </div>

          <div className={sd.menuList} ref={dropdownRef}>
            <div>
              <p className={sd.juzName}>{juzData.juzNameAr}</p>
            </div>
            <hr />

            {/* Surah Dropdown */}
            <div
              className={sd.customDropdown}
              onClick={() => {
                setChapterOpen((prev) => !prev);
                setVerseOpen(false);
              }}
            >
              <div className={`${roboto.className} ${sd.dropdownHeader}`}>
                {juzData.surahInfo.nameEn}
                <MdOutlineKeyboardArrowDown />
              </div>
              {chapterOpen && (
                <ul className={sd.dropdownList}>
                  {isJuzPending ? (
                    <li className={sd.disabled}>Loading Surahs...</li>
                  ) : (
                    Array.from(
                      new Map(
                        juzList?.map((juz: JuzList) => [juz.surahNumber, juz])
                      ).values()
                    ).map((surah) => (
                      <li
                        key={surah.surahNumber}
                        onClick={() => handleChapterChange(surah.surahNumber)}
                        className={`${roboto.className} ${sd.dropdownItem} ${
                          surah.surahNumber === juzData.surahNumber
                            ? sd.activeItem
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
              className={sd.customDropdown}
              onClick={() => {
                setVerseOpen((prev) => !prev);
                setChapterOpen(false);
              }}
            >
              <div className={`${roboto.className} ${sd.dropdownHeader}`}>
                Verse {activeVerse}
                <MdOutlineKeyboardArrowDown />
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
