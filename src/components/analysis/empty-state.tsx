import React from "react";
import { Building2, Sparkles } from "lucide-react";

export const EmptyState: React.FC = () => {
  return (
    <div className="rounded-2xl border border-dashed border-white/[0.1] bg-[#0A0D0B]/60 min-h-[460px] flex items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0E1310] text-[#7A8A80]">
          <Building2 className="h-6 w-6 stroke-[1.5]" />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider text-white uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#C8FF4A]" />
            <span>Waste Profile</span>
          </div>
          <h3 className="text-sm font-medium text-[#C5D0C8]">
            Your building analysis will appear here.
          </h3>
          <p className="text-xs text-[#7A8A80] leading-relaxed">
            Enter your project information on the left and run the waste analysis to model embodied construction, operational occupancy, and climate-adjusted maintenance streams.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono text-[#526056] uppercase">
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
