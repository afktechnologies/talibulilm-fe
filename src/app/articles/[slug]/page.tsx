import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleApi } from "@/services/api/endpoints/article";
import { ArticleStatus, type ArticleList } from "@/types/article";
import ArticleDetail from "@/components/Articles/ArticleDetail";
import { computeArticleRelations } from "@/components/Articles/articleRelations";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getPublishedArticle(slug: string): Promise<ArticleList | null> {
  try {
    const response = await articleApi.getArticleBySlug(slug);
    // `findBySlug` on the backend doesn't filter by status (used by the
    // admin panel too) — enforce "published only" here so a guessed
    // draft/archived slug 404s on the public site instead of leaking.
    if (response.data.status !== ArticleStatus.PUBLISHED) return null;
    return response.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return { title: "Article Not Found | Talibulilm" };
  }

  const title = article.seoTitle || `${article.title} | Talibulilm`;
  const description = article.seoDescription || article.excerpt || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  let related: ArticleList[] = [];
  let previous: ArticleList | null = null;
  let next: ArticleList | null = null;

  try {
    const { data: allArticles } = await articleApi.getAllArticles();
    ({ related, previous, next } = computeArticleRelations(article, allArticles));
  } catch {
    // Related/Prev-Next are a nice-to-have enrichment — if this fetch fails,
    // the article itself (already loaded above) still renders fine without them.
  }

  return <ArticleDetail article={article} related={related} previous={previous} next={next} />;
}
