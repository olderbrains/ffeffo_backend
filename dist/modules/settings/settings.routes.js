"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const settings_controller_1 = require("./settings.controller");

const router = (0, express_1.Router)();
const controller = new settings_controller_1.SettingsController();

router.get('/', controller.list);
router.get('/:key', controller.get);
router.put('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.upsert);
router.put('/bulk', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, controller.bulkUpsert);

exports.default = router;
