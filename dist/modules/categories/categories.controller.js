"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const categories_service_1 = require("./categories.service");
class CategoriesController {
    categoriesService;
    constructor() {
        this.categoriesService = new categories_service_1.CategoriesService();
    }
    list = async (req, res) => {
        const result = await this.categoriesService.list(req.query);
        if (Array.isArray(result)) {
            res.status(200).json({
                success: true,
                data: { categories: result },
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: {
                    categories: result.data,
                    pagination: result.pagination,
                },
            });
        }
    };
    getByIdOrSlug = async (req, res) => {
        const { idOrSlug } = req.params;
        const { category, children } = await this.categoriesService.getByIdOrSlug(idOrSlug);
        res.status(200).json({
            success: true,
            data: { category, children },
        });
    };
    create = async (_req, res) => {
        const category = await this.categoriesService.create(_req.body);
        res.status(201).json({
            success: true,
            data: { category },
            message: 'Category created successfully',
        });
    };
    update = async (_req, res) => {
        const { id } = _req.params;
        const category = await this.categoriesService.update(id, _req.body);
        res.status(200).json({
            success: true,
            data: { category },
            message: 'Category updated successfully',
        });
    };
    delete = async (_req, res) => {
        const { id } = _req.params;
        await this.categoriesService.softDelete(id);
        res.status(200).json({
            success: true,
            message: 'Category deactivated successfully',
        });
    };
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map