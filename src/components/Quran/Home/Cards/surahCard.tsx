import { primary_font, roboto } from "@/app/font/font";
import styles from "./surahCard.module.css";
import { SurahList } from "@/types/surah";

interface QuranCardProps {
  item: Pick<SurahList, "surahNumber" | "nameEn" | "nameEnMeaning" | "verseCount" | "juzNumber">;
}

const SurahCard = ({ item }: QuranCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={`${styles.number} ${primary_font.className}`}>
          {String(item.surahNumber).padStart(2, "0")}
        </span>
        <div className={styles.title}>
          <h3 className={primary_font.className}>{item.nameEn}</h3>
          <p className={roboto.className}>{item.nameEnMeaning}</p>
        </div>
      </div>
      <div className={styles.details}>
        <p className={roboto.className}>Juz {item.juzNumber}</p>
        <span className={roboto.className}>{item.verseCount} Ayahs</span>
      </div>
    </div>
  );
};

export default SurahCard;
