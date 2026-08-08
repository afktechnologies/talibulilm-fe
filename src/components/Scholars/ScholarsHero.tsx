import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";

export default function ScholarsHero() {
  return (
    <div className="relative border-b border-[#004a6e] bg-[linear-gradient(135deg,#003049_0%,#00243a_60%,#001a2b_100%)] overflow-hidden">
      <div className="absolute top-[-120px] left-[-80px] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(198,158,48,0.12)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[8%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(198,158,48,0.1)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:26px_26px] pointer-events-none" />

      <div className="relative z-[1] max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-0">
        <nav className="flex items-center gap-1.5 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/60">Scholars</span>
        </nav>
      </div>

      <div className="relative z-[1] max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-14 text-center">
        <span
          className={`${roboto.className} inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.18em] uppercase text-[#DBB346] bg-[rgba(219,179,70,0.1)] border border-[rgba(219,179,70,0.3)] py-1.5 px-4 rounded-full mb-5`}
        >
          A Living Chain of Knowledge
        </span>
        <h1 className={`${primary_font.className} text-white text-[2rem] sm:text-[2.4rem] font-bold leading-tight mb-3 tracking-tight`}>
          Islamic Scholars Through the Ages
        </h1>
        <p className={`${roboto.className} text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto`}>
          From the Companions of the Prophet ﷺ to the great jurists and scholars who
          followed, trace the generations that preserved and transmitted Islamic
          knowledge to us today.
        </p>
      </div>
    </div>
  );
}
