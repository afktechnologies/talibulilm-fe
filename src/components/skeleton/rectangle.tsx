"use client";

import React from "react";
import styles from "./skeleton.module.css";

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

  return <div className={`${styles.skeleton} ${className}`} style={style}></div>;
};

export default Rectangle;
