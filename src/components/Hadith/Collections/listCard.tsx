"use client";

import Rectangle from "@/components/skeleton/rectangle";
import styles from "./listCard.module.css";
import { lateef, primary_font, roboto } from "@/app/font/font";
import { useHadithCollectionBySlug } from "@/services/hooks/hadith";
import Link from "next/link";
import { useParams } from "next/navigation";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";

const ListCard = () => {
  const params = useParams();
  const bookSlug = params?.bookSlug as string;
  const { data, isLoading, isError } = useHadithCollectionBySlug(bookSlug);

  if (isLoading)
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.listGrid}>
            {Array.from({ length: 5 }).map((_, index) => (
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
  if (isError)
    return (
      <div>
        <FallbackError />
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.listGrid}>
          {data &&
            data.map((item, index: number) => {
              return (
                <Link key={index} href={`/hadith/${bookSlug}/${item.id}`}>
                  <div
                    className={`${styles.card} ${
                      index === 0 ? styles.activeCard : ""
                    }`}
                  >
                    <div className={styles.indexNumber}>
                      <span className={styles.index}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className={styles.cardContent}>
                      <p className={primary_font.className}>{item.nameEn}</p>
                      <span className={`${styles.range} ${roboto.className}`}>
                        {item.startingChapter} - {item.endingChapter}
                      </span>
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

export default ListCard;
