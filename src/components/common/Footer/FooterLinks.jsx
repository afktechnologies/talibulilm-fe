import Link from "next/link";
import styles from "./footerLinks.module.css";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiLogoPlayStore } from "react-icons/bi";
import { GrAppleAppStore } from "react-icons/gr";
import { lateef, primary_font } from "@/app/font/font";
import Image from "next/image";
import logo from "../../../../public/globe.svg";

const FooterLinks = () => {
  const linksLeft = [
    { name: "Articles", link: "/articles", key: "articles" },
    { name: "Quran", link: "/quran", key: "quran" },
    { name: "Supplication", link: "/supplication", key: "supplication" },
    {
      name: "Zakat Calculator",
      link: "/zakat-calculator",
      key: "zakat-calculator",
    },
  ];

  const linksMiddle = [
    {
      name: "Islamic Calendar",
      link: "/islamic-calendar",
      key: "islamic-calendar",
    },
    { name: "Hadith", link: "/hadith", key: "hadith" },
    { name: "Scholars", link: "/scholars", key: "scholars" },
    { name: "Support Us", link: "/support-us", key: "donation" },
  ];

  const linksRight = [
    { name: "QnA", link: "/qna", key: "qna" },
    { name: "About Us", link: "/about-us", key: "islamic-calendar" },
    { name: "Contact US", link: "/contact-us", key: "hadith" },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.companyDetails}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logo} alt="TalibulIlm" />
              <h3>Talibulilm</h3>
            </Link>
              <p className={lateef.className}>فَفِرُّوۤا۟ إِلَى ٱللَّهِۖ</p>
          </div>
          <div className={styles.icon}>
            <Link href="https://www.facebook.com/">
              <FaFacebookF />
            </Link>
            <Link href="https://www.instagram.com/">
              <RiInstagramFill />
            </Link>
            <Link href="https://play.google.com/store/apps">
              <BiLogoPlayStore />
            </Link>
            <Link href="https://www.apple.com/in/app-store/">
              <GrAppleAppStore />
            </Link>
          </div>
        </div>
        <div className={styles.left}>
          <div className={styles.links}>
            <ul>
              {linksLeft.map((l, i) => (
                <li className={primary_font.className} key={i}>
                  <Link href={l.link}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.links}>
            <ul>
              {linksMiddle.map((l, i) => (
                <li className={primary_font.className} key={i}>
                  <Link href={l.link}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.links}>
            <ul>
              {linksRight.map((l, i) => (
                <li className={primary_font.className} key={i}>
                  <Link href={l.link}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
