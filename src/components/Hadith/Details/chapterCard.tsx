"use client";
import { roboto } from "@/app/font/font";
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
  wrapper: "flex justify-center overflow-x-hidden pb-12",
  container: "flex flex-col w-full max-w-[1440px] justify-center items-center",
  card: "w-[90%] flex flex-col text-justify gap-8 mt-10 p-8 bg-white rounded-[20px] shadow-[rgba(0,0,0,0.35)_0px_5px_15px] max-[580px]:py-8 max-[580px]:px-4 max-[500px]:py-8 max-[500px]:px-4 max-[380px]:py-4 max-[380px]:px-[0.8rem]",
  sharedFlex: "flex justify-between gap-28 max-[973px]:gap-16 max-[800px]:flex-col max-[800px]:gap-4",
  width60: "w-[60%] max-[800px]:w-full",
  detail: "m-4",
  narrations: "mt-4 mr-4 mb-8 ml-4",
  arabic: "text-justify [direction:rtl]",
  arabicTitle: "flex justify-end items-center text-end",
  titleChip: "py-2 px-4 bg-[#f4e8c7] rounded-[10px] text-[#7a604f]",
  titleH2: "text-[1.2rem] max-[973px]:text-[1.1rem] max-[800px]:text-[0.95rem] max-[680px]:text-[0.95rem] max-[380px]:text-[0.85rem]",
  detailP: "text-[1rem] max-[800px]:text-[0.9rem] max-[380px]:text-[0.8rem]",
  narrationsH4: "text-[1rem] text-[#c69e30] max-[800px]:text-[0.9rem] max-[380px]:text-[0.8rem]",
  hadith: "text-[1rem] text-black mt-4",
  bottom: "flex justify-between mt-6 mr-12 mb-0 ml-4 max-[800px]:mt-4 max-[800px]:mr-4 max-[800px]:mb-0 max-[800px]:ml-2 max-[500px]:flex-col max-[500px]:gap-4",
  reference: "flex flex-col gap-[0.2rem]",
  referenceSpan: "text-[1rem] text-[#c69e30] font-bold max-[800px]:text-[0.8rem] max-[380px]:text-[0.7rem]",
  referenceP: "text-[#003049] text-[1rem] max-[800px]:text-[0.8rem] max-[380px]:text-[0.7rem]",
  icons: "flex justify-end items-start gap-12 max-[800px]:gap-8 max-[500px]:items-center max-[500px]:gap-6 max-[380px]:gap-[1.2rem]",
  iconsSvg: "w-6 h-6 cursor-pointer text-[rgba(0,0,0,0.5)] max-[800px]:w-[1.3rem] max-[800px]:h-[1.3rem] max-[680px]:w-[1.1rem] max-[680px]:h-[1.1rem] max-[500px]:w-[1.2rem] max-[500px]:h-[1.2rem] max-[380px]:w-[1rem] max-[380px]:h-[1rem]",
};

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
            <div key={chapter.id} className={`${roboto.className} ${cc.card}`}>
              <div>
                <div className={`${cc.sharedFlex} ${cc.titleChip}`}>
                  <div className={cc.width60}>
                    <h2 className={cc.titleH2}>
                      Chapter {chapter.chapterNo}: {chapter.nameEn}
                    </h2>
                  </div>
                  <div className={`${cc.width60} ${cc.arabicTitle}`}>
                    <h2 className={cc.titleH2}>
                      {chapter.nameAr} :({chapter.chapterNo})
                    </h2>
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
                    <h4 className={cc.narrationsH4}>{chapter.chapterNarration}</h4>
                    <p className={cc.hadith}>{chapter.bodyEn}</p>
                  </div>
                  <div className={`${cc.width60} ${cc.arabic}`}>
                    <h3 className={cc.hadith}>{chapter.bodyAr}</h3>
                  </div>
                </div>

                <hr />

                <div className={cc.bottom}>
                  <div className={cc.reference}>
                    <p className={cc.referenceP}>
                      <span className={cc.referenceSpan}>Reference: </span>
                      {chapter.ref}
                    </p>
                    <p className={cc.referenceP}>
                      <span className={cc.referenceSpan}>In Book Reference: </span>
                      {chapter.bookRef}
                    </p>
                    {chapter.grade && (
                      <p className={cc.referenceP}>
                        <span className={cc.referenceSpan}>Grade: </span>
                        {chapter.grade}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className={cc.icons}>
                      {/* Bookmark */}
                      <div
                        onClick={handleBookmarkToggle}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                        {isBookmarked ? <MdOutlineBookmark className={cc.iconsSvg} /> : <MdOutlineBookmarkAdd className={cc.iconsSvg} />}
                      </div>

                      {/* Copy */}
                      <div
                        onClick={handleCopy}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                        {clipboard.copied ? <FaCopy className={cc.iconsSvg} /> : <FaRegCopy className={cc.iconsSvg} />}
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
