"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const inventoryLogSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['adjustment', 'sale', 'return', 'restock', 'reservation', 'release'],
        required: true,
    },
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    reference: String,
    note: String,
    performedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
}, { _id: true });
const inventorySchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true,
    },
    variantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true,
        index: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    reservedStock: {
        type: Number,
        default: 0,
        min: 0,
    },
    availableStock: {
        type: Number,
        default: 0,
        min: 0,
    },
    lowStockThreshold: {
        type: Number,
        default: 10,
        min: 0,
    },
    isLowStock: {
        type: Boolean,
        default: false,
        index: true,
    },
    warehouse: String,
    logs: [inventoryLogSchema],
    version: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            return ret;
        },
    },
});
inventorySchema.index({ productId: 1, variantId: 1 }, { unique: true });
inventorySchema.index({ isLowStock: 1, stock: 1 });
inventorySchema.pre('save', function () {
    this.availableStock = this.stock - this.reservedStock;
    this.isLowStock = this.availableStock <= this.lowStockThreshold;
    if (this.logs.length > 100) {
        this.logs = this.logs.slice(-100);
    }
});
exports.Inventory = mongoose_1.default.model('Inventory', inventorySchema);
//# sourceMappingURL=inventory.model.js.map