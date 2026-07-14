"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const firebase_1 = require("../../config/firebase");
const redis_1 = require("../../config/redis");
const user_model_1 = require("../../models/user.model");
const errors_1 = require("../../shared/errors");
class AuthService {
    async register(dto) {
        const firebaseAuth = (0, firebase_1.getFirebaseAuth)();
        const decodedToken = await firebaseAuth.verifyIdToken(dto.firebaseToken);
        const existingUser = await user_model_1.User.findOne({
            $or: [{ firebaseUid: decodedToken.uid }, { email: decodedToken.email }],
        });
        if (existingUser) {
            throw new errors_1.ConflictError('User already exists with this email');
        }
        const user = await user_model_1.User.create({
            firebaseUid: decodedToken.uid,
            email: decodedToken.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone || decodedToken.phone_number,
            emailVerified: decodedToken.email_verified ?? false,
            phoneVerified: !!decodedToken.phone_number,
            avatar: decodedToken.picture,
            role: 'customer',
            status: 'active',
            lastLoginAt: new Date(),
            metadata: {
                loginCount: 1,
                totalOrders: 0,
                totalSpent: 0,
            },
        });
        const tokens = this.generateTokens(user);
        await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
        return { user, tokens };
    }
    async login(firebaseToken) {
        const firebaseAuth = (0, firebase_1.getFirebaseAuth)();
        const decodedToken = await firebaseAuth.verifyIdToken(firebaseToken);
        const user = await user_model_1.User.findOne({ firebaseUid: decodedToken.uid });
        if (!user) {
            throw new errors_1.UnauthorizedError('User not found. Please register first.');
        }
        if (user.status !== 'active') {
            throw new errors_1.UnauthorizedError('Account is not active');
        }
        user.lastLoginAt = new Date();
        user.metadata.loginCount += 1;
        await user.save();
        const tokens = this.generateTokens(user);
        await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
        return { user, tokens };
    }
    /**
     * Development-only shortcut: issues a platform JWT for an existing seeded user
     * by email, bypassing Firebase. Hard-gated to NODE_ENV=development so it can
     * never mint tokens in staging or production.
     */
    async devLogin(email) {
        const config = (0, config_1.getConfig)();
        if (config.NODE_ENV !== 'development') {
            throw new errors_1.ForbiddenError('Dev login is disabled');
        }
        const user = await user_model_1.User.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new errors_1.UnauthorizedError('User not found');
        }
        if (user.status !== 'active') {
            throw new errors_1.UnauthorizedError('Account is not active');
        }
        user.lastLoginAt = new Date();
        user.metadata.loginCount += 1;
        await user.save();
        const tokens = this.generateTokens(user);
        await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
        return { user, tokens };
    }
    async refreshTokens(refreshToken) {
        const config = (0, config_1.getConfig)();
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(refreshToken, config.JWT_REFRESH_SECRET);
        }
        catch {
            throw new errors_1.UnauthorizedError('Invalid refresh token');
        }
        const storedToken = await this.getStoredRefreshToken(decoded.userId);
        if (storedToken !== refreshToken) {
            await this.revokeAllTokens(decoded.userId);
            throw new errors_1.UnauthorizedError('Refresh token reuse detected');
        }
        const user = await user_model_1.User.findById(decoded.userId);
        if (!user || user.status !== 'active') {
            throw new errors_1.UnauthorizedError('User not found or inactive');
        }
        if (user.tokenVersion !== decoded.tokenVersion) {
            throw new errors_1.UnauthorizedError('Token version mismatch');
        }
        const tokens = this.generateTokens(user);
        await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        await this.revokeAllTokens(userId);
        await user_model_1.User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
    }
    generateTokens(user) {
        const config = (0, config_1.getConfig)();
        const accessPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            firebaseUid: user.firebaseUid,
        };
        const refreshPayload = {
            userId: user._id.toString(),
            tokenVersion: user.tokenVersion,
        };
        const accessToken = jsonwebtoken_1.default.sign(accessPayload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_EXPIRY,
        });
        const refreshToken = jsonwebtoken_1.default.sign(refreshPayload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_EXPIRY,
        });
        return {
            accessToken,
            refreshToken,
            expiresIn: config.JWT_ACCESS_EXPIRY,
        };
    }
    async storeRefreshToken(userId, token) {
        const redis = (0, redis_1.getRedisClient)();
        await redis.set(`refresh_token:${userId}`, token, 'EX', 7 * 24 * 60 * 60);
    }
    async getStoredRefreshToken(userId) {
        const redis = (0, redis_1.getRedisClient)();
        return redis.get(`refresh_token:${userId}`);
    }
    async revokeAllTokens(userId) {
        const redis = (0, redis_1.getRedisClient)();
        await redis.del(`refresh_token:${userId}`);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map