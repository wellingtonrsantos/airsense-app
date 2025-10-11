export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class PermissionError extends AppError {
  constructor(message = "A permissão foi negada pelo usuário.") {
    super(message);
  }
}
