import React, { useEffect, useRef } from "react";
import { lateef, primary_font, roboto } from "@/app/font/font";
import { IoBookOutline, IoPlayOutline } from "react-icons/io5";
import { MdOutlineBookmark, MdOutlineBookmarkAdd } from "react-icons/md";
import { LiaRedoAltSolid } from "react-icons/lia";
import { SlOptions } from "react-icons/sl";
import makkahImage from "../../../../public/Images/makkah1.png";
import madinaImage from "../../../../public/Images/madina2.png";
import Image from "next/image";
import WaqfComponent from "@/components/common/Waqf/waqf";
import { AyahListWithTranslation, JuzList } from "@/types/surah";
import Rectangle from "@/components/skeleton/rectangle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addQuranLastRead } from "@/store/slice/quranLastReadSlice";
import {
  addQuranBookmark,
  removeQuranBookmark,
} from "@/store/slice/quranBookmarkSlice";

interface TranslationProps {
  juzData: JuzList | null | undefined;
  ayahData: AyahListWithTranslation[] | undefined | null;
  isVisible: boolean;
  initialVerse: string | null;
  isAyahPending: boolean;
  isAyahError: Error | null;
}

const tr = {
  wrapper: "flex justify-center overflow-x-hidden bg-white rounded-bl-[20px] rounded-br-[20px]",
  container: "flex flex-col max-w-[1440px] w-full bg-white m-4 mb-40",
  title: "flex justify-center items-center gap-4 mb-8",
  titleH3: "text-[1.8rem] text-[#5C6357] max-md:text-[1.4rem] max-[500px]:text-[1.4rem]",
  originImg: "w-[28px] h-[28px] align-middle [mix-blend-mode:multiply] mx-4 max-md:w-5 max-md:h-5 max-[500px]:w-5 max-[500px]:h-5",
  main: "my-2 mx-4",
  details: "flex justify-between text-[#7D887A] m-4",
  detailsSvg: "w-[1.2rem] h-[1.2rem] cursor-pointer hover:text-black hover:transition-colors hover:duration-300 hover:ease-in-out max-md:w-[1rem] max-md:h-[1rem] max-[500px]:w-[0.9rem] max-[500px]:h-[0.9rem]",
  ayah: "flex flex-col gap-2 items-end justify-end mx-4",
  ayahH4: "text-[2rem] text-black text-end font-normal tracking-[0.1rem] max-md:text-[1.5rem] max-[500px]:text-[1.5rem]",
  arabic: "flex flex-row-reverse justify-center items-center gap-4",
  ayahP: "text-justify tracking-[0.075rem] font-thin text-[1.2rem] max-md:text-[1rem] max-[500px]:text-[0.9rem]",
  buttons: "flex gap-12 text-[#7D887A] m-4 max-md:gap-8 max-[500px]:gap-4",
  buttonsSvg: "w-6 h-6 cursor-pointer hover:text-black hover:transition-colors hover:duration-300 hover:ease-in-out max-md:w-[1rem] max-md:h-[1rem] max-[500px]:w-[1rem] max-[500px]:h-[1rem]",
  diamondWrapper: "flex items-center w-full",
  line: "flex-1 h-px bg-[#7A604F]",
  diamond: "w-[5px] h-[5px] bg-[#7A604F] rotate-45",
};

const Translation: React.FC<TranslationProps> = ({
  juzData,
  isVisible,
  initialVerse,
  ayahData,
  isAyahPending,
}) => {
  const origin = juzData?.surahInfo.revelationType.toLowerCase();
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.quranBookmark.items);

  // Scroll to initialVerse if provided
  useEffect(() => {
    if (initialVerse && ayahData) {
      const verseNumber = parseInt(initialVerse);
      const ayahIndex = ayahData.findIndex(
        (ayah) => ayah.ayahNumber === verseNumber
      );
      if (ayahIndex !== -1 && ayahRefs.current[ayahIndex]) {
        ayahRefs.current[ayahIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [initialVerse, ayahData]);

  // IntersectionObserver to track visible ayahs for "Last Read"
  useEffect(() => {
    if (!ayahData || !juzData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = ayahRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (index !== -1) {
              const ayah = ayahData[index];
              dispatch(
                addQuranLastRead({
                  surahNumber: juzData.surahNumber,
                  surahNameEn: juzData.surahInfo.nameEn,
                  surahNameAr: juzData.surahInfo.nameAr,
                  surahSlug: juzData.surahInfo.slug,
                  ayahNumber: ayah.ayahNumber,
                })
              );
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    ayahRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [ayahData, juzData, dispatch]);

  if (!isVisible) return null;

  if (isAyahPending) {
    return (
      <div className={tr.wrapper}>
        <div className={tr.container}>
          <div className={tr.title}>
            <h3 className={`${primary_font.className} ${tr.titleH3}`}>
              {juzData?.surahInfo.nameEnMeaning}
              {origin && (
                <Image
                  src={origin === "makkah" ? makkahImage : madinaImage}
                  alt={origin}
                  width={32}
                  height={32}
                  className={tr.originImg}
                />
              )}
            </h3>
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <Rectangle
              key={index}
              width="90%"
              height="600px"
              borderRadius="10px"
              className={tr.main}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={tr.wrapper}>
      <div className={tr.container}>
        <div className={tr.title}>
          <h3 className={`${primary_font.className} ${tr.titleH3}`}>
            {juzData?.surahInfo.nameEnMeaning}
            {origin && (
              <Image
                src={origin === "makkah" ? makkahImage : madinaImage}
                alt={origin}
                width={32}
                height={32}
                className={tr.originImg}
              />
            )}
          </h3>
        </div>

        {ayahData &&
          ayahData.map((ayah, index) => {
            const isBookmarked = bookmarks.some((b: any) => b.id === ayah.id);

            const handleBookmarkToggle = () => {
              if (isBookmarked) {
                dispatch(removeQuranBookmark(ayah.id));
              } else {
                dispatch(addQuranBookmark(ayah));
              }
            };

            return (
              <div
                key={index}
                className={tr.main}
                ref={(el) => {
                  ayahRefs.current[index] = el;
                }}
              >
                <div className={tr.details}>
                  <p>
                    {ayah.surahNumber}
                    <span>:</span>
                    {ayah.ayahNumber}
                  </p>
                  <SlOptions className={tr.detailsSvg} />
                </div>
                <div className={tr.ayah}>
                  <div className={tr.arabic}>
                    <h4 className={`${lateef.className} ${tr.ayahH4}`}>{ayah.arabicText}</h4>
                  </div>
                  <p className={`${roboto.className} ${tr.ayahP}`}>
                    {ayah.translations[0].translationText}
                  </p>
                </div>
                <div className={tr.buttons}>
                  <IoBookOutline className={tr.buttonsSvg} />
                  <IoPlayOutline className={tr.buttonsSvg} />
                  <div
                    onClick={handleBookmarkToggle}
                    style={{ cursor: "pointer" }}
                  >
                    {isBookmarked ? (
                      <MdOutlineBookmark className={tr.buttonsSvg} />
                    ) : (
                      <MdOutlineBookmarkAdd className={tr.buttonsSvg} />
                    )}
                  </div>
                  <LiaRedoAltSolid className={tr.buttonsSvg} />
                </div>
                <div className={tr.diamondWrapper}>
                  <span className={tr.diamond}></span>
                  <span className={tr.line}></span>
                  <span className={tr.diamond}></span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Translation;
