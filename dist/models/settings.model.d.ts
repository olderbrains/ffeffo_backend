import mongoose, { Document, Model } from 'mongoose';
export interface ISettings extends Document {
    key: string;
    value: unknown;
    group: string;
    description?: string;
    updatedBy?: mongoose.Types.ObjectId;
    updatedAt: Date;
}
export declare const Settings: Model<ISettings>;
//# sourceMappingURL=settings.model.d.ts.map