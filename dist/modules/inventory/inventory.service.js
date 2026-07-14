"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const inventory_model_1 = require("../../models/inventory.model");
const app_error_1 = require("../../shared/errors/app-error");
const pagination_1 = require("../../shared/utils/pagination");
class InventoryService {
    async list(query) {
        const filter = {};
        if (query.productId) {
            filter.productId = new mongoose_1.default.Types.ObjectId(query.productId);
        }
        if (query.isLowStock === 'true') {
            filter.isLowStock = true;
        }
        else if (query.isLowStock === 'false') {
            filter.isLowStock = false;
        }
        if (query.warehouse) {
            filter.warehouse = query.warehouse;
        }
        const [items, total] = await Promise.all([
            inventory_model_1.Inventory.find(filter)
                .sort({ isLowStock: -1, availableStock: 1 })
                .skip((0, pagination_1.getSkipValue)(query.page, query.limit))
                .limit(query.limit)
                .populate('productId', 'name slug')
                .populate('variantId', 'sku attributes')
                .lean(),
            inventory_model_1.Inventory.countDocuments(filter),
        ]);
        return (0, pagination_1.buildPaginatedResponse)(items, total, query.page, query.limit);
    }
    async getById(id) {
        const inventory = await inventory_model_1.Inventory.findById(id)
            .populate('productId', 'name slug images')
            .populate('variantId', 'sku attributes price')
            .lean();
        if (!inventory)
            throw new app_error_1.NotFoundError('Inventory record not found');
        return inventory;
    }
    async adjustStock(id, data, performedBy) {
        const inventory = await inventory_model_1.Inventory.findById(id);
        if (!inventory)
            throw new app_error_1.NotFoundError('Inventory record not found');
        const previousStock = inventory.stock;
        let newStock;
        if (data.type === 'restock') {
            if (data.quantity <= 0)
                throw new app_error_1.BadRequestError('Restock quantity must be positive');
            newStock = previousStock + data.quantity;
        }
        else {
            newStock = previousStock + data.quantity;
            if (newStock < 0)
                throw new app_error_1.BadRequestError('Adjustment would result in negative stock');
        }
        inventory.stock = newStock;
        inventory.availableStock = newStock - inventory.reservedStock;
        inventory.isLowStock = inventory.availableStock <= inventory.lowStockThreshold;
        inventory.logs.push({
            type: data.type,
            quantity: data.quantity,
            previousStock,
            newStock,
            note: data.note,
            performedBy: performedBy ? new mongoose_1.default.Types.ObjectId(performedBy) : undefined,
            createdAt: new Date(),
        });
        inventory.version += 1;
        await inventory.save();
        return inventory.toJSON();
    }
    async getLowStock() {
        return inventory_model_1.Inventory.find({ isLowStock: true })
            .populate('productId', 'name slug')
            .populate('variantId', 'sku attributes')
            .sort({ availableStock: 1 })
            .lean();
    }
    async getSummary() {
        const [totalSkus, lowStock, outOfStock] = await Promise.all([
            inventory_model_1.Inventory.countDocuments({}),
            inventory_model_1.Inventory.countDocuments({ isLowStock: true, availableStock: { $gt: 0 } }),
            inventory_model_1.Inventory.countDocuments({ availableStock: { $lte: 0 } }),
        ]);
        return { totalSkus, lowStock, outOfStock };
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map