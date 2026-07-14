"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL = exports.BANNER_POSITIONS = exports.CMS_PAGE_STATUSES = exports.NOTIFICATION_CHANNELS = exports.NOTIFICATION_TYPES = exports.COUPON_TYPES = exports.PRODUCT_STATUSES = exports.RETURN_STATUSES = exports.PAYMENT_STATUSES = exports.ORDER_STATUSES = exports.ADMIN_ROLES = exports.USER_ROLES = void 0;
exports.USER_ROLES = ['super_admin', 'admin', 'manager', 'support_agent', 'customer'];
exports.ADMIN_ROLES = ['super_admin', 'admin', 'manager'];
exports.ORDER_STATUSES = [
    'pending',
    'confirmed',
    'processing',
    'packed',
    'shipped',
    'delivered',
    'cancelled',
    'returned',
    'refunded',
];
exports.PAYMENT_STATUSES = [
    'pending',
    'authorized',
    'captured',
    'failed',
    'refunded',
    'partially_refunded',
];
exports.RETURN_STATUSES = [
    'requested',
    'approved',
    'rejected',
    'pickup_scheduled',
    'picked_up',
    'received',
    'refund_initiated',
];
exports.PRODUCT_STATUSES = ['draft', 'active', 'archived'];
exports.COUPON_TYPES = ['percentage', 'fixed_amount', 'free_shipping'];
exports.NOTIFICATION_TYPES = ['order_update', 'promotion', 'stock_alert', 'system'];
exports.NOTIFICATION_CHANNELS = ['email', 'sms', 'push', 'in_app'];
exports.CMS_PAGE_STATUSES = ['draft', 'published'];
exports.BANNER_POSITIONS = ['hero', 'promotional', 'sidebar', 'category'];
exports.CACHE_TTL = {
    PRODUCT_LIST: 300,
    PRODUCT_DETAIL: 600,
    CATEGORY_TREE: 3600,
    BRAND_LIST: 3600,
    BANNER_LIST: 1800,
    SETTINGS: 3600,
    SEARCH_POPULAR: 900,
};
//# sourceMappingURL=index.js.map