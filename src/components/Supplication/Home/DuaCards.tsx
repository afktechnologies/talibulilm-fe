import styles from "./duaCard.module.css";
import Card from "./Card";
import duas from "@/store/data/duaCardData.json";

type Dua = {
  title: string;
  arabicDua: string;
  transliteration: string;
  translation: string;
};

const DuaCards = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.cardContainer}>
          {duas.map((dua: Dua, index: number) => (
            <Card key={dua.title || index} data={dua} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DuaCards;