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
exports.Payment = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../shared/constants");
const paymentSchema = new mongoose_1.Schema({
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
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    razorpayPaymentId: {
        type: String,
        sparse: true,
        index: true,
    },
    razorpaySignature: String,
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    status: {
        type: String,
        enum: constants_1.PAYMENT_STATUSES,
        default: 'pending',
        index: true,
    },
    method: String,
    bank: String,
    wallet: String,
    vpa: String,
    cardLast4: String,
    failureReason: String,
    refundedAmount: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    webhookPayload: mongoose_1.Schema.Types.Mixed,
    verifiedAt: Date,
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            ret.webhookPayload = undefined;
            return ret;
        },
    },
});
exports.Payment = mongoose_1.default.model('Payment', paymentSchema);
//# sourceMappingURL=payment.model.js.map