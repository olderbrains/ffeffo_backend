"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
exports.authorizeAdmin = authorizeAdmin;
const errors_1 = require("../shared/errors");
function authorize(...allowedRoles) {
    return (req, _res, next) => {
        if (!req.user) {
            throw new errors_1.ForbiddenError('Access denied');
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new errors_1.ForbiddenError(`Role '${req.user.role}' does not have permission for this action`);
        }
        next();
    };
}
function authorizeAdmin(req, _res, next) {
    if (!req.user) {
        throw new errors_1.ForbiddenError('Access denied');
    }
    const adminRoles = ['super_admin', 'admin', 'manager'];
    if (!adminRoles.includes(req.user.role)) {
        throw new errors_1.ForbiddenError('Admin access required');
    }
    next();
}
//# sourceMappingURL=rbac.middleware.js.map