// import styles from "./scholars.module.css";

// const ScholarsHero = () => (
//   <section
//     className={`relative w-full overflow-hidden ${styles.pageBackground}`}
//     style={{ minHeight: "clamp(320px, 42vw, 520px)" }}
//   >
//     {/* Background image layer */}
//     <div
//       className="absolute inset-0 bg-cover bg-center"
//       style={{ backgroundImage: "url('/Images/Scholars/hero-bg.jpg')" }}
//     />
//     {/* Multi-layer overlay: dark base + warm vignette */}
//     <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a06]/70 via-[#13100a]/60 to-[#13100a]" />
//     <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a06]/80 via-transparent to-[#0d0a06]/60" />
//     {/* Radial warm glow at top centre */}
//     <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(139,105,20,0.18)_0%,_transparent_70%)]" />

//     {/* Decorative Islamic arch shape at top */}
//     <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none">
//       <svg viewBox="0 0 800 120" className="w-full max-w-3xl opacity-10" preserveAspectRatio="none">
//         <path d="M0,0 Q200,120 400,80 Q600,40 800,0 L800,0 L0,0 Z" fill="rgba(201,168,76,0.8)" />
//       </svg>
//     </div>

//     {/* Content */}
//     <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-end h-full pb-14 pt-24 md:pt-32">

//       {/* Eyebrow */}
//       <div className={`${styles.ornamentDivider} ${styles.cinzelCaps} text-[10px] tracking-[0.3em] text-[#8b6914] mb-6 max-w-xs`}>
//         <span>Tarikh al-Ulama</span>
//       </div>

//       {/* Title */}
//       <h1 className={`${styles.serifDisplay} text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.1] text-[#f0e6d0] mb-4`}>
//         <span className={styles.goldShimmer}>Scholars</span>{" "}
//         <span className="text-[#d4c5a0] font-normal italic">of Islam</span>
//       </h1>

//       {/* Subhead */}
//       <p className={`${styles.serifBody} text-[clamp(0.95rem,2vw,1.15rem)] text-[#a09070] max-w-xl leading-relaxed mb-8`}>
//         A chronological archive of the inheritors of the Prophets — from the Rightly
//         Guided Caliphs to the scholars of our era.
//       </p>

//       {/* Stats row */}
//       <div className="flex items-center gap-8 flex-wrap">
//         {[
//           { n: "1400+", label: "Years of Scholarship" },
//           { n: "22",    label: "Featured Scholars" },
//           { n: "7",     label: "Generations" },
//         ].map(({ n, label }) => (
//           <div key={label}>
//             <p className={`${styles.cinzelCaps} text-[#c9a84c] text-xl font-semibold`}>{n}</p>
//             <p className={`${styles.serifBody} text-[#7a6848] text-xs mt-0.5`}>{label}</p>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Bottom fade into page */}
//     <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#13100a] to-transparent" />
//   </section>
// );

// export default ScholarsHero;


"use client";
import Link from "next/link";

const ScholarsHero = () => {
  return (
    <div
      className="relative h-[85vh] min-h-[620px] bg-cover bg-center bg-no-repeat flex items-center"
      style={{ backgroundImage: "url('/Images/Scholars/hero-library.jpg')" }}
    >
      {/* Deep cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-[#2c2118]/90" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[#c9a96e] text-sm tracking-[3px] font-medium mb-4 border-b border-[#c9a96e]/30 pb-1">
            ARCHIVE OF KNOWLEDGE
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-none tracking-tighter mb-6">
            Luminaries of<br />Islamic Scholarship
          </h1>

          <p className="text-xl text-white/80 max-w-md leading-relaxed">
            A living timeline of scholars who illuminated the path from the time of the Prophet ﷺ to our age.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="#timeline"
              className="px-8 py-4 bg-[#2c2118] hover:bg-[#1f1812] text-[#e8d9b8] font-medium rounded-md transition-all duration-300 flex items-center gap-3 group"
            >
              Explore the Timeline
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest flex flex-col items-center gap-2">
        SCROLL TO BEGIN
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>
    </div>
  );
};

export default ScholarsHero;