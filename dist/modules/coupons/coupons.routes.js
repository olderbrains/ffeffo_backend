"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const coupons_controller_1 = require("./coupons.controller");
const router = (0, express_1.Router)();
const controller = new coupons_controller_1.CouponsController();
// Authenticated customers validate coupons at checkout.
router.post('/validate', auth_middleware_1.authenticate, controller.validate);
// Coupon management is admin-only.
router.get('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.list);
router.get('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.getOne);
router.post('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.create);
router.patch('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.update);
router.delete('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.delete);
exports.default = router;
//# sourceMappingURL=coupons.routes.js.map