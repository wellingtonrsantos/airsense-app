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

  it("renderiza corretamente para o status BOM", () => {
    const mockStatus: AQIStatus = { status: "BOM", color: "#4CAF50", recommendation: "" };
    render(<AQICircle aqi={45} status={mockStatus} />);
    expect(screen.getByText("45")).toBeTruthy();
    expect(screen.getByText("BOM")).toBeTruthy();
  });

  it("renderiza corretamente para o status RUIM", () => {
    const mockStatus: AQIStatus = { status: "RUIM", color: "#FF6B35", recommendation: "" };
    render(<AQICircle aqi={120} status={mockStatus} />);
    expect(screen.getByText("120")).toBeTruthy();
    expect(screen.getByText("RUIM")).toBeTruthy();
  });

  it("renderiza corretamente para o status MUITO RUIM", () => {
    const mockStatus: AQIStatus = { status: "MUITO RUIM", color: "#F44336", recommendation: "" };
    render(<AQICircle aqi={180} status={mockStatus} />);
    expect(screen.getByText("180")).toBeTruthy();
    expect(screen.getByText("MUITO RUIM")).toBeTruthy();
  });

  it("renderiza corretamente para o status PERIGOSO", () => {
    const mockStatus: AQIStatus = { status: "PERIGOSO", color: "#9C27B0", recommendation: "" };
    render(<AQICircle aqi={250} status={mockStatus} />);
    expect(screen.getByText("250")).toBeTruthy();
    expect(screen.getByText("PERIGOSO")).toBeTruthy();
  });

  it("renderiza corretamente para o status EMERGÊNCIA", () => {
    const mockStatus: AQIStatus = { status: "EMERGÊNCIA", color: "#4A148C", recommendation: "" };
    render(<AQICircle aqi={400} status={mockStatus} />);
    expect(screen.getByText("400")).toBeTruthy();
    expect(screen.getByText("EMERGÊNCIA")).toBeTruthy();
  });

  it("renderiza utilizando a cor default do gradiente se a cor for desconhecida", () => {
    const mockStatus: AQIStatus = { status: "DESCONHECIDO", color: "#UNKNOWN", recommendation: "" };
    render(<AQICircle aqi={999} status={mockStatus} />);
    expect(screen.getByText("999")).toBeTruthy();
    expect(screen.getByText("DESCONHECIDO")).toBeTruthy();
  });
});
