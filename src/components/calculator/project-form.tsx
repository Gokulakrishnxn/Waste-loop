import React, { useState } from "react";
import { ArrowRight, Building2, Check, ChevronDown, Loader2, MapPin, Play, Users, X } from "lucide-react";
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
    <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D0B] p-5 sm:p-6 shadow-2xl relative">
      {/* Subtle corner contour accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#C8FF4A]/5 to-transparent pointer-events-none rounded-tr-2xl" />

      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/[0.06] pb-4 mb-5">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-light text-[#526056] leading-none">01</span>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Project Input</h2>
            <p className="text-xs text-[#8E9B92] mt-0.5">
              Enter your building details to estimate waste across its lifecycle.
            </p>
          </div>
        </div>
        <div className="rounded-full border border-[#2E3C32] bg-[#0E1410] px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-[#A2B2A6] uppercase">
          ESTIMATION TOOL
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Building Type */}
        <div className="space-y-1.5 relative">
          <label className="text-xs font-medium text-[#C5D0C8] block">Building Type</label>
          <div className="relative">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className="w-full flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#0E1310] px-3.5 py-2.5 text-xs text-[#F3F5F4] hover:border-white/[0.15] focus:outline-none focus:ring-1 focus:ring-[#C8FF4A] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Building2 className="h-4 w-4 text-[#8E9B92] shrink-0" />
                <span className="truncate">
                  {BUILDING_TYPE_CONFIG[input.buildingType]?.label} ({BUILDING_TYPE_CONFIG[input.buildingType]?.description})
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-[#7A8A80] shrink-0" />
            </button>

            {isTypeDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-full z-30 rounded-xl border border-white/[0.12] bg-[#0E1411] shadow-2xl overflow-hidden py-1">
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
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#C8FF4A]/10 text-[#C8FF4A]"
                          : "text-[#D8E2DA] hover:bg-[#151D18]"
                      }`}
                    >
                      <div className="truncate">
                        <span className="font-medium">{cfg.label}</span>
                        <span className="text-[#7A8A80] ml-2 text-[11px]">({cfg.description})</span>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#C8FF4A] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Building Scale: 4 Segmented Cards */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#C5D0C8] block">Building Scale</label>
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
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#C8FF4A] bg-[#0E1510] shadow-[0_0_12px_rgba(200,255,74,0.12)] text-[#F3F5F4]"
                      : "border-white/[0.08] bg-[#0E1310] hover:border-white/[0.15] hover:bg-[#121814] text-[#8E9B92]"
                  }`}
                >
                  <span className={`text-xs font-medium ${isSelected ? "text-white font-semibold" : "text-[#D0DDD4]"}`}>
                    {cfg.label}
                  </span>
                  <span className="text-[10px] text-[#6E7E74] mt-0.5">{cfg.range}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Built-up Area & Number of Users (side-by-side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="built-up-area" className="text-xs font-medium text-[#C5D0C8] block">
              Built-up Area
            </label>
            <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-[#0E1310] px-3 py-2 focus-within:border-[#C8FF4A] transition-colors">
              <input
                id="built-up-area"
                type="text"
                inputMode="numeric"
                value={input.builtUpArea > 0 ? input.builtUpArea.toLocaleString() : ""}
                onChange={(e) => handleAreaChange(e.target.value)}
                placeholder="10,000"
                disabled={isLoading}
                className="w-full bg-transparent text-xs text-[#F3F5F4] placeholder:text-[#526056] focus:outline-none"
              />
              <span className="text-[11px] text-[#7A8A80] ml-2 select-none">m²</span>
            </div>
            {areaError && <p className="text-[11px] text-red-400 mt-1">{areaError}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="number-of-users" className="text-xs font-medium text-[#C5D0C8] block">
              Number of Users
            </label>
            <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-[#0E1310] px-3 py-2 focus-within:border-[#C8FF4A] transition-colors">
              <Users className="h-4 w-4 text-[#7A8A80] mr-2 shrink-0" />
              <input
                id="number-of-users"
                type="text"
                inputMode="numeric"
                value={input.users > 0 ? input.users.toLocaleString() : ""}
                onChange={(e) => handleUsersChange(e.target.value)}
                placeholder="500"
                disabled={isLoading}
                className="w-full bg-transparent text-xs text-[#F3F5F4] placeholder:text-[#526056] focus:outline-none"
              />
              <span className="text-[11px] text-[#7A8A80] ml-2 select-none">users</span>
            </div>
            {usersError && <p className="text-[11px] text-red-400 mt-1">{usersError}</p>}
          </div>
        </div>

        {/* Primary Materials: 6 compact cards */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#C5D0C8] block">Primary Materials</label>
            <span className="text-[10px] text-[#7A8A80]">Select main construction materials (choose multiple)</span>
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
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? "border-[#C8FF4A] bg-[#0E1611] shadow-[0_0_10px_rgba(200,255,74,0.08)]"
                      : "border-white/[0.08] bg-[#0E1310] hover:border-white/[0.15] hover:bg-[#121814]"
                  }`}
                >
                  <div
                    className={`mt-0.5 h-4 w-4 rounded shrink-0 flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "border-[#C8FF4A] bg-[#C8FF4A] text-[#060807]"
                        : "border-[#3A4A3E] bg-[#121714]"
                    }`}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div className="min-w-0">
                    <span className={`block text-[11px] font-medium leading-snug truncate ${isChecked ? "text-white" : "text-[#A8B6AC]"}`}>
                      {cfg.label}
                    </span>
                    <span className="block text-[9px] text-[#6E7E74] leading-tight truncate">
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
          <label htmlFor="site-location" className="text-xs font-medium text-[#C5D0C8] block">
            Site Location
          </label>
          <div className="relative flex items-center rounded-xl border border-white/[0.08] bg-[#0E1310] px-3 py-2 focus-within:border-[#C8FF4A] transition-colors">
            <MapPin className="h-4 w-4 text-[#7A8A80] mr-2 shrink-0" />
            <input
              id="site-location"
              type="text"
              value={input.location}
              onChange={(e) => onChange({ ...input, location: e.target.value })}
              placeholder="e.g. Chennai, India"
              disabled={isLoading}
              className="w-full bg-transparent text-xs text-[#F3F5F4] placeholder:text-[#526056] focus:outline-none"
            />
            {input.location && (
              <button
                type="button"
                onClick={() => onChange({ ...input, location: "" })}
                className="text-[#7A8A80] hover:text-white ml-2 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <p className="text-[10px] text-[#6E7E74]">e.g. Chennai, India</p>
        </div>

        {/* Loading Steps Sequence */}
        {isLoading && (
          <div className="rounded-xl border border-white/[0.08] bg-[#0C100D] p-3 text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#C8FF4A] font-medium text-[11px]">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>ANALYZING PROJECT</span>
            </div>
            <div className="space-y-1 text-[11px]">
              {loadingSteps.map((step, idx) => {
                const isDone = loadingStep > idx;
                const isCurrent = loadingStep === idx;
                return (
                  <div
                    key={step}
                    className={`flex items-center justify-between ${
                      isDone ? "text-[#C8FF4A]" : isCurrent ? "text-white" : "text-[#526056]"
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

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-[#C8FF4A] hover:bg-[#D5FF66] active:bg-[#B8F538] text-[#0A0D0B] font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(200,255,74,0.2)] hover:shadow-[0_0_28px_rgba(200,255,74,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-[#0A0D0B]" />
              <span>Analyzing Project...</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-[#0A0D0B]" />
              <span>Analyze Waste</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
