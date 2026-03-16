"use client";
import Header from "./header";
import styles from "./main.module.css";
import NavLink from "./navbar";
import { usePathname } from "next/navigation";
const MainNavbar = () => {
  const pathname = usePathname(); 
  const pageActive: string = pathname.split("/")[1] || "home";

  return (
    <>
        <div className={styles.navbar}>
          <Header />
          <NavLink pageActive={pageActive} />
        </div>
    </>
  );
};

export default MainNavbar;
