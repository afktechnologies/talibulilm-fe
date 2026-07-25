import Image from "next/image";
import donationHero from "../../../public/Images/donation/hero.png";
import qrCode from "../../../public/Images/donation/qr-code.png";
import readingQuran from "../../../public/Images/donation/reading-quran.png";
import polygon1 from "../../../public/Images/donation/polygon-1.png";
import polygon2 from "../../../public/Images/donation/polygon-2.png";
import polygon3 from "../../../public/Images/donation/polygon-3.png";
import polygon4 from "../../../public/Images/donation/polygon-4.png";

const s = {
  page: "font-['Georgia','Times_New_Roman',serif] text-[#1a2228] bg-white min-h-screen",
  sectionLabel: "inline-block font-['Arial',sans-serif] text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#3d7a68] bg-[#f0f8f5] border border-[#d4ede7] py-[5px] px-[14px] rounded-[100px] mb-[14px]",

  heroSection: "relative bg-[linear-gradient(135deg,#5f8a7a_0%,#3d7a68_55%,#2d6357_100%)] py-16 px-10 overflow-hidden max-md:py-10 max-md:px-5 max-[480px]:py-7 max-[480px]:px-[14px]",
  heroBgCircle1: "absolute top-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none",
  heroBgCircle2: "absolute bottom-[-80px] right-[10%] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(198,162,39,0.12)_0%,transparent_65%)] pointer-events-none",
  heroBgDots: "absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:28px_28px] pointer-events-none",
  heroCard: "relative bg-[rgba(255,255,255,0.97)] rounded-[20px] max-w-[860px] mx-auto flex items-center gap-10 py-10 px-11 shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,48,56,0.18)] overflow-hidden max-[1100px]:max-w-[95%] max-md:flex-col max-md:py-7 max-md:px-6 max-md:gap-6 max-md:text-center max-[480px]:py-[22px] max-[480px]:px-[18px]",
  heroCardAccent: "absolute left-0 top-0 bottom-0 w-[5px] bg-[linear-gradient(180deg,#f0c040_0%,#c9a227_100%)] rounded-tl-[20px] rounded-bl-[20px]",
  heroIllustration: "relative flex-shrink-0",
  heroImgRing: "absolute inset-[-14px] rounded-full border-2 border-dashed border-[rgba(198,162,39,0.25)] animate-[spinRing_25s_linear_infinite] pointer-events-none",
  heroImg: "block rounded-xl relative z-[1]",
  heroText: "flex-1",
  heroEyebrow: "inline-flex items-center gap-[7px] font-['Arial',sans-serif] text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#3d7a68] bg-[#f0f8f5] border border-[#d4ede7] py-[5px] px-3 rounded-[100px] mb-[18px]",
  quoteText: "text-[1.2rem] font-bold italic leading-[1.75] text-[#1a2228] mt-0 mr-0 mb-5 ml-0 relative pl-5 before:content-['\\201C'] before:absolute before:left-[-6px] before:top-[-10px] before:text-[4rem] before:text-[#c9a227] before:opacity-25 before:font-['Georgia',serif] before:leading-[1] before:pointer-events-none max-md:pl-0 max-md:before:left-1/2 max-md:before:-translate-x-1/2 max-[480px]:text-[1rem]",
  quoteSourceRow: "flex items-center gap-3",
  quoteSourceLine: "flex-1 h-px bg-[linear-gradient(90deg,transparent,#e4ecef)] last:bg-[linear-gradient(90deg,#e4ecef,transparent)]",
  quoteSource: "font-['Arial',sans-serif] text-[0.78rem] font-bold text-[#7a8c96] tracking-[0.06em] uppercase whitespace-nowrap m-0",

  milestones: "py-20 px-12 bg-[#fafaf7] text-center relative max-md:py-14 max-md:px-6 max-[480px]:py-11 max-[480px]:px-4",
  milestonesHeading: "text-[2.4rem] font-bold text-[#1a2228] mt-0 mr-0 mb-3 ml-0 leading-[1.25] max-[480px]:text-[1.8rem]",
  milestonesSubHeading: "text-[#c9a227] italic",
  milestonesSubText: "font-['Arial',sans-serif] text-[1rem] text-[#7a8c96] mt-0 mr-auto mb-12 ml-auto max-w-[460px] leading-[1.7]",
  milestonesGrid: "grid grid-cols-3 gap-8 max-w-[900px] mx-auto max-md:grid-cols-1 max-md:max-w-[420px] max-[480px]:max-w-full",
  milestoneCard: "group relative bg-white rounded-2xl pt-8 pr-[26px] pb-7 pl-[26px] text-left border border-[#e4ecef] overflow-hidden transition-[transform,box-shadow] duration-[280ms] ease-in-out shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[6px] hover:shadow-[0_16px_48px_rgba(0,48,56,0.12)]",
  milestoneNumTag: "absolute top-4 right-5 font-['Georgia',serif] text-[2.4rem] font-bold italic text-[#e4ecef] leading-[1] pointer-events-none select-none",
  milestoneIconWrap: "w-[60px] h-[60px] rounded-[14px] flex items-center justify-center mb-[18px]",
  milestoneTitle: "text-[1.25rem] font-bold italic mt-0 mr-0 mb-2 ml-0",
  milestoneDesc: "font-['Arial',sans-serif] text-[0.9rem] text-[#4a5a64] mt-0 mr-0 mb-5 ml-0 leading-[1.6]",
  milestoneBar: "absolute bottom-0 left-0 h-[3px] w-0 rounded-br-[16px] transition-[width] duration-[400ms] ease-in-out group-hover:w-full",

  supportBanner: "relative bg-[linear-gradient(135deg,#3d7a68_0%,#2d6357_40%,#3a7a6a_100%)] py-20 px-14 overflow-hidden max-md:py-[52px] max-md:px-7 max-[480px]:py-10 max-[480px]:px-[18px]",
  supportBgPattern: "absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none",
  supportBgGlow: "absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(198,162,39,0.14)_0%,transparent_65%)] pointer-events-none",
  supportInner: "relative z-[2] max-w-[1100px] mx-auto flex items-center justify-between gap-14 max-[1100px]:gap-10 max-md:flex-col max-md:gap-9",
  supportLeft: "flex-1 max-w-[560px] max-md:max-w-full",
  supportEyebrow: "inline-block font-['Arial',sans-serif] text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#f0c040] bg-[rgba(198,162,39,0.15)] border border-[rgba(198,162,39,0.3)] py-[5px] px-[14px] rounded-[100px] mb-5",
  supportTitle: "text-[0] mt-0 mr-0 mb-5 ml-0 leading-[1] flex flex-col gap-1",
  supportTitleEm: "text-[1.9rem] italic text-[#f0c040] block",
  supportSubtitle: "text-[2.6rem] font-bold not-italic text-white block leading-[1.15] max-[1100px]:text-[2.1rem] max-[480px]:text-[1.8rem]",
  supportDivider: "w-[52px] h-[3px] bg-[linear-gradient(90deg,#f0c040,rgba(255,255,255,0.2))] rounded-[2px] mb-5",
  supportDesc: "font-['Arial',sans-serif] text-[1rem] text-[rgba(232,240,236,0.9)] leading-[1.8] mt-0 mr-0 mb-9 ml-0",
  supportRight: "flex-shrink-0 relative",
  supportImgFrame: "group relative inline-block",
  supportImgGlow: "absolute inset-[-20px] rounded-full bg-[radial-gradient(circle,rgba(198,162,39,0.18)_0%,transparent_65%)] pointer-events-none",
  supportIllustration: "block rounded-2xl relative z-[1] [filter:drop-shadow(0_12px_40px_rgba(0,0,0,0.22))] transition-transform duration-[350ms] ease-in-out group-hover:-translate-y-[6px] group-hover:scale-[1.01]",

  supportGoals: "relative py-20 px-12 text-center bg-white overflow-hidden max-md:py-14 max-md:px-5 max-[480px]:py-11 max-[480px]:px-4",
  goalsTopAccent: "absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-1 bg-[linear-gradient(90deg,transparent,#c9a227,transparent)] rounded-bl-[4px] rounded-br-[4px]",
  goalsHeading: "text-[2.4rem] font-bold text-[#1a2228] mt-0 mr-0 mb-[52px] ml-0 italic leading-[1.25] max-[480px]:text-[1.8rem]",
  goalsHighlight: "text-[#c9a227] italic",
  goalsGrid: "grid grid-cols-2 max-w-[800px] mx-auto border border-[#e4ecef] rounded-[20px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.05)] max-[1100px]:max-w-[95%] max-md:grid-cols-1 max-md:max-w-[420px] max-[480px]:max-w-full",
  goalItem: "flex items-center justify-center gap-6 py-9 px-7 bg-white border-b border-[#e4ecef] border-r border-[#e4ecef] transition-colors duration-[220ms] ease-in-out hover:bg-[#f0f8f5] [&:nth-child(even)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 max-md:border-r-0! max-md:border-b max-md:border-b-[#e4ecef] max-md:last:border-b-0",
  goalTextWrap: "flex flex-col items-start gap-[6px] max-w-[180px] max-md:max-w-full max-md:items-center",
  goalNumber: "font-['Georgia',serif] text-[0.75rem] font-bold text-[#c9a227] tracking-[0.1em] opacity-80",
  goalText: "font-['Arial',sans-serif] text-[0.92rem] text-[#4a5a64] text-left m-0 leading-[1.6] font-semibold max-md:text-center",
  goalDiamond: "flex-shrink-0 rotate-45 w-[88px] h-[88px] overflow-hidden rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-300 ease-in-out hover:scale-[1.07] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] max-[480px]:w-[70px] max-[480px]:h-[70px]",
  goalDiamondImg: "rotate-[-45deg] scale-[1.42] [transform-origin:center] block",

  contactSection: "relative bg-[linear-gradient(145deg,#071820_0%,#0d2b38_50%,#0f3040_100%)] py-20 px-12 overflow-hidden max-md:py-14 max-md:px-6 max-[480px]:py-12 max-[480px]:px-4",
  contactOrb1: "absolute top-[-100px] right-[-80px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(198,162,39,0.12)_0%,transparent_65%)] pointer-events-none",
  contactOrb2: "absolute bottom-[-120px] left-[-60px] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(95,138,122,0.18)_0%,transparent_65%)] pointer-events-none",
  contactInner: "relative z-[2] max-w-[1100px] mx-auto flex items-center gap-[72px] max-[1100px]:gap-11 max-md:flex-col max-md:gap-10",
  contactLeft: "flex-1 flex flex-col items-start max-md:items-center max-md:text-center",
  contactEyebrow: "font-['Arial',sans-serif] text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#c9a227] bg-[rgba(198,162,39,0.12)] border border-[rgba(198,162,39,0.3)] py-[5px] px-[14px] rounded-[100px] mb-5",
  contactHeading: "text-[2.6rem] font-bold text-white leading-[1.2] mt-0 mr-0 mb-5 ml-0 max-[1100px]:text-[2.1rem] max-[480px]:text-[1.8rem]",
  contactHeadingGold: "text-[#c9a227] italic",
  contactDesc: "font-['Arial',sans-serif] text-[1rem] text-[#a8c4cc] leading-[1.8] mt-0 mr-0 mb-7 ml-0 max-w-[460px] max-md:text-center",
  contactDivider: "w-[52px] h-[2px] bg-[linear-gradient(90deg,#5f8a7a,#c9a227)] rounded-[2px] mb-8 max-md:mx-auto",
  whatsappBtn: "group inline-flex items-center gap-4 py-[14px] px-[22px] bg-[linear-gradient(135deg,#1db954_0%,#128c3e_100%)] text-white rounded-[14px] no-underline shadow-[0_6px_28px_rgba(29,185,84,0.3)] transition-[transform,box-shadow] duration-[220ms] ease-in-out w-full max-w-[380px] hover:-translate-y-[3px] hover:shadow-[0_10px_36px_rgba(29,185,84,0.4)] max-md:max-w-full",
  whatsappIconWrap: "flex-shrink-0 w-11 h-11 bg-[rgba(255,255,255,0.15)] rounded-[10px] flex items-center justify-center",
  whatsappTextBlock: "flex flex-col gap-[2px] flex-1",
  whatsappLabel: "font-['Arial',sans-serif] text-[0.72rem] font-semibold tracking-[0.05em] uppercase opacity-85",
  whatsappNumber: "font-['Georgia',serif] text-[1.15rem] font-bold tracking-[0.02em]",
  whatsappArrow: "flex-shrink-0 opacity-85 transition-transform duration-[220ms] ease-in-out group-hover:translate-x-[5px]",
  contactNote: "font-['Arial',sans-serif] text-[0.8rem] text-[#6a9aaa] mt-[14px] mr-0 mb-0 ml-0",
  contactRight: "flex-shrink-0 w-[320px] max-md:w-full max-md:max-w-[340px]",
  donateCard: "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] [backdrop-filter:blur(12px)] [-webkit-backdrop-filter:blur(12px)] rounded-[20px] py-8 px-7 flex flex-col items-center gap-6 shadow-[0_8px_40px_rgba(0,0,0,0.25)] max-[480px]:py-6 max-[480px]:px-4",
  donateCardTop: "text-center",
  donateCardBadge: "inline-block font-['Arial',sans-serif] text-[0.68rem] font-bold tracking-[0.12em] uppercase text-[#c9a227] bg-[rgba(198,162,39,0.12)] border border-[rgba(198,162,39,0.3)] py-1 px-3 rounded-[100px] mb-[10px]",
  donateCardTitle: "text-[1.5rem] font-bold text-white mt-0 mr-0 mb-[6px] ml-0 italic",
  donateCardSub: "font-['Arial',sans-serif] text-[0.82rem] text-[#8ab4be] m-0 leading-[1.5]",
  qrWrapper: "relative flex items-center justify-center",
  qrGlow: "absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(198,162,39,0.18)_0%,transparent_70%)] pointer-events-none",
  qrImg: "relative z-[2] rounded-xl bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
  upiList: "w-full flex flex-col gap-[10px]",
  upiChip: "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-[10px] py-[10px] px-[14px] flex flex-col gap-[3px]",
  upiChipLabel: "font-['Arial',sans-serif] text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[#7aaab8]",
  upiChipValue: "font-['Georgia',serif] text-[0.95rem] font-bold text-[#e8e8e8] tracking-[0.02em]",
  donateCardFooter: "flex items-center gap-[7px] font-['Arial',sans-serif] text-[0.75rem] text-[#6a9aaa] pt-1 border-t border-[rgba(255,255,255,0.07)] w-full justify-center",
};

