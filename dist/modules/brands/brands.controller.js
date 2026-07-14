"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandsController = void 0;
const pagination_1 = require("../../shared/utils/pagination");
const brands_service_1 = require("./brands.service");
const brands_dto_1 = require("./brands.dto");
class BrandsController {
    service;
    constructor() {
        this.service = new brands_service_1.BrandsService();
    }
    list = async (req, res) => {
        const { page, limit } = pagination_1.paginationSchema.parse(req.query);
        const isActive = req.query.isActive === 'true' ? true : req.query.isActive === 'false' ? false : undefined;
        const search = req.query.search;
        const result = await this.service.list({ page, limit, isActive, search });
        res.json({ success: true, data: result });
    };
    getOne = async (req, res) => {
        const brand = await this.service.getByIdOrSlug(req.params.idOrSlug);
        res.json({ success: true, data: brand });
    };
    create = async (req, res) => {
        const data = brands_dto_1.createBrandDto.parse(req.body);
        const brand = await this.service.create(data);
        res.status(201).json({ success: true, data: brand });
    };
    update = async (req, res) => {
        const data = brands_dto_1.updateBrandDto.parse(req.body);
        const brand = await this.service.update(req.params.id, data);
        res.json({ success: true, data: brand });
    };
    delete = async (req, res) => {
        await this.service.delete(req.params.id);
        res.json({ success: true, message: 'Brand deactivated' });
    };
}
exports.BrandsController = BrandsController;
//# sourceMappingURL=brands.controller.js.map