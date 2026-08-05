"use client";

import { useHadithsOfTheDay } from "@/services/hooks/hadith";
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
// import ribbon from "../../../../public/Images/ribbon.png";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ShareTooltip from "@/components/common/Share/ShareTooltip";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBookmark, removeBookmark } from "@/store/slice/hadithBookmarkSlice";

const hd = {
  wrapper: "flex justify-center overflow-x-hidden mt-16 pb-4",
  container: "flex flex-col max-w-[1440px] w-[90%]",
  headings: "flex items-center gap-5 p-0 max-[350px]:gap-4",
  svgIcon:
    "flex justify-center items-center w-11 h-11 rounded-2xl bg-[#003845] shadow-[0_4px_12px_rgba(0,56,69,0.25)] max-[350px]:w-9 max-[350px]:h-9",
  svgIconSvg: "text-white h-6 w-6 max-[350px]:h-5 max-[350px]:w-5",
  headingsH2:
    "text-[1.7rem] text-[#003845] leading-tight max-[650px]:text-[1.4rem] max-[350px]:text-[1.2rem]",
  headingsSubtitle: "text-sm text-[#7D887A] max-[350px]:text-xs",
  cardContainer: "flex justify-center items-center",
  card: "group relative bg-white rounded-2xl border border-[#C2CDD3] shadow-[0_8px_30px_rgba(0,0,0,0.08)] mt-8 py-8 px-12 font-sans w-full max-w-[900px] overflow-hidden max-[420px]:p-8 max-[350px]:p-6",
  accentBar:
    "absolute left-0 top-0 right-0 h-1.5 bg-gradient-to-r from-[#DBB346] via-[#e8c66a] to-[#DBB346]",
  narrator:
    "text-[1.2rem] font-bold text-[#5C6357] mb-2 mr-8 max-[850px]:text-[1.05rem] max-[700px]:text-[1rem] max-[500px]:text-[0.9rem] max-[420px]:text-[0.85rem]",
  text: "w-[85%] my-6 leading-[1.6] text-[1.2rem] text-[#3f4640] max-[700px]:w-[90%] max-[700px]:leading-[1.4] max-[700px]:text-[1rem] max-[500px]:w-full max-[500px]:text-[0.95rem] max-[420px]:text-[0.85rem]",
  truncate: "line-clamp-6",
  reference: "flex flex-wrap items-center gap-2",
  referenceLabel: "text-[0.8rem] text-[#7D887A] font-medium tracking-wide",
  referencePill:
    "text-[0.8rem] font-semibold text-[#003049]/80 bg-[#003049]/5 px-2.5 py-1 rounded-full max-[420px]:text-[0.7rem]",
  gradePill:
    "text-[0.8rem] font-semibold text-[#8A6D59] bg-[#f4e8c7]/70 border border-[#DBB346]/40 px-2.5 py-1 rounded-full max-[420px]:text-[0.7rem]",
  // ribbon:
  //   "absolute top-[-20px] right-[-30px] rotate-[8deg] z-[2] max-[700px]:right-[-25px] max-[500px]:top-[-15px] max-[500px]:right-[-25px] max-[350px]:top-[-15px] max-[350px]:right-[-20px]",
  // ribbonImg:
  //   "block w-[150px] h-auto object-contain max-[950px]:w-[120px] max-[700px]:w-[100px] max-[600px]:w-[90px] max-[420px]:w-[90px] max-[350px]:w-[80px]",
  hr: "mt-6 mb-4 border-dashed border-[#C2CDD3]",
  links: "flex justify-between items-center",
  icons: "flex justify-end items-center gap-2",
  iconBtn:
    "flex items-center justify-center w-9 h-9 rounded-full text-[#7D887A] transition-colors duration-150 hover:bg-[#f4e8c7]/70 hover:text-[#DBB346]",
  iconsSvg: "w-[1.1rem] h-[1.1rem] cursor-pointer",
};

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
      dispatch(addBookmark(hadith));
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
      <div className={hd.wrapper}>
        <div className={hd.container}>
          <div className={hd.headings}>
            <div className={hd.svgIcon}>
              <PiBookBookmark className={hd.svgIconSvg} />
            </div>
            <div>
              <h2 className={`${primary_font.className} ${hd.headingsH2}`}>
                Hadith Of The Day
              </h2>
              <p className={`${roboto.className} ${hd.headingsSubtitle}`}>
                A daily reminder from the Sunnah
              </p>
            </div>
          </div>
          <div className={hd.cardContainer}>
            <div className={`${roboto.className} ${hd.card}`}>
              <div className={hd.accentBar} />
              {/* <div className={hd.ribbon}>
                <Image src={ribbon} alt="Ribbon" width={120} height={30} className={hd.ribbonImg} />
              </div> */}
              <p className={hd.narrator}>
                <Skeleton variant="text" width={200} height="24px" />
              </p>
              <p className={hd.text}>
                <Skeleton variant="text" width={250} height="24px" />
                <Skeleton variant="text" width={250} height="24px" />
                <Skeleton variant="text" width={250} height="24px" />
              </p>
              <p className={hd.reference}>
                <Skeleton variant="text" width={100} height="24px" />
              </p>
              <hr className={hd.hr} />
              <div className={hd.links}>
                <div></div>
                <div className={hd.icons}>
                  <MdOutlineBookmarkAdd className={hd.iconsSvg} />
                  <MdContentCopy className={hd.iconsSvg} />
                  <MdOutlineShare className={hd.iconsSvg} />
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
    <div className={hd.wrapper}>
      <div className={hd.container}>
        <div className={hd.headings}>
          <div className={hd.svgIcon}>
            <PiBookBookmark className={hd.svgIconSvg} />
          </div>
          <div>
            <h2 className={`${primary_font.className} ${hd.headingsH2}`}>
              Hadith Of The Day
            </h2>
            <p className={`${roboto.className} ${hd.headingsSubtitle}`}>
              A daily reminder from the Sunnah
            </p>
          </div>
        </div>
        <div className={hd.cardContainer}>
          <div className={`${roboto.className} ${hd.card}`}>
            <div className={hd.accentBar} />
            <Link
              href={`/hadith/${hadith?.hadithCollection?.hadithBook?.slug}/${hadith?.collectionId}`}
            >
              {/* <div className={hd.ribbon}>
                <Image src={ribbon} alt="Ribbon" width={120} height={30} className={hd.ribbonImg} />
              </div> */}
              <p className={hd.narrator}>{hadith.chapterNarration}</p>
              <p className={`${hd.truncate} ${hd.text}`}>{hadith.bodyEn}</p>
              <div className={hd.reference}>
                <span className={hd.referenceLabel}>Reference</span>
                <span className={hd.referencePill}>{hadith.ref}</span>
                <span className={hd.referencePill}>{hadith.bookRef}</span>
                {hadith.grade && (
                  <span className={hd.gradePill}>{hadith.grade}</span>
                )}
              </div>
            </Link>
            <hr className={hd.hr} />
            <div className={hd.links}>
              <div></div>
              <div className={hd.icons}>
                {/* ✅ Bookmark toggle */}
                <button
                  type="button"
                  onClick={handleBookmarkToggle}
                  aria-label={
                    isBookmarked ? "Remove bookmark" : "Bookmark this hadith"
                  }
                  className={hd.iconBtn}
                >
                  {isBookmarked ? (
                    <MdOutlineBookmark className={hd.iconsSvg} />
                  ) : (
                    <MdOutlineBookmarkAdd className={hd.iconsSvg} />
                  )}
                </button>

                {/* ✅ Copy */}
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy hadith text"
                  className={hd.iconBtn}
                >
                  {clipboard.copied ? (
                    <span className="text-xs font-semibold text-[#DBB346]">
                      Copied
                    </span>
                  ) : (
                    <MdContentCopy className={hd.iconsSvg} />
                  )}
                </button>

                {/* ✅ Share */}
                <div className={hd.iconBtn}>
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
    </div>
  );
};

export default HadithOfTheDay;
