import { z } from 'zod';
export declare const updateProfileDto: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    phone?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    avatar?: string | undefined;
}, {
    phone?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    avatar?: string | undefined;
}>;
export declare const listUsersQueryDto: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["super_admin", "admin", "manager", "support_agent", "customer"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "blocked", "deactivated"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "email", "firstName", "lastName", "metadata.totalSpent", "metadata.totalOrders", "lastLoginAt"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    page: number;
    sortBy: "email" | "createdAt" | "firstName" | "lastName" | "lastLoginAt" | "metadata.totalSpent" | "metadata.totalOrders";
    status?: "active" | "blocked" | "deactivated" | undefined;
    search?: string | undefined;
    role?: "super_admin" | "admin" | "manager" | "support_agent" | "customer" | undefined;
}, {
    status?: "active" | "blocked" | "deactivated" | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    role?: "super_admin" | "admin" | "manager" | "support_agent" | "customer" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    page?: number | undefined;
    sortBy?: "email" | "createdAt" | "firstName" | "lastName" | "lastLoginAt" | "metadata.totalSpent" | "metadata.totalOrders" | undefined;
}>;
export declare const userIdParamDto: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type UpdateProfileDto = z.infer<typeof updateProfileDto>;
export type ListUsersQueryDto = z.infer<typeof listUsersQueryDto>;
export type UserIdParamDto = z.infer<typeof userIdParamDto>;
//# sourceMappingURL=users.dto.d.ts.map