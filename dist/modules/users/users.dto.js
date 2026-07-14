"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdParamDto = exports.listUsersQueryDto = exports.updateProfileDto = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../../shared/utils/pagination");
exports.updateProfileDto = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(50).optional(),
    lastName: zod_1.z.string().min(1).max(50).optional(),
    phone: zod_1.z.string().min(10).max(15).optional(),
    avatar: zod_1.z.string().url().optional(),
});
exports.listUsersQueryDto = pagination_1.paginationSchema.extend({
    search: zod_1.z.string().max(200).optional(),
    role: zod_1.z.enum(['super_admin', 'admin', 'manager', 'support_agent', 'customer']).optional(),
    status: zod_1.z.enum(['active', 'blocked', 'deactivated']).optional(),
    sortBy: zod_1.z
        .enum(['createdAt', 'email', 'firstName', 'lastName', 'metadata.totalSpent', 'metadata.totalOrders', 'lastLoginAt'])
        .default('createdAt'),
});
const objectIdRegex = /^[a-f\d]{24}$/i;
exports.userIdParamDto = zod_1.z.object({
    id: zod_1.z.string().regex(objectIdRegex, 'Invalid ObjectId'),
});
//# sourceMappingURL=users.dto.js.map