export type BuildingType =
  | "residential"
  | "office"
  | "retail"
  | "school"
  | "hospital"
  | "hotel";

export type BuildingScale = "small" | "medium" | "large" | "xlarge";

export type Material =
  | "concrete"
  | "brick"
  | "steel"
  | "glass"
  | "timber"
  | "gypsum";

export interface ProjectInput {
  buildingType: BuildingType;
  buildingScale: BuildingScale;
  builtUpArea: number; // in m²
  users: number;
  materials: Material[];
  location: string;
}

export type ClimateExposure = "Low" | "Moderate" | "High" | "Severe";

export interface ClimateData {
  name: string;
  latitude: number;
  longitude: number;
  temperature: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  rainfall: number; // mm/day
  exposureLevel: ClimateExposure;
  climateFactor: number;
  isFallback?: boolean;
  statusMessage?: string;
}

export interface WasteStreamItem {
  id: string;
  label: string;
  percentage: number;
  tonnes: number;
  color?: string;
  materialType?: string;
}

export interface ManagementPlanItem {
  id: string;
  stream: string;
  monthlyTonnes: number;
  yearlyTonnes: number;
  action: string;
  category: "construction" | "operational";
  complianceNote?: string;
}

export interface CalculationBreakdown {
  construction: {
    area: number;
    baseKgM2: number;
    compositeMaterialFactor: number;
    scaleFactor: number;
    totalKg: number;
    totalTonnes: number;
  };
  operational: {
    users: number;
    kgPerUserDay: number;
    daysPerYear: number;
    totalKg: number;
    totalTonnes: number;
  };
  maintenance: {
    area: number;
    maintKgM2Year: number;
    climateFactor: number;
    totalKg: number;
    totalTonnes: number;
  };
}

export interface WasteResult {
  constructionTonnes: number;
  constructionKg: number;
  operationalYearTonnes: number;
  operationalYearKg: number;
  maintenanceYearTonnes: number;
  maintenanceYearKg: number;
  annualInUseTonnes: number;
  annualInUseKg: number;
  climate: ClimateData;
  wasteStreams: {
    construction: WasteStreamItem[];
    operational: WasteStreamItem[];
  };
  managementPlan: ManagementPlanItem[];
  breakdown: CalculationBreakdown;
  calculatedAt: string;
}
