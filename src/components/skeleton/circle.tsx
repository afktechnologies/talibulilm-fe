"use client";

import React from "react";

interface CircleProps {
  size?: number | string; // width & height (default: 40px)
  className?: string;
}

const Circle: React.FC<CircleProps> = ({ size = "40px", className = "" }) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
  };

  return <div className={`inline-block bg-[linear-gradient(90deg,#ececec_25%,#f5f5f5_50%,#ececec_75%)] bg-[length:200%_100%] animate-[shimmer_1.5s_linear_infinite] ${className}`} style={style}></div>;
};

export default Circle;
