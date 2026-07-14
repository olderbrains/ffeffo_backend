"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const settings_service_1 = require("./settings.service");

class SettingsController {
    constructor() {
        this.service = new settings_service_1.SettingsService();
    }

    list = async (req, res) => {
        const { group } = req.query;
        const settings = group
            ? await this.service.getByGroup(group)
            : await this.service.getAll();
        res.json({ success: true, data: settings });
    };

    get = async (req, res) => {
        const value = await this.service.get(req.params.key);
        if (value === null) {
            return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Setting not found' } });
        }
        res.json({ success: true, data: { key: req.params.key, value } });
    };

    upsert = async (req, res) => {
        const { key, value, group, description } = req.body;
        if (!key || value === undefined || !group) {
            return res.status(400).json({ success: false, error: { code: 'VALIDATION', message: 'key, value, and group are required' } });
        }
        const setting = await this.service.upsert(key, value, group, description, req.user?.id);
        res.json({ success: true, data: setting });
    };

    bulkUpsert = async (req, res) => {
        const { settings } = req.body;
        if (!Array.isArray(settings) || settings.length === 0) {
            return res.status(400).json({ success: false, error: { code: 'VALIDATION', message: 'settings array is required' } });
        }
        const result = await this.service.bulkUpsert(settings, req.user?.id);
        res.json({ success: true, data: result });
    };
}

exports.SettingsController = SettingsController;
