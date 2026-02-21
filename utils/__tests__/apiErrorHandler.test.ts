import { ApiError, getErrorDetails, getErrorMessage } from "../apiErrorHandler";

describe("apiErrorHandler", () => {
  describe("getErrorDetails", () => {
    it("retorna server error para ApiError com statusCode > 500", () => {
      const error = new ApiError(500, "Internal Server Error", "Database timeout");
      const details = getErrorDetails(error);

      expect(details.type).toBe("server");
      expect(details.message).toBe("Database timeout");
    });

    it("retorna generic error para ApiError com statusCode < 500", () => {
      const error = new ApiError(400, "Bad Request", "Missing param");
      const details = getErrorDetails(error);

      expect(details.type).toBe("generic");
      expect(details.message).toBe("Missing param");
    });

    it("retorna network error quando TypeError for 'Network request failed'", () => {
      const error = new TypeError("Network request failed");
      const details = getErrorDetails(error);

      expect(details.type).toBe("network");
      expect(details.message).toBe("Sem conexão com a internet. Verifique sua rede.");
    });

    it("retorna network error quando Error nativo mencionar timeout ou AbortError", () => {
      const error1 = new Error("Connection timeout");
      const details1 = getErrorDetails(error1);
      
      expect(details1.type).toBe("network");
      expect(details1.message).toBe("A requisição demorou muito. Tente novamente.");

      const error2 = new Error("Aborted");
      error2.name = "AbortError";
      const details2 = getErrorDetails(error2);
      
      expect(details2.type).toBe("network");
      expect(details2.message).toBe("A requisição demorou muito. Tente novamente.");
    });

    it("retorna generic por fallback se Error for diferente", () => {
      const details = getErrorDetails(new Error("Unknown Something strange"));
      expect(details.type).toBe("generic");
      expect(details.message).toBe("Não foi possível carregar os dados. Tente novamente.");
    });
  });

  describe("getErrorMessage", () => {
    it("deve retornar somente a string property do message retornado", () => {
      const expectedMessage = "Sem conexão com a internet. Verifique sua rede.";
      expect(getErrorMessage(new TypeError("Network request failed"))).toBe(expectedMessage);
    });
  });
});
