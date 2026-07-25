"use client";

import { useState, useMemo } from "react";
import QnaList from "./QnaList";
import QnaSidebar from "./QnaSidebar";
import Link from "next/link";
import type { QnaEntry } from "./QnaCard";

type Category    = { id: string; label: string };
type PopularItem = { id: number; number: string; question: string; views: number };

interface QnaClientProps {
  categories       : Category[];
  questions        : QnaEntry[];
  popularQuestions : PopularItem[];
}

const QnaClient = ({ categories, questions, popularQuestions }: QnaClientProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Pre-compute counts for category tabs
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: questions.length };
    questions.forEach((q) => {
      map[q.category] = (map[q.category] ?? 0) + 1;
    });
    return map;
  }, [questions]);

  return (
    <>
      {/* Page body */}
      <div className="bg-[#f8f7f4] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-7">
          <div className="flex items-start gap-10">

            {/* Main column */}
            <div className="flex-1 min-w-0">
              {/* Mobile-only category switcher — sidebar list is desktop-only, so
                  this is the single category control on small screens (no duplicate
                  bar; same categories/activeCategory state as the sidebar). */}
              <div className="lg:hidden mb-5">
                <label htmlFor="qna-category-select" className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Category
                </label>
                <select
                  id="qna-category-select"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full text-sm text-gray-700 font-medium border border-gray-200 rounded-md px-3 py-2.5 bg-white outline-none cursor-pointer hover:border-gray-300 focus:border-[#003049] transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                      {cat.id !== "all" ? ` (${counts[cat.id] ?? 0})` : ` (${counts.all})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile ask CTA */}
              <div className="lg:hidden flex items-center justify-between gap-3 mb-5 pb-5 border-b border-gray-200">
                <p className="text-xs text-gray-500">
                  Have a question about Islam?
                </p>
                <Link
                  href="/qna/ask"
                  className="flex-shrink-0 text-xs font-semibold text-white bg-[#003049] hover:bg-[#004a6e] px-3 py-1.5 rounded-md transition-colors"
                >
                  Ask now
                </Link>
              </div>

              <QnaList questions={questions} activeCategory={activeCategory} />
            </div>

            {/* Sidebar */}
            <QnaSidebar
              popularQuestions={popularQuestions}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(id: string) => setActiveCategory(id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QnaClient;