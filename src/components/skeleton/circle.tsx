"use client";

import React from "react";
import styles from "./skeleton.module.css";

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

  return <div className={`${styles.skeleton} ${className}`} style={style}></div>;
};

export default Circle;
