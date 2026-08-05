"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { primary_font, roboto } from "@/app/font/font";
import Rectangle from "@/components/skeleton/rectangle";
import type { ArticleList } from "@/types/article";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({ article }: { article: ArticleList }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = article.featuredImage && !imgFailed;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col rounded-[14px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] cursor-pointer transition-[transform,box-shadow] duration-[220ms] ease-in-out hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(0,48,73,0.15)]"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-50">
        {article.category && (
          <span
            className={`${roboto.className} absolute top-3 left-3 z-[1] text-[0.65rem] font-bold tracking-[0.1em] uppercase text-white bg-[#003049]/85 backdrop-blur-sm px-2.5 py-1 rounded-full`}
          >
            {article.category}
          </span>
        )}
        {showImage ? (
          <>
            {!imgLoaded && (
              <Rectangle width="100%" height="100%" borderRadius="0px" className="!absolute inset-0" />
            )}
            <Image
              src={article.featuredImage as string}
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
              className={`object-cover transition-[transform,opacity] duration-[350ms] ease-in-out group-hover:scale-[1.06] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[rgba(219,179,70,0.1)] text-[#DBB346] text-[2rem] font-bold">
            {article.title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <p className={`${roboto.className} text-xs text-[#8A6D59]`}>
          {[article.author, article.publishedAt ? formatDate(article.publishedAt) : null]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h3
          className={`${primary_font.className} text-[1.15rem] text-[#5C6357] leading-snug line-clamp-2`}
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p className={`${roboto.className} text-sm text-[#7D887A] line-clamp-3`}>
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
