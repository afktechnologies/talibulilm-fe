"use client";

import { useState } from "react";

interface DuaActionsProps {
  duaId: number;
  title: string;
  arabic: string;
  translation: string;
}

const DuaActions = ({ duaId, title, arabic, translation }: DuaActionsProps) => {
  const [showTranslation, setShowTranslation] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `${title}\n\n${arabic}\n\n${translation}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Translate toggle */}
      <button
        onClick={() => setShowTranslation((v) => !v)}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
          showTranslation
            ? "bg-[#003049] text-white border-[#003049]"
            : "bg-white text-[#003049] border-[#003049]/30 hover:border-[#003049]"
        }`}
        data-translate-target={duaId}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {showTranslation ? "Hide" : "Translate"}
      </button>

      {/* Audio button */}
      <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003049] bg-white border border-[#003049]/30 hover:border-[#003049] hover:bg-[#003049]/5 px-3.5 py-1.5 rounded-full transition-all duration-200">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M8.464 8.464A5 5 0 008 12" />
        </svg>
        Audio
      </button>

      {/* Share / Copy */}
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003049] bg-white border border-[#003049]/30 hover:border-[#003049] hover:bg-[#003049]/5 px-3.5 py-1.5 rounded-full transition-all duration-200"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </>
        )}
      </button>

      {/* Return the show state so the parent card can use it */}
      <input type="hidden" id={`translate-state-${duaId}`} value={showTranslation ? "1" : "0"} readOnly />
    </div>
  );
};

export default DuaActions;