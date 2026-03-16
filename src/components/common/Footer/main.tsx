"use client";
import FooterLinks from "./FooterLinks";
import styles from "./main.module.css";
import { FaRegCopyright } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { primary_font } from "@/app/font/font";

const MainFooter = () => {
  const pathname = usePathname(); // Get the current path
  const pageActive = pathname.split("/")[1] || "home"; // Determine the active page

  return (
    <>
      {pageActive !== "admin" && pageActive !== "auth" && (
        <div className={styles.main}>
          <FooterLinks />
          <div className={`${styles.copyright} ${primary_font.className}`}>
            <p>
              Copyright <FaRegCopyright /> 2025 <span>TALIBULILM</span> All Rights Reserved
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MainFooter;
