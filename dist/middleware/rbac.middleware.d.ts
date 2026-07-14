import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole } from '../shared/types';
export declare function authorize(...allowedRoles: UserRole[]): (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
export declare function authorizeAdmin(req: AuthenticatedRequest, _res: Response, next: NextFunction): void;
//# sourceMappingURL=rbac.middleware.d.ts.map