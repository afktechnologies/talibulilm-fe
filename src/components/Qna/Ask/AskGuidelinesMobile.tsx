"use client";

import { useState } from "react";

const GUIDELINES = [
  "Write your question clearly and in full — avoid abbreviations.",
  "Include relevant context, such as your circumstances or location, if it affects the ruling.",
  "One question per submission. Submit multiple questions separately.",
  "Search the existing Q&A archive before submitting.",
  "Do not include personal information beyond what is necessary.",
];

const AskGuidelinesMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden bg-white border border-gray-200 rounded-lg overflow-hidden mt-2 mb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-[#003049] text-left"
      >
        Submission guidelines
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 py-4">
          <ol className="space-y-3">
            {GUIDELINES.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border border-[#003049]/20 bg-[#003049]/5 flex items-center justify-center text-[10px] font-bold text-[#003049]/50">
                  {i + 1}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default AskGuidelinesMobile;