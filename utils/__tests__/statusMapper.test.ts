import { getAQIStatus } from "../statusMapper";

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
  });
});
