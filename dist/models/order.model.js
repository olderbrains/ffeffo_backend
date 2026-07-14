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
exports.Order = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../shared/constants");
const orderAddressSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: 'IN' },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'OrderItem',
        },
    ],
    shippingAddress: {
        type: orderAddressSchema,
        required: true,
    },
    billingAddress: {
        type: orderAddressSchema,
        required: true,
    },
    status: {
        type: String,
        enum: constants_1.ORDER_STATUSES,
        default: 'pending',
        index: true,
    },
    subtotal: { type: Number, required: true, min: 0 },
    shippingCharge: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    couponCode: String,
    couponDiscount: { type: Number, default: 0 },
    paymentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Payment',
    },
    paymentMethod: String,
    shippingMethod: String,
    trackingNumber: String,
    trackingUrl: String,
    estimatedDelivery: Date,
    deliveredAt: Date,
    cancelledAt: Date,
    cancelReason: String,
    notes: String,
    timeline: [
        {
            status: { type: String, required: true },
            timestamp: { type: Date, required: true },
            note: String,
            updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        },
    ],
    metadata: {
        ip: String,
        userAgent: String,
        source: { type: String, enum: ['web', 'mobile', 'api'], default: 'web' },
    },
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            return ret;
        },
    },
});
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ createdAt: -1 });
exports.Order = mongoose_1.default.model('Order', orderSchema);
//# sourceMappingURL=order.model.js.map