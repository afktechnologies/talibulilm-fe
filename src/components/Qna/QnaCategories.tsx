"use client";

type Category = { id: string; label: string };

interface QnaCategoriesProps {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
  counts: Record<string, number>;
}

const QnaCategories = ({ categories, active, onChange, counts }: QnaCategoriesProps) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-end gap-0 overflow-x-auto scrollbar-none -mb-px">
          {categories.map((cat) => {
            const isActive = active === cat.id;
            const count = counts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={`relative flex-shrink-0 flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium transition-colors duration-150 border-b-2 ${
                  isActive
                    ? "border-[#003049] text-[#003049]"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {cat.label}
                {cat.id !== "all" && count > 0 && (
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-[#003049]/10 text-[#003049]" : "bg-gray-100 text-gray-400"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QnaCategories;