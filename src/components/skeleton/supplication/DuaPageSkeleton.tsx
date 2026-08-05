import Rectangle from "../rectangle";

/** Matches DuaHero + DuaList + DuaSidebar layout so nothing jumps once real data arrives. */
const DuaPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      {/* Hero */}
      <div className="relative w-full min-h-[22rem] md:min-h-[28rem] flex flex-col justify-end overflow-hidden bg-[#0d1a2e]">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pb-10 md:pb-14">
          <Rectangle height="1rem" width="180px" className="mb-6 opacity-30" />
          <Rectangle height="2.5rem" width="60%" className="mb-4 opacity-20" />
          <Rectangle height="1rem" width="40%" className="opacity-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        <div className="flex items-start gap-10">
          {/* Main list */}
          <div className="flex-1 min-w-0 space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <Rectangle height="1.25rem" width="50%" />
                <Rectangle height="2rem" width="100%" />
                <Rectangle height="1rem" width="90%" />
                <Rectangle height="1rem" width="70%" />
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <Rectangle height="0.75rem" width="80px" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Rectangle key={i} height="0.9rem" width="90%" />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DuaPageSkeleton;
