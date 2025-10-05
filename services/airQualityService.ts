import { AirQualityData } from "@/types/airQuality";

// Simula uma chamada de API
export const fetchAirQualityData = async (): Promise<AirQualityData> => {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Dados simulados - em produção viria de uma API real
  const mockData: AirQualityData = {
    aqi: 102,
    location: "Pinheiros, São Paulo, Brazil",
    dominantPollutant: "pm25",
    lastUpdate: "2025-09-28T18:30:00-03:00",
    pollutants: [
      {
        id: "pm25",
        value: 36,
        unit: "µg/m³",
      },
      {
        id: "pm10",
        value: 55,
        unit: "µg/m³",
      },
      {
        id: "03",
        value: 90,
        unit: "µg/m³",
      },
      {
        id: "no2",
        value: 45,
        unit: "µg/m³",
      },
      {
        id: "co",
        value: 2.8,
        unit: "ppm",
      },
      {
        id: "so2",
        value: 45,
        unit: "µg/m³",
      },
    ],
  };

  return mockData;
};
