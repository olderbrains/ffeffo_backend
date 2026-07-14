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
exports.Return = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../shared/constants");
const returnItemSchema = new mongoose_1.Schema({
    orderItemId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ProductVariant' },
    quantity: { type: Number, required: true, min: 1 },
    reason: { type: String, required: true },
    images: [String],
}, { _id: false });
const returnSchema = new mongoose_1.Schema({
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        index: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    returnNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    items: [returnItemSchema],
    status: {
        type: String,
        enum: constants_1.RETURN_STATUSES,
        default: 'requested',
        index: true,
    },
    pickupAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, default: 'IN' },
    },
    pickupDate: Date,
    adminNotes: String,
    processedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    refundId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Refund' },
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            return ret;
        },
    },
});
exports.Return = mongoose_1.default.model('Return', returnSchema);
//# sourceMappingURL=return.model.js.map