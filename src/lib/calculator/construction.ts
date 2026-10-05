import { constructionBaseKgM2, materialFactor, scaleFactor } from "./factors";
import { BuildingScale, BuildingType, Material } from "./types";

export interface ConstructionCalculationInput {
  area: number;
  type: BuildingType;
  scale: BuildingScale;
  materials: Material[];
}

export interface ConstructionCalculationResult {
  totalKg: number;
  totalTonnes: number;
  baseKgM2: number;
  compositeMaterialFactor: number;
  scaleFactorValue: number;
}

export function calculateConstructionWaste(
  input: ConstructionCalculationInput
): ConstructionCalculationResult {
  const { area, type, scale, materials } = input;

  const baseKg = constructionBaseKgM2[type] ?? 60;
  const scaleMult = scaleFactor[scale] ?? 1.0;

  // Composite material factor: average of all selected material factors, fallback to 1.0
  const compositeMaterialFactor =
    materials.length > 0
      ? materials.reduce((acc, mat) => acc + (materialFactor[mat] ?? 1.0), 0) /
        materials.length
      : 1.0;

  // constructionKg = area * constructionBaseKgM2[type] * materialFactor * scaleFactor
  const totalKg = Math.max(0, area * baseKg * compositeMaterialFactor * scaleMult);
  const totalTonnes = Math.round((totalKg / 1000) * 10) / 10;

  return {
    totalKg: Math.round(totalKg),
    totalTonnes,
    baseKgM2: baseKg,
    compositeMaterialFactor: Math.round(compositeMaterialFactor * 100) / 100,
    scaleFactorValue: scaleMult,
  };
}
