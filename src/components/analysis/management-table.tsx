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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#C8FF4A]">04</span>
            <h3 className="text-lg font-bold text-white tracking-tight">Management Plan</h3>
          </div>
          <p className="text-xs text-[#8E9B92] mt-0.5">
            Actionable segregation and circular diversion pathways.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center rounded-full bg-[#0C100D] p-1 border border-white/[0.08]">
          {(["all", "construction", "operational"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#C8FF4A] font-semibold text-[#060807]"
                  : "text-[#7E8D82] hover:text-[#D0DDD4]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0D0B]">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] bg-[#0E1310] text-[#7A8A80] uppercase tracking-wider text-[10px]">
              <th className="py-3 px-5 font-semibold">Waste Stream</th>
              <th className="py-3 px-5 font-semibold text-right">Monthly</th>
              <th className="py-3 px-5 font-semibold text-right">Yearly</th>
              <th className="py-3 px-5 font-semibold">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filteredItems.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#0F1511] transition-colors"
              >
                <td className="py-3.5 px-5 text-white font-medium flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      row.category === "construction" ? "bg-[#C8FF4A]" : "bg-[#67E8D1]"
                    }`}
                  />
                  <span>{row.stream}</span>
                </td>
                <td className="py-3.5 px-5 text-right font-mono text-[#A8B6AC]">
                  {row.monthlyTonnes.toLocaleString()} t
                </td>
                <td className="py-3.5 px-5 text-right font-mono font-semibold text-white">
                  {row.yearlyTonnes.toLocaleString()} t
                </td>
                <td className="py-3.5 px-5 text-[#C5D0C8]">
                  <div className="flex items-center justify-between gap-3">
                    <span>{row.action}</span>
                    {row.complianceNote && (
                      <span className="shrink-0 text-[10px] font-mono text-[#6E7E74] bg-[#0E1310] px-2 py-0.5 rounded-full border border-white/[0.06]">
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
      <div className="md:hidden space-y-2.5">
        {filteredItems.map((row) => (
          <div
            key={row.id}
            className="rounded-xl border border-white/[0.08] bg-[#0A0D0B] p-4 text-xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    row.category === "construction" ? "bg-[#C8FF4A]" : "bg-[#67E8D1]"
                  }`}
                />
                {row.stream}
              </span>
              <span className="text-[10px] font-mono text-[#7A8A80] uppercase px-2 py-0.5 rounded-full bg-[#0E1310] border border-white/[0.06]">
                {row.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#0E1310] p-2.5 rounded-lg border border-white/[0.04]">
              <div>
                <span className="text-[10px] text-[#7A8A80] block">Monthly Rate</span>
                <span className="font-mono text-sm font-bold text-white">
                  {row.monthlyTonnes.toLocaleString()} t
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7A8A80] block">Annual / Total</span>
                <span className="font-mono text-sm font-bold text-[#C8FF4A]">
                  {row.yearlyTonnes.toLocaleString()} t
                </span>
              </div>
            </div>

            <div className="text-[#A8B6AC] pt-1 flex items-start gap-1.5">
              <ArrowUpRight className="h-3.5 w-3.5 text-[#C8FF4A] shrink-0 mt-0.5" />
              <span>{row.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
