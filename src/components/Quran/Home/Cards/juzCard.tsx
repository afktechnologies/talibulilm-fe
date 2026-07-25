"use client";

import { useState } from "react";
import { primary_font } from "@/app/font/font";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { JuzList } from "@/types/surah";
import Link from "next/link";

interface JuzCardProps {
  juzData: JuzList[];
}

const jc = {
  accordianLabel: "flex justify-between w-[60%] [align-content:center] text-center max-[1100px]:w-[80%] max-[620px]:w-[90%] max-[450px]:w-full",
  firstChild: "flex items-center gap-8 max-[470px]:gap-4 max-[370px]:gap-2",
  index: "bg-[#d9d9d9] text-black font-bold text-[1.5rem] py-2 px-6 flex items-center justify-center rounded-tr-[1rem] rounded-bl-[1rem] transition-colors duration-300 group-hover:text-white group-hover:bg-[#DBB346] max-[530px]:text-[1.2rem] max-[530px]:py-2 max-[530px]:px-4 max-[450px]:text-[1rem] max-[450px]:py-[0.3rem] max-[450px]:px-[0.8rem]",
  arabicText: "text-[1.6rem]! font-medium! max-[620px]:text-[1.4rem]! max-[620px]:font-medium! max-[530px]:text-[1.2rem]! max-[530px]:font-normal! max-[450px]:text-[1rem]! max-[450px]:font-normal!",
  englishText: "text-[1.1rem]! max-[620px]:text-[1rem]! max-[530px]:text-[0.9rem]! max-[450px]:text-[0.8rem]!",
  panelContainer: "pt-0 pr-4 pb-3 pl-4",
  list: "list-none px-8 max-[450px]:px-4",
  listItem: "max-[450px]:text-[0.9rem] max-[370px]:text-[0.8rem]",
  listItemA: "flex justify-between items-center py-2 px-4 border-t border-[#DBB346] cursor-pointer",
  listItemSpan: "flex flex-col justify-center items-center",
};

const AccordionLabel = ({ index, label, description }: { index: number; label: string; description: string }) => (
  <Box className={`${primary_font.className} ${jc.accordianLabel}`}>
    <Box className={jc.firstChild}>
      <span className={jc.index}>{String(index).padStart(2, "0")}</span>
      <Typography variant="body1" className={jc.arabicText}>{label}</Typography>
    </Box>
    <Typography variant="body2" className={jc.englishText}>
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
    <div className="flex justify-center w-full p-5 max-[530px]:py-5 max-[530px]:px-0">
      <div className="w-full max-w-[1440px]">
        <div className="flex flex-col gap-4">
          {uniqueJuzData.map((item, index) => (
            <Accordion
              key={item.juzNumber}
              expanded={expanded === index}
              onChange={() => handleChange(index)}
              className="group border-[#c2cdd3]! bg-white shadow-none! rounded-tr-[1.2rem]! rounded-bl-[1.2rem]! overflow-hidden transition-colors duration-300 ease-in-out cursor-pointer text-black hover:-translate-y-[2px] hover:border-[#DBB346]! hover:bg-[rgba(219,179,70,0.3)]"
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

              <AccordionDetails className={jc.panelContainer}>
                <ul className={jc.list}>
                  {item.content.map((c, idx) => (
                    <li key={idx} className={`${primary_font.className} ${jc.listItem} last:border-b last:border-b-[#DBB346]`}>
                      <Link
                        href={`/quran/${c.surahSlug}?mode=translation&verse=${c.ayah[0]}`}
                        className={jc.listItemA}
                      >
                        <span className={jc.listItemSpan}>{c.surahNameEnglish}</span>
                        <span className={jc.listItemSpan}>{c.ayah[0]}-{c.ayah[1]} Ayahs</span>
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