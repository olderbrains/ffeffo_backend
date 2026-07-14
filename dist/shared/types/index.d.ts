import { Request } from 'express';
import { Types } from 'mongoose';
export interface AuthenticatedRequest extends Request {
    user: AuthUser;
}
export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    firebaseUid: string;
}
export type UserRole = 'super_admin' | 'admin' | 'manager' | 'support_agent' | 'customer';
export interface TokenPayload {
    userId: string;
    email: string;
    role: UserRole;
    firebaseUid: string;
}
export interface RefreshTokenPayload {
    userId: string;
    tokenVersion: number;
}
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        code: string;
        message: string;
        errors?: Record<string, string[]>;
    };
}
export type ObjectId = Types.ObjectId;
//# sourceMappingURL=index.d.ts.map