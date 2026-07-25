import Image from "next/image";
import donationImage from "../../../public/Images/HomeDonation.png";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";

const DonationComponent = () => {
  return (
    <section className="flex justify-center items-center w-full py-20 px-12 bg-[linear-gradient(135deg,#ffffff_60%,#f4f8fb_100%)] relative overflow-hidden before:content-[''] before:absolute before:top-[-80px] before:right-[-80px] before:w-[340px] before:h-[340px] before:rounded-full before:bg-[radial-gradient(circle,rgba(44,125,160,0.07)_0%,transparent_70%)] before:pointer-events-none after:content-[''] after:absolute after:bottom-[-60px] after:left-[-60px] after:w-[260px] after:h-[260px] after:rounded-full after:bg-[radial-gradient(circle,rgba(198,158,48,0.07)_0%,transparent_70%)] after:pointer-events-none max-[1024px]:py-16 max-[1024px]:px-8 max-md:py-12 max-md:px-6 max-[480px]:py-10 max-[480px]:px-4">
      <div className="flex items-center justify-between max-w-[1200px] w-full gap-12 max-md:flex-col max-md:items-center max-md:gap-8 max-md:text-center">

        {/* Image Side */}
        <div className="flex-none relative w-[420px] h-[420px] flex items-center justify-center max-[1024px]:w-[340px] max-[1024px]:h-[340px] max-md:w-[280px] max-md:h-[280px] max-[480px]:w-[220px] max-[480px]:h-[220px]">
          <div className="relative w-full h-full z-[2] [filter:drop-shadow(0_12px_32px_rgba(0,48,73,0.12))] transition-transform duration-[400ms] ease hover:-translate-y-[6px]">
            <Image
              src={donationImage}
              alt="Donation Illustration"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          {/* Decorative accent ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] h-[370px] rounded-full border-[2.5px] border-dashed border-[rgba(198,158,48,0.3)] z-[1] animate-[spinSlow_30s_linear_infinite] max-[1024px]:w-[300px] max-[1024px]:h-[300px] max-md:w-[250px] max-md:h-[250px] max-[480px]:w-[200px] max-[480px]:h-[200px]" />
        </div>

        {/* Content Side */}
        <div className="flex-1 flex flex-col items-start gap-0 max-md:items-center">
          {/* Eyebrow badge */}
          <span className={`${roboto.className} inline-flex items-center gap-[6px] bg-[rgba(198,158,48,0.12)] text-[#c69e30] border border-[rgba(198,158,48,0.35)] text-[0.72rem] font-bold tracking-[0.12em] uppercase py-[5px] px-[13px] rounded-[100px] mb-4 before:content-['✦'] before:text-[0.6rem]`}>
            Sadaqah Jariyah
          </span>

          <h2 className={`${roboto.className} text-[2.3rem] text-[#003049] tracking-[0.06em] leading-[1.15] m-0 max-[1024px]:text-[1.9rem] max-md:text-[1.7rem] max-[480px]:text-[1.4rem]`}>
            EMPOWER AUTHENTIC
          </h2>
          <h1 className={`${primary_font.className} text-[2.8rem] tracking-[0.04em] leading-[1.1] text-[#c69e30] mt-[-0.3rem] mr-0 mb-0 ml-0 max-[1024px]:text-[2.3rem] max-md:text-[2rem] max-[480px]:text-[1.7rem]`}>
            <i>Knowledge</i>
          </h1>

          {/* Divider */}
          <div className="w-[56px] h-[3px] bg-[linear-gradient(90deg,#2c7da0,#c69e30)] rounded-[2px] mt-[1.1rem] mb-4 max-md:mx-auto" />

          <div className={`${roboto.className} w-[90%] max-w-[480px] flex flex-col gap-[0.4rem] mb-6 max-[1024px]:w-full max-md:w-full max-md:text-center`}>
            <p className="text-[0.97rem] text-[#5a6a74] leading-[1.75] m-0">
              This is an opportunity for Sadaqah Jariyah. Every person who
              benefits from this knowledge can be a source of ongoing reward for
              you,{" "}
            </p>
            <p className="text-[0.97rem] text-[#5a6a74] leading-[1.75] m-0">
              In Sha Allah. Support this effort in spreading authentic Islamic
              knowledge.
            </p>
          </div>

          {/* Stats row */}
          {/* <div className={styles.stats}>
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
          </div> */}

          <Link
            href="/support-us"
            className={`${roboto.className} inline-flex items-center gap-[10px] py-[0.7rem] px-[1.7rem] bg-[linear-gradient(135deg,#2c7da0_0%,#1f5f7a_100%)] text-white rounded-[10px] text-[0.97rem] font-semibold tracking-[0.01em] no-underline shadow-[0_4px_18px_rgba(44,125,160,0.35)] transition-[transform,box-shadow] duration-200 ease relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_60%)] before:rounded-[inherit] hover:-translate-y-[2px] hover:shadow-[0_8px_26px_rgba(44,125,160,0.42)] active:translate-y-0 active:shadow-[0_3px_10px_rgba(44,125,160,0.3)] hover:[&>svg]:translate-x-[4px] max-[480px]:w-full max-[480px]:justify-center`}
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
              className="transition-transform duration-200 ease shrink-0"
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