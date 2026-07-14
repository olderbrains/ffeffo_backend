"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rate_limit_middleware_1 = require("../../middleware/rate-limit.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const auth_controller_1 = require("./auth.controller");
const auth_dto_1 = require("./auth.dto");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
// Development-only login shortcut (also hard-gated inside the service).
// The route is not even registered outside development.
if (process.env.NODE_ENV === 'development') {
    router.post('/dev-login', rate_limit_middleware_1.authRateLimiter, (0, validation_middleware_1.validate)({ body: auth_dto_1.devLoginDto }), controller.devLogin);
}
router.post('/register', rate_limit_middleware_1.authRateLimiter, (0, validation_middleware_1.validate)({ body: auth_dto_1.registerDto }), controller.register);
router.post('/login', rate_limit_middleware_1.authRateLimiter, (0, validation_middleware_1.validate)({ body: auth_dto_1.loginDto }), controller.login);
router.post('/refresh', rate_limit_middleware_1.authRateLimiter, (0, validation_middleware_1.validate)({ body: auth_dto_1.refreshTokenDto }), controller.refresh);
router.post('/logout', auth_middleware_1.authenticate, controller.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map