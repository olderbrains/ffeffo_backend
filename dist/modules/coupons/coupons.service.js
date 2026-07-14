"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const redis_1 = require("../../config/redis");
const coupon_model_1 = require("../../models/coupon.model");
const app_error_1 = require("../../shared/errors/app-error");
const pagination_1 = require("../../shared/utils/pagination");
class CouponsService {
    async list(filters) {
        const query = {};
        if (filters.status)
            query.status = filters.status;
        if (filters.type)
            query.type = filters.type;
        const [items, total] = await Promise.all([
            coupon_model_1.Coupon.find(query)
                .sort({ createdAt: -1 })
                .skip((0, pagination_1.getSkipValue)(filters.page, filters.limit))
                .limit(filters.limit)
                .lean(),
            coupon_model_1.Coupon.countDocuments(query),
        ]);
        return (0, pagination_1.buildPaginatedResponse)(items, total, filters.page, filters.limit);
    }
    async getById(id) {
        const coupon = await coupon_model_1.Coupon.findById(id).lean();
        if (!coupon)
            throw new app_error_1.NotFoundError('Coupon not found');
        return coupon;
    }
    async create(data, createdBy) {
        const existing = await coupon_model_1.Coupon.findOne({ code: data.code });
        if (existing)
            throw new app_error_1.ConflictError('Coupon code already exists');
        const coupon = await coupon_model_1.Coupon.create({ ...data, createdBy });
        return coupon.toJSON();
    }
    async update(id, data) {
        if (data.code) {
            const existing = await coupon_model_1.Coupon.findOne({ code: data.code, _id: { $ne: id } });
            if (existing)
                throw new app_error_1.ConflictError('Coupon code already exists');
        }
        const coupon = await coupon_model_1.Coupon.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
        if (!coupon)
            throw new app_error_1.NotFoundError('Coupon not found');
        return coupon;
    }
    async deactivate(id) {
        const coupon = await coupon_model_1.Coupon.findByIdAndUpdate(id, { status: 'expired' });
        if (!coupon)
            throw new app_error_1.NotFoundError('Coupon not found');
    }
    async validate(code, orderAmount, userId) {
        const coupon = await coupon_model_1.Coupon.findOne({ code: code.toUpperCase() }).lean();
        if (!coupon)
            throw new app_error_1.NotFoundError('Coupon not found');
        if (coupon.status !== 'active')
            throw new app_error_1.BadRequestError('Coupon is not active');
        const now = new Date();
        if (now < coupon.validFrom)
            throw new app_error_1.BadRequestError('Coupon is not yet valid');
        if (now > coupon.validUntil)
            throw new app_error_1.BadRequestError('Coupon has expired');
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            throw new app_error_1.BadRequestError('Coupon usage limit reached');
        }
        if (orderAmount < coupon.minOrderAmount) {
            throw new app_error_1.BadRequestError(`Minimum order amount is ₹${coupon.minOrderAmount}`);
        }
        if (userId && coupon.usagePerUser > 0) {
            const userUsage = await this.getUserCouponUsage(coupon._id.toString(), userId);
            if (userUsage >= coupon.usagePerUser) {
                throw new app_error_1.BadRequestError('You have already used this coupon the maximum number of times');
            }
        }
        let discount = 0;
        if (coupon.type === 'percentage') {
            discount = Math.round(orderAmount * (coupon.value / 100));
            if (coupon.maxDiscount)
                discount = Math.min(discount, coupon.maxDiscount);
        }
        else if (coupon.type === 'fixed_amount') {
            discount = coupon.value;
        }
        return { valid: true, discount, coupon };
    }
    async recordUsage(couponId, userId) {
        const redis = (0, redis_1.getRedisClient)();
        const key = `coupon_usage:${couponId}:${userId}`;
        await redis.incr(key);
        await redis.expire(key, 365 * 24 * 60 * 60);
        await coupon_model_1.Coupon.findByIdAndUpdate(couponId, { $inc: { usedCount: 1 } });
    }
    async getUserCouponUsage(couponId, userId) {
        const redis = (0, redis_1.getRedisClient)();
        const key = `coupon_usage:${couponId}:${userId}`;
        const count = await redis.get(key);
        return count ? parseInt(count, 10) : 0;
    }
}
exports.CouponsService = CouponsService;
//# sourceMappingURL=coupons.service.js.map