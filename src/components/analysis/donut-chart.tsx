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
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  const segmentsWithOffsets = segments.map((seg, idx) => {
    const priorPercentage = segments
      .slice(0, idx)
      .reduce((sum, s) => sum + s.percentage, 0);
    return {
      ...seg,
      strokeOffset: (priorPercentage / 100) * circumference,
    };
  });

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 140"
        className="transform -rotate-90"
      >
        {/* Subtle background track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#E5E5EA"
          strokeWidth={strokeWidth}
        />

        {/* Segments */}
        {segmentsWithOffsets.map((seg) => {
          const strokeLength = (seg.percentage / 100) * circumference;

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
              strokeDashoffset={-seg.strokeOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          );
        })}
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
        <span className="text-sm sm:text-base font-bold text-[#1D1D1F] leading-tight tracking-tight">
          {centerValue}
        </span>
        <span className="text-[10px] text-[#86868B] leading-tight mt-0.5">
          {centerLabel}
        </span>
      </div>
    </div>
  );
};
