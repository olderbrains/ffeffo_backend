"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const search_service_1 = require("./search.service");
const service = new search_service_1.SearchService();
class SearchController {
    search = async (req, res) => {
        const q = typeof req.query.q === 'string' ? req.query.q : '';
        const limit = Math.min(Number(req.query.limit) || 8, 20);
        const results = await service.search(q, limit);
        res.json({ success: true, data: results });
    };
}
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map