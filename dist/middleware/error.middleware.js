"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const errors_1 = require("../shared/errors");
const logger_1 = require("../shared/utils/logger");
function errorMiddleware(err, _req, res, _next) {
    if (err instanceof errors_1.AppError) {
        const response = {
            success: false,
            error: {
                code: err.code,
                message: err.message,
            },
        };
        if (err instanceof errors_1.ValidationError) {
            response.error.errors = err.errors;
        }
        if (!err.isOperational) {
            logger_1.logger.error({ err, stack: err.stack }, 'Unexpected application error');
        }
        res.status(err.statusCode).json(response);
        return;
    }
    if (err instanceof zod_1.ZodError) {
        const errors = {};
        for (const issue of err.issues) {
            const path = issue.path.join('.');
            if (!errors[path]) {
                errors[path] = [];
            }
            errors[path].push(issue.message);
        }
        res.status(422).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Validation failed',
                errors,
            },
        });
        return;
    }
    if (err instanceof mongoose_1.default.Error.CastError) {
        res.status(400).json({
            success: false,
            error: {
                code: 'INVALID_IDENTIFIER',
                message: `Invalid value for '${err.path}'`,
            },
        });
        return;
    }
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const errors = {};
        for (const [path, fieldError] of Object.entries(err.errors)) {
            errors[path] = [fieldError.message];
        }
        res.status(422).json({
            success: false,
            error: { code: 'VALIDATION_ERROR', message: 'Validation failed', errors },
        });
        return;
    }
    if (err.name === 'MulterError' || err.message === 'Only image uploads are allowed') {
        const isSize = err.code === 'LIMIT_FILE_SIZE';
        res.status(400).json({
            success: false,
            error: {
                code: isSize ? 'FILE_TOO_LARGE' : 'INVALID_UPLOAD',
                message: isSize ? 'File exceeds the 5 MB limit' : err.message,
            },
        });
        return;
    }
    if (err.code === 11000) {
        const keyValue = err.keyValue ?? {};
        const field = Object.keys(keyValue)[0] ?? 'field';
        res.status(409).json({
            success: false,
            error: {
                code: 'DUPLICATE_KEY',
                message: `A record with this ${field} already exists`,
            },
        });
        return;
    }
    logger_1.logger.error({ err, stack: err.stack }, 'Unhandled error');
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        },
    });
}
//# sourceMappingURL=error.middleware.js.map