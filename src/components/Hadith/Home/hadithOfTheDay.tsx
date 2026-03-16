"use client";

import { useHadithsOfTheDay } from "@/services/hooks/hadith";
import styles from "./hadithOfTheDay.module.css";
import { primary_font, roboto } from "@/app/font/font";
import { PiBookBookmark } from "react-icons/pi";
import { useClipboard } from "react-haiku";
import {
  MdOutlineBookmarkAdd,
  MdOutlineBookmark,
  MdContentCopy,
  MdOutlineShare,
} from "react-icons/md";
import Image from "next/image";
import ribbon from "../../../../public/Images/ribbon.png";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ShareTooltip from "@/components/common/Share/ShareTooltip";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/store/slice/hadithBookmarkSlice";

const HadithOfTheDay: React.FC = () => {
  const clipboard = useClipboard({ timeout: 2000 });
  const { data: hadith, isLoading, error } = useHadithsOfTheDay();
  const [openShareTooltip, setOpenShareTooltip] = useState(false);

  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.hadithBookmark.items);

  const isBookmarked = hadith
    ? bookmarks.some((b) => b.id === String(hadith.id))
    : false;

  const handleBookmarkToggle = () => {
    if (!hadith) return;

    if (isBookmarked) {
      dispatch(removeBookmark(String(hadith.id)));
    } else {
      dispatch(
        addBookmark(hadith)
      );
    }
  };

  const handleCopy = () => {
    if (hadith) {
      const textToCopy = `
Narrated: ${hadith.chapterNarration}

Hadith: ${hadith.bodyEn}

Reference: ${hadith.ref}
In Book Reference: ${hadith.bookRef}
Grade: ${hadith.grade}
      `.trim();
      clipboard.copy(textToCopy);
    }
  };

  const handleShareClick = () => {
    setOpenShareTooltip(!openShareTooltip);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = hadith
    ? `Hadith of the Day:\n${hadith.bodyEn}\n\nNarrated: ${hadith.chapterNarration}\nReference: ${hadith.ref}\n`
    : "";

  // ✅ Loading
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.headings}>
            <div className={styles.svgIcon}>
              <PiBookBookmark />
            </div>
            <h2 className={primary_font.className}>Hadith Of The Day</h2>
          </div>
          <div className={styles.cardContainer}>
            <div className={`${roboto.className} ${styles.card}`}>
              <div className={styles.ribbon}>
                <Image src={ribbon} alt="Ribbon" width={120} height={30} />
              </div>
              <p className={styles.narrator}>
                <Skeleton variant="text" width={200} height="24px" />
              </p>
              <p className={styles.text}>
                <Skeleton variant="text" width={250} height="24px" />
                <Skeleton variant="text" width={250} height="24px" />
                <Skeleton variant="text" width={250} height="24px" />
              </p>
              <p className={styles.reference}>
                <Skeleton variant="text" width={100} height="24px" />
              </p>
              <p className={styles.reference}>
                <Skeleton variant="text" width={100} height="24px" />
              </p>
              <hr />
              <div className={styles.links}>
                <div></div>
                <div className={styles.icons}>
                  <MdOutlineBookmarkAdd />
                  <MdContentCopy />
                  <MdOutlineShare />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error
  if (error || !hadith) {
    return (
      <div>
        <FallbackError />
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headings}>
          <div className={styles.svgIcon}>
            <PiBookBookmark />
          </div>
          <h2 className={primary_font.className}>Hadith Of The Day</h2>
        </div>
        <div className={styles.cardContainer}>
          <div className={`${roboto.className} ${styles.card}`}>
            <div className={styles.cardContent}>
              <Link
                href={`/hadith/${hadith?.hadithCollection?.hadithBook?.slug}/${hadith?.collectionId}`}
              >
                <div className={styles.ribbon}>
                  <Image src={ribbon} alt="Ribbon" width={120} height={30} />
                </div>
                <p className={styles.narrator}>{hadith.chapterNarration}</p>
                <p className={`${styles.truncate} ${styles.text}`}>
                  {hadith.bodyEn}
                </p>
                <p className={styles.reference}>
                  <span>Reference: </span>
                  {hadith.ref}
                </p>
                <p className={styles.reference}>
                  <span>In Book Reference: </span>
                  {hadith.bookRef}
                </p>
                {hadith.grade && (
                  <p className={styles.reference}>
                    <span>Grade: </span>
                    {hadith.grade}
                  </p>
                )}
                <hr />
              </Link>
            </div>
            <div className={styles.links}>
              <div></div>
              <div className={styles.icons}>
                {/* ✅ Bookmark toggle */}
                <div
                  onClick={handleBookmarkToggle}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isBookmarked ? <MdOutlineBookmark /> : <MdOutlineBookmarkAdd />}
                </div>

                {/* ✅ Copy */}
                <div
                  onClick={handleCopy}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {clipboard.copied ? (
                    <span style={{ fontSize: "14px", marginRight: "8px" }}>
                      Copied
                    </span>
                  ) : (
                    <MdContentCopy />
                  )}
                </div>

                {/* ✅ Share */}
                <ShareTooltip
                  open={openShareTooltip}
                  onClose={() => setOpenShareTooltip(false)}
                  shareUrl={shareUrl}
                  shareText={shareText}
                  onClick={handleShareClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithOfTheDay;
