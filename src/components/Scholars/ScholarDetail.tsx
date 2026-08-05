import Image from "next/image";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import type { ScholarList } from "@/types/scholar";

const ERA_LABEL: Record<string, string> = {
  SAHABAH: "Sahabah",
  TABIUN: "Tabi'een",
  TABI_TABIIN: "Tabi' al-Tabi'een",
  CLASSICAL: "Classical Era",
  MEDIEVAL: "Medieval Era",
  CONTEMPORARY: "Contemporary",
};

function formatDates(scholar: ScholarList): { hijri: string; gregorian: string } {
  const hijri =
    scholar.birthYearHijri && scholar.deathYearHijri
      ? `${scholar.birthYearHijri} – ${scholar.deathYearHijri} AH`
      : scholar.deathYearHijri
        ? `d. ${scholar.deathYearHijri} AH`
        : "";
  const gregorian =
    scholar.birthYearGregorian && scholar.deathYearGregorian
      ? `${scholar.birthYearGregorian} – ${scholar.deathYearGregorian} CE`
      : scholar.deathYearGregorian
        ? `d. ${scholar.deathYearGregorian} CE`
        : "";
  return { hijri, gregorian };
}

export default function ScholarDetail({ scholar }: { scholar: ScholarList }) {
  const { hijri, gregorian } = formatDates(scholar);

  return (
    <div className="flex justify-center overflow-x-hidden bg-[#f8f7f4]">
      <div className="flex flex-col w-full max-w-[900px] px-4 py-10 sm:px-6">
        <Link
          href="/scholars"
          className={`${roboto.className} text-sm text-[#8A6D59] hover:underline mb-6 w-fit`}
        >
          ← Back to Scholars
        </Link>

        <div className="flex flex-col sm:flex-row items-start gap-6 bg-white border border-[#C2CDD3] rounded-2xl p-6 sm:p-8 mb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-[rgba(219,179,70,0.12)]">
            {scholar.image ? (
              <Image src={scholar.image} alt={scholar.name} fill sizes="96px" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#DBB346] text-[2rem] font-semibold">
                {(scholar.nameAr ?? scholar.name).charAt(0)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span
              className={`${roboto.className} inline-block text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#8A6D59] bg-[rgba(219,179,70,0.12)] border border-[rgba(219,179,70,0.3)] py-1 px-3 rounded-full mb-3`}
            >
              {ERA_LABEL[scholar.era] ?? scholar.era}
            </span>
            <h1 className={`${primary_font.className} text-[1.8rem] text-[#5C6357] leading-tight`}>
              {scholar.name}
            </h1>
            {scholar.nameAr && (
              <p className={`${roboto.className} text-[1.1rem] text-[#8A6D59] italic mt-1`}>
                {scholar.nameAr}
              </p>
            )}
            {scholar.title && (
              <p className={`${roboto.className} text-sm text-[#DBB346] font-medium mt-2`}>
                {scholar.title}
              </p>
            )}

            <div className={`${roboto.className} flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#7D887A] mt-3`}>
              {hijri && <span>{hijri}</span>}
              {gregorian && <span>{gregorian}</span>}
              {scholar.region && <span className="italic">{scholar.region}</span>}
            </div>
          </div>
        </div>

        {(scholar.biography || scholar.biographySummary) && (
          <section className="mb-8">
            <h2 className={`${primary_font.className} text-[1.3rem] text-[#5C6357] mb-3`}>Biography</h2>
            <div className={`${roboto.className} text-[#3a3a2e] leading-relaxed flex flex-col gap-3`}>
              {(scholar.biography ?? scholar.biographySummary ?? "")
                .split("\n\n")
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </section>
        )}

        {scholar.historicalContext && (
          <section className="mb-8">
            <h2 className={`${primary_font.className} text-[1.3rem] text-[#5C6357] mb-3`}>
              Historical Background
            </h2>
            <p className={`${roboto.className} text-[#3a3a2e] leading-relaxed`}>
              {scholar.historicalContext}
            </p>
          </section>
        )}

        {scholar.contributions && scholar.contributions.length > 0 && (
          <section className="mb-8">
            <h2 className={`${primary_font.className} text-[1.3rem] text-[#5C6357] mb-3`}>
              Key Contributions
            </h2>
            <ul className={`${roboto.className} flex flex-col gap-2 text-[#3a3a2e]`}>
              {scholar.contributions.map((contribution, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-[#DBB346] flex-shrink-0">✦</span>
                  <span className="leading-relaxed">{contribution}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(scholar.teachers?.length || scholar.students?.length) ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            {scholar.teachers && scholar.teachers.length > 0 && (
              <div>
                <h3 className={`${primary_font.className} text-[1.05rem] text-[#5C6357] mb-3`}>Teachers</h3>
                <ul className={`${roboto.className} flex flex-col gap-1.5 text-sm text-[#7D887A]`}>
                  {scholar.teachers.map((teacher) => (
                    <li key={teacher}>• {teacher}</li>
                  ))}
                </ul>
              </div>
            )}
            {scholar.students && scholar.students.length > 0 && (
              <div>
                <h3 className={`${primary_font.className} text-[1.05rem] text-[#5C6357] mb-3`}>Notable Students</h3>
                <ul className={`${roboto.className} flex flex-col gap-1.5 text-sm text-[#7D887A]`}>
                  {scholar.students.map((student) => (
                    <li key={student}>• {student}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ) : null}

        {scholar.notableWorks && scholar.notableWorks.length > 0 && (
          <section className="mb-8">
            <h2 className={`${primary_font.className} text-[1.3rem] text-[#5C6357] mb-3`}>Notable Works</h2>
            <div className="flex flex-col gap-3">
              {scholar.notableWorks.map((work) => (
                <div
                  key={work}
                  className={`${roboto.className} bg-white border-l-4 border-[#DBB346] rounded-r-lg pl-5 py-3 text-[#3a3a2e] italic`}
                >
                  {work}
                </div>
              ))}
            </div>
          </section>
        )}

        {scholar.timeline && scholar.timeline.length > 0 && (
          <section className="mb-8">
            <h2 className={`${primary_font.className} text-[1.3rem] text-[#5C6357] mb-4`}>Timeline</h2>
            <div className="relative pl-6">
              <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-[#DBB346]/40" />
              <div className="flex flex-col gap-5">
                {scholar.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-[-24px] top-1 w-2.5 h-2.5 rounded-full bg-[#DBB346]" />
                    <p className={`${roboto.className} text-xs font-semibold text-[#DBB346] tracking-wide`}>
                      {event.year}
                    </p>
                    <p className={`${roboto.className} text-sm text-[#3a3a2e] leading-relaxed`}>
                      {event.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {scholar.article && (
          <section className="mb-8">
            <Link
              href={`/articles/${scholar.article.slug}`}
              className="inline-flex items-center gap-2 text-sm text-[#8A6D59] hover:underline"
            >
              Read the full article: {scholar.article.title} →
            </Link>
          </section>
        )}

        {scholar.tags && scholar.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {scholar.tags
              .filter((tag) => tag !== "khulafa-rashidun" && tag !== "ashara-mubashshara")
              .map((tag) => (
                <span
                  key={tag}
                  className={`${roboto.className} text-xs text-[#8A6D59] bg-[rgba(219,179,70,0.12)] px-2.5 py-1 rounded-full`}
                >
                  {tag}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
