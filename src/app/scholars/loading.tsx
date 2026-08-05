import Rectangle from "@/components/skeleton/rectangle";
import ScholarTimelineSkeleton from "@/components/skeleton/scholarTimelineSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="bg-[#003049] py-16 px-4 flex flex-col items-center gap-4">
        <Rectangle width="220px" height="24px" borderRadius="9999px" />
        <Rectangle width="60%" height="32px" borderRadius="6px" />
        <Rectangle width="40%" height="16px" borderRadius="4px" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <ScholarTimelineSkeleton key={i} />
      ))}
    </div>
  );
}
