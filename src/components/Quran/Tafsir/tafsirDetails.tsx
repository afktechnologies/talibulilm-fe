import { lateef, primary_font, roboto } from "@/app/font/font";
import { FaDiamond } from "react-icons/fa6";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { AyahList } from "@/types/surah";
import { TafsirList } from "@/types/tafsir";
import Rectangle from "@/components/skeleton/rectangle";

const td = {
  navBtn:
    "flex items-center gap-2 py-2.5 px-6 text-sm font-semibold text-[#5C6357] border border-[#C2CDD3] rounded-full transition-colors duration-150 hover:bg-[#5C6357] hover:text-white hover:border-[#5C6357] disabled:opacity-40 disabled:pointer-events-none max-[500px]:px-4 max-[500px]:text-xs",
};

interface TafsirDetailsProps {
  ayah: AyahList | null;
  tafsir: TafsirList | null;
  isTafsirsLoading: boolean;
  ayahNumber: number;
  verseCount: number;
  onAyahChange: (ayahNumber: number) => void;
}

const TafsirDetails: React.FC<TafsirDetailsProps> = ({
  ayah,
  tafsir,
  isTafsirsLoading,
  ayahNumber,
  verseCount,
  onAyahChange,
}) => {
  return (
    <div className="flex flex-col justify-center items-center my-8 mx-8 max-md:mx-4">
      {ayah && (
        <div className="w-full max-w-[900px] flex flex-col justify-center items-end gap-4 my-4">
          <span
            className={`${lateef.className} text-[1.8rem] tracking-[0.03em] w-full text-end text-[#488EAD] leading-loose max-[500px]:text-[1.4rem]`}
          >
            {ayah.arabicText}
          </span>
        </div>
      )}

      <div className="flex justify-center items-center w-full max-w-[900px] gap-3">
        <FaDiamond className="w-[6px] h-[6px] text-[#DBB346] flex-shrink-0" />
        <hr className="flex-1 h-px border-0 bg-[#DBB346]/40" />
        <FaDiamond className="w-[6px] h-[6px] text-[#DBB346] flex-shrink-0" />
      </div>

      <div className="w-full max-w-[850px] flex flex-col justify-center items-start gap-4 my-4">
        {isTafsirsLoading ? (
          <Rectangle width="100%" height="150px" borderRadius="10px" />
        ) : tafsir ? (
          <>
            <h2 className={`${primary_font.className} text-[#C69E30] text-[1.6rem] max-[500px]:text-[1.3rem]`}>
              {tafsir.book.nameEn}
            </h2>
            <div
              className={`${roboto.className} text-[1rem] font-normal tracking-[0.03em] leading-relaxed text-start max-[500px]:text-[0.9rem] [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-bold`}
              // Tafsir content is authored as HTML via the admin panel's rich
              // text editor (never user-submitted), so rendering it directly
              // is safe — matches QnaCard's answer rendering.
              dangerouslySetInnerHTML={{ __html: tafsir.content }}
            />
          </>
        ) : (
          <p className={`${roboto.className} text-[1rem] text-[#7D887A] italic`}>
            No tafsir available yet for this ayah.
          </p>
        )}
      </div>

      <div className="w-full max-w-[850px] flex justify-between items-center mt-8 pt-6 border-t border-[#C2CDD3]/60">
        <button
          type="button"
          disabled={ayahNumber <= 1}
          onClick={() => onAyahChange(ayahNumber - 1)}
          className={`${roboto.className} ${td.navBtn}`}
        >
          <HiArrowLeft className="w-4 h-4" />
          Previous Ayah
        </button>
        <button
          type="button"
          disabled={ayahNumber >= verseCount}
          onClick={() => onAyahChange(ayahNumber + 1)}
          className={`${roboto.className} ${td.navBtn}`}
        >
          Next Ayah
          <HiArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TafsirDetails;
