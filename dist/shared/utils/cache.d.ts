export declare const cache: {
    getOrSet<T>(key: string, ttlSeconds: number, fetchFn: () => Promise<T>): Promise<T>;
    invalidate(key: string): Promise<void>;
    invalidatePattern(pattern: string): Promise<void>;
};
//# sourceMappingURL=cache.d.ts.map