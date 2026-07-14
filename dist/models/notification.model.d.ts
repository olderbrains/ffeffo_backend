import mongoose, { Document, Model } from 'mongoose';
import { NOTIFICATION_CHANNELS, NOTIFICATION_TYPES } from '../shared/constants';
export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    type: (typeof NOTIFICATION_TYPES)[number];
    channel: (typeof NOTIFICATION_CHANNELS)[number];
    title: string;
    body: string;
    data?: Record<string, unknown>;
    status: 'pending' | 'sent' | 'delivered' | 'failed' | 'read';
    sentAt?: Date;
    readAt?: Date;
    createdAt: Date;
}
export declare const Notification: Model<INotification>;
//# sourceMappingURL=notification.model.d.ts.map