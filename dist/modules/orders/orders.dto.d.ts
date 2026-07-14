import { z } from 'zod';
export declare const createOrderDto: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        variantId: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        productId: string;
        variantId?: string | undefined;
    }, {
        quantity: number;
        productId: string;
        variantId?: string | undefined;
    }>, "many">;
    shippingAddress: z.ZodObject<{
        fullName: z.ZodString;
        phone: z.ZodString;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        addressLine2?: string | undefined;
    }, {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        addressLine2?: string | undefined;
        country?: string | undefined;
    }>;
    billingAddress: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodString;
        phone: z.ZodString;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        addressLine2?: string | undefined;
    }, {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        addressLine2?: string | undefined;
        country?: string | undefined;
    }>>;
    couponCode: z.ZodOptional<z.ZodString>;
    paymentMethod: z.ZodDefault<z.ZodEnum<["razorpay", "cod"]>>;
    shippingMethod: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    items: {
        quantity: number;
        productId: string;
        variantId?: string | undefined;
    }[];
    shippingAddress: {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        addressLine2?: string | undefined;
    };
    paymentMethod: "razorpay" | "cod";
    billingAddress?: {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        addressLine2?: string | undefined;
    } | undefined;
    couponCode?: string | undefined;
    shippingMethod?: string | undefined;
    notes?: string | undefined;
}, {
    items: {
        quantity: number;
        productId: string;
        variantId?: string | undefined;
    }[];
    shippingAddress: {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        addressLine2?: string | undefined;
        country?: string | undefined;
    };
    billingAddress?: {
        fullName: string;
        phone: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        addressLine2?: string | undefined;
        country?: string | undefined;
    } | undefined;
    couponCode?: string | undefined;
    paymentMethod?: "razorpay" | "cod" | undefined;
    shippingMethod?: string | undefined;
    notes?: string | undefined;
}>;
export declare const listOrdersQueryDto: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    status: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    page: number;
    status?: string | undefined;
    search?: string | undefined;
    userId?: string | undefined;
    sortBy?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    status?: string | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    userId?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    sortBy?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const updateOrderStatusDto: z.ZodObject<{
    status: z.ZodEnum<["confirmed", "processing", "packed", "shipped", "delivered", "cancelled", "returned", "refunded"]>;
    note: z.ZodOptional<z.ZodString>;
    trackingNumber: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "confirmed" | "processing" | "packed" | "shipped" | "delivered" | "cancelled" | "returned" | "refunded";
    trackingNumber?: string | undefined;
    note?: string | undefined;
}, {
    status: "confirmed" | "processing" | "packed" | "shipped" | "delivered" | "cancelled" | "returned" | "refunded";
    trackingNumber?: string | undefined;
    note?: string | undefined;
}>;
export declare const cancelOrderDto: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type CreateOrderInput = z.infer<typeof createOrderDto>;
export type ListOrdersQuery = z.infer<typeof listOrdersQueryDto>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusDto>;
//# sourceMappingURL=orders.dto.d.ts.map