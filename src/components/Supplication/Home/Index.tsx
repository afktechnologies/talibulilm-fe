"use client";

import { useState } from "react";
import Link from "next/link";
import { roboto, primary_font } from "@/app/font/font";
import type { DuaItem } from "@/app/supplication/page";

interface OtherAdhkaarProps {
  /** Pass the slice after the first 8 from the parent page (or swap for an API response). */
  items: DuaItem[];
}

const oa = {
  wrapper: "flex justify-center overflow-x-hidden bg-white pt-12 px-6 pb-20 max-md:pt-10 max-md:px-4 max-md:pb-16",
  container: "flex flex-col w-full max-w-[1300px]",
  headingRow: "mb-8 pl-1",
  sectionTitle: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[#003049] tracking-[-0.01em] mb-2",
  titleUnderline: "w-14 h-[3px] bg-[linear-gradient(90deg,#c69e30_0%,#e8c55a_100%)] rounded-[2px]",
  accordionList: "flex flex-col gap-3",
  accordionItem: "rounded-xl border overflow-hidden transition-[box-shadow,border-color] duration-200 ease-in-out hover:border-[#c69e30] hover:shadow-[0_4px_18px_rgba(198,158,48,0.12)]",
  accordionItemBase: "border-[#ebebeb] bg-[#fdfdfc]",
  accordionItemOpen: "border-[#c69e30] shadow-[0_4px_18px_rgba(198,158,48,0.12)]",
  accordionTrigger: "flex items-center gap-4 w-full py-4 px-5 bg-transparent border-none cursor-pointer text-left transition-colors duration-150 ease-in-out hover:bg-[#fffdf4] max-[480px]:gap-3 max-[480px]:py-[0.85rem] max-[480px]:px-4",
  iconBubble: "flex items-center justify-center w-[2.6rem] h-[2.6rem] rounded-[10px] bg-[linear-gradient(135deg,#fff8e1_0%,#fef3c7_100%)] text-[1.3rem] flex-shrink-0 shadow-[0_1px_4px_rgba(198,158,48,0.2)] max-md:w-[2.2rem] max-md:h-[2.2rem] max-md:text-[1.1rem] max-[480px]:w-8 max-[480px]:h-8 max-[480px]:text-[1rem] max-[480px]:rounded-[8px]",
  itemTitle: "flex-1 text-[1rem] font-medium text-[#1c1c1c] tracking-[0.01em] max-md:text-[0.9rem] max-[480px]:text-[0.85rem]",
  chevron: "flex items-center text-[#9b9b9b] flex-shrink-0 transition-[transform,color] duration-[250ms] ease-in-out",
  chevronOpen: "rotate-90 text-[#c69e30]",
  accordionPanel: "overflow-hidden transition-[max-height] duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
  panelInner: "pt-1 pr-5 pb-5 pl-[4.85rem] text-[#555] text-[0.95rem] leading-[1.75] border-t border-dashed border-[#f0e8cc] max-md:pl-5",
  viewButton: "inline-flex items-center gap-2 mt-4 py-[0.55rem] px-[1.1rem] text-[0.875rem] font-semibold text-white bg-[linear-gradient(135deg,#003049_0%,#0a4a6e_100%)] rounded-lg transition-[opacity,transform,box-shadow] duration-[180ms] ease-in-out shadow-[0_2px_8px_rgba(0,48,73,0.2)] no-underline hover:opacity-[0.88] hover:translate-x-[3px] hover:shadow-[0_4px_14px_rgba(0,48,73,0.28)] hover:[&>svg]:translate-x-[3px]",
  viewButtonSvg: "transition-transform duration-[180ms] ease-in-out flex-shrink-0",
};

const OtherAdhkaar = ({ items }: OtherAdhkaarProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={oa.wrapper}>
      <div className={oa.container}>
        {/* Section heading */}
        <div className={oa.headingRow}>
          <h2 className={`${primary_font.className} ${oa.sectionTitle}`}>
            Other Adhkaar
          </h2>
          <div className={oa.titleUnderline} />
        </div>

        {/* Accordion list */}
        {items.length === 0 ? (
          <p className="text-sm text-gray-400">No more categories to show yet.</p>
        ) : (
        <div className={oa.accordionList} role="list">
          {items.map((item, index) => (
            <div
              key={item.title || index}
              className={`${oa.accordionItem} ${openIndex === index ? oa.accordionItemOpen : oa.accordionItemBase}`}
              role="listitem"
            >
              {/* Row / trigger */}
              <button
                className={oa.accordionTrigger}
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`adhkaar-panel-${index}`}
              >
                {/* Left: icon bubble */}
                <span className={oa.iconBubble} aria-hidden="true">
                  {item.icon}
                </span>

                {/* Title */}
                <span className={`${roboto.className} ${oa.itemTitle}`}>
                  {item.title}
                </span>

                {/* Chevron */}
                <span
                  className={`${oa.chevron} ${openIndex === index ? oa.chevronOpen : ""}`}
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
                className={`${oa.accordionPanel} ${openIndex === index ? "max-h-[500px]" : "max-h-0"}`}
                role="region"
                aria-hidden={openIndex !== index}
              >
                <div className={oa.panelInner}>
                  <p className={`${roboto.className} mt-3`}>
                    Explore the complete collection of <strong>{item.title}</strong> supplications, with Arabic text, transliteration, and translation.
                  </p>
                  <Link
                    href={`/supplication/${item.slug}`}
                    className={oa.viewButton}
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
                      className={oa.viewButtonSvg}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default OtherAdhkaar;