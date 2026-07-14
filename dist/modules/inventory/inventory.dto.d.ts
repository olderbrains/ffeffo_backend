import { z } from 'zod';
export declare const listInventoryQueryDto: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    productId: z.ZodOptional<z.ZodString>;
    isLowStock: z.ZodOptional<z.ZodEnum<["true", "false"]>>;
    warehouse: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    page: number;
    productId?: string | undefined;
    isLowStock?: "true" | "false" | undefined;
    warehouse?: string | undefined;
    sortBy?: string | undefined;
}, {
    limit?: number | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    productId?: string | undefined;
    isLowStock?: "true" | "false" | undefined;
    warehouse?: string | undefined;
    page?: number | undefined;
    sortBy?: string | undefined;
}>;
export declare const adjustStockDto: z.ZodObject<{
    type: z.ZodEnum<["restock", "adjustment"]>;
    quantity: z.ZodNumber;
    note: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "adjustment" | "restock";
    note: string;
    quantity: number;
}, {
    type: "adjustment" | "restock";
    note: string;
    quantity: number;
}>;
export type ListInventoryQuery = z.infer<typeof listInventoryQueryDto>;
export type AdjustStockInput = z.infer<typeof adjustStockDto>;
//# sourceMappingURL=inventory.dto.d.ts.map