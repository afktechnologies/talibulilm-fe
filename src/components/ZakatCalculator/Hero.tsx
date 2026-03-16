import { primary_font, lateef, roboto } from "@/app/font/font";
import styles from "./hero.module.css";

interface HeroProps {
  arabicText: string;
  englishTranslation: string;
  reference: string;
}

const ZakatCalculatorHero: React.FC<HeroProps> = ({ arabicText, englishTranslation, reference }) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.heroImage}>
          <div className={styles.content}>
            <h2 className={lateef.className}>{arabicText}</h2>
            <h3 className={primary_font.className}>{englishTranslation}</h3>
            <p className={roboto.className}>{reference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculatorHero;
