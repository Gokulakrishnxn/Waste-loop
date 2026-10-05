import React from "react";
import { ArrowLeft, Layers, ShieldCheck, Sparkles, ThermometerSun } from "lucide-react";

interface EmptyStateProps {
  isLoading?: boolean;
  loadingStep?: number;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isLoading = false, loadingStep = 0 }) => {
  const steps = [
    { label: "Validating building parameters & scale", completed: loadingStep > 0 },
    { label: "Computing embodied construction materials", completed: loadingStep > 1 },
    { label: "Fetching live site climate & weather telemetry", completed: loadingStep > 2 },
    { label: "Generating circular streams & diversion plan", completed: loadingStep > 3 },
  ];

  if (isLoading) {
    return (
      <div className="glass-card min-h-[520px] flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl animate-fadeIn">
        <div className="relative mb-6">
          <div className="h-16 w-16 rounded-2xl bg-[#1D7A4B]/10 flex items-center justify-center text-[#1D7A4B]">
            <Sparkles className="h-8 w-8 animate-pulse text-[#1D7A4B]" />
          </div>
        </div>

        <div className="max-w-md space-y-2 mb-8">
          <h3 className="text-lg font-bold text-[#1D1D1F] tracking-tight">
            Analyzing Building Waste Lifecycle
          </h3>
          <p className="text-xs sm:text-[13px] text-[#86868B] leading-relaxed">
            Synthesizing architectural data, occupancy models, and environmental telemetry...
          </p>
        </div>

        {/* Apple-style calculation sequence */}
        <div className="w-full max-w-sm space-y-2.5 text-left bg-[#F5F5F7]/80 p-4 rounded-xl border border-black/[0.04]">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <span
                className={`truncate ${
                  s.completed
                    ? "text-[#1D7A4B] font-semibold"
                    : loadingStep === idx
                    ? "text-[#1D1D1F] font-medium"
                    : "text-[#AEAEB2]"
                }`}
              >
                {s.label}
              </span>
              <span className="shrink-0 ml-2 font-mono text-[11px]">
                {s.completed ? "✓" : loadingStep === idx ? "◌" : "○"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card min-h-[520px] flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl animate-fadeIn">
      <div className="max-w-lg space-y-6">
        {/* Icon & Badge */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D7A4B]/8 text-[#1D7A4B]">
          <Sparkles className="h-6 w-6 stroke-[1.75]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#1D7A4B] uppercase bg-[#1D7A4B]/8 px-3 py-1 rounded-full">
            Waste Intelligence Engine
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
            Ready for Analysis
          </h3>
          <p className="text-xs sm:text-[13px] text-[#86868B] leading-relaxed max-w-md mx-auto">
            Provide your building details on the left, then run the analysis to generate complete lifecycle estimates across construction, occupancy, and climate maintenance.
          </p>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
          <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.03] space-y-1">
            <div className="flex items-center gap-1.5 text-[#1D7A4B] text-xs font-semibold">
              <Layers className="h-3.5 w-3.5" />
              <span>Embodied Waste</span>
            </div>
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              Calculates structural debris and masonry packaging volumes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.03] space-y-1">
            <div className="flex items-center gap-1.5 text-[#0071E3] text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Operational Use</span>
            </div>
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              Estimates annual occupant output, organic waste, and recyclables.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5F5F7] border border-black/[0.03] space-y-1">
            <div className="flex items-center gap-1.5 text-[#8944AB] text-xs font-semibold">
              <ThermometerSun className="h-3.5 w-3.5" />
              <span>Site Telemetry</span>
            </div>
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              Integrates real-time weather and climatic exposure coefficients.
            </p>
          </div>
        </div>

        {/* Callout Prompt */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-[#1D7A4B]">
          <ArrowLeft className="h-3.5 w-3.5 animate-bounce-x" />
          <span>Enter parameters on the left and click &ldquo;Analyze Waste&rdquo;</span>
        </div>
      </div>
    </div>
  );
};
