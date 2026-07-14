"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const redis_1 = require("../../config/redis");
const logger_1 = require("./logger");
exports.cache = {
    async getOrSet(key, ttlSeconds, fetchFn) {
        try {
            const redis = (0, redis_1.getRedisClient)();
            const cached = await redis.get(key);
            if (cached) {
                return JSON.parse(cached);
            }
        }
        catch {
            // Redis down — fall through to DB
        }
        const data = await fetchFn();
        try {
            const redis = (0, redis_1.getRedisClient)();
            await redis.set(key, JSON.stringify(data), 'EX', ttlSeconds);
        }
        catch {
            logger_1.logger.warn({ key }, 'Cache write failed');
        }
        return data;
    },
    async invalidate(key) {
        try {
            const redis = (0, redis_1.getRedisClient)();
            await redis.del(key);
        }
        catch {
            // non-critical
        }
    },
    async invalidatePattern(pattern) {
        try {
            const redis = (0, redis_1.getRedisClient)();
            let cursor = '0';
            do {
                const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
                cursor = nextCursor;
                if (keys.length > 0) {
                    await redis.del(...keys);
                }
            } while (cursor !== '0');
        }
        catch {
            // non-critical
        }
    },
};
//# sourceMappingURL=cache.js.map