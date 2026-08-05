"use client";

import { MdGridView, MdViewCarousel, MdViewList } from "react-icons/md";
import { roboto } from "@/app/font/font";
import { SORT_OPTIONS, type SortKey } from "./generations";
import type { ViewMode } from "./ScholarsTimeline";

interface Bucket {
  key: string;
  title: string;
  scholars: unknown[];
}

interface ScholarsControlsProps {
  sortKey: SortKey;
  filterKey: string;
  viewMode: ViewMode;
  buckets: Bucket[];
  onSortChange: (value: SortKey) => void;
  onFilterChange: (value: string) => void;
  onViewModeChange: (value: ViewMode) => void;
}

const VIEW_MODES: {
  value: ViewMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  // { value: "horizontal", label: "Horizontal", icon: MdViewCarousel },
  { value: "grid", label: "Grid", icon: MdGridView },
  { value: "list", label: "List", icon: MdViewList },
];

const selectClass =
  "text-sm text-[#5C6357] bg-white border border-[#C2CDD3] rounded-full py-2 pl-3.5 pr-8 cursor-pointer transition-colors duration-150 hover:border-[#DBB346] focus:outline-none focus:border-[#DBB346] focus:ring-2 focus:ring-[#DBB346]/20";

export default function ScholarsControls({
  sortKey,
  filterKey,
  viewMode,
  buckets,
  onSortChange,
  onFilterChange,
  onViewModeChange,
}: ScholarsControlsProps) {
  const totalCount = buckets.reduce((sum, b) => sum + b.scholars.length, 0);

  return (
    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-[#C2CDD3]/70">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2">
          <span
            className={`${roboto.className} text-xs font-semibold text-[#8A6D59] uppercase tracking-wide`}
          >
            Filter
          </span>
          <select
            value={filterKey}
            onChange={(e) => onFilterChange(e.target.value)}
            className={selectClass}
            aria-label="Filter by generation"
          >
            <option value="all">All generations ({totalCount})</option>
            {buckets.map((bucket) => (
              <option key={bucket.key} value={bucket.key}>
                {bucket.title} ({bucket.scholars.length})
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span
            className={`${roboto.className} text-xs font-semibold text-[#8A6D59] uppercase tracking-wide`}
          >
            Sort
          </span>
          <select
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className={selectClass}
            aria-label="Sort scholars"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div
          role="group"
          aria-label="Timeline view mode"
          className="flex items-center gap-0.5 bg-[#f4e8c7]/40 border border-[#C2CDD3]/60 rounded-full p-1 ml-auto"
        >
          {VIEW_MODES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              aria-pressed={viewMode === value}
              title={label}
              onClick={() => onViewModeChange(value)}
              className={`flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-full transition-colors duration-150 max-[500px]:px-2 ${
                viewMode === value
                  ? "bg-[#7A604F] text-white"
                  : "text-[#7A604F] hover:bg-white/70"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="max-[600px]:hidden">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {filterKey === "all" && (
        <div className="max-w-5xl mx-auto px-4 pb-3 flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {buckets.map((bucket) => (
            <a
              key={bucket.key}
              href={`#${bucket.key}`}
              className={`${roboto.className} flex-shrink-0 text-xs text-[#7D887A] hover:text-[#8A6D59] hover:bg-[#f4e8c7]/50 border border-transparent hover:border-[#DBB346]/40 rounded-full py-1 px-3 transition-colors duration-150 whitespace-nowrap`}
            >
              {bucket.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
