"use client";

import { primary_font } from "@/app/font/font";
import SearchbarGO from "@/components/common/SearchBar/searchbarGo";

interface HeroProps {
  englishTranslation: string;
}

const HadithMainPageHero: React.FC<HeroProps> = ({ englishTranslation }) => {
  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex justify-center w-full">
        <div className="relative h-[28rem] w-full flex justify-center overflow-hidden max-[450px]:h-[26rem]">
          <div className="absolute inset-0 bg-[url('/Images/HadithPageBG.png')] bg-center bg-no-repeat bg-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />

          <div className="relative flex justify-center items-end w-full max-w-[1440px] pb-14 px-4 max-[450px]:pb-10">
            <div className="flex flex-col justify-end items-center text-center gap-5 w-full max-w-[700px]">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8A6D59] bg-[#f4e8c7]/80 border border-[#DBB346]/40 rounded-full px-4 py-1.5">
                Sunnah &amp; Hadith
              </span>
              <h3 className={`${primary_font.className} tracking-[0.05rem] text-[1.9rem] font-bold text-[#003845] leading-snug max-[855px]:text-[1.6rem] max-[650px]:text-[1.4rem] max-[450px]:text-[1.3rem]`}>
                {englishTranslation}
              </h3>
              <div className="w-full max-w-[560px]">
                <SearchbarGO />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithMainPageHero;
