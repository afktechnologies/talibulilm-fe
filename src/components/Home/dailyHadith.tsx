"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import DailyHadithCard from "./hadithCard";
import { primary_font } from "@/app/font/font";
import { useHadithsRandom } from "@/services/hooks/hadith";
import { HadithItemList } from "@/types/hadith";
import FallbackError from "../common/Errors/Fallback/fallbackError";
import { useRef } from "react";
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from "react-icons/lia";

interface DailyHadithProps {
  limit?: number;
}

const colors: string[] = ["#2C7DA0", "#629893", "#8A6D59"];

const DailyHadith: React.FC<DailyHadithProps> = ({ limit = 4 }) => {
  const { data: hadithList = [], isLoading, isError } = useHadithsRandom(limit);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const titleClass = "flex flex-col items-center justify-center gap-3 tracking-[0.12em] text-center mb-8 text-[1.8rem] text-[#5C6357] max-[890px]:text-[1.5rem] max-[790px]:text-[1.3rem]";
  const navWrapperClass = "flex items-center gap-4 max-[400px]:gap-2";
  const navBtnClass = "flex justify-center items-center bg-transparent border-none w-[40px] h-[40px] text-[#0080b9] cursor-pointer transition-[transform,color] duration-200 ease-in-out hover:scale-[1.15] hover:text-[#005f87] max-[790px]:w-[30px] max-[790px]:h-[30px] [&>svg]:w-full [&>svg]:h-full";

  if (isError)
    return (
      <div className="flex justify-center items-center w-full py-8 px-4">
        <div className="max-w-[1440px] w-full">
          <h1 className={`${titleClass} ${primary_font.className}`}>
            Hadith Of The Day
          </h1>
          <FallbackError />
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center w-full py-8 px-4">
      <div className="max-w-[1440px] w-full">
        {/* <h1 className={`${styles.title} ${primary_font.className}`}>
          Hadith Of The Day
        </h1>

        
        <div className={styles.navWrapper} >
          <button ref={prevRef} className={styles.navBtn}>
            <LiaLongArrowAltLeftSolid />
          </button>
          <button ref={nextRef} className={styles.navBtn}>
            <LiaLongArrowAltRightSolid />
          </button>
        </div> */}

        <h1 className={`${titleClass} ${primary_font.className}`}>
  Hadith Of The Day
  <span className={navWrapperClass}>
    <button ref={prevRef} className={navBtnClass}>
      < LiaLongArrowAltLeftSolid/>
    </button>
    <button ref={nextRef} className={navBtnClass}>
      <LiaLongArrowAltRightSolid />
    </button>
  </span>
</h1>


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
