import React from "react";
import { Sun } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-white/[0.06] bg-[#060807]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Brand and Workflow Pipeline */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white text-lg">
              <span className="tracking-wider">WASTE</span>
              <span className="text-[#C8FF4A] tracking-tighter font-extrabold">//</span>
              <span className="tracking-wider">LOOP</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium tracking-wider text-[#7E8D82] uppercase">
              <span>BUILD</span>
              <span className="text-white/20">→</span>
              <span>USE</span>
              <span className="text-white/20">→</span>
              <span>MAINTAIN</span>
              <span className="text-white/20">→</span>
              <span>RECOVER</span>
            </div>
          </div>

          {/* Right: Status Pills & Mode */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0C100D] px-3 py-1 text-xs text-[#A8B6AC]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
              <span className="font-medium text-[11px]">Intelligence Engine</span>
            </div>

            <div className="hidden sm:inline-flex rounded-full border border-white/[0.08] bg-[#0C100D] px-3.5 py-1 text-[11px] font-medium text-[#C8D6CC]">
              Building Waste Calculator
            </div>

            <button
              type="button"
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-[#0C100D] text-[#8E9B92] hover:text-white transition-colors cursor-pointer"
            >
              <Sun className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
