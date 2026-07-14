"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannersService = void 0;
const banner_model_1 = require("../../models/banner.model");
const app_error_1 = require("../../shared/errors/app-error");
const pagination_1 = require("../../shared/utils/pagination");
class BannersService {
    async list(filters) {
        const query = {};
        if (filters.position) {
            query.position = filters.position;
        }
        if (filters.status) {
            query.status = filters.status;
        }
        if (filters.publicOnly) {
            const now = new Date();
            query.status = 'active';
            query.startDate = { $lte: now };
            query.endDate = { $gte: now };
        }
        const [items, total] = await Promise.all([
            banner_model_1.Banner.find(query)
                .sort({ priority: -1, createdAt: -1 })
                .skip((0, pagination_1.getSkipValue)(filters.page, filters.limit))
                .limit(filters.limit)
                .lean(),
            banner_model_1.Banner.countDocuments(query),
        ]);
        return (0, pagination_1.buildPaginatedResponse)(items, total, filters.page, filters.limit);
    }
    async getById(id) {
        const banner = await banner_model_1.Banner.findById(id).lean();
        if (!banner)
            throw new app_error_1.NotFoundError('Banner not found');
        return banner;
    }
    async create(data) {
        const banner = await banner_model_1.Banner.create(data);
        return banner.toJSON();
    }
    async update(id, data) {
        const banner = await banner_model_1.Banner.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
        if (!banner)
            throw new app_error_1.NotFoundError('Banner not found');
        return banner;
    }
    async delete(id) {
        const banner = await banner_model_1.Banner.findByIdAndDelete(id);
        if (!banner)
            throw new app_error_1.NotFoundError('Banner not found');
    }
}
exports.BannersService = BannersService;
//# sourceMappingURL=banners.service.js.map