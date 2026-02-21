import { formatLastUpdate } from "../formatters";

describe("formatters", () => {
  describe("formatLastUpdate", () => {
    it("deve formatar uma string ISO corretamente para locale pt-BR", () => {
      // Como o tz depende do runner local, testamos o padrão e os dígitos em vez do output literal que pode variar com daylight saving
      const testDate = "2026-02-21T16:00:00.000Z";
      const result = formatLastUpdate(testDate);
      
      expect(typeof result).toBe("string");
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
      expect(result).toMatch(/\d{2}:\d{2}/);
    });

    it("deve retornar Invalid Date message se data vier vazia", () => {
      const result = formatLastUpdate("invalid-date");
      expect(result).toContain("Invalid Date");
    });
  });
});
