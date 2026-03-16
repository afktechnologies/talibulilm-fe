"use client";

import { useState } from "react";
import { primary_font } from "@/app/font/font";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./juzCard.module.css";
import { JuzList } from "@/types/surah";
import Link from "next/link";

interface JuzCardProps {
  juzData: JuzList[];
}

const AccordionLabel = ({ index, label, description }: { index: number; label: string; description: string }) => (
  <Box className={`${primary_font.className} ${styles.accordianLabel}`}>
    <Box>
      <span className={styles.index}>{String(index).padStart(2, "0")}</span>
      <Typography variant="body1" className={styles.arabicText}>{label}</Typography>
    </Box>
    <Typography variant="body2" className={styles.englishText}>
      {description}
    </Typography>
  </Box>
);

const JuzCard = ({ juzData }: JuzCardProps) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (panel: number) => {
    setExpanded((prev) => (prev === panel ? false : panel));
  };

  const groupedJuzData = juzData.reduce((acc, item) => {
    const juzNumber = item.juzNumber;
    if (!acc[juzNumber]) {
      acc[juzNumber] = {
        juzNumber,
        label: item.juzNameAr,
        description: `${item.surahInfo.nameEn} ${item.surahNumber}:${item.ayahNumber[0]}`,
        content: [],
      };
    }
    acc[juzNumber].content.push({
      surahNameEnglish: item.surahInfo.nameEn,
      ayah: item.ayahNumber,
      surahNameArabic: item.surahInfo.nameAr,
      surahSlug: item.surahInfo.slug,
    });
    return acc;
  }, {} as Record<number, { juzNumber: number; label: string; description: string; content: { surahNameEnglish: string; ayah: number[]; surahNameArabic: string; surahSlug: string }[] }>);

  const uniqueJuzData = Object.values(groupedJuzData).sort((a, b) => a.juzNumber - b.juzNumber);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          {uniqueJuzData.map((item, index) => (
            <Accordion
              key={item.juzNumber}
              expanded={expanded === index}
              onChange={() => handleChange(index)}
              className={styles.card}
              sx={{
                borderRadius: "1.3rem",
                overflow: "hidden",
                border: "1px solid var(--grey)",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <AccordionLabel
                  index={item.juzNumber}
                  label={item.label}
                  description={item.description}
                />
              </AccordionSummary>

              <AccordionDetails className={styles.panelContainer}>
                <ul className={styles.list}>
                  {item.content.map((c, idx) => (
                    <li key={idx} className={`${primary_font.className} ${styles.listItem}`}>
                      <Link
                        href={`/quran/${c.surahSlug}?mode=translation&verse=${c.ayah[0]}`}
                      >
                        <span>{c.surahNameEnglish}</span>
                        <span>{c.ayah[0]}-{c.ayah[1]} Ayahs</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JuzCard;