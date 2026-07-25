"use client";

import { primary_font } from "@/app/font/font";
import {
  MdOutlineBookmarkAdd,
  MdOutlineBookmark,
} from "react-icons/md";
import { HadithItemList } from "@/types/hadith";
import Link from "next/link";
import Rectangle from "../skeleton/rectangle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/store/slice/hadithBookmarkSlice"

interface DailyCardProps {
  HadithData?: HadithItemList;
  bgColor: string;
  isLoading?: boolean;
}

const DailyHadithCard: React.FC<DailyCardProps> = ({
  HadithData,
  bgColor,
  isLoading,
}) => {
  const cardClass = "rounded-[2rem] pt-8 pr-4 pb-4 pl-4 text-white relative shadow-[0_4px_10px_rgba(0,0,0,0.2)] w-[400px] h-[375px] cursor-pointer max-[890px]:w-[345px] max-[890px]:h-[350px] max-[790px]:w-[295px] max-[790px]:h-[300px] max-[700px]:h-[300px] max-[400px]:w-[250px] max-[400px]:h-[300px] max-[360px]:w-[220px] max-[360px]:h-[280px] max-[340px]:w-[210px] max-[340px]:h-[280px]";
  const bookmarkIconClass = "absolute top-8 right-8 w-[1.8rem] h-[1.8rem] text-white cursor-pointer max-[890px]:top-[1.5rem] max-[890px]:right-[1.5rem] max-[890px]:w-[1.3rem] max-[890px]:h-[1.3rem] max-[400px]:top-[1.2rem] max-[400px]:right-[1.2rem] max-[400px]:w-[1.2rem] max-[400px]:h-[1.2rem] max-[360px]:w-[1rem] max-[360px]:h-[1rem]";
  const contentClass = "flex flex-col mx-4 mt-8 justify-end text-start max-[400px]:mx-2 max-[400px]:mt-4";
  const truncateClass = "line-clamp-6 max-[790px]:line-clamp-5";

  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.hadithBookmark.items);

  const isBookmarked = HadithData
    ? bookmarks.some((b) => b.id === String(HadithData.id))
    : false;

  const handleBookmarkToggle = () => {
    if (!HadithData) return;

    if (isBookmarked) {
      dispatch(removeBookmark(String(HadithData.id)));
    } else {
      dispatch(
        addBookmark(HadithData)
      );
    }
  };

  if (isLoading) {
    return (
      <div className={cardClass}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Rectangle
            key={index}
            width="auto"
            height="300px"
            borderRadius="1.3rem"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cardClass} style={{ backgroundColor: bgColor }}>
      <div>
        <div
          onClick={handleBookmarkToggle}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {isBookmarked ? (
            <MdOutlineBookmark className={bookmarkIconClass} />
          ) : (
            <MdOutlineBookmarkAdd className={bookmarkIconClass} />
          )}
        </div>

        <div className={contentClass}>
          {/* <Link
            href={`/hadith/${HadithData?.hadithCollection?.hadithBook?.slug}/${HadithData?.collectionId}`}
          > */}
            <h5 className={`${primary_font.className} ${truncateClass} text-[1.3rem] mb-4 font-normal max-[890px]:text-[1.2rem] max-[790px]:text-[1.1rem]`}>
              {HadithData?.bodyEn}
            </h5>
          {/* </Link> */}
          {HadithData?.grade && (
            <p className={`${primary_font.className} mt-2 text-[#C2CDD3] text-[1rem] max-[890px]:mt-[0.2rem] max-[890px]:text-[0.9rem] max-[790px]:mt-[0.2rem] max-[790px]:text-[0.8rem]`}>Grade: {HadithData.grade}</p>
          )}
          <p className={`${primary_font.className} mt-2 text-[#C2CDD3] text-[1rem] max-[890px]:mt-[0.2rem] max-[890px]:text-[0.9rem] max-[790px]:mt-[0.2rem] max-[790px]:text-[0.8rem]`}>Ref: {HadithData?.ref}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyHadithCard;
