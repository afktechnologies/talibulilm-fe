"use client";

import { MdOutlineBookmark, MdOutlineBookmarkAdd } from "react-icons/md";
import { primary_font, roboto } from "@/app/font/font";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSupplicationBookmark, removeSupplicationBookmark } from "@/store/slice/supplicationBookmarkSlice";
import type { DuaEntry } from "@/components/Supplication/Dua/DuaCard";

type DuaCardProps = {
  data: DuaEntry;
};

const dc = {
  card: "flex flex-col flex-1 max-w-[560px] min-h-[340px] border border-[rgba(198,158,48,0.25)] rounded-2xl py-6 px-8 gap-4 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-[220ms] ease-in-out relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[linear-gradient(90deg,#c69e30_0%,#e8c55a_100%)] before:rounded-t-2xl hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(198,158,48,0.15)] max-[900px]:max-w-full max-[900px]:min-h-0 max-[480px]:p-5",
  title: "flex justify-between items-start text-[#c69e30]",
  titleH2: "w-[85%] text-[1.5rem] leading-[1.3] max-[480px]:text-[1.25rem]",
  bookmarkIcon: "w-[1.6rem] h-auto mt-[0.4rem] cursor-pointer transition-[color,transform] duration-[180ms] ease-in-out hover:text-[#003049] hover:scale-[1.15]",
  h3: "[direction:rtl] text-[1.6rem] font-normal leading-[1.9] text-[#1a1a1a] max-[480px]:text-[1.35rem]",
  p: "text-[1rem] leading-[1.65] text-[#555]",
  pLast: "text-[0.92rem]! text-[#777]! italic border-t border-dashed border-[#ebebeb] pt-3 mt-auto",
};

const DuaCard = ({ data }: DuaCardProps) => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.supplicationBookmark.items);
  const bookmarked = bookmarks.some((b) => b.id === data.id);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      dispatch(removeSupplicationBookmark(data.id));
    } else {
      dispatch(addSupplicationBookmark(data));
    }
  };

  return (
    <div className={dc.card}>
        <div className={`${primary_font.className} ${dc.title}`}>
      <h2 className={dc.titleH2}>{data.title}</h2>
      <button
        onClick={handleBookmarkToggle}
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark this dua"}
      >
        {bookmarked ? (
          <MdOutlineBookmark className={dc.bookmarkIcon} />
        ) : (
          <MdOutlineBookmarkAdd className={dc.bookmarkIcon} />
        )}
      </button>
      </div>
      <h3 className={`${roboto.className} ${dc.h3}`} >{data.arabic}</h3>
      <p className={`${roboto.className} ${dc.p}`} >{data.transliteration}</p>
      <p className={`${roboto.className} ${dc.p} ${dc.pLast}`} >{data.translation}</p>
    </div>
  );
};

export default DuaCard;
