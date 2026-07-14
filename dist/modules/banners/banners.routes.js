"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const banners_controller_1 = require("./banners.controller");
const banners_dto_1 = require("./banners.dto");
const router = (0, express_1.Router)();
const controller = new banners_controller_1.BannersController();
// Public: storefront hero banners (active + date-filtered)
router.get('/', controller.list);
// Admin: all banners (no date filter)
router.get('/admin', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.adminList);
// Admin: single banner by ID
router.get('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.getById);
// Admin: create banner
router.post('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, (0, validation_middleware_1.validate)({ body: banners_dto_1.createBannerDto }), controller.create);
// Admin: update banner
router.patch('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, (0, validation_middleware_1.validate)({ body: banners_dto_1.updateBannerDto }), controller.update);
// Admin: delete banner
router.delete('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.delete);
exports.default = router;
//# sourceMappingURL=banners.routes.js.map