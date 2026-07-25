import Link from "next/link";

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
  khulafa:      "bg-[rgba(201,168,76,0.15)] text-[#c9a84c] border-[rgba(201,168,76,0.35)]",
  sahabah:      "bg-[rgba(180,140,60,0.12)] text-[#b89040] border-[rgba(180,140,60,0.3)]",
  tabiin:       "bg-[rgba(139,105,20,0.12)] text-[#9b7820] border-[rgba(139,105,20,0.3)]",
  "tabi-tabiin":"bg-[rgba(100,85,40,0.12)] text-[#856830] border-[rgba(100,85,40,0.3)]",
  classical:    "bg-[rgba(74,82,64,0.12)] text-[#6b7860] border-[rgba(74,82,64,0.3)]",
  modern:       "bg-[rgba(60,50,40,0.12)] text-[#7a6848] border-[rgba(60,50,40,0.3)]",
  contemporary: "bg-[rgba(50,60,50,0.12)] text-[#607060] border-[rgba(50,60,50,0.3)]",
};

const cinzelCaps = "font-['Cinzel','Trajan_Pro',serif]";
const serifBody = "font-['EB_Garamond','Georgia',serif]";
const serifDisplay = "font-['Playfair_Display','Georgia',serif]";

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
      className={`block transition-[transform,box-shadow] duration-[250ms] ease-in-out cursor-pointer hover:-translate-y-[3px] hover:shadow-[0_2px_0_rgba(139,105,20,0.4),0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,240,180,0.4)] animate-[fadeSlideUp_0.45s_ease_both] rounded-sm w-full`}
      style={{
        animationDelay: `${index * 60}ms`,
        backgroundColor: "#f5e9d0",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23p)' opacity='0.06'/%3E%3C/svg%3E\"), linear-gradient(160deg, rgba(255,248,220,0.4) 0%, rgba(205,180,130,0.15) 100%)",
        boxShadow: "0 2px 0 rgba(139,105,20,0.3), 0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,240,180,0.3)",
      }}
    >
      {/* Top gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />

      <div className="p-4 md:p-5">
        {/* Badge + year */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`${cinzelCaps} ${badgeClass[scholar.generation] ?? ""} text-[9px] tracking-[0.15em] px-2 py-0.5 border rounded-sm`}
          >
            {scholar.generationLabel}
          </span>
          <span className={`${serifBody} text-[11px] text-[#8b6914] italic`}>
            d. {scholar.deathHijri}
          </span>
        </div>

        {/* Portrait + name row */}
        <div className="flex items-start gap-3 mb-3">
          {/* Portrait circle */}
          <div
            className="border-2 border-[rgba(201,168,76,0.5)] shadow-[0_0_0_1px_rgba(139,105,20,0.3),inset_0_0_20px_rgba(0,0,0,0.3)] flex-shrink-0 w-11 h-11 rounded-full bg-[#1c1005] flex items-center justify-center"
          >
            <span className="text-[1.5rem] text-[rgba(201,168,76,0.7)] leading-[1]">{scholar.arabicName.charAt(0)}</span>
          </div>

          <div className="min-w-0">
            <h3 className={`${serifDisplay} text-[#1c1005] text-[15px] font-semibold leading-snug`}>
              {scholar.name}
            </h3>
            <p className={`${serifBody} text-[#8b6914] text-[12px] italic leading-snug mt-0.5`}>
              {scholar.arabicName}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className={`${serifBody} text-[#3d2b1a] text-[12.5px] leading-snug mb-3`}>
          {scholar.tagline}
        </p>

        {/* Dates row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`${cinzelCaps} text-[10px] text-[#6b5030]`}>
            {scholar.birth}
          </span>
          <span className="text-[#c9a84c] text-xs">–</span>
          <span className={`${cinzelCaps} text-[10px] text-[#6b5030]`}>
            {scholar.death}
          </span>
          <span className="text-[#c9a84c] mx-1 text-[10px]">·</span>
          <span className={`${serifBody} text-[10px] text-[#8b7040] italic truncate`}>
            {scholar.location}
          </span>
        </div>

        {/* Read more indicator */}
        <div className={`mt-3 pt-2.5 border-t border-[#c9a84c]/20 flex items-center justify-between`}>
          <span className={`${serifBody} text-[10px] text-[#8b6914] italic`}>
            {scholar.madhab !== "—" ? scholar.madhab : "Companion"}
          </span>
          <span className={`${cinzelCaps} text-[9px] text-[#8b6914] tracking-widest flex items-center gap-1`}>
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