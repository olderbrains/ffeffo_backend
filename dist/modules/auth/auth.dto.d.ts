import { z } from 'zod';
export declare const registerDto: z.ZodObject<{
    firebaseToken: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    firebaseToken: string;
    phone?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    firebaseToken: string;
    phone?: string | undefined;
}>;
export declare const loginDto: z.ZodObject<{
    firebaseToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firebaseToken: string;
}, {
    firebaseToken: string;
}>;
export declare const refreshTokenDto: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
export declare const devLoginDto: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type RegisterDto = z.infer<typeof registerDto>;
export type LoginDto = z.infer<typeof loginDto>;
export type RefreshTokenDto = z.infer<typeof refreshTokenDto>;
//# sourceMappingURL=auth.dto.d.ts.map