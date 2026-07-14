import { z } from 'zod';
export declare const listCouponsQueryDto: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    status: z.ZodOptional<z.ZodEnum<["active", "inactive", "expired"]>>;
    type: z.ZodOptional<z.ZodEnum<["percentage", "fixed_amount", "free_shipping"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    page: number;
    status?: "active" | "inactive" | "expired" | undefined;
    type?: "percentage" | "fixed_amount" | "free_shipping" | undefined;
    sortBy?: string | undefined;
}, {
    status?: "active" | "inactive" | "expired" | undefined;
    type?: "percentage" | "fixed_amount" | "free_shipping" | undefined;
    limit?: number | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    sortBy?: string | undefined;
}>;
export declare const createCouponDto: z.ZodObject<{
    code: z.ZodEffects<z.ZodString, string, string>;
    description: z.ZodString;
    type: z.ZodEnum<["percentage", "fixed_amount", "free_shipping"]>;
    value: z.ZodNumber;
    minOrderAmount: z.ZodDefault<z.ZodNumber>;
    maxDiscount: z.ZodOptional<z.ZodNumber>;
    applicableTo: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["all", "categories", "products", "brands"]>>;
        ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "products" | "categories" | "all" | "brands";
        ids: string[];
    }, {
        type?: "products" | "categories" | "all" | "brands" | undefined;
        ids?: string[] | undefined;
    }>>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    usagePerUser: z.ZodDefault<z.ZodNumber>;
    validFrom: z.ZodEffects<z.ZodString, Date, string>;
    validUntil: z.ZodEffects<z.ZodString, Date, string>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive"]>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive";
    value: number;
    code: string;
    type: "percentage" | "fixed_amount" | "free_shipping";
    description: string;
    minOrderAmount: number;
    applicableTo: {
        type: "products" | "categories" | "all" | "brands";
        ids: string[];
    };
    usagePerUser: number;
    validFrom: Date;
    validUntil: Date;
    maxDiscount?: number | undefined;
    usageLimit?: number | undefined;
}, {
    value: number;
    code: string;
    type: "percentage" | "fixed_amount" | "free_shipping";
    description: string;
    validFrom: string;
    validUntil: string;
    status?: "active" | "inactive" | undefined;
    minOrderAmount?: number | undefined;
    maxDiscount?: number | undefined;
    applicableTo?: {
        type?: "products" | "categories" | "all" | "brands" | undefined;
        ids?: string[] | undefined;
    } | undefined;
    usageLimit?: number | undefined;
    usagePerUser?: number | undefined;
}>;
export declare const updateCouponDto: z.ZodObject<{
    code: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["percentage", "fixed_amount", "free_shipping"]>>;
    value: z.ZodOptional<z.ZodNumber>;
    minOrderAmount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    maxDiscount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    applicableTo: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["all", "categories", "products", "brands"]>>;
        ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "products" | "categories" | "all" | "brands";
        ids: string[];
    }, {
        type?: "products" | "categories" | "all" | "brands" | undefined;
        ids?: string[] | undefined;
    }>>>;
    usageLimit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    usagePerUser: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    validFrom: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    validUntil: z.ZodOptional<z.ZodEffects<z.ZodString, Date, string>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive"]>>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive" | undefined;
    value?: number | undefined;
    code?: string | undefined;
    type?: "percentage" | "fixed_amount" | "free_shipping" | undefined;
    description?: string | undefined;
    minOrderAmount?: number | undefined;
    maxDiscount?: number | undefined;
    applicableTo?: {
        type: "products" | "categories" | "all" | "brands";
        ids: string[];
    } | undefined;
    usageLimit?: number | undefined;
    usagePerUser?: number | undefined;
    validFrom?: Date | undefined;
    validUntil?: Date | undefined;
}, {
    status?: "active" | "inactive" | undefined;
    value?: number | undefined;
    code?: string | undefined;
    type?: "percentage" | "fixed_amount" | "free_shipping" | undefined;
    description?: string | undefined;
    minOrderAmount?: number | undefined;
    maxDiscount?: number | undefined;
    applicableTo?: {
        type?: "products" | "categories" | "all" | "brands" | undefined;
        ids?: string[] | undefined;
    } | undefined;
    usageLimit?: number | undefined;
    usagePerUser?: number | undefined;
    validFrom?: string | undefined;
    validUntil?: string | undefined;
}>;
export declare const validateCouponDto: z.ZodObject<{
    code: z.ZodString;
    orderAmount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    code: string;
    orderAmount: number;
}, {
    code: string;
    orderAmount: number;
}>;
export type CreateCouponInput = z.infer<typeof createCouponDto>;
export type UpdateCouponInput = z.infer<typeof updateCouponDto>;
//# sourceMappingURL=coupons.dto.d.ts.map