"use client";

import Image from "next/image";
import ayahbg from "../../../public/Images/dailyAyah.png"; // Static Image
import {
  MdOutlineBookmarkAdd,
  MdOutlineBookmark,
} from "react-icons/md";
import { lateef, primary_font, roboto } from "../../app/font/font.js";
import WaqfComponent from "../common/Waqf/waqf";
import { useAyahOfTheDay } from "@/services/hooks/quran";
import { Skeleton } from "@mui/material";
import FallbackError from "../common/Errors/Fallback/fallbackError";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addQuranBookmark,
  removeQuranBookmark,
} from "@/store/slice/quranBookmarkSlice";

const dailyAyahStyles = {
  wrapper: "flex justify-center overflow-x-hidden py-10 px-4",
  container: "flex flex-col max-w-[1440px] w-full",
  title: "flex flex-col items-center gap-1 text-center mb-8",
  titleH3: "text-[1.8rem] text-[#5C6357] tracking-[0.04em] max-[890px]:text-[1.5rem] max-[790px]:text-[1.3rem]",
  titleSub: "text-sm text-[#7D887A] max-[790px]:text-xs",
  card: "relative bg-white rounded-2xl border border-[#C2CDD3] shadow-[0_4px_20px_rgba(0,0,0,0.05)] w-[95%] mx-auto overflow-hidden",
  cardAccent: "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#DBB346] via-[#c69e30] to-[#DBB346]",
  inner: "p-8 max-md:p-6 max-[570px]:p-5",
  headerRow: "flex items-center justify-between gap-4 mb-6",
  refBadge: "inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A6D59] bg-[rgba(219,179,70,0.12)] border border-[rgba(219,179,70,0.3)] rounded-full py-1.5 px-4",
  bookmarkBtn: "flex items-center justify-center w-11 h-11 rounded-full text-[#DBB346] transition-[background-color,transform] duration-150 hover:bg-[rgba(219,179,70,0.12)] active:scale-90 max-[570px]:w-10 max-[570px]:h-10",
  bookmarkIcon: "w-6 h-6 max-[570px]:w-5 max-[570px]:h-5",
  details: "flex items-center gap-10 max-md:gap-6",
  image: "flex justify-start items-center flex-shrink-0 max-[700px]:hidden",
  content: "w-full flex flex-col gap-5",
  arabic: "flex items-center text-right [direction:rtl] w-full",
  arabicH4: "inline-block [direction:rtl] whitespace-pre-wrap text-[2.6rem] leading-[1.9] max-[973px]:text-[2.2rem] max-md:text-[2rem] max-[570px]:text-[1.7rem] max-[430px]:text-[1.5rem]",
  rightP: "text-[1.2rem] tracking-[0.03rem] font-normal text-[#5C6357] leading-relaxed max-[973px]:text-[1.1rem] max-md:text-[1rem] max-[570px]:text-[0.95rem] max-[430px]:text-[0.9rem]",
};

const DailyAyah = () => {
  const { data: ayahData, isLoading, error } = useAyahOfTheDay();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.quranBookmark.items);

  const isBookmarked = ayahData
    ? bookmarks.some((b) => b.id === ayahData.id)
    : false;

  const handleBookmarkToggle = () => {
    if (!ayahData) return;

    if (isBookmarked) {
      dispatch(removeQuranBookmark(ayahData.id));
    } else {
      dispatch(addQuranBookmark(ayahData));
    }
  };

  if (isLoading) {
    return (
      <div className={dailyAyahStyles.wrapper}>
        <div className={dailyAyahStyles.container}>
          <div className={dailyAyahStyles.title}>
            <h3 className={`${primary_font.className} ${dailyAyahStyles.titleH3}`}>Ayah of the Day</h3>
          </div>
          <div className={dailyAyahStyles.card}>
            <div className={dailyAyahStyles.cardAccent} />
            <div className={dailyAyahStyles.inner}>
              <div className={dailyAyahStyles.details}>
                <div className={dailyAyahStyles.image}>
                  <Image src={ayahbg} alt="Daily Ayah Background" width="224" height="230" />
                </div>
                <div className={dailyAyahStyles.content}>
                  <Skeleton variant="text" width="30%" height={28} />
                  <Skeleton variant="text" width="100%" height={64} />
                  <Skeleton variant="text" width="80%" height={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !ayahData) {
    return (
      <div className={dailyAyahStyles.wrapper}>
        <FallbackError />
      </div>
    );
  }

  return (
    <div className={dailyAyahStyles.wrapper}>
      <div className={dailyAyahStyles.container}>
        <div className={dailyAyahStyles.title}>
          <h3 className={`${primary_font.className} ${dailyAyahStyles.titleH3}`}>Ayah of the Day</h3>
          <p className={`${roboto.className} ${dailyAyahStyles.titleSub}`}>A verse from the Quran to reflect on today</p>
        </div>
        <div className={dailyAyahStyles.card}>
          <div className={dailyAyahStyles.cardAccent} />
          <div className={dailyAyahStyles.inner}>
            <div className={dailyAyahStyles.headerRow}>
              <span className={`${roboto.className} ${dailyAyahStyles.refBadge}`}>
                Surah {ayahData.surahNumber} : Ayah {ayahData.ayahNumber}
              </span>
              <button
                type="button"
                onClick={handleBookmarkToggle}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                className={dailyAyahStyles.bookmarkBtn}
              >
                {isBookmarked ? (
                  <MdOutlineBookmark className={dailyAyahStyles.bookmarkIcon} />
                ) : (
                  <MdOutlineBookmarkAdd className={dailyAyahStyles.bookmarkIcon} />
                )}
              </button>
            </div>

            <div className={dailyAyahStyles.details}>
              <div className={dailyAyahStyles.image}>
                <Image src={ayahbg} alt="Daily Ayah Background" width="224" height="230" />
              </div>
              <div className={dailyAyahStyles.content}>
                <div className={dailyAyahStyles.arabic}>
                  <h4 className={`${lateef.className} ${dailyAyahStyles.arabicH4}`}>
                    {ayahData.arabicText}
                    <WaqfComponent ayah={ayahData.ayahNumber} />
                  </h4>
                </div>
                <p className={`${roboto.className} ${dailyAyahStyles.rightP}`}>
                  {ayahData.translations[0].translationText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAyah;
