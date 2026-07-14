import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class CouponsController {
    private service;
    constructor();
    list: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getOne: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    create: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    update: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    delete: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    validate: (req: Request, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=coupons.controller.d.ts.map