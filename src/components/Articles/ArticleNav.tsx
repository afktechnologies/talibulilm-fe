import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { roboto, primary_font } from "@/app/font/font";
import type { ArticleList } from "@/types/article";

interface ArticleNavProps {
  previous: ArticleList | null;
  next: ArticleList | null;
}

export default function ArticleNav({ previous, next }: ArticleNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="w-full max-w-[860px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
    >
      {previous ? (
        <Link
          href={`/articles/${previous.slug}`}
          className="group flex items-center gap-3 bg-white border border-[#C2CDD3] rounded-2xl p-4 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[#DBB346] hover:shadow-[0_10px_28px_rgba(0,48,73,0.1)]"
        >
          <HiArrowLeft className="w-5 h-5 text-[#8A6D59] flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
          <div className="min-w-0">
            <p
              className={`${roboto.className} text-[0.7rem] font-semibold uppercase tracking-wide text-[#8A6D59]`}
            >
              Previous
            </p>
            <p
              className={`${primary_font.className} text-sm text-[#5C6357] leading-snug line-clamp-1`}
            >
              {previous.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="group flex items-center justify-end gap-3 bg-white border border-[#C2CDD3] rounded-2xl p-4 text-right transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[2px] hover:border-[#DBB346] hover:shadow-[0_10px_28px_rgba(0,48,73,0.1)]"
        >
          <div className="min-w-0">
            <p
              className={`${roboto.className} text-[0.7rem] font-semibold uppercase tracking-wide text-[#8A6D59]`}
            >
              Next
            </p>
            <p
              className={`${primary_font.className} text-sm text-[#5C6357] leading-snug line-clamp-1`}
            >
              {next.title}
            </p>
          </div>
          <HiArrowRight className="w-5 h-5 text-[#8A6D59] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
