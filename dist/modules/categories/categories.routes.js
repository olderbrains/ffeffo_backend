"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const categories_controller_1 = require("./categories.controller");
const categories_dto_1 = require("./categories.dto");
const router = (0, express_1.Router)();
const controller = new categories_controller_1.CategoriesController();
router.get('/', (0, validation_middleware_1.validate)({ query: categories_dto_1.listCategoriesQueryDto }), controller.list);
router.get('/:idOrSlug', (0, validation_middleware_1.validate)({ params: categories_dto_1.categoryIdOrSlugParamDto }), controller.getByIdOrSlug);
router.post('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, (0, validation_middleware_1.validate)({ body: categories_dto_1.createCategoryDto }), controller.create);
router.patch('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, (0, validation_middleware_1.validate)({ params: categories_dto_1.categoryIdParamDto, body: categories_dto_1.updateCategoryDto }), controller.update);
router.delete('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, (0, validation_middleware_1.validate)({ params: categories_dto_1.categoryIdParamDto }), controller.delete);
exports.default = router;
//# sourceMappingURL=categories.routes.js.map