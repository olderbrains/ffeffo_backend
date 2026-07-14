import { Document, Model } from 'mongoose';
export interface IBrand extends Document {
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    website?: string;
    isActive: boolean;
    sortOrder: number;
    productCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Brand: Model<IBrand>;
//# sourceMappingURL=brand.model.d.ts.map