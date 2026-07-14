"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
class AnalyticsController {
    service;
    constructor() {
        this.service = new analytics_service_1.AnalyticsService();
    }
    dashboard = async (_req, res) => {
        const data = await this.service.getDashboard();
        res.json({ success: true, data });
    };
    revenue = async (req, res) => {
        const period = req.query.period || 'daily';
        const validPeriods = ['daily', 'weekly', 'monthly'];
        const data = await this.service.getRevenue(validPeriods.includes(period) ? period : 'daily');
        res.json({ success: true, data });
    };
    orderStats = async (_req, res) => {
        const data = await this.service.getOrderStats();
        res.json({ success: true, data });
    };
    topProducts = async (req, res) => {
        const limit = Math.min(Number(req.query.limit) || 10, 50);
        const data = await this.service.getTopProducts(limit);
        res.json({ success: true, data });
    };
}
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analytics.controller.js.map