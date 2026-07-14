import mongoose, { Document, Model } from 'mongoose';
export interface IAnalytics extends Document {
    date: Date;
    revenue: number;
    orderCount: number;
    averageOrderValue: number;
    newCustomers: number;
    returningCustomers: number;
    topProducts: {
        productId: mongoose.Types.ObjectId;
        name: string;
        units: number;
        revenue: number;
    }[];
    topCategories: {
        categoryId: mongoose.Types.ObjectId;
        name: string;
        revenue: number;
    }[];
    conversionRate: number;
    cartAbandonmentRate: number;
    returnRate: number;
    createdAt: Date;
}
export declare const Analytics: Model<IAnalytics>;
//# sourceMappingURL=analytics.model.d.ts.map