import Image from "next/image";
import donationImage from "../../../public/Images/HomeDonation.png";
import styles from "./donation.module.css";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";

const DonationComponent = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        {/* Image Side */}
        <div className={styles.donationImage}>
          <div className={styles.imageFrame}>
            <Image
              src={donationImage}
              alt="Donation Illustration"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          {/* Decorative accent ring */}
          <div className={styles.accentRing} />
        </div>

        {/* Content Side */}
        <div className={styles.contents}>
          {/* Eyebrow badge */}
          <span className={`${styles.badge} ${roboto.className}`}>
            Sadaqah Jariyah
          </span>

          <h2 className={`${styles.heading2} ${roboto.className}`}>
            EMPOWER AUTHENTIC
          </h2>
          <h1 className={`${styles.heading1} ${primary_font.className}`}>
            <i>Knowledge</i>
          </h1>

          {/* Divider */}
          <div className={styles.divider} />

          <div className={`${styles.details} ${roboto.className}`}>
            <p>
              This is an opportunity for Sadaqah Jariyah. Every person who
              benefits from this knowledge can be a source of ongoing reward for
              you,{" "}
            </p>
            <p>
              In Sha Allah. Support this effort in spreading authentic Islamic
              knowledge.
            </p>
          </div>

          {/* Stats row */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={`${styles.statNumber} ${primary_font.className}`}>5K+</span>
              <span className={`${styles.statLabel} ${roboto.className}`}>Supporters</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={`${styles.statNumber} ${primary_font.className}`}>120+</span>
              <span className={`${styles.statLabel} ${roboto.className}`}>Articles</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={`${styles.statNumber} ${primary_font.className}`}>30+</span>
              <span className={`${styles.statLabel} ${roboto.className}`}>Scholars</span>
            </div>
          </div>

          <Link
            href="/donation"
            className={`${styles.btn} ${roboto.className}`}
          >
            <span>Help &amp; Donate Us Now</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationComponent;