"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const orders_service_1 = require("./orders.service");
const orders_dto_1 = require("./orders.dto");
class OrdersController {
    service;
    constructor() {
        this.service = new orders_service_1.OrdersService();
    }
    create = async (req, res) => {
        const authReq = req;
        const data = orders_dto_1.createOrderDto.parse(req.body);
        const order = await this.service.createOrder(authReq.user.id, data);
        res.status(201).json({ success: true, data: order });
    };
    myOrders = async (req, res) => {
        const authReq = req;
        const query = orders_dto_1.listOrdersQueryDto.parse(req.query);
        const result = await this.service.listByUser(authReq.user.id, query);
        res.json({ success: true, data: result });
    };
    myOrderDetail = async (req, res) => {
        const authReq = req;
        const order = await this.service.getByIdForUser(req.params.id, authReq.user.id);
        res.json({ success: true, data: order });
    };
    list = async (req, res) => {
        const query = orders_dto_1.listOrdersQueryDto.parse(req.query);
        const result = await this.service.list(query);
        res.json({ success: true, data: result });
    };
    getOne = async (req, res) => {
        const order = await this.service.getById(req.params.id);
        res.json({ success: true, data: order });
    };
    updateStatus = async (req, res) => {
        const data = orders_dto_1.updateOrderStatusDto.parse(req.body);
        const authReq = req;
        const order = await this.service.updateStatus(req.params.id, data, authReq.user?.id || 'system');
        res.json({ success: true, data: order });
    };
    cancel = async (req, res) => {
        const { reason } = orders_dto_1.cancelOrderDto.parse(req.body);
        const authReq = req;
        const order = await this.service.cancel(req.params.id, reason, authReq.user?.id || 'system');
        res.json({ success: true, data: order });
    };
    stats = async (_req, res) => {
        const stats = await this.service.getStats();
        res.json({ success: true, data: stats });
    };
}
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map