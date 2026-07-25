import Link from "next/link";
import styles from "./scholars.module.css";

export type Scholar = {
  id             : number;
  slug           : string;
  name           : string;
  arabicName     : string;
  birth          : string;
  birthHijri     : string;
  death          : string;
  deathHijri     : string;
  generation     : string;
  generationLabel: string;
  generationOrder: number;
  tagline        : string;
  location       : string;
  madhab         : string;
  bio            : string;
  teachers       : string[];
  students       : string[];
  works          : string[];
  contributions  : string[];
  quotes         : { arabic: string; english: string }[];
  lifeEvents     : { year: string; event: string }[];
  relatedSlugs   : string[];
};

const badgeClass: Record<string, string> = {
  khulafa:      styles["badge-khulafa"],
  sahabah:      styles["badge-sahabah"],
  tabiin:       styles["badge-tabiin"],
  "tabi-tabiin":styles["badge-tabi-tabiin"],
  classical:    styles["badge-classical"],
  modern:       styles["badge-modern"],
  contemporary: styles["badge-contemporary"],
};

interface ScholarCardProps {
  scholar : Scholar;
  index   : number;
  side    : "left" | "right";
}

const ScholarCard = ({ scholar, index, side }: ScholarCardProps) => {
  const isLeft = side === "left";

  return (
    <Link
      href={`/scholars/${scholar.slug}`}
      className={`block ${styles.scholarCard} ${styles.parchmentCard} ${styles.cardEnter} rounded-sm w-full`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />

      <div className="p-4 md:p-5">
        {/* Badge + year */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`${styles.cinzelCaps} ${badgeClass[scholar.generation] ?? ""} text-[9px] tracking-[0.15em] px-2 py-0.5 border rounded-sm`}
          >
            {scholar.generationLabel}
          </span>
          <span className={`${styles.serifBody} text-[11px] text-[#8b6914] italic`}>
            d. {scholar.deathHijri}
          </span>
        </div>

        {/* Portrait + name row */}
        <div className="flex items-start gap-3 mb-3">
          {/* Portrait circle */}
          <div
            className={`${styles.portraitRing} flex-shrink-0 w-11 h-11 rounded-full bg-[#1c1005] flex items-center justify-center`}
          >
            <span className={styles.arabicInitial}>{scholar.arabicName.charAt(0)}</span>
          </div>

          <div className="min-w-0">
            <h3 className={`${styles.serifDisplay} text-[#1c1005] text-[15px] font-semibold leading-snug`}>
              {scholar.name}
            </h3>
            <p className={`${styles.serifBody} text-[#8b6914] text-[12px] italic leading-snug mt-0.5`}>
              {scholar.arabicName}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className={`${styles.serifBody} text-[#3d2b1a] text-[12.5px] leading-snug mb-3`}>
          {scholar.tagline}
        </p>

        {/* Dates row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`${styles.cinzelCaps} text-[10px] text-[#6b5030]`}>
            {scholar.birth}
          </span>
          <span className="text-[#c9a84c] text-xs">–</span>
          <span className={`${styles.cinzelCaps} text-[10px] text-[#6b5030]`}>
            {scholar.death}
          </span>
          <span className="text-[#c9a84c] mx-1 text-[10px]">·</span>
          <span className={`${styles.serifBody} text-[10px] text-[#8b7040] italic truncate`}>
            {scholar.location}
          </span>
        </div>

        {/* Read more indicator */}
        <div className={`mt-3 pt-2.5 border-t border-[#c9a84c]/20 flex items-center justify-between`}>
          <span className={`${styles.serifBody} text-[10px] text-[#8b6914] italic`}>
            {scholar.madhab !== "—" ? scholar.madhab : "Companion"}
          </span>
          <span className={`${styles.cinzelCaps} text-[9px] text-[#8b6914] tracking-widest flex items-center gap-1`}>
            Read more
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ScholarCard;