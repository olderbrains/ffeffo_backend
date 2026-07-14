export declare class AnalyticsService {
    getDashboard(): Promise<{
        totalRevenue: number;
        totalOrders: number;
        totalCustomers: number;
        totalProducts: number;
        lowStockCount: number;
        avgOrderValue: number;
    }>;
    getRevenue(period: 'daily' | 'weekly' | 'monthly'): Promise<Array<{
        date: string;
        revenue: number;
        orders: number;
    }>>;
    getOrderStats(): Promise<Array<{
        status: string;
        count: number;
    }>>;
    getTopProducts(limit?: number): Promise<Array<{
        productId: string;
        name: string;
        totalSold: number;
        totalRevenue: number;
    }>>;
}
//# sourceMappingURL=analytics.service.d.ts.map