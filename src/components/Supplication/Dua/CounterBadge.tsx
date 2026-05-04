"use client";

import { useState } from "react";

interface CounterBadgeProps {
  targetCount: number;
}

const CounterBadge = ({ targetCount }: CounterBadgeProps) => {
  const [count, setCount] = useState(0);
  const isComplete = count >= targetCount;

  const handleClick = () => {
    if (!isComplete) setCount((c) => c + 1);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
  };

  const progress = Math.min((count / targetCount) * 100, 100);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
      {/* Circular progress button */}
      <button
        title={isComplete ? "Completed! Click to reset" : `${count}/${targetCount} — tap to count`}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-150 active:scale-90 ${
          isComplete ? "cursor-pointer" : "cursor-pointer"
        }`}
        onClick={isComplete ? handleReset : handleClick}
      >
        {/* SVG ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          width="56"
          height="56"
          viewBox="0 0 56 56"
        >
          {/* Track */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          {/* Progress */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke={isComplete ? "#16a34a" : "#c69e30"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Inner count */}
        <span
          className={`relative z-10 text-sm font-bold transition-colors duration-200 ${
            isComplete ? "text-green-600" : "text-[#003049]"
          }`}
        >
          {isComplete ? (
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            count
          )}
        </span>
      </button>

      {/* Target label */}
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-none">
        {isComplete ? "Done" : `×${targetCount}`}
      </span>
    </div>
  );
};

export default CounterBadge;