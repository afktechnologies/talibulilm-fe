"use client";

import { useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: React.ReactNode;
  /** Rendered in place of `children` until the wrapper scrolls near the viewport. */
  placeholder?: React.ReactNode;
  rootMargin?: string;
  className?: string;
}

/**
 * Defers mounting `children` until the wrapper is about to enter the
 * viewport, then keeps them mounted permanently (no unmount-on-scroll-away
 * thrash). Cheap "lazy rendering" for a bounded-but-not-tiny list of heavy
 * sections — avoids pulling in a virtualization library for a dataset that's
 * tens, not thousands, of rows (see `scholarApi.getAllScholars`).
 */
export default function LazyMount({
  children,
  placeholder = null,
  rootMargin = "400px",
  className,
}: LazyMountProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : placeholder}
    </div>
  );
}
