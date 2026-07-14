"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrandDto = exports.createBrandDto = void 0;
const zod_1 = require("zod");
exports.createBrandDto = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    slug: zod_1.z.string().min(1).max(120),
    description: zod_1.z.string().max(500).optional(),
    logo: zod_1.z.string().optional(),
    website: zod_1.z.string().url().optional(),
    isActive: zod_1.z.boolean().default(true),
    sortOrder: zod_1.z.number().int().min(0).default(0),
});
exports.updateBrandDto = exports.createBrandDto.partial();
//# sourceMappingURL=brands.dto.js.map