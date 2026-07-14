"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const products_service_1 = require("./products.service");
class ProductsController {
    productsService;
    constructor() {
        this.productsService = new products_service_1.ProductsService();
    }
    listProducts = async (req, res) => {
        const query = req.query;
        const result = await this.productsService.listProducts(query);
        res.status(200).json({
            success: true,
            data: {
                items: result.data,
                pagination: result.pagination,
            },
        });
    };
    getProduct = async (req, res) => {
        const idOrSlug = req.params.idOrSlug;
        const product = await this.productsService.getProductByIdOrSlug(idOrSlug);
        res.status(200).json({
            success: true,
            data: product,
        });
    };
    createProduct = async (req, res) => {
        const dto = req.body;
        const product = await this.productsService.createProduct(dto);
        res.status(201).json({
            success: true,
            data: product,
            message: 'Product created successfully',
        });
    };
    updateProduct = async (req, res) => {
        const id = req.params.id;
        const dto = req.body;
        const product = await this.productsService.updateProduct(id, dto);
        res.status(200).json({
            success: true,
            data: product,
            message: 'Product updated successfully',
        });
    };
    deleteProduct = async (req, res) => {
        const id = req.params.id;
        await this.productsService.deleteProduct(id);
        res.status(200).json({
            success: true,
            message: 'Product archived successfully',
        });
    };
    listVariants = async (req, res) => {
        const id = req.params.id;
        const variants = await this.productsService.listVariants(id);
        res.status(200).json({
            success: true,
            data: { items: variants },
        });
    };
    createVariant = async (req, res) => {
        const id = req.params.id;
        const dto = req.body;
        const variant = await this.productsService.createVariant(id, dto);
        res.status(201).json({
            success: true,
            data: variant,
            message: 'Variant created successfully',
        });
    };
    updateVariant = async (req, res) => {
        const { id, variantId } = req.params;
        const dto = req.body;
        const variant = await this.productsService.updateVariant(id, variantId, dto);
        res.status(200).json({
            success: true,
            data: variant,
            message: 'Variant updated successfully',
        });
    };
    deleteVariant = async (req, res) => {
        const { id, variantId } = req.params;
        await this.productsService.deleteVariant(id, variantId);
        res.status(200).json({
            success: true,
            message: 'Variant deleted successfully',
        });
    };
}
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map