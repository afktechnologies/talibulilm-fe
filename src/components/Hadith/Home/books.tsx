"use client";

import styles from "./books.module.css";
import sideBar from "../../../../public/Images/Hadith/SideImage.png";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { lateef, primary_font } from "@/app/font/font";
import Link from "next/link";
import { useHadithBooks } from "@/services/hooks/hadith";
import { GiBookshelf } from "react-icons/gi";
import Rectangle from "@/components/skeleton/rectangle";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

const HadithBooks = () => {
  const { data: HadithBookList, isLoading, isError } = useHadithBooks();

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.headings}>
            <div className={styles.svgIcon}>
              <GiBookshelf />
            </div>
            <h2 className={primary_font.className}>Books Of Hadith</h2>
          </div>
          <div className={styles.cardContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Rectangle
                key={index}
                width="auto"
                height="100px"
                borderRadius="10px"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>
      <FallbackError />
    </div>;;
  }

  const entries = Object.entries(HadithBookList || {});

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headings}>
          <div className={styles.svgIcon}>
            <GiBookshelf />
          </div>
          <h2 className={primary_font.className}>Books Of Hadith</h2>
        </div>
        <div className={styles.cardContainer}>
          {entries.map(([key, book], index) => {
            return (
              <Link href={`/hadith/${book.slug}`} key={book.slug || key}>
                <div className={styles.card}>
                  <Image src={sideBar} alt="Books List Sidebar" />
                  <div
                    className={`${styles.details} ${
                      styles[`bg${(index % 3) + 1}`]
                    }`}
                  >
                    <div className={styles.bookNames}>
                      <h3 className={lateef.className}>{book.nameAr}</h3>
                      <h4 className={primary_font.className}>{book.nameEn}</h4>
                    </div>
                    <IoIosArrowForward />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HadithBooks;
