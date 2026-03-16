import QuranHero from "@/components/Quran/Home/hero"
import styles from "./index.module.css"
import QuranLastRead from "@/components/Quran/Home/quranLastRead"
import QuranIndex from "@/components/Quran/Home/quranIndex";

const Quran = () => {
  return (
    <div className={styles.main}>
      <QuranHero
        arabicText="أَفْضَلُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
        englishTranslation="The most excellent of you is the one who learns the Qur'an and teaches it."
        reference="Sunan Ibn Majah 212"
      />
      <QuranLastRead/>
      <QuranIndex />
    </div>
  )
}

export default Quran