import { primary_font, lateef, roboto } from "@/app/font/font";
import styles from "./quranicVerse.module.css";

interface QuranHeroProps {
  arabicText: string;
  englishTranslation: string;
  reference: string;
}

const QuranicVerse: React.FC<QuranHeroProps> = ({
  arabicText,
  englishTranslation,
  reference,
}) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.content}>
          <h2 className={lateef.className}>{arabicText}</h2>
          <h3 className={primary_font.className}>{englishTranslation}</h3>
          <p className={roboto.className}>{reference}</p>
        </div>
      </div>
    </div>
  );
};

export default QuranicVerse;
