import { MdOutlineBookmarkAdd } from "react-icons/md";
import styles from "./duaCard.module.css";
import { primary_font, roboto } from "@/app/font/font";

type Dua = {
  title: string;
  arabicDua: string;
  transliteration: string;
  translation: string;
};

type DuaCardProps = {
  data: Dua;
};

const DuaCard = ({ data }: DuaCardProps) => {
  return (
    <div className={styles.card}>
        <div className={`${primary_font.className} ${styles.title}`}>
      <h2>{data.title}</h2>
      <MdOutlineBookmarkAdd className={styles.bookmarkIcon} />
      </div>
      <h3 className={roboto.className} >{data.arabicDua}</h3>
      <p className={roboto.className} >{data.transliteration}</p>
      <p className={roboto.className} >{data.translation}</p>
    </div>
  );
};

export default DuaCard;