"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const brand_model_1 = require("../../models/brand.model");
const category_model_1 = require("../../models/category.model");
const product_model_1 = require("../../models/product.model");
function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
class SearchService {
    async search(query, productLimit = 8) {
        const trimmed = query.trim();
        if (!trimmed)
            return { products: [], categories: [], brands: [], total: 0 };
        const safe = escapeRegex(trimmed);
        const containsRegex = new RegExp(safe, 'i');
        // Products: combine $text (word-level, ranked) with regex fallback for partial matches.
        // Run both in parallel then merge, deduplicating by _id.
        const [textHits, regexHits, categories, brands] = await Promise.all([
            // $text gives word-boundary match with relevance score
            product_model_1.Product.aggregate([
                { $match: { $text: { $search: trimmed }, status: 'active' } },
                { $addFields: { score: { $meta: 'textScore' } } },
                { $sort: { score: -1 } },
                { $limit: productLimit },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categoryId',
                        foreignField: '_id',
                        as: 'categoryId',
                        pipeline: [{ $project: { name: 1, slug: 1 } }],
                    },
                },
                {
                    $lookup: {
                        from: 'brands',
                        localField: 'brandId',
                        foreignField: '_id',
                        as: 'brandId',
                        pipeline: [{ $project: { name: 1, slug: 1 } }],
                    },
                },
                { $addFields: { categoryId: { $arrayElemAt: ['$categoryId', 0] }, brandId: { $arrayElemAt: ['$brandId', 0] } } },
                { $project: { name: 1, slug: 1, images: 1, basePrice: 1, salePrice: 1, categoryId: 1, brandId: 1, score: 1 } },
            ]),
            // Regex catches partial matches missed by word-boundary $text (e.g. "per" → "perfume")
            product_model_1.Product.find({
                status: 'active',
                $or: [{ name: containsRegex }, { tags: containsRegex }, { shortDescription: containsRegex }],
            })
                .select('name slug images basePrice salePrice categoryId brandId')
                .populate('categoryId', 'name slug')
                .populate('brandId', 'name slug')
                .limit(productLimit)
                .lean(),
            category_model_1.Category.find({ isActive: true, name: containsRegex })
                .select('name slug image productCount')
                .limit(5)
                .lean(),
            brand_model_1.Brand.find({ isActive: true, $or: [{ name: containsRegex }, { description: containsRegex }] })
                .select('name slug logo')
                .limit(5)
                .lean(),
        ]);
        // Merge text hits first (better relevance), then append any regex-only hits
        const seen = new Set();
        const products = [];
        for (const p of textHits) {
            const id = String(p._id);
            seen.add(id);
            products.push({
                _id: id,
                name: p.name,
                slug: p.slug,
                image: p.images?.[0]?.url,
                basePrice: p.basePrice,
                salePrice: p.salePrice,
                category: p.categoryId ? { name: p.categoryId.name, slug: p.categoryId.slug } : undefined,
                brand: p.brandId ? { name: p.brandId.name, slug: p.brandId.slug } : undefined,
            });
            if (products.length >= productLimit)
                break;
        }
        for (const p of regexHits) {
            if (products.length >= productLimit)
                break;
            const id = String(p._id);
            if (seen.has(id))
                continue;
            seen.add(id);
            products.push({
                _id: id,
                name: p.name,
                slug: p.slug,
                image: p.images?.[0]?.url,
                basePrice: p.basePrice,
                salePrice: p.salePrice,
                category: p.categoryId ? { name: p.categoryId.name, slug: p.categoryId.slug } : undefined,
                brand: p.brandId ? { name: p.brandId.name, slug: p.brandId.slug } : undefined,
            });
        }
        const catHits = categories.map((c) => ({
            _id: String(c._id),
            name: c.name,
            slug: c.slug,
            image: c.image,
            productCount: c.productCount ?? 0,
        }));
        const brandHits = brands.map((b) => ({
            _id: String(b._id),
            name: b.name,
            slug: b.slug,
            logo: b.logo,
        }));
        return {
            products,
            categories: catHits,
            brands: brandHits,
            total: products.length + catHits.length + brandHits.length,
        };
    }
}
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map