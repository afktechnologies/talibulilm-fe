import { primary_font } from "@/app/font/font";
import styles from "./searchbarGo.module.css";
import { FiSearch } from "react-icons/fi";

const SearchbarGO = () => {
  return (
    <div className={styles.searchbar}>
      <FiSearch className={styles.searchIcon} />
      <input
        type="search"
        placeholder="Search Hadith"
        className={styles.search}
      />
      <div className={`${primary_font.className} ${styles.searchButton}`}>
        Go
      </div>
    </div>
  );
};

export default SearchbarGO;
