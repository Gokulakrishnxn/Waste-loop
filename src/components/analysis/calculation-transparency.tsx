import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { CalculationBreakdown } from "@/lib/calculator/types";

interface CalculationTransparencyProps {
  breakdown: CalculationBreakdown;
}

export const CalculationTransparency: React.FC<CalculationTransparencyProps> = ({
  breakdown,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D0B] overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs text-[#A2B2A6] hover:text-white transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Info className="h-4 w-4 text-[#C8FF4A]" />
          <span className="font-semibold text-white tracking-wide">
            How was this calculated?
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#6E7E74]">
          <span>{isOpen ? "Collapse breakdown" : "Expand calculation formulas"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#C8FF4A]" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-white/[0.06] p-5 space-y-5 text-xs bg-[#0C100D]">
          {/* Construction waste formula */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                1. Construction Waste Estimation
              </span>
              <span className="text-[#C8FF4A] font-bold font-mono">
                {breakdown.construction.totalTonnes.toLocaleString()} t
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1310] border border-white/[0.04] text-[#8E9B92] space-y-1 font-mono text-[11px]">
              <div>Built-up Area: {breakdown.construction.area.toLocaleString()} m²</div>
              <div>× Building-type factor: {breakdown.construction.baseKgM2} kg/m²</div>
              <div>× Material factor: {breakdown.construction.compositeMaterialFactor.toFixed(2)}</div>
              <div>× Scale factor: {breakdown.construction.scaleFactor.toFixed(2)}</div>
              <div className="pt-1.5 border-t border-white/[0.06] text-white font-semibold">
                = {breakdown.construction.totalKg.toLocaleString()} kg ({breakdown.construction.totalTonnes.toLocaleString()} tonnes)
              </div>
            </div>
          </div>

          {/* Operational waste formula */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                2. Operational Waste Estimation (Annual)
              </span>
              <span className="text-[#67E8D1] font-bold font-mono">
                {breakdown.operational.totalTonnes.toLocaleString()} t / year
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1310] border border-white/[0.04] text-[#8E9B92] space-y-1 font-mono text-[11px]">
              <div>Number of Users: {breakdown.operational.users.toLocaleString()} occupants</div>
              <div>× Occupant waste factor: {breakdown.operational.kgPerUserDay.toFixed(2)} kg/user/day</div>
              <div>× Annual operating duration: {breakdown.operational.daysPerYear} days</div>
              <div className="pt-1.5 border-t border-white/[0.06] text-white font-semibold">
                = {breakdown.operational.totalKg.toLocaleString()} kg/year ({breakdown.operational.totalTonnes.toLocaleString()} t/year)
              </div>
            </div>
          </div>

          {/* Maintenance waste formula */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                3. Maintenance Waste Estimation (Annual)
              </span>
              <span className="text-[#F5B94C] font-bold font-mono">
                {breakdown.maintenance.totalTonnes.toLocaleString()} t / year
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0E1310] border border-white/[0.04] text-[#8E9B92] space-y-1 font-mono text-[11px]">
              <div>Built-up Area: {breakdown.maintenance.area.toLocaleString()} m²</div>
              <div>× Maintenance benchmark: {breakdown.maintenance.maintKgM2Year.toFixed(1)} kg/m²/year</div>
              <div>× Site climate factor: {breakdown.maintenance.climateFactor.toFixed(2)}</div>
              <div className="pt-1.5 border-t border-white/[0.06] text-white font-semibold">
                = {breakdown.maintenance.totalKg.toLocaleString()} kg/year ({breakdown.maintenance.totalTonnes.toLocaleString()} t/year)
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0E1310] border border-white/[0.04] text-[11px] text-[#7A8A80]">
            <span className="text-[#C8FF4A] font-semibold block mb-0.5">Methodology Disclaimer</span>
            These are planning estimates derived from empirical building benchmarks and circular economy models. Actual project quantities may vary based on procurement, site sorting, and local circular pathways.
          </div>
        </div>
      )}
    </div>
  );
};
