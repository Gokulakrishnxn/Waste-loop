import React from "react";
import { Package, Users, Wrench } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  subtext: string;
  badge: string;
  accent: "lime" | "cyan" | "amber";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  badge,
  accent,
}) => {
  const iconMap = {
    lime: <Package className="h-5 w-5 text-[#C8FF4A]" />,
    cyan: <Users className="h-5 w-5 text-[#67E8D1]" />,
    amber: <Wrench className="h-5 w-5 text-[#F5B94C]" />,
  };

  const bgIconMap = {
    lime: "bg-[#C8FF4A]/10 border-[#C8FF4A]/20 shadow-[0_0_15px_rgba(200,255,74,0.15)]",
    cyan: "bg-[#67E8D1]/10 border-[#67E8D1]/20 shadow-[0_0_15px_rgba(103,232,209,0.15)]",
    amber: "bg-[#F5B94C]/10 border-[#F5B94C]/20 shadow-[0_0_15px_rgba(245,185,76,0.15)]",
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D0B] p-5 flex flex-col justify-between hover:border-white/[0.14] transition-all">
      {/* Top Row: Category & Technical Tag */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#C5D0C8]">{label}</span>
        <span className="text-[10px] font-mono tracking-wider text-[#7E8D82] px-2 py-0.5 rounded-full border border-white/[0.06] bg-[#0E1310] uppercase">
          {badge}
        </span>
      </div>

      {/* Middle: Icon & Large Number */}
      <div className="flex items-center gap-3.5 my-3">
        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 ${bgIconMap[accent]}`}
        >
          {iconMap[accent]}
        </div>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {value}
          </span>
          <span className="text-sm font-medium text-[#8E9B92]">{unit}</span>
        </div>
      </div>

      {/* Bottom: Subtitle */}
      <div className="text-[11px] text-[#7A8A80] leading-tight">
        {subtext}
      </div>
    </div>
  );
};
