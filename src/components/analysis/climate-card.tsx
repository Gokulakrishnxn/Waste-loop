import React from "react";
import { CloudRain, Droplets, MapPin, Thermometer, Wind } from "lucide-react";
import { ClimateData } from "@/lib/calculator/types";

interface ClimateCardProps {
  climate: ClimateData;
}

export const ClimateCard: React.FC<ClimateCardProps> = ({ climate }) => {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D0B] p-5 sm:p-6 relative overflow-hidden">
      {/* Background Architectural Skyline Silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-end">
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className="w-full h-24 text-white"
          fill="currentColor"
        >
          <path d="M0,160 L0,120 L25,120 L25,95 L40,95 L40,120 L60,120 L60,70 L75,70 L75,120 L100,120 L100,85 L120,85 L120,120 L150,120 L150,55 L160,55 L160,35 L165,35 L165,55 L180,55 L180,120 L210,120 L210,90 L235,90 L235,120 L270,120 L270,75 L285,75 L285,60 L295,60 L295,75 L310,75 L310,120 L350,120 L350,100 L370,100 L370,120 L400,120 L400,45 L415,45 L415,20 L420,20 L420,45 L440,45 L440,120 L480,120 L480,80 L510,80 L510,120 L550,120 L550,65 L570,65 L570,120 L620,120 L620,85 L645,85 L645,120 L680,120 L680,50 L695,50 L695,25 L700,25 L700,50 L720,50 L720,120 L760,120 L760,95 L790,95 L790,120 L830,120 L830,70 L855,70 L855,120 L900,120 L900,40 L915,40 L915,15 L920,15 L920,40 L940,40 L940,120 L980,120 L980,85 L1010,85 L1010,120 L1050,120 L1050,60 L1075,60 L1075,120 L1120,120 L1120,90 L1150,90 L1150,120 L1200,120 L1200,160 Z" />
        </svg>
      </div>

      {/* Top Section: Site + Climate Header & Badges */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.06] pb-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#C8FF4A]/10 border border-[#C8FF4A]/20 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="h-4 w-4 text-[#C8FF4A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A2B2A6]">
                Site + Climate
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
              {climate.name}
            </h3>
            <p className="text-[11px] font-mono text-[#6E7E74] mt-0.5">
              {Math.abs(climate.latitude).toFixed(4)}° {climate.latitude >= 0 ? "N" : "S"},{" "}
              {Math.abs(climate.longitude).toFixed(4)}° {climate.longitude >= 0 ? "E" : "W"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="rounded-full border border-[#67E8D1]/40 bg-[#67E8D1]/10 px-3 py-1 text-[11px] font-mono font-medium text-[#67E8D1] tracking-wider uppercase">
            {climate.exposureLevel} EXPOSURE
          </div>
          <div className="rounded-full border border-white/[0.08] bg-[#0E1310] px-2.5 py-1 text-[11px] font-mono text-[#8E9B92]">
            ×{climate.climateFactor.toFixed(2)} Maint Mod
          </div>
        </div>
      </div>

      {/* Bottom Section: 4 Telemetry Metrics & Status */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <Thermometer className="h-4 w-4 text-[#67E8D1] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">{climate.temperature}°C</div>
              <div className="text-[10px] text-[#7A8A80]">Temperature</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Droplets className="h-4 w-4 text-[#67E8D1] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">RH {climate.humidity}%</div>
              <div className="text-[10px] text-[#7A8A80]">Humidity</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Wind className="h-4 w-4 text-[#67E8D1] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">{climate.windSpeed} km/h</div>
              <div className="text-[10px] text-[#7A8A80]">Wind Speed</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <CloudRain className="h-4 w-4 text-[#67E8D1] shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">{climate.rainfall} mm/day</div>
              <div className="text-[10px] text-[#7A8A80]">Rainfall</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#8E9B92] lg:text-right border-t lg:border-t-0 border-white/[0.06] pt-2 lg:pt-0">
          <span>{climate.statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
