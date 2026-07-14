import mongoose, { Document, Model } from 'mongoose';
export interface IVariantAttribute {
    name: string;
    value: string;
}
export interface IProductVariant extends Document {
    productId: mongoose.Types.ObjectId;
    sku: string;
    barcode?: string;
    attributes: IVariantAttribute[];
    price: number;
    salePrice?: number;
    costPrice?: number;
    stock: number;
    reservedStock: number;
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    images: string[];
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ProductVariant: Model<IProductVariant>;
//# sourceMappingURL=product-variant.model.d.ts.map