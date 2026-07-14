import mongoose, { Document, Model } from 'mongoose';
export interface IReview extends Document {
    productId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId;
    rating: number;
    title: string;
    comment: string;
    images: string[];
    isVerifiedPurchase: boolean;
    status: 'pending' | 'approved' | 'rejected';
    helpfulCount: number;
    reportCount: number;
    adminReply?: {
        comment: string;
        repliedAt: Date;
        repliedBy: mongoose.Types.ObjectId;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const Review: Model<IReview>;
//# sourceMappingURL=review.model.d.ts.map