import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class BannersController {
    private service;
    constructor();
    /** Public listing: returns only active banners within valid date range */
    list: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    /** Admin listing: returns all banners regardless of status/dates */
    adminList: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getById: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    create: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    update: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    delete: (req: Request, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=banners.controller.d.ts.map