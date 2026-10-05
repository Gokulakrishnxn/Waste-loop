import React from "react";
import { Package, Users, Wrench } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  subtext: string;
  badge: string;
  accent: "green" | "blue" | "purple" | "lime" | "cyan" | "amber";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  badge,
  accent,
}) => {
  // Normalize accents: green/lime, blue/cyan, purple/amber
  const isGreen = accent === "green" || accent === "lime";
  const isBlue = accent === "blue" || accent === "cyan";

  const icon = isGreen ? (
    <Package className="h-5 w-5 text-[#1D7A4B]" />
  ) : isBlue ? (
    <Users className="h-5 w-5 text-[#0071E3]" />
  ) : (
    <Wrench className="h-5 w-5 text-[#8944AB]" />
  );

  const iconBg = isGreen
    ? "bg-[#1D7A4B]/8 border-[#1D7A4B]/15"
    : isBlue
    ? "bg-[#0071E3]/8 border-[#0071E3]/15"
    : "bg-[#8944AB]/8 border-[#8944AB]/15";

  const badgeColor = isGreen
    ? "text-[#1D7A4B] bg-[#1D7A4B]/8"
    : isBlue
    ? "text-[#0071E3] bg-[#0071E3]/8"
    : "text-[#8944AB] bg-[#8944AB]/8";

  return (
    <div className="glass-card p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all rounded-2xl">
      {/* Top Row: Label and Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium text-[#6E6E73]">{label}</span>
        <span
          className={`text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full uppercase ${badgeColor}`}
        >
          {badge}
        </span>
      </div>

      {/* Middle: Value & Icon */}
      <div className="flex items-center gap-3.5 my-4">
        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 ${iconBg}`}
        >
          {icon}
        </div>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            {value}
          </span>
          <span className="text-xs sm:text-[13px] font-medium text-[#86868B]">{unit}</span>
        </div>
      </div>

      {/* Bottom: Subtitle */}
      <div className="text-[12px] text-[#86868B] leading-tight">
        {subtext}
      </div>
    </div>
  );
};
