import Link from "next/link";

const GUIDELINES = [
  "Write your question clearly and in full — avoid abbreviations.",
  "Include relevant context, such as your circumstances or location, if it affects the ruling.",
  "One question per submission. If you have multiple questions, submit them separately.",
  "Search the existing Q&A archive before submitting — your question may already be answered.",
  "Do not include personal or sensitive information beyond what is necessary.",
  "Questions in English are prioritised for faster review.",
];

const AskGuidelines = () => {
  return (
    <aside className="hidden lg:flex flex-col gap-5 w-72 shrink-0">

      {/* Guidelines */}
      <div>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Before You Submit
        </h3>
        <ul className="space-y-3">
          {GUIDELINES.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border border-[#003049]/25 bg-[#003049]/5 flex items-center justify-center text-[10px] font-bold text-[#003049]/50">
                {i + 1}
              </span>
              <p className="text-xs text-gray-500 leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Response time notice */}
      <div>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          Response Time
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Questions are reviewed by our team and answered as capacity allows.
          We are unable to guarantee a specific response time. Providing your
          email allows us to notify you when an answer is published.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Browse existing */}
      <div>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          Already Answered?
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          Browse over 200 existing answers before submitting a new question.
        </p>
        <Link
          href="/qna"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#003049] hover:text-[#004a6e] transition-colors"
        >
          Browse Q&amp;A archive
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Disclaimer */}
      <p className="text-[10px] text-gray-400 leading-relaxed">
        Answers are for general educational purposes only. For personal religious
        rulings (fatwa), please consult a qualified scholar in your area.
      </p>
    </aside>
  );
};

export default AskGuidelines;