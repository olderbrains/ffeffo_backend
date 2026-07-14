import mongoose, { Document, Model } from 'mongoose';
import { PAYMENT_STATUSES } from '../shared/constants';
export interface IPayment extends Document {
    orderId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    amount: number;
    currency: string;
    status: (typeof PAYMENT_STATUSES)[number];
    method?: string;
    bank?: string;
    wallet?: string;
    vpa?: string;
    cardLast4?: string;
    failureReason?: string;
    refundedAmount: number;
    attempts: number;
    webhookPayload?: Record<string, unknown>;
    verifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Payment: Model<IPayment>;
//# sourceMappingURL=payment.model.d.ts.map