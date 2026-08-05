"use client";
import Link from "next/link";
import { MdTune } from "react-icons/md";
import { RiTranslateAi2 } from "react-icons/ri";
import { HiArrowLeft } from "react-icons/hi2";
import SearchbarGO from "@/components/common/SearchBar/searchbarGo";
import Breadcrumb from "@/components/common/Breadcrumb/breadcrumb";
import { roboto } from "@/app/font/font";

interface IndexCardProps {
  collectionName?: string;
  bookName?: string;
  bookSlug?: string;
  startingChapter?: number;
  endingChapter?: number;
  chapterCount?: number;
}

const IndexCard = ({
  collectionName,
  bookName,
  bookSlug,
  startingChapter,
  endingChapter,
  chapterCount,
}: IndexCardProps) => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex w-full max-w-[1440px] justify-center">
        <div className="w-full max-w-[1100px] flex flex-col gap-5 mb-4 py-7 px-10 bg-white rounded-2xl border border-[#C2CDD3] shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-md:px-6 max-md:py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              {bookSlug && (
                <Link
                  href={`/hadith/${bookSlug}`}
                  className={`${roboto.className} flex-shrink-0 flex items-center gap-1.5 text-sm text-[#7D887A] hover:text-[#DBB346] transition-colors duration-150`}
                >
                  <HiArrowLeft className="w-4 h-4" />
                  {bookName || "Back"}
                </Link>
              )}
              <Breadcrumb collectionName={collectionName} />
            </div>

            {(chapterCount || (startingChapter && endingChapter)) && (
              <span
                className={`${roboto.className} flex-shrink-0 text-xs font-semibold tracking-[0.05em] uppercase text-[#8A6D59] bg-[#f4e8c7]/70 border border-[#DBB346]/40 rounded-full px-4 py-1.5`}
              >
                {chapterCount ? `${chapterCount} Chapters` : `Ch. ${startingChapter}–${endingChapter}`}
              </span>
            )}
          </div>

          <div className="flex items-center w-full gap-3">
            <SearchbarGO />
            <button
              type="button"
              aria-label="Filter"
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-[#C2CDD3] text-[#7D887A] transition-colors duration-150 hover:border-[#DBB346] hover:text-[#DBB346] max-[500px]:w-9 max-[500px]:h-9"
            >
              <MdTune className="w-5 h-5 max-[500px]:w-4 max-[500px]:h-4" />
            </button>
            <button
              type="button"
              aria-label="Translate"
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-[#C2CDD3] text-[#7D887A] transition-colors duration-150 hover:border-[#DBB346] hover:text-[#DBB346] max-[500px]:w-9 max-[500px]:h-9"
            >
              <RiTranslateAi2 className="w-5 h-5 max-[500px]:w-4 max-[500px]:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexCard;
