import Link from "next/link";

type PopularItem = { id: number; number: string; question: string; views: number };
type Category    = { id: string; label: string };

interface QnaSidebarProps {
  popularQuestions : PopularItem[];
  categories       : Category[];
  activeCategory   : string;
  onCategoryChange : (id: string) => void;
}

const QnaSidebar = ({
  popularQuestions,
  categories,
  activeCategory,
  onCategoryChange,
}: QnaSidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">

      {/* ── Ask a question ────────────────────────────────────────────── */}
      <div className="border border-[#003049]/20 rounded-lg p-4 bg-[#003049]/[0.03]">
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          Have an Islamic question? Submit it and receive an answer drawn from the Quran and authentic Sunnah.
        </p>
        <Link
          href="/qna/ask"
          className="flex items-center justify-center gap-1.5 w-full py-2 px-4 bg-[#003049] hover:bg-[#004a6e] text-white text-xs font-semibold rounded-md transition-colors duration-200"
        >
          Ask a question
        </Link>
      </div>

      {/* ── Browse categories ────────────────────────────────────────── */}
      <div>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Browse by Topic
        </h3>
        <ul className="space-y-0.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => onCategoryChange(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 flex items-center justify-between group ${
                    isActive
                      ? "bg-[#003049] text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#003049]"
                  }`}
                >
                  {cat.label}
                  <svg
                    className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-60" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Most read ─────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          Most Read
        </h3>
        <ol className="space-y-4">
          {popularQuestions.map((item, i) => (
            <li key={item.id} className="flex items-start gap-3">
              <span className="flex-shrink-0 text-[11px] font-bold text-gray-300 mt-0.5 w-4 text-right">
                {i + 1}
              </span>
              <div>
                <a
                  href={`#question-${item.id}`}
                  className="text-xs text-gray-700 hover:text-[#003049] leading-snug transition-colors duration-150 block"
                >
                  {item.question}
                </a>
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  {item.views.toLocaleString()} views
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Disclaimer ────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Answers on this page are for general educational purposes. For personal
          religious rulings, please consult a qualified scholar in your area.
        </p>
      </div>
    </aside>
  );
};

export default QnaSidebar;