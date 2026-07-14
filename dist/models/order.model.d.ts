import mongoose, { Document, Model } from 'mongoose';
import { ORDER_STATUSES } from '../shared/constants';
export interface IOrderAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export interface IOrderTimeline {
    status: string;
    timestamp: Date;
    note?: string;
    updatedBy?: mongoose.Types.ObjectId;
}
export interface IOrder extends Document {
    orderNumber: string;
    userId: mongoose.Types.ObjectId;
    items: mongoose.Types.ObjectId[];
    shippingAddress: IOrderAddress;
    billingAddress: IOrderAddress;
    status: (typeof ORDER_STATUSES)[number];
    subtotal: number;
    shippingCharge: number;
    discount: number;
    tax: number;
    total: number;
    couponCode?: string;
    couponDiscount: number;
    paymentId?: mongoose.Types.ObjectId;
    paymentMethod?: string;
    shippingMethod?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    estimatedDelivery?: Date;
    deliveredAt?: Date;
    cancelledAt?: Date;
    cancelReason?: string;
    notes?: string;
    timeline: IOrderTimeline[];
    metadata: {
        ip?: string;
        userAgent?: string;
        source: 'web' | 'mobile' | 'api';
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const Order: Model<IOrder>;
//# sourceMappingURL=order.model.d.ts.map