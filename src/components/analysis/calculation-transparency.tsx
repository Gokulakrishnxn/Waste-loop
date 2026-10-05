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
    <div className="glass-card rounded-2xl overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-[13px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Info className="h-4 w-4 text-[#1D7A4B]" />
          <span className="font-semibold text-[#1D1D1F] tracking-tight">
            How was this calculated?
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#86868B]">
          <span>{isOpen ? "Hide formulas" : "View calculation formulas"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#1D7A4B]" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-black/[0.06] p-5 sm:p-6 space-y-5 text-xs bg-white/50">
          {/* Construction waste formula */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1D1D1F]">
                1. Construction Waste Estimation
              </span>
              <span className="text-[#1D7A4B] font-bold font-mono">
                {breakdown.construction.totalTonnes.toLocaleString()} t
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F5F7] text-[#6E6E73] space-y-1 font-mono text-[11px] sm:text-xs">
              <div>Built-up Area: {breakdown.construction.area.toLocaleString()} m²</div>
              <div>× Building-type factor: {breakdown.construction.baseKgM2} kg/m²</div>
              <div>× Material factor: {breakdown.construction.compositeMaterialFactor.toFixed(2)}</div>
              <div>× Scale factor: {breakdown.construction.scaleFactor.toFixed(2)}</div>
              <div className="pt-2 border-t border-black/[0.06] text-[#1D1D1F] font-semibold">
                = {breakdown.construction.totalKg.toLocaleString()} kg ({breakdown.construction.totalTonnes.toLocaleString()} tonnes)
              </div>
            </div>
          </div>

          {/* Operational waste formula */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1D1D1F]">
                2. Operational Waste Estimation (Annual)
              </span>
              <span className="text-[#0071E3] font-bold font-mono">
                {breakdown.operational.totalTonnes.toLocaleString()} t / year
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F5F7] text-[#6E6E73] space-y-1 font-mono text-[11px] sm:text-xs">
              <div>Number of Users: {breakdown.operational.users.toLocaleString()} occupants</div>
              <div>× Occupant waste factor: {breakdown.operational.kgPerUserDay.toFixed(2)} kg/user/day</div>
              <div>× Annual operating duration: {breakdown.operational.daysPerYear} days</div>
              <div className="pt-2 border-t border-black/[0.06] text-[#1D1D1F] font-semibold">
                = {breakdown.operational.totalKg.toLocaleString()} kg/year ({breakdown.operational.totalTonnes.toLocaleString()} t/year)
              </div>
            </div>
          </div>

          {/* Maintenance waste formula */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1D1D1F]">
                3. Maintenance Waste Estimation (Annual)
              </span>
              <span className="text-[#8944AB] font-bold font-mono">
                {breakdown.maintenance.totalTonnes.toLocaleString()} t / year
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F5F5F7] text-[#6E6E73] space-y-1 font-mono text-[11px] sm:text-xs">
              <div>Built-up Area: {breakdown.maintenance.area.toLocaleString()} m²</div>
              <div>× Maintenance benchmark: {breakdown.maintenance.maintKgM2Year.toFixed(1)} kg/m²/year</div>
              <div>× Site climate factor: {breakdown.maintenance.climateFactor.toFixed(2)}</div>
              <div className="pt-2 border-t border-black/[0.06] text-[#1D1D1F] font-semibold">
                = {breakdown.maintenance.totalKg.toLocaleString()} kg/year ({breakdown.maintenance.totalTonnes.toLocaleString()} t/year)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5F5F7] text-[11px] text-[#86868B] leading-relaxed">
            <span className="text-[#1D1D1F] font-semibold block mb-0.5">Methodology Disclaimer</span>
            These are planning estimates derived from empirical building benchmarks and circular economy models. Actual project quantities may vary based on procurement, site sorting, and local circular pathways.
          </div>
        </div>
      )}
    </div>
  );
};
