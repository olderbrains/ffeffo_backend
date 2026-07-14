"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
require("express-async-errors");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const pino_http_1 = __importDefault(require("pino-http"));
const config_1 = require("./config");
const error_middleware_1 = require("./middleware/error.middleware");
const rate_limit_middleware_1 = require("./middleware/rate-limit.middleware");
const request_id_middleware_1 = require("./middleware/request-id.middleware");
const analytics_routes_1 = __importDefault(require("./modules/analytics/analytics.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const banners_routes_1 = __importDefault(require("./modules/banners/banners.routes"));
const brands_routes_1 = __importDefault(require("./modules/brands/brands.routes"));
const categories_routes_1 = __importDefault(require("./modules/categories/categories.routes"));
const coupons_routes_1 = __importDefault(require("./modules/coupons/coupons.routes"));
const health_routes_1 = __importDefault(require("./modules/health/health.routes"));
const inventory_routes_1 = __importDefault(require("./modules/inventory/inventory.routes"));
const newsletter_routes_1 = __importDefault(require("./modules/newsletter/newsletter.routes"));
const search_routes_1 = __importDefault(require("./modules/search/search.routes"));
const orders_routes_1 = __importDefault(require("./modules/orders/orders.routes"));
const products_routes_1 = __importDefault(require("./modules/products/products.routes"));
const uploads_routes_1 = __importDefault(require("./modules/uploads/uploads.routes"));
const uploads_service_1 = require("./modules/uploads/uploads.service");
const settings_routes_1 = __importDefault(require("./modules/settings/settings.routes"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const logger_1 = require("./shared/utils/logger");
function createApp() {
    const app = (0, express_1.default)();
    const config = (0, config_1.getConfig)();
    app.set('trust proxy', 1);
    app.use(request_id_middleware_1.requestId);
    app.use((0, pino_http_1.default)({
        logger: logger_1.logger,
        autoLogging: {
            ignore: (req) => req.url === '/api/v1/health' || req.url === '/api/v1/health/live',
        },
    }));
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
    app.use((0, cors_1.default)({
        origin: config.CORS_ORIGINS,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
    }));
    app.use((0, compression_1.default)());
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cookie_parser_1.default)());
    const apiPrefix = `/api/${config.API_VERSION}`;
    app.use(`${apiPrefix}/health`, health_routes_1.default);
    // Serve locally-stored uploads (dev STORAGE_DRIVER=local). In production,
    // assets are served from S3/CloudFront so this is a no-op.
    if (config.STORAGE_DRIVER === 'local') {
        app.use('/uploads', express_1.default.static(uploads_service_1.LOCAL_UPLOADS_DIR, {
            maxAge: '1y',
            immutable: true,
            fallthrough: false,
        }));
    }
    app.use(rate_limit_middleware_1.apiRateLimiter);
    app.use(`${apiPrefix}/auth`, auth_routes_1.default);
    app.use(`${apiPrefix}/users`, users_routes_1.default);
    app.use(`${apiPrefix}/products`, products_routes_1.default);
    app.use(`${apiPrefix}/uploads`, uploads_routes_1.default);
    app.use(`${apiPrefix}/categories`, categories_routes_1.default);
    app.use(`${apiPrefix}/banners`, banners_routes_1.default);
    app.use(`${apiPrefix}/brands`, brands_routes_1.default);
    app.use(`${apiPrefix}/orders`, orders_routes_1.default);
    app.use(`${apiPrefix}/inventory`, inventory_routes_1.default);
    app.use(`${apiPrefix}/coupons`, coupons_routes_1.default);
    app.use(`${apiPrefix}/analytics`, analytics_routes_1.default);
    app.use(`${apiPrefix}/newsletter`, newsletter_routes_1.default);
    app.use(`${apiPrefix}/search`, search_routes_1.default);
    app.use(`${apiPrefix}/settings`, settings_routes_1.default);
    app.use(error_middleware_1.errorMiddleware);
    return app;
}
//# sourceMappingURL=app.js.map