import { IInventory } from '../../models/inventory.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { ListInventoryQuery, AdjustStockInput } from './inventory.dto';
export declare class InventoryService {
    list(query: ListInventoryQuery): Promise<PaginatedResponse<IInventory>>;
    getById(id: string): Promise<IInventory>;
    adjustStock(id: string, data: AdjustStockInput, performedBy?: string): Promise<IInventory>;
    getLowStock(): Promise<IInventory[]>;
    getSummary(): Promise<{
        totalSkus: number;
        lowStock: number;
        outOfStock: number;
    }>;
}
//# sourceMappingURL=inventory.service.d.ts.map