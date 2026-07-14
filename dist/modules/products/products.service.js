"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_model_1 = require("../../models/category.model");
const inventory_model_1 = require("../../models/inventory.model");
const product_model_1 = require("../../models/product.model");
const product_variant_model_1 = require("../../models/product-variant.model");
const errors_1 = require("../../shared/errors");
const pagination_1 = require("../../shared/utils/pagination");
class ProductsService {
    async listProducts(query) {
        const { page, limit, sortBy, sortOrder, categoryId, brandId, status, search, minPrice, maxPrice, isFeatured, includeColors } = query;
        const filter = {};
        if (categoryId) {
            const catObjectId = new mongoose_1.default.Types.ObjectId(categoryId);
            // Match this category OR any of its descendants, so browsing a top-level
            // category lists every product beneath it (products are assigned to leaf
            // sub-categories, not parents).
            const descendants = await category_model_1.Category.find({ ancestors: catObjectId }, { _id: 1 }).lean();
            filter.categoryId =
                descendants.length > 0
                    ? { $in: [catObjectId, ...descendants.map((d) => d._id)] }
                    : catObjectId;
        }
        if (brandId) {
            filter.brandId = new mongoose_1.default.Types.ObjectId(brandId);
        }
        if (status) {
            filter.status = status;
        }
        else {
            filter.status = { $ne: 'archived' };
        }
        if (isFeatured !== undefined) {
            filter.isFeatured = isFeatured;
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.basePrice = {};
            if (minPrice !== undefined) {
                filter.basePrice.$gte = minPrice;
            }
            if (maxPrice !== undefined) {
                filter.basePrice.$lte = maxPrice;
            }
        }
        if (search) {
            filter.$text = { $search: search };
        }
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }
        const skip = (0, pagination_1.getSkipValue)(page, limit);
        const [products, total] = await Promise.all([
            product_model_1.Product.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .populate('categoryId', 'name slug')
                .populate('brandId', 'name slug')
                .lean(),
            product_model_1.Product.countDocuments(filter),
        ]);
        if (includeColors && products.length > 0) {
            const productIds = products.map((p) => p._id);
            const colorAgg = await product_variant_model_1.ProductVariant.aggregate([
                { $match: { productId: { $in: productIds }, isActive: true } },
                { $sort: { sortOrder: 1 } },
                { $unwind: '$attributes' },
                { $match: { 'attributes.name': 'Color' } },
                { $group: { _id: '$productId', colors: { $addToSet: '$attributes.value' } } },
            ]);
            const colorMap = new Map(colorAgg.map((c) => [String(c._id), c.colors]));
            for (const p of products) {
                p.colors = colorMap.get(String(p._id)) ?? [];
            }
        }
        return (0, pagination_1.buildPaginatedResponse)(products, total, page, limit);
    }
    async getProductByIdOrSlug(idOrSlug) {
        const isObjectId = /^[a-f\d]{24}$/i.test(idOrSlug);
        const filter = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };
        const product = await product_model_1.Product.findOne(filter)
            .populate('categoryId', 'name slug')
            .populate('brandId', 'name slug')
            .lean();
        if (!product) {
            throw new errors_1.NotFoundError('Product not found');
        }
        const variants = await product_variant_model_1.ProductVariant.find({
            productId: product._id,
            isActive: true,
        })
            .sort({ sortOrder: 1 })
            .lean();
        return { ...product, variants };
    }
    async createProduct(dto) {
        const slug = dto.slug || this.generateSlug(dto.name);
        const existingProduct = await product_model_1.Product.findOne({ slug }).lean();
        if (existingProduct) {
            throw new errors_1.ConflictError('A product with this slug already exists');
        }
        if (dto.salePrice !== undefined && dto.salePrice >= dto.basePrice) {
            throw new errors_1.BadRequestError('Sale price must be less than base price');
        }
        const productData = {
            ...dto,
            slug,
            categoryId: new mongoose_1.default.Types.ObjectId(dto.categoryId),
            brandId: dto.brandId ? new mongoose_1.default.Types.ObjectId(dto.brandId) : undefined,
            publishedAt: dto.status === 'active' ? new Date() : undefined,
        };
        const product = await product_model_1.Product.create(productData);
        return product.toJSON();
    }
    async updateProduct(id, dto) {
        const product = await product_model_1.Product.findById(id);
        if (!product) {
            throw new errors_1.NotFoundError('Product not found');
        }
        if (product.status === 'archived') {
            throw new errors_1.BadRequestError('Cannot update an archived product');
        }
        if (dto.slug && dto.slug !== product.slug) {
            const existingProduct = await product_model_1.Product.findOne({ slug: dto.slug, _id: { $ne: id } }).lean();
            if (existingProduct) {
                throw new errors_1.ConflictError('A product with this slug already exists');
            }
        }
        const effectiveBasePrice = dto.basePrice ?? product.basePrice;
        const effectiveSalePrice = dto.salePrice !== undefined ? dto.salePrice : product.salePrice;
        if (effectiveSalePrice !== undefined && effectiveSalePrice >= effectiveBasePrice) {
            throw new errors_1.BadRequestError('Sale price must be less than base price');
        }
        const updateData = { ...dto };
        if (dto.categoryId) {
            updateData.categoryId = new mongoose_1.default.Types.ObjectId(dto.categoryId);
        }
        if (dto.brandId) {
            updateData.brandId = new mongoose_1.default.Types.ObjectId(dto.brandId);
        }
        if (dto.status === 'active' && product.status !== 'active') {
            updateData.publishedAt = new Date();
        }
        const updated = await product_model_1.Product.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })
            .populate('categoryId', 'name slug')
            .populate('brandId', 'name slug')
            .lean();
        if (!updated) {
            throw new errors_1.NotFoundError('Product not found');
        }
        return updated;
    }
    async deleteProduct(id) {
        const product = await product_model_1.Product.findById(id);
        if (!product) {
            throw new errors_1.NotFoundError('Product not found');
        }
        if (product.status === 'archived') {
            throw new errors_1.BadRequestError('Product is already archived');
        }
        await product_model_1.Product.findByIdAndUpdate(id, { $set: { status: 'archived' } });
        await product_variant_model_1.ProductVariant.updateMany({ productId: id }, { $set: { isActive: false } });
    }
    async listVariants(productId) {
        const product = await product_model_1.Product.findById(productId).lean();
        if (!product) {
            throw new errors_1.NotFoundError('Product not found');
        }
        const variants = await product_variant_model_1.ProductVariant.find({ productId })
            .sort({ sortOrder: 1 })
            .lean();
        return variants;
    }
    async createVariant(productId, dto) {
        const product = await product_model_1.Product.findById(productId);
        if (!product) {
            throw new errors_1.NotFoundError('Product not found');
        }
        if (product.status === 'archived') {
            throw new errors_1.BadRequestError('Cannot add variants to an archived product');
        }
        const existingSku = await product_variant_model_1.ProductVariant.findOne({ sku: dto.sku.toUpperCase() }).lean();
        if (existingSku) {
            throw new errors_1.ConflictError(`A variant with SKU "${dto.sku}" already exists`);
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const variant = await product_variant_model_1.ProductVariant.create([
                {
                    ...dto,
                    productId: new mongoose_1.default.Types.ObjectId(productId),
                    sku: dto.sku.toUpperCase(),
                },
            ], { session });
            await inventory_model_1.Inventory.create([
                {
                    productId: new mongoose_1.default.Types.ObjectId(productId),
                    variantId: variant[0]._id,
                    sku: dto.sku.toUpperCase(),
                    stock: dto.stock,
                    reservedStock: 0,
                    availableStock: dto.stock,
                    lowStockThreshold: 10,
                    isLowStock: dto.stock <= 10,
                    logs: [
                        {
                            type: 'restock',
                            quantity: dto.stock,
                            previousStock: 0,
                            newStock: dto.stock,
                            note: 'Initial stock on variant creation',
                            createdAt: new Date(),
                        },
                    ],
                },
            ], { session });
            if (!product.hasVariants) {
                await product_model_1.Product.findByIdAndUpdate(productId, { $set: { hasVariants: true } }, { session });
            }
            const totalStock = await product_variant_model_1.ProductVariant.aggregate([
                { $match: { productId: new mongoose_1.default.Types.ObjectId(productId), isActive: true } },
                { $group: { _id: null, total: { $sum: '$stock' } } },
            ]).session(session);
            const newTotalStock = (totalStock[0]?.total ?? 0) + dto.stock;
            await product_model_1.Product.findByIdAndUpdate(productId, { $set: { totalStock: newTotalStock } }, { session });
            await session.commitTransaction();
            return variant[0].toJSON();
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async updateVariant(productId, variantId, dto) {
        const variant = await product_variant_model_1.ProductVariant.findOne({ _id: variantId, productId });
        if (!variant)
            throw new errors_1.NotFoundError('Variant not found');
        const prevStock = variant.stock;
        Object.assign(variant, dto);
        await variant.save();
        if (dto.stock !== undefined && dto.stock !== prevStock) {
            const totalStock = await product_variant_model_1.ProductVariant.aggregate([
                { $match: { productId: new mongoose_1.default.Types.ObjectId(productId), isActive: true } },
                { $group: { _id: null, total: { $sum: '$stock' } } },
            ]);
            await product_model_1.Product.findByIdAndUpdate(productId, { $set: { totalStock: totalStock[0]?.total ?? 0 } });
            await inventory_model_1.Inventory.findOneAndUpdate({ variantId }, {
                $set: { stock: dto.stock, availableStock: dto.stock, isLowStock: dto.stock <= 10 },
                $push: {
                    logs: {
                        type: dto.stock > prevStock ? 'restock' : 'adjustment',
                        quantity: Math.abs(dto.stock - prevStock),
                        previousStock: prevStock,
                        newStock: dto.stock,
                        note: 'Updated via admin panel',
                        createdAt: new Date(),
                    },
                },
            });
        }
        return variant.toJSON();
    }
    async deleteVariant(productId, variantId) {
        const variant = await product_variant_model_1.ProductVariant.findOne({ _id: variantId, productId });
        if (!variant)
            throw new errors_1.NotFoundError('Variant not found');
        await variant.deleteOne();
        await inventory_model_1.Inventory.deleteMany({ variantId });
        const remaining = await product_variant_model_1.ProductVariant.countDocuments({ productId, isActive: true });
        const totalStock = await product_variant_model_1.ProductVariant.aggregate([
            { $match: { productId: new mongoose_1.default.Types.ObjectId(productId), isActive: true } },
            { $group: { _id: null, total: { $sum: '$stock' } } },
        ]);
        await product_model_1.Product.findByIdAndUpdate(productId, {
            $set: {
                hasVariants: remaining > 0,
                totalStock: totalStock[0]?.total ?? 0,
            },
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map