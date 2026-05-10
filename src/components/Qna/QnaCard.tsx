"use client";

import { useState } from "react";

export type AnswerBlock = {
  heading: string | null;
  text: string;
};

export type QnaEntry = {
  id: number;
  number: string;
  category: string;
  categoryLabel: string;
  question: string;
  summary: string;
  answer: AnswerBlock[];
  references: string[];
  date: string;
  views: number;
};

interface QnaCardProps {
  entry: QnaEntry;
}

const QnaCard = ({ entry }: QnaCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = [
      entry.question,
      "",
      "Summary:",
      entry.summary,
      "",
      ...entry.answer.flatMap((b) => b.heading ? [`${b.heading}:`, b.text, ""] : [b.text, ""]),
      "References: " + entry.references.join(", "),
    ].join("\n");
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      id={`question-${entry.id}`}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-sm"
    >
      {/* ── Card header ───────────────────────────────────────────────── */}
      <div className="px-5 py-4 md:px-6 md:py-5">

        {/* Meta row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-bold text-[#003049]/50 tracking-wider uppercase">
              {entry.number}
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="text-[11px] font-semibold text-[#c69e30] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
              {entry.categoryLabel}
            </span>
            <span className="w-px h-3 bg-gray-200" />
            <span className="text-[11px] text-gray-400">{entry.date}</span>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked((b) => !b)}
            title={bookmarked ? "Remove bookmark" : "Save question"}
            className="text-gray-300 hover:text-[#c69e30] transition-colors duration-150"
          >
            <svg
              className={`w-4.5 h-4.5 w-[18px] h-[18px] ${bookmarked ? "fill-[#c69e30] stroke-[#c69e30]" : "fill-none"}`}
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>

        {/* Question title */}
        <h2 className="text-[#003049] text-base md:text-[17px] font-bold leading-snug mb-3 cursor-pointer hover:text-[#004a6e] transition-colors"
          onClick={() => setExpanded((e) => !e)}
        >
          {entry.question}
        </h2>

        {/* Summary */}
        <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed">
          {entry.summary}
        </p>
      </div>

      {/* ── Expanded answer ────────────────────────────────────────────── */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-5 md:px-6 md:py-6 bg-[#fdfcfb]">

          {/* Answer blocks */}
          <div className="space-y-5">
            {entry.answer.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h3 className="text-sm font-bold text-[#003049] mb-2">
                    {block.heading}
                  </h3>
                )}
                <p className="text-sm text-gray-700 leading-[1.9]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>

          {/* References */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              References
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.references.map((ref) => (
                <span
                  key={ref}
                  className="text-[11px] font-medium text-[#003049] bg-[#003049]/5 border border-[#003049]/10 px-2.5 py-1 rounded"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div className={`flex items-center justify-between gap-3 px-5 py-2.5 md:px-6 border-t ${expanded ? "border-gray-200 bg-white" : "border-gray-100"}`}>
        {/* View count */}
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {entry.views.toLocaleString()} views
        </span>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>

          {/* Share */}
          <button
            onClick={() => navigator.share?.({ title: entry.question, text: entry.summary }).catch(() => {})}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>

          {/* Expand / collapse */}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#003049] hover:text-[#004a6e] transition-colors duration-150 ml-1"
          >
            {expanded ? "Hide answer" : "Read answer"}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default QnaCard;