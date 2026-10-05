import { evaluateClimateModifier } from "../calculator/climate";
import { ClimateData } from "../calculator/types";

// Offline fallback dictionary for instant, reliable resolution
interface CityPreset {
  name: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
}

const CITY_PRESETS: Record<string, CityPreset> = {
  "chennai, tamil nadu, india": {
    name: "Chennai, Tamil Nadu, India",
    latitude: 13.0827,
    longitude: 80.2707,
    temperature: 27.8,
    humidity: 80,
    windSpeed: 6.9,
    rainfall: 0.5,
  },
  "chennai, india": {
    name: "Chennai, Tamil Nadu, India",
    latitude: 13.0827,
    longitude: 80.2707,
    temperature: 27.8,
    humidity: 80,
    windSpeed: 6.9,
    rainfall: 0.5,
  },
  "chennai": {
    name: "Chennai, Tamil Nadu, India",
    latitude: 13.0827,
    longitude: 80.2707,
    temperature: 27.8,
    humidity: 80,
    windSpeed: 6.9,
    rainfall: 0.5,
  },
  "bengaluru, india": {
    name: "Bengaluru, India",
    latitude: 12.9716,
    longitude: 77.5946,
    temperature: 25.1,
    humidity: 62,
    windSpeed: 10.5,
    rainfall: 2.1,
  },
  "bengaluru": {
    name: "Bengaluru, India",
    latitude: 12.9716,
    longitude: 77.5946,
    temperature: 25.1,
    humidity: 62,
    windSpeed: 10.5,
    rainfall: 2.1,
  },
  "mumbai, india": {
    name: "Mumbai, India",
    latitude: 19.076,
    longitude: 72.8777,
    temperature: 31.0,
    humidity: 78,
    windSpeed: 14.2,
    rainfall: 4.8,
  },
  "mumbai": {
    name: "Mumbai, India",
    latitude: 19.076,
    longitude: 72.8777,
    temperature: 31.0,
    humidity: 78,
    windSpeed: 14.2,
    rainfall: 4.8,
  },
  "delhi, india": {
    name: "Delhi, India",
    latitude: 28.6139,
    longitude: 77.209,
    temperature: 28.5,
    humidity: 48,
    windSpeed: 9.0,
    rainfall: 1.1,
  },
  "delhi": {
    name: "Delhi, India",
    latitude: 28.6139,
    longitude: 77.209,
    temperature: 28.5,
    humidity: 48,
    windSpeed: 9.0,
    rainfall: 1.1,
  },
  "london, uk": {
    name: "London, United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    temperature: 15.2,
    humidity: 68,
    windSpeed: 16.0,
    rainfall: 2.0,
  },
  "london": {
    name: "London, United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    temperature: 15.2,
    humidity: 68,
    windSpeed: 16.0,
    rainfall: 2.0,
  },
  "new york, usa": {
    name: "New York, USA",
    latitude: 40.7128,
    longitude: -74.006,
    temperature: 18.0,
    humidity: 60,
    windSpeed: 14.0,
    rainfall: 2.5,
  },
  "new york": {
    name: "New York, USA",
    latitude: 40.7128,
    longitude: -74.006,
    temperature: 18.0,
    humidity: 60,
    windSpeed: 14.0,
    rainfall: 2.5,
  },
  "singapore": {
    name: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    temperature: 31.2,
    humidity: 82,
    windSpeed: 11.0,
    rainfall: 6.4,
  },
  "dubai, uae": {
    name: "Dubai, United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    temperature: 36.5,
    humidity: 45,
    windSpeed: 18.0,
    rainfall: 0.1,
  },
  "dubai": {
    name: "Dubai, United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    temperature: 36.5,
    humidity: 45,
    windSpeed: 18.0,
    rainfall: 0.1,
  },
};

export async function fetchClimateData(query: string): Promise<ClimateData> {
  const trimmed = query.trim().toLowerCase();

  // If query is empty
  if (!trimmed) {
    throw new Error("Please specify a site location to retrieve climate data.");
  }

  // 1. Check preset dictionary first for lightning-fast matching and validated benchmarks
  const preset = CITY_PRESETS[trimmed];
  if (preset) {
    const evaluation = evaluateClimateModifier(
      preset.temperature,
      preset.humidity,
      preset.windSpeed,
      preset.rainfall
    );

    return {
      name: preset.name,
      latitude: preset.latitude,
      longitude: preset.longitude,
      temperature: preset.temperature,
      humidity: preset.humidity,
      windSpeed: preset.windSpeed,
      rainfall: preset.rainfall,
      exposureLevel: evaluation.exposureLevel,
      climateFactor: evaluation.climateFactor,
      isFallback: false,
      statusMessage: evaluation.exposureSummary,
    };
  }

  try {
    // Attempt live Open-Meteo Geocoding API with 4s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query.trim()
    )}&count=1&language=en&format=json`;

    const geoRes = await fetch(geoUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (geoRes.ok) {
      const geoData = await geoRes.json();
      if (geoData.results && geoData.results.length > 0) {
        const place = geoData.results[0];
        const lat = place.latitude;
        const lon = place.longitude;
        const resolvedName = [place.name, place.admin1, place.country]
          .filter(Boolean)
          .join(", ");

        // Fetch live weather data
        const weatherController = new AbortController();
        const weatherTimeoutId = setTimeout(() => weatherController.abort(), 4000);

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m`;

        const weatherRes = await fetch(weatherUrl, {
          signal: weatherController.signal,
        });
        clearTimeout(weatherTimeoutId);

        if (weatherRes.ok) {
          const wData = await weatherRes.json();
          const current = wData.current ?? {};
          const temperature =
            typeof current.temperature_2m === "number"
              ? Math.round(current.temperature_2m * 10) / 10
              : 25.0;
          const humidity =
            typeof current.relative_humidity_2m === "number"
              ? Math.round(current.relative_humidity_2m)
              : 65;
          const windSpeed =
            typeof current.wind_speed_10m === "number"
              ? Math.round(current.wind_speed_10m * 10) / 10
              : 12.0;
          const rainfall =
            typeof current.precipitation === "number"
              ? Math.round(current.precipitation * 10) / 10
              : 1.5;

          const evaluation = evaluateClimateModifier(
            temperature,
            humidity,
            windSpeed,
            rainfall
          );

          return {
            name: resolvedName,
            latitude: lat,
            longitude: lon,
            temperature,
            humidity,
            windSpeed,
            rainfall,
            exposureLevel: evaluation.exposureLevel,
            climateFactor: evaluation.climateFactor,
            isFallback: false,
            statusMessage: evaluation.exposureSummary,
          };
        }
      }
    }
  } catch {
    // Live API fetch failed or timed out.
    // Proceed to fallback mechanisms below.
  }

  // 2. If the location could not be recognized anywhere
  // Check if it looks completely invalid (less than 2 characters)
  if (trimmed.length < 2) {
    throw new Error('We couldn\'t find that location. Try: "Chennai, India"');
  }

  // 4. Graceful neutral fallback for unknown location or offline state
  const defaultEvaluation = evaluateClimateModifier(25.0, 60, 10.0, 1.0);
  return {
    name: query.trim(),
    latitude: 0,
    longitude: 0,
    temperature: 25.0,
    humidity: 60,
    windSpeed: 10.0,
    rainfall: 1.0,
    exposureLevel: defaultEvaluation.exposureLevel,
    climateFactor: 1.0, // Neutral factor
    isFallback: true,
    statusMessage:
      "Climate data is temporarily unavailable. We calculated your estimate using a neutral climate factor (1.00).",
  };
}
