import { maintKgM2Year } from "./factors";
import { BuildingType } from "./types";

export interface MaintenanceCalculationInput {
  area: number;
  type: BuildingType;
  climateFactor: number;
}

export interface MaintenanceCalculationResult {
  totalKg: number;
  totalTonnes: number;
  maintKgM2Year: number;
  climateFactor: number;
}

export function calculateMaintenanceWaste(
  input: MaintenanceCalculationInput
): MaintenanceCalculationResult {
  const { area, type, climateFactor } = input;
  const baseMaint = maintKgM2Year[type] ?? 2.0;

  // maintenanceYear = area * maintKgM2Year[type] * climateFactor
  const totalKg = Math.max(0, area * baseMaint * climateFactor);
  const totalTonnes = Math.round((totalKg / 1000) * 10) / 10;

  return {
    totalKg: Math.round(totalKg),
    totalTonnes,
    maintKgM2Year: baseMaint,
    climateFactor,
  };
}
