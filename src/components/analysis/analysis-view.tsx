import React from "react";
import { Recycle } from "lucide-react";
import { WasteResult } from "@/lib/calculator/types";
import { CalculationTransparency } from "./calculation-transparency";
import { ClimateCard } from "./climate-card";
import { ManagementTable } from "./management-table";
import { MetricCard } from "./metric-card";
import { WasteStreams } from "./waste-streams";

interface AnalysisViewProps {
  result: WasteResult;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ result }) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight">
            Waste Analysis
          </h2>
          <p className="text-[13px] text-[#86868B] mt-1">
            Lifecycle waste modeling across construction, operation and maintenance.
          </p>
        </div>

        {/* Total Pill */}
        <div className="flex items-center gap-3 glass-card px-4 py-2.5 self-start sm:self-auto">
          <div className="h-8 w-8 rounded-lg bg-[#1D7A4B]/10 flex items-center justify-center shrink-0">
            <Recycle className="h-4 w-4 text-[#1D7A4B]" />
          </div>
          <div>
            <div className="text-[10px] text-[#AEAEB2] uppercase tracking-wider font-medium">
              Total In-Use Waste
            </div>
            <div className="text-[15px] font-bold text-[#1D1D1F]">
              {result.annualInUseTonnes.toLocaleString()}{" "}
              <span className="text-[13px] font-normal text-[#86868B]">t / year</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard
          label="Construction Waste"
          value={result.constructionTonnes.toLocaleString()}
          unit="t"
          subtext="Total construction waste"
          badge="Embodied"
          accent="green"
        />
        <MetricCard
          label="Operational Waste"
          value={result.operationalYearTonnes.toLocaleString()}
          unit="t / year"
          subtext="Annual occupant-generated"
          badge="Occupancy"
          accent="blue"
        />
        <MetricCard
          label="Maintenance Waste"
          value={result.maintenanceYearTonnes.toLocaleString()}
          unit="t / year"
          subtext="Climate-adjusted annual"
          badge="Lifecycle"
          accent="purple"
        />
      </div>

      {/* Climate Card */}
      <ClimateCard climate={result.climate} />

      {/* Waste Streams */}
      <WasteStreams
        constructionStreams={result.wasteStreams.construction}
        operationalStreams={result.wasteStreams.operational}
        constructionTotalTonnes={result.constructionTonnes}
        operationalTotalTonnes={result.operationalYearTonnes}
        maintenanceTotalTonnes={result.maintenanceYearTonnes}
      />

      {/* Management Plan */}
      <ManagementTable items={result.managementPlan} />

      {/* Transparency */}
      <CalculationTransparency breakdown={result.breakdown} />
    </div>
  );
};
