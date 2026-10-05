import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ManagementPlanItem } from "@/lib/calculator/types";

interface ManagementTableProps {
  items: ManagementPlanItem[];
}

export const ManagementTable: React.FC<ManagementTableProps> = ({ items }) => {
  const [filter, setFilter] = useState<"all" | "construction" | "operational">("all");

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-black/[0.06]">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F] tracking-tight">
            Management Plan
          </h3>
          <p className="text-[13px] text-[#86868B] mt-0.5">
            Actionable segregation and circular diversion pathways.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center rounded-full bg-[#F5F5F7] p-1 self-start sm:self-auto">
          {(["all", "construction", "operational"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-all cursor-pointer ${
                filter === tab
                  ? "bg-white text-[#1D1D1F] shadow-sm font-semibold"
                  : "text-[#86868B] hover:text-[#1D1D1F]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden glass-card rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-black/[0.06] bg-[#FAFAFA] text-[#86868B] uppercase tracking-wider text-[11px]">
              <th className="py-3 px-5 font-semibold">Waste Stream</th>
              <th className="py-3 px-5 font-semibold text-right">Monthly</th>
              <th className="py-3 px-5 font-semibold text-right">Yearly</th>
              <th className="py-3 px-5 font-semibold">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {filteredItems.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#F5F5F7]/70 transition-colors"
              >
                <td className="py-3.5 px-5 text-[#1D1D1F] font-medium flex items-center gap-2.5">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                      row.category === "construction" ? "bg-[#1D7A4B]" : "bg-[#0071E3]"
                    }`}
                  />
                  <span>{row.stream}</span>
                </td>
                <td className="py-3.5 px-5 text-right font-medium text-[#6E6E73]">
                  {row.monthlyTonnes.toLocaleString()} t
                </td>
                <td className="py-3.5 px-5 text-right font-semibold text-[#1D1D1F]">
                  {row.yearlyTonnes.toLocaleString()} t
                </td>
                <td className="py-3.5 px-5 text-[#3A3A3C]">
                  <div className="flex items-center justify-between gap-3">
                    <span>{row.action}</span>
                    {row.complianceNote && (
                      <span className="shrink-0 text-[10px] font-medium text-[#86868B] bg-[#F5F5F7] px-2 py-0.5 rounded-full">
                        {row.complianceNote}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden space-y-3">
        {filteredItems.map((row) => (
          <div
            key={row.id}
            className="glass-card p-4 rounded-xl text-xs space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1D1D1F] flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    row.category === "construction" ? "bg-[#1D7A4B]" : "bg-[#0071E3]"
                  }`}
                />
                {row.stream}
              </span>
              <span className="text-[10px] font-medium text-[#86868B] uppercase px-2 py-0.5 rounded-full bg-[#F5F5F7]">
                {row.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#F5F5F7] p-2.5 rounded-xl">
              <div>
                <span className="text-[10px] text-[#86868B] block">Monthly Rate</span>
                <span className="text-sm font-semibold text-[#1D1D1F]">
                  {row.monthlyTonnes.toLocaleString()} t
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868B] block">Annual / Total</span>
                <span className="text-sm font-semibold text-[#1D7A4B]">
                  {row.yearlyTonnes.toLocaleString()} t
                </span>
              </div>
            </div>

            <div className="text-[#3A3A3C] pt-0.5 flex items-start gap-1.5 leading-relaxed">
              <ArrowUpRight className="h-3.5 w-3.5 text-[#1D7A4B] shrink-0 mt-0.5" />
              <span>{row.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
