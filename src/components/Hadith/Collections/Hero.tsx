import { lateef } from "@/app/font/font";
import styles from "./hero.module.css";
// import Rectangle from "@/components/skeleton/rectangle";

interface HadithDetailsHeroProps {
  arabicText: string | null;
  bookName: string | null;
  isLoading?: boolean;
}

const HadithDetailsHero: React.FC< HadithDetailsHeroProps> = ({ arabicText, bookName, isLoading  }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heroImage}>
          <div className={styles.content}>
            {isLoading && !arabicText ? (
              <div className={styles.title}></div>
            ) : (
              <h1 className={`${styles.headings} ${lateef.className}`}>{arabicText}</h1>
  
            )}

            {isLoading && !bookName ? (
              <div className={styles.title}></div>
            ) : (
              <h1 className={styles.headings}>{bookName}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithDetailsHero;
