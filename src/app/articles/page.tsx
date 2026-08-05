import type { Metadata } from "next";
import ArticlesHero from "@/components/Articles/ArticlesHero";
import ArticlesList from "@/components/Articles/ArticlesList";

export const metadata: Metadata = {
  title: "Articles | Talibulilm",
  description:
    "Read Islamic articles, guides, and reflections from Talibulilm covering Quran, Hadith, and daily practice.",
};

export default function ArticlesPage() {
  return (
    <div>
      <ArticlesHero />
      <ArticlesList />
    </div>
  );
}
