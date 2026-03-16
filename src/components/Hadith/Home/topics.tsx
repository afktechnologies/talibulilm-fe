import styles from "./topics.module.css";
import { primary_font, roboto } from "@/app/font/font";
import Link from "next/link";
import { HiOutlineDocumentSearch} from "react-icons/hi";

interface Book {
  topic: string;
}

const hadithBooks: Book[] = [
  { topic: "Tawheed" },
  { topic: "Aqeedah" },
  { topic: "Salah" },
  { topic: "Hajj(Pilgrimage)" },
  { topic: "Niyyah(Intentions)" },
  { topic: "Herafter" },
  { topic: "Etiquettes and Manners" },
  { topic: "Quran and knowledge" },
];

const HadithTopics = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={styles.headings}>
          <div className={styles.svgIcon}>
          <HiOutlineDocumentSearch />
          </div>
        <h2 className={primary_font.className}>Explore by Topics</h2>
        </div>
        <div className={styles.cardContainer}>
          {hadithBooks.map((book, index) => (
            <Link href="/hadith/index" key={index}>
              <div className={styles.card}>
                <div className={styles.details}>
                  <div className={styles.bookNames}>
                    <h4 className={roboto.className}>{book.topic}</h4>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HadithTopics;
