"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const uploads_controller_1 = require("./uploads.controller");
const router = (0, express_1.Router)();
const controller = new uploads_controller_1.UploadsController();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image uploads are allowed'));
        }
    },
});
// Image uploads are admin-only.
router.post('/image', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, upload.single('file'), controller.uploadImage);
exports.default = router;
//# sourceMappingURL=uploads.routes.js.map