import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../shared/types';
export declare function authenticate(req: AuthenticatedRequest, _res: Response, next: NextFunction): void;
export declare function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.middleware.d.ts.map