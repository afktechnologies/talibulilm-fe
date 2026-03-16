"use client";
import { roboto } from "@/app/font/font";
import styles from "./chapterCard.module.css";
import { HadithBookCollectionList, HadithItemList } from "@/types/hadith";
import Rectangle from "@/components/skeleton/rectangle";
import { useClipboard } from "react-haiku";
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import ShareTooltip from "@/components/common/Share/ShareTooltip";
import { addHadithLastRead } from "@/store/slice/hadithLastReadSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/store/slice/hadithBookmarkSlice";

interface ChapterCardProps {
  data: HadithItemList[];
  isLoading?: boolean;
  collectionData: HadithBookCollectionList | undefined;
}

const ChapterCard = ({ data, isLoading, collectionData }: ChapterCardProps) => {
  const clipboard = useClipboard({ timeout: 2000 });
  const [openShareTooltip, setOpenShareTooltip] = useState<{ [key: string]: boolean }>({});
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.hadithBookmark.items);

  // ✅ Sort data by chapterNo without mutating the original props
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.chapterNo - b.chapterNo);
  }, [data]);

  const handleShareClick = (chapterId: string) => {
    setOpenShareTooltip((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // ✅ Last read tracking
  useEffect(() => {
    if (sortedData.length > 0 && collectionData) {
      const lastChapter = sortedData[sortedData.length - 1]; // last in sorted list
      dispatch(
        addHadithLastRead({
          bookName: collectionData.hadithBook?.nameEn,
          bookRef: lastChapter.bookRef,
          hadithId: +lastChapter.id,
          bookSlug: collectionData.hadithBook.slug,
          collectionId: collectionData.id,
          chapterNumber: lastChapter.chapterNo,
        })
      );
    }
  }, [sortedData, collectionData, dispatch]);

  if (isLoading) {
    return (
      <div className={styles.Wrapper}>
        <div className={styles.Container}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Rectangle
              key={index}
              width="90%"
              height="400px"
              borderRadius="10px"
              className={`${roboto.className} ${styles.card}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        {sortedData.map((chapter) => {
          const isBookmarked = bookmarks.some((b) => b.id === chapter.id);

          const handleBookmarkToggle = () => {
            if (isBookmarked) {
              dispatch(removeBookmark(chapter.id));
            } else {
              dispatch(addBookmark(chapter));
            }
          };

          const shareUrl = typeof window !== "undefined" ? window.location.href : "";
          const shareText = `
            Hadith in English: ${chapter.bodyEn}
            Hadith in arabic: ${chapter.bodyAr}
            Narrated: ${chapter.chapterNarration}
            Reference: ${chapter.ref}
            In Book Reference: ${chapter.bookRef}
            Grade: ${chapter.grade}
          `.trim();

          const handleCopy = () => {
            const textToCopy = `
              Narrated: ${chapter.chapterNarration}
              Hadith in English: ${chapter.bodyEn}
              Hadith in arabic: ${chapter.bodyAr}
              Reference: ${chapter.ref}
              In Book Reference: ${chapter.bookRef}
              Grade: ${chapter.grade}
            `.trim();
            clipboard.copy(textToCopy);
          };

          return (
            <div key={chapter.id} className={`${roboto.className} ${styles.card}`}>
              <div className={styles.cardContent}>
                <div className={styles.title}>
                  <div className={styles.english}>
                    <h2>
                      Chapter {chapter.chapterNo}: {chapter.nameEn}
                    </h2>
                  </div>
                  <div className={styles.arabicTitle}>
                    <h2>
                      {chapter.nameAr} :({chapter.chapterNo})
                    </h2>
                  </div>
                </div>

                <div className={styles.detail}>
                  {chapter.chapterIntroEn && (
                    <div className={styles.english}>
                      <p>{chapter.chapterIntroEn}</p>
                    </div>
                  )}
                  {chapter.chapterIntroAr && (
                    <div className={styles.arabic}>
                      <p>{chapter.chapterIntroAr}</p>
                    </div>
                  )}
                </div>

                <div className={styles.narrations}>
                  <div className={styles.english}>
                    <h4>{chapter.chapterNarration}</h4>
                    <p className={styles.hadith}>{chapter.bodyEn}</p>
                  </div>
                  <div className={styles.arabic}>
                    <h3 className={styles.hadith}>{chapter.bodyAr}</h3>
                  </div>
                </div>

                <hr />

                <div className={styles.bottom}>
                  <div className={styles.reference}>
                    <p>
                      <span>Reference: </span>
                      {chapter.ref}
                    </p>
                    <p>
                      <span>In Book Reference: </span>
                      {chapter.bookRef}
                    </p>
                    {chapter.grade && (
                      <p>
                        <span>Grade: </span>
                        {chapter.grade}
                      </p>
                    )}
                  </div>

                  <div className={styles.links}>
                    <div className={styles.icons}>
                      {/* Bookmark */}
                      <div
                        onClick={handleBookmarkToggle}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                        {isBookmarked ? <MdOutlineBookmark /> : <MdOutlineBookmarkAdd />}
                      </div>

                      {/* Copy */}
                      <div
                        onClick={handleCopy}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                        {clipboard.copied ? <FaCopy /> : <FaRegCopy />}
                      </div>

                      {/* Share */}
                      <ShareTooltip
                        open={openShareTooltip[chapter.id] || false}
                        onClose={() =>
                          setOpenShareTooltip((prev) => ({
                            ...prev,
                            [chapter.id]: false,
                          }))
                        }
                        shareUrl={shareUrl}
                        shareText={shareText}
                        onClick={() => handleShareClick(chapter.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterCard;
