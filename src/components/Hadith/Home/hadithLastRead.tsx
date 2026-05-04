"use client";

import React from "react";
import styles from "./lastRead.module.css";
import { primary_font } from "@/app/font/font";
import Link from "next/link";
import { MdMenuBook } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HadithLastRead: React.FC = () => {
  const lastReadItems = useSelector(
    (state: RootState) => state.hadithLastRead.items
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.headings}>
            <div className={styles.svgIcon}>
              <MdMenuBook />
            </div>
            <h2 className={primary_font.className}>Last Read</h2>
          </div>

          {lastReadItems.length > 0 ? (
            <ul className={styles.listContainer}>
              {lastReadItems.map((item, index) => (
                // <Link
                //   key={index}
                //   href={`/hadith/${item.bookSlug}/${item.collectionId}`}
                // >
                <div key={index}>
                  <li className={primary_font.className}  >
                    {item.bookName} – {item.bookRef}
                  </li>
                  </div>
                // </Link>
              ))}
            </ul>
          ) : (
            <p className={primary_font.className}>
              “You haven’t started reading Hadith yet.”
            </p>
          )}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default HadithLastRead;
