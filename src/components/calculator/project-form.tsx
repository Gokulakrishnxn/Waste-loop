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
  hasAnalyzed,
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
      setAreaError("Minimum built-up area is 100 m²");
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
      setAreaError("Minimum built-up area is 100 m²");
      return;
    }
    if (!input.users || input.users < 1) {
      setUsersError("At least 1 occupant is required");
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
    <div className="glass-card p-5 sm:p-7 relative animate-scaleIn">
      {/* Section Header */}
      <div className="pb-5 mb-5 border-b border-black/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight">
              Project Input
            </h2>
            <p className="text-[13px] text-[#86868B] mt-1 leading-relaxed">
              Enter building details to estimate lifecycle waste.
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[10px] font-medium tracking-widest text-[#AEAEB2] uppercase bg-[#F5F5F7] px-2.5 py-1 rounded-full">
            Estimation
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Building Type */}
        <div className="space-y-2 relative">
          <label className="text-[13px] font-medium text-[#1D1D1F] block">
            Building Type
          </label>
          <div className="relative">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className="w-full flex items-center justify-between rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[13px] text-[#1D1D1F] hover:border-black/[0.15] focus:outline-none focus:ring-2 focus:ring-[#1D7A4B]/20 focus:border-[#1D7A4B] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 truncate">
                <Building2 className="h-4 w-4 text-[#86868B] shrink-0" />
                <span className="truncate">
                  {BUILDING_TYPE_CONFIG[input.buildingType]?.label}
                </span>
                <span className="text-[#AEAEB2] text-xs hidden sm:inline">
                  ({BUILDING_TYPE_CONFIG[input.buildingType]?.description})
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 text-[#AEAEB2] shrink-0 transition-transform ${isTypeDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isTypeDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full z-30 rounded-xl border border-black/[0.08] bg-white shadow-xl overflow-hidden py-1 animate-scaleIn">
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
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#1D7A4B]/8 text-[#1D7A4B] font-medium"
                          : "text-[#1D1D1F] hover:bg-[#F5F5F7]"
                      }`}
                    >
                      <div className="truncate">
                        <span>{cfg.label}</span>
                        <span className="text-[#AEAEB2] ml-2 text-xs">({cfg.description})</span>
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
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[#1D1D1F] block">
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
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#1D7A4B] bg-[#1D7A4B]/5 ring-1 ring-[#1D7A4B]/15"
                      : "border-black/[0.08] bg-white hover:border-black/[0.15] hover:bg-[#F5F5F7]"
                  }`}
                >
                  <span className={`text-[13px] font-medium ${isSelected ? "text-[#1D7A4B]" : "text-[#1D1D1F]"}`}>
                    {cfg.label}
                  </span>
                  <span className="text-[11px] text-[#AEAEB2] mt-0.5">{cfg.range}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Built-up Area & Users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label htmlFor="built-up-area" className="text-[13px] font-medium text-[#1D1D1F] block">
              Built-up Area
            </label>
            <div className="relative flex items-center rounded-xl border border-black/[0.08] bg-white px-4 py-3 focus-within:border-[#1D7A4B] focus-within:ring-2 focus-within:ring-[#1D7A4B]/15 transition-all">
              <input
                id="built-up-area"
                type="text"
                inputMode="numeric"
                value={input.builtUpArea > 0 ? input.builtUpArea.toLocaleString() : ""}
                onChange={(e) => handleAreaChange(e.target.value)}
                placeholder="10,000"
                disabled={isLoading}
                className="w-full bg-transparent text-[13px] text-[#1D1D1F] placeholder:text-[#D1D1D6] focus:outline-none"
              />
              <span className="text-[12px] text-[#AEAEB2] ml-2 select-none font-medium">m²</span>
            </div>
            {areaError && <p className="text-[12px] text-[#FF3B30] mt-1">{areaError}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="number-of-users" className="text-[13px] font-medium text-[#1D1D1F] block">
              Number of Users
            </label>
            <div className="relative flex items-center rounded-xl border border-black/[0.08] bg-white px-4 py-3 focus-within:border-[#1D7A4B] focus-within:ring-2 focus-within:ring-[#1D7A4B]/15 transition-all">
              <Users className="h-4 w-4 text-[#AEAEB2] mr-2.5 shrink-0" />
              <input
                id="number-of-users"
                type="text"
                inputMode="numeric"
                value={input.users > 0 ? input.users.toLocaleString() : ""}
                onChange={(e) => handleUsersChange(e.target.value)}
                placeholder="500"
                disabled={isLoading}
                className="w-full bg-transparent text-[13px] text-[#1D1D1F] placeholder:text-[#D1D1D6] focus:outline-none"
              />
              <span className="text-[12px] text-[#AEAEB2] ml-2 select-none font-medium">users</span>
            </div>
            {usersError && <p className="text-[12px] text-[#FF3B30] mt-1">{usersError}</p>}
          </div>
        </div>

        {/* Materials */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-medium text-[#1D1D1F] block">
              Primary Materials
            </label>
            <span className="text-[11px] text-[#AEAEB2]">Select multiple</span>
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
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? "border-[#1D7A4B] bg-[#1D7A4B]/5 ring-1 ring-[#1D7A4B]/15"
                      : "border-black/[0.08] bg-white hover:border-black/[0.15] hover:bg-[#F5F5F7]"
                  }`}
                >
                  <div
                    className={`mt-0.5 h-4 w-4 rounded shrink-0 flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "border-[#1D7A4B] bg-[#1D7A4B] text-white"
                        : "border-[#D1D1D6] bg-white"
                    }`}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div className="min-w-0">
                    <span className={`block text-[12px] font-medium leading-snug truncate ${isChecked ? "text-[#1D7A4B]" : "text-[#1D1D1F]"}`}>
                      {cfg.label}
                    </span>
                    <span className="block text-[10px] text-[#AEAEB2] leading-tight truncate mt-0.5">
                      {cfg.description.split(",")[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="site-location" className="text-[13px] font-medium text-[#1D1D1F] block">
            Site Location
          </label>
          <div className="relative flex items-center rounded-xl border border-black/[0.08] bg-white px-4 py-3 focus-within:border-[#1D7A4B] focus-within:ring-2 focus-within:ring-[#1D7A4B]/15 transition-all">
            <MapPin className="h-4 w-4 text-[#AEAEB2] mr-2.5 shrink-0" />
            <input
              id="site-location"
              type="text"
              value={input.location}
              onChange={(e) => onChange({ ...input, location: e.target.value })}
              placeholder="e.g. Chennai, India"
              disabled={isLoading}
              className="w-full bg-transparent text-[13px] text-[#1D1D1F] placeholder:text-[#D1D1D6] focus:outline-none"
            />
            {input.location && (
              <button
                type="button"
                onClick={() => onChange({ ...input, location: "" })}
                className="text-[#AEAEB2] hover:text-[#1D1D1F] ml-2 cursor-pointer transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading Sequence */}
        {isLoading && (
          <div className="rounded-xl bg-[#F5F5F7] p-4 text-[13px] space-y-2.5 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#1D7A4B] font-medium text-xs">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="tracking-wide uppercase">Analyzing Project</span>
            </div>
            <div className="space-y-1.5">
              {loadingSteps.map((step, idx) => {
                const isDone = loadingStep > idx;
                const isCurrent = loadingStep === idx;
                return (
                  <div
                    key={step}
                    className={`flex items-center justify-between text-[13px] ${
                      isDone ? "text-[#1D7A4B]" : isCurrent ? "text-[#1D1D1F]" : "text-[#D1D1D6]"
                    }`}
                  >
                    <span>{step}</span>
                    <span className="text-xs">{isDone ? "✓" : isCurrent ? "◌" : "○"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 sm:h-[52px] rounded-2xl bg-[#1D7A4B] hover:bg-[#22924F] active:bg-[#176A40] text-white font-semibold text-[15px] tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 shadow-[0_2px_12px_rgba(29,122,75,0.25)] hover:shadow-[0_4px_20px_rgba(29,122,75,0.35)]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing…</span>
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
