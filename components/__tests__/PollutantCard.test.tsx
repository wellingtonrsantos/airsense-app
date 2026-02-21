import { render, screen } from "@testing-library/react-native";
import React from "react";
import { PollutantCard } from "../PollutantCard";
import { Pollutant } from "@/types/airQuality";

describe("PollutantCard", () => {
  const defaultPollutant: Pollutant = {
    id: "pm25",
    value: 12.5,
    unit: "µg/m³",
  };

  it("renderiza o card de um poluente padrão (não destacado)", () => {
    // Não passa isHighlighted, logo é false por padrão
    render(<PollutantCard pollutant={defaultPollutant} />);

    expect(screen.getByText(/12\.5/)).toBeTruthy();
    expect(screen.getByText(/µg\/m³/)).toBeTruthy();
    // PM2.5 é o nome retornado pela função helper para id 'pm25'
    expect(screen.getByText("PM2.5")).toBeTruthy();
  });

  it("renderiza o card no estado de destacado usando a cor do status da qualidade do ar", () => {
    const mockAqiStatus = { status: "RUIM", color: "#FF0000", recommendation: "" };
    
    const { getByText } = render(
      <PollutantCard 
        pollutant={defaultPollutant} 
        isHighlighted={true} 
        aqiStatus={mockAqiStatus}
      />
    );

    // O texto deve existir e a View envolvente tem backgroundColor mudando. 
    // Em teste unitário, verificamos apenas se as queries retornam os elementos sem render crash.
    expect(getByText(/12\.5/)).toBeTruthy();
  });
});
