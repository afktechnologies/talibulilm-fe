import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import QuranDetailsPage from "@/components/Quran/Details/detailsPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const QuranDetails = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (!slug) {
    return <div>
      <FallbackError/>
    </div>;
  }

  return (
    <div className="bg-[#f0eee7] pt-12 pb-30 max-md:pt-8 max-md:pb-22 max-[500px]:pt-8 max-[500px]:pb-14 max-[400px]:pt-8 max-[400px]:pb-12">
      <QuranDetailsPage surahSlug={slug} />
    </div>
  );
};

export default QuranDetails;