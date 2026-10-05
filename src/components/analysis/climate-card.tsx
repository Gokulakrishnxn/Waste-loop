import React from "react";
import { CloudRain, Droplets, MapPin, Thermometer, Wind } from "lucide-react";
import { ClimateData } from "@/lib/calculator/types";

interface ClimateCardProps {
  climate: ClimateData;
}

export const ClimateCard: React.FC<ClimateCardProps> = ({ climate }) => {
  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#0071E3]/8 border border-[#0071E3]/15 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-[#0071E3]" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#86868B]">
              Site & Climate Telemetry
            </div>
            <h3 className="text-base font-bold text-[#1D1D1F] tracking-tight">
              {climate.name}
            </h3>
            <p className="text-[11px] font-mono text-[#86868B]">
              {Math.abs(climate.latitude).toFixed(4)}° {climate.latitude >= 0 ? "N" : "S"},{" "}
              {Math.abs(climate.longitude).toFixed(4)}° {climate.longitude >= 0 ? "E" : "W"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <div className="rounded-full bg-[#0071E3]/8 px-3 py-1 text-[11px] font-semibold text-[#0071E3] tracking-wide uppercase">
            {climate.exposureLevel} Exposure
          </div>
          <div className="rounded-full bg-[#F5F5F7] px-3 py-1 text-[11px] font-semibold text-[#6E6E73]">
            ×{climate.climateFactor.toFixed(2)} Maint Mod
          </div>
        </div>
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F5F7]/80">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Thermometer className="h-4 w-4 text-[#0071E3]" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[#1D1D1F] leading-tight">
              {climate.temperature}°C
            </div>
            <div className="text-[10px] text-[#86868B] truncate">Temperature</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F5F7]/80">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Droplets className="h-4 w-4 text-[#0071E3]" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[#1D1D1F] leading-tight">
              {climate.humidity}%
            </div>
            <div className="text-[10px] text-[#86868B] truncate">Humidity</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F5F7]/80">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Wind className="h-4 w-4 text-[#0071E3]" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[#1D1D1F] leading-tight">
              {climate.windSpeed} km/h
            </div>
            <div className="text-[10px] text-[#86868B] truncate">Wind Speed</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F5F7]/80">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
            <CloudRain className="h-4 w-4 text-[#0071E3]" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[#1D1D1F] leading-tight">
              {climate.rainfall} mm
            </div>
            <div className="text-[10px] text-[#86868B] truncate">Daily Rain</div>
          </div>
        </div>
      </div>

      {/* Climate Context Note */}
      <div className="text-[11px] text-[#86868B] pt-2 border-t border-black/[0.04] flex items-center justify-between">
        <span>{climate.statusMessage}</span>
        <span className="font-mono text-[10px] text-[#AEAEB2]">Open-Meteo API</span>
      </div>
    </div>
  );
};
