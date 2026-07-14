import mongoose, { Document, Model } from 'mongoose';
export interface ICartItem {
    productId: mongoose.Types.ObjectId;
    variantId?: mongoose.Types.ObjectId;
    quantity: number;
    addedAt: Date;
}
export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: ICartItem[];
    couponCode?: string;
    updatedAt: Date;
    expiresAt: Date;
}
export declare const Cart: Model<ICart>;
//# sourceMappingURL=cart.model.d.ts.map