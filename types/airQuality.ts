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
