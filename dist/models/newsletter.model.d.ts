import { Document, Model } from 'mongoose';
export interface INewsletter extends Document {
    email: string;
    isActive: boolean;
    subscribedAt: Date;
    unsubscribedAt?: Date;
}
export declare const Newsletter: Model<INewsletter>;
//# sourceMappingURL=newsletter.model.d.ts.map