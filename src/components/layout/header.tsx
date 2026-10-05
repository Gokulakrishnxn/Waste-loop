import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-black/[0.04]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-1 text-[#1D1D1F]">
              <span className="text-base sm:text-lg font-semibold tracking-tight">WASTE</span>
              <span className="text-[#1D7A4B] font-bold text-base sm:text-lg">//</span>
              <span className="text-base sm:text-lg font-semibold tracking-tight">LOOP</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium tracking-widest text-[#86868B] uppercase">
              <span>Build</span>
              <span className="text-[#D1D1D6]">→</span>
              <span>Use</span>
              <span className="text-[#D1D1D6]">→</span>
              <span>Maintain</span>
              <span className="text-[#D1D1D6]">→</span>
              <span>Recover</span>
            </div>
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-full bg-[#F5F5F7] px-3 py-1.5 text-[11px] text-[#6E6E73] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34C759] shadow-[0_0_6px_#34C759]" />
              <span className="hidden sm:inline">Intelligence Active</span>
            </div>

            <div className="hidden sm:inline-flex rounded-full bg-[#F5F5F7] px-3 py-1.5 text-[11px] font-medium text-[#6E6E73]">
              Building Waste Calculator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
