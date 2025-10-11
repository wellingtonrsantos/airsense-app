export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public error: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type ErrorType = "network" | "server" | "generic";

export interface ErrorDetails {
  message: string;
  type: ErrorType;
}

export function getErrorDetails(error: unknown): ErrorDetails {
  if (error instanceof ApiError) {
    if (error.statusCode >= 500) {
      return {
        message: error.message,
        type: "server",
      };
    }
    return {
      message: error.message,
      type: "generic",
    };
  }

  if (
    error instanceof TypeError &&
    error.message === "Network request failed"
  ) {
    return {
      message: "Sem conexão com a internet. Verifique sua rede.",
      type: "network",
    };
  }

  if (error instanceof Error) {
    if (error.message.includes("timeout") || error.name === "AbortError") {
      return {
        message: "A requisição demorou muito. Tente novamente.",
        type: "network",
      };
    }
    if (error.message.includes("Network")) {
      return {
        message: "Erro de conexão. Verifique sua internet.",
        type: "network",
      };
    }
  }

  return {
    message: "Não foi possível carregar os dados. Tente novamente.",
    type: "generic",
  };
}

export function getErrorMessage(error: unknown): string {
  return getErrorDetails(error).message;
}
