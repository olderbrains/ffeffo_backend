import { IProduct } from '../../models/product.model';
import { IProductVariant } from '../../models/product-variant.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { CreateProductDto, UpdateProductDto, ListProductsQueryDto, CreateVariantDto, UpdateVariantDto } from './products.dto';
export declare class ProductsService {
    listProducts(query: ListProductsQueryDto): Promise<PaginatedResponse<IProduct>>;
    getProductByIdOrSlug(idOrSlug: string): Promise<Record<string, unknown>>;
    createProduct(dto: CreateProductDto): Promise<IProduct>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<IProduct>;
    deleteProduct(id: string): Promise<void>;
    listVariants(productId: string): Promise<IProductVariant[]>;
    createVariant(productId: string, dto: CreateVariantDto): Promise<IProductVariant>;
    updateVariant(productId: string, variantId: string, dto: UpdateVariantDto): Promise<IProductVariant>;
    deleteVariant(productId: string, variantId: string): Promise<void>;
    private generateSlug;
}
//# sourceMappingURL=products.service.d.ts.map