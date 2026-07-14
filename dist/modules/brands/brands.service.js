"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandsService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brand_model_1 = require("../../models/brand.model");
const constants_1 = require("../../shared/constants");
const app_error_1 = require("../../shared/errors/app-error");
const cache_1 = require("../../shared/utils/cache");
const pagination_1 = require("../../shared/utils/pagination");
class BrandsService {
    async list(filters) {
        const cacheKey = `brands:list:${filters.page}:${filters.limit}:${filters.isActive ?? ''}:${filters.search ?? ''}`;
        return cache_1.cache.getOrSet(cacheKey, constants_1.CACHE_TTL.BRAND_LIST, async () => {
            const query = {};
            if (filters.isActive !== undefined) {
                query.isActive = filters.isActive;
            }
            if (filters.search) {
                query.name = { $regex: filters.search, $options: 'i' };
            }
            const [items, total] = await Promise.all([
                brand_model_1.Brand.find(query)
                    .sort({ sortOrder: 1, name: 1 })
                    .skip((0, pagination_1.getSkipValue)(filters.page, filters.limit))
                    .limit(filters.limit)
                    .lean(),
                brand_model_1.Brand.countDocuments(query),
            ]);
            return (0, pagination_1.buildPaginatedResponse)(items, total, filters.page, filters.limit);
        });
    }
    async getByIdOrSlug(idOrSlug) {
        const isObjectId = mongoose_1.default.Types.ObjectId.isValid(idOrSlug);
        const brand = await brand_model_1.Brand.findOne(isObjectId ? { _id: idOrSlug } : { slug: idOrSlug }).lean();
        if (!brand)
            throw new app_error_1.NotFoundError('Brand not found');
        return brand;
    }
    async create(data) {
        const existing = await brand_model_1.Brand.findOne({ slug: data.slug });
        if (existing)
            throw new app_error_1.ConflictError('Brand with this slug already exists');
        const brand = await brand_model_1.Brand.create(data);
        await cache_1.cache.invalidatePattern('brands:*');
        return brand.toJSON();
    }
    async update(id, data) {
        const brand = await brand_model_1.Brand.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
        if (!brand)
            throw new app_error_1.NotFoundError('Brand not found');
        await cache_1.cache.invalidatePattern('brands:*');
        return brand;
    }
    async delete(id) {
        const brand = await brand_model_1.Brand.findByIdAndUpdate(id, { isActive: false });
        if (!brand)
            throw new app_error_1.NotFoundError('Brand not found');
        await cache_1.cache.invalidatePattern('brands:*');
    }
}
exports.BrandsService = BrandsService;
//# sourceMappingURL=brands.service.js.map