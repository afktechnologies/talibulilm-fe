"use client";

import React from "react";
import styles from "@/components/Hadith/Home/books.module.css";
import skeletonStyles from "./bookSkeleton.module.css";
import { primary_font } from "@/app/font/font";

const BooksSkeleton = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        {/* Title Placeholder */}
        <h2 className={primary_font.className}>Books Of Hadith</h2>

        <div className={styles.cardContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className={styles.card} key={index}>
              {/* Sidebar image placeholder */}
              <div className={skeletonStyles.sidebar}></div>

              {/* Right details shimmer */}
              <div className={skeletonStyles.details}>
                <div className={skeletonStyles.bookNames}>
                  <div className={skeletonStyles.lineLong}></div>
                  <div className={skeletonStyles.lineShort}></div>
                </div>
                <div className={skeletonStyles.icon}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksSkeleton;
