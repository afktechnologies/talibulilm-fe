import Link from "next/link";

const QnaAskBanner = () => {
  return (
    <div className="lg:hidden bg-gradient-to-r from-[#003049] to-[#0a4a6e] rounded-2xl p-5 flex items-center justify-between gap-4 my-6">
      <div>
        <h3 className="text-white font-bold text-sm mb-0.5">Have a Question?</h3>
        <p className="text-white/60 text-xs">Get answers from authentic Islamic sources.</p>
      </div>
      <Link
        href="/qna/ask"
        className="flex-shrink-0 inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-[#003049] text-xs font-bold py-2 px-4 rounded-xl transition-colors duration-200"
      >
        Ask now
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
};

export default QnaAskBanner;