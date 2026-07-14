"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const orders_controller_1 = require("./orders.controller");
const router = (0, express_1.Router)();
const controller = new orders_controller_1.OrdersController();
// Customer routes — any authenticated user
router.post('/', auth_middleware_1.authenticate, controller.create);
router.get('/my', auth_middleware_1.authenticate, controller.myOrders);
router.get('/my/:id', auth_middleware_1.authenticate, controller.myOrderDetail);
// Admin routes
router.get('/stats', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.stats);
router.get('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.list);
router.get('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.getOne);
router.patch('/:id/status', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.updateStatus);
router.post('/:id/cancel', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.cancel);
exports.default = router;
//# sourceMappingURL=orders.routes.js.map