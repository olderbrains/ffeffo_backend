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
exports.Coupon = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../shared/constants");
const couponSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: constants_1.COUPON_TYPES,
        required: true,
    },
    value: {
        type: Number,
        required: true,
        min: 0,
    },
    minOrderAmount: {
        type: Number,
        default: 0,
        min: 0,
    },
    maxDiscount: {
        type: Number,
        min: 0,
    },
    applicableTo: {
        type: {
            type: String,
            enum: ['all', 'categories', 'products', 'brands'],
            default: 'all',
        },
        ids: [{ type: mongoose_1.Schema.Types.ObjectId }],
    },
    usageLimit: Number,
    usagePerUser: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    status: {
        type: String,
        enum: ['active', 'inactive', 'expired'],
        default: 'active',
        index: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            return ret;
        },
    },
});
couponSchema.index({ status: 1, validFrom: 1, validUntil: 1 });
exports.Coupon = mongoose_1.default.model('Coupon', couponSchema);
//# sourceMappingURL=coupon.model.js.map