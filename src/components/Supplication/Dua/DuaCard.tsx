"use client";

import { useState } from "react";
import CounterBadge from "./CounterBadge";
import ShareTooltip from "@/components/common/Share/ShareTooltip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSupplicationBookmark, removeSupplicationBookmark } from "@/store/slice/supplicationBookmarkSlice";

export type DuaEntry = {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  count: number;
  benefit: string;
};

interface DuaCardProps {
  dua: DuaEntry;
  index: number;
}

const DuaCard = ({ dua, index }: DuaCardProps) => {
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [openShareTooltip, setOpenShareTooltip] = useState(false);

  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.supplicationBookmark.items);
  const bookmarked = bookmarks.some((b) => b.id === dua.id);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      dispatch(removeSupplicationBookmark(dua.id));
    } else {
      dispatch(addSupplicationBookmark(dua));
    }
  };

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}#dua-${dua.id}` : "";
  const shareText = `${dua.title}\n\n${dua.arabic}\n\n${dua.translation}`;

  return (
    <article
      id={`dua-${dua.id}`}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      {/* Gold left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-300 rounded-l-2xl" />

      {/* Card inner */}
      <div className="pl-5 pr-4 pt-5 pb-5 md:pl-6 md:pr-6 md:pt-6 md:pb-6">

        {/* ── Top row: number badge + title + bookmark ─────────────────── */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            {/* Index number */}
            <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-600">
              {index + 1}
            </span>
            {/* Title */}
            <h3 className="text-base md:text-lg font-bold text-[#003049] leading-snug">
              {dua.title}
            </h3>
          </div>

          {/* Bookmark */}
          <button
            onClick={handleBookmarkToggle}
            className="flex-shrink-0 mt-0.5 transition-transform duration-150 active:scale-90"
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this dua"}
          >
            <svg
              className={`w-5 h-5 transition-colors duration-200 ${
                bookmarked ? "fill-amber-400 stroke-amber-400" : "fill-none stroke-gray-300 hover:stroke-amber-400"
              }`}
              viewBox="0 0 24 24"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>

        {/* ── Action pills ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <button
            onClick={() => setShowTranslation((v) => !v)}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
              showTranslation
                ? "bg-[#003049] text-white border-[#003049]"
                : "bg-white text-[#003049] border-[#003049]/30 hover:border-[#003049]"
            }`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Translate
          </button>

          <button
            onClick={() => setShowTransliteration((v) => !v)}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
              showTransliteration
                ? "bg-slate-700 text-white border-slate-700"
                : "bg-white text-slate-700 border-slate-300 hover:border-slate-700"
            }`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Transliteration
          </button>

          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-white border border-gray-200 hover:border-gray-400 hover:text-gray-700 px-3.5 py-1.5 rounded-full transition-all duration-200">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072" />
            </svg>
            Audio
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-white border border-gray-200 hover:border-gray-400 hover:text-gray-700 px-3.5 py-1.5 rounded-full transition-all duration-200 [&_svg]:w-3.5 [&_svg]:h-3.5">
            <ShareTooltip
              open={openShareTooltip}
              onClose={() => setOpenShareTooltip(false)}
              shareUrl={shareUrl}
              shareText={shareText}
              onClick={() => setOpenShareTooltip((v) => !v)}
            />
            <span onClick={() => setOpenShareTooltip((v) => !v)} className="cursor-pointer">
              Share
            </span>
          </div>
        </div>

        {/* ── Arabic + Counter row ───────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Arabic text */}
          <p
            dir="rtl"
            lang="ar"
            className="flex-1 text-2xl md:text-3xl font-light text-gray-800 leading-[2.2] text-right"
            style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}
          >
            {dua.arabic}
          </p>

          {/* Counter badge */}
          <div className="mt-2">
            <CounterBadge targetCount={dua.count} />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-dashed border-amber-100 mb-4" />

        {/* ── Transliteration ───────────────────────────────────────────── */}
        {showTransliteration && (
          <p className="text-sm text-gray-500 italic leading-relaxed mb-3">
            {dua.transliteration}
          </p>
        )}

        {/* ── Translation ───────────────────────────────────────────────── */}
        {showTranslation && (
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            {dua.translation}
          </p>
        )}

        {/* ── Benefit callout ───────────────────────────────────────────── */}
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <span className="text-amber-500 mt-0.5 flex-shrink-0 text-base">✦</span>
          <p className="text-xs md:text-sm text-amber-800 leading-relaxed">
            {dua.benefit}
          </p>
        </div>

        {/* ── Reference footer ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <span className="text-[11px] text-gray-400 font-medium tracking-wide">
            Reference
          </span>
          <span className="text-[11px] font-semibold text-[#003049]/70 bg-[#003049]/5 px-2.5 py-0.5 rounded-full">
            {dua.reference}
          </span>
        </div>
      </div>
    </article>
  );
};

export default DuaCard;