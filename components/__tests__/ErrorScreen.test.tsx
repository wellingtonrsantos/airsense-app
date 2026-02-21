import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { ErrorScreen } from "../ErrorScreen";
import { Linking } from "react-native";

jest.mock("lucide-react-native", () => ({
  AlertCircle: "AlertCircle",
  MapPinOff: "MapPinOff",
  ServerCrash: "ServerCrash",
  WifiOff: "WifiOff"
}));

describe("ErrorScreen", () => {
  it("renderiza o error genérico e intercepta o Retry", () => {
    const mockOnRetry = jest.fn();
    render(<ErrorScreen message="Erro genérico" onRetry={mockOnRetry} />);

    expect(screen.getByText("Ops!")).toBeTruthy();
    expect(screen.getByText("Erro genérico")).toBeTruthy();
    
    // Fallback error hint
    expect(screen.getByText("Tente novamente em alguns instantes")).toBeTruthy();

    fireEvent.press(screen.getByText("Tentar Novamente"));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it("renderiza erro de network com as dicas corretas", () => {
    const mockOnRetry = jest.fn();
    render(<ErrorScreen errorType="network" onRetry={mockOnRetry} />);

    expect(screen.getByText("Verifique sua conexão com a internet")).toBeTruthy();
    
    fireEvent.press(screen.getByText("Tentar Novamente"));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it("renderiza erro de servidor com as dicas corretas", () => {
    const mockOnRetry = jest.fn();
    render(<ErrorScreen errorType="server" onRetry={mockOnRetry} />);

    expect(screen.getByText("Nossos servidores estão temporariamente indisponíveis")).toBeTruthy();
  });

  it("renderiza erro de permissão e intercepta Open Settings", () => {
    const mockOnRetry = jest.fn();
    const openSettingsSpy = jest.spyOn(Linking, "openSettings").mockResolvedValue(undefined as never);
    
    render(<ErrorScreen errorType="permission" onRetry={mockOnRetry} />);

    // Test permission hints and buttons
    expect(screen.getByText(/Ative a permissão de localização/i)).toBeTruthy();
    expect(screen.getByText("Abrir Configurações")).toBeTruthy();
    expect(screen.getByText("Tentar Novamente")).toBeTruthy();

    fireEvent.press(screen.getByText("Abrir Configurações"));
    expect(openSettingsSpy).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByText("Tentar Novamente"));
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });
});
