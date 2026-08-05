"use client";
import { lateef, roboto } from "@/app/font/font";
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

const cc = {
  wrapper: "flex justify-center overflow-x-hidden",
  container: "flex flex-col w-full max-w-[1440px] items-center gap-5",
  card: "relative w-full max-w-[1100px] flex flex-col text-justify gap-6 mt-1 p-8 bg-white rounded-2xl border border-[#C2CDD3] shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] overflow-hidden max-[580px]:py-6 max-[580px]:px-4 max-[380px]:py-5 max-[380px]:px-[0.8rem]",
  accentBar:
    "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#DBB346] via-[#e8c66a] to-[#DBB346]",
  sharedFlex:
    "flex justify-between gap-28 max-[973px]:gap-16 max-[800px]:flex-col max-[800px]:gap-4",
  width60: "w-[60%] max-[800px]:w-full",
  detail: "mt-2",
  narrations: "mt-2 mb-2",
  arabic: `${lateef.className} text-justify [direction:rtl]`,
  arabicTitle: `${lateef.className} flex justify-end items-center text-end`,
  chapterBadge:
    "flex-shrink-0 w-8 h-8 rounded-full bg-[#f4e8c7] border border-[#DBB346]/40 flex items-center justify-center text-xs font-bold text-[#8A6D59]",
  titleChip: "flex items-center gap-3 py-2.5 px-4 bg-[#f4e8c7]/60 rounded-xl",
  titleH2:
    "text-[1.2rem] max-[973px]:text-[1.1rem] max-[800px]:text-[0.95rem] max-[680px]:text-[0.95rem] max-[380px]:text-[0.85rem]",
  detailP:
    "text-[1rem] text-[#5C6357] leading-relaxed max-[800px]:text-[0.9rem] max-[380px]:text-[0.8rem]",
  narrationsH4:
    "text-[1rem] text-[#c69e30] font-semibold max-[800px]:text-[0.9rem] max-[380px]:text-[0.8rem]",
  hadith: "text-[1rem] text-black leading-relaxed mt-3",
  bottom:
    "flex justify-between items-start mt-2 pt-4 border-t border-dashed border-[#C2CDD3] max-[500px]:flex-col max-[500px]:gap-4",
  reference: "flex flex-wrap items-center gap-2",
  referenceLabel: "text-[0.8rem] text-[#7D887A] font-medium tracking-wide",
  referencePill:
    "text-[0.8rem] font-semibold text-[#003049]/80 bg-[#003049]/5 px-2.5 py-1 rounded-full max-[380px]:text-[0.7rem]",
  gradePill:
    "text-[0.8rem] font-semibold text-[#8A6D59] bg-[#f4e8c7]/70 border border-[#DBB346]/40 px-2.5 py-1 rounded-full max-[380px]:text-[0.7rem]",
  icons: "flex justify-end items-center gap-2 max-[500px]:justify-start",
  iconBtn:
    "flex items-center justify-center w-9 h-9 rounded-full text-[#7D887A] transition-colors duration-150 hover:bg-[#f4e8c7]/70 hover:text-[#DBB346]",
  iconsSvg: "w-[1.1rem] h-[1.1rem] cursor-pointer",
};

const ChapterCard = ({ data, isLoading, collectionData }: ChapterCardProps) => {
  const clipboard = useClipboard({ timeout: 2000 });
  const [openShareTooltip, setOpenShareTooltip] = useState<{
    [key: string]: boolean;
  }>({});
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
        }),
      );
    }
  }, [sortedData, collectionData, dispatch]);

  if (isLoading) {
    return (
      <div className={cc.wrapper}>
        <div className={cc.container}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Rectangle
              key={index}
              width="90%"
              height="400px"
              borderRadius="10px"
              className={`${roboto.className} ${cc.card}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cc.wrapper}>
      <div className={cc.container}>
        {sortedData.map((chapter) => {
          const isBookmarked = bookmarks.some((b) => b.id === chapter.id);

          const handleBookmarkToggle = () => {
            if (isBookmarked) {
              dispatch(removeBookmark(chapter.id));
            } else {
              dispatch(addBookmark(chapter));
            }
          };

          const shareUrl =
            typeof window !== "undefined" ? window.location.href : "";
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
            <div key={chapter.id} className={`${roboto.className} ${cc.card}`}>
              <div className={cc.accentBar} />
              <div>
                <div className={`${cc.sharedFlex} ${cc.titleChip}`}>
                  <div className={`${cc.width60} flex items-center gap-3`}>
                    <span className={cc.chapterBadge}>{chapter.chapterNo}</span>
                    <h2 className={cc.titleH2}>
                      Chapter {chapter.chapterNo}
                      {chapter.nameEn ? `: ${chapter.nameEn}` : ""}
                    </h2>
                  </div>
                  <div className={`${cc.width60} ${cc.arabicTitle}`}>
                    <h2 className={cc.titleH2}>{chapter.nameAr}</h2>
                  </div>
                </div>

                <div className={`${cc.sharedFlex} ${cc.detail}`}>
                  {chapter.chapterIntroEn && (
                    <div className={cc.width60}>
                      <p className={cc.detailP}>{chapter.chapterIntroEn}</p>
                    </div>
                  )}
                  {chapter.chapterIntroAr && (
                    <div className={`${cc.width60} ${cc.arabic}`}>
                      <p className={cc.detailP}>{chapter.chapterIntroAr}</p>
                    </div>
                  )}
                </div>

                <div className={`${cc.sharedFlex} ${cc.narrations}`}>
                  <div className={cc.width60}>
                    <h4 className={cc.narrationsH4}>
                      {chapter.chapterNarration}
                    </h4>
                    <p className={cc.hadith}>{chapter.bodyEn}</p>
                  </div>
                  <div className={`${cc.width60} ${cc.arabic}`}>
                    <h3 className={cc.hadith}>{chapter.bodyAr}</h3>
                  </div>
                </div>

                <div className={cc.bottom}>
                  <div className={cc.reference}>
                    <span className={cc.referenceLabel}>Reference</span>
                    <span className={cc.referencePill}>{chapter.ref}</span>
                    <span className={cc.referencePill}>{chapter.bookRef}</span>
                    {chapter.grade && (
                      <span className={cc.gradePill}>{chapter.grade}</span>
                    )}
                  </div>

                  <div className={cc.icons}>
                    {/* Bookmark */}
                    <button
                      type="button"
                      onClick={handleBookmarkToggle}
                      aria-label={
                        isBookmarked
                          ? "Remove bookmark"
                          : "Bookmark this hadith"
                      }
                      className={cc.iconBtn}
                    >
                      {isBookmarked ? (
                        <MdOutlineBookmark className={cc.iconsSvg} />
                      ) : (
                        <MdOutlineBookmarkAdd className={cc.iconsSvg} />
                      )}
                    </button>

                    {/* Copy */}
                    <button
                      type="button"
                      onClick={handleCopy}
                      aria-label="Copy hadith text"
                      className={cc.iconBtn}
                    >
                      {clipboard.copied ? (
                        <FaCopy className={cc.iconsSvg} />
                      ) : (
                        <FaRegCopy className={cc.iconsSvg} />
                      )}
                    </button>

                    {/* Share */}
                    <div className={cc.iconBtn}>
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
