"use client";
import { primary_font, roboto } from "@/app/font/font";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const fq = {
  wrapper: "flex justify-center mb-12",
  container: "w-full max-w-[1440px] flex flex-col items-center",
  head: "w-full my-4",
  title: "text-[3rem] text-[#5C6357] mx-2 max-md:text-[2rem]",
  main: "w-full",
  accordion: "py-1 my-3",
  summary: "font-semibold text-[1.2rem] text-[#5C6357] max-md:text-[0.9rem]",
  details: "text-[1.1rem] w-[95%] max-md:text-[0.8rem]",
};

interface FAQItem {
  question: string;
  answer: string;
}

const staticFaqData: FAQItem[] = [
    {
        question: "What is Zakat?",
        answer: "Zakat is a form of obligatory charity in Islam, requiring a portion of one's wealth to be given to those in need, typically calculated as 2.5% of qualifying assets.",
      },
      {
        question: "What is Nisab?",
        answer: "Nisab is the minimum threshold of wealth one must possess before being required to give Zakat. It is traditionally based on the value of 87.48 grams of gold or 612.36 grams of silver. A person is obligated to pay Zakat on their property (excluding their primary residence and other necessary items)",
      },
      {
        question: "When is Zakat paid?",
        answer: "Zakat is paid once a full lunar year has passed while maintaining wealth above the Nisab threshold.",
      },
      {
        question: "How is Zakat calculated on gold?",
        answer: "Zakat on gold is typically 2.5% of its total value, provided the amount meets or exceeds the Nisab threshold.",
      },
      {
        question: "Which assets are subject to Zakat?",
        answer: "Zakat applies to savings, gold, silver, business inventory, investments, and certain agricultural produce, provided they meet specific criteria and thresholds.",
      },
      {
        question: "Who needs to give Zakat?",
        answer: "Anyone who owns wealth above the Nisab threshold for a full lunar year is obligated to give Zakat on that wealth.",
      },
      {
        question: "Who is eligible to receive Zakat?",
        answer: "Recipients include those experiencing poverty, financial hardship, debt, or displacement, as well as others specified in Islamic tradition.",
      },
      {
        question: "How often should Zakat be paid?",
        answer: "Zakat is generally paid once a year, after a full lunar year of maintaining qualifying wealth.",
      },
      {
        question: "Who can receive Zakat?",
        answer: "Eligible recipients include individuals facing economic hardship, debt, or displacement, among other categories defined in Islamic guidance.",
      },
      {
        question: "What is the percentage for Zakat?",
        answer: "The standard rate for Zakat is 2.5% of qualifying wealth held for one full lunar year.",
      },
];

const FAQ = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (panel: number) => {
    setExpanded((prev) => (prev === panel ? false : panel));
  };

  return (
    <div className={fq.wrapper}>
      <div className={fq.container}>
        <div className={fq.head}>
          <h3 className={`${primary_font.className} ${fq.title}`}>FAQ&apos;s</h3>
        </div>
        <div className={fq.main}>
          {staticFaqData.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={() => handleChange(index)}
              className={fq.accordion}
              sx={{
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid var(--grey)",
              }}
            >
              <AccordionSummary
                className={`${fq.summary} ${primary_font.className}`}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                {item.question}
              </AccordionSummary>
              <AccordionDetails className={`${fq.details} ${roboto.className}`}>
                {item.answer}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