export default function DonationPage() {
  return (
    <div className={s.page}>

      {/* ═══════════════════════════════════════
          HERO / QUOTE SECTION
      ═══════════════════════════════════════ */}
      <section className={s.heroSection}>
        {/* Decorative background geometry */}
        <div className={s.heroBgCircle1} />
        <div className={s.heroBgCircle2} />
        <div className={s.heroBgDots} />

        <div className={s.heroCard}>
          {/* Gold accent bar on left edge */}
          <div className={s.heroCardAccent} />

          <div className={s.heroIllustration}>
            <div className={s.heroImgRing} />
            <Image
              src={donationHero}
              alt="Family giving charity illustration"
              width={320}
              height={280}
              className={s.heroImg}
            />
          </div>

          <div className={s.heroText}>
            <span className={s.heroEyebrow}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
              </svg>
              Hadith of the Prophet ﷺ
            </span>

            <blockquote className={s.quoteText}>
              &ldquo;When a man dies, his acts come to an end, except for three —
              recurring charity, or knowledge by which people benefit, or a
              pious child who prays for him.&rdquo;
            </blockquote>

            <div className={s.quoteSourceRow}>
              <div className={s.quoteSourceLine} />
              <p className={s.quoteSource}>Sahih Muslim — 1631</p>
              <div className={s.quoteSourceLine} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MILESTONES SECTION
      ═══════════════════════════════════════ */}
      <section className={s.milestones}>
        <div className={s.sectionLabel}>What We&apos;ve Built</div>
        <h2 className={s.milestonesHeading}>
          Our Important{" "}
          <em className={s.milestonesSubHeading}>Milestones</em>
        </h2>
        <p className={s.milestonesSubText}>
          Alhamdulillah — here&apos;s what your support has helped us achieve so far.
        </p>

        <div className={s.milestonesGrid}>
          {[
            {
              title: "Quran",
              icon: "quran-icon.png",
              desp: "Quran with tafseer and translation",
              num: "01",
              color: "#e8f5e9",
              accent: "#2e7d32",
            },
            {
              title: "Hadith",
              icon: "hadith-icon.png",
              desp: "Authentic sunnah of the Prophet (S.A.W)",
              num: "02",
              color: "#fff8e1",
              accent: "#f57f17",
            },
            {
              title: "Supplications",
              icon: "supplication-icon.png",
              desp: "Prophetic dua and prayers for daily life",
              num: "03",
              color: "#e3f2fd",
              accent: "#1565c0",
            },
            {
              title: "Scholars",
              icon: "scholar-icon.png",
              desp: "The great Scholars of Islam are enlisted ",
              num: "04",
             color: "#e8f5e9",
              accent: "#2e7d32",
            },
            {
              title: "QnA",
              icon: "QnA.png",
              desp: "QnA Sessions are incoporated with Salaf Scholars",
              num: "05",
             color: "#fff8e1",
              accent: "#f57f17",
            },
            {
              title: "Digital Books",
              icon: "digital-book-icon.png",
              desp: "Digital Islamic Books now available in every hands",
              num: "06",
              color: "#e3f2fd",
              accent: "#1565c0",
            },
          ].map((item) => (
            <div key={item.title} className={s.milestoneCard}>
              <div className={s.milestoneNumTag}>{item.num}</div>
              <div
                className={s.milestoneIconWrap}
                style={{ background: item.color }}
              >
                <Image
                  src={`/Images/donation/${item.icon}`}
                  alt={item.title}
                  width={46}
                  height={46}
                />
              </div>
              <h3
                className={s.milestoneTitle}
                style={{ color: item.accent }}
              >
                {item.title}
              </h3>
              <p className={s.milestoneDesc}>{item.desp}</p>
              <div
                className={s.milestoneBar}
                style={{ background: item.accent }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SUPPORT BANNER
      ═══════════════════════════════════════ */}
      <section className={s.supportBanner}>
        {/* Layered background decorations */}
        <div className={s.supportBgPattern} />
        <div className={s.supportBgGlow} />

        <div className={s.supportInner}>
          <div className={s.supportLeft}>
            <span className={s.supportEyebrow}>Our Mission</span>
            <h2 className={s.supportTitle}>
              <em className={s.supportTitleEm}>Support us,</em>
              <span className={s.supportSubtitle}>We need your help</span>
            </h2>

            <div className={s.supportDivider} />

            <p className={s.supportDesc}>
              Allahumdulillah, with the mercy of Allah, Talibulilm.in has
              reached an important milestone. Our Qur&apos;an and Hadith sections
              are close to completion, and our aim is to provide Muslims around
              the world with authentic Islamic knowledge based on the Qur&apos;an
              and Sunnah upon the Manhaj of the Salaf.
            </p>

            {/* Impact stats row */}
            {/* <div className={styles.supportStats}>
              {[
                { val: "10K+", label: "Monthly Readers" },
                { val: "500+", label: "Resources" },
                { val: "3+",   label: "Years Online" },
              ].map((s) => (
                <div key={s.label} className={styles.supportStat}>
                  <span className={styles.supportStatVal}>{s.val}</span>
                  <span className={styles.supportStatLabel}>{s.label}</span>
                </div>
              ))}
            </div> */}
          </div>

          <div className={s.supportRight}>
            <div className={s.supportImgFrame}>
              <div className={s.supportImgGlow} />
              <Image
                src={readingQuran}
                alt="Person reading Quran"
                width={400}
                height={400}
                className={s.supportIllustration}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WITH YOUR SUPPORT — GOALS
      ═══════════════════════════════════════ */}
      <section className={s.supportGoals}>
        <div className={s.goalsTopAccent} />

        <div className={s.sectionLabel} style={{ color: "#c9a227" }}>
          Your Impact
        </div>
        <h2 className={s.goalsHeading}>
          <em>With your Support,</em>
          <span className={s.goalsHighlight}> We will:</span>
        </h2>

        <div className={s.goalsGrid}>
          {/* Row 1 */}
          <div className={s.goalItem}>
            <div className={s.goalTextWrap}>
              <span className={s.goalNumber}>01</span>
              <p className={s.goalText}>
                Expand Qur&apos;an Tafseer and Hadith resources
              </p>
            </div>
            <div className={s.goalDiamond}>
              <Image src={polygon1} alt="Expand Quran resources" width={120} height={120} className={s.goalDiamondImg} />
            </div>
          </div>

          <div className={s.goalItem}>
            <div className={s.goalDiamond}>
              <Image src={polygon2} alt="Q&A section" width={120} height={120} className={s.goalDiamondImg} />
            </div>
            <div className={s.goalTextWrap}>
              <span className={s.goalNumber}>02</span>
              <p className={s.goalText}>
                Introduce a Q&amp;A section for Islamic questions with
                evidence-based answers
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className={s.goalItem}>
            <div className={s.goalTextWrap}>
              <span className={s.goalNumber}>03</span>
              <p className={s.goalText}>
                Add authentic biographies and scholarly content
              </p>
            </div>
            <div className={s.goalDiamond}>
              <Image src={polygon3} alt="Scholarly content" width={120} height={120} className={s.goalDiamondImg} />
            </div>
          </div>

          <div className={s.goalItem}>
            <div className={s.goalDiamond}>
              <Image src={polygon4} alt="Website maintenance" width={120} height={120} className={s.goalDiamondImg} />
            </div>
            <div className={s.goalTextWrap}>
              <span className={s.goalNumber}>04</span>
              <p className={s.goalText}>
                Maintain and enhance the website for long-term benefit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT & DONATE SECTION
      ═══════════════════════════════════════ */}
      <section className={s.contactSection}>
        <div className={s.contactOrb1} />
        <div className={s.contactOrb2} />

        <div className={s.contactInner}>

          {/* Left — text + WhatsApp CTA */}
          <div className={s.contactLeft}>
            <span className={s.contactEyebrow}>✦ &nbsp;Get in Touch</span>

            <h2 className={s.contactHeading}>
              Have questions about <br />
              <em className={s.contactHeadingGold}>donating?</em>
            </h2>

            <p className={s.contactDesc}>
              For any queries regarding donations, collaborations, or our
              learning resources, reach out to us directly. We&apos;re happy to
              guide you through the process — In Sha Allah.
            </p>

            <div className={s.contactDivider} />

            <a
              href="https://wa.me/917219485252"
              target="_blank"
              rel="noopener noreferrer"
              className={s.whatsappBtn}
            >
              <span className={s.whatsappIconWrap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                  width="26" height="26" fill="currentColor" aria-hidden="true">
                  <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.797 1.783 6.81L2 30l7.393-1.742A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.394a11.33 11.33 0 0 1-5.79-1.587l-.414-.247-4.388 1.034 1.063-4.265-.27-.437A11.367 11.367 0 0 1 4.61 16.003c0-6.285 5.108-11.394 11.393-11.394 6.284 0 11.393 5.11 11.393 11.394 0 6.285-5.11 11.391-11.393 11.391zm6.254-8.528c-.343-.172-2.03-1.002-2.344-1.116-.315-.115-.544-.172-.773.172-.229.343-.886 1.116-1.086 1.345-.2.23-.4.258-.743.086-.343-.172-1.449-.534-2.76-1.703-1.02-.91-1.708-2.035-1.909-2.378-.2-.343-.021-.528.15-.699.155-.153.343-.4.515-.6.172-.2.229-.343.343-.572.115-.23.057-.43-.029-.6-.086-.172-.773-1.862-1.058-2.549-.279-.67-.562-.578-.773-.589l-.658-.01c-.229 0-.6.086-.915.43-.315.343-1.2 1.172-1.2 2.857 0 1.685 1.229 3.313 1.4 3.542.172.23 2.42 3.693 5.864 5.18.82.354 1.458.565 1.957.722.823.261 1.572.225 2.163.136.66-.099 2.03-.83 2.316-1.632.286-.8.286-1.487.2-1.632-.086-.143-.315-.229-.658-.4z" />
                </svg>
              </span>
              <div className={s.whatsappTextBlock}>
                <span className={s.whatsappLabel}>Message us on WhatsApp</span>
                <span className={s.whatsappNumber}>+91 72194 85252</span>
              </div>
              <svg className={s.whatsappArrow} width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <p className={s.contactNote}>
              We typically respond within a few hours
            </p>
          </div>

          {/* Right — QR donate card */}
          <div className={s.contactRight}>
            <div className={s.donateCard}>
              <div className={s.donateCardTop}>
                <span className={s.donateCardBadge}>Direct Donation</span>
                <h3 className={s.donateCardTitle}>Scan &amp; Pay</h3>
                <p className={s.donateCardSub}>
                  Use any UPI app to scan the QR and donate instantly.
                </p>
              </div>

              <div className={s.qrWrapper}>
                <div className={s.qrGlow} />
                <Image src={qrCode} alt="Donation QR Code"
                  width={175} height={175} className={s.qrImg} />
              </div>

              <div className={s.upiList}>
                <div className={s.upiChip}>
                  <span className={s.upiChipLabel}>UPI ID</span>
                  <span className={s.upiChipValue}>talibulilm@indie</span>
                </div>
                <div className={s.upiChip}>
                  <span className={s.upiChipLabel}>PhonePe / Paytm</span>
                  <span className={s.upiChipValue}>7219485252</span>
                </div>
              </div>

              <div className={s.donateCardFooter}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Secure &amp; instant UPI transfer</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
