// "use client";

// import { useState, useMemo } from "react";
// import ScholarCard, { type Scholar } from "./ScholarCard";
// import styles from "./scholars.module.css";

// const GENERATIONS = [
//   { id: "all",          label: "All Generations" },
//   { id: "khulafa",      label: "Four Caliphs" },
//   { id: "sahabah",      label: "Sahabah" },
//   { id: "tabiin",       label: "Tabi'in" },
//   { id: "tabi-tabiin",  label: "Tabi' al-Tabi'in" },
//   { id: "classical",    label: "Classical" },
//   { id: "modern",       label: "Modern" },
//   { id: "contemporary", label: "Contemporary" },
// ];

// const ERA_ORDER: Record<string, number> = {
//   khulafa: 1, sahabah: 2, tabiin: 3,
//   "tabi-tabiin": 4, classical: 5, modern: 6, contemporary: 7,
// };

// const ERA_BIG_LABEL: Record<string, string> = {
//   khulafa:       "Khulafa al-Rashidun",
//   sahabah:       "Al-Sahabah",
//   tabiin:        "Al-Tabi'in",
//   "tabi-tabiin": "Tabi' al-Tabi'in",
//   classical:     "Classical Era",
//   modern:        "Modern Era",
//   contemporary:  "Contemporary",
// };

// interface ScholarsClientProps { scholars: Scholar[] }

// const ScholarsClient = ({ scholars }: ScholarsClientProps) => {
//   const [activeGen, setActiveGen] = useState("all");
//   const [query,     setQuery]     = useState("");

//   const filtered = useMemo(() => {
//     let list = scholars;
//     if (activeGen !== "all") list = list.filter((s) => s.generation === activeGen);
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       list = list.filter(
//         (s) =>
//           s.name.toLowerCase().includes(q) ||
//           s.arabicName.includes(q) ||
//           s.tagline.toLowerCase().includes(q) ||
//           s.location.toLowerCase().includes(q)
//       );
//     }
//     return [...list].sort(
//       (a, b) =>
//         (ERA_ORDER[a.generation] ?? 9) - (ERA_ORDER[b.generation] ?? 9) ||
//         parseInt(a.birth) - parseInt(b.birth)
//     );
//   }, [scholars, activeGen, query]);

//   // Group by generation for era headers
//   const grouped = useMemo(() => {
//     const map: Record<string, Scholar[]> = {};
//     filtered.forEach((s) => {
//       if (!map[s.generation]) map[s.generation] = [];
//       map[s.generation].push(s);
//     });
//     return Object.entries(map).sort(
//       ([a], [b]) => (ERA_ORDER[a] ?? 9) - (ERA_ORDER[b] ?? 9)
//     );
//   }, [filtered]);

//   return (
//     <div className={styles.pageBackground}>
//       {/* ── Search + Filter Bar ─────────────────────────────────────────── */}
//       <div className="sticky top-0 z-40 border-b border-[#c9a84c]/10 backdrop-blur-sm bg-[#13100a]/90">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-3">
//           <div className="flex items-center gap-3 flex-wrap">
//             {/* Search */}
//             <div className="relative flex-1 min-w-[180px] max-w-xs">
//               <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b6914] pointer-events-none"
//                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search scholars…"
//                 className={`${styles.serifBody} w-full bg-[#1e1810] border border-[#c9a84c]/20 rounded-sm pl-9 pr-3 py-2 text-[#d4c5a0] text-sm placeholder-[#5a4830] outline-none focus:border-[#c9a84c]/50 transition-colors`}
//               />
//             </div>

//             {/* Generation filters */}
//             <div className="flex items-center gap-1.5 flex-wrap">
//               {GENERATIONS.map((g) => (
//                 <button
//                   key={g.id}
//                   onClick={() => setActiveGen(g.id)}
//                   className={`${styles.cinzelCaps} text-[9px] tracking-[0.12em] px-3 py-1.5 rounded-sm border transition-all duration-200 ${
//                     activeGen === g.id
//                       ? "bg-[#c9a84c]/15 border-[#c9a84c]/50 text-[#c9a84c]"
//                       : "border-[#3d2b1a]/60 text-[#7a6848] hover:border-[#c9a84c]/30 hover:text-[#a08030]"
//                   }`}
//                 >
//                   {g.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Timeline body ────────────────────────────────────────────────── */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">

//         {filtered.length === 0 ? (
//           <div className="text-center py-20">
//             <p className={`${styles.serifDisplay} text-[#7a6848] text-lg italic`}>
//               No scholars found.
//             </p>
//           </div>
//         ) : (
//           <div className="relative">
//             {/* Central vertical timeline line */}
//             <div
//               className={`${styles.timelineLine} absolute left-1/2 -translate-x-px top-0 bottom-0 w-[1px] hidden md:block`}
//             />

//             {/* Era groups */}
//             {grouped.map(([gen, scholarsInGen], gi) => (
//               <div key={gen} className="mb-16">

//                 {/* Era header */}
//                 <div className="relative flex items-center justify-center mb-10">
//                   {/* Era big background text */}
//                   <span className={`${styles.eraLabel} absolute inset-x-0 text-center select-none`}>
//                     {ERA_BIG_LABEL[gen]}
//                   </span>
//                   {/* Era pill */}
//                   <div className="relative z-10 flex items-center gap-3">
//                     <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a84c]/60" />
//                     <span className={`${styles.cinzelCaps} text-[#c9a84c] text-[11px] tracking-[0.25em] bg-[#13100a] px-4 py-1.5 border border-[#c9a84c]/30`}>
//                       {ERA_BIG_LABEL[gen]}
//                     </span>
//                     <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a84c]/60" />
//                   </div>
//                 </div>

//                 {/* Scholar cards alternating L/R */}
//                 <div className="space-y-8">
//                   {scholarsInGen.map((scholar, i) => {
//                     const side = i % 2 === 0 ? "left" : "right";
//                     return (
//                       <div key={scholar.id} className="relative flex items-center gap-0">

//                         {/* Desktop alternating layout */}
//                         <div className="hidden md:flex w-full items-center gap-6">
//                           {/* Left slot */}
//                           <div className={`flex-1 ${side === "left" ? "" : "invisible"}`}>
//                             {side === "left" && (
//                               <ScholarCard scholar={scholar} index={i} side="left" />
//                             )}
//                           </div>

//                           {/* Centre: dot + year */}
//                           <div className="flex flex-col items-center gap-1 flex-shrink-0 w-24">
//                             <span className={`${styles.cinzelCaps} text-[#8b6914] text-[10px] text-center leading-tight`}>
//                               {scholar.birthHijri}
//                             </span>
//                             <div className={styles.timelineDot} />
//                             <span className={`${styles.cinzelCaps} text-[#6b5030] text-[9px] text-center leading-tight`}>
//                               {scholar.birth}
//                             </span>
//                           </div>

//                           {/* Right slot */}
//                           <div className={`flex-1 ${side === "right" ? "" : "invisible"}`}>
//                             {side === "right" && (
//                               <ScholarCard scholar={scholar} index={i} side="right" />
//                             )}
//                           </div>
//                         </div>

//                         {/* Mobile: left dot + card */}
//                         <div className="md:hidden flex items-start gap-4 w-full">
//                           <div className="flex flex-col items-center pt-2">
//                             <div className={styles.timelineDot} />
//                             <div className="w-px flex-1 bg-[#c9a84c]/20 mt-2" />
//                           </div>
//                           <div className="flex-1 pb-2">
//                             <p className={`${styles.cinzelCaps} text-[#8b6914] text-[9px] mb-2`}>
//                               {scholar.birthHijri} · {scholar.birth}
//                             </p>
//                             <ScholarCard scholar={scholar} index={i} side="left" />
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}

