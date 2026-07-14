import mongoose, { Document, Model } from 'mongoose';
export interface IWishlist extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    variantId?: mongoose.Types.ObjectId;
    addedAt: Date;
}
export declare const Wishlist: Model<IWishlist>;
//# sourceMappingURL=wishlist.model.d.ts.map