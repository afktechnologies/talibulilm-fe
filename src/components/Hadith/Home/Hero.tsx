"use client";

import { primary_font } from "@/app/font/font";
import styles from "./hero.module.css";
import SearchbarGO from "@/components/common/SearchBar/searchbarGo";

interface HeroProps {
  englishTranslation: string;
}

const HadithMainPageHero: React.FC<HeroProps> = ({ englishTranslation }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heroImage}>
          <div className={styles.main}>
            <div className={styles.content}>
              <h3 className={primary_font.className}>{englishTranslation}</h3>
              <SearchbarGO />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithMainPageHero;
