"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_model_1 = require("../../models/user.model");
const errors_1 = require("../../shared/errors");
const users_service_1 = require("./users.service");
class UsersController {
    usersService;
    constructor() {
        this.usersService = new users_service_1.UsersService();
    }
    list = async (req, res) => {
        const query = req.query;
        const result = await this.usersService.listUsers(query);
        res.status(200).json({
            success: true,
            data: {
                users: result.data,
                pagination: result.pagination,
            },
        });
    };
    getById = async (req, res) => {
        const id = req.params.id;
        const user = await this.usersService.getUserById(id);
        res.status(200).json({
            success: true,
            data: { user },
        });
    };
    getProfile = async (req, res) => {
        const user = await user_model_1.User.findById(req.user.id).select('-tokenVersion -__v');
        if (!user) {
            throw new errors_1.NotFoundError('User not found');
        }
        res.status(200).json({
            success: true,
            data: { user },
        });
    };
    updateProfile = async (req, res) => {
        const allowedFields = ['firstName', 'lastName', 'phone', 'avatar'];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }
        const user = await user_model_1.User.findByIdAndUpdate(req.user.id, updates, {
            new: true,
            runValidators: true,
        }).select('-tokenVersion -__v');
        if (!user) {
            throw new errors_1.NotFoundError('User not found');
        }
        res.status(200).json({
            success: true,
            data: { user },
            message: 'Profile updated successfully',
        });
    };
    deactivateAccount = async (req, res) => {
        await user_model_1.User.findByIdAndUpdate(req.user.id, { status: 'deactivated' });
        res.status(200).json({
            success: true,
            message: 'Account deactivated successfully',
        });
    };
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map