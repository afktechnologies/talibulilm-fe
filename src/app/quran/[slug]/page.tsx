import FallbackError from "@/components/common/Errors/Fallback/fallbackError";
import styles from "./index.module.css";
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
    <div className={styles.main}>
      <QuranDetailsPage surahSlug={slug} />
    </div>
  );
};

export default QuranDetails;