"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_model_1 = require("../../models/category.model");
const constants_1 = require("../../shared/constants");
const errors_1 = require("../../shared/errors");
const cache_1 = require("../../shared/utils/cache");
const pagination_1 = require("../../shared/utils/pagination");
class CategoriesService {
    async list(query) {
        if (query.tree) {
            return this.buildTree(query);
        }
        const filter = {};
        if (query.parentId !== undefined) {
            filter.parentId = query.parentId === null ? null : new mongoose_1.default.Types.ObjectId(query.parentId);
        }
        if (query.isActive !== undefined) {
            filter.isActive = query.isActive;
        }
        if (query.level !== undefined) {
            filter.level = query.level;
        }
        const sortField = query.sortBy || 'sortOrder';
        const sortDirection = query.sortOrder === 'asc' ? 1 : -1;
        const [categories, total] = await Promise.all([
            category_model_1.Category.find(filter)
                .sort({ [sortField]: sortDirection })
                .skip((0, pagination_1.getSkipValue)(query.page, query.limit))
                .limit(query.limit)
                .lean(),
            category_model_1.Category.countDocuments(filter),
        ]);
        return (0, pagination_1.buildPaginatedResponse)(categories, total, query.page, query.limit);
    }
    async getByIdOrSlug(idOrSlug) {
        const isObjectId = /^[a-f\d]{24}$/i.test(idOrSlug);
        const category = await category_model_1.Category.findOne(isObjectId ? { _id: idOrSlug } : { slug: idOrSlug }).lean();
        if (!category) {
            throw new errors_1.NotFoundError('Category not found');
        }
        const children = await category_model_1.Category.find({
            parentId: category._id,
            isActive: true,
        })
            .sort({ sortOrder: 1 })
            .lean();
        return { category, children };
    }
    async create(dto) {
        const existingSlug = await category_model_1.Category.findOne({ slug: dto.slug }).lean();
        if (existingSlug) {
            throw new errors_1.ConflictError('Category with this slug already exists');
        }
        let ancestors = [];
        let level = 0;
        if (dto.parentId) {
            const parent = await category_model_1.Category.findById(dto.parentId).lean();
            if (!parent) {
                throw new errors_1.BadRequestError('Parent category not found');
            }
            if (!parent.isActive) {
                throw new errors_1.BadRequestError('Cannot create a subcategory under an inactive parent');
            }
            ancestors = [...parent.ancestors, parent._id];
            level = parent.level + 1;
        }
        const category = await category_model_1.Category.create({
            name: dto.name,
            slug: dto.slug,
            description: dto.description,
            image: dto.image,
            parentId: dto.parentId ? new mongoose_1.default.Types.ObjectId(dto.parentId) : null,
            ancestors,
            level,
            sortOrder: dto.sortOrder,
            isActive: dto.isActive,
            seo: dto.seo || {},
            productCount: 0,
        });
        await cache_1.cache.invalidatePattern('categories:*');
        return category.toJSON();
    }
    async update(id, dto) {
        const category = await category_model_1.Category.findById(id);
        if (!category) {
            throw new errors_1.NotFoundError('Category not found');
        }
        if (dto.slug && dto.slug !== category.slug) {
            const existingSlug = await category_model_1.Category.findOne({ slug: dto.slug, _id: { $ne: id } }).lean();
            if (existingSlug) {
                throw new errors_1.ConflictError('Category with this slug already exists');
            }
        }
        if (dto.parentId !== undefined && String(dto.parentId) !== String(category.parentId)) {
            if (dto.parentId === null) {
                category.parentId = undefined;
                category.ancestors = [];
                category.level = 0;
            }
            else {
                if (dto.parentId === id) {
                    throw new errors_1.BadRequestError('Category cannot be its own parent');
                }
                const parent = await category_model_1.Category.findById(dto.parentId).lean();
                if (!parent) {
                    throw new errors_1.BadRequestError('Parent category not found');
                }
                const wouldCreateCycle = parent.ancestors.some((ancestorId) => ancestorId.toString() === id);
                if (wouldCreateCycle) {
                    throw new errors_1.BadRequestError('Moving this category would create a circular reference');
                }
                category.parentId = new mongoose_1.default.Types.ObjectId(dto.parentId);
                category.ancestors = [...parent.ancestors, parent._id];
                category.level = parent.level + 1;
            }
            await this.updateDescendantAncestors(category);
        }
        if (dto.name !== undefined)
            category.name = dto.name;
        if (dto.slug !== undefined)
            category.slug = dto.slug;
        if (dto.description !== undefined)
            category.description = dto.description ?? undefined;
        if (dto.image !== undefined)
            category.image = dto.image ?? undefined;
        if (dto.sortOrder !== undefined)
            category.sortOrder = dto.sortOrder;
        if (dto.isActive !== undefined)
            category.isActive = dto.isActive;
        if (dto.seo !== undefined) {
            category.seo = {
                title: dto.seo.title ?? undefined,
                description: dto.seo.description ?? undefined,
                keywords: dto.seo.keywords,
            };
        }
        await category.save();
        await cache_1.cache.invalidatePattern('categories:*');
        return category.toJSON();
    }
    async softDelete(id) {
        const category = await category_model_1.Category.findById(id);
        if (!category) {
            throw new errors_1.NotFoundError('Category not found');
        }
        const activeChildCount = await category_model_1.Category.countDocuments({
            parentId: id,
            isActive: true,
        });
        if (activeChildCount > 0) {
            throw new errors_1.BadRequestError('Cannot deactivate a category with active subcategories. Deactivate children first.');
        }
        category.isActive = false;
        await category.save();
        await cache_1.cache.invalidatePattern('categories:*');
    }
    async buildTree(query) {
        const cacheKey = `categories:tree:${query.isActive ?? 'all'}`;
        return cache_1.cache.getOrSet(cacheKey, constants_1.CACHE_TTL.CATEGORY_TREE, async () => {
            return this.buildTreeFromDb(query);
        });
    }
    async buildTreeFromDb(query) {
        const filter = {};
        if (query.isActive !== undefined) {
            filter.isActive = query.isActive;
        }
        const allCategories = await category_model_1.Category.find(filter)
            .sort({ sortOrder: 1 })
            .lean();
        const categoryMap = new Map();
        const roots = [];
        for (const cat of allCategories) {
            categoryMap.set(cat._id.toString(), {
                _id: cat._id.toString(),
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                image: cat.image,
                parentId: cat.parentId ? cat.parentId.toString() : null,
                level: cat.level,
                sortOrder: cat.sortOrder,
                isActive: cat.isActive,
                seo: cat.seo,
                productCount: cat.productCount,
                children: [],
            });
        }
        for (const node of categoryMap.values()) {
            if (node.parentId && categoryMap.has(node.parentId)) {
                categoryMap.get(node.parentId).children.push(node);
            }
            else {
                roots.push(node);
            }
        }
        return roots;
    }
    async updateDescendantAncestors(parentCategory) {
        const descendants = await category_model_1.Category.find({
            ancestors: parentCategory._id,
        });
        for (const descendant of descendants) {
            const parentIndex = descendant.ancestors.findIndex((a) => a.toString() === parentCategory._id.toString());
            if (parentIndex !== -1) {
                descendant.ancestors = [
                    ...parentCategory.ancestors,
                    parentCategory._id,
                    ...descendant.ancestors.slice(parentIndex + 1),
                ];
                descendant.level = descendant.ancestors.length;
                await descendant.save();
            }
        }
    }
}
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map