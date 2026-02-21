import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react-native";
import React from "react";
import { AppState } from "react-native";
import AirQualityScreen from "../index";
import * as Location from "expo-location";

jest.mock("expo-location");

jest.mock("@/services/airQualityService", () => ({
  fetchAirQualityData: jest.fn(),
}));

jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
}));

jest.mock("expo-asset", () => ({
  useAssets: jest.fn().mockReturnValue([[{}], null]),
}));

jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children, ...props }: any) => (
      <View {...props}>{children}</View>
    ),
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  };
});

jest.mock("@/components/AQICircle", () => ({
  AQICircle: ({ aqi }: any) => {
    const { Text } = require("react-native");
    return <Text>{aqi}</Text>;
  },
}));

jest.mock("@/components/PollutantCard", () => ({
  PollutantCard: ({ pollutant }: any) => {
    const { Text } = require("react-native");
    return <Text>{pollutant.id}</Text>;
  },
}));

jest.mock("@/components/WeatherInfo", () => ({
  WeatherInfo: () => {
    const { View } = require("react-native");
    return <View />;
  },
}));

jest.mock("@/components/LoadingScreen", () => ({
  LoadingScreen: () => {
    const { View } = require("react-native");
    return <View testID="loading-screen" />;
  },
}));

jest.mock("@/components/ErrorScreen", () => ({
  ErrorScreen: ({ message, onRetry }: any) => {
    const { View, Text, Pressable } = require("react-native");
    return (
      <View>
        <Text>Ops!</Text>
        <Text>{message}</Text>
        <Pressable onPress={onRetry}>
          <Text>Abrir Configurações</Text>
        </Pressable>
      </View>
    );
  },
}));

beforeAll(() => {
  jest
    .spyOn(AppState, "addEventListener")
    .mockReturnValue({ remove: jest.fn() });
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  (console.error as jest.Mock).mockRestore();
  (console.log as jest.Mock).mockRestore();
});

describe("AirQualityScreen", () => {
  it("exibe a tela de erro (ErrorScreen) com mensagem de permissão negada caso status seja denied", async () => {
    // 1 - Prepara o retorno do expo-location negando a permissão
    (
      Location.requestForegroundPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({ status: "denied" });

    // 2 - Renderiza
    render(<AirQualityScreen />);

    // 3 - Na primeira carga aparece o Loading
    expect(screen.getByTestId("loading-screen")).toBeTruthy();

    // 4 - Espera a atualização (quando loadData jogar o erro)
    // Aguarda ambos os elementos aparecerem de uma vez
    await waitFor(
      () => {
        expect(screen.getByText("Ops!")).toBeTruthy();
        expect(screen.getByText("Abrir Configurações")).toBeTruthy();
      },
      { timeout: 3000 },
    );
  });

  it("carrega a tela principal e exibe os dados agrupados quando a API tem sucesso", async () => {
    (
      Location.requestForegroundPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({ status: "granted" });
    (Location.getLastKnownPositionAsync as jest.Mock).mockResolvedValueOnce({
      coords: { latitude: -23.5, longitude: -46.6 },
      timestamp: Date.now(),
    });

    const mockData = {
      location: "São Paulo",
      aqi: 50,
      dominantPollutant: "pm25",
      weather: { temperature: 28, humidity: 60 },
      pollutants: [
        { id: "pm25", value: 12, unit: "µg" },
        { id: "o3", value: 45, unit: "ppb" },
      ],
      lastUpdate: new Date().toISOString(),
    };
    const { fetchAirQualityData } = require("@/services/airQualityService");
    fetchAirQualityData.mockResolvedValueOnce(mockData);

    render(<AirQualityScreen />);

    // O findByText atua nativamente aguardando as modificações assíncronas do React Native Testing Lib
    await waitFor(
      () => {
        expect(screen.getByTestId("location-text")).toBeTruthy();
      },
      { timeout: 3000 },
    );
  });

  it("exibe ErrorScreen se a API de serviço quebrar depois de passar a permissão", async () => {
    (
      Location.requestForegroundPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({ status: "granted" });
    (Location.getLastKnownPositionAsync as jest.Mock).mockResolvedValueOnce({
      coords: { latitude: 0, longitude: 0 },
      timestamp: Date.now(),
    });

    const { fetchAirQualityData } = require("@/services/airQualityService");
    fetchAirQualityData.mockRejectedValueOnce(
      new TypeError("Network request failed"),
    );

    render(<AirQualityScreen />);

    await waitFor(
      () => {
        expect(
          screen.getByText("Sem conexão com a internet. Verifique sua rede."),
        ).toBeTruthy();
      },
      { timeout: 3000 },
    );
  });
});
