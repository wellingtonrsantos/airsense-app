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
  weather: WeatherData;
}

export interface AQIStatus {
  status: string;
  color: string;
  recommendation: string;
}

export interface WeatherData {
  temperature: number | null;
  humidity: number | null;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export const getAQIStatus = (aqi: number): AQIStatus => {
  const aqiValue = Math.floor(aqi);

  if (aqiValue <= 50) {
    return {
      status: "BOM",
      color: "#4CAF50",
      recommendation:
        "Qualidade do ar satisfatória. Pouco ou nenhum risco de poluição.",
    };
  } else if (aqiValue <= 100) {
    return {
      status: "MODERADO",
      color: "#FFC107",
      recommendation:
        "Qualidade aceitável. Pessoas sensíveis devem limitar esforços prolongados ao ar livre.",
    };
  } else if (aqiValue <= 150) {
    return {
      status: "RUIM",
      color: "#FF6B35",
      recommendation:
        "Membros de grupos sensíveis podem ter problemas de saúde. Limite esforços prolongados ao ar livre.",
    };
  } else if (aqiValue <= 200) {
    return {
      status: "MUITO RUIM",
      color: "#F44336",
      recommendation:
        "Todos podem começar a sentir efeitos. Grupos sensíveis devem EVITAR esforços prolongados ao ar livre.",
    };
  } else if (aqiValue <= 300) {
    return {
      status: "PERIGOSO",
      color: "#9C27B0",
      recommendation:
        "Alerta de emergência. Grupos sensíveis devem EVITAR toda atividade ao ar livre.",
    };
  } else {
    return {
      status: "EMERGÊNCIA",
      color: "#4A148C",
      recommendation:
        "Alerta de saúde. TODOS devem evitar toda atividade e exposição ao ar livre.",
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
