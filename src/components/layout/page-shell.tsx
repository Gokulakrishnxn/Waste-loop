import React from "react";
import { Header } from "./header";

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#060807] text-[#F3F5F4]">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="mt-auto border-t border-white/[0.06] bg-[#060807] py-6 text-xs text-[#526056]">
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white/70">WASTE//LOOP</span>
            <span>—</span>
            <span>BUILDING WASTE INTELLIGENCE & CIRCULAR MODELING</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#7A8A80]">
            <span>PLANNING BENCHMARKS</span>
            <span>•</span>
            <span>ISO 14040 / C&D ALIGNED</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
