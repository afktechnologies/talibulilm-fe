import { type DuaEntry } from "./DuaCard";

interface DuaSidebarProps {
  title: string;
  duas: DuaEntry[];
}

const DuaSidebar = ({ title, duas }: DuaSidebarProps) => {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0">
      <div className="sticky top-6 space-y-4">
        {/* Table of contents card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Contents
          </h3>
          <nav className="space-y-1">
            {duas.map((dua, index) => (
              <a
                key={dua.id}
                href={`#dua-${dua.id}`}
                className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#003049] hover:bg-amber-50 px-2 py-1.5 rounded-lg transition-colors duration-150 group"
              >
                <span className="w-5 h-5 rounded-full bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-600 flex-shrink-0 transition-colors">
                  {index + 1}
                </span>
                <span className="leading-snug line-clamp-2">{dua.title}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Tips card */}
        <div className="bg-gradient-to-br from-[#003049] to-[#0a4a6e] rounded-2xl p-5 text-white">
          <div className="text-2xl mb-2">📿</div>
          <h3 className="text-sm font-bold mb-1.5">How to use</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            Tap the circular counter on each dua to track your recitations.
            The ring fills as you reach the target count.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DuaSidebar;