"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const inventory_service_1 = require("./inventory.service");
const inventory_dto_1 = require("./inventory.dto");
class InventoryController {
    service;
    constructor() {
        this.service = new inventory_service_1.InventoryService();
    }
    list = async (req, res) => {
        const query = inventory_dto_1.listInventoryQueryDto.parse(req.query);
        const result = await this.service.list(query);
        res.json({ success: true, data: result });
    };
    getOne = async (req, res) => {
        const inventory = await this.service.getById(req.params.id);
        res.json({ success: true, data: inventory });
    };
    adjustStock = async (req, res) => {
        const data = inventory_dto_1.adjustStockDto.parse(req.body);
        const authReq = req;
        const inventory = await this.service.adjustStock(req.params.id, data, authReq.user?.id);
        res.json({ success: true, data: inventory });
    };
    lowStock = async (_req, res) => {
        const items = await this.service.getLowStock();
        res.json({ success: true, data: items });
    };
    summary = async (_req, res) => {
        const stats = await this.service.getSummary();
        res.json({ success: true, data: stats });
    };
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map