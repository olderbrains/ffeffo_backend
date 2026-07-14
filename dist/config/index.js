"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
exports.getConfig = getConfig;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'staging', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().default(5000),
    API_VERSION: zod_1.z.string().default('v1'),
    CORS_ORIGINS: zod_1.z.string().transform((val) => val.split(',')),
    MONGODB_URI: zod_1.z.string().min(1),
    MONGODB_DB_NAME: zod_1.z.string().default('speffo'),
    REDIS_URL: zod_1.z.string().default('redis://localhost:6379'),
    REDIS_PASSWORD: zod_1.z.string().optional(),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32),
    JWT_ACCESS_EXPIRY: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRY: zod_1.z.string().default('7d'),
    FIREBASE_PROJECT_ID: zod_1.z.string().default('speffo-dev'),
    FIREBASE_PRIVATE_KEY: zod_1.z.string().default('dev-key').transform((val) => val.replace(/\\n/g, '\n')),
    FIREBASE_CLIENT_EMAIL: zod_1.z.string().email().default('firebase@speffo-dev.iam.gserviceaccount.com'),
    RAZORPAY_KEY_ID: zod_1.z.string().default('rzp_test_dev'),
    RAZORPAY_KEY_SECRET: zod_1.z.string().default('dev-secret'),
    RAZORPAY_WEBHOOK_SECRET: zod_1.z.string().default('dev-webhook-secret'),
    AWS_REGION: zod_1.z.string().default('ap-south-1'),
    AWS_ACCESS_KEY_ID: zod_1.z.string().default('dev-access-key'),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string().default('dev-secret-key'),
    S3_BUCKET: zod_1.z.string().default('speffo-assets'),
    // Storage driver for uploaded media. 'local' writes to disk (dev default);
    // 's3' uploads to S3_BUCKET and serves via CDN_BASE_URL.
    STORAGE_DRIVER: zod_1.z.enum(['local', 's3']).default('local'),
    CDN_BASE_URL: zod_1.z.string().url().optional(),
    SQS_EMAIL_QUEUE_URL: zod_1.z.string().url().optional(),
    SQS_IMAGE_QUEUE_URL: zod_1.z.string().url().optional(),
    SQS_SEARCH_QUEUE_URL: zod_1.z.string().url().optional(),
    SQS_INVOICE_QUEUE_URL: zod_1.z.string().url().optional(),
    SQS_WEBHOOK_QUEUE_URL: zod_1.z.string().url().optional(),
    EVENTBRIDGE_BUS_NAME: zod_1.z.string().default('speffo-events'),
    OPENSEARCH_ENDPOINT: zod_1.z.string().optional(),
    OPENSEARCH_USERNAME: zod_1.z.string().optional(),
    OPENSEARCH_PASSWORD: zod_1.z.string().optional(),
    SES_FROM_EMAIL: zod_1.z.string().email().default('noreply@speffo.com'),
    SES_REGION: zod_1.z.string().default('ap-south-1'),
    SHIPROCKET_EMAIL: zod_1.z.string().optional(),
    SHIPROCKET_PASSWORD: zod_1.z.string().optional(),
    SHIPROCKET_API_URL: zod_1.z.string().optional(),
    RATE_LIMIT_WINDOW_MS: zod_1.z.coerce.number().default(60000),
    RATE_LIMIT_MAX_REQUESTS: zod_1.z.coerce.number().default(100),
    LOG_LEVEL: zod_1.z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});
let config;
function loadConfig() {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        const formatted = result.error.format();
        const missing = Object.entries(formatted)
            .filter(([key, val]) => key !== '_errors' && val && typeof val === 'object' && '_errors' in val)
            .map(([key, val]) => `  ${key}: ${val._errors.join(', ')}`)
            .join('\n');
        throw new Error(`Environment validation failed:\n${missing}`);
    }
    config = result.data;
    return config;
}
function getConfig() {
    if (!config) {
        throw new Error('Config not loaded. Call loadConfig() first.');
    }
    return config;
}
//# sourceMappingURL=index.js.map