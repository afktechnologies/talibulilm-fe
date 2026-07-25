"use client";

import React from "react";

interface RectangleProps {
  width?: number | string;      // default: 100%
  height?: number | string;     // default: 20px
  borderRadius?: number | string; // default: 4px
  className?: string;
}

const Rectangle: React.FC<RectangleProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius,
  };

  return <div className={`inline-block bg-[linear-gradient(90deg,#ececec_25%,#f5f5f5_50%,#ececec_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite] ${className}`} style={style}></div>;
};

export default Rectangle;
