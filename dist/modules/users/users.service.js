"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const user_model_1 = require("../../models/user.model");
const errors_1 = require("../../shared/errors");
const pagination_1 = require("../../shared/utils/pagination");
class UsersService {
    async listUsers(query) {
        const { page, limit, sortBy, sortOrder, search, role, status } = query;
        const filter = {};
        if (role) {
            filter.role = role;
        }
        if (status) {
            filter.status = status;
        }
        if (search) {
            const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.$or = [
                { email: { $regex: escaped, $options: 'i' } },
                { firstName: { $regex: escaped, $options: 'i' } },
                { lastName: { $regex: escaped, $options: 'i' } },
                { phone: { $regex: escaped, $options: 'i' } },
            ];
        }
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }
        const skip = (0, pagination_1.getSkipValue)(page, limit);
        const [users, total] = await Promise.all([
            user_model_1.User.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .select('-tokenVersion -firebaseUid')
                .lean(),
            user_model_1.User.countDocuments(filter),
        ]);
        return (0, pagination_1.buildPaginatedResponse)(users, total, page, limit);
    }
    async getUserById(id) {
        const user = await user_model_1.User.findById(id)
            .select('-tokenVersion -firebaseUid')
            .lean();
        if (!user) {
            throw new errors_1.NotFoundError('User not found');
        }
        return user;
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map