import "@/styles/base.css";
import Image from "next/image";
import styles from "./header.module.css";
import logo from "../../../../public/globe.svg";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BiLogoPlayStore } from "react-icons/bi";
import { GrAppleAppStore } from "react-icons/gr";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logo} alt="TalibulIlm" />
            <h3>Talibulilm</h3>
            </Link>
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
    </div>
  );
};

export default Header;
