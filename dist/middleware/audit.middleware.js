"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLog = auditLog;
const logger_1 = require("../shared/utils/logger");
function auditLog(action, resource) {
    return (req, res, next) => {
        const originalJson = res.json.bind(res);
        res.json = function (body) {
            if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
                const logEntry = {
                    userId: req.user.id,
                    action,
                    resource,
                    resourceId: req.params.id || undefined,
                    ip: req.ip,
                    userAgent: req.headers['user-agent'],
                    method: req.method,
                    path: req.path,
                };
                logger_1.logger.info(logEntry, 'audit_log');
            }
            return originalJson(body);
        };
        next();
    };
}
//# sourceMappingURL=audit.middleware.js.map