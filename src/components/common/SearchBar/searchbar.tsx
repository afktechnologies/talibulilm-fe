"use client";
import styles from "./searchbar.module.css";
import { FiSearch } from "react-icons/fi";

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

const Searchbar: React.FC<HeaderProps> = ({ onSearchChange, searchQuery }) => {

  return (
    <div className={styles.searchbar}>
      <FiSearch className={styles.searchIcon} />
      <input
        type="search"
        placeholder="Search by surah name"
        className={styles.search}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
