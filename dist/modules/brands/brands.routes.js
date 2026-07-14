"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const brands_controller_1 = require("./brands.controller");
const router = (0, express_1.Router)();
const controller = new brands_controller_1.BrandsController();
router.get('/', controller.list);
router.get('/:idOrSlug', controller.getOne);
router.post('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.create);
router.patch('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.update);
router.delete('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.delete);
exports.default = router;
//# sourceMappingURL=brands.routes.js.map