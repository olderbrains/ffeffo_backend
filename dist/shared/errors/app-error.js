"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.TooManyRequestsError = exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    code;
    constructor(message, statusCode, code, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = 'Bad request', code = 'BAD_REQUEST') {
        super(message, 400, code);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', code = 'UNAUTHORIZED') {
        super(message, 401, code);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', code = 'FORBIDDEN') {
        super(message, 403, code);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found', code = 'NOT_FOUND') {
        super(message, 404, code);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = 'Conflict', code = 'CONFLICT') {
        super(message, 409, code);
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends AppError {
    errors;
    constructor(errors, message = 'Validation failed') {
        super(message, 422, 'VALIDATION_ERROR');
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class TooManyRequestsError extends AppError {
    constructor(message = 'Too many requests', code = 'RATE_LIMITED') {
        super(message, 429, code);
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
class InternalError extends AppError {
    constructor(message = 'Internal server error', code = 'INTERNAL_ERROR') {
        super(message, 500, code, false);
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=app-error.js.map