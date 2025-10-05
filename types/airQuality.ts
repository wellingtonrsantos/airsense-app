export interface Pollutant {
  id: string;
  value: number;
  unit: string;
}

export interface AirQualityData {
  aqi: number;
  location: string;
  dominantPollutant: string;
  lastUpdate: string;
  pollutants: Pollutant[];
}

export interface AQIStatus {
  status: string;
  color: string;
  recommendation: string;
}

export const getAQIStatus = (aqi: number): AQIStatus => {
  if (aqi <= 50) {
    return {
      status: "BOM",
      color: "#4CAF50",
      recommendation:
        "Qualidade do ar satisfatória para a maioria das pessoas.",
    };
  } else if (aqi <= 100) {
    return {
      status: "MODERADO",
      color: "#FFC107",
      recommendation: "Pessoas sensíveis podem sentir sintomas leves.",
    };
  } else if (aqi <= 150) {
    return {
      status: "RUIM",
      color: "#FF6B35",
      recommendation: "Pessoas sensíveis devem limitar atividades ao ar livre.",
    };
  } else if (aqi <= 200) {
    return {
      status: "MUITO RUIM",
      color: "#F44336",
      recommendation: "Todos devem evitar atividades ao ar livre.",
    };
  } else {
    return {
      status: "PERIGOSO",
      color: "#9C27B0",
      recommendation: "Emergência de saúde. Toda população pode ser afetada.",
    };
  }
};

export const getPollutantName = (id: string): string => {
  const pollutantNames: { [key: string]: string } = {
    pm25: "PM2.5",
    pm10: "PM10",
    o3: "O3",
    co: "CO",
    no2: "NO2",
    so2: "SO2",
  };

  return pollutantNames[id.toLowerCase()] || id.toUpperCase();
};
