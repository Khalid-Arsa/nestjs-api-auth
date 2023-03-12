"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, _errors) {
        super();
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this._errors = _errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=index.js.map