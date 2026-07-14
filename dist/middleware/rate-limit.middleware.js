"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictRateLimiter = exports.apiRateLimiter = exports.authRateLimiter = void 0;
exports.createRateLimiter = createRateLimiter;
exports.initRateLimiters = initRateLimiters;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = require("rate-limit-redis");
const redis_1 = require("../config/redis");
function createRateLimiter(windowMs, max) {
    const redis = (0, redis_1.getRedisClient)();
    return (0, express_rate_limit_1.default)({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        store: new rate_limit_redis_1.RedisStore({
            sendCommand: (...args) => redis.call(...args),
            prefix: 'rl:',
        }),
        message: {
            success: false,
            error: {
                code: 'RATE_LIMITED',
                message: 'Too many requests, please try again later',
            },
        },
        keyGenerator: (req) => {
            return req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
        },
    });
}
// Placeholders — replaced by initRateLimiters() after loadConfig() runs in server.ts
let _authRateLimiter = (_req, _res, next) => next();
let _apiRateLimiter = (_req, _res, next) => next();
let _strictRateLimiter = (_req, _res, next) => next();
function initRateLimiters() {
    _authRateLimiter = createRateLimiter(15 * 60 * 1000, 20);
    _apiRateLimiter = createRateLimiter(60 * 1000, 100);
    _strictRateLimiter = createRateLimiter(60 * 1000, 10);
}
const authRateLimiter = (req, res, next) => _authRateLimiter(req, res, next);
exports.authRateLimiter = authRateLimiter;
const apiRateLimiter = (req, res, next) => _apiRateLimiter(req, res, next);
exports.apiRateLimiter = apiRateLimiter;
const strictRateLimiter = (req, res, next) => _strictRateLimiter(req, res, next);
exports.strictRateLimiter = strictRateLimiter;
//# sourceMappingURL=rate-limit.middleware.js.map