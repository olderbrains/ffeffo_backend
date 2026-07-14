"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsController = void 0;
const pagination_1 = require("../../shared/utils/pagination");
const coupons_service_1 = require("./coupons.service");
const coupons_dto_1 = require("./coupons.dto");
class CouponsController {
    service;
    constructor() {
        this.service = new coupons_service_1.CouponsService();
    }
    list = async (req, res) => {
        const { page, limit } = pagination_1.paginationSchema.parse(req.query);
        const status = req.query.status;
        const type = req.query.type;
        const result = await this.service.list({ page, limit, status, type });
        res.json({ success: true, data: result });
    };
    getOne = async (req, res) => {
        const coupon = await this.service.getById(req.params.id);
        res.json({ success: true, data: coupon });
    };
    create = async (req, res) => {
        const data = coupons_dto_1.createCouponDto.parse(req.body);
        const authReq = req;
        const coupon = await this.service.create(data, authReq.user?.id || 'system');
        res.status(201).json({ success: true, data: coupon });
    };
    update = async (req, res) => {
        const data = coupons_dto_1.updateCouponDto.parse(req.body);
        const coupon = await this.service.update(req.params.id, data);
        res.json({ success: true, data: coupon });
    };
    delete = async (req, res) => {
        await this.service.deactivate(req.params.id);
        res.json({ success: true, message: 'Coupon deactivated' });
    };
    validate = async (req, res) => {
        const { code, orderAmount } = coupons_dto_1.validateCouponDto.parse(req.body);
        const result = await this.service.validate(code, orderAmount);
        res.json({ success: true, data: result });
    };
}
exports.CouponsController = CouponsController;
//# sourceMappingURL=coupons.controller.js.map