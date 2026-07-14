import { z } from 'zod';
export declare const createProductDto: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    shortDescription: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodString;
    brandId: z.ZodOptional<z.ZodString>;
    images: z.ZodDefault<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
        isDefault: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        sortOrder: number;
        isDefault: boolean;
        alt?: string | undefined;
    }, {
        url: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        isDefault?: boolean | undefined;
    }>, "many">>;
    videos: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    attributes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
    }, {
        value: string;
        name: string;
    }>, "many">>;
    variantAttributes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived"]>>;
    basePrice: z.ZodNumber;
    salePrice: z.ZodOptional<z.ZodNumber>;
    hasVariants: z.ZodDefault<z.ZodBoolean>;
    seo: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    }, {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    }>>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "active" | "archived";
    name: string;
    description: string;
    categoryId: string;
    images: {
        url: string;
        sortOrder: number;
        isDefault: boolean;
        alt?: string | undefined;
    }[];
    videos: string[];
    attributes: {
        value: string;
        name: string;
    }[];
    variantAttributes: string[];
    tags: string[];
    basePrice: number;
    hasVariants: boolean;
    isFeatured: boolean;
    slug?: string | undefined;
    shortDescription?: string | undefined;
    brandId?: string | undefined;
    salePrice?: number | undefined;
    seo?: {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    } | undefined;
}, {
    name: string;
    description: string;
    categoryId: string;
    basePrice: number;
    status?: "draft" | "active" | "archived" | undefined;
    slug?: string | undefined;
    shortDescription?: string | undefined;
    brandId?: string | undefined;
    images?: {
        url: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        isDefault?: boolean | undefined;
    }[] | undefined;
    videos?: string[] | undefined;
    attributes?: {
        value: string;
        name: string;
    }[] | undefined;
    variantAttributes?: string[] | undefined;
    tags?: string[] | undefined;
    salePrice?: number | undefined;
    hasVariants?: boolean | undefined;
    seo?: {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    } | undefined;
    isFeatured?: boolean | undefined;
}>;
export declare const updateProductDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
        isDefault: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        sortOrder: number;
        isDefault: boolean;
        alt?: string | undefined;
    }, {
        url: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        isDefault?: boolean | undefined;
    }>, "many">>>;
    videos: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    attributes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
    }, {
        value: string;
        name: string;
    }>, "many">>>;
    variantAttributes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "active", "archived"]>>>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    salePrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    hasVariants: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    seo: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    }, {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    }>>>;
    isFeatured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    status?: "draft" | "active" | "archived" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    shortDescription?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    images?: {
        url: string;
        sortOrder: number;
        isDefault: boolean;
        alt?: string | undefined;
    }[] | undefined;
    videos?: string[] | undefined;
    attributes?: {
        value: string;
        name: string;
    }[] | undefined;
    variantAttributes?: string[] | undefined;
    tags?: string[] | undefined;
    basePrice?: number | undefined;
    salePrice?: number | undefined;
    hasVariants?: boolean | undefined;
    seo?: {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    } | undefined;
    isFeatured?: boolean | undefined;
}, {
    status?: "draft" | "active" | "archived" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    shortDescription?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    images?: {
        url: string;
        alt?: string | undefined;
        sortOrder?: number | undefined;
        isDefault?: boolean | undefined;
    }[] | undefined;
    videos?: string[] | undefined;
    attributes?: {
        value: string;
        name: string;
    }[] | undefined;
    variantAttributes?: string[] | undefined;
    tags?: string[] | undefined;
    basePrice?: number | undefined;
    salePrice?: number | undefined;
    hasVariants?: boolean | undefined;
    seo?: {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    } | undefined;
    isFeatured?: boolean | undefined;
}>;
export declare const listProductsQueryDto: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    categoryId: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["draft", "active", "archived"]>>;
    search: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    isFeatured: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    includeColors: z.ZodOptional<z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "basePrice", "name", "ratings.average", "metadata.purchases"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    page: number;
    sortBy: "name" | "createdAt" | "basePrice" | "ratings.average" | "metadata.purchases";
    status?: "draft" | "active" | "archived" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    isFeatured?: boolean | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    includeColors?: boolean | undefined;
}, {
    status?: "draft" | "active" | "archived" | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    isFeatured?: "true" | "false" | undefined;
    page?: number | undefined;
    sortBy?: "name" | "createdAt" | "basePrice" | "ratings.average" | "metadata.purchases" | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    includeColors?: "true" | "false" | undefined;
}>;
export declare const productIdParamDto: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const productIdOrSlugParamDto: z.ZodObject<{
    idOrSlug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    idOrSlug: string;
}, {
    idOrSlug: string;
}>;
export declare const createVariantDto: z.ZodObject<{
    sku: z.ZodString;
    barcode: z.ZodOptional<z.ZodString>;
    attributes: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
    }, {
        value: string;
        name: string;
    }>, "many">;
    price: z.ZodNumber;
    salePrice: z.ZodOptional<z.ZodNumber>;
    costPrice: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodDefault<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        length: number;
        width: number;
        height: number;
    }, {
        length: number;
        width: number;
        height: number;
    }>>;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    images: string[];
    attributes: {
        value: string;
        name: string;
    }[];
    sku: string;
    stock: number;
    isActive: boolean;
    price: number;
    salePrice?: number | undefined;
    barcode?: string | undefined;
    costPrice?: number | undefined;
    weight?: number | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    } | undefined;
}, {
    attributes: {
        value: string;
        name: string;
    }[];
    sku: string;
    price: number;
    sortOrder?: number | undefined;
    images?: string[] | undefined;
    salePrice?: number | undefined;
    stock?: number | undefined;
    isActive?: boolean | undefined;
    barcode?: string | undefined;
    costPrice?: number | undefined;
    weight?: number | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    } | undefined;
}>;
export declare const updateVariantDto: z.ZodObject<Omit<{
    sku: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    attributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
    }, {
        value: string;
        name: string;
    }>, "many">>;
    price: z.ZodOptional<z.ZodNumber>;
    salePrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    costPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    stock: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    weight: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    dimensions: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        length: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        length: number;
        width: number;
        height: number;
    }, {
        length: number;
        width: number;
        height: number;
    }>>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "sku">, "strip", z.ZodTypeAny, {
    sortOrder?: number | undefined;
    images?: string[] | undefined;
    attributes?: {
        value: string;
        name: string;
    }[] | undefined;
    salePrice?: number | undefined;
    stock?: number | undefined;
    isActive?: boolean | undefined;
    barcode?: string | undefined;
    price?: number | undefined;
    costPrice?: number | undefined;
    weight?: number | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    } | undefined;
}, {
    sortOrder?: number | undefined;
    images?: string[] | undefined;
    attributes?: {
        value: string;
        name: string;
    }[] | undefined;
    salePrice?: number | undefined;
    stock?: number | undefined;
    isActive?: boolean | undefined;
    barcode?: string | undefined;
    price?: number | undefined;
    costPrice?: number | undefined;
    weight?: number | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    } | undefined;
}>;
export declare const variantIdParamDto: z.ZodObject<{
    id: z.ZodString;
    variantId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    variantId: string;
}, {
    id: string;
    variantId: string;
}>;
export type CreateProductDto = z.infer<typeof createProductDto>;
export type UpdateProductDto = z.infer<typeof updateProductDto>;
export type ListProductsQueryDto = z.infer<typeof listProductsQueryDto>;
export type CreateVariantDto = z.infer<typeof createVariantDto>;
export type UpdateVariantDto = z.infer<typeof updateVariantDto>;
//# sourceMappingURL=products.dto.d.ts.map