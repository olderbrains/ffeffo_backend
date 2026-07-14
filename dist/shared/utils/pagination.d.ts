import { z } from 'zod';
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    page: number;
    sortBy?: string | undefined;
}, {
    limit?: number | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    sortBy?: string | undefined;
}>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}
export declare function buildPaginatedResponse<T>(data: T[], total: number, page: number, limit: number): PaginatedResponse<T>;
export declare function getSkipValue(page: number, limit: number): number;
//# sourceMappingURL=pagination.d.ts.map