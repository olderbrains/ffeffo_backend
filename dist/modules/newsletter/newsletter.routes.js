"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const rbac_middleware_1 = require("../../middleware/rbac.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const newsletter_model_1 = require("../../models/newsletter.model");
const errors_1 = require("../../shared/errors");
const pagination_1 = require("../../shared/utils/pagination");
const router = (0, express_1.Router)();
const subscribeDto = zod_1.z.object({
    email: zod_1.z.string().email().max(254).trim().toLowerCase(),
});
router.post('/subscribe', (0, validation_middleware_1.validate)({ body: subscribeDto }), async (req, res) => {
    const { email } = req.body;
    const existing = await newsletter_model_1.Newsletter.findOne({ email });
    if (existing) {
        if (existing.isActive) {
            throw new errors_1.ConflictError('This email is already subscribed');
        }
        existing.isActive = true;
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = undefined;
        await existing.save();
    }
    else {
        await newsletter_model_1.Newsletter.create({ email });
    }
    res.status(201).json({ success: true, message: 'Successfully subscribed' });
});
router.post('/unsubscribe', (0, validation_middleware_1.validate)({ body: subscribeDto }), async (req, res) => {
    const { email } = req.body;
    await newsletter_model_1.Newsletter.findOneAndUpdate({ email, isActive: true }, { isActive: false, unsubscribedAt: new Date() });
    res.json({ success: true, message: 'Successfully unsubscribed' });
});
router.get('/', auth_middleware_1.authenticate, rbac_middleware_1.authorizeAdmin, async (req, res) => {
    const query = pagination_1.paginationSchema.parse(req.query);
    const [items, total] = await Promise.all([
        newsletter_model_1.Newsletter.find({ isActive: true })
            .sort({ subscribedAt: -1 })
            .skip((0, pagination_1.getSkipValue)(query.page, query.limit))
            .limit(query.limit)
            .lean(),
        newsletter_model_1.Newsletter.countDocuments({ isActive: true }),
    ]);
    res.json({ success: true, data: (0, pagination_1.buildPaginatedResponse)(items, total, query.page, query.limit) });
});
exports.default = router;
//# sourceMappingURL=newsletter.routes.js.map