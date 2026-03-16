import { primary_font } from "@/app/font/font";
import styles from "./featured.module.css";
import FeaturedCard from "./featurCard";

interface Featured {
  image: string;
  title: string;
  desp: string;
  slug:string
}

interface FeatureCardProps {
  FeaturedList: Featured[];
}

const FeaturedContent: React.FC<FeatureCardProps> = ({ FeaturedList }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.headings}>
            <h2 className={`${primary_font.className} ${styles.title}`}>Featured Content</h2>
            {/* <button className={primary_font.className}>View More</button> */}
          </div>
          <div className={styles.cardContainer}>
          {FeaturedList.map((featured, index) => (
            <FeaturedCard FeaturedData={featured} key={index}/>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
