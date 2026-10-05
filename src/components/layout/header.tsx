import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-black/[0.05]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-6 lg:gap-10">
            <div className="flex items-center gap-1.5 text-[#1D1D1F]">
              <span className="text-lg font-bold tracking-tight">WASTE</span>
              <span className="text-[#1D7A4B] font-extrabold text-lg">{"//"}</span>
              <span className="text-lg font-bold tracking-tight">LOOP</span>
            </div>

            <div className="hidden md:flex items-center gap-2.5 text-[11px] font-semibold tracking-widest text-[#86868B] uppercase">
              <span>Build</span>
              <span className="text-[#D1D1D6]">→</span>
              <span>Use</span>
              <span className="text-[#D1D1D6]">→</span>
              <span>Maintain</span>
              <span className="text-[#D1D1D6]">→</span>
              <span>Recover</span>
            </div>
          </div>

          {/* Right Status Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-xs text-[#1D1D1F] font-medium border border-black/[0.04]">
              <span className="h-2 w-2 rounded-full bg-[#34C759] shadow-[0_0_8px_rgba(52,199,89,0.6)]" />
              <span>Intelligence Active</span>
            </div>

            <div className="hidden sm:inline-flex rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-xs font-medium text-[#6E6E73] border border-black/[0.04]">
              Building Waste Calculator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
