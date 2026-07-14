"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const order_model_1 = require("../../models/order.model");
const user_model_1 = require("../../models/user.model");
const product_model_1 = require("../../models/product.model");
const inventory_model_1 = require("../../models/inventory.model");
const order_item_model_1 = require("../../models/order-item.model");
class AnalyticsService {
    async getDashboard() {
        const [revenueAgg, totalOrders, totalCustomers, totalProducts, lowStockCount] = await Promise.all([
            order_model_1.Order.aggregate([
                { $match: { status: { $nin: ['cancelled', 'refunded'] } } },
                { $group: { _id: null, total: { $sum: '$total' } } },
            ]),
            order_model_1.Order.countDocuments({}),
            user_model_1.User.countDocuments({ role: 'customer', status: 'active' }),
            product_model_1.Product.countDocuments({ status: 'active' }),
            inventory_model_1.Inventory.countDocuments({ isLowStock: true }),
        ]);
        const totalRevenue = revenueAgg[0]?.total || 0;
        return {
            totalRevenue,
            totalOrders,
            totalCustomers,
            totalProducts,
            lowStockCount,
            avgOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
        };
    }
    async getRevenue(period) {
        const now = new Date();
        let startDate;
        let groupFormat;
        switch (period) {
            case 'daily':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                groupFormat = '%Y-%m-%d';
                break;
            case 'weekly':
                startDate = new Date(now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000);
                groupFormat = '%Y-W%V';
                break;
            case 'monthly':
                startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
                groupFormat = '%Y-%m';
                break;
        }
        const result = await order_model_1.Order.aggregate([
            { $match: { createdAt: { $gte: startDate }, status: { $nin: ['cancelled', 'refunded'] } } },
            {
                $group: {
                    _id: { $dateToString: { format: groupFormat, date: '$createdAt' } },
                    revenue: { $sum: '$total' },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, date: '$_id', revenue: 1, orders: 1 } },
        ]);
        return result;
    }
    async getOrderStats() {
        const result = await order_model_1.Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
            { $project: { _id: 0, status: '$_id', count: 1 } },
            { $sort: { count: -1 } },
        ]);
        return result;
    }
    async getTopProducts(limit = 10) {
        const result = await order_item_model_1.OrderItem.aggregate([
            {
                $group: {
                    _id: '$productId',
                    totalSold: { $sum: '$quantity' },
                    totalRevenue: { $sum: '$total' },
                },
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 0,
                    productId: '$_id',
                    name: { $ifNull: ['$product.name', 'Unknown'] },
                    totalSold: 1,
                    totalRevenue: 1,
                },
            },
        ]);
        return result;
    }
}
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map