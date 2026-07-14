import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class InventoryController {
    private service;
    constructor();
    list: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getOne: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    adjustStock: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    lowStock: (_req: Request, res: Response<ApiResponse>) => Promise<void>;
    summary: (_req: Request, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=inventory.controller.d.ts.map