import { AirQualityData } from "@/types/airQuality";
import { ApiError } from "@/utils/apiErrorHandler";
import axios, { isAxiosError } from "axios";

const API_BASE_URL = "http://192.168.1.13:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const fetchAirQualityData = async (
  lat: number,
  lon: number
): Promise<AirQualityData> => {
  try {
    const response = await api.get<AirQualityData>("/air-quality", {
      params: {
        lat,
        lon,
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
