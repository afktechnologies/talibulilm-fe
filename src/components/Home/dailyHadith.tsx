"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import DailyHadithCard from "./hadithCard";
import { primary_font } from "@/app/font/font";
import { useHadithsOfTheDay, useHadithsRandom } from "@/services/hooks/hadith";
import { HadithItemList } from "@/types/hadith";
import FallbackError from "../common/Errors/Fallback/fallbackError";
import { useRef } from "react";
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from "react-icons/lia";

interface DailyHadithProps {
  limit?: number;
}

const colors: string[] = ["#2C7DA0", "#629893", "#8A6D59"];

const DailyHadith: React.FC<DailyHadithProps> = ({ limit = 4 }) => {
  // First slide is the admin-scheduled (or random-fallback) hadith of the
  // day; the rest fill out the carousel with supplementary random hadiths.
  const {
    data: dailyHadith,
    isLoading: isDailyLoading,
    isError: isDailyError,
  } = useHadithsOfTheDay();
  const {
    data: randomHadiths = [],
    isLoading: isRandomLoading,
    isError: isRandomError,
  } = useHadithsRandom(Math.max(limit - 1, 1));

  const hadithList: HadithItemList[] = dailyHadith
    ? [dailyHadith, ...randomHadiths.filter((hadith) => hadith.id !== dailyHadith.id)]
    : randomHadiths;
  const isLoading = isDailyLoading || isRandomLoading;
  const isError = isDailyError && isRandomError;

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const titleClass = "text-[1.8rem] text-[#5C6357] max-[890px]:text-[1.5rem] max-[790px]:text-[1.3rem]";
  const subtitleClass = "text-sm text-[#7D887A] mt-1 max-[790px]:text-xs";
  const navWrapperClass = "flex items-center gap-3 max-[400px]:gap-2";
  const navBtnClass = "flex justify-center items-center bg-white border border-[#C2CDD3] rounded-full w-10 h-10 text-[#5C6357] cursor-pointer transition-[transform,color,border-color] duration-200 ease-in-out hover:scale-[1.08] hover:text-[#DBB346] hover:border-[#DBB346] shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-[790px]:w-8 max-[790px]:h-8 [&>svg]:w-4 [&>svg]:h-4";

  if (isError)
    return (
      <div className="flex justify-center items-center w-full py-10 px-4">
        <div className="max-w-[1440px] w-full">
          <h1 className={`${titleClass} ${primary_font.className} text-center mb-8`}>
            Wisdom from the Prophet ﷺ
          </h1>
          <FallbackError />
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center w-full py-10 px-4 bg-[#f8f7f4]">
      <div className="max-w-[1440px] w-full">
        <div className="flex items-end justify-between gap-4 mb-8 px-4 max-[600px]:flex-col max-[600px]:items-center max-[600px]:text-center max-[600px]:gap-3">
          <div>
            <h1 className={`${titleClass} ${primary_font.className} tracking-[0.04em]`}>
              Wisdom from the Prophet ﷺ
            </h1>
            <p className={subtitleClass}>Authentic sayings to reflect on today</p>
          </div>
          <span className={navWrapperClass}>
            <button ref={prevRef} aria-label="Previous hadith" className={navBtnClass}>
              <LiaLongArrowAltLeftSolid />
            </button>
            <button ref={nextRef} aria-label="Next hadith" className={navBtnClass}>
              <LiaLongArrowAltRightSolid />
            </button>
          </span>
        </div>

        <Swiper
          modules={[FreeMode, Navigation]}
          spaceBetween={50}
          freeMode={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // Bind custom buttons
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            450: { slidesPerView: 1 },
            451: { slidesPerView: 1.15 },
            491: { slidesPerView: 1.35 },
            550: { slidesPerView: 1.5 },
            600: { slidesPerView: 1.75 },
            700: { slidesPerView: 2 },
            1000: { slidesPerView: 2.25 },
            1100: { slidesPerView: 2.5 },
            1200: { slidesPerView: 2.75 },
            1300: { slidesPerView: 3 },
          }}
          className="py-4 px-12 max-[360px]:px-10"
        >
          {hadithList.map((hadith: HadithItemList, index: number) => (
            <SwiperSlide key={index}>
              <DailyHadithCard
                HadithData={hadith}
                bgColor={colors[index % colors.length]}
                isLoading={isLoading}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DailyHadith;
