"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRazorpayClient = getRazorpayClient;
const razorpay_1 = __importDefault(require("razorpay"));
const index_1 = require("./index");
let razorpayInstance = null;
function getRazorpayClient() {
    if (!razorpayInstance) {
        const config = (0, index_1.getConfig)();
        razorpayInstance = new razorpay_1.default({
            key_id: config.RAZORPAY_KEY_ID,
            key_secret: config.RAZORPAY_KEY_SECRET,
        });
    }
    return razorpayInstance;
}
//# sourceMappingURL=razorpay.js.map