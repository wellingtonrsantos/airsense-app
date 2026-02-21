import { getAQIStatus, getPollutantName } from "../statusMapper";

describe("statusMapper", () => {
  describe("getAQIStatus", () => {
    it('retorna o status "BOM" e a cor verde (#4CAF50) quando AQI é 45', () => {
      const aqi = 45;
      const result = getAQIStatus(aqi);

      expect(result.status).toBe("BOM");
      expect(result.color).toBe("#4CAF50");
    });

    it('retorna o status "RUIM" quando AQI é 155', () => {
      const aqi = 155;
      const result = getAQIStatus(aqi);

      expect(result.status).toBe("MUITO RUIM");
    });
    
    it('retorna o status "MODERADO" quando AQI é 75', () => {
      const result = getAQIStatus(75);
      expect(result.status).toBe("MODERADO");
      expect(result.color).toBe("#FFC107");
    });

    it('retorna o status "RUIM" quando AQI é 120', () => {
      const result = getAQIStatus(120);
      expect(result.status).toBe("RUIM");
      expect(result.color).toBe("#FF6B35");
    });

    it('retorna o status "PERIGOSO" quando AQI é 250', () => {
      const result = getAQIStatus(250);
      expect(result.status).toBe("PERIGOSO");
      expect(result.color).toBe("#9C27B0");
    });

    it('retorna o status "EMERGÊNCIA" quando AQI é 350', () => {
      const result = getAQIStatus(350);
      expect(result.status).toBe("EMERGÊNCIA");
      expect(result.color).toBe("#4A148C");
    });
  });

  describe("getPollutantName", () => {
    it("retorna o nome correto do poluente conhecido", () => {
      expect(getPollutantName("pm25")).toBe("PM2.5");
      expect(getPollutantName("PM10")).toBe("PM10");
      expect(getPollutantName("o3")).toBe("O3");
    });

    it("retorna o ID em maiúsculo para poluentes desconhecidos", () => {
      expect(getPollutantName("xyz")).toBe("XYZ");
    });
  });
});
