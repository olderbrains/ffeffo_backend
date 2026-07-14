"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLoginDto = exports.refreshTokenDto = exports.loginDto = exports.registerDto = void 0;
const zod_1 = require("zod");
exports.registerDto = zod_1.z.object({
    firebaseToken: zod_1.z.string().min(1, 'Firebase token is required'),
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
    phone: zod_1.z.string().optional(),
});
exports.loginDto = zod_1.z.object({
    firebaseToken: zod_1.z.string().min(1, 'Firebase token is required'),
});
exports.refreshTokenDto = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, 'Refresh token is required'),
});
// Development-only: lets local clients obtain a platform JWT for a seeded user
// without a Firebase ID token. Rejected by the service unless NODE_ENV=development.
exports.devLoginDto = zod_1.z.object({
    email: zod_1.z.string().email(),
});
//# sourceMappingURL=auth.dto.js.map