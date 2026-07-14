"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const analytics_controller_1 = require("./analytics.controller");
const router = (0, express_1.Router)();
const controller = new analytics_controller_1.AnalyticsController();
// Analytics is admin-only.
router.use(auth_middleware_1.authenticate);
router.use(rbac_middleware_1.authorizeAdmin);
router.get('/dashboard', controller.dashboard);
router.get('/revenue', controller.revenue);
router.get('/orders', controller.orderStats);
router.get('/top-products', controller.topProducts);
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map