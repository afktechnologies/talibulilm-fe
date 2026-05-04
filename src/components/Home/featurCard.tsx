
 import { primary_font, roboto } from "@/app/font/font";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

interface Featured {
  image: string;
  title: string;
  desp: string;
    slug:string
}

interface FeatureCardProps {
  FeaturedData: Featured;
}

const FeaturedCard: React.FC<FeatureCardProps> = ({ FeaturedData }) => {
  return (
    <div className={styles.card}>
      <Link href={`/${FeaturedData.slug}`}>
      <div className={styles.cardContent}>
        <Image
          src={`/Images/${FeaturedData.image}`}
          alt={FeaturedData.title}
          width="120"
          height="120"
        />
          <h3 className={primary_font.className}>{FeaturedData.title}</h3>
          <p className={roboto.className}>{FeaturedData.desp}</p>
      </div>
      </Link>
    </div>
  );
};

export default FeaturedCard;