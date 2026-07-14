import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class AnalyticsController {
    private service;
    constructor();
    dashboard: (_req: Request, res: Response<ApiResponse>) => Promise<void>;
    revenue: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    orderStats: (_req: Request, res: Response<ApiResponse>) => Promise<void>;
    topProducts: (req: Request, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=analytics.controller.d.ts.map