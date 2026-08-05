"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { roboto } from "@/app/font/font";
import type { DuaItem } from "@/app/supplication/page";
import Rectangle from "@/components/skeleton/rectangle";

type DuaCardProps = {
  data: DuaItem;
};

const DailyDhikrCard = ({ data }: DuaCardProps) => {
  const [src, setSrc] = useState(data.pic);
  const [loaded, setLoaded] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleError = () => {
    // Only fall back once — if the bundled local image is somehow also
    // broken, don't loop forever re-triggering onError.
    if (!triedFallback) {
      setTriedFallback(true);
      setLoaded(false);
      setSrc(data.fallbackPic);
    }
  };

  return (
    <div className="group flex flex-col rounded-[14px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] cursor-pointer transition-[transform,box-shadow] duration-[220ms] ease-in-out hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(0,48,73,0.15)]">
      <Link href={`/supplication/${data.slug}`}>
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-50">
        {!loaded && (
          <Rectangle width="100%" height="100%" borderRadius="0px" className="!absolute inset-0" />
        )}
        <Image
          src={src}
          alt={data.title}
          width={300}
          height={200}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-[transform,opacity] duration-[350ms] ease-in-out group-hover:scale-[1.06] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,30,50,0.35)_100%)]" />
      </div>
      <div className="flex items-center gap-[0.6rem] py-[0.85rem] px-4">
        <span className="text-[1.25rem] flex-shrink-0">{data.icon}</span>
        <h3 className={`${roboto.className} text-[0.95rem] font-semibold text-[#1a1a1a] m-0 leading-[1.3] max-[480px]:text-[0.85rem]`}>{data.title}</h3>
      </div>
      </Link>
    </div>
  );
};

export default DailyDhikrCard;
