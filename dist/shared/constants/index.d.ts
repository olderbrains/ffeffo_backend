export declare const USER_ROLES: readonly ["super_admin", "admin", "manager", "support_agent", "customer"];
export declare const ADMIN_ROLES: readonly ["super_admin", "admin", "manager"];
export declare const ORDER_STATUSES: readonly ["pending", "confirmed", "processing", "packed", "shipped", "delivered", "cancelled", "returned", "refunded"];
export declare const PAYMENT_STATUSES: readonly ["pending", "authorized", "captured", "failed", "refunded", "partially_refunded"];
export declare const RETURN_STATUSES: readonly ["requested", "approved", "rejected", "pickup_scheduled", "picked_up", "received", "refund_initiated"];
export declare const PRODUCT_STATUSES: readonly ["draft", "active", "archived"];
export declare const COUPON_TYPES: readonly ["percentage", "fixed_amount", "free_shipping"];
export declare const NOTIFICATION_TYPES: readonly ["order_update", "promotion", "stock_alert", "system"];
export declare const NOTIFICATION_CHANNELS: readonly ["email", "sms", "push", "in_app"];
export declare const CMS_PAGE_STATUSES: readonly ["draft", "published"];
export declare const BANNER_POSITIONS: readonly ["hero", "promotional", "sidebar", "category"];
export declare const CACHE_TTL: {
    readonly PRODUCT_LIST: 300;
    readonly PRODUCT_DETAIL: 600;
    readonly CATEGORY_TREE: 3600;
    readonly BRAND_LIST: 3600;
    readonly BANNER_LIST: 1800;
    readonly SETTINGS: 3600;
    readonly SEARCH_POPULAR: 900;
};
//# sourceMappingURL=index.d.ts.map