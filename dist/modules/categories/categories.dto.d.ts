import { z } from 'zod';
export declare const createCategoryDto: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    parentId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
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
}, "strip", z.ZodTypeAny, {
    name: string;
    sortOrder: number;
    slug: string;
    isActive: boolean;
    description?: string | undefined;
    seo?: {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    } | undefined;
    image?: string | undefined;
    parentId?: string | null | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    sortOrder?: number | undefined;
    seo?: {
        description?: string | undefined;
        title?: string | undefined;
        keywords?: string[] | undefined;
    } | undefined;
    image?: string | undefined;
    isActive?: boolean | undefined;
    parentId?: string | null | undefined;
}>;
export declare const updateCategoryDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    parentId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    seo: z.ZodOptional<z.ZodObject<{
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | null | undefined;
        title?: string | null | undefined;
        keywords?: string[] | undefined;
    }, {
        description?: string | null | undefined;
        title?: string | null | undefined;
        keywords?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | null | undefined;
    sortOrder?: number | undefined;
    slug?: string | undefined;
    seo?: {
        description?: string | null | undefined;
        title?: string | null | undefined;
        keywords?: string[] | undefined;
    } | undefined;
    image?: string | null | undefined;
    isActive?: boolean | undefined;
    parentId?: string | null | undefined;
}, {
    name?: string | undefined;
    description?: string | null | undefined;
    sortOrder?: number | undefined;
    slug?: string | undefined;
    seo?: {
        description?: string | null | undefined;
        title?: string | null | undefined;
        keywords?: string[] | undefined;
    } | undefined;
    image?: string | null | undefined;
    isActive?: boolean | undefined;
    parentId?: string | null | undefined;
}>;
export declare const listCategoriesQueryDto: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    parentId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodEffects<z.ZodOptional<z.ZodEnum<["true", "false"]>>, boolean | undefined, "true" | "false" | undefined>;
    level: z.ZodOptional<z.ZodNumber>;
    tree: z.ZodEffects<z.ZodOptional<z.ZodEnum<["true", "false"]>>, boolean, "true" | "false" | undefined>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    page: number;
    tree: boolean;
    level?: number | undefined;
    sortBy?: string | undefined;
    isActive?: boolean | undefined;
    parentId?: string | null | undefined;
}, {
    level?: number | undefined;
    limit?: number | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    sortBy?: string | undefined;
    isActive?: "true" | "false" | undefined;
    parentId?: string | null | undefined;
    tree?: "true" | "false" | undefined;
}>;
export declare const categoryIdParamDto: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const categoryIdOrSlugParamDto: z.ZodObject<{
    idOrSlug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    idOrSlug: string;
}, {
    idOrSlug: string;
}>;
export type CreateCategoryDto = z.infer<typeof createCategoryDto>;
export type UpdateCategoryDto = z.infer<typeof updateCategoryDto>;
export type ListCategoriesQueryDto = z.infer<typeof listCategoriesQueryDto>;
//# sourceMappingURL=categories.dto.d.ts.map