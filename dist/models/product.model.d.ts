import mongoose, { Document, Model } from 'mongoose';
import { PRODUCT_STATUSES } from '../shared/constants';
export interface IProductAttribute {
    name: string;
    value: string;
}
export interface IProductImage {
    url: string;
    alt?: string;
    sortOrder: number;
    isDefault: boolean;
}
export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    categoryId: mongoose.Types.ObjectId;
    brandId?: mongoose.Types.ObjectId;
    images: IProductImage[];
    videos?: string[];
    attributes: IProductAttribute[];
    variantAttributes: string[];
    tags: string[];
    status: (typeof PRODUCT_STATUSES)[number];
    basePrice: number;
    salePrice?: number;
    hasVariants: boolean;
    totalStock: number;
    seo: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    ratings: {
        average: number;
        count: number;
    };
    metadata: {
        views: number;
        purchases: number;
        wishlistCount: number;
    };
    isFeatured: boolean;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Product: Model<IProduct>;
//# sourceMappingURL=product.model.d.ts.map