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
        <div className="bg-[url('/Images/HadithPageBG.png')] h-[30rem] w-full bg-center bg-no-repeat bg-cover flex justify-center">
          <div className="flex justify-center items-end w-full max-w-[1440px]">
            <div className="flex flex-col justify-end items-center text-center w-[50%] text-[#003845] mb-16 gap-4 max-[650px]:w-[80%] max-[450px]:mb-40 max-[450px]:w-[80%]">
              <h3 className={`${primary_font.className} tracking-[0.1rem] text-[1.9rem] font-bold max-[855px]:tracking-[0] max-[855px]:text-[1.6rem] max-[650px]:text-[1.4rem] max-[450px]:text-[1.3rem]`}>{englishTranslation}</h3>
              <SearchbarGO />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithMainPageHero;
