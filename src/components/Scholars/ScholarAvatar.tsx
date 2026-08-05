"use client";

import { useState } from "react";
import Image from "next/image";
import Rectangle from "@/components/skeleton/rectangle";
import type { ScholarList } from "@/types/scholar";

interface ScholarAvatarProps {
  scholar: ScholarList;
  size: number;
  className?: string;
  textSizeClassName?: string;
}

/** Shared circular avatar (photo with load/error fallback to an initial) —
 *  used by the Grid, List, and Horizontal timeline views plus the card. */
export default function ScholarAvatar({
  scholar,
  size,
  className = "",
  textSizeClassName = "text-[1.4rem]",
}: ScholarAvatarProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = scholar.image && !imgFailed;

  return (
    <div
      className={`relative rounded-full overflow-hidden flex-shrink-0 bg-[rgba(219,179,70,0.12)] ${className}`}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <>
          {!imgLoaded && <Rectangle width="100%" height="100%" borderRadius="9999px" />}
          <Image
            src={scholar.image as string}
            alt={scholar.name}
            fill
            sizes={`${size}px`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            className={`object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </>
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-[#DBB346] font-semibold ${textSizeClassName}`}>
          {(scholar.nameAr ?? scholar.name).charAt(0)}
        </div>
      )}
    </div>
  );
}
