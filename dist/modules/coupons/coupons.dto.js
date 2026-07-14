"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCouponDto = exports.updateCouponDto = exports.createCouponDto = exports.listCouponsQueryDto = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../../shared/utils/pagination");
exports.listCouponsQueryDto = pagination_1.paginationSchema.extend({
    status: zod_1.z.enum(['active', 'inactive', 'expired']).optional(),
    type: zod_1.z.enum(['percentage', 'fixed_amount', 'free_shipping']).optional(),
});
exports.createCouponDto = zod_1.z.object({
    code: zod_1.z.string().min(3).max(30).transform((v) => v.toUpperCase()),
    description: zod_1.z.string().min(1).max(500),
    type: zod_1.z.enum(['percentage', 'fixed_amount', 'free_shipping']),
    value: zod_1.z.number().min(0),
    minOrderAmount: zod_1.z.number().min(0).default(0),
    maxDiscount: zod_1.z.number().min(0).optional(),
    applicableTo: zod_1.z.object({
        type: zod_1.z.enum(['all', 'categories', 'products', 'brands']).default('all'),
        ids: zod_1.z.array(zod_1.z.string()).default([]),
    }).default({ type: 'all', ids: [] }),
    usageLimit: zod_1.z.number().int().min(1).optional(),
    usagePerUser: zod_1.z.number().int().min(1).default(1),
    validFrom: zod_1.z.string().transform((v) => new Date(v)),
    validUntil: zod_1.z.string().transform((v) => new Date(v)),
    status: zod_1.z.enum(['active', 'inactive']).default('active'),
});
exports.updateCouponDto = exports.createCouponDto.partial();
exports.validateCouponDto = zod_1.z.object({
    code: zod_1.z.string().min(1),
    orderAmount: zod_1.z.number().min(0),
});
//# sourceMappingURL=coupons.dto.js.map