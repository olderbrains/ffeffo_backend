import { IBrand } from '../../models/brand.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { CreateBrandInput, UpdateBrandInput } from './brands.dto';
export declare class BrandsService {
    list(filters: {
        page: number;
        limit: number;
        isActive?: boolean;
        search?: string;
    }): Promise<PaginatedResponse<IBrand>>;
    getByIdOrSlug(idOrSlug: string): Promise<IBrand>;
    create(data: CreateBrandInput): Promise<IBrand>;
    update(id: string, data: UpdateBrandInput): Promise<IBrand>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=brands.service.d.ts.map