import Image from "next/image";
import errorImage from "../../public/Images/404Image.png";
import styles from "./404.module.css";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
        <h3 className={primary_font.className}>Whoops!</h3>
        <h5 className={roboto.className}>
          404 <span>- Page Not Found</span>
        </h5>
        <Image src={errorImage} alt="Error 404 Image" />
        <p className={roboto.className}>
          The page you were looking for doesn’t exist or an other error occured.
          In the meantime, try again or
          <Link href="/"> return to the home page.</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

