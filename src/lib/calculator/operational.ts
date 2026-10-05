import { userKgDay } from "./factors";
import { BuildingType } from "./types";

export interface OperationalCalculationInput {
  users: number;
  type: BuildingType;
}

export interface OperationalCalculationResult {
  totalKg: number;
  totalTonnes: number;
  kgPerUserDay: number;
  daysPerYear: number;
}

export function calculateOperationalWaste(
  input: OperationalCalculationInput
): OperationalCalculationResult {
  const { users, type } = input;
  const kgDay = userKgDay[type] ?? 0.4;
  const days = 365;

  // operationalYear = users * userKgDay[type] * 365
  const totalKg = Math.max(0, users * kgDay * days);
  const totalTonnes = Math.round((totalKg / 1000) * 10) / 10;

  return {
    totalKg: Math.round(totalKg),
    totalTonnes,
    kgPerUserDay: kgDay,
    daysPerYear: days,
  };
}
