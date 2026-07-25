import { notFound } from "next/navigation";
import { HTTPError } from "ky";
import DuaHero from "@/components/Supplication/Dua/DuaHero";
import DuaList from "@/components/Supplication/Dua/DuaList";
import DuaSidebar from "@/components/Supplication/Dua/DuaSidebar";
import type { DuaEntry } from "@/components/Supplication/Dua/DuaCard";
import { supplicationApi } from "@/services/api/endpoints/supplication";
import { getCategoryImagePath, getDuaTexts } from "@/utils/supplicationHelpers";
import type { SupplicationCategoryList, SupplicationList } from "@/types/supplication";

// Supplication content is admin-managed and can change at any time; render
// per-request rather than at build time so the page never depends on backend
// availability during the build itself.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function mapToDuaEntry(supplication: SupplicationList): Promise<DuaEntry> {
  const { translation, transliteration } = await getDuaTexts(supplication.id);
  return {
    id: supplication.id,
    title: supplication.title,
    arabic: supplication.arText,
    transliteration,
    translation,
    reference: supplication.reference ?? "",
    count: supplication.counter,
    benefit: supplication.benefit ?? "",
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DuaPage({ params }: PageProps) {
  const { slug } = await params;

  let category: SupplicationCategoryList;
  try {
    ({ data: category } = await supplicationApi.getCategoryBySlug(slug));
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) {
      notFound();
    }
    throw error;
  }

  let supplications: SupplicationList[] = [];
  try {
    ({ data: supplications } = await supplicationApi.getByCategory(category.id, 1, 0));
  } catch (error) {
    // The backend 404s when a category has no supplications yet — treat that
    // as an empty list rather than a broken page.
    if (!(error instanceof HTTPError && error.response.status === 404)) {
      throw error;
    }
  }

  const duas: DuaEntry[] = await Promise.all(supplications.map(mapToDuaEntry));

  return (
    <main className="min-h-screen bg-[#f8f7f4] ">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <DuaHero
        title={category.name}
        arabicTitle={category.nameAr ?? ""}
        description={category.description ?? ""}
        backgroundImage={getCategoryImagePath(category)}
        totalDuas={duas.length}
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
            <DuaList duas={duas} />
          </div>
          {/* Sticky sidebar — desktop only */}
          <DuaSidebar title={category.name} duas={duas} />
        </div>
      </div>
    </main>
  );
}
