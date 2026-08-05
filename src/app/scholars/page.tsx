import type { Metadata } from "next";
import ScholarsHero from "@/components/Scholars/ScholarsHero";
import ScholarsTimeline from "@/components/Scholars/ScholarsTimeline";
import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import { scholarApi } from "@/services/api/endpoints/scholar";
import type { ScholarList } from "@/types/scholar";

export const metadata: Metadata = {
  title: "Scholars | Talibulilm",
  description:
    "A timeline of Islamic personalities and generations — the Rightly Guided Caliphs, the Ashara Mubashshara, the Sahabah, the Tabi'een, the Tabi' al-Tabi'een, and the notable scholars who followed.",
};

// Scholar entries are admin-managed and can change at any time; render
// per-request rather than at build time so the page never depends on
// backend availability during the build itself.
export const dynamic = "force-dynamic";

export default async function ScholarsPage() {
  let scholars: ScholarList[] = [];
  let loadFailed = false;

  try {
    const response = await scholarApi.getAllScholars();
    scholars = response.data;
  } catch {
    loadFailed = true;
  }

  if (loadFailed) {
    return (
      <div>
        <ScholarsHero />
        <FallbackError />
      </div>
    );
  }

  return (
    <div>
      <ScholarsHero />

      {scholars.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center gap-2 py-20 px-4">
          <p className="text-[#7D887A] text-sm">No scholar entries have been published yet.</p>
        </div>
      ) : (
        <ScholarsTimeline scholars={scholars} />
      )}
    </div>
  );
}
