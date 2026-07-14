"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = require("../../config/redis");
class HealthController {
    health = (_req, res) => {
        res.status(200).json({
            success: true,
            data: {
                status: 'ok',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            },
        });
    };
    ready = async (_req, res) => {
        const checks = {};
        // MongoDB check
        try {
            const mongoState = mongoose_1.default.connection.readyState;
            checks.mongodb = mongoState === 1 ? 'connected' : 'disconnected';
        }
        catch {
            checks.mongodb = 'error';
        }
        // Redis check
        try {
            const redis = (0, redis_1.getRedisClient)();
            await redis.ping();
            checks.redis = 'connected';
        }
        catch {
            checks.redis = 'error';
        }
        const allHealthy = Object.values(checks).every((s) => s === 'connected');
        res.status(allHealthy ? 200 : 503).json({
            success: allHealthy,
            data: {
                status: allHealthy ? 'ready' : 'degraded',
                checks,
                timestamp: new Date().toISOString(),
            },
        });
    };
    live = (_req, res) => {
        res.status(200).json({
            success: true,
            data: {
                status: 'alive',
                timestamp: new Date().toISOString(),
            },
        });
    };
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map