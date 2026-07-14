import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../shared/types';
export declare function auditLog(action: string, resource: string): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=audit.middleware.d.ts.map