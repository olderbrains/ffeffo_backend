import { z } from 'zod';
export declare const createBannerDto: z.ZodObject<{
    title: z.ZodString;
    image: z.ZodObject<{
        desktop: z.ZodString;
        mobile: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        mobile: string;
        desktop: string;
    }, {
        mobile: string;
        desktop: string;
    }>;
    link: z.ZodString;
    position: z.ZodEnum<["hero", "promotional", "sidebar", "category"]>;
    priority: z.ZodDefault<z.ZodNumber>;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "scheduled"]>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "inactive" | "scheduled";
    link: string;
    position: "hero" | "promotional" | "sidebar" | "category";
    title: string;
    image: {
        mobile: string;
        desktop: string;
    };
    priority: number;
    startDate: Date;
    endDate: Date;
}, {
    link: string;
    position: "hero" | "promotional" | "sidebar" | "category";
    title: string;
    image: {
        mobile: string;
        desktop: string;
    };
    startDate: Date;
    endDate: Date;
    status?: "active" | "inactive" | "scheduled" | undefined;
    priority?: number | undefined;
}>;
export declare const updateBannerDto: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodObject<{
        desktop: z.ZodString;
        mobile: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        mobile: string;
        desktop: string;
    }, {
        mobile: string;
        desktop: string;
    }>>;
    link: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodEnum<["hero", "promotional", "sidebar", "category"]>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDate>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "scheduled"]>>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive" | "scheduled" | undefined;
    link?: string | undefined;
    position?: "hero" | "promotional" | "sidebar" | "category" | undefined;
    title?: string | undefined;
    image?: {
        mobile: string;
        desktop: string;
    } | undefined;
    priority?: number | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
}, {
    status?: "active" | "inactive" | "scheduled" | undefined;
    link?: string | undefined;
    position?: "hero" | "promotional" | "sidebar" | "category" | undefined;
    title?: string | undefined;
    image?: {
        mobile: string;
        desktop: string;
    } | undefined;
    priority?: number | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
}>;
export declare const listBannersQueryDto: z.ZodObject<{
    position: z.ZodOptional<z.ZodEnum<["hero", "promotional", "sidebar", "category"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "inactive", "scheduled"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    status?: "active" | "inactive" | "scheduled" | undefined;
    position?: "hero" | "promotional" | "sidebar" | "category" | undefined;
}, {
    status?: "active" | "inactive" | "scheduled" | undefined;
    limit?: number | undefined;
    position?: "hero" | "promotional" | "sidebar" | "category" | undefined;
    page?: number | undefined;
}>;
export type CreateBannerInput = z.infer<typeof createBannerDto>;
export type UpdateBannerInput = z.infer<typeof updateBannerDto>;
export type ListBannersQuery = z.infer<typeof listBannersQueryDto>;
//# sourceMappingURL=banners.dto.d.ts.map