"use client";

import { useEffect, useState } from "react";

/** Slim fixed progress bar reflecting scroll position through the page —
 *  a lightweight, dependency-free "reading progress" affordance. */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, percent)));
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-transparent" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-[#DBB346] to-[#8A6D59] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
