import Image from "next/image";
import comingSoonImage from "../../../../../public/Images/comingSoon.png";
import styles from "./comingSoon.module.css";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";

const ComingSoon = () =>  {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
        <h3 className={primary_font.className}>Coming Soon!</h3>
        <h5 className={roboto.className}>
          This page is under development
        </h5>
        <Image src={comingSoonImage} alt="Error 404 Image" />
        <p className={roboto.className}>
          By the time, Explore our Qur’an page and nourish your heart or
          <Link href="/"> return to the home page.</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon