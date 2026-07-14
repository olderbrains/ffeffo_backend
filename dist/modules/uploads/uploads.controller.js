"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsController = void 0;
const errors_1 = require("../../shared/errors");
const uploads_service_1 = require("./uploads.service");
const ALLOWED_FOLDERS = new Set(['products', 'brands', 'categories', 'cms', 'banners']);
class UploadsController {
    service;
    constructor() {
        this.service = new uploads_service_1.UploadsService();
    }
    uploadImage = async (req, res) => {
        const file = req.file;
        if (!file) {
            throw new errors_1.BadRequestError('No file provided. Send multipart/form-data with a "file" field.');
        }
        const folderInput = typeof req.body?.folder === 'string' ? req.body.folder : 'products';
        const folder = ALLOWED_FOLDERS.has(folderInput) ? folderInput : 'products';
        const publicBaseUrl = `${req.protocol}://${req.get('host')}`;
        const result = await this.service.storeImage({ buffer: file.buffer, mimetype: file.mimetype }, folder, publicBaseUrl);
        res.status(201).json({ success: true, data: result });
    };
}
exports.UploadsController = UploadsController;
//# sourceMappingURL=uploads.controller.js.map