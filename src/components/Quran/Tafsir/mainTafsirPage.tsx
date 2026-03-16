import Image from "next/image";
import styles from "./main.module.css"
import bgImage from "../../../../public/Images/Quran/tafsirHeroBg.png"
import TafsirPageheader from "./header";
import TafsirDetails from "./tafsirDetails";

const TafsirMainPage = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.heroImage}>
            <Image src={bgImage} alt="Tafsir Hero Image" layout="responsive"/>
        </div>
        <div className={styles.content}>
            <TafsirPageheader/>
            <TafsirDetails/>
            </div>
      </div>
    </div>
  );
};

export default TafsirMainPage;
