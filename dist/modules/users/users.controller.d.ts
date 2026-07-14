import { Request, Response } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../../shared/types';
export declare class UsersController {
    private usersService;
    constructor();
    list: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getById: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getProfile: (req: AuthenticatedRequest, res: Response<ApiResponse>) => Promise<void>;
    updateProfile: (req: AuthenticatedRequest, res: Response<ApiResponse>) => Promise<void>;
    deactivateAccount: (req: AuthenticatedRequest, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=users.controller.d.ts.map