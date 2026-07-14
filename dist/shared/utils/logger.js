"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
exports.logger = (0, pino_1.default)({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development'
        ? { target: 'pino/file', options: { destination: 1 } }
        : undefined,
    formatters: {
        level(label) {
            return { level: label };
        },
    },
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
    redact: ['req.headers.authorization', 'req.headers.cookie', 'body.password'],
});
//# sourceMappingURL=logger.js.map