"use client";
import React from "react";
import styles from "./lastRead.module.css";
import { primary_font, roboto } from "@/app/font/font";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const QuranLastRead: React.FC = () => {
  const lastReadItems = useSelector((state: RootState) => state.quranLastRead.items);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <h2 className={roboto.className}>Last Read</h2>
          {lastReadItems.length > 0 ? (
            <ul className={styles.listContainer}>
              {lastReadItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/quran/${item.surahSlug}?verse=${item.ayahNumber}`}
                >
                  <li className={primary_font.className}>
                    {item.surahNameEn} {item.surahNumber}:{item.ayahNumber}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className={primary_font.className}>`&quot;`You haven’t started reading yet.`&quot;`</p>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default QuranLastRead;
