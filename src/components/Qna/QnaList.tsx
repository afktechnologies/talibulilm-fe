import QnaCard, { type QnaEntry } from "./QnaCard";

interface QnaListProps {
  questions: QnaEntry[];
  activeCategory: string;
}

const QnaList = ({ questions, activeCategory }: QnaListProps) => {
  const filtered = activeCategory === "all"
    ? questions
    : questions.filter((q) => q.category === activeCategory);

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-gray-500 mb-1">No questions found in this category.</p>
        <p className="text-xs text-gray-400">Try selecting a different category or use the search bar.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {filtered.length} answer{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "all" && (
            <span className="ml-1 text-[#003049] font-medium">
              in {filtered[0]?.categoryLabel}
            </span>
          )}
        </p>
        <select className="text-xs text-gray-500 border border-gray-200 rounded-md px-2.5 py-1.5 bg-white outline-none cursor-pointer hover:border-gray-300 transition-colors">
          <option>Most recent</option>
          <option>Most viewed</option>
        </select>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.map((entry) => (
          <QnaCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
        <button className="text-xs text-gray-500 hover:text-[#003049] transition-colors flex items-center gap-1 disabled:opacity-30" disabled>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                n === 1
                  ? "bg-[#003049] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {n}
            </button>
          ))}
          <span className="text-gray-400 text-xs px-1">…</span>
          <button className="w-8 h-8 rounded text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors">8</button>
        </div>
        <button className="text-xs text-gray-500 hover:text-[#003049] transition-colors flex items-center gap-1">
          Next
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default QnaList;