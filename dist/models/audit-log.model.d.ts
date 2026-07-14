import mongoose, { Document, Model } from 'mongoose';
export interface IAuditLog extends Document {
    userId: mongoose.Types.ObjectId;
    action: string;
    resource: string;
    resourceId?: mongoose.Types.ObjectId;
    changes?: {
        before: Record<string, unknown>;
        after: Record<string, unknown>;
    };
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
    createdAt: Date;
}
export declare const AuditLog: Model<IAuditLog>;
//# sourceMappingURL=audit-log.model.d.ts.map