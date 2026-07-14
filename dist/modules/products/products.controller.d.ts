import { Request, Response } from 'express';
import { ApiResponse } from '../../shared/types';
export declare class ProductsController {
    private productsService;
    constructor();
    listProducts: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    getProduct: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    createProduct: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    updateProduct: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    deleteProduct: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    listVariants: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    createVariant: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    updateVariant: (req: Request, res: Response<ApiResponse>) => Promise<void>;
    deleteVariant: (req: Request, res: Response<ApiResponse>) => Promise<void>;
}
//# sourceMappingURL=products.controller.d.ts.map