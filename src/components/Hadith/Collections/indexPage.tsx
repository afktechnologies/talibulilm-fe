"use client";

// import { useState } from "react";
import styles from "./indexPage.module.css";
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
            {isLoading && !description ? (
              <Skeleton variant="text" width="100%" height={28} />
            ) : (
              <p  className={primary_font.className}>{description}</p>
            )}
            {/* {isLongText && (
              <span className={styles.span} onClick={toggleExpand}>
                {isExpanded ? " Read Less" : " Read More"}
              </span>
            )} */}
          <div className={styles.sublinks}>
            <SearchbarGO />
            <MdTune />
            <RiTranslateAi2 />
          </div>
          <Breadcrumb />
          <ListCard />
        </div>
      </div>
    </div>
  );
};

export default IndexPageHadith;
