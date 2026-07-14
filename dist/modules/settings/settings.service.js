"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const settings_model_1 = require("../../models/settings.model");

class SettingsService {
    async getAll() {
        return settings_model_1.Settings.find({}).lean();
    }

    async getByGroup(group) {
        return settings_model_1.Settings.find({ group }).lean();
    }

    async get(key) {
        const setting = await settings_model_1.Settings.findOne({ key }).lean();
        return setting ? setting.value : null;
    }

    async upsert(key, value, group, description, userId) {
        return settings_model_1.Settings.findOneAndUpdate(
            { key },
            { $set: { value, group, description, updatedBy: userId, updatedAt: new Date() } },
            { upsert: true, new: true, lean: true }
        );
    }

    async bulkUpsert(settings, userId) {
        const ops = settings.map(s => ({
            updateOne: {
                filter: { key: s.key },
                update: { $set: { value: s.value, group: s.group, description: s.description || '', updatedBy: userId, updatedAt: new Date() } },
                upsert: true,
            }
        }));
        await settings_model_1.Settings.bulkWrite(ops);
        return this.getAll();
    }
}

exports.SettingsService = SettingsService;
