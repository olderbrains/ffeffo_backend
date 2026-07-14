import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class BrandsController {
    private service;
    constructor();
    list: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getOne: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    create: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    update: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    delete: (req: Request, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=brands.controller.d.ts.map