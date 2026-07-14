import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class HealthController {
    health: (_req: Request, res: Response<ApiResponse>) => void;
    ready: (_req: Request, res: Response<ApiResponse>) => Promise<void>;
    live: (_req: Request, res: Response<ApiResponse>) => void;
}
//# sourceMappingURL=health.controller.d.ts.map