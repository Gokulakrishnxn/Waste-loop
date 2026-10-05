import React from "react";

export interface DonutSegment {
  id: string;
  label: string;
  percentage: number;
  tonnes: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerValue: string;
  centerLabel: string;
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  centerValue,
  centerLabel,
  size = 140,
}) => {
  const radius = 50;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 140"
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#141A16"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {segments.map((seg) => {
          const strokeLength = (seg.percentage / 100) * circumference;
          const strokeOffset = (accumulatedPercentage / 100) * circumference;
          accumulatedPercentage += seg.percentage;

          return (
            <circle
              key={seg.id}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${Math.max(0, strokeLength - 1.5)} ${circumference}`}
              strokeDashoffset={-strokeOffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          );
        })}
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-sm font-extrabold text-white leading-tight">
          {centerValue}
        </span>
        <span className="text-[10px] text-[#8E9B92] leading-tight">
          {centerLabel}
        </span>
      </div>
    </div>
  );
};
