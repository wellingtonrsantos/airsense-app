import { render, screen } from "@testing-library/react-native";
import React from "react";
import { AQICircle } from "../AQICircle";
import { AQIStatus } from "@/types/airQuality";

describe("AQICircle", () => {
  it("renderiza o AQI e o status corretamente", () => {
    const mockStatus: AQIStatus = {
      status: "MODERADO",
      color: "#FFC107",
      recommendation: "Alguma recomendacao",
    };

    render(<AQICircle aqi={60} status={mockStatus} />);

    expect(screen.getByText("60")).toBeTruthy();
    expect(screen.getByText("MODERADO")).toBeTruthy();
  });
});
