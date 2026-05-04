"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./otherAdhkaar.module.css";
import { roboto, primary_font } from "@/app/font/font";
import type { DuaItem } from "@/app/supplication/page";

interface OtherAdhkaarProps {
  /** Pass the slice after the first 8 from the parent page (or swap for an API response). */
  items: DuaItem[];
}

const OtherAdhkaar = ({ items }: OtherAdhkaarProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.Wrapper}>
      <div className={styles.Container}>
        {/* Section heading */}
        <div className={styles.headingRow}>
          <h2 className={`${primary_font.className} ${styles.sectionTitle}`}>
            Other Adhkaar
          </h2>
          <div className={styles.titleUnderline} />
        </div>

        {/* Accordion list */}
        <div className={styles.accordionList} role="list">
          {items.map((item, index) => (
            <div
              key={item.title || index}
              className={`${styles.accordionItem} ${openIndex === index ? styles.open : ""}`}
              role="listitem"
            >
              {/* Row / trigger */}
              <button
                className={styles.accordionTrigger}
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`adhkaar-panel-${index}`}
              >
                {/* Left: icon bubble */}
                <span className={styles.iconBubble} aria-hidden="true">
                  {item.icon}
                </span>

                {/* Title */}
                <span className={`${roboto.className} ${styles.itemTitle}`}>
                  {item.title}
                </span>

                {/* Chevron */}
                <span
                  className={`${styles.chevron} ${openIndex === index ? styles.chevronOpen : ""}`}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </button>

              {/* Expandable panel — swap static text for real content / API data */}
              <div
                id={`adhkaar-panel-${index}`}
                className={styles.accordionPanel}
                role="region"
                aria-hidden={openIndex !== index}
              >
                <div className={styles.panelInner}>
                  <p className={roboto.className}>
                    Explore the complete collection of <strong>{item.title}</strong> supplications, with Arabic text, transliteration, and translation.
                  </p>
                  <Link
                    href="/supplication/dua"
                    className={styles.viewButton}
                  >
                    <span>View {item.title} Dua</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherAdhkaar;