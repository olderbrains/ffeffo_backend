import mongoose, { Document, Model } from 'mongoose';
export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: mongoose.Types.ObjectId;
    ancestors: mongoose.Types.ObjectId[];
    level: number;
    sortOrder: number;
    isActive: boolean;
    seo: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
    productCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Category: Model<ICategory>;
//# sourceMappingURL=category.model.d.ts.map