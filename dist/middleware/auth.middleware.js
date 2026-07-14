"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuth = optionalAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const errors_1 = require("../shared/errors");
function authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new errors_1.UnauthorizedError('Missing or invalid authorization header');
    }
    const token = authHeader.slice(7);
    const config = (0, config_1.getConfig)();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config.JWT_ACCESS_SECRET);
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            firebaseUid: decoded.firebaseUid,
        };
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new errors_1.UnauthorizedError('Token expired', 'TOKEN_EXPIRED');
        }
        throw new errors_1.UnauthorizedError('Invalid token', 'INVALID_TOKEN');
    }
}
function optionalAuth(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        next();
        return;
    }
    const token = authHeader.slice(7);
    const config = (0, config_1.getConfig)();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config.JWT_ACCESS_SECRET);
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            firebaseUid: decoded.firebaseUid,
        };
    }
    catch {
        // Token invalid — proceed unauthenticated
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map