"use client";

import { primary_font, roboto } from "@/app/font/font";
import { MdTune } from "react-icons/md";
import { RiTranslateAi2 } from "react-icons/ri";
import ListCard from "./listCard";
import SearchbarGO from "@/components/common/SearchBar/searchbarGo";
import Breadcrumb from "../../common/Breadcrumb/breadcrumb";
import { Skeleton } from "@mui/material";

interface HeroProps {
  description: string | null;
  isLoading?: boolean;
  collectionCount?: number;
}

const IndexPageHadith: React.FC<HeroProps> = ({ description, isLoading, collectionCount }) => {
  return (
    <div className="flex justify-center overflow-x-hidden -mt-10 relative z-[1] px-4">
      <div className="flex w-full max-w-[1440px] justify-center">
        <div className="w-full max-w-[1100px] flex flex-col gap-8 bg-white rounded-2xl border border-[#C2CDD3] shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-8 px-10 max-md:py-7 max-md:px-6 max-[500px]:py-6 max-[500px]:px-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Breadcrumb />
            {!!collectionCount && (
              <span
                className={`${roboto.className} flex-shrink-0 text-xs font-semibold tracking-[0.05em] uppercase text-[#8A6D59] bg-[#f4e8c7]/70 border border-[#DBB346]/40 rounded-full px-4 py-1.5`}
              >
                {collectionCount} Collections
              </span>
            )}
          </div>

          {isLoading && !description ? (
            <Skeleton variant="text" width="100%" height={28} />
          ) : (
            description && (
              <div className="relative pl-5 border-l-2 border-[#DBB346]/50">
                <p
                  className={`${primary_font.className} tracking-[0.03rem] leading-[1.9rem] text-[1.05rem] text-[#7D887A] text-justify max-md:leading-[1.7rem] max-md:text-[0.95rem]`}
                >
                  {description}
                </p>
              </div>
            )
          )}

          <div className="flex items-center w-full gap-3">
            <SearchbarGO />
            <button
              type="button"
              aria-label="Filter"
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-[#C2CDD3] text-[#7D887A] transition-colors duration-150 hover:border-[#DBB346] hover:text-[#DBB346] max-[500px]:w-9 max-[500px]:h-9"
            >
              <MdTune className="w-5 h-5 max-[500px]:w-4 max-[500px]:h-4" />
            </button>
            <button
              type="button"
              aria-label="Translate"
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-[#C2CDD3] text-[#7D887A] transition-colors duration-150 hover:border-[#DBB346] hover:text-[#DBB346] max-[500px]:w-9 max-[500px]:h-9"
            >
              <RiTranslateAi2 className="w-5 h-5 max-[500px]:w-4 max-[500px]:h-4" />
            </button>
          </div>

          <div className="border-t border-[#C2CDD3]/60 pt-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${roboto.className} text-sm font-semibold tracking-[0.1em] uppercase text-[#8A6D59]`}>
                Collections
              </h3>
              {!!collectionCount && (
                <span className={`${roboto.className} text-xs text-[#7D887A]`}>{collectionCount} total</span>
              )}
            </div>
            <ListCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPageHadith;
