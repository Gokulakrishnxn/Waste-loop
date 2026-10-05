import { ClimateExposure } from "./types";

export interface ClimateEvaluation {
  exposureLevel: ClimateExposure;
  climateFactor: number;
  exposureSummary: string;
}

export function evaluateClimateModifier(
  temperature: number,
  humidity: number,
  windSpeed: number,
  rainfall: number
): ClimateEvaluation {
  // Score climate severity based on weathering factors
  let severityScore = 0;

  // Humidity component
  if (humidity > 80) severityScore += 2.0;
  else if (humidity > 65) severityScore += 1.2;
  else if (humidity < 25) severityScore += 0.8; // dry dust abrasion

  // Precipitation component
  if (rainfall > 8) severityScore += 2.5;
  else if (rainfall > 3) severityScore += 1.5;
  else if (rainfall > 0.5) severityScore += 0.5;

  // Temperature stress (UV + thermal expansion)
  if (temperature > 34 || temperature < 0) severityScore += 2.0;
  else if (temperature > 28 || temperature < 8) severityScore += 1.0;

  // Wind buffeting and abrasive particulate load
  if (windSpeed > 25) severityScore += 1.5;
  else if (windSpeed > 15) severityScore += 0.8;

  // Classify exposure & compute climate factor
  let exposureLevel: ClimateExposure = "Moderate";
  let climateFactor = 1.0;
  let exposureSummary = "Moderate climate exposure";

  if (severityScore >= 5.5) {
    exposureLevel = "Severe";
    climateFactor = 1.22;
    exposureSummary = "Severe tropical/coastal exposure (+22% degradation)";
  } else if (severityScore >= 3.5) {
    exposureLevel = "High";
    climateFactor = 1.12;
    exposureSummary = "High climate exposure (+12% maintenance cycle)";
  } else if (severityScore >= 1.5) {
    exposureLevel = "Moderate";
    climateFactor = 1.04;
    exposureSummary = "Moderate climate exposure (+4% nominal buffer)";
  } else {
    exposureLevel = "Low";
    climateFactor = 0.95;
    exposureSummary = "Low climate exposure (-5% benign weathering)";
  }

  return {
    exposureLevel,
    climateFactor,
    exposureSummary,
  };
}
