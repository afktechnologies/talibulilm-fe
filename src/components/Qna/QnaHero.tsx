"use client";

import { useState } from "react";
import Link from "next/link";

const QnaHero = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire to search API when ready
  };

  return (
    <div
      className="relative border-b border-[#004a6e] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Images/QnA/bg1.jpg')" }}
    >
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#003049]/70" />
      {/* Breadcrumb */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-0">
        <nav className="flex items-center gap-1.5 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/60">Q&amp;A</span>
        </nav>
      </div>

      {/* Main header */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-10">
        <div className="max-w-2xl">
          <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-2 tracking-tight">
            Islamic Questions &amp; Answers
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-7">
            Answers grounded in the Quran, authentic Sunnah, and the positions of
            recognised scholars.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-0">
            <div className="relative flex-1">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions — e.g. 'combining prayers', 'zakah on gold'…"
                className="w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-white border-0 rounded-l-lg outline-none placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-[#c69e30] hover:bg-[#b8901f] text-white text-sm font-semibold rounded-r-lg transition-colors duration-200 whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QnaHero;