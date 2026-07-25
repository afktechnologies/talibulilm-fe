"use client";

import Image from "next/image";
import ayahbg from "../../../public/Images/dailyAyah.png"; // Static Image
import { IoBookOutline, IoPlayOutline } from "react-icons/io5";
import {
  MdOutlineBookmarkAdd,
  MdOutlineBookmark,
} from "react-icons/md";
import { LiaRedoAltSolid } from "react-icons/lia";
import { lateef, primary_font, roboto } from "../../app/font/font.js";
import WaqfComponent from "../common/Waqf/waqf";
import { useAyahRandom } from "@/services/hooks/quran";
import { Skeleton } from "@mui/material";
import FallbackError from "../common/Errors/Fallback/fallbackError";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addQuranBookmark,
  removeQuranBookmark,
} from "@/store/slice/quranBookmarkSlice";

const dailyAyahStyles = {
  wrapper: "flex justify-center overflow-x-hidden mt-8 mr-4 mb-8 ml-0",
  container: "flex flex-col max-w-[1440px] w-full",
  title: "flex flex-col justify-center items-center gap-4",
  titleH3: "text-[1.8rem] text-[#5C6357]",
  titleHr: "w-[85%] ml-[15rem] text-[#C2CDD3] max-[570px]:w-[95%] max-[570px]:ml-[1rem]",
  details: "flex items-center gap-8",
  image: "flex justify-start items-center max-[570px]:hidden",
  content: "w-[85%] flex justify-between items-center gap-20 max-md:gap-12 max-md:mt-4 max-[570px]:w-[95%] max-[570px]:gap-12 max-[570px]:mt-4 max-[570px]:ml-8 max-[360px]:w-[95%] max-[360px]:gap-[1.8rem]",
  left: "flex flex-col gap-4 text-[#7D887A] max-md:h-full max-md:justify-between max-[570px]:h-[90%] max-[570px]:justify-between max-[570px]:text-[0.8rem]",
  leftSvg: "w-[1.2rem] h-[1.2rem] max-md:w-[1.1rem] max-md:h-[1.1rem] max-[570px]:w-[1rem] max-[570px]:h-[1rem] max-[360px]:w-[0.8rem] max-[360px]:h-[0.8rem]",
  right: "flex flex-col gap-4 items-end justify-end mx-2",
  rightH4: "text-[2.8rem] text-[#2c7da0] font-normal tracking-[0.1rem] max-[973px]:text-[2.4rem] max-md:text-[2.2rem] max-[570px]:text-[2rem] max-[430px]:text-[1.6rem] max-[360px]:text-[1.4rem]",
  arabic: "flex items-center text-right [direction:rtl] w-full",
  arabicH4: "inline-block [direction:rtl] whitespace-pre-wrap",
  rightP: "text-[1.3rem] tracking-[0.075rem] font-thin max-[973px]:text-[1.2rem] max-md:text-[1rem] max-[570px]:text-[1rem] max-[430px]:text-[0.9rem] max-[360px]:text-[0.8rem]",
};

const DailyAyah = () => {
  const { data: ayahData, isLoading, error } = useAyahRandom();
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
            <h3 className={`${primary_font.className} ${dailyAyahStyles.titleH3}`}>Daily Ayah</h3>
            <hr className={dailyAyahStyles.titleHr} />
          </div>
          <div className={dailyAyahStyles.details}>
            <div className={dailyAyahStyles.image}>
              <Image
                src={ayahbg}
                alt="Daily Ayah Background"
                width="224"
                height="230"
              />
            </div>
            <div className={dailyAyahStyles.content}>
              <div className={dailyAyahStyles.left}>
                <p>
                  <Skeleton variant="text" width="100%" height={16} />
                </p>
                <IoBookOutline className={dailyAyahStyles.leftSvg} />
                <IoPlayOutline className={dailyAyahStyles.leftSvg} />
                <MdOutlineBookmarkAdd className={dailyAyahStyles.leftSvg} />
                <LiaRedoAltSolid className={dailyAyahStyles.leftSvg} />
              </div>
              <div className={dailyAyahStyles.right}>
                <div className={dailyAyahStyles.arabic}>
                  <h4 className={`${lateef.className} ${dailyAyahStyles.arabicH4}`}>
                    <Skeleton variant="text" width="600px" height={32} />
                  </h4>
                </div>
                <p className={`${roboto.className} ${dailyAyahStyles.rightP}`}>
                  <Skeleton variant="text" width="600px" height={32} />
                </p>
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
          <h3 className={`${primary_font.className} ${dailyAyahStyles.titleH3}`}>Daily Ayah</h3>
          <hr className={dailyAyahStyles.titleHr} />
        </div>
        <div className={dailyAyahStyles.details}>
          <div className={dailyAyahStyles.image}>
            <Image
              src={ayahbg}
              alt="Daily Ayah Background"
              width="224"
              height="230"
            />
          </div>
          <div className={dailyAyahStyles.content}>
            <div className={dailyAyahStyles.left}>
              <p>
                {ayahData.surahNumber}
                <span>:</span>
                {ayahData.ayahNumber}
              </p>
              <IoBookOutline className={dailyAyahStyles.leftSvg} />
              <IoPlayOutline className={dailyAyahStyles.leftSvg} />
              <div
                onClick={handleBookmarkToggle}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                {isBookmarked ? (
                  <MdOutlineBookmark className={dailyAyahStyles.leftSvg} />
                ) : (
                  <MdOutlineBookmarkAdd className={dailyAyahStyles.leftSvg} />
                )}
              </div>
              <LiaRedoAltSolid className={dailyAyahStyles.leftSvg} />
            </div>
            <div className={dailyAyahStyles.right}>
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
  );
};

export default DailyAyah;
