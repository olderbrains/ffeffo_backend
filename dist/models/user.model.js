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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../shared/constants");
const userSchema = new mongoose_1.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    phone: {
        type: String,
        sparse: true,
        index: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: String,
    role: {
        type: String,
        enum: constants_1.USER_ROLES,
        default: 'customer',
        index: true,
    },
    status: {
        type: String,
        enum: ['active', 'blocked', 'deactivated'],
        default: 'active',
        index: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    lastLoginAt: Date,
    tokenVersion: {
        type: Number,
        default: 0,
    },
    metadata: {
        loginCount: { type: Number, default: 0 },
        lastOrderAt: Date,
        totalOrders: { type: Number, default: 0 },
        totalSpent: { type: Number, default: 0 },
    },
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            return ret;
        },
    },
});
userSchema.index({ role: 1, status: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ 'metadata.totalSpent': -1 });
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map