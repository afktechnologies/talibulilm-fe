import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { primary_font, roboto } from "@/app/font/font";
import type { ArticleList } from "@/types/article";
import { estimateReadingTime } from "./readingTime";
import ReadingProgressBar from "./ReadingProgressBar";
import RelatedArticles from "./RelatedArticles";
import ArticleNav from "./ArticleNav";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface ArticleDetailProps {
  article: ArticleList;
  related: ArticleList[];
  previous: ArticleList | null;
  next: ArticleList | null;
}

export default function ArticleDetail({
  article,
  related,
  previous,
  next,
}: ArticleDetailProps) {
  const readingMinutes = estimateReadingTime(article.content);

  return (
    <div className="flex flex-col">
      <ReadingProgressBar />

      <div className="flex justify-center overflow-x-hidden">
        <article className="flex flex-col w-full max-w-[860px] px-4 py-10 sm:px-6">
          <Link
            href="/articles"
            className="group inline-flex items-center gap-1.5 text-sm text-[#8A6D59] mb-6 w-fit transition-colors duration-150 hover:text-[#5C6357]"
          >
            <HiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className={`${roboto.className} group-hover:underline`}>
              Back to Articles
            </span>
          </Link>

          {article.featuredImage && (
            <div className="relative w-full aspect-[16/9] rounded-[14px] overflow-hidden bg-gray-50 mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 860px) 100vw, 860px"
                className="object-cover"
              />
            </div>
          )}

          {article.category && (
            <span
              className={`${roboto.className} inline-block w-fit text-[0.65rem] font-bold tracking-widest uppercase text-white bg-[#003049] px-2.5 py-1 rounded-full mb-3`}
            >
              {article.category}
            </span>
          )}

          <h1
            className={`${primary_font.className} text-[2.1rem] text-[#5C6357] leading-[1.2] tracking-tight mb-3 max-[600px]:text-[1.6rem]`}
          >
            {article.title}
          </h1>

          <div
            className={`${roboto.className} flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#8A6D59] mb-6 pb-6 border-b border-[#C2CDD3]/60`}
          >
            {[
              article.author,
              article.publishedAt ? formatDate(article.publishedAt) : null,
              `${readingMinutes} min read`,
            ]
              .filter(Boolean)
              .map((piece, index, arr) => (
                <span key={piece} className="flex items-center gap-2">
                  {piece}
                  {index < arr.length - 1 && (
                    <span className="text-[#C2CDD3]">·</span>
                  )}
                </span>
              ))}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`${roboto.className} text-xs text-[#8A6D59] bg-[rgba(219,179,70,0.12)] border border-[rgba(219,179,70,0.25)] px-2.5 py-1 rounded-full transition-colors duration-150 hover:bg-[rgba(219,179,70,0.22)]`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className={`${roboto.className} max-w-none text-[1.05rem] text-[#3a3a2e] leading-[1.85] [&_h2]:text-[#5C6357] [&_h2]:font-semibold [&_h2]:text-[1.4rem] [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-[#5C6357] [&_h3]:font-semibold [&_h3]:text-[1.15rem] [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:mb-5 [&_a]:text-[#8A6D59] [&_a]:underline [&_a]:decoration-[#DBB346]/50 [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-150 hover:[&_a]:text-[#5C6357] [&_img]:rounded-[10px] [&_img]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DBB346]/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#5C6357] [&_blockquote]:my-6 [&_strong]:text-[#5C6357] [&_strong]:font-semibold`}
            // Content is authored exclusively by SUPER_ADMIN/ADMIN/EDITOR roles
            // via the admin panel's rich-text editor — never user-submitted —
            // so rendering it directly is safe.
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>

      {/* <ArticleNav previous={previous} next={next} /> */}
      <RelatedArticles articles={related} />
    </div>
  );
}
