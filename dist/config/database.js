"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./index");
const logger_1 = require("../shared/utils/logger");
async function connectDatabase() {
    const config = (0, index_1.getConfig)();
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connection.on('connected', () => {
        logger_1.logger.info('MongoDB connected');
    });
    mongoose_1.default.connection.on('error', (err) => {
        logger_1.logger.error({ err }, 'MongoDB connection error');
    });
    mongoose_1.default.connection.on('disconnected', () => {
        logger_1.logger.warn('MongoDB disconnected');
    });
    await mongoose_1.default.connect(config.MONGODB_URI, {
        dbName: config.MONGODB_DB_NAME,
        maxPoolSize: 50,
        minPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: 'majority',
    });
}
async function disconnectDatabase() {
    await mongoose_1.default.disconnect();
    logger_1.logger.info('MongoDB disconnected gracefully');
}
//# sourceMappingURL=database.js.map