import { Request, Response } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../../shared/types';
export declare class CategoriesController {
    private categoriesService;
    constructor();
    list: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getByIdOrSlug: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    create: (_req: AuthenticatedRequest, res: Response<ApiResponse>) => Promise<void>;
    update: (_req: AuthenticatedRequest, res: Response<ApiResponse>) => Promise<void>;
    delete: (_req: AuthenticatedRequest, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=categories.controller.d.ts.map