"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannersController = void 0;
const banners_service_1 = require("./banners.service");
const banners_dto_1 = require("./banners.dto");
class BannersController {
    service;
    constructor() {
        this.service = new banners_service_1.BannersService();
    }
    /** Public listing: returns only active banners within valid date range */
    list = async (req, res) => {
        const filters = banners_dto_1.listBannersQueryDto.parse(req.query);
        const result = await this.service.list({ ...filters, publicOnly: true });
        res.json({ success: true, data: result });
    };
    /** Admin listing: returns all banners regardless of status/dates */
    adminList = async (req, res) => {
        const filters = banners_dto_1.listBannersQueryDto.parse(req.query);
        const result = await this.service.list(filters);
        res.json({ success: true, data: result });
    };
    getById = async (req, res) => {
        const banner = await this.service.getById(req.params.id);
        res.json({ success: true, data: banner });
    };
    create = async (req, res) => {
        const banner = await this.service.create(req.body);
        res.status(201).json({ success: true, data: banner });
    };
    update = async (req, res) => {
        const banner = await this.service.update(req.params.id, req.body);
        res.json({ success: true, data: banner });
    };
    delete = async (req, res) => {
        await this.service.delete(req.params.id);
        res.json({ success: true, message: 'Banner deleted' });
    };
}
exports.BannersController = BannersController;
//# sourceMappingURL=banners.controller.js.map