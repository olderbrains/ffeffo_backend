import { IBanner } from '../../models/banner.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { CreateBannerInput, UpdateBannerInput, ListBannersQuery } from './banners.dto';
export declare class BannersService {
    list(filters: ListBannersQuery & {
        publicOnly?: boolean;
    }): Promise<PaginatedResponse<IBanner>>;
    getById(id: string): Promise<IBanner>;
    create(data: CreateBannerInput): Promise<IBanner>;
    update(id: string, data: UpdateBannerInput): Promise<IBanner>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=banners.service.d.ts.map