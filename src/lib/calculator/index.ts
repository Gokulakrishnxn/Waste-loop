import { calculateConstructionWaste } from "./construction";
import { calculateMaintenanceWaste } from "./maintenance";
import { generateManagementPlan } from "./management-plan";
import { calculateOperationalWaste } from "./operational";
import { ClimateData, ProjectInput, WasteResult } from "./types";
import { calculateWasteStreams } from "./waste-streams";

export * from "./construction";
export * from "./factors";
export * from "./maintenance";
export * from "./management-plan";
export * from "./operational";
export * from "./types";
export * from "./waste-streams";

export function calculateProjectWaste(
  input: ProjectInput,
  climate: ClimateData
): WasteResult {
  // 1. Construction waste
  const constResult = calculateConstructionWaste({
    area: input.builtUpArea,
    type: input.buildingType,
    scale: input.buildingScale,
    materials: input.materials,
  });

  // 2. Operational waste
  const opsResult = calculateOperationalWaste({
    users: input.users,
    type: input.buildingType,
  });

  // 3. Maintenance waste (climate adjusted)
  const maintResult = calculateMaintenanceWaste({
    area: input.builtUpArea,
    type: input.buildingType,
    climateFactor: climate.climateFactor,
  });

  // 4. Annual in-use waste
  const annualInUseKg = opsResult.totalKg + maintResult.totalKg;
  const annualInUseTonnes =
    Math.round(((opsResult.totalTonnes + maintResult.totalTonnes)) * 10) / 10;

  // 5. Waste streams
  const wasteStreams = calculateWasteStreams({
    constructionTonnes: constResult.totalTonnes,
    operationalTonnes: opsResult.totalTonnes,
    buildingType: input.buildingType,
    selectedMaterials: input.materials,
  });

  // 6. Management Plan
  const managementPlan = generateManagementPlan(
    wasteStreams.construction,
    wasteStreams.operational
  );

  return {
    constructionKg: constResult.totalKg,
    constructionTonnes: constResult.totalTonnes,
    operationalYearKg: opsResult.totalKg,
    operationalYearTonnes: opsResult.totalTonnes,
    maintenanceYearKg: maintResult.totalKg,
    maintenanceYearTonnes: maintResult.totalTonnes,
    annualInUseKg,
    annualInUseTonnes,
    climate,
    wasteStreams,
    managementPlan,
    breakdown: {
      construction: {
        area: input.builtUpArea,
        baseKgM2: constResult.baseKgM2,
        compositeMaterialFactor: constResult.compositeMaterialFactor,
        scaleFactor: constResult.scaleFactorValue,
        totalKg: constResult.totalKg,
        totalTonnes: constResult.totalTonnes,
      },
      operational: {
        users: input.users,
        kgPerUserDay: opsResult.kgPerUserDay,
        daysPerYear: opsResult.daysPerYear,
        totalKg: opsResult.totalKg,
        totalTonnes: opsResult.totalTonnes,
      },
      maintenance: {
        area: input.builtUpArea,
        maintKgM2Year: maintResult.maintKgM2Year,
        climateFactor: maintResult.climateFactor,
        totalKg: maintResult.totalKg,
        totalTonnes: maintResult.totalTonnes,
      },
    },
    calculatedAt: new Date().toISOString(),
  };
}
