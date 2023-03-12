export class AppError extends Error {
  statusCode: number;
  success: boolean;
  message: string;
  _errors: any;

  constructor(
    message: string, 
    statusCode: number,
     _errors?: any
  ) {
    super()

    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this._errors = _errors

    Error.captureStackTrace(this, this.constructor);
  }
}
