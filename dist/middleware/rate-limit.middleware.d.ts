import type { RequestHandler } from 'express';
export declare function createRateLimiter(windowMs: number, max: number): RequestHandler;
export declare function initRateLimiters(): void;
export declare const authRateLimiter: RequestHandler;
export declare const apiRateLimiter: RequestHandler;
export declare const strictRateLimiter: RequestHandler;
//# sourceMappingURL=rate-limit.middleware.d.ts.map