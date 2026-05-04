"use client";

import { primary_font } from "@/app/font/font";
import styles from "./dailyHadith.module.css";
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
      <div className={styles.card}>
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
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div className={styles.main}>
        <div
          onClick={handleBookmarkToggle}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {isBookmarked ? (
            <MdOutlineBookmark className={styles.bookmarkIcon} />
          ) : (
            <MdOutlineBookmarkAdd className={styles.bookmarkIcon} />
          )}
        </div>

        <div className={styles.content}>
          {/* <Link
            href={`/hadith/${HadithData?.hadithCollection?.hadithBook?.slug}/${HadithData?.collectionId}`}
          > */}
            <h5 className={`${primary_font.className} ${styles.truncate}`}>
              {HadithData?.bodyEn}
            </h5>
          {/* </Link> */}
          {HadithData?.grade && (
            <p className={primary_font.className}>Grade: {HadithData.grade}</p>
          )}
          <p className={primary_font.className}>Ref: {HadithData?.ref}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyHadithCard;
