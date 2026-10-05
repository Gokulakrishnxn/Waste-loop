import { BuildingScale, BuildingType, Material } from "./types";

export const BUILDING_TYPE_CONFIG: Record<
  BuildingType,
  {
    label: string;
    description: string;
    constructionBaseKgM2: number;
    userKgDay: number;
    maintKgM2Year: number;
  }
> = {
  residential: {
    label: "Residential",
    description: "Apartments, housing developments, residential complexes",
    constructionBaseKgM2: 55,
    userKgDay: 0.45,
    maintKgM2Year: 1.5,
  },
  office: {
    label: "Office",
    description: "Commercial offices, corporate headquarters, tech parks",
    constructionBaseKgM2: 65,
    userKgDay: 0.3,
    maintKgM2Year: 2.0,
  },
  retail: {
    label: "Retail / Commercial",
    description: "Shopping centers, retail outlets, showrooms",
    constructionBaseKgM2: 70,
    userKgDay: 0.5,
    maintKgM2Year: 2.5,
  },
  school: {
    label: "School / Institutional",
    description: "Schools, universities, research institutions",
    constructionBaseKgM2: 55,
    userKgDay: 0.25,
    maintKgM2Year: 1.8,
  },
  hospital: {
    label: "Hospital",
    description: "Healthcare facilities, clinics, medical centers",
    constructionBaseKgM2: 75,
    userKgDay: 1.2,
    maintKgM2Year: 3.0,
  },
  hotel: {
    label: "Hotel",
    description: "Hotels, resorts, hospitality establishments",
    constructionBaseKgM2: 70,
    userKgDay: 0.8,
    maintKgM2Year: 2.6,
  },
};

export const BUILDING_SCALE_CONFIG: Record<
  BuildingScale,
  {
    label: string;
    range: string;
    factor: number;
  }
> = {
  small: {
    label: "Small",
    range: "≤ 5,000 m²",
    factor: 0.95,
  },
  medium: {
    label: "Medium",
    range: "5,000–20,000 m²",
    factor: 1.0,
  },
  large: {
    label: "Large",
    range: "20,000–50,000 m²",
    factor: 1.04,
  },
  xlarge: {
    label: "Very Large",
    range: "50,000+ m²",
    factor: 1.08,
  },
};

export const MATERIAL_CONFIG: Record<
  Material,
  {
    label: string;
    factor: number;
    description: string;
  }
> = {
  concrete: {
    label: "RCC / Concrete",
    factor: 1.0,
    description: "Reinforced concrete, slabs, beams, columns",
  },
  brick: {
    label: "Brick / Masonry",
    factor: 1.08,
    description: "Clay bricks, fly ash blocks, mortar work",
  },
  steel: {
    label: "Steel",
    factor: 0.9,
    description: "Structural steel framing, rebar, metal decking",
  },
  glass: {
    label: "Glass",
    factor: 0.95,
    description: "Curtain walls, glazing panels, architectural glass",
  },
  timber: {
    label: "Timber",
    factor: 0.85,
    description: "Mass timber, formwork, carpentry framing",
  },
  gypsum: {
    label: "Gypsum / Drywall",
    factor: 1.12,
    description: "Partition boards, false ceilings, acoustic linings",
  },
};

export const constructionBaseKgM2: Record<BuildingType, number> = Object.fromEntries(
  Object.entries(BUILDING_TYPE_CONFIG).map(([k, v]) => [k, v.constructionBaseKgM2])
) as Record<BuildingType, number>;

export const materialFactor: Record<Material, number> = Object.fromEntries(
  Object.entries(MATERIAL_CONFIG).map(([k, v]) => [k, v.factor])
) as Record<Material, number>;

export const scaleFactor: Record<BuildingScale, number> = Object.fromEntries(
  Object.entries(BUILDING_SCALE_CONFIG).map(([k, v]) => [k, v.factor])
) as Record<BuildingScale, number>;

export const userKgDay: Record<BuildingType, number> = Object.fromEntries(
  Object.entries(BUILDING_TYPE_CONFIG).map(([k, v]) => [k, v.userKgDay])
) as Record<BuildingType, number>;

export const maintKgM2Year: Record<BuildingType, number> = Object.fromEntries(
  Object.entries(BUILDING_TYPE_CONFIG).map(([k, v]) => [k, v.maintKgM2Year])
) as Record<BuildingType, number>;
