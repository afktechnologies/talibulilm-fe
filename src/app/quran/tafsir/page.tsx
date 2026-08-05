import TafsirMainPage from "@/components/Quran/Tafsir/mainTafsirPage";

interface QuranTafsirPageProps {
  searchParams: Promise<{
    surahSlug?: string;
    ayahNumber?: string;
    language?: string;
  }>;
}

const QuranTafsir = async ({ searchParams }: QuranTafsirPageProps) => {
  const params = await searchParams;

  return (
    <div className="pb-20">
      <TafsirMainPage
        initialSurahSlug={params.surahSlug || null}
        initialAyahNumber={params.ayahNumber ? parseInt(params.ayahNumber, 10) : null}
        initialLanguage={params.language || null}
      />
    </div>
  );
};

export default QuranTafsir;
