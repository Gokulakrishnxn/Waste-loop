import React from "react";
import { Building2, Sparkles } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="glass-card min-h-[460px] flex items-center justify-center p-8 sm:p-12 text-center rounded-2xl">
      <div className="max-w-md space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F5F7] text-[#86868B]">
          <Building2 className="h-6 w-6 stroke-[1.5]" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider text-[#1D7A4B] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Waste Intelligence</span>
          </div>
          <h3 className="text-base font-semibold text-[#1D1D1F]">
            Your building analysis will appear here.
          </h3>
          <p className="text-xs sm:text-[13px] text-[#86868B] leading-relaxed">
            Enter your project details on the left and run the waste analysis to model embodied construction, operational occupancy, and climate-adjusted maintenance streams.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-medium text-[#AEAEB2] uppercase tracking-wider">
          <span>Construction</span>
          <span>•</span>
          <span>Operational</span>
          <span>•</span>
          <span>Maintenance</span>
        </div>
      </div>
    </div>
  );
};
