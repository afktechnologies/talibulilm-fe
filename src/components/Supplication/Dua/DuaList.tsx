import DuaCard, { type DuaEntry } from "./DuaCard";

interface DuaListProps {
  duas: DuaEntry[];
}

const DuaList = ({ duas }: DuaListProps) => {
  if (duas.length === 0) {
    return (
      <section className="w-full py-2">
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-16 px-6 text-center">
          <div className="text-3xl mb-3">🤲</div>
          <h2 className="text-base font-bold text-[#003049] mb-1.5">No supplications yet</h2>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            This category doesn&apos;t have any supplications added yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-2">
      {/* Session progress header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          {duas.length} Supplications
        </h2>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Tap counter to track recitations
        </div>
      </div>

      {/* Card list */}
      <div className="flex flex-col gap-5">
        {duas.map((dua, index) => (
          <DuaCard key={dua.id} dua={dua} index={index} />
        ))}
      </div>

      {/* Completion CTA */}
      <div className="mt-10 text-center py-8 border-t border-dashed border-amber-200">
        <div className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold bg-amber-50 border border-amber-200 px-5 py-2.5 rounded-full">
          <span className="text-base">☽</span>
          May Allah accept your adhkaar
        </div>
      </div>
    </section>
  );
};

export default DuaList;