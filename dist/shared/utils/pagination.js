"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = void 0;
exports.buildPaginatedResponse = buildPaginatedResponse;
exports.getSkipValue = getSkipValue;
const zod_1 = require("zod");
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
function buildPaginatedResponse(data, total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    };
}
function getSkipValue(page, limit) {
    return (page - 1) * limit;
}
//# sourceMappingURL=pagination.js.map