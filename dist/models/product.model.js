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
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../shared/constants");
const productImageSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    alt: String,
    sortOrder: { type: Number, default: 0 },
    isDefault: { type: Boolean, default: false },
}, { _id: true });
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        maxlength: 300,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true,
    },
    brandId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Brand',
        index: true,
    },
    images: [productImageSchema],
    videos: [String],
    attributes: [
        {
            name: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    variantAttributes: [String],
    tags: [{ type: String, index: true }],
    status: {
        type: String,
        enum: constants_1.PRODUCT_STATUSES,
        default: 'draft',
        index: true,
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    salePrice: {
        type: Number,
        min: 0,
    },
    hasVariants: {
        type: Boolean,
        default: false,
    },
    totalStock: {
        type: Number,
        default: 0,
        min: 0,
    },
    seo: {
        title: String,
        description: String,
        keywords: [String],
    },
    ratings: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 },
    },
    metadata: {
        views: { type: Number, default: 0 },
        purchases: { type: Number, default: 0 },
        wishlistCount: { type: Number, default: 0 },
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true,
    },
    publishedAt: Date,
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            return ret;
        },
    },
});
productSchema.index({ categoryId: 1, status: 1, createdAt: -1 });
productSchema.index({ brandId: 1, status: 1 });
productSchema.index({ status: 1, isFeatured: 1 });
productSchema.index({ basePrice: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
exports.Product = mongoose_1.default.model('Product', productSchema);
//# sourceMappingURL=product.model.js.map