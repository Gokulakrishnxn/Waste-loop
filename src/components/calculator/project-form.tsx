import React, { useState } from "react";
import { ArrowRight, Building2, Check, ChevronDown, Loader2, MapPin, Users, X } from "lucide-react";
import { BUILDING_SCALE_CONFIG, BUILDING_TYPE_CONFIG, MATERIAL_CONFIG } from "@/lib/calculator/factors";
import { BuildingScale, BuildingType, Material, ProjectInput } from "@/lib/calculator/types";

interface ProjectFormProps {
  input: ProjectInput;
  onChange: (input: ProjectInput) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  hasAnalyzed: boolean;
  loadingStep: number;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  input,
  onChange,
  onAnalyze,
  isLoading,
  loadingStep,
}) => {
  const [areaError, setAreaError] = useState<string>("");
  const [usersError, setUsersError] = useState<string>("");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const buildingTypes = Object.keys(BUILDING_TYPE_CONFIG) as BuildingType[];
  const buildingScales = Object.keys(BUILDING_SCALE_CONFIG) as BuildingScale[];
  const materialsList = Object.keys(MATERIAL_CONFIG) as Material[];

  const handleAreaChange = (valStr: string) => {
    const clean = valStr.replace(/[^0-9]/g, "");
    const val = clean ? parseInt(clean, 10) : 0;
    if (!clean) {
      setAreaError("Built-up area is required");
    } else if (val < 100) {
      setAreaError("Minimum area is 100 m²");
    } else {
      setAreaError("");
    }
    onChange({ ...input, builtUpArea: val });
  };

  const handleUsersChange = (valStr: string) => {
    const clean = valStr.replace(/[^0-9]/g, "");
    const val = clean ? parseInt(clean, 10) : 0;
    if (!clean || val < 1) {
      setUsersError("At least 1 user is required");
    } else {
      setUsersError("");
    }
    onChange({ ...input, users: val });
  };

  const handleToggleMaterial = (mat: Material) => {
    if (input.materials.includes(mat)) {
      if (input.materials.length > 1) {
        onChange({ ...input, materials: input.materials.filter((m) => m !== mat) });
      }
    } else {
      onChange({ ...input, materials: [...input.materials, mat] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.builtUpArea || input.builtUpArea < 100) {
      setAreaError("Minimum area is 100 m²");
      return;
    }
    if (!input.users || input.users < 1) {
      setUsersError("At least 1 occupant required");
      return;
    }
    onAnalyze();
  };

  const loadingSteps = [
    "Project parameters",
    "Construction model",
    "Site climate telemetry",
    "Waste stream analysis",
  ];

  return (
    <div className="glass-card p-5 sm:p-6 relative rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06]">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F] tracking-tight">
            Project Input
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Enter building details to estimate lifecycle waste.
          </p>
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-[#1D7A4B] uppercase bg-[#1D7A4B]/8 px-2.5 py-1 rounded-full">
          Estimation
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Building Type */}
        <div className="space-y-1.5 relative">
          <label className="text-xs font-semibold text-[#1D1D1F] block">
            Building Type
          </label>
          <div className="relative">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className="w-full flex items-center justify-between rounded-xl border border-black/[0.08] bg-white px-3.5 py-2.5 text-xs text-[#1D1D1F] hover:border-black/[0.16] focus:outline-none focus:ring-2 focus:ring-[#1D7A4B]/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Building2 className="h-4 w-4 text-[#86868B] shrink-0" />
                <span className="font-medium truncate">
                  {BUILDING_TYPE_CONFIG[input.buildingType]?.label}
                </span>
                <span className="text-[#86868B] text-[11px] truncate">
                  — {BUILDING_TYPE_CONFIG[input.buildingType]?.description}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 text-[#86868B] shrink-0 transition-transform ${isTypeDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isTypeDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-full z-30 rounded-xl border border-black/[0.08] bg-white shadow-xl overflow-hidden py-1">
                {buildingTypes.map((typeKey) => {
                  const cfg = BUILDING_TYPE_CONFIG[typeKey];
                  const isSelected = input.buildingType === typeKey;
                  return (
                    <button
                      key={typeKey}
                      type="button"
                      onClick={() => {
                        onChange({ ...input, buildingType: typeKey });
                        setIsTypeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#1D7A4B]/8 text-[#1D7A4B] font-semibold"
                          : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-medium">{cfg.label}</span>
                        <span className="text-[#86868B] ml-2 text-[11px]">({cfg.description})</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-[#1D7A4B] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Building Scale */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1D1D1F] block">
            Building Scale
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {buildingScales.map((scaleKey) => {
              const cfg = BUILDING_SCALE_CONFIG[scaleKey];
              const isSelected = input.buildingScale === scaleKey;
              return (
                <button
                  key={scaleKey}
                  type="button"
                  disabled={isLoading}
                  onClick={() => onChange({ ...input, buildingScale: scaleKey })}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#1D7A4B] bg-[#1D7A4B]/8 ring-1 ring-[#1D7A4B]/20 text-[#1D7A4B]"
                      : "border-black/[0.08] bg-white hover:border-black/[0.15] hover:bg-[#F5F5F7] text-[#1D1D1F]"
                  }`}
                >
                  <span className={`text-xs font-semibold ${isSelected ? "text-[#1D7A4B]" : "text-[#1D1D1F]"}`}>
                    {cfg.label}
                  </span>
                  <span className="text-[10px] text-[#86868B] mt-0.5">{cfg.range}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Built-up Area & Users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="built-up-area" className="text-xs font-semibold text-[#1D1D1F] block">
              Built-up Area
            </label>
            <div className="relative flex items-center rounded-xl border border-black/[0.08] bg-white px-3 py-2.5 focus-within:border-[#1D7A4B] focus-within:ring-2 focus-within:ring-[#1D7A4B]/15 transition-all">
              <input
                id="built-up-area"
                type="text"
                inputMode="numeric"
                value={input.builtUpArea > 0 ? input.builtUpArea.toLocaleString() : ""}
                onChange={(e) => handleAreaChange(e.target.value)}
                placeholder="10,000"
                disabled={isLoading}
                className="w-full bg-transparent text-xs text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none"
              />
              <span className="text-xs text-[#86868B] ml-2 select-none font-medium">m²</span>
            </div>
            {areaError && <p className="text-[11px] text-[#FF3B30] mt-1">{areaError}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="number-of-users" className="text-xs font-semibold text-[#1D1D1F] block">
              Number of Users
            </label>
            <div className="relative flex items-center rounded-xl border border-black/[0.08] bg-white px-3 py-2.5 focus-within:border-[#1D7A4B] focus-within:ring-2 focus-within:ring-[#1D7A4B]/15 transition-all">
              <Users className="h-4 w-4 text-[#86868B] mr-2 shrink-0" />
              <input
                id="number-of-users"
                type="text"
                inputMode="numeric"
                value={input.users > 0 ? input.users.toLocaleString() : ""}
                onChange={(e) => handleUsersChange(e.target.value)}
                placeholder="500"
                disabled={isLoading}
                className="w-full bg-transparent text-xs text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none"
              />
              <span className="text-xs text-[#86868B] ml-2 select-none font-medium">users</span>
            </div>
            {usersError && <p className="text-[11px] text-[#FF3B30] mt-1">{usersError}</p>}
          </div>
        </div>

        {/* Primary Materials */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#1D1D1F] block">
              Primary Materials
            </label>
            <span className="text-[11px] text-[#86868B]">Select multiple</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {materialsList.map((mat) => {
              const cfg = MATERIAL_CONFIG[mat];
              const isChecked = input.materials.includes(mat);
              return (
                <button
                  key={mat}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleToggleMaterial(mat)}
                  className={`flex items-start gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? "border-[#1D7A4B] bg-[#1D7A4B]/8 ring-1 ring-[#1D7A4B]/20"
                      : "border-black/[0.08] bg-white hover:border-black/[0.15] hover:bg-[#F5F5F7]"
                  }`}
                >
                  <div
                    className={`mt-0.5 h-3.5 w-3.5 rounded shrink-0 flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "border-[#1D7A4B] bg-[#1D7A4B] text-white"
                        : "border-[#D1D1D6] bg-white"
                    }`}
                  >
                    {isChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  </div>
                  <div className="min-w-0">
                    <span className={`block text-[11px] font-semibold leading-tight truncate ${isChecked ? "text-[#1D7A4B]" : "text-[#1D1D1F]"}`}>
                      {cfg.label}
                    </span>
                    <span className="block text-[10px] text-[#86868B] leading-tight truncate mt-0.5">
                      {cfg.description.split(",")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Site Location */}
        <div className="space-y-1.5">
          <label htmlFor="site-location" className="text-xs font-semibold text-[#1D1D1F] block">
            Site Location
          </label>
          <div className="relative flex items-center rounded-xl border border-black/[0.08] bg-white px-3 py-2.5 focus-within:border-[#1D7A4B] focus-within:ring-2 focus-within:ring-[#1D7A4B]/15 transition-all">
            <MapPin className="h-4 w-4 text-[#86868B] mr-2 shrink-0" />
            <input
              id="site-location"
              type="text"
              value={input.location}
              onChange={(e) => onChange({ ...input, location: e.target.value })}
              placeholder="e.g. Chennai, India"
              disabled={isLoading}
              className="w-full bg-transparent text-xs text-[#1D1D1F] placeholder:text-[#AEAEB2] focus:outline-none"
            />
            {input.location && (
              <button
                type="button"
                onClick={() => onChange({ ...input, location: "" })}
                className="text-[#86868B] hover:text-[#1D1D1F] ml-2 cursor-pointer transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading Progress */}
        {isLoading && (
          <div className="rounded-xl bg-[#F5F5F7] p-3 text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#1D7A4B] font-semibold text-[11px]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="tracking-wider uppercase">Calculating Waste Telemetry</span>
            </div>
            <div className="space-y-1 text-[11px]">
              {loadingSteps.map((step, idx) => {
                const isDone = loadingStep > idx;
                const isCurrent = loadingStep === idx;
                return (
                  <div
                    key={step}
                    className={`flex items-center justify-between ${
                      isDone ? "text-[#1D7A4B] font-medium" : isCurrent ? "text-[#1D1D1F] font-semibold" : "text-[#AEAEB2]"
                    }`}
                  >
                    <span>{step}</span>
                    <span>{isDone ? "✓" : isCurrent ? "◌" : "○"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-[#1D7A4B] hover:bg-[#22924F] active:bg-[#176A40] text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Analyze Waste</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
