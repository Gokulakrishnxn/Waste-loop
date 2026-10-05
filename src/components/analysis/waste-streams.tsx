import React, { useState } from "react";
import { WasteStreamItem } from "@/lib/calculator/types";
import { DonutChart, DonutSegment } from "./donut-chart";

interface WasteStreamsProps {
  constructionStreams: WasteStreamItem[];
  operationalStreams: WasteStreamItem[];
  constructionTotalTonnes: number;
  operationalTotalTonnes: number;
  maintenanceTotalTonnes: number;
}

export const WasteStreams: React.FC<WasteStreamsProps> = ({
  constructionStreams,
  operationalStreams,
  constructionTotalTonnes,
  operationalTotalTonnes,
  maintenanceTotalTonnes,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "construction" | "operational" | "maintenance">("all");

  const constColors = ["#1D7A4B", "#34C759", "#30B0C7", "#0071E3", "#5E5CE6", "#8E8E93"];
  const constSegments: DonutSegment[] = constructionStreams.map((item, idx) => ({
    id: item.id,
    label: item.label,
    percentage: item.percentage,
    tonnes: item.tonnes,
    color: constColors[idx % constColors.length],
  }));

  const opsColors = ["#0071E3", "#30B0C7", "#34C759", "#5856D6", "#8E8E93"];
  const opsSegments: DonutSegment[] = operationalStreams.map((item, idx) => ({
    id: item.id,
    label: item.label,
    percentage: item.percentage,
    tonnes: item.tonnes,
    color: opsColors[idx % opsColors.length],
  }));

  const maintColors = ["#8944AB", "#AF52DE", "#5856D6", "#0071E3", "#8E8E93"];
  const maintStreams: DonutSegment[] = [
    { id: "hvac", label: "HVAC filtration & media", percentage: 35, tonnes: Math.round(maintenanceTotalTonnes * 0.35 * 10) / 10, color: maintColors[0] },
    { id: "facade", label: "Sealants & glazing gaskets", percentage: 25, tonnes: Math.round(maintenanceTotalTonnes * 0.25 * 10) / 10, color: maintColors[1] },
    { id: "roofing", label: "Roofing waterproofing membrane", percentage: 20, tonnes: Math.round(maintenanceTotalTonnes * 0.20 * 10) / 10, color: maintColors[2] },
    { id: "finishes", label: "Paints & ceiling tiles", percentage: 12, tonnes: Math.round(maintenanceTotalTonnes * 0.12 * 10) / 10, color: maintColors[3] },
    { id: "mep", label: "MEP fixtures & cabling", percentage: 8, tonnes: Math.round(maintenanceTotalTonnes * 0.08 * 10) / 10, color: maintColors[4] },
  ];

  const showConstruction = activeTab === "all" || activeTab === "construction";
  const showOperational = activeTab === "all" || activeTab === "operational";
  const showMaintenance = activeTab === "maintenance";

  return (
    <div className="space-y-4 min-w-0">
      {/* Waste Streams Header & Segmented Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-black/[0.06]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#1D1D1F] tracking-tight">
            Waste Streams Breakdown
          </h3>
          <p className="text-xs text-[#86868B] mt-0.5">
            Material and lifecycle distribution by operational phase.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-full bg-[#F5F5F7] p-1 self-start sm:self-auto border border-black/[0.04]">
          {(["all", "construction", "operational", "maintenance"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#1D1D1F] shadow-xs"
                    : "text-[#86868B] hover:text-[#1D1D1F]"
                }`}
              >
                {tab === "all" ? "All Streams" : tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Container with min-w-0 and clear grid column behavior */}
      <div className={`grid gap-5 min-w-0 ${activeTab === "all" ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1"}`}>
        {/* Construction Waste Card */}
        {showConstruction && (
          <div className="glass-card p-5 sm:p-6 rounded-2xl min-w-0 flex flex-col justify-between">
            <div className="flex items-baseline justify-between pb-3 mb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1D7A4B]" />
                <h4 className="text-sm font-bold text-[#1D1D1F] tracking-tight">
                  Construction Waste
                </h4>
              </div>
              <div className="text-xs text-[#86868B]">
                <span className="font-bold text-[#1D1D1F]">
                  {constructionTotalTonnes.toLocaleString()} t
                </span>{" "}
                total
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 min-w-0">
              <div className="shrink-0 flex items-center justify-center">
                <DonutChart
                  segments={constSegments}
                  centerValue={`${constructionTotalTonnes.toLocaleString()} t`}
                  centerLabel="Total"
                  size={135}
                />
              </div>

              {/* Legend */}
              <div className="flex-1 w-full min-w-0 space-y-2">
                {constSegments.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[#3A3A3C] font-medium truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0 text-xs tabular-nums">
                      <span className="text-[#86868B]">{item.tonnes} t</span>
                      <span className="text-[#1D7A4B] font-bold min-w-[32px] text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Operational Waste Card */}
        {showOperational && (
          <div className="glass-card p-5 sm:p-6 rounded-2xl min-w-0 flex flex-col justify-between">
            <div className="flex items-baseline justify-between pb-3 mb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0071E3]" />
                <h4 className="text-sm font-bold text-[#1D1D1F] tracking-tight">
                  Operational Waste
                </h4>
              </div>
              <div className="text-xs text-[#86868B]">
                <span className="font-bold text-[#1D1D1F]">
                  {operationalTotalTonnes.toLocaleString()} t
                </span>{" "}
                / year
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 min-w-0">
              <div className="shrink-0 flex items-center justify-center">
                <DonutChart
                  segments={opsSegments}
                  centerValue={`${operationalTotalTonnes.toLocaleString()} t`}
                  centerLabel="/ year"
                  size={135}
                />
              </div>

              {/* Legend */}
              <div className="flex-1 w-full min-w-0 space-y-2">
                {opsSegments.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[#3A3A3C] font-medium truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0 text-xs tabular-nums">
                      <span className="text-[#86868B]">{item.tonnes} t</span>
                      <span className="text-[#0071E3] font-bold min-w-[32px] text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Waste Card */}
        {showMaintenance && (
          <div className="glass-card p-5 sm:p-6 rounded-2xl min-w-0 flex flex-col justify-between">
            <div className="flex items-baseline justify-between pb-3 mb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8944AB]" />
                <h4 className="text-sm font-bold text-[#1D1D1F] tracking-tight">
                  Maintenance Waste
                </h4>
              </div>
              <div className="text-xs text-[#86868B]">
                <span className="font-bold text-[#1D1D1F]">
                  {maintenanceTotalTonnes.toLocaleString()} t
                </span>{" "}
                / year
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 min-w-0">
              <div className="shrink-0 flex items-center justify-center">
                <DonutChart
                  segments={maintStreams}
                  centerValue={`${maintenanceTotalTonnes.toLocaleString()} t`}
                  centerLabel="/ year"
                  size={135}
                />
              </div>

              {/* Legend */}
              <div className="flex-1 w-full min-w-0 space-y-2">
                {maintStreams.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[#3A3A3C] font-medium truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0 text-xs tabular-nums">
                      <span className="text-[#86868B]">{item.tonnes} t</span>
                      <span className="text-[#8944AB] font-bold min-w-[32px] text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
