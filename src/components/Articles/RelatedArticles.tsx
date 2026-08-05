import { primary_font, roboto } from "@/app/font/font";
import ArticleCard from "./ArticleCard";
import type { ArticleList } from "@/types/article";

export default function RelatedArticles({ articles }: { articles: ArticleList[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 py-10 border-t border-[#C2CDD3]/60">
      <div className="mb-6">
        <span
          className={`${roboto.className} text-[0.7rem] font-bold tracking-[0.16em] uppercase text-[#8A6D59]`}
        >
          Keep Reading
        </span>
        <h2 className={`${primary_font.className} text-[1.4rem] text-[#5C6357] mt-1`}>
          Related Articles
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
