import mongoose, { Document, Model } from 'mongoose';
export interface IAddress extends Document {
    userId: mongoose.Types.ObjectId;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    type: 'home' | 'work' | 'other';
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Address: Model<IAddress>;
//# sourceMappingURL=address.model.d.ts.map