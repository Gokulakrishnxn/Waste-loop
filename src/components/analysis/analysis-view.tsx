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
    <div className="space-y-6 animate-fadeIn">
      {/* 02 / Waste Analysis Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-light text-[#C8FF4A] leading-none">02</span>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Waste Analysis</h2>
            <p className="text-xs text-[#8E9B92] mt-0.5">
              Holistic lifecycle waste modeling across construction, operation and maintenance.
            </p>
          </div>
        </div>

        {/* Total In-Use Waste Pill */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0A0D0B] px-4 py-2 self-start sm:self-auto shadow-lg">
          <div className="h-8 w-8 rounded-lg bg-[#C8FF4A]/10 border border-[#C8FF4A]/20 flex items-center justify-center shrink-0">
            <Recycle className="h-4 w-4 text-[#C8FF4A]" />
          </div>
          <div>
            <div className="text-[10px] text-[#7E8D82] uppercase tracking-wider font-mono">
              Total In-Use Waste
            </div>
            <div className="text-sm font-bold text-white">
              {result.annualInUseTonnes.toLocaleString()}{" "}
              <span className="text-xs font-normal text-[#8E9B92]">t / year</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Primary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Construction Waste"
          value={result.constructionTonnes.toLocaleString()}
          unit="t"
          subtext="Estimated total construction waste"
          badge="EMBODIED"
          accent="lime"
        />

        <MetricCard
          label="Operational Waste"
          value={result.operationalYearTonnes.toLocaleString()}
          unit="t / year"
          subtext="Occupant-generated annual waste"
          badge="OCCUPANCY"
          accent="cyan"
        />

        <MetricCard
          label="Maintenance Waste"
          value={result.maintenanceYearTonnes.toLocaleString()}
          unit="t / year"
          subtext="Climate-adjusted annual estimate"
          badge="LIFECYCLE"
          accent="amber"
        />
      </div>

      {/* Site + Climate Card */}
      <ClimateCard climate={result.climate} />

      {/* 03 / Waste Streams */}
      <WasteStreams
        constructionStreams={result.wasteStreams.construction}
        operationalStreams={result.wasteStreams.operational}
        constructionTotalTonnes={result.constructionTonnes}
        operationalTotalTonnes={result.operationalYearTonnes}
        maintenanceTotalTonnes={result.maintenanceYearTonnes}
      />

      {/* 04 / Management Plan */}
      <ManagementTable items={result.managementPlan} />

      {/* Calculation Transparency */}
      <CalculationTransparency breakdown={result.breakdown} />
    </div>
  );
};
