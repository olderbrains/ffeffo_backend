"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantIdParamDto = exports.updateVariantDto = exports.createVariantDto = exports.productIdOrSlugParamDto = exports.productIdParamDto = exports.listProductsQueryDto = exports.updateProductDto = exports.createProductDto = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../../shared/utils/pagination");
const objectIdRegex = /^[a-f\d]{24}$/i;
const objectId = zod_1.z.string().regex(objectIdRegex, 'Invalid ObjectId');
const productImageSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    alt: zod_1.z.string().max(200).optional(),
    sortOrder: zod_1.z.number().int().min(0).default(0),
    isDefault: zod_1.z.boolean().default(false),
});
const productAttributeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    value: zod_1.z.string().min(1).max(500),
});
const seoSchema = zod_1.z.object({
    title: zod_1.z.string().max(200).optional(),
    description: zod_1.z.string().max(500).optional(),
    keywords: zod_1.z.array(zod_1.z.string().max(50)).max(20).optional(),
});
exports.createProductDto = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).trim(),
    slug: zod_1.z
        .string()
        .min(1)
        .max(250)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
        .optional(),
    description: zod_1.z.string().min(1),
    shortDescription: zod_1.z.string().max(300).optional(),
    categoryId: objectId,
    brandId: objectId.optional(),
    images: zod_1.z.array(productImageSchema).default([]),
    videos: zod_1.z.array(zod_1.z.string().url()).default([]),
    attributes: zod_1.z.array(productAttributeSchema).default([]),
    variantAttributes: zod_1.z.array(zod_1.z.string().min(1)).default([]),
    tags: zod_1.z.array(zod_1.z.string().min(1).max(50)).default([]),
    status: zod_1.z.enum(['draft', 'active', 'archived']).default('draft'),
    basePrice: zod_1.z.number().min(0),
    salePrice: zod_1.z.number().min(0).optional(),
    hasVariants: zod_1.z.boolean().default(false),
    seo: seoSchema.optional(),
    isFeatured: zod_1.z.boolean().default(false),
});
exports.updateProductDto = exports.createProductDto.partial();
exports.listProductsQueryDto = pagination_1.paginationSchema.extend({
    categoryId: objectId.optional(),
    brandId: objectId.optional(),
    status: zod_1.z.enum(['draft', 'active', 'archived']).optional(),
    search: zod_1.z.string().max(200).optional(),
    minPrice: zod_1.z.coerce.number().min(0).optional(),
    maxPrice: zod_1.z.coerce.number().min(0).optional(),
    isFeatured: zod_1.z
        .enum(['true', 'false'])
        .transform((val) => val === 'true')
        .optional(),
    includeColors: zod_1.z
        .enum(['true', 'false'])
        .transform((val) => val === 'true')
        .optional(),
    sortBy: zod_1.z
        .enum(['createdAt', 'basePrice', 'name', 'ratings.average', 'metadata.purchases'])
        .default('createdAt'),
});
exports.productIdParamDto = zod_1.z.object({
    id: objectId,
});
exports.productIdOrSlugParamDto = zod_1.z.object({
    idOrSlug: zod_1.z.string().min(1),
});
const variantAttributeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    value: zod_1.z.string().min(1).max(500),
});
const dimensionsSchema = zod_1.z.object({
    length: zod_1.z.number().min(0),
    width: zod_1.z.number().min(0),
    height: zod_1.z.number().min(0),
});
exports.createVariantDto = zod_1.z.object({
    sku: zod_1.z.string().min(1).max(50).trim(),
    barcode: zod_1.z.string().max(50).optional(),
    attributes: zod_1.z.array(variantAttributeSchema).min(1),
    price: zod_1.z.number().min(0),
    salePrice: zod_1.z.number().min(0).optional(),
    costPrice: zod_1.z.number().min(0).optional(),
    stock: zod_1.z.number().int().min(0).default(0),
    weight: zod_1.z.number().min(0).optional(),
    dimensions: dimensionsSchema.optional(),
    images: zod_1.z.array(zod_1.z.string().url()).default([]),
    isActive: zod_1.z.boolean().default(true),
    sortOrder: zod_1.z.number().int().min(0).default(0),
});
exports.updateVariantDto = exports.createVariantDto.partial().omit({ sku: true });
exports.variantIdParamDto = zod_1.z.object({
    id: objectId,
    variantId: objectId,
});
//# sourceMappingURL=products.dto.js.map