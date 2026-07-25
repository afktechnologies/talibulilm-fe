"use client";

type Category = {
  id: string;
  label: string;
  count: number;
};

interface ScholarsFiltersProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ScholarsFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ScholarsFiltersProps) => {
  return (
    <div className="sticky top-0 z-40 bg-[#f8f5f0]/95 backdrop-blur-md border-b border-[#d4c3a8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8c6f4d]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search scholars by name or contribution..."
              className="w-full pl-12 pr-5 py-3.5 bg-white border border-[#d4c3a8] rounded-xl text-[#2c2118] placeholder:text-[#a38a6d] focus:outline-none focus:border-[#8c6f4d] transition-all font-light"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange("all")}
              className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap
                ${activeCategory === "all"
                  ? "bg-[#2c2118] text-[#e8d9b8] shadow-sm"
                  : "bg-white border border-[#d4c3a8] text-[#5c4e3f] hover:border-[#8c6f4d] hover:text-[#2c2118]"
                }`}
            >
              All Scholars
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap
                  ${activeCategory === cat.id
                    ? "bg-[#2c2118] text-[#e8d9b8] shadow-sm"
                    : "bg-white border border-[#d4c3a8] text-[#5c4e3f] hover:border-[#8c6f4d] hover:text-[#2c2118]"
                  }`}
              >
                {cat.label}
                <span className={`text-xs px-2 py-0.5 rounded-full transition-all
                  ${activeCategory === cat.id 
                    ? "bg-[#8c6f4d]/20 text-[#e8d9b8]" 
                    : "bg-[#f0e6d2] text-[#8c6f4d]"
                  }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4c3a8] to-transparent" />
    </div>
  );
};

export default ScholarsFilters;