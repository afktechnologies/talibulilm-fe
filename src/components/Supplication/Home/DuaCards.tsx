import Card from "./Card";
import { supplicationApi } from "@/services/api/endpoints/supplication";
import { getDuaTexts } from "@/utils/supplicationHelpers";
import type { DuaEntry } from "@/components/Supplication/Dua/DuaCard";

const FEATURED_COUNT = 2;

const DuaCards = async () => {
  const { data: supplications } = await supplicationApi.getAll(1, FEATURED_COUNT);

  if (supplications.length === 0) return null;

  const duas: DuaEntry[] = await Promise.all(
    supplications.map(async (supplication) => {
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
    }),
  );

  return (
    <div className="flex justify-center overflow-x-hidden bg-[linear-gradient(180deg,#fefefe_0%,#fafaf7_100%)] py-16 px-6 max-[480px]:py-10 max-[480px]:px-4">
      <div className="flex justify-center w-full max-w-[1300px]">
        <div className="flex justify-center items-stretch gap-8 w-full max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
          {duas.map((dua) => (
            <Card key={dua.id} data={dua} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DuaCards;
