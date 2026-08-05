import { primary_font, roboto } from "@/app/font/font";
import LazyMount from "./LazyMount";
import Rectangle from "@/components/skeleton/rectangle";
import GridView from "./views/GridView";
import ListView from "./views/ListView";
import HorizontalView from "./views/HorizontalView";
import type { ScholarList } from "@/types/scholar";
import type { ViewMode } from "./ScholarsTimeline";

interface TimelineSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  scholars: ScholarList[];
  viewMode: ViewMode;
}

const VIEW_COMPONENTS: Record<ViewMode, React.ComponentType<{ scholars: ScholarList[] }>> = {
  grid: GridView,
  list: ListView,
  horizontal: HorizontalView,
};

const skeletonPlaceholder = (
  <div className="flex flex-col gap-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <Rectangle key={i} width="100%" height="72px" borderRadius="16px" />
    ))}
  </div>
);

export default function TimelineSection({
  id,
  eyebrow,
  title,
  description,
  scholars,
  viewMode,
}: TimelineSectionProps) {
  const ViewComponent = VIEW_COMPONENTS[viewMode];

  return (
    <section id={id} className="w-full max-w-5xl mx-auto px-4 py-12 scroll-mt-[7rem]">
      <div className="text-center mb-8">
        <span
          className={`${roboto.className} inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.16em] uppercase text-[#8A6D59] bg-[rgba(219,179,70,0.12)] border border-[rgba(219,179,70,0.3)] py-1 px-3.5 rounded-full mb-4`}
        >
          {eyebrow}
        </span>
        <h2 className={`${primary_font.className} text-[1.6rem] text-[#5C6357] mb-2`}>{title}</h2>
        <p className={`${roboto.className} text-sm text-[#7D887A] max-w-xl mx-auto leading-relaxed`}>
          {description}
        </p>
      </div>

      {scholars.length === 0 ? (
        <p className={`${roboto.className} text-center text-sm text-[#7D887A] italic py-8`}>
          No entries in this category yet.
        </p>
      ) : (
        <LazyMount placeholder={skeletonPlaceholder}>
          <ViewComponent scholars={scholars} />
        </LazyMount>
      )}
    </section>
  );
}
