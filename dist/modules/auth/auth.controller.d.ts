import { Request, Response } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../../shared/types';
export declare class AuthController {
    private authService;
    constructor();
    register: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    login: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    devLogin: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    refresh: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    logout: (req: AuthenticatedRequest, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map