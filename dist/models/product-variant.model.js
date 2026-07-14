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
exports.ProductVariant = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const variantSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true,
    },
    barcode: {
        type: String,
        sparse: true,
        index: true,
    },
    attributes: [
        {
            name: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    salePrice: {
        type: Number,
        min: 0,
    },
    costPrice: {
        type: Number,
        min: 0,
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
    weight: {
        type: Number,
        min: 0,
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
    },
    images: [String],
    isActive: {
        type: Boolean,
        default: true,
    },
    sortOrder: {
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
variantSchema.index({ productId: 1, isActive: 1, sortOrder: 1 });
variantSchema.index({ stock: 1 });
exports.ProductVariant = mongoose_1.default.model('ProductVariant', variantSchema);
//# sourceMappingURL=product-variant.model.js.map