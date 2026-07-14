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
exports.Banner = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../shared/constants");
const bannerSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    ctaText: { type: String, trim: true },
    secondaryCtaText: { type: String, trim: true },
    secondaryCtaLink: { type: String, trim: true },
    image: {
        desktop: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    link: { type: String, required: true },
    position: {
        type: String,
        enum: constants_1.BANNER_POSITIONS,
        required: true,
    },
    priority: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['active', 'inactive', 'scheduled'],
        default: 'active',
        index: true,
    },
}, {
    timestamps: true, versionKey: false,
    toJSON: {
        transform(_doc, ret) {
            return ret;
        },
    },
});
bannerSchema.index({ position: 1, status: 1, priority: -1 });
bannerSchema.index({ startDate: 1, endDate: 1 });
exports.Banner = mongoose_1.default.model('Banner', bannerSchema);
//# sourceMappingURL=banner.model.js.map