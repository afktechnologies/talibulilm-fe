"use client";

// import { useState } from "react";
import { primary_font } from "@/app/font/font";
import { MdTune } from "react-icons/md";
import { RiTranslateAi2 } from "react-icons/ri";
import ListCard from "./listCard";
import SearchbarGO from "@/components/common/SearchBar/searchbarGo";
import Breadcrumb from "../../common/Breadcrumb/breadcrumb";
import { Skeleton } from "@mui/material";

interface HeroProps {
  description: string | null;
  isLoading?: boolean;
}

const IndexPageHadith: React.FC<HeroProps> = ({ description, isLoading }) => {
  // const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // const cutoff = 300;

  // const toggleExpand = () => {
  //   setIsExpanded((prev) => !prev);
  // };

  // const isLongText = description.length > cutoff;
  // const displayedText = isExpanded || !isLongText 
  //   ? description 
  //   : description.slice(0, cutoff) + "...";

  return (
    <div className="flex justify-center overflow-x-hidden">
      <div className="flex w-full max-w-[1440px] justify-center items-center">
        <div className="w-[90%] flex flex-col text-justify my-14 py-8 px-12 bg-white rounded-[20px] shadow-[rgba(0,0,0,0.35)_0px_5px_15px] max-md:my-8 max-md:py-8 max-md:px-8 max-[500px]:py-8 max-[500px]:px-6 max-[450px]:w-full">
            {isLoading && !description ? (
              <Skeleton variant="text" width="100%" height={28} />
            ) : (
              <p  className={`${primary_font.className} tracking-[0.05rem] leading-[2rem] text-[1.1rem] text-[#7D887A] max-md:tracking-[0] max-md:leading-[1.8rem] max-md:text-[1rem] max-[500px]:leading-[1.6rem] max-[500px]:text-[1rem] max-[450px]:leading-[1.5rem] max-[450px]:text-[0.9rem]`}>{description}</p>
            )}
            {/* {isLongText && (
              <span className={styles.span} onClick={toggleExpand}>
                {isExpanded ? " Read Less" : " Read More"}
              </span>
            )} */}
          <div className="flex items-center w-full gap-4 my-8 max-[500px]:gap-2">
            <SearchbarGO />
            <MdTune className="w-8 h-8 cursor-pointer max-[973px]:w-[1.2rem] max-[973px]:h-[1.2rem] max-[500px]:w-4 max-[500px]:h-4" />
            <RiTranslateAi2 className="w-8 h-8 cursor-pointer max-[973px]:w-[1.2rem] max-[973px]:h-[1.2rem] max-[500px]:w-4 max-[500px]:h-4" />
          </div>
          <Breadcrumb />
          <ListCard />
        </div>
      </div>
    </div>
  );
};

export default IndexPageHadith;
