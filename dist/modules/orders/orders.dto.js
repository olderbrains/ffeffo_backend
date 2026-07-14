"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrderDto = exports.updateOrderStatusDto = exports.listOrdersQueryDto = exports.createOrderDto = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../../shared/utils/pagination");
const objectIdRegex = /^[a-f\d]{24}$/i;
const objectId = zod_1.z.string().regex(objectIdRegex, 'Invalid ObjectId');
const addressSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1).max(200),
    phone: zod_1.z.string().min(6).max(20),
    addressLine1: zod_1.z.string().min(1).max(500),
    addressLine2: zod_1.z.string().max(500).optional(),
    city: zod_1.z.string().min(1).max(100),
    state: zod_1.z.string().min(1).max(100),
    postalCode: zod_1.z.string().min(4).max(10),
    country: zod_1.z.string().length(2).default('IN'),
});
const orderItemSchema = zod_1.z.object({
    productId: objectId,
    variantId: objectId.optional(),
    quantity: zod_1.z.number().int().min(1).max(50),
});
exports.createOrderDto = zod_1.z.object({
    items: zod_1.z.array(orderItemSchema).min(1).max(100),
    shippingAddress: addressSchema,
    billingAddress: addressSchema.optional(),
    couponCode: zod_1.z.string().max(50).optional(),
    paymentMethod: zod_1.z.enum(['razorpay', 'cod']).default('razorpay'),
    shippingMethod: zod_1.z.string().max(50).optional(),
    notes: zod_1.z.string().max(1000).optional(),
});
exports.listOrdersQueryDto = pagination_1.paginationSchema.extend({
    status: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    from: zod_1.z.string().optional(),
    to: zod_1.z.string().optional(),
});
exports.updateOrderStatusDto = zod_1.z.object({
    status: zod_1.z.enum(['confirmed', 'processing', 'packed', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded']),
    note: zod_1.z.string().optional(),
    trackingNumber: zod_1.z.string().optional(),
});
exports.cancelOrderDto = zod_1.z.object({
    reason: zod_1.z.string().min(1).max(500),
});
//# sourceMappingURL=orders.dto.js.map