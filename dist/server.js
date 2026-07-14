"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const database_1 = require("./config/database");
const firebase_1 = require("./config/firebase");
const redis_1 = require("./config/redis");
const rate_limit_middleware_1 = require("./middleware/rate-limit.middleware");
const logger_1 = require("./shared/utils/logger");
async function bootstrap() {
    (0, config_1.loadConfig)();
    const config = (0, config_1.getConfig)();
    (0, rate_limit_middleware_1.initRateLimiters)();
    (0, firebase_1.initializeFirebase)();
    await (0, database_1.connectDatabase)();
    logger_1.logger.info('Database connected');
    const app = (0, app_1.createApp)();
    const server = app.listen(config.PORT, () => {
        logger_1.logger.info({ port: config.PORT, env: config.NODE_ENV }, `Server started on port ${config.PORT}`);
    });
    const gracefulShutdown = async (signal) => {
        logger_1.logger.info({ signal }, 'Received shutdown signal');
        server.close(async () => {
            logger_1.logger.info('HTTP server closed');
            await (0, database_1.disconnectDatabase)();
            await (0, redis_1.disconnectRedis)();
            logger_1.logger.info('All connections closed. Exiting.');
            process.exit(0);
        });
        setTimeout(() => {
            logger_1.logger.error('Forced shutdown after timeout');
            process.exit(1);
        }, 30000);
    };
    process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
    process.on('unhandledRejection', (reason) => {
        logger_1.logger.fatal({ reason }, 'Unhandled rejection');
        process.exit(1);
    });
    process.on('uncaughtException', (error) => {
        logger_1.logger.fatal({ error }, 'Uncaught exception');
        process.exit(1);
    });
}
void bootstrap();
//# sourceMappingURL=server.js.map