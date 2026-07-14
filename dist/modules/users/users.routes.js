"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const users_controller_1 = require("./users.controller");
const users_dto_1 = require("./users.dto");
const router = (0, express_1.Router)();
const controller = new users_controller_1.UsersController();
// Admin endpoints — list users
router.get('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, (0, validation_middleware_1.validate)({ query: users_dto_1.listUsersQueryDto }), controller.list);
// Self-service profile endpoints (must be above /:id to avoid route capture)
router.get('/me', auth_middleware_1.authenticate, controller.getProfile);
router.patch('/me', auth_middleware_1.authenticate, (0, validation_middleware_1.validate)({ body: users_dto_1.updateProfileDto }), controller.updateProfile);
router.delete('/me', auth_middleware_1.authenticate, controller.deactivateAccount);
// Admin endpoint — get user by ID
router.get('/:id', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, (0, validation_middleware_1.validate)({ params: users_dto_1.userIdParamDto }), controller.getById);
exports.default = router;
//# sourceMappingURL=users.routes.js.map