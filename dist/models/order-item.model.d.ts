import mongoose, { Document, Model } from 'mongoose';
export interface IOrderItem extends Document {
    orderId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    variantId?: mongoose.Types.ObjectId;
    productName: string;
    variantName?: string;
    sku: string;
    image?: string;
    quantity: number;
    unitPrice: number;
    salePrice: number;
    discount: number;
    total: number;
    attributes?: {
        name: string;
        value: string;
    }[];
    createdAt: Date;
}
export declare const OrderItem: Model<IOrderItem>;
//# sourceMappingURL=order-item.model.d.ts.map