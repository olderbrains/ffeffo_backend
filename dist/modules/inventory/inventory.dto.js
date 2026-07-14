"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustStockDto = exports.listInventoryQueryDto = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../../shared/utils/pagination");
exports.listInventoryQueryDto = pagination_1.paginationSchema.extend({
    productId: zod_1.z.string().optional(),
    isLowStock: zod_1.z.enum(['true', 'false']).optional(),
    warehouse: zod_1.z.string().optional(),
});
exports.adjustStockDto = zod_1.z.object({
    type: zod_1.z.enum(['restock', 'adjustment']),
    quantity: zod_1.z.number().int(),
    note: zod_1.z.string().min(1).max(500),
});
//# sourceMappingURL=inventory.dto.js.map