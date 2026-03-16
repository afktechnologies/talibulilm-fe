import Link from "next/link"
import styles from "./header.module.css"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { primary_font, roboto } from "@/app/font/font"

const TafsirPageheader = () => {
  return (
    <div className={styles.Wrapper}>
        <div className={styles.title}>
        <h2 className={primary_font.className}>Al-Baqarah</h2>
        <p className={roboto.className}>Ayah 177</p>
        </div>
        <div className={styles.mainNav}>
        <ul className={roboto.className}>
            <li className={styles.list}>
              <Link href="/">Surah
              <MdOutlineKeyboardArrowDown />
              </Link>
            </li>
            <li className={styles.list}>
              <Link href="/">Ayah 
              <MdOutlineKeyboardArrowDown />
              </Link>
            </li>
            <li className={styles.list}>
              <Link href="/">English
              <MdOutlineKeyboardArrowDown />
              </Link>
            </li>
            <li className={styles.tafsirSelectionTab}>
              <Link href="/">Tafsir Ibn- Kathir
              <MdOutlineKeyboardArrowDown />
              </Link>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default TafsirPageheader