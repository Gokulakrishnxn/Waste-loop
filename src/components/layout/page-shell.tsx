import React from "react";
import { Header } from "./header";

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1D1D1F]">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-8 lg:py-10">
        {children}
      </main>
      <footer className="mt-auto border-t border-black/[0.04] bg-white/60 py-5 sm:py-6">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#86868B]">
            <span className="font-semibold text-[#6E6E73]">WASTE//LOOP</span>
            <span>—</span>
            <span>Building Waste Intelligence</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#AEAEB2]">
            <span>Planning Benchmarks</span>
            <span className="text-[#D1D1D6]">·</span>
            <span>ISO 14040 Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
