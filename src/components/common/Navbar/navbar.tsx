"use client";
import "@/styles/base.css";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiGlobeSimpleLight } from "react-icons/pi";
import { IoSettingsOutline, IoPersonOutline } from "react-icons/io5";
import { primary_font } from "@/app/font/font";
import SideDrawer from "./SideDrawer";

interface NavLinksProps {
  pageActive: string;
}

const NavLink: React.FC<NavLinksProps> = ({ pageActive }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links = [
    { name: "Home", link: "/", key: "home" },
    { name: "Quran", link: "/quran", key: "quran" },
    { name: "Supplication", link: "/supplication", key: "supplication" },
    { name: "Hadith", link: "/hadith", key: "hadith" },
    { name: "Scholars", link: "/scholars", key: "scholars" },
    { name: "QnA", link: "/qna", key: "qna" },
    { name: "Articles", link: "/articles", key: "articles" },
    { name: "Zakat Calculator", link: "/zakat-calculator", key: "zakat-calculator" },
  ];

  return (
    <div className={`${styles.wrapper} ${pageActive === "home" ? styles.wrapperHome : styles.wrapperOther}`}>
      <div className={styles.container}>
        
        <div className={styles.menu_btn}>
          <button className={styles.hamburger_menu} onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={styles.navlinks}>
          <ul>
            {links.map((l) => (
              <li key={l.key} className={primary_font.className}>
                <Link href={l.link} className={pageActive === l.key ? styles.linkActive : styles.link}>
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.icons}  ${pageActive === "home" ? styles.iconsHome : styles.iconsOther}`}>
          <Link href=""><CiSearch /></Link>
          <Link href=""><PiGlobeSimpleLight /></Link>
          <Link href=""><IoSettingsOutline /></Link>
          <Link href=""><IoPersonOutline /></Link>
        </div>

        {isOpen && <SideDrawer setIsOpen={setIsOpen} isOpen={isOpen} pageActive={pageActive} />}
      </div>
    </div>
  );
};

export default NavLink;
