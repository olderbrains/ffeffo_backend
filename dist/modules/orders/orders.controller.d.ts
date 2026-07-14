import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class OrdersController {
    private service;
    constructor();
    create: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    myOrders: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    myOrderDetail: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    list: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getOne: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    updateStatus: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    cancel: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    stats: (_req: Request, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=orders.controller.d.ts.map