"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
exports.generateUniqueSlug = generateUniqueSlug;
const uuid_1 = require("uuid");
function generateSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
function generateUniqueSlug(text) {
    const base = generateSlug(text);
    const suffix = (0, uuid_1.v4)().slice(0, 8);
    return `${base}-${suffix}`;
}
//# sourceMappingURL=slug.js.map