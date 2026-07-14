import { Document, Model } from 'mongoose';
import { USER_ROLES } from '../shared/constants';
export interface IUser extends Document {
    firebaseUid: string;
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: (typeof USER_ROLES)[number];
    status: 'active' | 'blocked' | 'deactivated';
    emailVerified: boolean;
    phoneVerified: boolean;
    lastLoginAt?: Date;
    tokenVersion: number;
    metadata: {
        loginCount: number;
        lastOrderAt?: Date;
        totalOrders: number;
        totalSpent: number;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: Model<IUser>;
//# sourceMappingURL=user.model.d.ts.map