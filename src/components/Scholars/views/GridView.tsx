import ScholarCard from "../ScholarCard";
import type { ScholarList } from "@/types/scholar";

/** Spacious, image-forward view — full `ScholarCard` in a responsive grid. */
export default function GridView({ scholars }: { scholars: ScholarList[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {scholars.map((scholar) => (
        <ScholarCard key={scholar.id} scholar={scholar} />
      ))}
    </div>
  );
}
