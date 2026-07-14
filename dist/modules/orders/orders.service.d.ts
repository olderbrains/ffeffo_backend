import { IOrder } from '../../models/order.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { CreateOrderInput, ListOrdersQuery, UpdateOrderStatusInput } from './orders.dto';
export declare class OrdersService {
    createOrder(userId: string, input: CreateOrderInput): Promise<IOrder>;
    listByUser(userId: string, query: ListOrdersQuery): Promise<PaginatedResponse<IOrder>>;
    getByIdForUser(orderId: string, userId: string): Promise<IOrder>;
    private resolveItems;
    private generateOrderNumber;
    list(query: ListOrdersQuery): Promise<PaginatedResponse<IOrder>>;
    getById(id: string): Promise<IOrder>;
    updateStatus(id: string, data: UpdateOrderStatusInput, updatedBy: string): Promise<IOrder>;
    cancel(id: string, reason: string, userId: string): Promise<IOrder>;
    getStats(): Promise<{
        byStatus: Record<string, number>;
        totalRevenue: number;
        totalOrders: number;
        avgOrderValue: number;
    }>;
}
//# sourceMappingURL=orders.service.d.ts.map