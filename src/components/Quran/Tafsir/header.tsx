"use client";

import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { primary_font, roboto } from "@/app/font/font";
import { SurahList } from "@/types/surah";
import { BookList } from "@/types/book";

const th = {
  tab: "flex-1 flex justify-center items-center gap-1 py-2 px-3 text-sm font-medium text-[#5C6357] rounded-full transition-colors duration-150 hover:bg-[#f4e8c7]/60 hover:text-[#8A6D59] max-md:text-xs",
  tabActive:
    "flex-1 flex justify-center items-center gap-1 py-2 px-3 text-sm font-semibold text-[#7A604F] bg-[#F4E8C7] rounded-full max-md:text-xs",
  svg: "w-4 h-4 text-current transition-transform duration-200",
  svgOpen: "rotate-180",
  dropdownList:
    "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 max-h-64 overflow-y-auto bg-white border border-[#C2CDD3] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-1.5 flex flex-col gap-1 z-20 [scrollbar-width:thin]",
  dropdownItem:
    "text-left text-sm py-2 px-3 rounded-xl transition-colors duration-150 hover:bg-[#f4e8c7]/50",
  dropdownItemActive: "bg-[#f4e8c7] font-semibold text-[#7a604f]",
};

interface DropdownPillProps {
  label: string;
  active?: boolean;
  children: React.ReactNode;
}

const DropdownPill: React.FC<DropdownPillProps> = ({ label, active, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={active ? th.tabActive : th.tab}
      >
        {label}
        <MdOutlineKeyboardArrowDown className={`${th.svg} ${open ? th.svgOpen : ""}`} />
      </button>
      {open && (
        <ul className={`${roboto.className} ${th.dropdownList}`} onClick={() => setOpen(false)}>
          {children}
        </ul>
      )}
    </li>
  );
};

interface TafsirPageheaderProps {
  surahs: SurahList[];
  currentSurah: SurahList | undefined;
  ayahNumber: number;
  verseCount: number;
  languageOptions: string[];
  selectedLanguage: string | null;
  bookOptions: BookList[];
  selectedBookId: number | null;
  onSurahChange: (slug: string) => void;
  onAyahChange: (ayahNumber: number) => void;
  onLanguageChange: (language: string) => void;
  onBookChange: (bookId: number) => void;
}

const TafsirPageheader: React.FC<TafsirPageheaderProps> = ({
  surahs,
  currentSurah,
  ayahNumber,
  verseCount,
  languageOptions,
  selectedLanguage,
  bookOptions,
  selectedBookId,
  onSurahChange,
  onAyahChange,
  onLanguageChange,
  onBookChange,
}) => {
  const selectedBook = bookOptions.find((book) => book.id === selectedBookId);

  return (
    <div className="flex items-center justify-between gap-6 my-4 mx-8 max-md:flex-col max-md:items-stretch max-md:mx-4 max-md:gap-4">
      <div className="flex-shrink-0 flex flex-col justify-center text-[#488EAD] max-md:text-center">
        <h2 className={`${primary_font.className} text-lg`}>{currentSurah?.nameEn ?? "—"}</h2>
        <p className={`${roboto.className} text-sm text-[#7D887A]`}>Ayah {ayahNumber}</p>
      </div>

      <div className="flex-1 border border-[#C2CDD3] rounded-full py-1.5 px-2 max-md:rounded-2xl">
        <ul className={`${roboto.className} flex items-center gap-1`}>
          <DropdownPill label={currentSurah?.nameEn ?? "Surah"}>
            {surahs.map((surah) => (
              <li key={surah.surahNumber}>
                <button
                  type="button"
                  onClick={() => onSurahChange(surah.slug)}
                  className={`${th.dropdownItem} w-full ${
                    surah.slug === currentSurah?.slug ? th.dropdownItemActive : ""
                  }`}
                >
                  {surah.surahNumber}. {surah.nameEn}
                </button>
              </li>
            ))}
          </DropdownPill>

          <DropdownPill label={`Ayah ${ayahNumber}`}>
            {Array.from({ length: verseCount }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => onAyahChange(n)}
                  className={`${th.dropdownItem} w-full ${n === ayahNumber ? th.dropdownItemActive : ""}`}
                >
                  Ayah {n}
                </button>
              </li>
            ))}
          </DropdownPill>

          <DropdownPill label={selectedLanguage ? selectedLanguage.toUpperCase() : "Language"}>
            {languageOptions.length === 0 && (
              <li className="text-sm text-[#7D887A] px-3 py-2">No languages available</li>
            )}
            {languageOptions.map((language) => (
              <li key={language}>
                <button
                  type="button"
                  onClick={() => onLanguageChange(language)}
                  className={`${th.dropdownItem} w-full ${
                    language === selectedLanguage ? th.dropdownItemActive : ""
                  }`}
                >
                  {language.toUpperCase()}
                </button>
              </li>
            ))}
          </DropdownPill>

          <DropdownPill label={selectedBook?.nameEn ?? "Book"} active>
            {bookOptions.length === 0 && (
              <li className="text-sm text-[#7D887A] px-3 py-2">No tafsir books available</li>
            )}
            {bookOptions.map((book) => (
              <li key={book.id}>
                <button
                  type="button"
                  onClick={() => onBookChange(book.id)}
                  className={`${th.dropdownItem} w-full ${
                    book.id === selectedBookId ? th.dropdownItemActive : ""
                  }`}
                >
                  {book.nameEn}
                </button>
              </li>
            ))}
          </DropdownPill>
        </ul>
      </div>
    </div>
  );
};

export default TafsirPageheader;
