import mongoose, { Document, Model } from 'mongoose';
export interface IInventoryLog {
    type: 'adjustment' | 'sale' | 'return' | 'restock' | 'reservation' | 'release';
    quantity: number;
    previousStock: number;
    newStock: number;
    reference?: string;
    note?: string;
    performedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
}
export interface IInventory extends Document {
    productId: mongoose.Types.ObjectId;
    variantId: mongoose.Types.ObjectId;
    sku: string;
    stock: number;
    reservedStock: number;
    availableStock: number;
    lowStockThreshold: number;
    isLowStock: boolean;
    warehouse?: string;
    logs: IInventoryLog[];
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Inventory: Model<IInventory>;
//# sourceMappingURL=inventory.model.d.ts.map