"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const inventory_model_1 = require("../../models/inventory.model");
const order_model_1 = require("../../models/order.model");
const order_item_model_1 = require("../../models/order-item.model");
const product_model_1 = require("../../models/product.model");
const product_variant_model_1 = require("../../models/product-variant.model");
const settings_model_1 = require("../../models/settings.model");
const app_error_1 = require("../../shared/errors/app-error");
const pagination_1 = require("../../shared/utils/pagination");
const coupons_service_1 = require("../coupons/coupons.service");
class OrdersService {
    async createOrder(userId, input) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const itemDetails = await this.resolveItems(input.items);
            const subtotal = itemDetails.reduce((sum, item) => sum + item.total, 0);
            const freeThresholdSetting = await settings_model_1.Settings.findOne({ key: 'shipping.freeThreshold' }).lean();
            const defaultChargeSetting = await settings_model_1.Settings.findOne({ key: 'shipping.defaultCharge' }).lean();
            const freeThreshold = freeThresholdSetting ? Number(freeThresholdSetting.value) : 999;
            const defaultShipCharge = defaultChargeSetting ? Number(defaultChargeSetting.value) : 99;
            const shippingCharge = subtotal >= freeThreshold ? 0 : defaultShipCharge;
            let couponDiscount = 0;
            let validatedCouponId = null;
            if (input.couponCode) {
                const couponsService = new coupons_service_1.CouponsService();
                const result = await couponsService.validate(input.couponCode, subtotal, userId);
                couponDiscount = result.discount;
                validatedCouponId = result.coupon._id.toString();
            }
            const taxableAmount = subtotal - couponDiscount;
            const tax = Math.round(taxableAmount * 0.18);
            const total = taxableAmount + shippingCharge + tax;
            const orderNumber = await this.generateOrderNumber();
            const orderItems = await order_item_model_1.OrderItem.create(itemDetails.map((item) => ({
                productId: item.productId,
                variantId: item.variantId,
                productName: item.productName,
                variantName: item.variantName,
                sku: item.sku,
                image: item.image,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                salePrice: item.salePrice,
                discount: item.unitPrice - item.salePrice,
                total: item.total,
                attributes: item.attributes,
            })), { session });
            for (const item of itemDetails) {
                const inv = await inventory_model_1.Inventory.findOneAndUpdate({
                    variantId: item.variantId,
                    availableStock: { $gte: item.quantity },
                    version: item.inventoryVersion,
                }, {
                    $inc: { reservedStock: item.quantity, version: 1 },
                    $push: {
                        logs: {
                            $each: [{
                                    type: 'reservation',
                                    quantity: item.quantity,
                                    previousStock: item.previousAvailable,
                                    newStock: item.previousAvailable - item.quantity,
                                    reference: orderNumber,
                                }],
                            $slice: -100,
                        },
                    },
                }, { session, new: true });
                if (!inv) {
                    throw new app_error_1.BadRequestError(`Insufficient stock for ${item.productName} (${item.variantName || item.sku})`);
                }
            }
            const billingAddress = input.billingAddress || input.shippingAddress;
            const orders = await order_model_1.Order.create([{
                    orderNumber,
                    userId: new mongoose_1.default.Types.ObjectId(userId),
                    items: orderItems.map((oi) => oi._id),
                    shippingAddress: input.shippingAddress,
                    billingAddress,
                    status: 'pending',
                    subtotal,
                    shippingCharge,
                    discount: couponDiscount,
                    tax,
                    total,
                    couponCode: input.couponCode,
                    couponDiscount,
                    paymentMethod: input.paymentMethod,
                    shippingMethod: input.shippingMethod || 'standard',
                    notes: input.notes,
                    timeline: [{
                            status: 'pending',
                            timestamp: new Date(),
                            note: 'Order placed',
                            updatedBy: new mongoose_1.default.Types.ObjectId(userId),
                        }],
                    metadata: { source: 'web' },
                }], { session });
            const order = orders[0];
            await order_item_model_1.OrderItem.updateMany({ _id: { $in: orderItems.map((oi) => oi._id) } }, { $set: { orderId: order._id } }, { session });
            await session.commitTransaction();
            if (validatedCouponId) {
                const couponsService = new coupons_service_1.CouponsService();
                await couponsService.recordUsage(validatedCouponId, userId).catch(() => {});
            }
            return order.toJSON();
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
        finally {
            session.endSession();
        }
    }
    async listByUser(userId, query) {
        const filter = {
            userId: new mongoose_1.default.Types.ObjectId(userId),
        };
        if (query.status)
            filter.status = query.status;
        const [items, total] = await Promise.all([
            order_model_1.Order.find(filter)
                .sort({ createdAt: -1 })
                .skip((0, pagination_1.getSkipValue)(query.page, query.limit))
                .limit(query.limit)
                .populate('items')
                .lean(),
            order_model_1.Order.countDocuments(filter),
        ]);
        return (0, pagination_1.buildPaginatedResponse)(items, total, query.page, query.limit);
    }
    async getByIdForUser(orderId, userId) {
        const order = await order_model_1.Order.findOne({
            _id: orderId,
            userId: new mongoose_1.default.Types.ObjectId(userId),
        })
            .populate('items')
            .lean();
        if (!order)
            throw new app_error_1.NotFoundError('Order not found');
        return order;
    }
    async resolveItems(items) {
        const resolved = [];
        for (const item of items) {
            const product = await product_model_1.Product.findById(item.productId).lean();
            if (!product)
                throw new app_error_1.BadRequestError(`Product ${item.productId} not found`);
            if (product.status !== 'active')
                throw new app_error_1.BadRequestError(`Product "${product.name}" is not available`);
            let variant;
            if (item.variantId) {
                variant = await product_variant_model_1.ProductVariant.findOne({ _id: item.variantId, productId: item.productId, isActive: true }).lean();
                if (!variant)
                    throw new app_error_1.BadRequestError(`Variant not found for "${product.name}"`);
            }
            else if (product.hasVariants) {
                variant = await product_variant_model_1.ProductVariant.findOne({ productId: item.productId, isActive: true }).sort({ sortOrder: 1 }).lean();
                if (!variant)
                    throw new app_error_1.BadRequestError(`No active variant for "${product.name}"`);
            }
            else {
                variant = await product_variant_model_1.ProductVariant.findOne({ productId: item.productId }).lean();
                if (!variant)
                    throw new app_error_1.BadRequestError(`No variant/SKU configured for "${product.name}"`);
            }
            const inventory = await inventory_model_1.Inventory.findOne({ variantId: variant._id }).lean();
            if (!inventory)
                throw new app_error_1.BadRequestError(`Inventory not configured for "${product.name}"`);
            if (inventory.availableStock < item.quantity) {
                throw new app_error_1.BadRequestError(`Only ${inventory.availableStock} units available for "${product.name}"`);
            }
            const unitPrice = variant.price ?? product.basePrice;
            const salePrice = variant.salePrice ?? product.salePrice ?? unitPrice;
            resolved.push({
                productId: product._id,
                variantId: variant._id,
                productName: product.name,
                variantName: variant.attributes?.map((a) => a.value).join(' / '),
                sku: variant.sku,
                image: product.images?.[0]?.url,
                quantity: item.quantity,
                unitPrice,
                salePrice,
                total: salePrice * item.quantity,
                attributes: variant.attributes,
                inventoryVersion: inventory.version,
                previousAvailable: inventory.availableStock,
            });
        }
        return resolved;
    }
    async generateOrderNumber() {
        const date = new Date();
        const prefix = `SPF${date.getFullYear().toString().slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}`;
        const count = await order_model_1.Order.countDocuments({
            orderNumber: { $regex: `^${prefix}` },
        });
        return `${prefix}${String(count + 1).padStart(5, '0')}`;
    }
    async list(query) {
        const filter = {};
        if (query.status) {
            filter.status = query.status;
        }
        if (query.userId) {
            filter.userId = new mongoose_1.default.Types.ObjectId(query.userId);
        }
        if (query.search) {
            filter.orderNumber = { $regex: query.search, $options: 'i' };
        }
        if (query.from || query.to) {
            filter.createdAt = {};
            if (query.from)
                filter.createdAt.$gte = new Date(query.from);
            if (query.to)
                filter.createdAt.$lte = new Date(query.to);
        }
        const sortField = query.sortBy || 'createdAt';
        const sortDirection = query.sortOrder === 'asc' ? 1 : -1;
        const [items, total] = await Promise.all([
            order_model_1.Order.find(filter)
                .sort({ [sortField]: sortDirection })
                .skip((0, pagination_1.getSkipValue)(query.page, query.limit))
                .limit(query.limit)
                .populate('userId', 'firstName lastName email')
                .lean(),
            order_model_1.Order.countDocuments(filter),
        ]);
        return (0, pagination_1.buildPaginatedResponse)(items, total, query.page, query.limit);
    }
    async getById(id) {
        const order = await order_model_1.Order.findById(id)
            .populate('userId', 'firstName lastName email phone')
            .populate('items')
            .populate('paymentId')
            .lean();
        if (!order)
            throw new app_error_1.NotFoundError('Order not found');
        return order;
    }
    async updateStatus(id, data, updatedBy) {
        const order = await order_model_1.Order.findById(id);
        if (!order)
            throw new app_error_1.NotFoundError('Order not found');
        const validTransitions = {
            pending: ['confirmed', 'cancelled'],
            confirmed: ['processing', 'cancelled'],
            processing: ['packed', 'cancelled'],
            packed: ['shipped'],
            shipped: ['delivered'],
            delivered: ['returned'],
            returned: ['refunded'],
        };
        const allowed = validTransitions[order.status] || [];
        if (!allowed.includes(data.status)) {
            throw new app_error_1.BadRequestError(`Cannot transition from '${order.status}' to '${data.status}'`);
        }
        order.status = data.status;
        order.timeline.push({
            status: data.status,
            timestamp: new Date(),
            note: data.note || `Order ${data.status}`,
            updatedBy: new mongoose_1.default.Types.ObjectId(updatedBy),
        });
        if (data.trackingNumber) {
            order.trackingNumber = data.trackingNumber;
        }
        if (data.status === 'delivered') {
            order.deliveredAt = new Date();
        }
        if (data.status === 'cancelled') {
            order.cancelledAt = new Date();
        }
        await order.save();
        return order.toJSON();
    }
    async cancel(id, reason, userId) {
        const order = await order_model_1.Order.findById(id);
        if (!order)
            throw new app_error_1.NotFoundError('Order not found');
        if (!['pending', 'confirmed', 'processing'].includes(order.status)) {
            throw new app_error_1.BadRequestError('Order cannot be cancelled at this stage');
        }
        order.status = 'cancelled';
        order.cancelledAt = new Date();
        order.cancelReason = reason;
        order.timeline.push({
            status: 'cancelled',
            timestamp: new Date(),
            note: reason,
            updatedBy: new mongoose_1.default.Types.ObjectId(userId),
        });
        await order.save();
        return order.toJSON();
    }
    async getStats() {
        const [statusAgg, revenueAgg] = await Promise.all([
            order_model_1.Order.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } },
            ]),
            order_model_1.Order.aggregate([
                { $match: { status: { $nin: ['cancelled', 'refunded'] } } },
                { $group: { _id: null, totalRevenue: { $sum: '$total' }, count: { $sum: 1 } } },
            ]),
        ]);
        const byStatus = {};
        for (const s of statusAgg) {
            byStatus[s._id] = s.count;
        }
        const revenue = revenueAgg[0] || { totalRevenue: 0, count: 0 };
        return {
            byStatus,
            totalRevenue: revenue.totalRevenue,
            totalOrders: revenue.count,
            avgOrderValue: revenue.count > 0 ? Math.round(revenue.totalRevenue / revenue.count) : 0,
        };
    }
}
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map