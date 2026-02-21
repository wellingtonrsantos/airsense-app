import { render, screen } from "@testing-library/react-native";
import React from "react";
import { WeatherInfo } from "../WeatherInfo";

jest.mock("lucide-react-native", () => ({
  Thermometer: "Thermometer",
  Droplets: "Droplets",
}));

describe("WeatherInfo", () => {
  it("exibe temperatura e umidade corretamente", () => {
    render(<WeatherInfo temperature={25.5} humidity={60} />);

    // Checa pelo layout `${temperature}°C`
    expect(screen.getByText("25.5°C")).toBeTruthy();
    expect(screen.getByText("Temperatura")).toBeTruthy();

    // Checa pelo layout `${humidity}%`
    expect(screen.getByText("60%")).toBeTruthy();
    expect(screen.getByText("Umidade")).toBeTruthy();
  });
});
