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
import ribbon from "../../../../public/Images/ribbon.png";
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
  headings: "flex items-center gap-6 p-0 max-[350px]:gap-4",
  svgIcon: "flex justify-center items-center w-10 h-10 border border-[#003845] rounded-[10px] p-[3px] bg-[#003845] max-[350px]:w-8 max-[350px]:h-8",
  svgIconSvg: "text-white h-[1.6rem] w-[1.6rem] max-[350px]:h-[1.3rem] max-[350px]:w-[1.3rem]",
  headingsH2: "text-[2rem] text-[#003845] max-[650px]:text-[1.8rem] max-[350px]:text-[1.5rem]",
  cardContainer: "flex justify-center items-center",
  card: "relative bg-[#edf1f4] rounded-[10px] shadow-[0_2px_6px_rgba(0,0,0,0.15)] mt-12 py-8 px-12 font-sans w-[90%] max-[420px]:p-8 max-[420px]:w-[95%] max-[350px]:p-6",
  narrator: "text-[1.3rem] font-bold text-[rgba(0,0,0,0.75)] mb-2 mr-8 max-[850px]:text-[1.1rem] max-[700px]:text-[1rem] max-[500px]:text-[0.9rem] max-[420px]:text-[0.8rem]",
  text: "w-[80%] my-6 leading-[1.5] text-[1.3rem] text-[rgba(0,0,0,0.75)] max-[700px]:w-[90%] max-[700px]:leading-[1.2] max-[700px]:text-[1rem] max-[500px]:w-full max-[500px]:text-[0.9rem] max-[420px]:text-[0.8rem]",
  truncate: "line-clamp-6",
  reference: "text-[#003049] text-[1.2rem] font-thin max-[850px]:text-[1rem] max-[700px]:text-[0.9rem] max-[500px]:text-[0.8rem] max-[420px]:text-[0.7rem]",
  referenceSpan: "text-[#2c7da0] font-bold text-[1.2rem] max-[850px]:text-[1rem] max-[700px]:text-[0.9rem] max-[500px]:text-[0.8rem] max-[420px]:text-[0.7rem]",
  ribbon: "absolute top-[-20px] right-[-30px] rotate-[8deg] z-[2] max-[700px]:right-[-25px] max-[500px]:top-[-15px] max-[500px]:right-[-25px] max-[350px]:top-[-15px] max-[350px]:right-[-20px]",
  ribbonImg: "block w-[150px] h-auto object-contain max-[950px]:w-[120px] max-[700px]:w-[100px] max-[600px]:w-[90px] max-[420px]:w-[90px] max-[350px]:w-[80px]",
  hr: "mt-8 mr-0 mb-4 ml-0 text-[#c2cdd3]",
  links: "flex justify-between items-center mx-4",
  icons: "flex justify-end items-center gap-12 max-[650px]:gap-8 max-[500px]:gap-[1.2rem]",
  iconsSvg: "w-6 h-6 cursor-pointer text-[rgba(0,0,0,0.5)] max-[650px]:w-[1.3rem] max-[650px]:h-[1.3rem] max-[500px]:w-[1.1rem] max-[500px]:h-[1.1rem]",
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
      <div className={hd.wrapper}>
        <div className={hd.container}>
          <div className={hd.headings}>
            <div className={hd.svgIcon}>
              <PiBookBookmark className={hd.svgIconSvg} />
            </div>
            <h2 className={`${primary_font.className} ${hd.headingsH2}`}>Hadith Of The Day</h2>
          </div>
          <div className={hd.cardContainer}>
            <div className={`${roboto.className} ${hd.card}`}>
              <div className={hd.ribbon}>
                <Image src={ribbon} alt="Ribbon" width={120} height={30} className={hd.ribbonImg} />
              </div>
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
          <h2 className={`${primary_font.className} ${hd.headingsH2}`}>Hadith Of The Day</h2>
        </div>
        <div className={hd.cardContainer}>
          <div className={`${roboto.className} ${hd.card}`}>
            <div>
              {/* <Link
                href={`/hadith/${hadith?.hadithCollection?.hadithBook?.slug}/${hadith?.collectionId}`}
              > */}
                <div className={hd.ribbon}>
                  <Image src={ribbon} alt="Ribbon" width={120} height={30} className={hd.ribbonImg} />
                </div>
                <p className={hd.narrator}>{hadith.chapterNarration}</p>
                <p className={`${hd.truncate} ${hd.text}`}>
                  {hadith.bodyEn}
                </p>
                <p className={hd.reference}>
                  <span className={hd.referenceSpan}>Reference: </span>
                  {hadith.ref}
                </p>
                <p className={hd.reference}>
                  <span className={hd.referenceSpan}>In Book Reference: </span>
                  {hadith.bookRef}
                </p>
                {hadith.grade && (
                  <p className={hd.reference}>
                    <span className={hd.referenceSpan}>Grade: </span>
                    {hadith.grade}
                  </p>
                )}
                <hr className={hd.hr} />
              {/* </Link> */}
            </div>
            <div className={hd.links}>
              <div></div>
              <div className={hd.icons}>
                {/* ✅ Bookmark toggle */}
                <div
                  onClick={handleBookmarkToggle}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isBookmarked ? <MdOutlineBookmark className={hd.iconsSvg} /> : <MdOutlineBookmarkAdd className={hd.iconsSvg} />}
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
                    <MdContentCopy className={hd.iconsSvg} />
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
