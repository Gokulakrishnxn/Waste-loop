import { ManagementPlanItem, WasteStreamItem } from "./types";

export function generateManagementPlan(
  constructionStreams: WasteStreamItem[],
  operationalStreams: WasteStreamItem[],
  constructionDurationMonths: number = 12
): ManagementPlanItem[] {
  const plan: ManagementPlanItem[] = [];

  // Map construction waste streams to actionable Circular Economy procedures
  for (const item of constructionStreams) {
    let action = "Segregate on site for licensed recovery";
    let complianceNote = "C&D Waste Rules";

    if (item.id === "concrete") {
      action = "Segregate → on-site crushing for sub-base / certified aggregate";
      complianceNote = "IS 383 recycled aggregate standard";
    } else if (item.id === "brick") {
      action = "Manual deconstruction → salvage whole bricks or crush for pavers";
      complianceNote = "Masonry recovery benchmark";
    } else if (item.id === "wood") {
      action = "Formwork salvage → pallet refurbishment / certified biomass";
      complianceNote = "Zero open burning";
    } else if (item.id === "metal") {
      action = "Clean sorting → direct handover to authorised scrap foundry";
      complianceNote = "98%+ circularity value";
    } else if (item.id === "glass_gypsum") {
      action = "Careful panel dismantling → closed-loop drywall remanufacture";
      complianceNote = "Separate plasterboard from general rubble";
    } else if (item.id === "mixed") {
      action = "Secondary sorting line → RDF (Refuse-Derived Fuel) processing";
      complianceNote = "Divert from landfill";
    }

    const yearlyTonnes = item.tonnes;
    const monthlyTonnes =
      Math.round((yearlyTonnes / Math.max(1, constructionDurationMonths)) * 10) / 10;

    plan.push({
      id: `const-${item.id}`,
      stream: item.label,
      monthlyTonnes,
      yearlyTonnes,
      action,
      category: "construction",
      complianceNote,
    });
  }

  // Map operational waste streams to actionable daily facility practices
  for (const item of operationalStreams) {
    let action = "Source segregation at occupant bins";
    let complianceNote = "Solid Waste Rules";

    if (item.id === "organic") {
      action = "On-site organic waste composter (OWC) / biomethanation plant";
      complianceNote = "Yields nutrient-rich compost for landscaping";
    } else if (item.id === "paper") {
      action = "Baling & direct dispatch to paper pulping mills";
      complianceNote = "Grade-A fiber circular loop";
    } else if (item.id === "plastic") {
      action = "Dry stream segregation → mechanical recycling partner";
      complianceNote = "EPR registered recycler";
    } else if (item.id === "glass_metal") {
      action = "Container glass & beverage cans → municipal recycling chain";
      complianceNote = "Infinite recyclability";
    } else if (item.id === "residual") {
      action = "Non-recyclable inert sorting → waste-to-energy / RDF";
      complianceNote = "Landfill as last resort only (<5%)";
    }

    const yearlyTonnes = item.tonnes;
    const monthlyTonnes = Math.round((yearlyTonnes / 12) * 10) / 10;

    plan.push({
      id: `ops-${item.id}`,
      stream: item.label,
      monthlyTonnes,
      yearlyTonnes,
      action,
      category: "operational",
      complianceNote,
    });
  }

  return plan;
}
