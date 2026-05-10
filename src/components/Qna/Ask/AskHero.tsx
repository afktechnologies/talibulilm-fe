import Link from "next/link";

const AskHero = () => {
  return (
    <div
      className="relative border-b border-[#004a6e] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Images/QnA/bg1.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#003049]/82" />

      {/* Breadcrumb */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-0">
        <nav className="flex items-center gap-1.5 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/qna" className="hover:text-white/70 transition-colors">Q&amp;A</Link>
          <span>/</span>
          <span className="text-white/60">Submit a Question</span>
        </nav>
      </div>

      {/* Header content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-7 pb-10">
        <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-2 tracking-tight">
          Submit a Question
        </h1>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl">
          Your question will be reviewed and answered based on the Quran, authentic
          Sunnah, and the positions of recognised scholars.
        </p>
      </div>
    </div>
  );
};

export default AskHero;