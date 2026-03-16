"use client";
import Link from "next/link";
import styles from "./sideDrawer.module.css";
import { RxCross2 } from "react-icons/rx";
import { roboto } from "@/app/font/font";

interface SideDrawerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  pageActive: string;
}

// Define the structure of links
const links: { name: string; link: string; key: string }[] = [
  { name: "Home", link: "/", key: "home" },
    { name: "Quran", link: "/quran", key: "quran" },
    { name: "Supplication", link: "/supplication", key: "supplication" },
    { name: "Hadith", link: "/hadith", key: "hadith" },
    { name: "Scholars", link: "/scholars", key: "scholars" },
    { name: "QnA", link: "/qna", key: "qna" },
    { name: "Articles", link: "/articles", key: "articles" },
    { name: "Zakat Calculator", link: "/zakat-calculator", key: "zakat-calculator" },
];

const SideDrawer: React.FC<SideDrawerProps> = ({ setIsOpen, isOpen, pageActive }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.nav}>
        <div className={styles.icon}>
          <RxCross2 onClick={() => setIsOpen(!isOpen)} />
        </div>

        {/* Navigation Links */}
        <div className={`${styles.links} ${roboto.className}`}>
          <ul>
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.link}
                  onClick={() => setIsOpen(false)}
                  className={pageActive === link.key ? styles.linkActive : styles.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
