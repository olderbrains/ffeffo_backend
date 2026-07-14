"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = getRedisClient;
exports.disconnectRedis = disconnectRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const index_1 = require("./index");
const logger_1 = require("../shared/utils/logger");
let redisClient = null;
function getRedisClient() {
    if (!redisClient) {
        const config = (0, index_1.getConfig)();
        redisClient = new ioredis_1.default(config.REDIS_URL, {
            password: config.REDIS_PASSWORD || undefined,
            maxRetriesPerRequest: 3,
            retryStrategy(times) {
                const delay = Math.min(times * 200, 5000);
                return delay;
            },
            enableReadyCheck: true,
            lazyConnect: false,
        });
        redisClient.on('connect', () => {
            logger_1.logger.info('Redis connected');
        });
        redisClient.on('error', (err) => {
            logger_1.logger.error({ err }, 'Redis connection error');
        });
        redisClient.on('close', () => {
            logger_1.logger.warn('Redis connection closed');
        });
    }
    return redisClient;
}
async function disconnectRedis() {
    if (redisClient) {
        await redisClient.quit();
        redisClient = null;
        logger_1.logger.info('Redis disconnected gracefully');
    }
}
//# sourceMappingURL=redis.js.map