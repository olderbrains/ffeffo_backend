import mongoose, { Document, Model } from 'mongoose';
import { RETURN_STATUSES } from '../shared/constants';
export interface IReturnItem {
    orderItemId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    variantId?: mongoose.Types.ObjectId;
    quantity: number;
    reason: string;
    images: string[];
}
export interface IReturn extends Document {
    orderId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    returnNumber: string;
    items: IReturnItem[];
    status: (typeof RETURN_STATUSES)[number];
    pickupAddress: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    pickupDate?: Date;
    adminNotes?: string;
    processedBy?: mongoose.Types.ObjectId;
    refundId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Return: Model<IReturn>;
//# sourceMappingURL=return.model.d.ts.map