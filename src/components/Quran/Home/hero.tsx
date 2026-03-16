import { primary_font, lateef, roboto } from "@/app/font/font"
import styles from "./hero.module.css"

interface QuranHeroProps {
    arabicText: string;
    englishTranslation: string;
    reference: string;
  }

const QuranHero: React.FC<QuranHeroProps> = ({ arabicText, englishTranslation, reference }) => {
  return (
<div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heroImage}>
          <div className={styles.content}>
            <h2 className={lateef.className}>&quot;{arabicText}&quot;</h2>
            <h3 className={primary_font.className}>&quot;{englishTranslation}&quot;</h3>
            <p className={roboto.className}>{reference}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuranHero;