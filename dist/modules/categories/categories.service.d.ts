import { ICategory } from '../../models/category.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { CreateCategoryDto, UpdateCategoryDto, ListCategoriesQueryDto } from './categories.dto';
interface CategoryTreeNode {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: string | null;
    level: number;
    sortOrder: number;
    isActive: boolean;
    seo: ICategory['seo'];
    productCount: number;
    children: CategoryTreeNode[];
}
export declare class CategoriesService {
    list(query: ListCategoriesQueryDto): Promise<PaginatedResponse<ICategory> | CategoryTreeNode[]>;
    getByIdOrSlug(idOrSlug: string): Promise<{
        category: ICategory;
        children: ICategory[];
    }>;
    create(dto: CreateCategoryDto): Promise<ICategory>;
    update(id: string, dto: UpdateCategoryDto): Promise<ICategory>;
    softDelete(id: string): Promise<void>;
    private buildTree;
    private buildTreeFromDb;
    private updateDescendantAncestors;
}
export {};
//# sourceMappingURL=categories.service.d.ts.map