//             {/* Timeline end ornament */}
//             <div className="flex justify-center mt-6">
//               <div className={`${styles.cinzelCaps} text-[#3d2b1a] text-[9px] tracking-[0.3em] flex items-center gap-3`}>
//                 <div className="w-8 h-px bg-[#c9a84c]/20" />
//                 ﷽
//                 <div className="w-8 h-px bg-[#c9a84c]/20" />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ScholarsClient;


"use client";
import { useState, useMemo } from "react";
import ScholarsTimeline from "./ScholarsTimeline";
import ScholarsFilters from "./ScholarsFilters";
import FeaturedScholars from "./FeaturedScholars";

type Scholar = {
  id: number;
  slug: string;
  fullName: string;
  birthHijri: string;
  birthCE: string;
  deathHijri: string;
  deathCE: string;
  tagline: string;
  category: string;
  image: string;
  era: string;
};

interface Props {
  scholars: Scholar[];
  featured: Scholar[];
  categories: { id: string; label: string; count: number }[];
}

const ScholarsClient = ({ scholars, featured, categories }: Props) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScholars = useMemo(() => {
    return scholars.filter((scholar) => {
      const matchesCategory = activeCategory === "all" || scholar.category === activeCategory;
      const matchesSearch =
        scholar.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholar.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [scholars, activeCategory, searchQuery]);

  return (
    <>
      <ScholarsFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <FeaturedScholars scholars={featured} />

        <div id="timeline" className="mt-20">
          <ScholarsTimeline scholars={filteredScholars} />
        </div>
      </div>
    </>
  );
};

export default ScholarsClient;