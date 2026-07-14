"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryIdOrSlugParamDto = exports.categoryIdParamDto = exports.listCategoriesQueryDto = exports.updateCategoryDto = exports.createCategoryDto = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../../shared/utils/pagination");
exports.createCategoryDto = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(100),
    slug: zod_1.z.string().min(1, 'Slug is required').max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
    description: zod_1.z.string().max(500).optional(),
    image: zod_1.z.string().url('Image must be a valid URL').optional(),
    parentId: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid parent category ID').optional().nullable(),
    sortOrder: zod_1.z.number().int().min(0).default(0),
    isActive: zod_1.z.boolean().default(true),
    seo: zod_1.z.object({
        title: zod_1.z.string().max(70).optional(),
        description: zod_1.z.string().max(160).optional(),
        keywords: zod_1.z.array(zod_1.z.string().max(50)).max(20).optional(),
    }).optional(),
});
exports.updateCategoryDto = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    slug: zod_1.z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens').optional(),
    description: zod_1.z.string().max(500).optional().nullable(),
    image: zod_1.z.string().url('Image must be a valid URL').optional().nullable(),
    parentId: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid parent category ID').optional().nullable(),
    sortOrder: zod_1.z.number().int().min(0).optional(),
    isActive: zod_1.z.boolean().optional(),
    seo: zod_1.z.object({
        title: zod_1.z.string().max(70).optional().nullable(),
        description: zod_1.z.string().max(160).optional().nullable(),
        keywords: zod_1.z.array(zod_1.z.string().max(50)).max(20).optional(),
    }).optional(),
});
exports.listCategoriesQueryDto = pagination_1.paginationSchema.extend({
    parentId: zod_1.z.string().regex(/^[a-f\d]{24}$/i).optional().nullable(),
    isActive: zod_1.z.enum(['true', 'false']).optional().transform((val) => {
        if (val === 'true')
            return true;
        if (val === 'false')
            return false;
        return undefined;
    }),
    level: zod_1.z.coerce.number().int().min(0).optional(),
    tree: zod_1.z.enum(['true', 'false']).optional().transform((val) => val === 'true'),
});
exports.categoryIdParamDto = zod_1.z.object({
    id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid category ID'),
});
exports.categoryIdOrSlugParamDto = zod_1.z.object({
    idOrSlug: zod_1.z.string().min(1, 'Category ID or slug is required'),
});
//# sourceMappingURL=categories.dto.js.map