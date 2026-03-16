import styles from "./about.module.css";
import { primary_font } from "@/app/font/font";

interface AboutProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const About: React.FC<AboutProps> = ({ title, description }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.bgImage}>
          <div className={styles.main}>
            <div className={styles.content}>
              <h4 className={primary_font.className}>{title}</h4>
              <p className={primary_font.className}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
