import { render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import AirQualityScreen from "../index";
import * as Location from "expo-location";

// Mock das dependências native
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


describe("AirQualityScreen", () => {
  it("exibe a tela de erro (ErrorScreen) com mensagem de permissão negada caso status seja denied", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    // 1 - Prepara o retorno do expo-location negando a permissão
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValueOnce(
      { status: "denied" }
    );

    // 2 - Renderiza
    render(<AirQualityScreen />);

    // 3 - Na primeira carga aparece o Loading
    expect(screen.getByTestId("loading-screen")).toBeTruthy();

    // 4 - Espera a atualização (quando loadData jogar o erro)
    await waitFor(() => {
      expect(screen.getByText("Ops!")).toBeTruthy();
      expect(screen.getByText("Abrir Configurações")).toBeTruthy();
    });
  });
});
