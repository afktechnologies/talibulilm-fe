"use client";
import Image from "next/image";
import Link from "next/link";
import { AyahList, AyahListWithTranslation, JuzList } from "@/types/surah";
import makkahImage from "../../../../public/Images/makkah1.png";
import madinaImage from "../../../../public/Images/madina2.png";
import { lateef, primary_font } from "@/app/font/font";
import { useEffect, useRef } from "react";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import WaqfComponent from "@/components/common/Waqf/waqf";
import Rectangle from "@/components/skeleton/rectangle";

interface ReadingProps {
  juzData: JuzList | null | undefined;
  isVisible: boolean;
  initialVerse: string | null;
  ayahData: AyahListWithTranslation[] | undefined | null;
  isAyahPending: boolean;
  isAyahError: Error | null;
}

const rd = {
  wrapper:
    "flex overflow-x-hidden bg-white rounded-bl-[20px] rounded-br-[20px]",
  container: "flex flex-col max-w-[1440px] w-full mt-8 mr-4 mb-12 ml-4",
  titleContainer:
    "flex flex-col justify-center items-center gap-4 mb-8 pb-8 border-b border-[#C2CDD3]/60",
  title: "flex justify-center items-center gap-4",
  titleH3:
    "flex justify-center items-center text-[1.4rem] text-[#7A604F] max-md:text-[1.4rem] max-[500px]:text-[1.4rem]",
  originImg:
    "w-[28px] h-[28px] align-middle [mix-blend-mode:multiply] mx-4 max-md:w-5 max-md:h-5 max-[500px]:w-5 max-[500px]:h-5",
  titleContainerH1: "text-[2rem] text-[#5C6357] max-md:text-[1.6rem]",
  main: "w-[60%] block text-justify px-4 leading-[2.8rem] text-[1.8rem] [direction:rtl] font-['Lateef',serif] max-[1000px]:w-[70%] max-md:w-[80%] max-[500px]:w-[90%] max-[420px]:w-[95%]",
  ayahWrapper: "inline",
  ayahText:
    "whitespace-normal break-words text-right [direction:rtl] inline text-[2.25rem] leading-[1.25] transition-colors duration-150 hover:text-[#8A6D59] max-md:text-[1.8rem] max-[500px]:text-[1.6rem]",
  pageContainer: "flex flex-col justify-center items-center mb-12",
  controls: "flex flex-col items-center w-full mt-4",
  pageNumber:
    "text-sm font-semibold text-[#8A6D59] bg-[#f4e8c7]/70 border border-[#DBB346]/40 rounded-full px-4 py-1",
  diamondWrapper:
    "flex items-center w-[80%] mt-4 max-md:w-[90%] max-[500px]:w-[95%]",
  line: "flex-1 h-px bg-[#DBB346]/50",
  diamond: "w-[6.5px] h-[6.5px] bg-[#DBB346] rotate-45",
};

const Reading: React.FC<ReadingProps> = ({
  juzData,
  isVisible,
  initialVerse,
  ayahData,
  isAyahPending,
  isAyahError,
}) => {
  const origin = juzData?.surahInfo.revelationType.toLowerCase();
  const ayahRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (initialVerse && ayahData) {
      const verseNumber = parseInt(initialVerse);
      const ayahIndex = ayahData.findIndex(
        (ayah) => ayah.ayahNumber === verseNumber,
      );
      if (ayahIndex !== -1 && ayahRefs.current[ayahIndex]) {
        ayahRefs.current[ayahIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [initialVerse, ayahData]);

  if (!isVisible) return null;

  if (isAyahPending) {
    return (
      <div className={rd.wrapper}>
        <div className={rd.container}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Rectangle
              key={index}
              width="90%"
              height="200px"
              borderRadius="10px"
              className="mb-8"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isAyahError) {
    return (
      <div className={rd.wrapper}>
        <div>
          <FallbackError />
        </div>
      </div>
    );
  }

  return (
    <div className={rd.wrapper}>
      <div className={rd.container}>
        <div className={rd.titleContainer}>
          <div className={rd.title}>
            <h3 className={`${primary_font.className} ${rd.titleH3}`}>
              {juzData?.surahInfo.nameEnMeaning}
              {origin && (
                <Image
                  src={origin === "makkah" ? makkahImage : madinaImage}
                  alt={origin}
                  width={32}
                  height={32}
                  className={rd.originImg}
                />
              )}
            </h3>
          </div>
          {juzData?.surahNumber !== 1 && juzData?.surahNumber !== 9 && (
            <h1 className={`${lateef.className} ${rd.titleContainerH1}`}>
              بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </h1>
          )}
        </div>

        {ayahData && (
          <>
            {Object.values(
              ayahData.reduce(
                (acc: { [key: number]: AyahList[] }, ayah: AyahList) => {
                  if (!acc[ayah.pageNumber]) {
                    acc[ayah.pageNumber] = [];
                  }
                  acc[ayah.pageNumber].push(ayah);
                  return acc;
                },
                {},
              ),
            ).map((pageAyahs, pageIndex) => (
              <div key={pageIndex} className={rd.pageContainer}>
                <div className={rd.main}>
                  {pageAyahs.map((ayah) => (
                    <span
                      key={`${ayah.surahNumber}-${ayah.ayahNumber}`}
                      className={rd.ayahWrapper}
                      ref={(el) => {
                        ayahRefs.current[
                          ayahData.findIndex(
                            (a) => a.ayahNumber === ayah.ayahNumber,
                          )
                        ] = el;
                      }}
                    >
                      <Link
                        href={`/quran/tafsir?surahSlug=${juzData?.surahInfo.slug}&ayahNumber=${ayah.ayahNumber}`}
                        className={`${rd.ayahText} ${lateef.className}`}
                        title="View tafsir for this ayah"
                      >
                        {ayah.arabicText}
                      </Link>
                      <WaqfComponent ayah={ayah.ayahNumber} />
                    </span>
                  ))}
                </div>

                {/* Page number + horizontal line */}
                <div className={rd.controls}>
                  <span className={rd.pageNumber}>
                    {pageAyahs[pageAyahs.length - 1].pageNumber}
                  </span>

                  <div className={rd.diamondWrapper}>
                    <span className={rd.diamond}></span>
                    <span className={rd.line}></span>
                    <span className={rd.diamond}></span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Reading;
