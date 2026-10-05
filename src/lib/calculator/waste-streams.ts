import { BuildingType, Material, WasteStreamItem } from "./types";

export interface WasteStreamCalculationInput {
  constructionTonnes: number;
  operationalTonnes: number;
  buildingType: BuildingType;
  selectedMaterials: Material[];
}

export function calculateWasteStreams(input: WasteStreamCalculationInput): {
  construction: WasteStreamItem[];
  operational: WasteStreamItem[];
} {
  const { constructionTonnes, operationalTonnes, buildingType, selectedMaterials } = input;

  // Base construction weights
  const concreteWeight = selectedMaterials.includes("concrete") ? 52 : 30;
  const brickWeight = selectedMaterials.includes("brick") ? 20 : 8;
  const timberWeight = selectedMaterials.includes("timber") ? 14 : 8;
  const metalWeight = selectedMaterials.includes("steel") ? 10 : 5;
  const glassGypsumWeight =
    (selectedMaterials.includes("glass") ? 4 : 2) +
    (selectedMaterials.includes("gypsum") ? 4 : 2);
  const mixedWeight = 8;

  const totalConstWeight =
    concreteWeight +
    brickWeight +
    timberWeight +
    metalWeight +
    glassGypsumWeight +
    mixedWeight;

  // Normalize percentages to sum to 100%
  const constPercentages = [
    { id: "concrete", label: "Concrete / rubble", raw: concreteWeight },
    { id: "brick", label: "Brick / masonry", raw: brickWeight },
    { id: "wood", label: "Wood / packaging", raw: timberWeight },
    { id: "metal", label: "Metal", raw: metalWeight },
    { id: "glass_gypsum", label: "Glass / gypsum", raw: glassGypsumWeight },
    { id: "mixed", label: "Mixed / other", raw: mixedWeight },
  ];

  let sumNormalized = 0;
  const construction: WasteStreamItem[] = constPercentages.map((item, idx) => {
    let pct: number;
    if (idx === constPercentages.length - 1) {
      pct = 100 - sumNormalized;
    } else {
      pct = Math.round((item.raw / totalConstWeight) * 100);
      sumNormalized += pct;
    }
    const tonnes = Math.round((constructionTonnes * (pct / 100)) * 10) / 10;
    return {
      id: item.id,
      label: item.label,
      percentage: pct,
      tonnes,
      materialType: item.id,
    };
  });

  // Operational stream breakdown by building type
  let organicPct = 50;
  let paperPct = 18;
  let plasticPct = 16;
  let glassMetalPct = 7;
  let residualPct = 9;

  if (buildingType === "office") {
    organicPct = 32;
    paperPct = 36;
    plasticPct = 18;
    glassMetalPct = 6;
    residualPct = 8;
  } else if (buildingType === "hospital") {
    organicPct = 38;
    paperPct = 14;
    plasticPct = 24;
    glassMetalPct = 6;
    residualPct = 18;
  } else if (buildingType === "hotel") {
    organicPct = 54;
    paperPct = 12;
    plasticPct = 18;
    glassMetalPct = 8;
    residualPct = 8;
  } else if (buildingType === "school") {
    organicPct = 42;
    paperPct = 28;
    plasticPct = 16;
    glassMetalPct = 5;
    residualPct = 9;
  }

  const operationalStreams = [
    { id: "organic", label: "Organic / food", pct: organicPct },
    { id: "paper", label: "Paper / cardboard", pct: paperPct },
    { id: "plastic", label: "Plastic", pct: plasticPct },
    { id: "glass_metal", label: "Glass / metal", pct: glassMetalPct },
    { id: "residual", label: "Residual", pct: residualPct },
  ];

  const operational: WasteStreamItem[] = operationalStreams.map((item) => {
    const tonnes = Math.round((operationalTonnes * (item.pct / 100)) * 10) / 10;
    return {
      id: item.id,
      label: item.label,
      percentage: item.pct,
      tonnes,
    };
  });

  return {
    construction,
    operational,
  };
}
