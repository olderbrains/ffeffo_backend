"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    authService;
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    register = async (req, res) => {
        const { user, tokens } = await this.authService.register(req.body);
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    avatar: user.avatar,
                },
                tokens,
            },
            message: 'Registration successful',
        });
    };
    login = async (req, res) => {
        const { user, tokens } = await this.authService.login(req.body.firebaseToken);
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    avatar: user.avatar,
                },
                tokens,
            },
            message: 'Login successful',
        });
    };
    devLogin = async (req, res) => {
        const { user, tokens } = await this.authService.devLogin(req.body.email);
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    avatar: user.avatar,
                },
                tokens,
            },
            message: 'Dev login successful',
        });
    };
    refresh = async (req, res) => {
        const tokens = await this.authService.refreshTokens(req.body.refreshToken);
        res.status(200).json({
            success: true,
            data: { tokens },
        });
    };
    logout = async (req, res) => {
        await this.authService.logout(req.user.id);
        res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map