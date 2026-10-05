import React from "react";
import { CloudRain, Droplets, MapPin, Thermometer, Wind } from "lucide-react";
import { ClimateData } from "@/lib/calculator/types";

interface ClimateCardProps {
  climate: ClimateData;
}

export const ClimateCard: React.FC<ClimateCardProps> = ({ climate }) => {
  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all">
      {/* Top Section: Site + Climate Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-black/[0.06]">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#0071E3]/8 border border-[#0071E3]/15 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="h-4 w-4 text-[#0071E3]" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              Site & Climate Telemetry
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F] tracking-tight mt-0.5">
              {climate.name}
            </h3>
            <p className="text-[11px] font-mono text-[#86868B] mt-0.5">
              {Math.abs(climate.latitude).toFixed(4)}° {climate.latitude >= 0 ? "N" : "S"},{" "}
              {Math.abs(climate.longitude).toFixed(4)}° {climate.longitude >= 0 ? "E" : "W"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <div className="rounded-full bg-[#0071E3]/8 px-3 py-1 text-[11px] font-medium text-[#0071E3] tracking-wide uppercase">
            {climate.exposureLevel} Exposure
          </div>
          <div className="rounded-full bg-[#F5F5F7] px-3 py-1 text-[11px] font-medium text-[#6E6E73]">
            ×{climate.climateFactor.toFixed(2)} Maint Mod
          </div>
        </div>
      </div>

      {/* Bottom Section: 4 Telemetry Metrics & Status */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#F5F5F7] flex items-center justify-center shrink-0">
              <Thermometer className="h-4 w-4 text-[#0071E3]" />
            </div>
            <div>
              <div className="text-sm sm:text-[15px] font-semibold text-[#1D1D1F]">
                {climate.temperature}°C
              </div>
              <div className="text-[11px] text-[#86868B]">Temperature</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#F5F5F7] flex items-center justify-center shrink-0">
              <Droplets className="h-4 w-4 text-[#0071E3]" />
            </div>
            <div>
              <div className="text-sm sm:text-[15px] font-semibold text-[#1D1D1F]">
                {climate.humidity}%
              </div>
              <div className="text-[11px] text-[#86868B]">Humidity</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#F5F5F7] flex items-center justify-center shrink-0">
              <Wind className="h-4 w-4 text-[#0071E3]" />
            </div>
            <div>
              <div className="text-sm sm:text-[15px] font-semibold text-[#1D1D1F]">
                {climate.windSpeed} km/h
              </div>
              <div className="text-[11px] text-[#86868B]">Wind Speed</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#F5F5F7] flex items-center justify-center shrink-0">
              <CloudRain className="h-4 w-4 text-[#0071E3]" />
            </div>
            <div>
              <div className="text-sm sm:text-[15px] font-semibold text-[#1D1D1F]">
                {climate.rainfall} mm
              </div>
              <div className="text-[11px] text-[#86868B]">Daily Rain</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#86868B] lg:text-right pt-2 lg:pt-0 border-t lg:border-t-0 border-black/[0.04]">
          <span>{climate.statusMessage}</span>
        </div>
      </div>
    </div>
  );
};
