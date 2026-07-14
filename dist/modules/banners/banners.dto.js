"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBannersQueryDto = exports.updateBannerDto = exports.createBannerDto = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../shared/constants");
const bannerPositionEnum = zod_1.z.enum(constants_1.BANNER_POSITIONS);
const bannerStatusEnum = zod_1.z.enum(['active', 'inactive', 'scheduled']);
exports.createBannerDto = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    subtitle: zod_1.z.string().max(200).optional(),
    description: zod_1.z.string().max(500).optional(),
    ctaText: zod_1.z.string().max(60).optional(),
    secondaryCtaText: zod_1.z.string().max(60).optional(),
    secondaryCtaLink: zod_1.z.string().max(300).optional(),
    image: zod_1.z.object({
        desktop: zod_1.z.string().url(),
        mobile: zod_1.z.string().url(),
    }),
    link: zod_1.z.string().min(1),
    position: bannerPositionEnum,
    priority: zod_1.z.number().int().min(0).default(0),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    status: bannerStatusEnum.default('active'),
});
exports.updateBannerDto = exports.createBannerDto.partial();
exports.listBannersQueryDto = zod_1.z.object({
    position: bannerPositionEnum.optional(),
    status: bannerStatusEnum.optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
});
//# sourceMappingURL=banners.dto.js.map