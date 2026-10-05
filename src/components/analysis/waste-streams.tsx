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
  const [activeTab, setActiveTab] = useState<"construction" | "operational" | "maintenance">("construction");

  // Map construction colors matching the screenshot
  const constColors = ["#C8FF4A", "#22C55E", "#0EA5E9", "#3B82F6", "#60A5FA", "#64748B"];
  const constSegments: DonutSegment[] = constructionStreams.map((item, idx) => ({
    id: item.id,
    label: item.label,
    percentage: item.percentage,
    tonnes: item.tonnes,
    color: constColors[idx % constColors.length],
  }));

  // Map operational colors matching the screenshot
  const opsColors = ["#22C55E", "#67E8D1", "#38BDF8", "#3B82F6", "#64748B"];
  const opsSegments: DonutSegment[] = operationalStreams.map((item, idx) => ({
    id: item.id,
    label: item.label,
    percentage: item.percentage,
    tonnes: item.tonnes,
    color: opsColors[idx % opsColors.length],
  }));

  // Maintenance streams
  const maintStreams: DonutSegment[] = [
    { id: "hvac", label: "HVAC filtration & media", percentage: 35, tonnes: Math.round(maintenanceTotalTonnes * 0.35 * 10) / 10, color: "#F5B94C" },
    { id: "facade", label: "Sealants & glazing gaskets", percentage: 25, tonnes: Math.round(maintenanceTotalTonnes * 0.25 * 10) / 10, color: "#F97316" },
    { id: "roofing", label: "Roofing waterproofing membrane", percentage: 20, tonnes: Math.round(maintenanceTotalTonnes * 0.20 * 10) / 10, color: "#3B82F6" },
    { id: "finishes", label: "Paints & ceiling tiles", percentage: 12, tonnes: Math.round(maintenanceTotalTonnes * 0.12 * 10) / 10, color: "#67E8D1" },
    { id: "mep", label: "MEP fixtures & cabling", percentage: 8, tonnes: Math.round(maintenanceTotalTonnes * 0.08 * 10) / 10, color: "#64748B" },
  ];

  return (
    <div className="space-y-4">
      {/* 03 / Waste Streams Header & Segmented Pill Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#C8FF4A]">03</span>
            <h3 className="text-lg font-bold text-white tracking-tight">Waste Streams</h3>
          </div>
          <p className="text-xs text-[#8E9B92] mt-0.5">
            Material and waste breakdown across construction and operational lifecycle.
          </p>
        </div>

        {/* Segmented Switch */}
        <div className="flex items-center rounded-full bg-[#0C100D] p-1 border border-white/[0.08]">
          {(["construction", "operational", "maintenance"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium capitalize transition-all cursor-pointer ${
                  isSelected
                    ? "border border-[#C8FF4A]/80 bg-[#141F16] text-[#C8FF4A] shadow-[0_0_10px_rgba(200,255,74,0.15)]"
                    : "text-[#7E8D82] hover:text-[#D0DDD4]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Breakdown Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card 1: Construction Waste Breakdown */}
        <div
          className={`rounded-2xl border bg-[#0A0D0B] p-5 sm:p-6 transition-all ${
            activeTab === "construction" ? "border-white/[0.14] ring-1 ring-[#C8FF4A]/20" : "border-white/[0.08]"
          }`}
        >
          <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-3 mb-4">
            <h4 className="text-sm font-semibold text-white tracking-tight">
              Construction Waste Breakdown
            </h4>
            <div className="text-xs text-[#8E9B92]">
              <span className="font-bold text-white text-sm">
                {constructionTotalTonnes.toLocaleString()} t
              </span>{" "}
              total
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <DonutChart
              segments={constSegments}
              centerValue={`${constructionTotalTonnes.toLocaleString()} t`}
              centerLabel="Total"
              size={135}
            />

            {/* Legend */}
            <div className="flex-1 w-full space-y-2 text-xs">
              {constSegments.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#C5D0C8] truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                    <span className="text-[#7A8A80]">{item.tonnes} t</span>
                    <span className="text-[#C8FF4A] font-medium min-w-[28px] text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Operational Waste Breakdown (or Maintenance if tab selected) */}
        {activeTab === "maintenance" ? (
          <div className="rounded-2xl border border-white/[0.14] ring-1 ring-[#F5B94C]/20 bg-[#0A0D0B] p-5 sm:p-6 transition-all">
            <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-3 mb-4">
              <h4 className="text-sm font-semibold text-white tracking-tight">
                Maintenance Waste Breakdown
              </h4>
              <div className="text-xs text-[#8E9B92]">
                <span className="font-bold text-white text-sm">
                  {maintenanceTotalTonnes.toLocaleString()} t
                </span>{" "}
                / year
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <DonutChart
                segments={maintStreams}
                centerValue={`${maintenanceTotalTonnes.toLocaleString()} t`}
                centerLabel="/ year"
                size={135}
              />

              <div className="flex-1 w-full space-y-2 text-xs">
                {maintStreams.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[#C5D0C8] truncate">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                      <span className="text-[#7A8A80]">{item.tonnes} t</span>
                      <span className="text-[#F5B94C] font-medium min-w-[28px] text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-2xl border bg-[#0A0D0B] p-5 sm:p-6 transition-all ${
              activeTab === "operational" ? "border-white/[0.14] ring-1 ring-[#67E8D1]/20" : "border-white/[0.08]"
            }`}
          >
            <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-3 mb-4">
              <h4 className="text-sm font-semibold text-white tracking-tight">
                Operational Waste Breakdown
              </h4>
              <div className="text-xs text-[#8E9B92]">
                <span className="font-bold text-white text-sm">
                  {operationalTotalTonnes.toLocaleString()} t
                </span>{" "}
                / year
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <DonutChart
                segments={opsSegments}
                centerValue={`${operationalTotalTonnes.toLocaleString()} t`}
                centerLabel="/ year"
                size={135}
              />

              <div className="flex-1 w-full space-y-2 text-xs">
                {opsSegments.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[#C5D0C8] truncate">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                      <span className="text-[#7A8A80]">{item.tonnes} t</span>
                      <span className="text-[#67E8D1] font-medium min-w-[28px] text-right">
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
