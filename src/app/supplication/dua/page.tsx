/**
 * /supplication/dua/page.tsx
 *
 * ── To make this dynamic, swap the static import below with an API call:
 *
 *   const data = await fetch(`/api/supplications/${params.slug}`).then(r => r.json())
 *
 * The component tree is identical whether data comes from JSON or an API.
 */

import DuaHero from "@/components/Supplication/Dua/DuaHero";
import DuaList from "@/components/Supplication/Dua/DuaList";
import DuaSidebar from "@/components/Supplication/Dua/DuaSidebar";

// ─── Static data (replace with API call when ready) ───────────────────────────
import pageData from "@/store/data/eveningAdhkaar.json";
import type { DuaEntry } from "@/components/Supplication/Dua/DuaCard";

// ─── Types ────────────────────────────────────────────────────────────────────
type DuaPageData = {
  slug: string;
  title: string;
  arabicTitle: string;
  description: string;
  backgroundImage: string;
  duas: DuaEntry[];
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DuaPage() {
  const data = pageData as DuaPageData;

  return (
    <main className="min-h-screen bg-[#f8f7f4] ">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <DuaHero
        title={data.title}
        arabicTitle={data.arabicTitle}
        description={data.description}
        backgroundImage={data.backgroundImage}
        totalDuas={data.duas.length}
      />

      {/* ── Outer centering shell ─────────────────────────────────────── */}
      {/*
        max-w-6xl + mx-auto centres the whole content area on any screen.
        The inner flex row gives DuaList all remaining space (flex-1 min-w-0)
        while the sidebar keeps its fixed w-64 on large screens only.
      */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        <div className="flex items-start gap-10">
          {/* Main content — stretches to fill available width */}
          <div className="flex-1 min-w-0">
            <DuaList duas={data.duas} />
          </div>
          {/* Sticky sidebar — desktop only */}
          <DuaSidebar title={data.title} duas={data.duas} />
        </div>
      </div>
    </main>
  );
}