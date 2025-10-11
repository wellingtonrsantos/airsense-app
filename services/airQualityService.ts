import { AirQualityData } from "@/types/airQuality";
import { ApiError } from "@/utils/apiErrorHandler";
import axios, { isAxiosError } from "axios";

const API_BASE_URL = "http://192.168.1.13:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 segundos
});

// Coordenadas fixas
const COORDINATES = {
  lat: -23.61404409606389,
  lon: -46.74878386104627,
};

export const fetchAirQualityData = async (): Promise<AirQualityData> => {
  try {
    const response = await api.get<AirQualityData>("/air-quality", {
      params: {
        lat: COORDINATES.lat,
        lon: COORDINATES.lon,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const errorType = error.response.statusText;

        const message =
          error.response.data?.message || "Ocorreu um erro no servidor.";

        throw new ApiError(status, errorType, message);
      }
    }

    throw error;
  }
};
