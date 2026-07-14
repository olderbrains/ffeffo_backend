import mongoose, { Document, Model } from 'mongoose';
import { COUPON_TYPES } from '../shared/constants';
export interface ICoupon extends Document {
    code: string;
    description: string;
    type: (typeof COUPON_TYPES)[number];
    value: number;
    minOrderAmount: number;
    maxDiscount?: number;
    applicableTo: {
        type: 'all' | 'categories' | 'products' | 'brands';
        ids: mongoose.Types.ObjectId[];
    };
    usageLimit?: number;
    usagePerUser: number;
    usedCount: number;
    validFrom: Date;
    validUntil: Date;
    status: 'active' | 'inactive' | 'expired';
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Coupon: Model<ICoupon>;
//# sourceMappingURL=coupon.model.d.ts.map