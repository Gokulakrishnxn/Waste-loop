import React from "react";
import { Header } from "./header";

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1D1D1F]">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
      <footer className="mt-auto border-t border-black/[0.05] bg-white/70 py-6">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#86868B]">
            <span className="font-semibold text-[#1D1D1F]">WASTE//LOOP</span>
            <span>—</span>
            <span>Building Waste Intelligence & Lifecycle Analysis</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#86868B]">
            <span>Planning Benchmarks</span>
            <span className="text-[#D1D1D6]">·</span>
            <span>ISO 14040 Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
