"use client";

import Image from "next/image";
import styles from "./dailyAyah.module.css";
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
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h3 className={primary_font.className}>Daily Ayah</h3>
            <hr />
          </div>
          <div className={styles.details}>
            <div className={styles.image}>
              <Image
                src={ayahbg}
                alt="Daily Ayah Background"
                width="224"
                height="230"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.left}>
                <p>
                  <Skeleton variant="text" width="100%" height={16} />
                </p>
                <IoBookOutline />
                <IoPlayOutline />
                <MdOutlineBookmarkAdd />
                <LiaRedoAltSolid />
              </div>
              <div className={styles.right}>
                <div className={styles.arabic}>
                  <h4 className={lateef.className}>
                    <Skeleton variant="text" width="600px" height={32} />
                  </h4>
                </div>
                <p className={roboto.className}>
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
      <div className={styles.wrapper}>
        <FallbackError />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3 className={primary_font.className}>Daily Ayah</h3>
          <hr />
        </div>
        <div className={styles.details}>
          <div className={styles.image}>
            <Image
              src={ayahbg}
              alt="Daily Ayah Background"
              width="224"
              height="230"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.left}>
              <p>
                {ayahData.surahNumber}
                <span>:</span>
                {ayahData.ayahNumber}
              </p>
              <IoBookOutline />
              <IoPlayOutline />
              <div
                onClick={handleBookmarkToggle}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                {isBookmarked ? (
                  <MdOutlineBookmark />
                ) : (
                  <MdOutlineBookmarkAdd />
                )}
              </div>
              <LiaRedoAltSolid />
            </div>
            <div className={styles.right}>
              <div className={styles.arabic}>
                <h4 className={lateef.className}>
                  {ayahData.arabicText}
                  <WaqfComponent ayah={ayahData.ayahNumber} />
                </h4>
              </div>
              <p className={roboto.className}>
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
