import mongoose, { Document, Model } from 'mongoose';
export interface IRefund extends Document {
    orderId: mongoose.Types.ObjectId;
    paymentId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    returnId?: mongoose.Types.ObjectId;
    razorpayRefundId?: string;
    amount: number;
    reason: string;
    status: 'initiated' | 'processing' | 'completed' | 'failed';
    processedBy?: mongoose.Types.ObjectId;
    processedAt?: Date;
    failureReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Refund: Model<IRefund>;
//# sourceMappingURL=refund.model.d.ts.map