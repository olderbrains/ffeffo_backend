export interface ProductHit {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    basePrice: number;
    salePrice?: number;
    category?: {
        name: string;
        slug: string;
    };
    brand?: {
        name: string;
        slug: string;
    };
}
export interface CategoryHit {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    productCount: number;
}
export interface BrandHit {
    _id: string;
    name: string;
    slug: string;
    logo?: string;
}
export interface SearchResults {
    products: ProductHit[];
    categories: CategoryHit[];
    brands: BrandHit[];
    total: number;
}
export declare class SearchService {
    search(query: string, productLimit?: number): Promise<SearchResults>;
}
//# sourceMappingURL=search.service.d.ts.map