import { z } from 'zod';
export declare const createBrandDto: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    sortOrder: number;
    slug: string;
    isActive: boolean;
    description?: string | undefined;
    logo?: string | undefined;
    website?: string | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    sortOrder?: number | undefined;
    logo?: string | undefined;
    website?: string | undefined;
    isActive?: boolean | undefined;
}>;
export declare const updateBrandDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    logo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    website: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    sortOrder?: number | undefined;
    slug?: string | undefined;
    logo?: string | undefined;
    website?: string | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    sortOrder?: number | undefined;
    slug?: string | undefined;
    logo?: string | undefined;
    website?: string | undefined;
    isActive?: boolean | undefined;
}>;
export type CreateBrandInput = z.infer<typeof createBrandDto>;
export type UpdateBrandInput = z.infer<typeof updateBrandDto>;
//# sourceMappingURL=brands.dto.d.ts.map