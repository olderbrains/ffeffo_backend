"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCAL_UPLOADS_DIR = exports.UploadsService = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const aws_1 = require("../../config/aws");
const config_1 = require("../../config");
const errors_1 = require("../../shared/errors");
const logger_1 = require("../../shared/utils/logger");
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const LOCAL_DIR = path_1.default.resolve(process.cwd(), 'uploads');
class UploadsService {
    /**
     * Optimizes an image (resize + webp) and stores it via the configured driver.
     * @param publicBaseUrl base URL used to build the returned URL for the local driver
     */
    async storeImage(file, folder, publicBaseUrl) {
        if (!ALLOWED_MIME.has(file.mimetype)) {
            throw new errors_1.BadRequestError('Unsupported image type. Use JPEG, PNG, WEBP, or AVIF.');
        }
        const optimized = await (0, sharp_1.default)(file.buffer)
            .rotate()
            .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 82 })
            .toBuffer();
        const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, '').replace(/^\/+|\/+$/g, '') || 'misc';
        const key = `${safeFolder}/${(0, uuid_1.v4)()}.webp`;
        const config = (0, config_1.getConfig)();
        if (config.STORAGE_DRIVER === 's3') {
            await (0, aws_1.getS3Client)().send(new client_s3_1.PutObjectCommand({
                Bucket: config.S3_BUCKET,
                Key: key,
                Body: optimized,
                ContentType: 'image/webp',
                CacheControl: 'public, max-age=31536000, immutable',
            }));
            const base = config.CDN_BASE_URL ?? `https://${config.S3_BUCKET}.s3.${config.AWS_REGION}.amazonaws.com`;
            return { url: `${base.replace(/\/+$/, '')}/${key}`, key };
        }
        // Local driver: write to disk; served statically by the app at /uploads.
        const destPath = path_1.default.join(LOCAL_DIR, key);
        await fs_1.promises.mkdir(path_1.default.dirname(destPath), { recursive: true });
        await fs_1.promises.writeFile(destPath, optimized);
        logger_1.logger.debug({ key }, 'Stored image on local disk');
        return { url: `${publicBaseUrl.replace(/\/+$/, '')}/uploads/${key}`, key };
    }
}
exports.UploadsService = UploadsService;
exports.LOCAL_UPLOADS_DIR = LOCAL_DIR;
//# sourceMappingURL=uploads.service.js.map