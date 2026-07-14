"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const inventory_controller_1 = require("./inventory.controller");
const router = (0, express_1.Router)();
const controller = new inventory_controller_1.InventoryController();
// Inventory is admin-only.
router.use(auth_middleware_1.authenticate);
router.use(rbac_middleware_1.authorizeAdmin);
router.get('/summary', controller.summary);
router.get('/low-stock', controller.lowStock);
router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.patch('/:id/adjust', controller.adjustStock);
exports.default = router;
//# sourceMappingURL=inventory.routes.js.map